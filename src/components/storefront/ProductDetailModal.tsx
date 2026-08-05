import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
  Droplet,
  Watch,
  Clock,
  Wind
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist
  } = useApp();

  if (!selectedProduct) return null;

  const [activeImage, setActiveImage] = useState(
    selectedProduct.gallery ? selectedProduct.gallery[0] : selectedProduct.image
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct.volumeOrSizes ? selectedProduct.volumeOrSizes[0] : ''
  );
  const [engravingText, setEngravingText] = useState('');
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlist.includes(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedSize, engravingText);
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 border border-amber-900/20 dark:border-amber-500/20 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-amber-300 transition-colors bg-white/80 dark:bg-zinc-800/80 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-950 overflow-hidden border border-amber-500/10">
              <img
                src={activeImage}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-900/90 text-amber-300 border border-amber-500/30">
                {selectedProduct.luxuryTier}
              </span>
            </div>

            {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
              <div className="flex items-center gap-3">
                {selectedProduct.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-16 h-16 border overflow-hidden transition-all ${
                      activeImage === imgUrl
                        ? 'border-amber-500 ring-1 ring-amber-500'
                        : 'border-zinc-300 dark:border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-sans tracking-widest uppercase">
                <span>{selectedProduct.brand}</span>
                <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{selectedProduct.rating} ({selectedProduct.reviewsCount} reseñas)</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-amber-100 mt-1">
                {selectedProduct.name}
              </h2>

              <div className="mt-3 text-xl sm:text-2xl font-serif font-bold text-amber-700 dark:text-amber-300">
                {formatPrice(selectedProduct.priceUSD)}
              </div>

              <p className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-light">
                {selectedProduct.description}
              </p>

              {/* PERFUME SPECIFIC: Fragrance Pyramid */}
              {selectedProduct.category === 'perfume' && selectedProduct.fragranceNotes && (
                <div className="mt-6 p-4 bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 space-y-3">
                  <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-amber-500" />
                    Pirámide Olfativa
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-zinc-700 dark:text-zinc-300 font-sans">
                    <div>
                      <span className="font-bold text-amber-700 dark:text-amber-400 block uppercase text-[10px]">Notas de Salida</span>
                      <p>{Array.isArray(selectedProduct.fragranceNotes.top) ? selectedProduct.fragranceNotes.top.join(', ') : 'N/A'}</p>
                    </div>
                    <div>
                      <span className="font-bold text-amber-700 dark:text-amber-400 block uppercase text-[10px]">Notas de Corazón</span>
                      <p>{Array.isArray(selectedProduct.fragranceNotes.heart) ? selectedProduct.fragranceNotes.heart.join(', ') : 'N/A'}</p>
                    </div>
                    <div>
                      <span className="font-bold text-amber-700 dark:text-amber-400 block uppercase text-[10px]">Notas de Fondo</span>
                      <p>{Array.isArray(selectedProduct.fragranceNotes.base) ? selectedProduct.fragranceNotes.base.join(', ') : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-amber-500/10 flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /> Longevidad: {selectedProduct.fragranceNotes.longevity}</span>
                    <span className="flex items-center gap-1"><Wind className="w-3 h-3 text-amber-500" /> Estela: {selectedProduct.fragranceNotes.sillage}</span>
                  </div>
                </div>
              )}

              {/* WATCH SPECIFIC: Technical Specs */}
              {selectedProduct.category === 'watch' && selectedProduct.watchSpecs && (
                <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-3">
                  <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <Watch className="w-3.5 h-3.5 text-amber-500" />
                    Especificaciones Horológicas Suizas
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-zinc-700 dark:text-zinc-300 font-sans">
                    <div><span className="text-zinc-500">Movimiento:</span> {selectedProduct.watchSpecs.movement}</div>
                    <div><span className="text-zinc-500">Caja:</span> {selectedProduct.watchSpecs.caseMaterial}</div>
                    <div><span className="text-zinc-500">Reserva de Marcha:</span> {selectedProduct.watchSpecs.powerReserve}</div>
                    <div><span className="text-zinc-500">Hermeticidad:</span> {selectedProduct.watchSpecs.waterResistance}</div>
                    <div><span className="text-zinc-500">Correa:</span> {selectedProduct.watchSpecs.strap}</div>
                    <div><span className="text-zinc-500">Diámetro:</span> {selectedProduct.watchSpecs.caseDiameter}</div>
                  </div>
                </div>
              )}

              {/* Volume Selection for Perfumes */}
              {selectedProduct.volumeOrSizes && selectedProduct.volumeOrSizes.length > 0 && (
                <div className="mt-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-2">
                    Presentación:
                  </label>
                  <div className="flex gap-2">
                    {selectedProduct.volumeOrSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                          selectedSize === size
                            ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold'
                            : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Engraving Option */}
              <div className="mt-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center justify-between mb-1">
                  <span>Grabado Personalizado Artesanal:</span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-normal">Cortesia VIP</span>
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="Ej: M.V. - MCMLXXXVIII o Nombre"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Actions Bar */}
            <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-zinc-300 dark:border-zinc-700">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold text-zinc-900 dark:text-amber-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-semibold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Añadir a la Bolsa
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-3 border transition-all ${
                    isWishlisted
                      ? 'bg-amber-500 text-zinc-950 border-amber-500'
                      : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-amber-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-around text-[10px] text-zinc-500 dark:text-zinc-400 pt-2">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Garantía de Autenticidad</span>
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-amber-500" /> Estuche de Terciopelo Incluido</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
