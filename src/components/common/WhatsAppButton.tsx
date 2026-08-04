import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageCircle,
  X,
  Sparkles,
  Send,
  QrCode,
  Settings,
  CheckCircle2,
  PhoneCall,
  ExternalLink,
  Smartphone
} from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { whatsappNumber, setWhatsappNumber, currentUser } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'qr' | 'settings'>('chat');
  const [message, setMessage] = useState('Hola Atelier Imperio Lux, me gustaría solicitar una consulta privada de perfumes y alta relojería.');
  const [editingNumber, setEditingNumber] = useState(whatsappNumber);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Formatted display number
  const formattedPhone = whatsappNumber ? `+${whatsappNumber}` : '+573118444853';
  const encodedMsg = encodeURIComponent(message);
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(waLink)}&color=059669&bg=ffffff`;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waLink, '_blank');
    setIsOpen(false);
  };

  const handleSaveNumber = (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsappNumber(editingNumber);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('chat');
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Expanded Quick Message & QR Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white dark:bg-zinc-900 border border-amber-500/40 p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-200 text-zinc-900 dark:text-zinc-100 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-700 dark:hover:text-amber-300 transition-colors"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-3">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-md">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> WhatsApp Vincular
              </p>
              <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Concierge en Vivo
              </h4>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-800 mb-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-1.5 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              <Send className="w-3.5 h-3.5" /> Mensaje
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex-1 py-1.5 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                activeTab === 'qr'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" /> Código QR
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-1.5 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
              title="Configurar mi número de WhatsApp"
            >
              <Settings className="w-3.5 h-3.5" /> Mi WhatsApp
            </button>
          </div>

          {/* TAB 1: Chat Message Form */}
          {activeTab === 'chat' && (
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2.5 leading-relaxed">
                Escribe tu mensaje para enviarlo directamente a nuestro WhatsApp oficial (<span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{formattedPhone}</span>):
              </p>

              {/* Quick Preset Message Chips */}
              <div className="mb-3 flex flex-wrap gap-1.5">
                {[
                  '💬 Solicitar Catálogo',
                  '⌚ Consulta Alta Relojería',
                  '🌸 Asesoría de Perfumes',
                  '📍 Cita Privada en Atelier'
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setMessage(`Hola Imperio Lux, deseo ${chip.replace(/^[^\s]+\s/, '').toLowerCase()}.`)}
                    className="text-[10px] px-2 py-1 bg-zinc-100 hover:bg-emerald-100 dark:bg-zinc-800 dark:hover:bg-emerald-950/60 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSend} className="space-y-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 font-sans resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" /> Enviar Mensaje por WhatsApp
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: Dynamic QR Code Scanner */}
          {activeTab === 'qr' && (
            <div className="text-center space-y-3 py-1">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Escanea este Código QR con la cámara de tu teléfono o con WhatsApp para vincular y chatear directamente:
              </p>

              <div className="bg-white p-3 border-2 border-emerald-500 inline-block shadow-lg rounded-sm mx-auto">
                <img
                  src={qrCodeUrl}
                  alt="WhatsApp QR Code"
                  className="w-44 h-44 mx-auto object-contain"
                />
              </div>

              <p className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                WhatsApp Vinculado: {formattedPhone}
              </p>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 hover:underline font-bold"
              >
                Abrir enlace directo <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* TAB 3: Link Custom Owner WhatsApp Number */}
          {activeTab === 'settings' && (
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                Ingresa tu número telefónico personal de WhatsApp para recibir todos los mensajes de los clientes en tu dispositivo:
              </p>

              {savedSuccess ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-700 dark:text-emerald-300 text-xs rounded-sm flex items-center gap-2 font-bold mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ¡Número de WhatsApp vinculado exitosamente!
                </div>
              ) : null}

              <form onSubmit={handleSaveNumber} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                    Número de WhatsApp (con código de país)
                  </label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-zinc-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={editingNumber}
                      onChange={(e) => setEditingNumber(e.target.value)}
                      placeholder="ej. 525512345678 o 34600000000"
                      className="w-full pl-9 pr-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Incluye código del país sin espacios ni símbolos (ej: México 52..., España 34..., Chile 56..., Argentina 54...).
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" /> Guardar y Vincular Mi WhatsApp
                </button>
              </form>
            </div>
          )}
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

        {/* WhatsApp SVG Icon */}
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
