import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory } from '../../types';
import { X, Plus, Save } from 'lucide-react';

interface SaasProductModalProps {
  productToEdit?: Product | null;
  onClose: () => void;
}

export const SaasProductModal: React.FC<SaasProductModalProps> = ({ productToEdit, onClose }) => {
  const { addProduct, updateProduct } = useApp();

  const [name, setName] = useState(productToEdit?.name || '');
  const [brand, setBrand] = useState(productToEdit?.brand || 'Imperio Luz Parfumerie');
  const [category, setCategory] = useState<ProductCategory>(productToEdit?.category || 'perfume');
  const [priceUSD, setPriceUSD] = useState(productToEdit?.priceUSD || 250);
  const [stockQuantity, setStockQuantity] = useState(productToEdit?.stockQuantity || 10);
  const [sku, setSku] = useState(productToEdit?.sku || `IMP-${Date.now().toString().slice(-6)}`);
  const [luxuryTier, setLuxuryTier] = useState(productToEdit?.luxuryTier || 'Colección Privada');
  const [description, setDescription] = useState(productToEdit?.description || '');
  const [image, setImage] = useState(productToEdit?.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80');
  const [gender, setGender] = useState<'Unisex' | 'Homme' | 'Femme'>(productToEdit?.gender || 'Unisex');

  // Fragrance specific
  const [topNotes, setTopNotes] = useState(productToEdit?.fragranceNotes?.top.join(', ') || 'Azafrán, Bergamota');
  const [heartNotes, setHeartNotes] = useState(productToEdit?.fragranceNotes?.heart.join(', ') || 'Rosa, Iris');
  const [baseNotes, setBaseNotes] = useState(productToEdit?.fragranceNotes?.base.join(', ') || 'Oud, Ámbar');

  // Watch specific
  const [movement, setMovement] = useState(productToEdit?.watchSpecs?.movement || 'Automático Suizo');
  const [caseMaterial, setCaseMaterial] = useState(productToEdit?.watchSpecs?.caseMaterial || 'Oro Rosa 18K');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData: Product = {
      id: productToEdit?.id || `prod-${Date.now()}`,
      name,
      brand,
      category,
      priceUSD: Number(priceUSD),
      rating: productToEdit?.rating || 4.9,
      reviewsCount: productToEdit?.reviewsCount || 10,
      image,
      tags: ['Alta Gama', luxuryTier],
      inStock: Number(stockQuantity) > 0,
      stockQuantity: Number(stockQuantity),
      sku,
      luxuryTier: luxuryTier as any,
      description,
      gender,
      volumeOrSizes: category === 'perfume' ? ['50ml Parfum', '100ml Parfum'] : undefined,
      fragranceNotes:
        category === 'perfume'
          ? {
              top: topNotes.split(',').map((s) => s.trim()),
              heart: heartNotes.split(',').map((s) => s.trim()),
              base: baseNotes.split(',').map((s) => s.trim()),
              longevity: 'Larga Duración (8-12h)',
              sillage: 'Moderado',
              family: 'Oud & Maderas'
            }
          : undefined,
      watchSpecs:
        category === 'watch'
          ? {
              movement: movement as any,
              caseMaterial: caseMaterial as any,
              powerReserve: '60 Horas',
              waterResistance: '50 Metros',
              strap: 'Piel de Caimán',
              caseDiameter: '40 mm'
            }
          : undefined
    };

    if (productToEdit) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-amber-900/30 dark:border-amber-500/30 p-6 sm:p-8 shadow-2xl my-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-amber-300">
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-100 border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-6">
          {productToEdit ? 'Editar Pieza del Catálogo' : 'Añadir Nueva Pieza al Catálogo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Categoría:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100"
              >
                <option value="perfume">Perfume de Nicho</option>
                <option value="watch">Alta Relojería Suizo</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">SKU Código:</label>
              <input
                required
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Nombre de la Pieza:</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Oud Royale Extrait"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Precio (USD):</label>
              <input
                required
                type="number"
                min="10"
                value={priceUSD}
                onChange={(e) => setPriceUSD(Number(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Cantidad en Stock:</label>
              <input
                required
                type="number"
                min="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Nivel de Lujo:</label>
              <select
                value={luxuryTier}
                onChange={(e) => setLuxuryTier(e.target.value as any)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100"
              >
                <option value="Colección Privada">Colección Privada</option>
                <option value="Haute Horlogerie">Haute Horlogerie</option>
                <option value="Edición Limitada">Edición Limitada</option>
                <option value="Niche Parfum">Niche Parfum</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Género:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100"
              >
                <option value="Unisex">Unisex</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">URL de Imagen (Unsplash):</label>
              <input
                required
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Descripción de la Pieza:</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100"
              />
            </div>
          </div>

          {/* Category specific fields */}
          {category === 'perfume' ? (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 space-y-2">
              <span className="font-bold text-amber-700 dark:text-amber-400 block uppercase">Notas Olfativas (separadas por coma):</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  placeholder="Salida: Azafrán, Menta"
                  value={topNotes}
                  onChange={(e) => setTopNotes(e.target.value)}
                  className="bg-white dark:bg-zinc-950 border p-2"
                />
                <input
                  placeholder="Corazón: Rosa, Iris"
                  value={heartNotes}
                  onChange={(e) => setHeartNotes(e.target.value)}
                  className="bg-white dark:bg-zinc-950 border p-2"
                />
                <input
                  placeholder="Fondo: Oud, Ámbar"
                  value={baseNotes}
                  onChange={(e) => setBaseNotes(e.target.value)}
                  className="bg-white dark:bg-zinc-950 border p-2"
                />
              </div>
            </div>
          ) : (
            <div className="p-4 bg-zinc-800/20 border border-zinc-700 space-y-2">
              <span className="font-bold text-amber-400 block uppercase">Especificaciones Horológicas:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  placeholder="Movimiento: Tourbillon Mecánico"
                  value={movement}
                  onChange={(e) => setMovement(e.target.value)}
                  className="bg-white dark:bg-zinc-950 border p-2"
                />
                <input
                  placeholder="Material: Oro Rosa 18K"
                  value={caseMaterial}
                  onChange={(e) => setCaseMaterial(e.target.value)}
                  className="bg-white dark:bg-zinc-950 border p-2"
                />
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-600 text-white font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
