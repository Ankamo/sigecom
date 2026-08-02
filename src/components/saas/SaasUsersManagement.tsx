import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  ShieldCheck,
  Crown,
  UserPlus,
  Lock,
  Mail,
  User as UserIcon,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { User, UserRole } from '../../types';

export const SaasUsersManagement: React.FC = () => {
  const { currentUser, usersList, addUser, setIsLoginModalOpen, switchUserRole } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('admin');
  const [newPassword, setNewPassword] = useState('');
  const [createdNotice, setCreatedNotice] = useState('');

  const isSuperAdmin = currentUser?.role === 'superadmin';

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newName || !newEmail || !newPassword) return;

    const newUser: User = {
      id: `USR-${Date.now().toString().slice(-6)}`,
      username: newUsername.trim().toLowerCase(),
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      avatar: newRole === 'superadmin'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      lastLogin: 'Creado recientemente',
      permissions: newRole === 'superadmin'
        ? ['all', 'manage_users', 'view_finances', 'delete_catalog', 'audit_logs']
        : ['manage_inventory', 'manage_orders', 'crm', 'view_catalog']
    };

    addUser(newUser);
    setCreatedNotice(`Usuario "${newUser.name}" registrado como ${newUser.role.toUpperCase()}`);
    setIsModalOpen(false);
    setNewUsername('');
    setNewName('');
    setNewEmail('');
    setNewPassword('');

    setTimeout(() => setCreatedNotice(''), 4000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30 mb-2">
            <Crown className="w-3.5 h-3.5" /> Módulo exclusivo SuperAdmin
          </div>
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-100">
            Gestión de Usuarios & Roles de Credencial
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Administra las cuentas autorizadas de la plataforma (SuperAdmin & Admin) y sus privilegios de seguridad.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
          >
            <UserPlus className="w-4 h-4" /> Crear Nuevo Usuario
          </button>
        )}
      </div>

      {/* Notice Banner */}
      {createdNotice && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{createdNotice}</span>
        </div>
      )}

      {/* Restriction Notice if user is only Admin */}
      {!isSuperAdmin && (
        <div className="p-6 bg-amber-500/10 border border-amber-500/40 text-zinc-800 dark:text-zinc-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm uppercase">
            <ShieldAlert className="w-5 h-5" /> Acceso Restringido
          </div>
          <p className="text-xs leading-relaxed">
            Actualmente estás autenticado como <strong className="text-amber-600 dark:text-amber-300">Admin (Operaciones)</strong>. La creación y edición directa de cuentas de sistema requiere la clave máster de <strong className="text-amber-600 dark:text-amber-300">SuperAdmin</strong>.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => switchUserRole('superadmin')}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              Cambiar a SuperAdmin con 1-Clic <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-3 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-amber-300 underline"
            >
              Ingresar credencial manualmente
            </button>
          </div>
        </div>
      )}

      {/* Official Pre-Configured Accounts Credentials Table */}
      <div className="bg-white dark:bg-zinc-900 border border-amber-500/30 p-6 shadow-sm space-y-4">
        <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-amber-100 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          Credenciales Oficiales de la Aplicación
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Utilice cualquiera de las siguientes credenciales para iniciar sesión o probar las capacidades diferenciales de cada perfil:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Superadmin Card */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-500" /> Perfil SuperAdmin
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-800 dark:text-amber-200 px-2 py-0.5 font-bold uppercase border border-amber-500/30">
                Rol: superadmin
              </span>
            </div>
            <div className="font-mono text-xs space-y-1 bg-zinc-950 text-amber-200 p-3 border border-amber-500/30">
              <p>Usuario: <span className="text-white font-bold">superadmin</span></p>
              <p>Contraseña: <span className="text-amber-400 font-bold">superadmin123*</span></p>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <strong>Permisos Totales:</strong> Gestión de usuarios, finanzas consolidadas, logs de auditoría, borrado de productos y reajuste masivo.
            </p>
          </div>

          {/* Admin Card */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Perfil Admin
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 font-bold uppercase border border-emerald-500/30">
                Rol: admin
              </span>
            </div>
            <div className="font-mono text-xs space-y-1 bg-zinc-950 text-emerald-200 p-3 border border-emerald-500/30">
              <p>Usuario: <span className="text-white font-bold">admin</span></p>
              <p>Contraseña: <span className="text-emerald-400 font-bold">admin123*</span></p>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <strong>Permisos Operativos:</strong> Gestión de catálogo, actualización de stock, despacho de pedidos y CRM VIP Concierge.
            </p>
          </div>
        </div>
      </div>

      {/* Users List Grid */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
        <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          Directorio de Usuarios Activos
        </h3>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {usersList.map((usr) => (
            <div
              key={usr.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={usr.avatar}
                  alt={usr.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/40 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {usr.name}
                    </h4>
                    <span
                      className={`text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider border ${
                        usr.role === 'superadmin'
                          ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {usr.role === 'superadmin' ? '👑 SuperAdmin' : '🛡️ Admin'}
                    </span>
                    {currentUser?.username === usr.username && (
                      <span className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 font-semibold uppercase">
                        Tú
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                    @{usr.username} • {usr.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs">
                  <span className="text-zinc-400 block text-[10px] uppercase">Última Actividad</span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">{usr.lastLogin || 'Hace momentos'}</span>
                </div>

                <button
                  onClick={() => switchUserRole(usr.role)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all ${
                    currentUser?.role === usr.role
                      ? 'bg-zinc-800 text-amber-300 border-amber-500/40'
                      : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-800 hover:border-amber-500'
                  }`}
                >
                  {currentUser?.role === usr.role ? 'Sesión Activa' : 'Cambiar a este Perfil'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal to Create User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-amber-500/40 p-6 shadow-2xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-amber-100 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              Crear Nuevo Usuario de Plataforma
            </h3>

            <form onSubmit={handleCreateUser} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                  Nombre de Usuario (Username)
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="ej. gestor_paris"
                    className="w-full pl-9 pr-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="ej. Carlos de la Torre"
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="carlos@imperioluz.com"
                    className="w-full pl-9 pr-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                  Rol de Usuario
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="admin">Admin (Gestor de Tienda)</option>
                  <option value="superadmin">SuperAdmin (Privilegios Totales)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                  Contraseña de Acceso
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
