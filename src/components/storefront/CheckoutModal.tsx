import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, ShieldCheck, Sparkles, Lock, CreditCard } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    formatPrice,
    addOrder
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sampleChoice, setSampleChoice] = useState('Velvet Iris 2ml');
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const totalUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    addOrder({
      id: orderId,
      customerName: name || 'Cliente VIP',
      email: email || 'cliente@luxure.com',
      phone: phone || '+34 600 000 000',
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        priceUSD: item.product.priceUSD,
        engravingText: item.engravingText
      })),
      totalUSD,
      status: 'En Preparación',
      date: new Date().toISOString().split('T')[0],
      luxuryPackaging: true,
      complementarySample: sampleChoice,
      shippingAddress: address || 'Dirección de Entrega VIP'
    });

    setLastOrderId(orderId);
    setIsSuccess(true);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-amber-900/30 dark:border-amber-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        <button
          onClick={() => {
            setIsCheckoutOpen(false);
            setIsSuccess(false);
          }}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-amber-300"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-amber-500/20 border border-amber-500 rounded-full flex items-center justify-center mx-auto text-amber-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-zinc-900 dark:text-amber-100">
              ¡Pedido VIP Confirmado!
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              Número de seguimiento: <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{lastOrderId}</span>
            </p>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Hemos enviado los detalles de su orden a su correo. Un concierge asignado coordinará el empaque con grabado artesanal y el envío blindado.
            </p>
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setIsSuccess(false);
              }}
              className="mt-4 px-6 py-2.5 bg-amber-600 text-white font-semibold text-xs uppercase tracking-wider"
            >
              Volver a la Boutique
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <span className="text-[10px] uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block">
                Finalización de Compra VIP
              </span>
              <h2 className="font-serif text-2xl font-semibold text-zinc-900 dark:text-amber-100">
                Detalles de Envío y Pago
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Nombre Completo:</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Victoria de la Serna"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Correo Electrónico:</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="victoria@luxure.com"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Teléfono Móvil VIP:</label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+34 600 000 000"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Muestra Gratuita de Regalo:</label>
                <select
                  value={sampleChoice}
                  onChange={(e) => setSampleChoice(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="Velvet Iris 2ml">Velvet Iris 2ml Extrait</option>
                  <option value="Oud Impérial 2ml">Oud Impérial 2ml Extrait</option>
                  <option value="Citrus Zest 2ml">Citrus Zest 2ml Parfum</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Dirección de Entrega Confidencial:</label>
                <input
                  required
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Paseo de la Castellana 142, Madrid"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="p-4 bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
              <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-300">
                <span>Resumen de Orden:</span>
                <span className="font-bold font-serif text-amber-700 dark:text-amber-300 text-sm">
                  {formatPrice(totalUSD)}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-500" /> Transacción encriptada con grado bancario de 256 bits.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-semibold text-xs tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" /> Confirmar Pedido de Lujo ({formatPrice(totalUSD)})
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
