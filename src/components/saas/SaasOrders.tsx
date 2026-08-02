import React from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { ShoppingBag, Gift, Printer, Trash2, RefreshCw, Sparkles, Zap } from 'lucide-react';

export const SaasOrders: React.FC = () => {
  const { orders, updateOrderStatus, formatPrice, clearOrdersDatabase, seedDefaultOrders } = useApp();

  const printInvoice = (order: Order) => {
    alert(`Generando Comprobante Fiscal e Histórico de Despacho para la orden: ${order.id}\nCliente: ${order.customerName}\nTotal: ${formatPrice(order.totalUSD)}`);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold text-amber-600 dark:text-amber-400 tracking-widest block">
              Flujo de Despacho Blindado
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3 animate-pulse" /> Sincronizado en BD
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-amber-100 mt-1">
            Gestión de Pedidos & Ventas
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {orders.length > 0 ? (
            <button
              onClick={() => {
                if (window.confirm('¿Deseas vaciar la base de datos de pedidos e iniciar las ventas en 0?')) {
                  clearOrdersDatabase();
                }
              }}
              className="px-3 py-2 bg-rose-600/10 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white border border-rose-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              title="Vaciar pedidos en la base de datos"
            >
              <Trash2 className="w-3.5 h-3.5" /> Vaciar Ventas (0)
            </button>
          ) : (
            <button
              onClick={() => seedDefaultOrders()}
              className="px-3 py-2 bg-amber-500/10 hover:bg-amber-600 text-amber-700 dark:text-amber-300 hover:text-white border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              title="Cargar pedidos demo"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Cargar Pedidos Demo
            </button>
          )}
        </div>
      </div>

      {/* Orders Table or Empty State */}
      {orders.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
          <div className="w-16 h-16 mx-auto bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30">
              <Sparkles className="w-3 h-3" /> Base de Datos Iniciada en 0
            </span>
            <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-100">
              0 Pedidos Registrados
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Actualmente no hay ventas en el sistema. Los nuevos pedidos realizados desde la boutique virtual se sincronizarán en tiempo real actualizando automáticamente las métricas financieras.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => seedDefaultOrders()}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Cargar Pedidos de Muestra
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs text-zinc-700 dark:text-zinc-300">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-500 uppercase font-semibold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-3.5">ID Orden</th>
                <th className="p-3.5">Cliente VIP</th>
                <th className="p-3.5">Artículos & Grabados</th>
                <th className="p-3.5">Total ($ COP)</th>
                <th className="p-3.5">Empaque de Lujo</th>
                <th className="p-3.5">Estado del Pedido</th>
                <th className="p-3.5 text-right">Comprobante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="p-3.5 font-mono font-bold text-amber-700 dark:text-amber-400">
                    {order.id}
                    <span className="block text-[10px] text-zinc-500 font-sans font-normal">{order.date}</span>
                  </td>

                  <td className="p-3.5">
                    <span className="font-serif font-bold text-zinc-900 dark:text-amber-100 block">{order.customerName}</span>
                    <span className="text-[10px] text-zinc-500 block">{order.email}</span>
                  </td>

                  <td className="p-3.5 space-y-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="text-[11px]">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-200">{it.quantity}x {it.productName}</span>
                        {it.engravingText && (
                          <span className="block text-[10px] text-amber-600 dark:text-amber-400 italic">
                            Grabado: "{it.engravingText}"
                          </span>
                        )}
                      </div>
                    ))}
                    {order.complementarySample && (
                      <span className="inline-block text-[9px] uppercase bg-amber-500/10 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 border border-amber-500/20">
                        Muestra: {order.complementarySample}
                      </span>
                    )}
                  </td>

                  <td className="p-3.5 font-serif font-bold text-zinc-900 dark:text-amber-200">
                    {formatPrice(order.totalUSD)}
                  </td>

                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-2 py-0.5 border border-amber-500/30">
                      <Gift className="w-3 h-3" /> Terciopelo VIP
                    </span>
                  </td>

                  <td className="p-3.5">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 px-2 py-1 text-xs font-bold text-amber-700 dark:text-amber-300 focus:outline-none"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Preparación">En Preparación</option>
                      <option value="Empaque de Lujo">Empaque de Lujo</option>
                      <option value="Enviado">Enviado</option>
                      <option value="Entregado">Entregado</option>
                    </select>
                  </td>

                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => printInvoice(order)}
                      className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-600 hover:text-white text-zinc-700 dark:text-zinc-300 transition-colors"
                      title="Imprimir Comprobante Fiscal"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
