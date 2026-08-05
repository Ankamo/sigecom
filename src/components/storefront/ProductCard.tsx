import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, Star, ShoppingBag, Eye, Watch, Droplet, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    setSelectedProduct
  } = useApp();

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative bg-white dark:bg-zinc-900 border border-amber-900/10 dark:border-amber-500/15 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category & Tier Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-900/90 dark:bg-amber-400 text-amber-300 dark:text-zinc-950 backdrop-blur-md border border-amber-500/30">
            {product.category === 'perfume' ? 'Perfume de Nicho' : 'Alta Relojería'}
          </span>
          <span className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest bg-amber-500/20 text-amber-200 border border-amber-500/30 backdrop-blur-md">
            {product.luxuryTier}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all z-10 ${
            isWishlisted
              ? 'bg-amber-500 text-zinc-950 border-amber-400'
              : 'bg-zinc-900/60 text-zinc-300 border-zinc-700/50 hover:bg-zinc-900 hover:text-amber-400'
          }`}
          title="Agregar a la Lista de Deseos"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 z-10">
          <button
            onClick={() => setSelectedProduct(product)}
            className="flex-1 py-2 bg-zinc-900/95 hover:bg-zinc-900 text-amber-200 text-xs uppercase font-medium tracking-wider flex items-center justify-center gap-1.5 border border-amber-500/30 backdrop-blur-md"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            Detalles
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-sans tracking-wider uppercase mb-1">
            <span className="font-semibold">{product.brand}</span>
            <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 text-[11px]">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-serif text-base sm:text-lg font-semibold text-zinc-900 dark:text-amber-50 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer line-clamp-1 transition-colors"
          >
            {product.name}
          </h3>

          {/* Perfume Notes or Watch Specs Snippet */}
          <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            {product.category === 'perfume' && product.fragranceNotes && (
              <p className="line-clamp-1 font-light italic">
                <span className="font-semibold not-italic text-zinc-700 dark:text-zinc-300">Familia:</span> {product.fragranceNotes.family || 'Fragancia Novedosa'} {Array.isArray(product.fragranceNotes.top) ? `(${product.fragranceNotes.top.slice(0, 2).join(', ')})` : ''}
              </p>
            )}
            {product.category === 'watch' && product.watchSpecs && (
              <p className="line-clamp-1 font-light">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Movimiento:</span> {product.watchSpecs.movement} • {product.watchSpecs.caseMaterial}
              </p>
            )}
          </div>
        </div>

        {/* Price & Add To Cart Button */}
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <div>
            <span className="font-serif text-lg font-bold text-zinc-900 dark:text-amber-200">
              {formatPrice(product.priceUSD)}
            </span>
            <span className="block text-[10px] text-zinc-600 dark:text-zinc-400 uppercase font-sans">
              Tax Included
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2.5 bg-zinc-900 dark:bg-amber-500 text-amber-300 dark:text-zinc-950 hover:bg-amber-600 dark:hover:bg-amber-400 transition-colors flex items-center justify-center"
            title="Añadir a la Bolsa"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
