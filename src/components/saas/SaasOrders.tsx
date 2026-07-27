import React from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { ShoppingBag, Truck, CheckCircle2, Gift, Printer, FileText } from 'lucide-react';

export const SaasOrders: React.FC = () => {
  const { orders, updateOrderStatus, formatPrice } = useApp();

  const printInvoice = (order: Order) => {
    alert(`Generando Comprobante Fiscal e Histórico de Despacho para la orden: ${order.id}\nCliente: ${order.customerName}\nTotal: ${formatPrice(order.totalUSD)}`);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <span className="text-xs uppercase font-semibold text-amber-600 dark:text-amber-400 tracking-widest block mb-1">
          Flujo de Despacho Blindado
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-amber-100">
          Gestión de Pedidos & Envíos VIP
        </h1>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs text-zinc-700 dark:text-zinc-300">
          <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-500 uppercase font-semibold border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="p-3.5">ID Orden</th>
              <th className="p-3.5">Cliente VIP</th>
              <th className="p-3.5">Artículos & Grabados</th>
              <th className="p-3.5">Total</th>
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
    </div>
  );
};
