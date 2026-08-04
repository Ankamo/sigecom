import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Send,
  Bot,
  User,
  RefreshCw,
  Feather,
  Gift,
  LineChart,
  FileText,
  Inbox,
  BellRing,
  Volume2,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Trash2,
  MessageSquare
} from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const SaasAiConcierge: React.FC = () => {
  const {
    customers,
    conciergeMessages,
    markConciergeMessageAsRead,
    updateConciergeMessageStatus,
    clearConciergeMessages,
    unreadConciergeCount,
    playAlertSound
  } = useApp();

  const [sectionTab, setSectionTab] = useState<'inbox' | 'ai_chat'>('inbox');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Bienvenido al Concierge IA de Imperio Lux. Estoy entrenado en notas olfativas de nicho, complicaciones horológicas de Ginebra y asesoría para clientes de alta sociedad. ¿En qué le asisto hoy?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          contextType: 'general',
          customerInfo: customers[0]
        })
      });

      const data = await response.json();
      const replyText = data.reply || 'Sin respuesta del asistente.';

      const aiMsg: ChatMessage = {
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Disculpe las molestias, hubo un inconveniente al conectar con el servidor de inteligencia artificial. Intente nuevamente en unos instantes.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    {
      icon: Feather,
      title: 'Descripción Poética',
      prompt: 'Redacta una descripción poética y de ultra-lujo para un nuevo perfume llamado Oud Impérial Extrait con azafrán de Cachemira y rosa de Taif.'
    },
    {
      icon: Gift,
      title: 'Sugerencia Regalo VIP',
      prompt: 'Diseña una propuesta de regalo maridada entre un reloj Tourbillon en Oro Rosa y un extracto de perfume maderoso para un cliente VIP de Platino.'
    },
    {
      icon: LineChart,
      title: 'Análisis de Inventario',
      prompt: 'Recomienda estrategias de stock para la temporada alta de fragancias de ámbar y piezas de alta complejidad horológica.'
    },
    {
      icon: FileText,
      title: 'Carta de Invitación Privada',
      prompt: 'Escribe una carta formal de invitación personalizada para una cata privada de perfumes y exhibición de alta relojería en nuestra boutique de Ginebra.'
    }
  ];

  return (
    <div className="space-y-6 font-sans max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-500/30 mb-2">
            <BellRing className="w-3.5 h-3.5 text-amber-500" />
            Centro de Control de Mensajes al Concierge
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-amber-100">
            Concierge VIP & Notificaciones en Vivo
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Recepción e indexación de mensajes enviados desde el Formulario Web con notificación sonora para Administradores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={playAlertSound}
            className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/40 flex items-center gap-1.5 shadow-sm transition-all"
            title="Probar Alerta Sonora"
          >
            <Volume2 className="w-4 h-4 text-amber-500" /> 🔊 Probar Sonido
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-2 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setSectionTab('inbox')}
          className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-all ${
            sectionTab === 'inbox'
              ? 'border-amber-500 text-amber-700 dark:text-amber-400 bg-amber-500/10 font-extrabold'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Inbox className="w-4 h-4" /> Bandeja de Mensajes ({conciergeMessages.length})
          {unreadConciergeCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] bg-rose-600 text-white font-bold rounded-full animate-pulse">
              {unreadConciergeCount} Nuevos
            </span>
          )}
        </button>

        <button
          onClick={() => setSectionTab('ai_chat')}
          className={`px-4 py-2.5 flex items-center gap-2 border-b-2 transition-all ${
            sectionTab === 'ai_chat'
              ? 'border-amber-500 text-amber-700 dark:text-amber-400 bg-amber-500/10 font-extrabold'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Asistente IA Copywriter
        </button>
      </div>

      {/* TAB 1: INBOX DE MENSAJES RECIBIDOS */}
      {sectionTab === 'inbox' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800">
            <div>
              <h3 className="font-bold text-xs uppercase text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                Mensajes Enviados por Usuarios
              </h3>
              <p className="text-[11px] text-zinc-500">
                Cualquier mensaje enviado a través del formulario de contacto sonará y se registrará aquí inmediatamente.
              </p>
            </div>
            {conciergeMessages.length > 0 && (
              <button
                onClick={clearConciergeMessages}
                className="px-2.5 py-1 text-[11px] text-rose-600 hover:text-rose-700 dark:text-rose-400 border border-rose-500/30 font-semibold flex items-center gap-1 hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Limpiar Bandeja
              </button>
            )}
          </div>

          {conciergeMessages.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <Inbox className="w-12 h-12 text-zinc-400 mx-auto opacity-50" />
              <h4 className="font-serif text-lg font-bold text-zinc-700 dark:text-zinc-300">
                Sin Mensajes Pendientes
              </h4>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                No hay solicitudes de clientes en este momento. Cuando un usuario llene el formulario al Concierge, sonará una alerta de audio y aparecerá aquí.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {conciergeMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 bg-white dark:bg-zinc-900 border transition-all shadow-sm ${
                    !msg.read
                      ? 'border-amber-500/70 bg-amber-500/5 dark:bg-amber-500/10'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                          msg.status === 'Nuevo'
                            ? 'bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-500/40 animate-pulse'
                            : msg.status === 'En Atención'
                            ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {msg.status}
                      </span>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        {msg.name}
                      </h4>
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                        ({msg.subject})
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" /> {msg.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-3.5 border border-zinc-200 dark:border-zinc-800 font-serif italic">
                      "{msg.message}"
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap items-center gap-4 text-zinc-600 dark:text-zinc-400">
                        <a
                          href={`mailto:${msg.email}`}
                          className="flex items-center gap-1.5 hover:text-amber-500 font-medium"
                        >
                          <Mail className="w-3.5 h-3.5 text-amber-500" /> {msg.email}
                        </a>
                        {msg.phone && msg.phone !== 'No especificado' && (
                          <a
                            href={`https://wa.me/${msg.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 hover:text-emerald-500 font-medium"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-500" /> {msg.phone}
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={msg.status}
                          onChange={(e) =>
                            updateConciergeMessageStatus(msg.id, e.target.value as any)
                          }
                          className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
                        >
                          <option value="Nuevo">Estado: Nuevo</option>
                          <option value="En Atención">Estado: En Atención</option>
                          <option value="Atendido">Estado: Atendido</option>
                        </select>

                        {!msg.read && (
                          <button
                            onClick={() => markConciergeMessageAsRead(msg.id)}
                            className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-sm transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Marcar Leído
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CHAT CON ASISTENTE IA */}
      {sectionTab === 'ai_chat' && (
        <div className="space-y-6">
          {/* Quick Prompts Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickPrompts.map((q, idx) => {
              const QIcon = q.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSend(q.prompt)}
                  className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 text-left transition-all group"
                >
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1 font-semibold text-xs">
                    <QIcon className="w-4 h-4" />
                    <span>{q.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {q.prompt}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Chat Container */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col h-[500px]">
            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 max-w-3xl ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.sender === 'user'
                        ? 'bg-zinc-800 text-amber-300'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`p-4 text-xs leading-relaxed space-y-1 font-sans ${
                      msg.sender === 'user'
                        ? 'bg-amber-600 text-white font-medium'
                        : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 whitespace-pre-wrap'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`block text-[9px] ${msg.sender === 'user' ? 'text-amber-200' : 'text-zinc-400'} text-right`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-semibold animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>El Concierge IA está redactando la respuesta...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex gap-3"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Pregunte sobre notas olfativas, piezas de relojería o pida redactar copy..."
                className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs uppercase font-bold tracking-wider flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
