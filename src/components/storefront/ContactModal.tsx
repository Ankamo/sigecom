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
  QrCode
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { whatsappNumber } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola Imperio Luz, me gustaría información y asesoría personal.')}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(waLink)}&color=059669&bg=ffffff`;

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
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-amber-500/40 p-6 sm:p-8 shadow-2xl text-zinc-900 dark:text-zinc-100 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-amber-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Atención Privada & Ateliers
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-amber-100">
            Contactar al Atelier Imperio Luz
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Nuestros embajadores de marca y someliers de fragancias están a su disposición para coordinar citas exclusivas o consultas de colección.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-100">
              Solicitud Recibida
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
              Un asesor privado de Imperio Luz se pondrá en contacto con usted en un plazo no mayor a 2 horas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details Column */}
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-amber-700 dark:text-amber-300 flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5" /> Flagship Boutique & Ateliers
                </h3>

                <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <p className="font-bold text-zinc-900 dark:text-amber-200 uppercase text-[11px] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" /> Atelier París
                    </p>
                    <p className="text-[11px] text-zinc-500">28 Place Vendôme, 75001 París, Francia</p>
                  </div>

                  <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <p className="font-bold text-zinc-900 dark:text-amber-200 uppercase text-[11px] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" /> Boutique Madrid
                    </p>
                    <p className="text-[11px] text-zinc-500">Calle de Serrano 42, Salamanca, 28001 Madrid</p>
                  </div>

                  <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <p className="font-bold text-zinc-900 dark:text-amber-200 uppercase text-[11px] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" /> Studio Ciudad de México
                    </p>
                    <p className="text-[11px] text-zinc-500">Av. Presidente Masaryk 310, Polanco, CDMX</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                <p className="flex items-center gap-2 font-medium">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>Atención Directa VIP: +34 91 000 1888 / +52 55 1234 5678</span>
                </p>
                <p className="flex items-center gap-2 font-medium">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span>concierge@imperioluz.com</span>
                </p>
                <p className="flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Horario Concierge: Lunes a Domingo, 24/7 Global</span>
                </p>
              </div>

              {/* Direct WhatsApp Action Link & QR Preview */}
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  <QrCode className="w-4 h-4" /> WhatsApp Directo: +{whatsappNumber}
                </div>
                <div className="flex justify-center">
                  <img src={qrCodeUrl} alt="WhatsApp QR" className="w-24 h-24 border border-emerald-500 p-1 bg-white" />
                </div>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" /> Hablar por WhatsApp Directo
                </a>
              </div>
            </div>

            {/* Inquiry Form Column */}
            <form onSubmit={handleSubmit} className="space-y-3 bg-zinc-50 dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800">
              <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Enviar Mensaje al Concierge
              </h4>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ej. Don Fernando de Aragón"
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Correo Electrónico
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

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Teléfono / WhatsApp (Opcional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+34 600 000 000"
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Mensaje o Solicitud Especial
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Consulta sobre ediciones limitadas, cotización o cita en boutique..."
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md mt-2"
              >
                <Send className="w-3.5 h-3.5" /> Enviar Consulta Privada
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
