import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../../types';
import { Filter, Sparkles, Droplet, Watch, SlidersHorizontal, Database, Plus, RefreshCw, Lock } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    activeTab,
    searchTerm,
    seedDefaultProducts,
    setViewMode,
    setActiveTab,
    currentUser,
    setIsLoginModalOpen
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(
    activeTab === 'perfumes' ? 'perfume' : activeTab === 'watches' ? 'watch' : 'all'
  );
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');

  // Sync category with activeTab when activeTab changes
  React.useEffect(() => {
    if (activeTab === 'perfumes') setSelectedCategory('perfume');
    else if (activeTab === 'watches') setSelectedCategory('watch');
    else setSelectedCategory('all');
  }, [activeTab]);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((p) => {
      if (!p) return false;
      // Category match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // Gender match
      if (selectedGender !== 'all' && p.gender !== selectedGender) return false;

      // Family or movement match
      if (selectedFamily !== 'all') {
        if (p.category === 'perfume' && p.fragranceNotes?.family !== selectedFamily) return false;
        if (p.category === 'watch' && p.watchSpecs?.movement !== selectedFamily) return false;
      }

      // Search match
      if (searchTerm && searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const nameMatch = p.name ? p.name.toLowerCase().includes(query) : false;
        const descMatch = p.description ? p.description.toLowerCase().includes(query) : false;
        const brandMatch = p.brand ? p.brand.toLowerCase().includes(query) : false;
        const tagsMatch = Array.isArray(p.tags) ? p.tags.some((t) => typeof t === 'string' && t.toLowerCase().includes(query)) : false;
        return nameMatch || descMatch || brandMatch || tagsMatch;
      }

      return true;
    });
  }, [products, selectedCategory, selectedGender, selectedFamily, searchTerm]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Section Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-amber-900/10 dark:border-amber-500/15">
        <div>
          <span className="text-xs uppercase font-semibold text-amber-700 dark:text-amber-400 tracking-widest block mb-1">
            Catálogo Exclusivo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-amber-100">
            {selectedCategory === 'perfume'
              ? 'Perfumes de Nicho & Extractos'
              : selectedCategory === 'watch'
              ? 'Piezas de Alta Relojería Suizo'
              : 'Colección Imperio Lux'}
          </h2>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-1 border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-600 dark:bg-amber-500 text-white dark:text-zinc-950 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-amber-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedCategory('perfume')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === 'perfume'
                ? 'bg-amber-600 dark:bg-amber-500 text-white dark:text-zinc-950 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-amber-200'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            Perfumes
          </button>
          <button
            onClick={() => setSelectedCategory('watch')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === 'watch'
                ? 'bg-amber-600 dark:bg-amber-500 text-white dark:text-zinc-950 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-amber-200'
            }`}
          >
            <Watch className="w-3.5 h-3.5" />
            Relojes
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="py-4 my-4 flex flex-wrap items-center justify-between gap-4 bg-zinc-50 dark:bg-zinc-900/40 p-4 border border-zinc-200 dark:border-zinc-800 text-xs font-sans">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Filtrar:
          </div>

          {/* Gender Filter */}
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">Género: Todos</option>
            <option value="Unisex">Unisex</option>
            <option value="Homme">Homme (Caballero)</option>
            <option value="Femme">Femme (Dama)</option>
          </select>

          {/* Olfactory or Movement Filter */}
          {selectedCategory === 'perfume' && (
            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Familia Olfativa: Todas</option>
              <option value="Oud & Maderas">Oud & Maderas</option>
              <option value="Ámbar Oriental">Ámbar Oriental</option>
              <option value="Floral de Nicho">Floral de Nicho</option>
              <option value="Cítrico Aromático">Cítrico Aromático</option>
            </select>
          )}

          {selectedCategory === 'watch' && (
            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Movimiento: Todos</option>
              <option value="Tourbillon Mecánico">Tourbillon Mecánico</option>
              <option value="Automático Suizo">Automático Suizo</option>
              <option value="Cronógrafo de Alta Precisión">Cronógrafo</option>
            </select>
          )}
        </div>

        <div className="text-zinc-500 dark:text-zinc-400">
          Mostrando <span className="font-bold text-zinc-900 dark:text-amber-200">{filteredProducts.length}</span> piezas exclusivas
        </div>
      </div>

      {/* Product Cards Grid */}
      {products.length === 0 ? (
        /* Empty Database State */
        <div className="text-center py-16 px-6 bg-zinc-900/40 border border-amber-500/30 shadow-xl space-y-5 my-6">
          <div className="w-16 h-16 mx-auto bg-amber-500/10 border border-amber-500/40 flex items-center justify-center rounded-full text-amber-400">
            <Database className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30">
              <Sparkles className="w-3 h-3" /> Base de Datos Vacía (0 Productos)
            </span>
            <h3 className="font-serif text-2xl font-bold text-amber-100">
              Catálogo de Productos Vacío
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Actualmente la base de datos de productos no contiene ninguna pieza registrada. Puedes añadir tus propios productos desde el Panel Administrativo de Inventario o cargar datos de muestra.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {currentUser ? (
              <button
                onClick={() => {
                  setViewMode('saas_dashboard');
                  setActiveTab('inventory');
                }}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" /> Agregar Producto en Panel Inventario
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <Lock className="w-4 h-4" /> Iniciar Sesión para Gestionar Inventario
              </button>
            )}

            <button
              onClick={() => seedDefaultProducts()}
              className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Cargar Catálogo Demo de Muestra
            </button>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        /* Filtered Empty State */
        <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/30 border border-dashed border-zinc-300 dark:border-zinc-800">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-3 opacity-60" />
          <h3 className="font-serif text-lg font-medium text-zinc-900 dark:text-amber-100">
            No se encontraron piezas con los filtros seleccionados
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Intente modificar su búsqueda o seleccione la opción "Todos".
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedGender('all');
              setSelectedFamily('all');
            }}
            className="mt-4 px-4 py-2 bg-amber-600 text-white text-xs uppercase tracking-wider font-medium"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
