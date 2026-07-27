import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ThemeMode,
  ViewMode,
  Currency,
  Product,
  CartItem,
  Order,
  CustomerVIP
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS
} from '../data/mockData';

interface AppContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, engravingText?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  customers: CustomerVIP[];
  addCustomerNote: (customerId: string, note: string) => void;
  formatPrice: (priceUSD: number) => string;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('night'); // Default luxury dark/night mode
  const [viewMode, setViewMode] = useState<ViewMode>('storefront');
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [currency, setCurrency] = useState<Currency>('USD');

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(['perfume-01', 'watch-01']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<CustomerVIP[]>(INITIAL_CUSTOMERS);

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle theme body class
  useEffect(() => {
    if (themeMode === 'night') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'night' ? 'day' : 'night'));
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stockQuantity: newStock, inStock: newStock > 0 } : p
      )
    );
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    engravingText?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (engravingText) updated[existingIndex].engravingText = engravingText;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedSize: selectedSize || (product.volumeOrSizes ? product.volumeOrSizes[0] : undefined),
          engravingText
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    // Deduct stock for ordered products
    order.items.forEach((item) => {
      setProducts((prevProducts) =>
        prevProducts.map((p) => {
          if (p.id === item.productId) {
            const updatedQty = Math.max(0, p.stockQuantity - item.quantity);
            return { ...p, stockQuantity: updatedQty, inStock: updatedQty > 0 };
          }
          return p;
        })
      );
    });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const addCustomerNote = (customerId: string, note: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId
          ? { ...c, conciergeNotes: `${c.conciergeNotes}\n[${new Date().toLocaleDateString()}] ${note}` }
          : c
      )
    );
  };

  const formatPrice = (priceUSD: number) => {
    switch (currency) {
      case 'EUR':
        return `€${Math.round(priceUSD * 0.92).toLocaleString('es-ES')}`;
      case 'MXN':
        return `$${Math.round(priceUSD * 18.2).toLocaleString('es-MX')} MXN`;
      case 'USD':
      default:
        return `$${priceUSD.toLocaleString('en-US')}`;
    }
  };

  return (
    <AppContext.Provider
      value={{
        themeMode,
        setThemeMode,
        toggleTheme,
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        currency,
        setCurrency,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        selectedProduct,
        setSelectedProduct,
        orders,
        addOrder,
        updateOrderStatus,
        customers,
        addCustomerNote,
        formatPrice,
        isQuizOpen,
        setIsQuizOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
