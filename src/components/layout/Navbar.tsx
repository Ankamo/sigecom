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
  Home,
  Package,
  BookOpen,
  PhoneCall,
  Smartphone,
  LogOut,
  Lock,
  Globe,
  Menu,
  X,
  ChevronRight,
  SlidersHorizontal
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleTabChange = (tab: any) => {
    setViewMode('storefront');
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border-b border-amber-900/10 dark:border-amber-500/15 transition-colors duration-300 shadow-sm">
        {/* Top Announcement & Utility Bar */}
        <div className="bg-gradient-to-r from-zinc-950 via-amber-950/90 to-zinc-950 text-amber-200/90 text-[11px] py-1.5 px-3 sm:px-6 tracking-wider font-light border-b border-amber-500/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            {/* Left side announcement */}
            <div className="flex items-center gap-2 text-amber-300 font-medium truncate">
              <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30 shrink-0">
                <Globe className="w-3 h-3 text-amber-400 animate-pulse" /> Global VIP
              </span>
              <span className="hidden sm:inline truncate">
                Envío Gratuito e Impuestos Incluidos en Pedidos Globales
              </span>
            </div>

            {/* Right side utility controls */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="hover:text-amber-300 transition-colors hidden md:flex items-center gap-1 font-semibold text-amber-200"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Quiz Olfativo & Relojero</span>
              </button>

              <button
                onClick={() => setIsPwaModalOpen(true)}
                className="hover:text-amber-300 transition-colors hidden sm:flex items-center gap-1 font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 border border-amber-500/30 rounded-none text-[10px] uppercase"
              >
                <Smartphone className="w-3 h-3 text-amber-400" />
                <span>Instalar App</span>
              </button>

              <div className="flex items-center gap-1 bg-zinc-900/80 px-2 py-0.5 border border-amber-500/20">
                <Globe className="w-3 h-3 text-amber-400 shrink-0" />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="bg-transparent text-amber-200 cursor-pointer focus:outline-none font-sans text-[11px] font-bold uppercase"
                >
                  <option value="COP" className="bg-zinc-900 text-amber-200">COP ($)</option>
                  <option value="USD" className="bg-zinc-900 text-amber-200">USD ($)</option>
                  <option value="EUR" className="bg-zinc-900 text-amber-200">EUR (€)</option>
                  <option value="MXN" className="bg-zinc-900 text-amber-200">MXN ($)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Brand Logo & Title */}
          <button
            onClick={() => handleTabChange('explore')}
            className="flex items-center gap-2.5 sm:gap-3.5 group text-left focus:outline-none shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 border-2 border-amber-500/60 bg-zinc-950 flex items-center justify-center shadow-md group-hover:border-amber-400 transition-all overflow-hidden shrink-0">
              <img
                src={logoImg}
                alt="Imperio Lux Logo"
                className="w-full h-full object-cover"
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
              <span className="font-serif text-lg sm:text-2xl tracking-wider sm:tracking-widest text-zinc-900 dark:text-amber-100 font-bold block uppercase flex items-center gap-1.5 leading-tight">
                IMPERIO LUX
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.2em] text-amber-700/90 dark:text-amber-400/80 font-sans block uppercase font-medium">
                Haute Parfumerie & Horlogerie
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          {viewMode === 'storefront' && (
            <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-sans tracking-wider uppercase font-semibold">
              <button
                onClick={() => handleTabChange('explore')}
                className={`flex items-center gap-1.5 transition-all py-1 border-b-2 ${
                  activeTab === 'explore'
                    ? 'text-amber-700 dark:text-amber-400 border-amber-600 dark:border-amber-400 font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </button>

              <button
                onClick={() => handleTabChange('perfumes')}
                className={`flex items-center gap-1.5 transition-all py-1 border-b-2 ${
                  activeTab === 'perfumes' || activeTab === 'watches'
                    ? 'text-amber-700 dark:text-amber-400 border-amber-600 dark:border-amber-400 font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Catálogo de Productos</span>
              </button>

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="flex items-center gap-1.5 transition-all py-1 border-b-2 text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300"
              >
                <PhoneCall className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Escríbenos</span>
              </button>

              <button
                onClick={() => handleTabChange('story')}
                className={`flex items-center gap-1.5 transition-all py-1 border-b-2 ${
                  activeTab === 'story'
                    ? 'text-amber-700 dark:text-amber-400 border-amber-600 dark:border-amber-400 font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Sobre Nosotros</span>
              </button>
            </nav>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Input / Trigger */}
            {viewMode === 'storefront' && (
              <div className="relative">
                {isSearchOpen ? (
                  <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 border border-amber-500/50 px-2 py-1 shadow-inner">
                    <Search className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mr-1.5 shrink-0" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar Oud, Tourbillon..."
                      className="bg-transparent text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none w-28 sm:w-44 font-sans"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchTerm('');
                      }}
                      className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 ml-1 p-0.5"
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
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Theme Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-amber-300 hover:border-amber-500/50 transition-all shadow-sm"
              title={themeMode === 'night' ? 'Modo Día' : 'Modo Noche'}
            >
              {themeMode === 'night' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-amber-700" />
              )}
            </button>

            {/* Wishlist Icon */}
            {viewMode === 'storefront' && (
              <button
                onClick={() => handleTabChange('explore')}
                className="relative p-2 text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors hidden sm:block"
                title="Lista de Deseos"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                )}
              </button>
            )}

            {/* Cart Button */}
            {viewMode === 'storefront' && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative px-2.5 sm:px-3 py-1.5 sm:py-2 bg-amber-600 dark:bg-amber-500 text-white dark:text-zinc-950 transition-all hover:bg-amber-700 dark:hover:bg-amber-400 shadow-md flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
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

            {/* User Session / Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (viewMode === 'saas_dashboard') {
                      setViewMode('storefront');
                    } else {
                      setViewMode('saas_dashboard');
                      setActiveTab('analytics');
                    }
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-wider transition-all border bg-amber-600 text-white hover:bg-amber-500 border-amber-500 shadow-md"
                  title="Panel Admin"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span className="hidden md:inline font-mono">
                    {currentUser.role === 'superadmin' ? 'SuperAdmin' : 'Admin'}
                  </span>
                </button>

                <button
                  onClick={() => logout()}
                  className="p-2 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-wider transition-all border bg-zinc-900 dark:bg-zinc-100 text-amber-400 dark:text-zinc-900 hover:bg-amber-600 hover:text-white border-amber-500/40 shadow-sm"
                title="Iniciar Sesión"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Acceso</span>
              </button>
            )}

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-800 dark:text-zinc-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              aria-label="Abrir Menú de Navegación"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Menu Drawer (lg:hidden) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-zinc-900 text-zinc-100 border-b border-amber-500/30 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1 flex items-center justify-between">
              <span>Navegación Principal</span>
              <span className="text-zinc-500">Imperio Lux</span>
            </div>

            <nav className="grid grid-cols-1 gap-1 text-sm font-semibold uppercase tracking-wider">
              <button
                onClick={() => handleTabChange('explore')}
                className={`flex items-center justify-between p-2.5 transition-colors ${
                  activeTab === 'explore'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border-l-4 border-amber-400'
                    : 'text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <span className="flex items-center gap-2"><Home className="w-4 h-4 text-amber-400" /> Inicio</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>

              <button
                onClick={() => handleTabChange('perfumes')}
                className={`flex items-center justify-between p-2.5 transition-colors ${
                  activeTab === 'perfumes' || activeTab === 'watches'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border-l-4 border-amber-400'
                    : 'text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <span className="flex items-center gap-2"><Package className="w-4 h-4 text-amber-400" /> Catálogo de Productos</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>

              <button
                onClick={() => {
                  setIsContactModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-2.5 text-amber-300 hover:bg-zinc-800 transition-colors font-bold"
              >
                <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-emerald-400" /> Escríbenos (Concierge)</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>

              <button
                onClick={() => handleTabChange('story')}
                className={`flex items-center justify-between p-2.5 transition-colors ${
                  activeTab === 'story'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border-l-4 border-amber-400'
                    : 'text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-amber-400" /> Sobre Nosotros</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>

              <button
                onClick={() => {
                  setIsQuizOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-2.5 text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-400" /> Quiz Olfativo & Relojero</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
            </nav>

            {/* Mobile Actions Footer */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => {
                  setIsPwaModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-amber-300 bg-amber-500/10 px-3 py-2 border border-amber-500/30 font-bold uppercase tracking-wider"
              >
                <Smartphone className="w-4 h-4 text-amber-400" /> Instalar App
              </button>

              {!currentUser && (
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase bg-amber-600 text-white tracking-wider"
                >
                  <Lock className="w-3.5 h-3.5" /> Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Bottom Quick Navigation Bar (lg:hidden) */}
        {viewMode === 'storefront' && (
          <div className="lg:hidden bg-zinc-100 dark:bg-zinc-900 border-t border-amber-900/10 dark:border-amber-900/30 px-3 py-1.5 flex items-center justify-around text-[11px] font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            <button
              onClick={() => handleTabChange('explore')}
              className={`flex flex-col items-center gap-0.5 py-1 ${activeTab === 'explore' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}`}
            >
              <Home className="w-4 h-4" /> <span>Inicio</span>
            </button>
            <button
              onClick={() => handleTabChange('perfumes')}
              className={`flex flex-col items-center gap-0.5 py-1 ${activeTab === 'perfumes' || activeTab === 'watches' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}`}
            >
              <Package className="w-4 h-4" /> <span>Catálogo</span>
            </button>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex flex-col items-center gap-0.5 py-1 text-amber-700 dark:text-amber-400 font-bold"
            >
              <PhoneCall className="w-4 h-4 text-emerald-500" /> <span>Escríbenos</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center gap-0.5 py-1 text-amber-700 dark:text-amber-300 font-bold relative"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Carrito ({cartCount})</span>
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

