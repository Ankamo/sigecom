import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Hola Atelier Imperio Luz, me gustaría solicitar una consulta privada de perfumes y alta relojería.');

  const whatsappNumber = '525512345678'; // Official Concierge Number

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Expanded Quick Message Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white dark:bg-zinc-900 border border-amber-500/40 p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-200 text-zinc-900 dark:text-zinc-100 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-700 dark:hover:text-amber-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-3">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-md">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Concierge Imperio Luz
              </p>
              <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Atención Personalizada en Vivo
              </h4>
            </div>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
            Nuestro sommelier de fragancias y especialista en alta relojería atenderá tu solicitud de inmediato por WhatsApp.
          </p>

          <form onSubmit={handleSend} className="space-y-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500 font-sans resize-none"
              placeholder="Escribe tu mensaje aquí..."
            />

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> Iniciar Chat en WhatsApp
            </button>
          </form>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-emerald-400/50"
        title="Contactar Concierge por WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200" />
        </span>

        {/* WhatsApp Icon */}
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.15 4.195 4.293-1.128z" />
        </svg>

        <span className="font-bold text-xs uppercase tracking-wider hidden sm:inline">
          WhatsApp Concierge
        </span>
      </button>
    </div>
  );
};
