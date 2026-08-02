import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  X,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Building2,
  QrCode,
  Calendar,
  Gem,
  Award,
  Zap
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ContactTab = 'whatsapp' | 'form' | 'boutiques';

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { whatsappNumber } = useApp();
  const [activeTab, setActiveTab] = useState<ContactTab>('form');
  const [subject, setSubject] = useState('Asesoría de Perfumes de Nicho');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const waCustomMessage = `Hola Imperio Luz, solicito asesoría sobre: ${subject}.${message ? ` Nota: ${message}` : ''}`;
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waCustomMessage)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(waLink)}&color=059669&bg=ffffff`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/85 backdrop-blur-md font-sans overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto bg-white dark:bg-zinc-900 border border-amber-500/40 p-5 sm:p-8 shadow-2xl text-zinc-900 dark:text-zinc-100 max-h-[92vh] overflow-y-auto rounded-none transition-colors duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-amber-300 bg-zinc-100 dark:bg-zinc-800 transition-colors rounded-full"
          title="Cerrar Ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 border-b border-zinc-200 dark:border-zinc-800 pb-4 pr-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Escríbenos • Concierge Privado
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3 animate-pulse" /> En Línea
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-amber-100">
            Formulario de Contacto & Asesoría
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Completa tus datos a continuación o comunícate directamente por WhatsApp con nuestros sommeliers de fragancias y maestros relojeros.
          </p>
        </div>

        {/* Channel Navigation Tabs */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 mb-5 gap-2 text-xs font-bold uppercase tracking-wider overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-3.5 py-2 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'form'
                ? 'border-amber-500 text-amber-700 dark:text-amber-400 bg-amber-500/10 font-extrabold'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Send className="w-4 h-4" /> Formulario al Concierge
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3.5 py-2 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'whatsapp'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-extrabold'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Directo
          </button>
          <button
            onClick={() => setActiveTab('boutiques')}
            className={`px-3.5 py-2 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'boutiques'
                ? 'border-amber-500 text-amber-700 dark:text-amber-400 bg-amber-500/10 font-extrabold'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Building2 className="w-4 h-4" /> Boutiques Presenciales
          </button>
        </div>

        {/* TAB 1: WHATSAPP DIRECTO */}
        {activeTab === 'whatsapp' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase text-amber-700 dark:text-amber-400 tracking-wider">
                  ¿Sobre qué tema deseas consultar?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Asesoría de Perfumes de Nicho',
                    'Alta Relojería Suiza',
                    'Agendar Cita en Boutique',
                    'Grabados & Empaque VIP'
                  ].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSubject(topic)}
                      className={`p-2 text-left text-xs font-semibold border transition-all ${
                        subject === topic
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-400 hover:border-emerald-500/50'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Mensaje opcional para WhatsApp:
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ej: Quisiera conocer el precio especial y disponibilidad inmediata..."
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/20"
              >
                <MessageCircle className="w-5 h-5" /> Iniciar Chat por WhatsApp (+{whatsappNumber})
              </a>

              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-center">
                Atención directa disponible 24/7. Tiempo estimado de respuesta: &lt; 5 minutos.
              </p>
            </div>

            <div className="md:col-span-5 bg-zinc-50 dark:bg-zinc-950 border border-emerald-500/30 p-5 text-center space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                <QrCode className="w-3.5 h-3.5" /> Escanea para móvil
              </span>
              <div className="flex justify-center">
                <img
                  src={qrCodeUrl}
                  alt="QR WhatsApp Imperio Luz"
                  className="w-32 h-32 border-2 border-emerald-500 p-1 bg-white shadow-md"
                />
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                Abre la cámara de tu celular para conversar al instante con nuestro sommelier.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: FORMULARIO AL CONCIERGE */}
        {activeTab === 'form' && (
          <div>
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-100">
                  ¡Mensaje Enviado con Éxito!
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                  Un embajador de Imperio Luz se comunicará contigo al correo o teléfono proporcionado en menos de 2 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-50 dark:bg-zinc-950 p-5 border border-zinc-200 dark:border-zinc-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Carlos Mendoza"
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="cliente@ejemplo.com"
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                      Teléfono / WhatsApp (Opcional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+57 300 000 0000"
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                      Motivo de Contacto
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Asesoría de Perfumes de Nicho">Asesoría de Perfumes de Nicho</option>
                      <option value="Alta Relojería Suiza">Alta Relojería Suiza</option>
                      <option value="Agendar Cita Privada">Agendar Cita Privada en Boutique</option>
                      <option value="Grabados & Regalos VIP">Grabados & Regalos VIP</option>
                      <option value="Soporte y Garantía">Soporte y Garantía</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                    Mensaje o Solicitud Especial *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Escribe tus requerimientos específicos o inquietudes..."
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Send className="w-4 h-4" /> Enviar Mensaje al Concierge
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: BOUTIQUES PRESENCIALES */}
        {activeTab === 'boutiques' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold uppercase text-xs">
                  <MapPin className="w-4 h-4" /> Atelier París
                </div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  28 Place Vendôme, 75001 París, Francia
                </p>
                <p className="text-[11px] text-zinc-500">Atención con cita previa para cata de extractos.</p>
                <div className="pt-2 text-[10px] text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Lun - Sáb: 10:00 - 19:00
                </div>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold uppercase text-xs">
                  <MapPin className="w-4 h-4" /> Boutique Madrid
                </div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  Calle de Serrano 42, Salamanca, Madrid
                </p>
                <p className="text-[11px] text-zinc-500">Muestra de alta relojería y grabados en vivo.</p>
                <div className="pt-2 text-[10px] text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Lun - Sáb: 10:30 - 20:00
                </div>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold uppercase text-xs">
                  <MapPin className="w-4 h-4" /> Studio CDMX
                </div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  Av. Presidente Masaryk 310, Polanco, CDMX
                </p>
                <p className="text-[11px] text-zinc-500">Servicio de Concierge y entregas en estuche blindado.</p>
                <div className="pt-2 text-[10px] text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Lun - Dom: 11:00 - 20:00
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs uppercase text-zinc-900 dark:text-amber-200">
                    ¿Deseas agendar una cita privada en boutique?
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Reservamos el Atelier en exclusiva para tu degustación de fragancias y prueba de relojería.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSubject('Agendar Cita Privada');
                  setActiveTab('form');
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow-sm"
              >
                Agendar Cita Privada
              </button>
            </div>
          </div>
        )}

        {/* Footer info in modal */}
        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500">
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-amber-500" /> Línea Directa VIP: +34 91 000 1888
          </span>
          <span className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-amber-500" /> concierge@imperioluz.com
          </span>
        </div>
      </div>
    </div>
  );
};

