import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Mail,
  Send,
  X,
  CheckCircle2,
  Zap,
  Globe,
  BellRing
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { addConciergeMessage } = useApp();
  const [subject, setSubject] = useState('Asesoría de Perfumes de Nicho');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    addConciergeMessage({
      name,
      email,
      phone,
      subject,
      message
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-zinc-950/85 backdrop-blur-md font-sans overflow-y-auto">
      <div className="relative w-full max-w-xl my-auto bg-white dark:bg-zinc-900 border border-amber-500/40 p-5 sm:p-8 shadow-2xl text-zinc-900 dark:text-zinc-100 max-h-[92vh] overflow-y-auto rounded-none transition-colors duration-300">
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
              <Globe className="w-3.5 h-3.5 text-amber-500" /> Concierge Privado VIP Global
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3 animate-pulse" /> Canal Directo Activo
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-amber-100 flex items-center gap-2">
            Formulario al Concierge
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Escribe tus requerimientos a continuación. Tu mensaje notificará inmediatamente con sonido de alerta al Administrador y Super Administrador en el panel de acceso.
          </p>
        </div>

        {/* Form Area */}
        <div>
          {submitted ? (
            <div className="py-10 text-center space-y-4 bg-amber-500/5 border border-amber-500/30 p-6">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-100">
                ¡Mensaje Enviado al Concierge!
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
                Se ha generado la <span className="text-amber-500 font-bold">notificación de alerta sonora</span> en el panel administrativo. Nuestro equipo de atención VIP responderá a tu solicitud a la brevedad.
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
                  rows={4}
                  placeholder="Escribe tus requerimientos específicos o inquietudes..."
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500 resize-none"
                  required
                />
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <BellRing className="w-4 h-4 text-amber-500 shrink-0 animate-bounce" />
                <span>
                  Al enviar este formulario, la aplicación emitirá un sonido de alerta e indexará el mensaje directamente para el Admin y Super Admin.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Send className="w-4 h-4" /> Enviar Mensaje al Concierge
              </button>
            </form>
          )}
        </div>

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

