import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, Bot, User, RefreshCw, Feather, Gift, LineChart, FileText } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const SaasAiConcierge: React.FC = () => {
  const { customers } = useApp();

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
    <div className="space-y-6 font-sans max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-500/30 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Servidor Gemini AI Server-Side Activo
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-amber-100">
          Asistente IA Concierge & Copywriter
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Generación automática de redacción comercial, maridajes para clientes VIP e inteligencia de catálogo.
        </p>
      </div>

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
  );
};
