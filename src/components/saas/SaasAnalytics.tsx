import React from 'react';
import { useApp } from '../../context/AppContext';
import { SALES_MONTHLY_DATA, CATEGORY_DISTRIBUTION } from '../../data/mockData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DollarSign, TrendingUp, Package, Users, AlertTriangle, Droplet, Watch } from 'lucide-react';

export const SaasAnalytics: React.FC = () => {
  const { products, orders, formatPrice } = useApp();

  const totalSalesUSD = orders.reduce((sum, o) => sum + o.totalUSD, 0) + 215000;
  const lowStockCount = products.filter((p) => p.stockQuantity <= 5).length;

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <span className="text-xs uppercase font-semibold text-amber-600 dark:text-amber-400 tracking-widest block mb-1">
          Panel de Inteligencia Comercial
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-amber-100">
          Analítica de Ventas & Inventarios VIP
        </h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
            <span>Ingresos Totales</span>
            <DollarSign className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-200">
            {formatPrice(totalSalesUSD)}
          </div>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> +18.4% vs mes anterior
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
            <span>Perfumes de Nicho</span>
            <Droplet className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-200">
            {formatPrice(71000)}
          </div>
          <p className="text-[10px] text-zinc-500">Crecimiento en extractos de Oud y Iris</p>
        </div>

        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
            <span>Alta Relojería Suizo</span>
            <Watch className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-200">
            {formatPrice(165000)}
          </div>
          <p className="text-[10px] text-zinc-500">Impulsado por piezas de Tourbillon</p>
        </div>

        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
            <span>Stock Crítico (&le;5)</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-amber-600 dark:text-amber-400">
            {lowStockCount} Productos
          </div>
          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
            Atención requerida en reposición
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Sales Bar Chart */}
        <div className="lg:col-span-8 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-amber-100 uppercase tracking-wider">
            Evolución Mensual de Ventas (USD)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_MONTHLY_DATA}>
                <XAxis dataKey="month" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#3f3f46',
                    color: '#f4f4f5',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="perfumes" name="Perfumes" fill="#C5A059" />
                <Bar dataKey="relojes" name="Alta Relojería" fill="#2C3E50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Distribution Chart */}
        <div className="lg:col-span-4 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-amber-100 uppercase tracking-wider">
            Distribución por Categoría (%)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#3f3f46',
                    color: '#f4f4f5',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
            {CATEGORY_DISTRIBUTION.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span className="font-bold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
