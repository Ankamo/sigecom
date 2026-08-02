import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory } from '../../types';
import { X, Plus, Save, Upload, Link, Image as ImageIcon, Check, Trash2, Calculator } from 'lucide-react';

interface SaasProductModalProps {
  productToEdit?: Product | null;
  onClose: () => void;
}

export const SaasProductModal: React.FC<SaasProductModalProps> = ({ productToEdit, onClose }) => {
  const { addProduct, updateProduct } = useApp();

  const [name, setName] = useState(productToEdit?.name || '');
  const [brand, setBrand] = useState(productToEdit?.brand || 'Imperio Lux Parfumerie');
  const [category, setCategory] = useState<ProductCategory>(productToEdit?.category || 'perfume');

  // Pricing & Profit Margin Calculation State (in COP)
  const [costPrice, setCostPrice] = useState<number>(
    productToEdit?.costPrice || (productToEdit?.priceUSD ? (productToEdit.priceUSD < 10000 ? Math.round(productToEdit.priceUSD * 4000 * 0.7) : Math.round(productToEdit.priceUSD * 0.7)) : 150000)
  );
  const [profitMargin, setProfitMargin] = useState<number>(
    productToEdit?.profitMarginPercent || 30
  );
  const initialSelling = productToEdit?.priceUSD
    ? (productToEdit.priceUSD < 10000 ? Math.round(productToEdit.priceUSD * 4000) : productToEdit.priceUSD)
    : Math.round(150000 * 1.3);

  const [priceUSD, setPriceUSD] = useState<number>(initialSelling);

  const handleCostPriceChange = (newCost: number) => {
    setCostPrice(newCost);
    const calculatedSelling = Math.round(newCost * (1 + profitMargin / 100));
    setPriceUSD(calculatedSelling);
  };

  const handleProfitMarginChange = (newMargin: number) => {
    setProfitMargin(newMargin);
    const calculatedSelling = Math.round(costPrice * (1 + newMargin / 100));
    setPriceUSD(calculatedSelling);
  };

  const handleSellingPriceChange = (newSelling: number) => {
    setPriceUSD(newSelling);
    if (costPrice > 0) {
      const calculatedMargin = Math.round(((newSelling - costPrice) / costPrice) * 100);
      setProfitMargin(calculatedMargin);
    }
  };
  const [stockQuantity, setStockQuantity] = useState(productToEdit?.stockQuantity || 10);
  const [sku, setSku] = useState(productToEdit?.sku || `IMP-${Date.now().toString().slice(-6)}`);
  const [luxuryTier, setLuxuryTier] = useState(productToEdit?.luxuryTier || 'Colección Privada');
  const [description, setDescription] = useState(productToEdit?.description || '');
  const [image, setImage] = useState(productToEdit?.image || '');
  const [gender, setGender] = useState<'Unisex' | 'Homme' | 'Femme'>(productToEdit?.gender || 'Unisex');

  // Image Upload vs URL state
  const [imageMode, setImageMode] = useState<'upload' | 'url'>(
    productToEdit?.image && !productToEdit.image.startsWith('data:') ? 'url' : 'upload'
  );
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('El archivo es demasiado grande (máximo 8MB).');
        return;
      }
      setUploadFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Fragrance specific
  const [topNotes, setTopNotes] = useState(productToEdit?.fragranceNotes?.top.join(', ') || 'Azafrán, Bergamota');
  const [heartNotes, setHeartNotes] = useState(productToEdit?.fragranceNotes?.heart.join(', ') || 'Rosa, Iris');
  const [baseNotes, setBaseNotes] = useState(productToEdit?.fragranceNotes?.base.join(', ') || 'Oud, Ámbar');

  // Watch specific
  const [movement, setMovement] = useState(productToEdit?.watchSpecs?.movement || 'Automático Suizo');
  const [caseMaterial, setCaseMaterial] = useState(productToEdit?.watchSpecs?.caseMaterial || 'Oro Rosa 18K');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const defaultFallbackImage =
      category === 'perfume'
        ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80'
        : 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80';

    const finalImage = image.trim() || defaultFallbackImage;

    const productData: Product = {
      id: productToEdit?.id || `prod-${Date.now()}`,
      name,
      brand,
      category,
      priceUSD: Number(priceUSD),
      costPrice: Number(costPrice),
      profitMarginPercent: Number(profitMargin),
      rating: productToEdit?.rating || 4.9,
      reviewsCount: productToEdit?.reviewsCount || 10,
      image: finalImage,
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

            {/* 💰 CÁLCULO DE PRECIOS Y MARGEN DE GANANCIA EN PESOS COLOMBIANOS (COP) */}
            <div className="sm:col-span-2 p-4 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 uppercase text-xs">
                  <Calculator className="w-4 h-4 text-amber-500" />
                  Estructura de Precios (Pesos Colombianos - COP)
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 dark:text-amber-300 px-2 py-0.5 border border-amber-500/40 font-mono font-bold">
                  Cálculo Automático
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* PRECIO DE COSTO */}
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Precio de Costo ($ COP):
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-zinc-500 dark:text-zinc-400 font-bold">$</span>
                    <input
                      required
                      type="number"
                      min="0"
                      step="1000"
                      value={costPrice}
                      onChange={(e) => handleCostPriceChange(Number(e.target.value))}
                      placeholder="Ej: 150000"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 pl-7 pr-3 py-2 text-zinc-900 dark:text-amber-100 font-mono font-bold"
                    />
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-0.5 block">Costo de compra/producción</span>
                </div>

                {/* PORCENTAJE DE GANANCIA */}
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    % Ganancia Deseada:
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="number"
                      min="0"
                      max="500"
                      step="1"
                      value={profitMargin}
                      onChange={(e) => handleProfitMarginChange(Number(e.target.value))}
                      placeholder="Ej: 30"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 pl-3 pr-7 py-2 text-zinc-900 dark:text-amber-100 font-mono font-bold"
                    />
                    <span className="absolute right-2.5 top-2 text-zinc-500 dark:text-zinc-400 font-bold">%</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-0.5 block">Margen sobre el costo</span>
                </div>

                {/* PRECIO DE VENTA (CALCULADO) */}
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Precio de Venta Final ($ COP):
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-amber-500 font-bold">$</span>
                    <input
                      required
                      type="number"
                      min="0"
                      step="1000"
                      value={priceUSD}
                      onChange={(e) => handleSellingPriceChange(Number(e.target.value))}
                      className="w-full bg-white dark:bg-zinc-950 border border-amber-500/60 pl-7 pr-3 py-2 text-amber-700 dark:text-amber-300 font-mono font-extrabold text-sm"
                    />
                  </div>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5 block font-semibold">Precio al público final</span>
                </div>
              </div>

              {/* MARGEN DE UTILIDAD METRIC BADGE */}
              <div className="flex flex-wrap items-center justify-between p-2.5 bg-zinc-900/80 border border-amber-500/20 text-[11px] gap-2">
                <span className="text-zinc-300">
                  Ganancia neta estimada: <strong className="text-emerald-400 font-mono">${(priceUSD - costPrice).toLocaleString('es-CO')} COP</strong> por unidad
                </span>
                <span className="text-amber-300 font-bold font-mono bg-amber-500/20 px-2 py-0.5 border border-amber-500/30">
                  Margen: {profitMargin}%
                </span>
              </div>
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

            <div className="sm:col-span-2 space-y-2 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300">
                  Fotografía del Producto:
                </label>
                <div className="flex items-center gap-1 bg-zinc-200 dark:bg-zinc-800 p-0.5 rounded text-[10px] font-bold uppercase">
                  <button
                    type="button"
                    onClick={() => setImageMode('upload')}
                    className={`px-2.5 py-1 flex items-center gap-1 transition-all ${
                      imageMode === 'upload'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    <Upload className="w-3 h-3" /> Subir Foto
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('url')}
                    className={`px-2.5 py-1 flex items-center gap-1 transition-all ${
                      imageMode === 'url'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    <Link className="w-3 h-3" /> Enlace URL
                  </button>
                </div>
              </div>

              {imageMode === 'upload' ? (
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-amber-500/40 hover:border-amber-500 bg-amber-500/5 p-4 text-center cursor-pointer transition-all group"
                  >
                    <Upload className="w-7 h-7 text-amber-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <p className="font-bold text-amber-800 dark:text-amber-300 text-xs">
                      Haz clic para seleccionar una foto de tu equipo
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      Soporta JPG, PNG, WEBP (Máx. 8MB)
                    </p>
                    {uploadFileName && (
                      <span className="inline-block mt-2 text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 border border-amber-500/30">
                        Archivo: {uploadFileName}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Ingresa una URL directa de imagen externa o de Unsplash
                  </p>
                </div>
              )}

              {/* Live Preview */}
              {image ? (
                <div className="pt-2 flex items-center gap-3 bg-zinc-900/60 p-2 border border-amber-500/20">
                  <img
                    src={image}
                    alt="Vista previa"
                    className="w-14 h-14 object-cover border border-amber-500/40 bg-zinc-950 shrink-0"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      // fallback if image fails to load
                    }}
                  />
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 uppercase">
                      <Check className="w-3 h-3" /> Imagen seleccionada
                    </span>
                    <p className="text-[10px] text-zinc-400 truncate">
                      {image.startsWith('data:') ? 'Imagen cargada desde archivo local' : image}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImage('');
                      setUploadFileName('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 rounded"
                    title="Quitar foto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : null}
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
