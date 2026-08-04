import React from 'react';
import { Award, Compass, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-amber-900/10 dark:border-amber-900/30 font-sans transition-colors duration-300">
      {/* Background Subtle Ambient Texture */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-15 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=2000&q=80"
          alt="Textura de Fondo de Lujo"
          className="w-full h-full object-cover mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-radial-gradient from-amber-500/10 via-zinc-100/80 dark:via-zinc-950/80 to-zinc-100 dark:to-zinc-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase font-semibold text-amber-700 dark:text-amber-400 tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Legado & Alta Artesanía
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-amber-50 leading-tight">
              Donde el Arte de la Fragancia Encuentra la Geometría Sagrada del Tiempo
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
              Fundada bajo el principio de la inmortalidad sensorial y la luminosidad atemporal, <strong>Imperio Lux</strong> une dos tradiciones legendarias: los laboratorios de perfumería de nicho en Grasse, Francia, y la manufactura de alta relojería en Le Locle, Suiza.
            </p>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
              Nuestros perfumistas seleccionan únicamente el 1% superior de materias primas naturales: Oud camboyano añejado durante décadas en barricas, iris noble macerado durante tres años y rosas de Taif cosechadas manualmente al romper el alba.
            </p>
          </div>

          <div className="relative aspect-[4/3] bg-zinc-200 dark:bg-zinc-900 overflow-hidden border border-amber-500/30 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
              alt="Atelier Imperio Lux"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-zinc-950/85 backdrop-blur-md border border-amber-500/30">
              <p className="font-serif text-xs text-amber-200 font-semibold uppercase">Atelier de Alta Horología - Le Locle, Suiza</p>
              <p className="text-[10px] text-zinc-400">Ensamblado a mano por maestros relojeros independientes.</p>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-zinc-200 dark:border-zinc-900">
          <div className="p-6 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-amber-100">Cosecha Sustentable & Ética</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Respetamos los ciclos naturales de la tierra. Nuestros aceites de Oud y florales proceden de plantaciones con certificación de trazabilidad completa.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-amber-100">Micromecánica de Precisión</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Cada movimiento automático y Tourbillon es sometido a 1,000 horas de pruebas rigorosas bajo estándares de cronometría COSC Suiza.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-amber-100">Experiencia VIP a Medida</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Desde grabados monográmicos personalizados hasta cajas de presentación esculpidas en madera noble con acabados en pan de oro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
