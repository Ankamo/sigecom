import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PwaInstallModal } from '../pwa/PwaInstallModal';
import { PwaInstallBanner } from '../pwa/PwaInstallBanner';
import {
  Sun,
  Moon,
  ShoppingBag,
  Heart,
  Search,
  Sparkles,
  LayoutDashboard,
  Store,
  Compass,
  Watch,
  Droplet,
  BookOpen,
  Smartphone,
  Download
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
    setSearchTerm
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-zinc-950/85 border-b border-amber-900/10 dark:border-amber-500/15 transition-colors duration-300">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-zinc-900 to-amber-950 text-amber-200/90 text-xs py-1.5 px-4 text-center tracking-widest font-light flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-amber-400/80">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Envío VIP Internacional Gratis en compras superiores a $500</span>
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
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="bg-transparent text-amber-200 cursor-pointer focus:outline-none font-sans text-xs"
          >
            <option value="USD" className="bg-zinc-900 text-amber-200">USD ($)</option>
            <option value="EUR" className="bg-zinc-900 text-amber-200">EUR (€)</option>
            <option value="MXN" className="bg-zinc-900 text-amber-200">MXN ($)</option>
          </select>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setViewMode('storefront');
            setActiveTab('explore');
          }}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-none border border-amber-600/40 dark:border-amber-400/50 bg-amber-500/5 dark:bg-amber-400/10 flex items-center justify-center transition-all group-hover:border-amber-500 group-hover:bg-amber-500/10">
            <span className="font-serif font-bold text-amber-700 dark:text-amber-400 text-xl tracking-tighter">
              A&C
            </span>
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl tracking-widest text-zinc-900 dark:text-amber-100 font-semibold block uppercase">
              AURA & CHRONOS
            </span>
            <span className="text-[10px] tracking-[0.25em] text-amber-700/80 dark:text-amber-400/70 font-sans block uppercase font-medium">
              Haute Parfumerie & Horlogerie
            </span>
          </div>
        </button>

        {/* Storefront Navigation Tabs */}
        {viewMode === 'storefront' && (
          <nav className="hidden lg:flex items-center gap-8 text-sm font-sans tracking-wider uppercase">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                activeTab === 'explore'
                  ? 'text-amber-700 dark:text-amber-400 border-amber-600 dark:border-amber-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300'
              }`}
            >
              <Compass className="w-4 h-4" />
              Colección
            </button>
            <button
              onClick={() => setActiveTab('perfumes')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                activeTab === 'perfumes'
                  ? 'text-amber-700 dark:text-amber-400 border-amber-600 dark:border-amber-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300'
              }`}
            >
              <Droplet className="w-4 h-4" />
              Perfumes de Nicho
            </button>
            <button
              onClick={() => setActiveTab('watches')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                activeTab === 'watches'
                  ? 'text-amber-700 dark:text-amber-400 border-amber-600 dark:border-amber-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300'
              }`}
            >
              <Watch className="w-4 h-4" />
              Alta Relojería
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                activeTab === 'story'
                  ? 'text-amber-700 dark:text-amber-400 border-amber-600 dark:border-amber-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 border-transparent hover:text-amber-600 dark:hover:text-amber-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Legado
            </button>
          </nav>
        )}

        {/* Action Controls & Mode Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* SaaS Portal Switcher Button */}
          <button
            onClick={() => {
              if (viewMode === 'storefront') {
                setViewMode('saas_dashboard');
                setActiveTab('analytics');
              } else {
                setViewMode('storefront');
                setActiveTab('explore');
              }
            }}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 border rounded-none bg-amber-600/10 hover:bg-amber-600/20 text-amber-800 dark:text-amber-300 border-amber-600/30 dark:border-amber-400/40 shadow-sm"
            title="Cambiar entre Boutique de Lujo y Panel SaaS de Gestión"
          >
            {viewMode === 'storefront' ? (
              <>
                <LayoutDashboard className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="hidden sm:inline">Panel SaaS</span>
              </>
            ) : (
              <>
                <Store className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="hidden sm:inline">Boutique</span>
              </>
            )}
          </button>

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
              className="relative p-2 bg-amber-600 dark:bg-amber-500 text-white dark:text-zinc-950 transition-all hover:bg-amber-700 dark:hover:bg-amber-400 shadow-md flex items-center justify-center"
              title="Bolsa de Compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-zinc-900 text-amber-300 dark:bg-white dark:text-zinc-900 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-amber-500">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* PWA Installation Modal & Banner */}
      <PwaInstallModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
      />
      <PwaInstallBanner
        onOpenModal={() => setIsPwaModalOpen(true)}
      />
    </header>
  );
};
