export type ThemeMode = 'day' | 'night';
export type ViewMode = 'storefront' | 'saas_dashboard';
export type Currency = 'USD' | 'EUR' | 'MXN';

export type UserRole = 'superadmin' | 'admin';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  lastLogin?: string;
  permissions: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  username: string;
  role: UserRole;
  action: string;
  details: string;
  ipAddress: string;
  severity: 'info' | 'warning' | 'critical';
}

export type ProductCategory = 'perfume' | 'watch';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
  longevity: 'Moderada (4-6h)' | 'Larga Duración (8-12h)' | 'Eterna (12h+)';
  sillage: 'Intimo' | 'Moderado' | 'Envolvente / Intenso';
  family: 'Oud & Maderas' | 'Ámbar Oriental' | 'Floral de Nicho' | 'Cítrico Aromático' | 'Gourmand Espaciado';
}

export interface WatchSpecs {
  movement: 'Automático Suizo' | 'Tourbillon Mecánico' | 'Cuerda Manual' | 'Cronógrafo de Alta Precisión';
  caseMaterial: 'Oro Rosa 18K' | 'Titanio Grado 5' | 'Acero Inoxidable 316L' | 'Cerámica Negra';
  powerReserve: string;
  waterResistance: string;
  strap: 'Piel de Caimán' | 'Brazalete Titanio' | 'Caucho de Lujo' | 'Cuero Italiano';
  caseDiameter: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  luxuryTier: 'Colección Privada' | 'Haute Horlogerie' | 'Edición Limitada' | 'Niche Parfum';
  description: string;
  gender: 'Unisex' | 'Homme' | 'Femme';
  fragranceNotes?: FragranceNotes;
  watchSpecs?: WatchSpecs;
  featured?: boolean;
  volumeOrSizes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  engravingText?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  priceUSD: number;
  engravingText?: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  totalUSD: number;
  status: 'Pendiente' | 'En Preparación' | 'Empaque de Lujo' | 'Enviado' | 'Entregado';
  date: string;
  luxuryPackaging: boolean;
  complementarySample?: string;
  shippingAddress: string;
}

export interface CustomerVIP {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'Platino VIP' | 'Oro Royale' | 'Plata Elegance';
  totalSpentUSD: number;
  preferredCategory: ProductCategory | 'Ambos';
  favoriteNotesOrStyle: string[];
  lastPurchaseDate: string;
  conciergeNotes: string;
  avatar: string;
}

export interface QuizState {
  occasion: string;
  vibe: string;
  preferredNotesOrStyle: string;
  gender: string;
}
