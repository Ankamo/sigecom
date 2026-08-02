import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ThemeMode,
  ViewMode,
  Currency,
  Product,
  CartItem,
  Order,
  CustomerVIP,
  User,
  AuditLog
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  MOCK_USERS,
  INITIAL_AUDIT_LOGS
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
  clearProductsDatabase: () => void;
  seedDefaultProducts: () => void;
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
  // User & Auth State
  currentUser: User | null;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  switchUserRole: (role: 'superadmin' | 'admin') => void;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string, severity?: AuditLog['severity']) => void;
  usersList: User[];
  addUser: (user: User) => void;
  // WhatsApp Configuration State
  whatsappNumber: string;
  setWhatsappNumber: (num: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('night'); // Default luxury dark/night mode
  const [viewMode, setViewMode] = useState<ViewMode>('storefront');
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [currency, setCurrency] = useState<Currency>('COP');

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('imperio_lux_products_db');
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored products:', e);
      }
    }
    // Base de datos de productos vacía por defecto
    return [];
  });

  useEffect(() => {
    localStorage.setItem('imperio_lux_products_db', JSON.stringify(products));
  }, [products]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(['perfume-01', 'watch-01']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<CustomerVIP[]>(INITIAL_CUSTOMERS);

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // User & Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS.superadmin.user); // Default to superadmin logged in for quick review
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [usersList, setUsersList] = useState<User[]>([
    MOCK_USERS.superadmin.user,
    MOCK_USERS.admin.user
  ]);

  // WhatsApp Config State
  const [whatsappNumber, setWhatsappNumberState] = useState<string>(() => {
    return localStorage.getItem('imperio_luz_whatsapp_num') || '573118444853';
  });

  const setWhatsappNumber = (num: string) => {
    const cleanNum = num.replace(/\D/g, '');
    setWhatsappNumberState(cleanNum);
    localStorage.setItem('imperio_luz_whatsapp_num', cleanNum);
  };

  const addAuditLog = (action: string, details: string, severity: AuditLog['severity'] = 'info') => {
    const newLog: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString('sv-SE', { dateStyle: 'short', timeStyle: 'medium' }).replace('T', ' '),
      username: currentUser ? currentUser.username : 'invitado',
      role: currentUser ? currentUser.role : 'admin',
      action,
      details,
      ipAddress: '190.168.1.102',
      severity
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const login = (usernameInput: string, passwordInput: string) => {
    const trimmedUsername = usernameInput.trim().toLowerCase();
    const matchedAccount = MOCK_USERS[trimmedUsername];

    if (!matchedAccount) {
      addAuditLog('Intento de Login Fallido', `Usuario no encontrado: ${usernameInput}`, 'warning');
      return { success: false, error: 'Usuario no registrado en Imperio Luz.' };
    }

    if (matchedAccount.password !== passwordInput) {
      addAuditLog('Intento de Login Fallido', `Contraseña incorrecta para usuario: ${trimmedUsername}`, 'critical');
      return { success: false, error: 'Contraseña incorrecta. Por favor verifique sus credenciales.' };
    }

    const updatedUser = {
      ...matchedAccount.user,
      lastLogin: 'Ahora mismo'
    };

    setCurrentUser(updatedUser);
    addAuditLog('Inicio de Sesión Exitoso', `Acceso concedido para ${updatedUser.name} (${updatedUser.role.toUpperCase()})`, 'info');
    setIsLoginModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog('Cierre de Sesión', `Sesión finalizada por el usuario ${currentUser.username}`, 'info');
    }
    setCurrentUser(null);
    setViewMode('storefront');
  };

  const switchUserRole = (role: 'superadmin' | 'admin') => {
    const targetUser = MOCK_USERS[role]?.user;
    if (targetUser) {
      setCurrentUser(targetUser);
      addAuditLog('Cambio de Rol Rápido', `Rol cambiado a: ${role.toUpperCase()}`, 'info');
    }
  };

  const addUser = (newUser: User) => {
    setUsersList((prev) => [...prev, newUser]);
    addAuditLog('Creación de Usuario', `Nuevo usuario registrado: ${newUser.username} (${newUser.role})`, 'info');
  };

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

  const clearProductsDatabase = () => {
    setProducts([]);
    localStorage.setItem('imperio_lux_products_db', JSON.stringify([]));
    addAuditLog('Vaciado de Base de Datos', 'Base de datos de productos vaciada por el usuario', 'warning');
  };

  const seedDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('imperio_lux_products_db', JSON.stringify(INITIAL_PRODUCTS));
    addAuditLog('Semilla de Base de Datos', 'Cargados productos iniciales de demostración', 'info');
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

  const formatPrice = (priceAmount: number) => {
    // If amount is small (legacy USD demo product < 10000), convert to COP base (~4,000 COP/USD)
    const priceCOP = priceAmount < 10000 ? Math.round(priceAmount * 4000) : priceAmount;

    switch (currency) {
      case 'USD':
        return `$${Math.round(priceCOP / 4000).toLocaleString('en-US')} USD`;
      case 'EUR':
        return `€${Math.round(priceCOP / 4300).toLocaleString('es-ES')}`;
      case 'MXN':
        return `$${Math.round(priceCOP / 220).toLocaleString('es-MX')} MXN`;
      case 'COP':
      default:
        return `$ ${Math.round(priceCOP).toLocaleString('es-CO')} COP`;
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
        clearProductsDatabase,
        seedDefaultProducts,
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
        setSearchTerm,
        currentUser,
        isLoginModalOpen,
        setIsLoginModalOpen,
        login,
        logout,
        switchUserRole,
        auditLogs,
        addAuditLog,
        usersList,
        addUser,
        whatsappNumber,
        setWhatsappNumber
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
