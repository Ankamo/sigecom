import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Star, Sparkles, MessageSquare, Plus, Mail, Phone, Calendar } from 'lucide-react';

export const SaasCRM: React.FC = () => {
  const { customers, addCustomerNote, formatPrice, setActiveTab } = useApp();

  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (customerId: string) => {
    if (!newNote.trim()) return;
    addCustomerNote(customerId, newNote);
    setNewNote('');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <span className="text-xs uppercase font-semibold text-amber-600 dark:text-amber-400 tracking-widest block mb-1">
          Relaciones VIP & Clienteling Privado
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-amber-100">
          Base de Clientes de Alta Sociedad
        </h1>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-12 h-12 rounded-full object-cover border border-amber-500/30"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    {customer.tier}
                  </span>
                  <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-amber-100 mt-0.5">
                    {customer.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400 border-t border-b border-zinc-100 dark:border-zinc-800 py-3">
                <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-amber-500" /> {customer.email}</p>
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-amber-500" /> {customer.phone}</p>
                <p className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-amber-500" /> Última Compra: {customer.lastPurchaseDate}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Acumulado Histórico:</span>
                <span className="font-serif text-lg font-bold text-amber-700 dark:text-amber-300">
                  {formatPrice(customer.totalSpentUSD)}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Notas del Concierge:</span>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-950 p-2.5 border border-zinc-200 dark:border-zinc-800 font-light italic whitespace-pre-line">
                  {customer.conciergeNotes}
                </p>
              </div>
            </div>

            {/* Add Note & AI Gift Proposal */}
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              {selectedCustomerId === customer.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Escriba nueva observación VIP..."
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border text-xs p-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddNote(customer.id)}
                      className="flex-1 py-1 bg-amber-600 text-white text-[10px] font-bold uppercase"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setSelectedCustomerId(null)}
                      className="px-2 py-1 border text-[10px] uppercase"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedCustomerId(customer.id)}
                  className="w-full py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs uppercase font-semibold flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Agregar Nota de Concierge
                </button>
              )}

              <button
                onClick={() => setActiveTab('ai_concierge')}
                className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Generar Regalo IA
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
