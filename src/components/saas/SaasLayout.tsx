import React from 'react';
import { useApp } from '../../context/AppContext';
import { LoginModal } from '../auth/LoginModal';
import {
  BarChart3,
  Package,
  Users,
  ShoppingBag,
  Sparkles,
  ArrowLeft,
  Sun,
  Moon,
  Crown,
  ShieldCheck,
  UserCheck,
  LogOut,
  KeyRound,
  FileText,
  UserPlus
} from 'lucide-react';

interface SaasLayoutProps {
  children: React.ReactNode;
}

export const SaasLayout: React.FC<SaasLayoutProps> = ({ children }) => {
  const {
    activeTab,
    setActiveTab,
    setViewMode,
    themeMode,
    toggleTheme,
    currentUser,
    setIsLoginModalOpen,
    isLoginModalOpen,
    logout,
    switchUserRole
  } = useApp();

  const isSuperAdmin = currentUser?.role === 'superadmin';

  const navItems = [
    { id: 'analytics', label: 'Analítica & Ventas', icon: BarChart3 },
    { id: 'inventory', label: 'Catálogo & Inventario', icon: Package },
    { id: 'crm', label: 'Clientes VIP & CRM', icon: Users },
    { id: 'orders', label: 'Pedidos & Despacho', icon: ShoppingBag },
    { id: 'ai_concierge', label: 'Asistente IA Concierge', icon: Sparkles },
    { id: 'users_management', label: 'Usuarios & Roles', icon: UserPlus, badge: isSuperAdmin ? 'SuperAdmin' : 'Restringido' },
    { id: 'audit_logs', label: 'Auditoría & Seguridad', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans flex flex-col md:flex-row transition-colors duration-300">
      {/* SaaS Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="pb-5 mb-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-amber-600 text-white font-serif font-bold text-base flex items-center justify-center">
                IL
              </div>
              <div>
                <span className="font-serif text-sm font-bold tracking-wider block text-zinc-900 dark:text-amber-100 uppercase">
                  IMPERIO LUZ
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-widest block">
                  Portal SaaS de Gestión
                </span>
              </div>
            </div>
          </div>

          {/* User Profile Card Widget */}
          <div className="mb-5 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
            {currentUser ? (
              <div>
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-amber-500/50"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {currentUser.name}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] px-1.5 py-0.2 font-bold uppercase border ${
                        currentUser.role === 'superadmin'
                          ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {currentUser.role === 'superadmin' ? <Crown className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                      {currentUser.role}
                    </span>
                  </div>
                </div>

                {/* Quick Toggle Role Button */}
                <div className="mt-2.5 pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-1 text-[10px]">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Probar otro rol:</span>
                  <button
                    onClick={() => switchUserRole(currentUser.role === 'superadmin' ? 'admin' : 'superadmin')}
                    className="text-amber-600 dark:text-amber-400 font-bold hover:underline uppercase"
                  >
                    {currentUser.role === 'superadmin' ? 'Ver como Admin' : 'Ver como SuperAdmin'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-2 space-y-2">
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Sin Sesión Activa</p>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full py-1.5 bg-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5" /> Iniciar Sesión
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-none ${
                    isActive
                      ? 'bg-amber-600 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-amber-600 dark:hover:text-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
          {currentUser ? (
            <button
              onClick={() => logout()}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-colors uppercase"
            >
              <LogOut className="w-3.5 h-3.5" /> Cerrar Sesión
            </button>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-600 dark:text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors uppercase"
            >
              <KeyRound className="w-3.5 h-3.5" /> Iniciar Sesión
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-colors"
          >
            <span>Modo: {themeMode === 'night' ? 'Noche' : 'Día'}</span>
            {themeMode === 'night' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-amber-700" />}
          </button>

          <button
            onClick={() => {
              setViewMode('storefront');
              setActiveTab('explore');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-zinc-900 dark:bg-zinc-800 text-amber-200 text-xs uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a la Boutique
          </button>
        </div>
      </aside>

      {/* Main SaaS View Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Top bar with quick user switch banner */}
        <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
              {currentUser?.role === 'superadmin' ? <Crown className="w-4 h-4 text-amber-500" /> : <ShieldCheck className="w-4 h-4 text-emerald-500" />}
              Autenticado como: {currentUser?.name || 'Invitado'}
            </span>
            <span className="text-zinc-500">
              ({currentUser?.role === 'superadmin' ? 'Credencial SuperAdmin: superadmin / superadmin123*' : 'Credencial Admin: admin / admin123*'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-2.5 py-1 bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm hover:bg-amber-500"
            >
              Cambiar Usuario / Login
            </button>
          </div>
        </div>

        {children}
      </main>

      {/* Global Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

