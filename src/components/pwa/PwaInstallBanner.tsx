import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Apple, X, Sparkles } from 'lucide-react';

interface PwaInstallBannerProps {
  onOpenModal: () => void;
}

export const PwaInstallBanner: React.FC<PwaInstallBannerProps> = ({ onOpenModal }) => {
  const [dismissed, setDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);

    // Check OS
    const ua = navigator.userAgent;
    setIsIos(/iPhone|iPad|iPod/i.test(ua));

    // Check local storage for banner dismissal
    const bannerDismissed = localStorage.getItem('aura_pwa_banner_dismissed');
    if (bannerDismissed === 'true') {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('aura_pwa_banner_dismissed', 'true');
  };

  if (isStandalone || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-zinc-900/95 dark:bg-zinc-950/95 text-zinc-100 border border-amber-500/40 p-4 shadow-2xl backdrop-blur-md font-sans transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            {isIos ? (
              <Apple className="w-5 h-5 text-amber-400" />
            ) : (
              <Smartphone className="w-5 h-5 text-amber-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              <Sparkles className="w-3 h-3" /> App Móvil Imperio Lux
            </div>
            <p className="text-xs font-semibold text-zinc-100">
              Instala la aplicación en tu iOS o Android
            </p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-zinc-400 hover:text-zinc-200 transition-colors p-1"
          title="Cerrar aviso"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          onClick={handleDismiss}
          className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 hover:text-zinc-200 uppercase tracking-wider"
        >
          Ahora no
        </button>
        <button
          onClick={onOpenModal}
          className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" /> Instalar App
        </button>
      </div>
    </div>
  );
};
