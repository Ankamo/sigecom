import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Package,
  Users,
  ShoppingBag,
  Sparkles,
  Settings,
  ArrowLeft,
  Sun,
  Moon
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
    toggleTheme
  } = useApp();

  const navItems = [
    { id: 'analytics', label: 'Analítica & Ventas', icon: BarChart3 },
    { id: 'inventory', label: 'Catálogo & Inventario', icon: Package },
    { id: 'crm', label: 'Clientes VIP & CRM', icon: Users },
    { id: 'orders', label: 'Pedidos & Despacho', icon: ShoppingBag },
    { id: 'ai_concierge', label: 'Asistente IA Concierge', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans flex flex-col md:flex-row transition-colors duration-300">
      {/* SaaS Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="pb-6 mb-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
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

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-none ${
                    isActive
                      ? 'bg-amber-600 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-amber-600 dark:hover:text-amber-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-colors"
          >
            <span>Modo: {themeMode === 'night' ? 'Noche (Obsidiana)' : 'Día (Alabastro)'}</span>
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
        {children}
      </main>
    </div>
  );
};
