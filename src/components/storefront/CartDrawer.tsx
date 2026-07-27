import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ShoppingBag, ArrowRight, Gift, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    formatPrice,
    setIsCheckoutOpen
  } = useApp();

  if (!isCartOpen) return null;

  const totalUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/80 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 border-l border-amber-900/20 dark:border-amber-500/20 text-zinc-900 dark:text-zinc-100 shadow-2xl flex flex-col justify-between">
          {/* Cart Header */}
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="font-serif text-lg font-semibold uppercase tracking-wider text-zinc-900 dark:text-amber-100">
                Bolsa de Lujo ({cart.reduce((a, c) => a + c.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-amber-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-zinc-100 dark:divide-zinc-800">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto stroke-1" />
                <p className="font-serif text-base text-zinc-600 dark:text-zinc-400">
                  Su bolsa de compras está vacía.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-amber-600 text-white text-xs uppercase font-semibold tracking-wider"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="pt-4 first:pt-0 flex gap-4 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-zinc-100 dark:bg-zinc-950 border border-amber-500/20 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 block">
                      {item.product.brand}
                    </span>
                    <h3 className="font-serif text-xs font-semibold text-zinc-900 dark:text-amber-50 truncate">
                      {item.product.name}
                    </h3>

                    {item.selectedSize && (
                      <span className="text-[10px] text-zinc-500 block">
                        Presentación: {item.selectedSize}
                      </span>
                    )}

                    {item.engravingText && (
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 block font-light italic">
                        Grabado: "{item.engravingText}"
                      </span>
                    )}

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-zinc-300 dark:border-zinc-700 text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          -
                        </button>
                        <span className="px-2.5 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-serif text-sm font-bold text-zinc-900 dark:text-amber-200">
                          {formatPrice(item.product.priceUSD * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-zinc-400 hover:text-red-500 p-1"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Incluye Estuche de Regalo VIP de Terciopelo y 2 Muestras de Extracto de Cosecha Gratis.</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalUSD)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Envío VIP Asegurado</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">Gratis</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-zinc-900 dark:text-amber-100 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span>Total Estifado</span>
                  <span className="text-amber-700 dark:text-amber-300">{formatPrice(totalUSD)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-semibold text-xs tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Proceder al Pago Seguro VIP
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
