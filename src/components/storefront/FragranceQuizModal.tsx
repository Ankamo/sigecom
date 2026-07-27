import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Flame, Check, ArrowRight, RotateCcw } from 'lucide-react';

export const FragranceQuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, products, addToCart, setSelectedProduct } = useApp();

  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState('');
  const [preference, setPreference] = useState('');

  if (!isQuizOpen) return null;

  const handleReset = () => {
    setStep(1);
    setOccasion('');
    setPreference('');
  };

  const getRecommendedProducts = () => {
    if (preference.includes('Oud')) {
      return products.filter((p) => p.id === 'perfume-01' || p.id === 'watch-01');
    } else if (preference.includes('Ámbar')) {
      return products.filter((p) => p.id === 'perfume-02' || p.id === 'watch-02');
    } else if (preference.includes('Floral')) {
      return products.filter((p) => p.id === 'perfume-04' || p.id === 'watch-04');
    }
    return products.filter((p) => p.id === 'perfume-05' || p.id === 'watch-03');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-amber-900/30 dark:border-amber-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsQuizOpen(false);
            handleReset();
          }}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-amber-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Sommelier de Lujo Interactivo
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-amber-100">
            Encuentre su Maridaje Olfativo & Horológico
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Responda 2 preguntas breves para descubrir la fragancia y pieza suiza que reflejan su personalidad.
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-12 h-1 rounded-full ${step >= 1 ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-800'}`} />
          <div className={`w-12 h-1 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-800'}`} />
          <div className={`w-12 h-1 rounded-full ${step >= 3 ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-800'}`} />
        </div>

        {/* STEP 1: Occasion */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-amber-200 text-center uppercase tracking-wider">
              1. ¿Para qué ocasión principal busca su nueva firma?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Gala de Alta Sociedad & Cenas Privadas', desc: 'Presencia magnética, estela intensa y sofisticación nocturna' },
                { title: 'Presidencia & Negociaciones de Poder', desc: 'Carácter distinguido, notas maderosas y precisión Suiza' },
                { title: 'Elegancia Diaria Versátil', desc: 'Sofisticación refinada, frescura sutil y comodidad' },
                { title: 'Coleccionismo Privado & Regalo VIP', desc: 'Piezas exclusivas de edición limitada y frascos de autor' }
              ].map((opt) => (
                <button
                  key={opt.title}
                  onClick={() => {
                    setOccasion(opt.title);
                    setStep(2);
                  }}
                  className="p-4 text-left border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:border-amber-500 hover:bg-amber-500/5 transition-all group"
                >
                  <h4 className="font-serif text-sm font-semibold text-zinc-900 dark:text-amber-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    {opt.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Preference */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-amber-200 text-center uppercase tracking-wider">
              2. ¿Qué acordes o complicaciones atraen más sus sentidos?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Oud Camboyano & Complicación Tourbillon', detail: 'Profundidad mística, notas ahumadas y micro-mecánica expuesta' },
                { label: 'Ámbar Oriental & Fase Lunar en Zafiro', detail: 'Calidez envolvente de bourbon, iris y esferas astronómicas' },
                { label: 'Jazmín de Grasse & Bisel con Diamantes', detail: 'Magentismo floral refinado y brillo atemporal' },
                { label: 'Citrus Zest & Cronógrafo Esqueleto', detail: 'Vigorizante bergamota y cerámica negra de alta ingeniería' }
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => {
                    setPreference(opt.label);
                    setStep(3);
                  }}
                  className="p-4 text-left border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:border-amber-500 hover:bg-amber-500/5 transition-all group"
                >
                  <h4 className="font-serif text-sm font-semibold text-zinc-900 dark:text-amber-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    {opt.label}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                    {opt.detail}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Result */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300">
              <p className="font-serif font-bold text-sm">Su Maridaje de Firma Recomendado:</p>
              <p className="mt-0.5 text-zinc-600 dark:text-zinc-300">Basado en {occasion} y afinidad por {preference}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {getRecommendedProducts().map((prod) => (
                <div key={prod.id} className="p-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex gap-3 items-center">
                  <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover shrink-0" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase font-bold text-amber-600 dark:text-amber-400 block">{prod.brand}</span>
                    <h4 className="font-serif text-xs font-bold text-zinc-900 dark:text-amber-100 truncate">{prod.name}</h4>
                    <p className="text-[10px] text-zinc-500 truncate">{prod.luxuryTier}</p>
                    <button
                      onClick={() => {
                        addToCart(prod);
                        setIsQuizOpen(false);
                      }}
                      className="mt-1 text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      Añadir a la Bolsa <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleReset}
                className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Repetir Quiz
              </button>
              <button
                onClick={() => setIsQuizOpen(false)}
                className="px-6 py-2.5 bg-amber-600 text-white font-semibold text-xs uppercase tracking-wider"
              >
                Cerrar Sommelier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
