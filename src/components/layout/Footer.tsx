import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MapPin, Mail, Phone, ShieldCheck, Clock, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setViewMode, setActiveTab } = useApp();

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-t border-amber-900/10 dark:border-amber-900/30 font-sans transition-colors duration-300">
      {/* Guarantees Bar */}
      <div className="border-b border-zinc-200 dark:border-zinc-900 bg-amber-500/5 dark:bg-zinc-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-zinc-900 dark:text-amber-200 font-semibold text-sm uppercase tracking-wider">
                Autenticidad Certificada
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                Cada pieza horológica y extracto de perfume cuenta con sello de autenticidad.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-zinc-900 dark:text-amber-200 font-semibold text-sm uppercase tracking-wider">
                Garantía de Por Vida
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                Servicio de mantenimiento suizo en alta relojería y maceración artesanal.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-zinc-900 dark:text-amber-200 font-semibold text-sm uppercase tracking-wider">
                Concierge Privado 24/7
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                Atención personalizada para clientes VIP y grabados hechos a medida.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-amber-500/50 flex items-center justify-center font-serif text-amber-600 dark:text-amber-400 font-bold text-lg">
              IL
            </div>
            <div>
              <span className="font-serif text-xl tracking-widest text-zinc-900 dark:text-amber-100 uppercase font-semibold block">
                IMPERIO LUZ
              </span>
              <span className="text-[9px] text-amber-700 dark:text-amber-400/80 font-sans tracking-widest uppercase block">
                El Resplandor del Lujo Atemporal
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Imperio Luz: La convergencia definitiva entre los elixires olfativos de Grasse y la maestría micro-mecánica de la alta relojería de Ginebra.
          </p>
          <div className="pt-2">
            <span className="text-[10px] uppercase tracking-widest text-amber-700 dark:text-amber-400/80 block font-semibold mb-2">
              Boutiques Presenciales:
            </span>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Rue du Rhône 42, Genéve, Suiza</p>
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Paseo de la Reforma 222, CDMX</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-serif text-zinc-900 dark:text-amber-200 text-sm font-semibold tracking-wider uppercase mb-4 border-b border-amber-900/20 dark:border-amber-900/40 pb-2">
            Boutique & Colección
          </h4>
          <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
            <li>
              <button onClick={() => { setViewMode('storefront'); setActiveTab('perfumes'); }} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Perfumes de Nicho (Extractos de Oud & Ámbar)
              </button>
            </li>
            <li>
              <button onClick={() => { setViewMode('storefront'); setActiveTab('watches'); }} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Alta Relojería (Tourbillons & Esqueletos)
              </button>
            </li>
            <li>
              <button onClick={() => { setViewMode('storefront'); setActiveTab('story'); }} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Historia de la Maison & Atelier
              </button>
            </li>
            <li>
              <button onClick={() => { setViewMode('saas_dashboard'); setActiveTab('analytics'); }} className="text-amber-700 dark:text-amber-400 font-bold hover:underline flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Acceso a Portal SaaS de Gestión
              </button>
            </li>
          </ul>
        </div>

        {/* Atelier Services */}
        <div>
          <h4 className="font-serif text-amber-200 text-sm font-semibold tracking-wider uppercase mb-4 border-b border-amber-900/40 pb-2">
            Servicios Privados
          </h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li>Grabado Personalizado en Frascos y Cajas</li>
            <li>Restauración de Movimientos Suizos</li>
            <li>Formulación de Fragancia Personalizada</li>
            <li>Envío Blindado Asegurado</li>
            <li>Cajas de Regalo en Terciopelo y Pan de Oro</li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="font-serif text-amber-200 text-sm font-semibold tracking-wider uppercase mb-4 border-b border-amber-900/40 pb-2">
            Círculo de Privilegios
          </h4>
          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            Reciba invitaciones exclusivas a catas olfativas y lanzamientos limitados de alta relojería.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Gracias por unirse al Círculo de Privilegios Imperio Luz.'); }} className="space-y-2">
            <input
              type="email"
              placeholder="Su correo corporativo o personal"
              required
              className="w-full bg-zinc-900 border border-amber-900/50 text-xs text-amber-100 px-3 py-2 focus:outline-none focus:border-amber-400 placeholder:text-zinc-600 font-sans"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-semibold text-xs py-2 uppercase tracking-widest transition-all"
            >
              Unirse al Círculo
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-zinc-900 py-6 px-4 text-center text-[11px] text-zinc-500">
        <p>© 2026 Imperio Luz — Haute Parfumerie & Horlogerie S.A. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
