import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { SaasProductModal } from './SaasProductModal';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle,
  Droplet,
  Watch,
  Database,
  RefreshCw
} from 'lucide-react';

export const SaasInventory: React.FC = () => {
  const {
    products,
    deleteProduct,
    updateStock,
    formatPrice,
    clearProductsDatabase,
    seedDefaultProducts
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'perfume' | 'watch'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportCSV = () => {
    const headers = 'SKU,Nombre,Categoria,Precio_USD,Stock,Estado\n';
    const rows = products
      .map((p) => `${p.sku},"${p.name}",${p.category},${p.priceUSD},${p.stockQuantity},${p.inStock ? 'Disponible' : 'Agotado'}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventario_aura_chronos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold text-amber-600 dark:text-amber-400 tracking-widest block mb-1">
            Gestión de Almacén
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-amber-100">
            Catálogo & Control de Stock
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {products.length > 0 ? (
            <button
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="px-3.5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md animate-pulse"
              title="Eliminar permanentemente todos los productos del catálogo y la web"
            >
              <Trash2 className="w-4 h-4" /> Eliminar Todo el Catálogo
            </button>
          ) : (
            <button
              onClick={() => seedDefaultProducts()}
              className="px-3.5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
              title="Cargar catálogo de demostración inicial"
            >
              <RefreshCw className="w-4 h-4" /> Restablecer Catálogo Demo
            </button>
          )}

          <button
            onClick={exportCSV}
            className="px-3.5 py-2.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs uppercase font-bold tracking-wider flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Añadir Pieza
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por SKU, Nombre o Marca..."
            className="bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 font-semibold uppercase">Categoría:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 font-semibold uppercase tracking-wider ${
              selectedCategory === 'all'
                ? 'bg-amber-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            Todos ({products.length})
          </button>
          <button
            onClick={() => setSelectedCategory('perfume')}
            className={`px-3 py-1.5 font-semibold uppercase tracking-wider flex items-center gap-1 ${
              selectedCategory === 'perfume'
                ? 'bg-amber-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" /> Perfumes
          </button>
          <button
            onClick={() => setSelectedCategory('watch')}
            className={`px-3 py-1.5 font-semibold uppercase tracking-wider flex items-center gap-1 ${
              selectedCategory === 'watch'
                ? 'bg-amber-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            <Watch className="w-3.5 h-3.5" /> Relojes
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs text-zinc-700 dark:text-zinc-300">
          <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-500 uppercase font-semibold border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="p-3.5">Pieza</th>
              <th className="p-3.5">SKU</th>
              <th className="p-3.5">Categoría</th>
              <th className="p-3.5">Costo & Margen</th>
              <th className="p-3.5">Precio Venta</th>
              <th className="p-3.5">Stock</th>
              <th className="p-3.5">Estado</th>
              <th className="p-3.5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                <td className="p-3.5 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover bg-zinc-950 shrink-0 border border-amber-500/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="font-serif font-bold text-zinc-900 dark:text-amber-100 block">
                      {product.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase">{product.brand}</span>
                  </div>
                </td>

                <td className="p-3.5 font-mono text-[11px] font-bold text-amber-700 dark:text-amber-400">
                  {product.sku}
                </td>

                <td className="p-3.5">
                  <span className="px-2 py-0.5 uppercase font-bold text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-amber-300">
                    {product.category === 'perfume' ? 'Perfume' : 'Reloj'}
                  </span>
                </td>

                <td className="p-3.5">
                  {product.costPrice ? (
                    <div>
                      <span className="font-mono text-zinc-600 dark:text-zinc-400 block text-[11px]">
                        {formatPrice(product.costPrice)}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                        +{product.profitMarginPercent || 30}% ganancia
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-mono text-zinc-500 text-[11px]">
                        {formatPrice(Math.round((product.priceUSD < 10000 ? product.priceUSD * 4000 : product.priceUSD) * 0.7))}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-bold font-mono block">
                        +30% ganancia est.
                      </span>
                    </div>
                  )}
                </td>

                <td className="p-3.5 font-serif font-bold text-zinc-900 dark:text-amber-300 text-sm">
                  {formatPrice(product.priceUSD)}
                </td>

                <td className="p-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateStock(product.id, Math.max(0, product.stockQuantity - 1))}
                      className="px-1.5 py-0.5 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    >
                      -
                    </button>
                    <span className="font-bold w-6 text-center">{product.stockQuantity}</span>
                    <button
                      onClick={() => updateStock(product.id, product.stockQuantity + 1)}
                      className="px-1.5 py-0.5 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="p-3.5">
                  {product.stockQuantity <= 5 ? (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 border border-amber-500/30">
                      <AlertTriangle className="w-3 h-3" /> Reponer ({product.stockQuantity})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
                      <CheckCircle className="w-3 h-3" /> En Stock
                    </span>
                  )}
                </td>

                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400"
                    title="Editar producto"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-1.5 text-zinc-500 hover:text-red-500"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <SaasProductModal
          productToEdit={editingProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN TOTAL DEL CATÁLOGO */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border-2 border-rose-600 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-8 h-8 shrink-0 animate-bounce" />
              <div>
                <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100">
                  ¿Confirmar Eliminación Total?
                </h3>
                <span className="text-xs font-bold uppercase text-rose-600 tracking-wider">
                  Acción irreversible para el sitio web y la base de datos
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed bg-rose-50 dark:bg-rose-950/40 p-3 border border-rose-200 dark:border-rose-900">
              Al confirmar esta acción, <strong>TODOS los {products.length} productos</strong> serán eliminados permanentemente del sistema. La tienda web pública quedará completamente vacía en todos los navegadores.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  clearProductsDatabase();
                  setIsDeleteConfirmOpen(false);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
              >
                <Trash2 className="w-4 h-4" /> Sí, Eliminar Todo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
