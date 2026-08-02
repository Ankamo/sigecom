import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Award, Flame } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveTab, setIsQuizOpen } = useApp();

  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[560px] flex items-center border-b border-amber-900/30">
      {/* Background Image Layer with Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=80"
          alt="Alta Relojeria y Perfumeria de Lujo"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 animate-pulse"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-amber-500/40 bg-amber-500/10 backdrop-blur-md text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Imperio Luz — Haute Parfumerie & Horlogerie
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-amber-50 leading-[1.15]">
            Imperio Luz, <br />
            <span className="font-serif italic font-light text-amber-400 drop-shadow-sm">
              El Resplandor del Lujo Atemporal
            </span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base max-w-xl font-sans leading-relaxed font-light">
            Descubra extractos de perfume de nicho macerados artesanalmente en Grasse y piezas horológicas de precisión suiza con complicaciones de Tourbillon y Fases Lunares.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('perfumes')}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-semibold text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-amber-500/20 flex items-center gap-2"
            >
              Explorar Perfumes de Nicho
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('watches')}
              className="px-6 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 text-amber-200 border border-amber-500/30 font-semibold text-xs tracking-widest uppercase transition-all backdrop-blur-sm"
            >
              Ver Alta Relojería
            </button>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-4 py-3 text-amber-400 hover:text-amber-300 text-xs tracking-wider uppercase font-medium flex items-center gap-1.5 underline underline-offset-4"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              Quiz de Maridaje Personal
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800/80 text-xs text-zinc-400">
            <div>
              <p className="font-serif text-amber-200 font-bold text-base">100% Extracto</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Aceites naturales puros</p>
            </div>
            <div>
              <p className="font-serif text-amber-200 font-bold text-base">Swiss Made</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Ensamblado en Ginebra</p>
            </div>
            <div>
              <p className="font-serif text-amber-200 font-bold text-base">Envío VIP</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Asegurado en estuche</p>
            </div>
          </div>
        </div>

        {/* Hero Visual Card / Spotlight */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="relative mx-auto w-80 h-[420px] p-2 bg-gradient-to-b from-amber-500/20 via-zinc-900 to-amber-950/40 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
            <div className="relative h-full w-full overflow-hidden bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
                alt="Oud Imperial Extrait"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <span className="text-[10px] tracking-widest uppercase text-amber-400 font-bold block mb-1">
                  Pieza de Firma
                </span>
                <h3 className="font-serif text-xl font-bold text-amber-100">
                  Oud Impérial & Chronos Tourbillon
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                  La perfecta sinfonía entre el Oud camboyano añejado y la complicación de Tourbillon volante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
