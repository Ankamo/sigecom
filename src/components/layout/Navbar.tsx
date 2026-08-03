import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PwaInstallModal } from '../pwa/PwaInstallModal';
import { PwaInstallBanner } from '../pwa/PwaInstallBanner';
import { ContactModal } from '../storefront/ContactModal';
import logoImg from '../../assets/logo.jpg';
import {
  Sun,
  Moon,
  ShoppingBag,
  Heart,
  Search,
  Sparkles,
  LayoutDashboard,
  Store,
  Home,
  Package,
  BookOpen,
  PhoneCall,
  Smartphone,
  UserCheck,
  Crown,
  ShieldCheck,
  LogOut,
  Lock,
  Globe
} from 'lucide-react';
import { Currency } from '../../types';

export const Navbar: React.FC = () => {
  const {
    themeMode,
    toggleTheme,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    currency,
    setCurrency,
    cart,
    setIsCartOpen,
    wishlist,
    setIsQuizOpen,
    searchTerm,
    setSearchTerm,
    currentUser,
    setIsLoginModalOpen,
    logout
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-zinc-950/85 border-b border-amber-900/10 dark:border-amber-500/15 transition-colors duration-300">
        {/* Top Banner Bar */}
        <div className="bg-gradient-to-r from-amber-950 via-zinc-900 to-amber-950 text-amber-200/90 text-xs py-1.5 px-4 text-center tracking-widest font-light flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-amber-400/80 font-semibold">
            <Globe className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5" />
            <span>Boutique Global • Envío VIP Gratis a Nivel Mundial</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-4">
            <button
              onClick={() => setIsPwaModalOpen(true)}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 border border-amber-500/30"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Instalar en iOS / Android</span>
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="hover:text-amber-300 transition-colors hidden md:flex items-center gap-1 font-medium underline underline-offset-2"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              Quiz Aroma & Reloj
            </button>
            <span className="opacity-40">|</span>
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" title="Seleccionar Moneda Global" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-amber-200 cursor-pointer focus:outline-none font-sans text-xs font-bold"
              >
                <option value="COP" className="bg-zinc-900 text-amber-200">COP ($ Peso Colombiano)</option>
                <option value="USD" className="bg-zinc-900 text-amber-200">USD ($ Dólar)</option>
                <option value="EUR" className="bg-zinc-900 text-amber-200">EUR (€ Euro)</option>
                <option value="MXN" className="bg-zinc-900 text-amber-200">MXN ($ Peso Mexicano)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Globe Icon */}
          <button
            onClick={() => {
              setViewMode('storefront');
              setActiveTab('explore');
            }}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative w-12 h-12 border-2 border-amber-500/60 bg-zinc-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden shrink-0 rounded-none">
              <img
                src={logoImg}
                alt="Imperio Lux Logo"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-serif text-amber-400 font-bold text-xs bg-zinc-950/40 backdrop-blur-[1px]">
                <Globe className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              </div>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl tracking-widest text-zinc-900 dark:text-amber-100 font-bold block uppercase flex items-center gap-2">
                IMPERIO LUX
                <Globe className="w-4 h-4 text-amber-500 inline-block shrink-0" title="Imperio Lux Global" />
              </span>
              <span className="text-[10px] tracking-[0.2em] text-amber-700/90 dark:text-amber-400/80 font-sans block uppercase font-medium">
                Haute Parfumerie & Horlogerie
              </span>
            </div>
          </button>

        {/* Storefront Navigation Tabs */}
        {viewMode === 'storefront' && (
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-sans tracking-wider uppercase font-semibold">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                activeTab === 'explore'
                  ? 'text-amber-700 dark:text-amber-400 border-amber-600 dark:border-amber-400 font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300'
              }`}
            >
              <Home className="w-4 h-4" />
              Inicio
            </button>
            <button
              onClick={() => setActiveTab('perfumes')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                activeTab === 'perfumes' || activeTab === 'watches'
                  ? 'text-amber-700 dark:text-amber-400 border-amber-600 dark:border-amber-400 font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300'
              }`}
            >
              <Package className="w-4 h-4" />
              Catálogo de Productos
            </button>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center gap-1.5 transition-colors py-1 border-b-2 text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300"
            >
              <PhoneCall className="w-4 h-4" />
              Escríbenos
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                activeTab === 'story'
                  ? 'text-amber-700 dark:text-amber-400 border-amber-600 dark:border-amber-400 font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Sobre Nosotros
            </button>
          </nav>
        )}

        {/* Action Controls & Mode Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser ? (
            /* Logged in state controls */
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (viewMode === 'saas_dashboard') {
                    setViewMode('storefront');
                  } else {
                    setViewMode('saas_dashboard');
                    setActiveTab('analytics');
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border bg-amber-600 text-white hover:bg-amber-500 border-amber-500 shadow-md"
                title="Acceder al Panel de Control SaaS"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline font-mono">
                  {currentUser.role === 'superadmin' ? '👑 Panel SuperAdmin' : '🛡️ Panel Admin'}
                </span>
                <span className="sm:hidden font-mono">Panel</span>
              </button>

              <button
                onClick={() => logout()}
                className="flex items-center gap-1 px-2.5 py-2 text-xs font-bold uppercase tracking-wider border bg-rose-600/10 text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                title={`Cerrar sesión activa (${currentUser.username})`}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Cerrar Sesión</span>
              </button>
            </div>
          ) : (
            /* Logged out state: ONE SINGLE LOGIN BUTTON requiring username + password */
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 border bg-amber-600 text-white hover:bg-amber-500 border-amber-500 shadow-md hover:scale-105 active:scale-95"
              title="Iniciar Sesión con Usuario y Contraseña"
            >
              <Lock className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </button>
          )}

          {/* Search Trigger */}
          {viewMode === 'storefront' && (
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 border border-amber-500/30 px-2 py-1">
                  <Search className="w-4 h-4 text-zinc-400 mr-2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar Oud, Tourbillon..."
                    className="bg-transparent text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none w-32 sm:w-48 font-sans"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchTerm('');
                    }}
                    className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 ml-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  title="Buscar productos"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Day / Night Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-amber-300 hover:border-amber-500/50 transition-all shadow-sm"
            title={themeMode === 'night' ? 'Cambiar a Modo Día (Alabastro)' : 'Cambiar a Modo Noche (Obsidiana)'}
          >
            {themeMode === 'night' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-amber-700" />
            )}
          </button>

          {/* Wishlist */}
          {viewMode === 'storefront' && (
            <button
              onClick={() => setActiveTab('explore')}
              className="relative p-2 text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              title="Lista de Deseos"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              )}
            </button>
          )}

          {/* Cart Drawer Trigger */}
          {viewMode === 'storefront' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3 py-2 bg-amber-600 dark:bg-amber-500 text-white dark:text-zinc-950 transition-all hover:bg-amber-700 dark:hover:bg-amber-400 shadow-md flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
              title="Ver Carrito de Compras"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Carrito</span>
              {cartCount > 0 ? (
                <span className="bg-zinc-900 text-amber-300 dark:bg-white dark:text-zinc-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-amber-400">
                  {cartCount}
                </span>
              ) : null}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar for Quick Client Access */}
      {viewMode === 'storefront' && (
        <div className="md:hidden bg-zinc-100 dark:bg-zinc-900 border-t border-amber-900/10 dark:border-amber-900/30 px-4 py-2 flex items-center justify-around text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-1 py-1 ${activeTab === 'explore' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}`}
          >
            <Home className="w-3.5 h-3.5" /> Inicio
          </button>
          <button
            onClick={() => setActiveTab('perfumes')}
            className={`flex items-center gap-1 py-1 ${activeTab === 'perfumes' || activeTab === 'watches' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}`}
          >
            <Package className="w-3.5 h-3.5" /> Catálogo
          </button>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center gap-1 py-1 text-amber-700 dark:text-amber-400 font-bold"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Escríbenos
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1 py-1 bg-amber-600/10 dark:bg-amber-500/10 px-2 py-0.5 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Carrito ({cartCount})
          </button>
        </div>
      )}

      </header>

      {/* Modals placed outside sticky header element */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <PwaInstallModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
      />
      <PwaInstallBanner
        onOpenModal={() => setIsPwaModalOpen(true)}
      />
    </>
  );
};
