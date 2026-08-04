import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory } from '../../types';
import {
  X,
  Save,
  Upload,
  Link,
  Check,
  Trash2,
  Calculator,
  Sparkles,
  Package,
  Layers,
  Tag,
  Clock,
  Droplets
} from 'lucide-react';

interface SaasProductModalProps {
  productToEdit?: Product | null;
  onClose: () => void;
}

export const SaasProductModal: React.FC<SaasProductModalProps> = ({ productToEdit, onClose }) => {
  const { addProduct, updateProduct } = useApp();

  const [activeTab, setActiveTab] = useState<'general' | 'pricing' | 'specs'>('general');

  const [name, setName] = useState(productToEdit?.name || '');
  const [brand, setBrand] = useState(productToEdit?.brand || 'Imperio Lux Parfumerie');
  const [category, setCategory] = useState<ProductCategory>(productToEdit?.category || 'perfume');

  // Pricing & Profit Margin Calculation State (in COP)
  const [costPrice, setCostPrice] = useState<number>(
    productToEdit?.costPrice ||
      (productToEdit?.priceUSD
        ? productToEdit.priceUSD < 10000
          ? Math.round(productToEdit.priceUSD * 4000 * 0.7)
          : Math.round(productToEdit.priceUSD * 0.7)
        : 150000)
  );
  const [profitMargin, setProfitMargin] = useState<number>(productToEdit?.profitMarginPercent || 30);

  const initialSelling = productToEdit?.priceUSD
    ? productToEdit.priceUSD < 10000
      ? Math.round(productToEdit.priceUSD * 4000)
      : productToEdit.priceUSD
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
              top: topNotes.split(',').map((s) => s.trim()).filter(Boolean),
              heart: heartNotes.split(',').map((s) => s.trim()).filter(Boolean),
              base: baseNotes.split(',').map((s) => s.trim()).filter(Boolean),
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

  const estimatedProfit = priceUSD - costPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/85 backdrop-blur-md font-sans overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-amber-900/30 dark:border-amber-500/30 shadow-2xl my-6 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 px-6 py-4 border-b border-amber-500/30 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                Gestión de Catálogo e Inventario
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 mt-0.5">
              {productToEdit ? 'Editar Pieza del Catálogo' : 'Añadir Nueva Pieza al Catálogo'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-amber-300 hover:bg-zinc-800 transition-colors"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center gap-2 overflow-x-auto shrink-0 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'general'
                ? 'border-amber-500 text-amber-700 dark:text-amber-300 font-extrabold'
                : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400'
            }`}
          >
            <Package className="w-4 h-4 text-amber-500" />
            1. Información General
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'border-amber-500 text-amber-700 dark:text-amber-300 font-extrabold'
                : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-500" />
            2. Precios e Inventario
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-amber-500 text-amber-700 dark:text-amber-300 font-extrabold'
                : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-500" />
            3. Foto & Atributos
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* TAB 1: INFORMACIÓN GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-amber-500/5 dark:bg-amber-500/10 p-3 border border-amber-500/20 text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span className="font-semibold text-[11px] flex items-center gap-1.5 uppercase tracking-wide text-amber-800 dark:text-amber-300">
                  <Tag className="w-4 h-4 text-amber-500" /> Datos Principales de la Pieza
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">Paso 1 de 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Categoría del Producto:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="perfume">Perfumería de Nicho</option>
                    <option value="watch">Alta Relojería Suiza</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Código SKU único:</label>
                  <input
                    required
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Ej: IMP-984210"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Nombre de la Pieza:</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Oud Impérial Royal Extrait"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Marca / Atelier:</label>
                  <input
                    required
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Ej: Imperio Lux Parfumerie"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Nivel de Lujo:</label>
                  <select
                    value={luxuryTier}
                    onChange={(e) => setLuxuryTier(e.target.value as any)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="Colección Privada">Colección Privada</option>
                    <option value="Haute Horlogerie">Haute Horlogerie</option>
                    <option value="Edición Limitada">Edición Limitada</option>
                    <option value="Niche Parfum">Niche Parfum</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Género / Perfil:</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="Unisex">Unisex</option>
                    <option value="Homme">Homme (Masculino)</option>
                    <option value="Femme">Femme (Femenino)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Descripción Comercial Corta:
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Escribe la historia o descripción sensorial de la pieza..."
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('pricing')}
                  className="px-4 py-2 bg-amber-600 text-white font-bold uppercase tracking-wider text-[11px] hover:bg-amber-500 transition-colors"
                >
                  Siguiente: Precios & Inventario →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PRECIOS E INVENTARIO */}
          {activeTab === 'pricing' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-amber-500/5 dark:bg-amber-500/10 p-4 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                  <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 uppercase text-xs">
                    <Calculator className="w-4 h-4 text-amber-500" />
                    Cálculo Automático de Margen y Precios ($ COP)
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 dark:text-amber-300 px-2 py-0.5 border border-amber-500/40 font-mono font-bold">
                    Pesos Colombianos
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* PRECIO DE COSTO */}
                  <div>
                    <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
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
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 pl-7 pr-3 py-2 text-zinc-900 dark:text-amber-100 font-mono font-bold focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1 block">Costo de compra/producción</span>
                  </div>

                  {/* PORCENTAJE DE GANANCIA */}
                  <div>
                    <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      % Margen de Ganancia:
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
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 pl-3 pr-7 py-2 text-zinc-900 dark:text-amber-100 font-mono font-bold focus:outline-none focus:border-amber-500"
                      />
                      <span className="absolute right-2.5 top-2 text-zinc-500 dark:text-zinc-400 font-bold">%</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1 block">Utilidad deseada</span>
                  </div>

                  {/* PRECIO DE VENTA (CALCULADO) */}
                  <div>
                    <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
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
                        className="w-full bg-white dark:bg-zinc-950 border border-amber-500/60 pl-7 pr-3 py-2 text-amber-700 dark:text-amber-300 font-mono font-extrabold text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 block font-semibold">
                      Precio final en mostrador
                    </span>
                  </div>
                </div>

                {/* MARGEN DE UTILIDAD METRIC BADGE */}
                <div className="flex flex-wrap items-center justify-between p-3 bg-zinc-900/90 border border-amber-500/30 text-[11px] gap-2">
                  <span className="text-zinc-300">
                    Ganancia neta estimada por unidad:{' '}
                    <strong className="text-emerald-400 font-mono text-xs">
                      ${estimatedProfit > 0 ? estimatedProfit.toLocaleString('es-CO') : 0} COP
                    </strong>
                  </span>
                  <span className="text-amber-300 font-bold font-mono bg-amber-500/20 px-2.5 py-1 border border-amber-500/40">
                    Margen Actual: {profitMargin}%
                  </span>
                </div>
              </div>

              {/* GESTIÓN DE STOCK / UNIDADES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Unidades Disponibles en Stock:
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[10px] text-zinc-500 mt-1 block">
                    {stockQuantity > 5 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">✔ Stock Saludable</span>
                    ) : stockQuantity > 0 ? (
                      <span className="text-amber-600 dark:text-amber-400">⚠️ Stock Bajo (Alerta Reposición)</span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400">⛔ Agotado</span>
                    )}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Estado Operativo del Inventario:
                  </label>
                  <div className="px-3 py-2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold flex items-center justify-between">
                    <span>{stockQuantity > 0 ? 'Disponible para Venta' : 'Fuera de Stock'}</span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        stockQuantity > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('general')}
                  className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 uppercase tracking-wider text-[11px]"
                >
                  ← Volver a General
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className="px-4 py-2 bg-amber-600 text-white font-bold uppercase tracking-wider text-[11px] hover:bg-amber-500 transition-colors"
                >
                  Siguiente: Foto & Atributos →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: FOTO Y ESPECIFICACIONES TÉCNICAS */}
          {activeTab === 'specs' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* FOTOGRAFÍA */}
              <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300">
                    Fotografía Principal del Producto:
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
                      <Upload className="w-3 h-3" /> Subir Foto Local
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
                      <Link className="w-3 h-3" /> URL Externa
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
                      <Upload className="w-6 h-6 text-amber-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <p className="font-bold text-amber-800 dark:text-amber-300 text-xs">
                        Haz clic para seleccionar una foto de tu equipo
                      </p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Soporta JPG, PNG, WEBP (Máx 8MB)</p>
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
                      placeholder="https://images.unsplash.com/photo-1594035910387-fea47794261f"
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 px-3 py-2 text-zinc-900 dark:text-amber-100 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Enlace directo HTTPS de la imagen (Unsplash, CDN, etc.)
                    </p>
                  </div>
                )}

                {/* PREVIEW DE LA IMAGEN */}
                {image ? (
                  <div className="pt-2 flex items-center gap-3 bg-zinc-900/80 p-2.5 border border-amber-500/30">
                    <img
                      src={image}
                      alt="Vista previa"
                      className="w-14 h-14 object-cover border border-amber-500/40 bg-zinc-950 shrink-0 shadow-sm"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.opacity = '0.5';
                      }}
                    />
                    <div className="flex-1 overflow-hidden">
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 uppercase">
                        <Check className="w-3 h-3" /> Imagen seleccionada
                      </span>
                      <p className="text-[10px] text-zinc-400 truncate">
                        {image.startsWith('data:') ? 'Imagen local en formato Base64' : image}
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

              {/* ATRIBUTOS SEGÚN LA CATEGORÍA */}
              {category === 'perfume' ? (
                <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold uppercase">
                    <Droplets className="w-4 h-4 text-amber-500" />
                    <span>Pirámide Olfativa del Perfume:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                        Notas de Salida (Top):
                      </label>
                      <input
                        placeholder="Ej: Azafrán, Bergamota"
                        value={topNotes}
                        onChange={(e) => setTopNotes(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 p-2 text-zinc-900 dark:text-amber-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                        Notas de Corazón (Heart):
                      </label>
                      <input
                        placeholder="Ej: Rosa de Taif, Iris"
                        value={heartNotes}
                        onChange={(e) => setHeartNotes(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 p-2 text-zinc-900 dark:text-amber-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                        Notas de Fondo (Base):
                      </label>
                      <input
                        placeholder="Ej: Oud Camboyano, Ámbar"
                        value={baseNotes}
                        onChange={(e) => setBaseNotes(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 p-2 text-zinc-900 dark:text-amber-100"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Especificaciones de la Pieza Horológica:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                        Tipo de Movimiento:
                      </label>
                      <input
                        placeholder="Ej: Automático Suizo / Tourbillon"
                        value={movement}
                        onChange={(e) => setMovement(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2 text-amber-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                        Material de la Caja:
                      </label>
                      <input
                        placeholder="Ej: Oro Rosa 18K / Titanio"
                        value={caseMaterial}
                        onChange={(e) => setCaseMaterial(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2 text-amber-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('pricing')}
                  className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 uppercase tracking-wider text-[11px]"
                >
                  ← Volver a Precios
                </button>
              </div>
            </div>
          )}

          {/* Sticky Modal Bottom Actions */}
          <div className="pt-4 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 shrink-0">
            <div className="hidden sm:block text-[11px] text-zinc-500">
              {name ? (
                <span>
                  Pieza: <strong className="text-amber-600 dark:text-amber-400">{name}</strong> (${priceUSD.toLocaleString('es-CO')} COP)
                </span>
              ) : (
                <span>Completa los datos para guardar en el catálogo.</span>
              )}
            </div>

            <div className="flex items-center gap-2.5 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-bold text-[11px]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all text-[11px]"
              >
                <Save className="w-4 h-4" />
                <span>{productToEdit ? 'Guardar Cambios' : 'Crear Pieza'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
