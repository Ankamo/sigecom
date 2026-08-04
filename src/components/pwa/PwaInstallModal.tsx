import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Share, PlusSquare, CheckCircle, X, Sparkles, Monitor, Apple, Smartphone as AndroidIcon } from 'lucide-react';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);

    // Detect OS
    const ua = navigator.userAgent;
    const isIosDevice = /iPhone|iPad|iPod/i.test(ua);
    const isAndroidDevice = /Android/i.test(ua);

    setIsIos(isIosDevice);
    setIsAndroid(isAndroidDevice);

    // Listen for Chrome / Android beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setInstalledSuccess(true);
      }
      setDeferredPrompt(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden text-zinc-900 dark:text-zinc-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-amber-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Smartphone className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30">
              <Sparkles className="w-3 h-3" /> App PWA Instalable
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-amber-100 mt-1">
              Instalar Imperio Lux
            </h2>
          </div>
        </div>

        {/* Standalone already installed view */}
        {isStandalone ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-amber-200">
              ¡App Instalada Correctamente!
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
              Ya estás disfrutando de Imperio Lux en modo aplicación independiente en tu dispositivo.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-amber-600 text-white text-xs font-bold uppercase tracking-wider"
            >
              Entendido
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Instala la aplicación en tu dispositivo móvil o escritorio para acceder rápidamente sin barras de navegación, con soporte offline y experiencia fluida de alta velocidad.
            </p>

            {/* Android / Desktop Instant Installation */}
            {deferredPrompt && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <AndroidIcon className="w-4 h-4" /> Instalación Directa Disponible
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-800 dark:text-amber-200 px-2 py-0.5">
                    Android / Chrome
                  </span>
                </div>
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Download className="w-4 h-4" /> Instalar en Pantalla de Inicio
                </button>
              </div>
            )}

            {/* iOS Instructions */}
            <div className={`p-4 rounded-none border ${isIos ? 'bg-amber-500/10 border-amber-500/40' : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800'} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase text-zinc-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Apple className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Instrucciones para iPhone / iPad (iOS)
                </span>
                {isIos && (
                  <span className="text-[9px] bg-amber-600 text-white px-2 py-0.5 font-bold uppercase">
                    Tu Dispositivo
                  </span>
                )}
              </div>

              <ol className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 font-sans list-decimal list-inside">
                <li className="leading-relaxed">
                  Abre este sitio en <strong className="text-amber-700 dark:text-amber-300">Safari</strong> en tu iPhone o iPad.
                </li>
                <li className="leading-relaxed flex items-center gap-1 flex-wrap">
                  Toca el botón <strong className="text-amber-700 dark:text-amber-300">Compartir</strong> <Share className="w-3.5 h-3.5 inline text-amber-600 dark:text-amber-400" /> en la barra inferior o superior.
                </li>
                <li className="leading-relaxed flex items-center gap-1 flex-wrap">
                  Desplázate hacia abajo y selecciona <strong className="text-amber-700 dark:text-amber-300">"Agregar a inicio"</strong> <PlusSquare className="w-3.5 h-3.5 inline text-amber-600 dark:text-amber-400" />.
                </li>
                <li className="leading-relaxed">
                  Presiona <strong className="text-amber-700 dark:text-amber-300">"Agregar"</strong> arriba a la derecha. ¡Listo!
                </li>
              </ol>
            </div>

            {/* Android / Chrome Manual Instructions */}
            {!deferredPrompt && (
              <div className={`p-4 rounded-none border ${isAndroid ? 'bg-amber-500/10 border-amber-500/40' : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800'} space-y-3`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase text-zinc-900 dark:text-amber-200 flex items-center gap-1.5">
                    <AndroidIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Instrucciones para Android / Chrome
                  </span>
                  {isAndroid && (
                    <span className="text-[9px] bg-amber-600 text-white px-2 py-0.5 font-bold uppercase">
                      Tu Dispositivo
                    </span>
                  )}
                </div>

                <ol className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 font-sans list-decimal list-inside">
                  <li className="leading-relaxed">
                    Toca el menú de 3 puntos (⋮) en la esquina superior derecha de Chrome.
                  </li>
                  <li className="leading-relaxed">
                    Selecciona <strong className="text-amber-700 dark:text-amber-300">"Instalar aplicación"</strong> o <strong className="text-amber-700 dark:text-amber-300">"Agregar a la pantalla principal"</strong>.
                  </li>
                  <li className="leading-relaxed">
                    Confirma la instalación y abre Imperio Lux desde tu menú de aplicaciones.
                  </li>
                </ol>
              </div>
            )}

            {/* Desktop Info */}
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <Monitor className="w-3.5 h-3.5 text-zinc-400" />
              <span>También compatible con macOS, Windows y Linux mediante Chrome / Edge.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
