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
  AuditLog,
  ConciergeMessage
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  MOCK_USERS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

export const playAlertSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const playTone = (freq: number, start: number, duration: number, type: OscillatorType = 'sine') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    };

    // Elegant 3-tone luxury chime
    playTone(880, 0, 0.35, 'triangle');
    playTone(1108.73, 0.12, 0.45, 'sine');
    playTone(1318.51, 0.24, 0.7, 'sine');
  } catch (err) {
    console.warn('Audio alert sound failed:', err);
  }
};

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
  clearOrdersDatabase: () => void;
  seedDefaultOrders: () => void;
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
  // Concierge Messages & Alerts State
  conciergeMessages: ConciergeMessage[];
  addConciergeMessage: (data: { name: string; email: string; phone: string; subject: string; message: string }) => void;
  markConciergeMessageAsRead: (id: string) => void;
  updateConciergeMessageStatus: (id: string, status: ConciergeMessage['status']) => void;
  clearConciergeMessages: () => void;
  unreadConciergeCount: number;
  playAlertSound: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('night');
  const [viewMode, setViewMode] = useState<ViewMode>('storefront');
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [currency, setCurrency] = useState<Currency>('COP');

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(['perfume-01', 'watch-01']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [orders, setOrders] = useState<Order[]>([]);
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
  const [whatsappNumber, setWhatsappNumberState] = useState<string>('573118444853');

  // Concierge Messages State
  const [conciergeMessages, setConciergeMessages] = useState<ConciergeMessage[]>([]);

  // ----------------------------------------------------
  // INITIAL SYNC FROM SERVER DATABASE (NO LOCAL STORAGE)
  // ----------------------------------------------------
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const res = await fetch('/api/db/sync');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.products)) setProducts(data.products);
          if (Array.isArray(data.orders)) setOrders(data.orders);
          if (Array.isArray(data.conciergeMessages)) setConciergeMessages(data.conciergeMessages);
          if (Array.isArray(data.customers)) setCustomers(data.customers);
          if (data.settings && data.settings.whatsappNumber) {
            setWhatsappNumberState(data.settings.whatsappNumber);
          }
        }
      } catch (error) {
        console.error('Error sincronizando con la base de datos del servidor:', error);
      }
    };

    fetchServerData();
  }, []);

  const setWhatsappNumber = (num: string) => {
    const cleanNum = num.replace(/\D/g, '');
    setWhatsappNumberState(cleanNum);
    fetch('/api/db/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ whatsappNumber: cleanNum })
    }).catch((e) => console.error('Error guardando configuración de WhatsApp:', e));
  };

  const unreadConciergeCount = conciergeMessages.filter((m) => !m.read).length;

  const addConciergeMessage = (data: { name: string; email: string; phone: string; subject: string; message: string }) => {
    const newMsg: ConciergeMessage = {
      id: `MSG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'medium' }),
      name: data.name,
      email: data.email,
      phone: data.phone || 'No especificado',
      subject: data.subject,
      message: data.message,
      read: false,
      status: 'Nuevo'
    };

    setConciergeMessages((prev) => [newMsg, ...prev]);

    fetch('/api/db/concierge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMsg)
    }).catch((e) => console.error('Error en servidor al guardar mensaje de concierge:', e));

    // 🔊 PLAY IMMEDIATE ALARM / ALERT SOUND
    playAlertSound();

    // 🔔 ADD AUDIT LOG ALERT FOR ADMIN / SUPER ADMIN
    addAuditLog(
      'NUEVO MENSAJE AL CONCIERGE',
      `Cliente ${data.name} (${data.email}) envió solicitud: "${data.subject}" - Mensaje: ${data.message.slice(0, 60)}...`,
      'critical'
    );
  };

  const markConciergeMessageAsRead = (id: string) => {
    setConciergeMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
    fetch(`/api/db/concierge/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true })
    }).catch((e) => console.error(e));
  };

  const updateConciergeMessageStatus = (id: string, status: ConciergeMessage['status']) => {
    setConciergeMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status, read: true } : m))
    );
    fetch(`/api/db/concierge/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, read: true })
    }).catch((e) => console.error(e));
  };

  const clearConciergeMessages = () => {
    setConciergeMessages([]);
    fetch('/api/db/concierge/clear', { method: 'POST' }).catch((e) => console.error(e));
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
      return { success: false, error: 'Usuario no registrado en Imperio Lux.' };
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

  // Toggle theme body & html class
  useEffect(() => {
    if (themeMode === 'night') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-zinc-950', 'text-zinc-100');
      document.body.classList.remove('bg-zinc-50', 'text-zinc-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-zinc-50', 'text-zinc-900');
      document.body.classList.remove('bg-zinc-950', 'text-zinc-100');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'night' ? 'day' : 'night'));
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    fetch('/api/db/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).catch((e) => console.error(e));
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    fetch(`/api/db/products/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).catch((e) => console.error(e));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    fetch(`/api/db/products/${id}`, {
      method: 'DELETE'
    }).catch((e) => console.error(e));
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stockQuantity: newStock, inStock: newStock > 0 } : p
      )
    );
    fetch('/api/db/products/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, newStock })
    }).catch((e) => console.error(e));
  };

  const clearProductsDatabase = () => {
    setProducts([]);
    fetch('/api/db/products/clear', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch((e) => console.error(e));
    addAuditLog('Vaciado de Base de Datos', 'Base de datos de productos vaciada por el usuario', 'warning');
  };

  const seedDefaultProducts = () => {
    fetch('/api/db/products/seed', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch((e) => console.error(e));
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

    fetch('/api/db/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) setOrders(data.orders);
        if (data.products) setProducts(data.products);
      })
      .catch((e) => console.error(e));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    fetch(`/api/db/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).catch((e) => console.error(e));
  };

  const clearOrdersDatabase = () => {
    setOrders([]);
    fetch('/api/db/orders/clear', { method: 'POST' }).catch((e) => console.error(e));
    addAuditLog('Vaciado de Ventas', 'Base de datos de ventas y pedidos reiniciada a $0', 'warning');
  };

  const seedDefaultOrders = () => {
    fetch('/api/db/orders/seed', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) setOrders(data.orders);
      })
      .catch((e) => console.error(e));
    addAuditLog('Semilla de Ventas', 'Cargados pedidos iniciales de demostración', 'info');
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
        clearOrdersDatabase,
        seedDefaultOrders,
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
        setWhatsappNumber,
        conciergeMessages,
        addConciergeMessage,
        markConciergeMessageAsRead,
        updateConciergeMessageStatus,
        clearConciergeMessages,
        unreadConciergeCount,
        playAlertSound
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
