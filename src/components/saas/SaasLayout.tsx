import React from 'react';
import { useApp } from '../../context/AppContext';
import { LoginModal } from '../auth/LoginModal';
import logoImg from '../../assets/logo.jpg';
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
  LogOut,
  KeyRound,
  FileText,
  UserPlus,
  Lock,
  Volume2,
  BellRing,
  Inbox
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
    switchUserRole,
    unreadConciergeCount,
    conciergeMessages,
    playAlertSound
  } = useApp();

  const isSuperAdmin = currentUser?.role === 'superadmin';

  const navItems = [
    { id: 'analytics', label: 'Analítica & Ventas', icon: BarChart3 },
    { id: 'inventory', label: 'Catálogo & Inventario', icon: Package },
    { id: 'crm', label: 'Clientes VIP & CRM', icon: Users },
    { id: 'orders', label: 'Pedidos & Despacho', icon: ShoppingBag },
    {
      id: 'ai_concierge',
      label: 'Concierge & Mensajes VIP',
      icon: Inbox,
      badge: unreadConciergeCount > 0 ? `🔔 ${unreadConciergeCount} Nuevos` : undefined,
      badgeColor: unreadConciergeCount > 0 ? 'bg-rose-500 text-white font-bold animate-pulse border-rose-400' : undefined
    },
    { id: 'users_management', label: 'Usuarios & Roles', icon: UserPlus, badge: isSuperAdmin ? 'SuperAdmin' : 'Restringido' },
    { id: 'audit_logs', label: 'Auditoría & Seguridad', icon: FileText }
  ];

  /* 🔒 REQUIREMENT 2: If user is NOT logged in, block access to dashboard */
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex items-center justify-center p-6 font-sans relative overflow-hidden transition-colors duration-300">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-md w-full bg-white dark:bg-zinc-900 border border-amber-500/40 p-8 shadow-2xl text-center space-y-6">
          <div className="flex justify-center">
            <img
              src={logoImg}
              alt="Imperio Lux"
              className="w-20 h-20 object-contain bg-black border border-amber-500/40 p-1 shadow-lg"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedPublic) {
                  target.dataset.triedPublic = 'true';
                  target.src = '/logo.jpg';
                } else if (target.src !== window.location.origin + '/icon.svg') {
                  target.src = '/icon.svg';
                }
              }}
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30 mb-2">
              <Lock className="w-3.5 h-3.5 text-amber-400" /> Acceso Restringido
            </div>
            <h2 className="font-serif text-2xl font-bold text-amber-100">
              Panel Administrativo
            </h2>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Debe iniciar sesión con su usuario y contraseña autorizados para ingresar al Dashboard (Admin / SuperAdmin).
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <KeyRound className="w-4 h-4" /> Iniciar Sesión con Usuario y Contraseña
            </button>

            <button
              onClick={() => {
                setViewMode('storefront');
                setActiveTab('explore');
              }}
              className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-zinc-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Volver a la Tienda
            </button>
          </div>
        </div>

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans flex flex-col md:flex-row transition-colors duration-300">
      {/* SaaS Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="pb-5 mb-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={logoImg}
                alt="Imperio Lux"
                className="w-9 h-9 object-contain bg-black border border-amber-500/40 p-0.5 shadow-sm"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedPublic) {
                    target.dataset.triedPublic = 'true';
                    target.src = '/logo.jpg';
                  } else if (target.src !== window.location.origin + '/icon.svg') {
                    target.src = '/icon.svg';
                  }
                }}
              />
              <div>
                <span className="font-serif text-sm font-bold tracking-wider block text-zinc-900 dark:text-amber-100 uppercase">
                  IMPERIO LUX
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-widest block">
                  Portal SaaS de Gestión
                </span>
              </div>
            </div>
          </div>

          {/* User Profile Card Widget */}
          <div className="mb-5 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
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

              {/* Quick Toggle Role Button & Logout */}
              <div className="mt-2.5 pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-1 text-[10px]">
                <button
                  onClick={() => switchUserRole(currentUser.role === 'superadmin' ? 'admin' : 'superadmin')}
                  className="text-amber-600 dark:text-amber-400 font-bold hover:underline uppercase"
                >
                  {currentUser.role === 'superadmin' ? 'Ver como Admin' : 'Ver como SuperAdmin'}
                </button>
                <button
                  onClick={() => logout()}
                  className="text-rose-600 dark:text-rose-400 font-bold hover:underline uppercase flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" /> Salir
                </button>
              </div>
            </div>
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
                    <span
                      className={`text-[9px] px-1.5 py-0.2 border ${
                        item.badgeColor
                          ? item.badgeColor
                          : 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/30'
                      }`}
                    >
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
          {/* 🔴 PROMINENT CERRAR SESION BUTTON IN SIDEBAR */}
          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors uppercase shadow-md"
          >
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </button>

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
        {/* 🔔 LIVE CONCIERGE NOTIFICATION ALERT BANNER */}
        {unreadConciergeCount > 0 && (
          <div className="mb-4 p-3 bg-rose-500/15 border-2 border-rose-500 text-rose-900 dark:text-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-2.5">
              <BellRing className="w-5 h-5 text-rose-500 shrink-0 animate-bounce" />
              <div>
                <strong className="text-xs font-bold uppercase tracking-wider block text-rose-600 dark:text-rose-300">
                  ¡ALERTA DE MENSAJE RECIBIDO! ({unreadConciergeCount} Mensaje{unreadConciergeCount > 1 ? 's' : ''} Nuevo{unreadConciergeCount > 1 ? 's' : ''})
                </strong>
                <span className="text-[11px] text-zinc-700 dark:text-zinc-300">
                  Notificando a Admin y Super Admin en el portal de acceso. Sonido de alerta configurado.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={playAlertSound}
                className="px-2.5 py-1.5 bg-zinc-900 text-amber-300 font-bold text-[10px] uppercase border border-amber-500/50 flex items-center gap-1 hover:bg-zinc-800 shadow-sm"
                title="Probar Tono de Alerta"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" /> Probar Alerta Sonora
              </button>
              <button
                onClick={() => setActiveTab('ai_concierge')}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-md transition-all"
              >
                <Inbox className="w-3.5 h-3.5" /> Ver Bandeja de Mensajes
              </button>
            </div>
          </div>
        )}

        {/* Top bar with quick user status and PROMINENT CERRAR SESION button */}
        <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              {currentUser.role === 'superadmin' ? <Crown className="w-4 h-4 text-amber-500" /> : <ShieldCheck className="w-4 h-4 text-emerald-500" />}
              Sesión Activa: <strong className="font-mono text-zinc-900 dark:text-white">{currentUser.name}</strong> ({currentUser.role.toUpperCase()})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={playAlertSound}
              className="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-800 dark:text-amber-300 border border-amber-500/40 font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1"
              title="Prueba de sonido de alerta"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-500" /> 🔊 Probar Alerta Sonora
            </button>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-bold text-[10px] uppercase tracking-wider transition-colors"
            >
              Cambiar Usuario
            </button>
            <button
              onClick={() => logout()}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors"
              title="Cerrar Sesión Segura"
            >
              <LogOut className="w-3.5 h-3.5" /> Cerrar Sesión
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

