import React from 'react';
import { useApp } from '../../context/AppContext';
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
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Droplet,
  Watch,
  ShoppingBag,
  Trash2,
  RefreshCw,
  Zap
} from 'lucide-react';

export const SaasAnalytics: React.FC = () => {
  const { products, orders, formatPrice, clearOrdersDatabase, seedDefaultOrders } = useApp();

  // Real-time calculation of total revenue
  const totalSalesCOP = orders.reduce((sum, o) => {
    const amount = o.totalUSD < 10000 ? Math.round(o.totalUSD * 4000) : o.totalUSD;
    return sum + amount;
  }, 0);

  // Real-time calculation per category
  let perfumeSalesCOP = 0;
  let watchSalesCOP = 0;

  orders.forEach((o) => {
    o.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      const itemPrice = item.priceUSD < 10000 ? Math.round(item.priceUSD * 4000) : item.priceUSD;
      const itemTotal = itemPrice * item.quantity;
      if (
        prod?.category === 'watch' ||
        item.productName.toLowerCase().includes('watch') ||
        item.productName.toLowerCase().includes('chronos')
      ) {
        watchSalesCOP += itemTotal;
      } else {
        perfumeSalesCOP += itemTotal;
      }
    });
  });

  const lowStockCount = products.filter((p) => p.stockQuantity <= 5).length;
  const totalOrdersCount = orders.length;

  // Real-time Monthly Sales Data computed from orders database
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const currentMonthIdx = new Date().getMonth();
  
  // Build monthly sales structure
  const monthlySalesMap: Record<string, { perfumes: number; relojes: number; total: number }> = {};
  // Show last 6 months up to current
  for (let i = 5; i >= 0; i--) {
    const mIdx = (currentMonthIdx - i + 12) % 12;
    const mName = monthNames[mIdx];
    monthlySalesMap[mName] = { perfumes: 0, relojes: 0, total: 0 };
  }

  orders.forEach((o) => {
    const orderDate = new Date(o.date || Date.now());
    const mName = monthNames[orderDate.getMonth()];
    if (monthlySalesMap[mName]) {
      o.items.forEach((item) => {
        const prod = products.find((p) => p.id === item.productId);
        const itemPrice = item.priceUSD < 10000 ? Math.round(item.priceUSD * 4000) : item.priceUSD;
        const itemTotal = itemPrice * item.quantity;
        if (
          prod?.category === 'watch' ||
          item.productName.toLowerCase().includes('watch') ||
          item.productName.toLowerCase().includes('chronos')
        ) {
          monthlySalesMap[mName].relojes += itemTotal;
        } else {
          monthlySalesMap[mName].perfumes += itemTotal;
        }
        monthlySalesMap[mName].total += itemTotal;
      });
    }
  });

  const realMonthlySalesData = Object.keys(monthlySalesMap).map((mName) => ({
    month: mName,
    perfumes: monthlySalesMap[mName].perfumes,
    relojes: monthlySalesMap[mName].relojes,
    total: monthlySalesMap[mName].total
  }));

  // Real-time Category distribution data
  const totalCategorySales = perfumeSalesCOP + watchSalesCOP;
  const realCategoryDistribution = totalCategorySales > 0
    ? [
        {
          name: 'Perfumes de Nicho',
          value: Math.round((perfumeSalesCOP / totalCategorySales) * 100),
          color: '#C5A059'
        },
        {
          name: 'Alta Relojería',
          value: Math.round((watchSalesCOP / totalCategorySales) * 100),
          color: '#2C3E50'
        }
      ]
    : [
        { name: 'Sin Ventas Registradas (0%)', value: 100, color: '#3f3f46' }
      ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold text-amber-600 dark:text-amber-400 tracking-widest block">
              Panel de Inteligencia Comercial
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3 animate-pulse" /> Tiempo Real
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-amber-100 mt-1">
            Analítica de Ventas & Inventarios
          </h1>
        </div>

        {/* Database reset or seed controls */}
        <div className="flex items-center gap-2">
          {orders.length > 0 ? (
            <button
              onClick={() => {
                if (window.confirm('¿Deseas vaciar la base de datos de ventas e iniciar en $0 COP?')) {
                  clearOrdersDatabase();
                }
              }}
              className="px-3.5 py-2 bg-rose-600/10 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white border border-rose-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
              title="Reiniciar ventas a $0"
            >
              <Trash2 className="w-3.5 h-3.5" /> Vaciar Ventas (Iniciar en 0)
            </button>
          ) : (
            <button
              onClick={() => seedDefaultOrders()}
              className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-600 text-amber-700 dark:text-amber-300 hover:text-white border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
              title="Cargar ventas de prueba"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Cargar Ventas Demo
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
            <span>Ingresos Totales en BD</span>
            <DollarSign className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-200">
            {formatPrice(totalSalesCOP)}
          </div>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> {totalOrdersCount} pedido(s) registrado(s)
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
            <span>Ventas Perfumes</span>
            <Droplet className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-200">
            {formatPrice(perfumeSalesCOP)}
          </div>
          <p className="text-[10px] text-zinc-500">Extractos de Perfumería</p>
        </div>

        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
            <span>Ventas Relojería</span>
            <Watch className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-200">
            {formatPrice(watchSalesCOP)}
          </div>
          <p className="text-[10px] text-zinc-500">Alta Relojería Suiza</p>
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
            Alerta de reposición en catálogo
          </p>
        </div>
      </div>

      {/* Zero Sales Alert banner if database has 0 orders */}
      {orders.length === 0 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <h4 className="font-bold text-amber-800 dark:text-amber-300 text-xs uppercase">
                Base de Datos de Ventas Vacía (0 Pedidos)
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Las métricas están en $0 COP en tiempo real. Cuando tus clientes realicen compras desde la tienda, las ventas se registrarán automáticamente aquí.
              </p>
            </div>
          </div>
          <button
            onClick={() => seedDefaultOrders()}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
          >
            Cargar Datos Demo
          </button>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Sales Bar Chart */}
        <div className="lg:col-span-8 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-amber-100 uppercase tracking-wider">
              Evolución Mensual de Ventas
            </h3>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">En tiempo real</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={realMonthlySalesData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip
                  formatter={(value: any) => [formatPrice(Number(value) || 0), 'Ventas']}
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
            Distribución de Ventas (%)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={realCategoryDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {realCategoryDistribution.map((entry, index) => (
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
            {realCategoryDistribution.map((cat) => (
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
