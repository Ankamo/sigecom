import { Product, Order, CustomerVIP } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // PERFUMES
  {
    id: 'perfume-01',
    name: 'Oud Impérial Extrait de Parfum',
    brand: 'AURA Haute Parfumerie',
    category: 'perfume',
    priceUSD: 380,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Oud Camboyano', 'Rosa de Taif', 'Ámbar Gris', 'Edición Privada'],
    inStock: true,
    stockQuantity: 18,
    sku: 'AUR-PERF-OUD01',
    luxuryTier: 'Colección Privada',
    description: 'Una creación majestuosa donde el Oud camboyano añejado por 15 años se entrelaza con pétalos frescos de rosa de Taif y resinas ambarinas sobre una base ahumada de sándalo real.',
    gender: 'Unisex',
    featured: true,
    volumeOrSizes: ['50ml Extrait', '100ml Extrait'],
    fragranceNotes: {
      top: ['Azafrán de Cachemira', 'Pimienta Rosa', 'Cardamomo Verde'],
      heart: ['Rosa de Taif', 'Jazmín de Noche', 'Incienso Omán'],
      base: ['Oud Camboyano Natural', 'Ámbar Gris', 'Sándalo de Mysore', 'Almizcle'],
      longevity: 'Eterna (12h+)',
      sillage: 'Envolvente / Intenso',
      family: 'Oud & Maderas'
    }
  },
  {
    id: 'perfume-02',
    name: 'Velvet Iris & Smoked Bourbon',
    brand: 'AURA Haute Parfumerie',
    category: 'perfume',
    priceUSD: 295,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
    tags: ['Iris de Florencia', 'Bourbon Añejo', 'Gourmand'],
    inStock: true,
    stockQuantity: 24,
    sku: 'AUR-PERF-VEL02',
    luxuryTier: 'Niche Parfum',
    description: 'El iris noble de Florencia envuelto en matices cálidos de bourbon envejecido en barrica de roble, tonka caramelizada y un sutil velo de gamuza de lujo.',
    gender: 'Unisex',
    featured: true,
    volumeOrSizes: ['50ml Parfum', '100ml Parfum'],
    fragranceNotes: {
      top: ['Corteza de Bergamota', 'Licor de Bourbon', 'Nuez Moscada'],
      heart: ['Iris de Florencia', 'Manteca de Manteca de Violeta', 'Cacao Puro'],
      base: ['Haba Tonka', 'Gamuza Blanca', 'Vainilla Bourbon', 'Cedro de Virginia'],
      longevity: 'Larga Duración (8-12h)',
      sillage: 'Moderado',
      family: 'Ámbar Oriental'
    }
  },
  {
    id: 'perfume-03',
    name: 'Santal Céleste & White Amber',
    brand: 'AURA Haute Parfumerie',
    category: 'perfume',
    priceUSD: 310,
    rating: 4.9,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80',
    tags: ['Sándalo Australiano', 'Ámbar Blanco', 'Fresco Maderoso'],
    inStock: true,
    stockQuantity: 12,
    sku: 'AUR-PERF-SAN03',
    luxuryTier: 'Colección Privada',
    description: 'Una composición etérea de sándalo australiano cremoso realzado con gotas de ámbar blanco cristalino y violetas silvestres bañadas en rocío matutino.',
    gender: 'Unisex',
    featured: false,
    volumeOrSizes: ['100ml Parfum'],
    fragranceNotes: {
      top: ['Hojas de Violeta', 'Semilla de Cilantro', 'Limonero de Sicilia'],
      heart: ['Ámbar Blanco', 'Ciprés de Toscana', 'Lirio del Valle'],
      base: ['Sándalo Cremoso', 'Papiro de Egipto', 'Cuero Suave'],
      longevity: 'Larga Duración (8-12h)',
      sillage: 'Moderado',
      family: 'Oud & Maderas'
    }
  },
  {
    id: 'perfume-04',
    name: 'Fleur Royale de Grasse',
    brand: 'Maison L\'AURA',
    category: 'perfume',
    priceUSD: 340,
    rating: 4.7,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
    tags: ['Jazmín de Grasse', 'Tuberosa Imperial', 'Alta Costura'],
    inStock: true,
    stockQuantity: 9,
    sku: 'AUR-PERF-FLE04',
    luxuryTier: 'Edición Limitada',
    description: 'El esplendor floral definitivo. Cosechado manualmente en los campos de Grasse durante el amanecer de mayo, combinando jazmín grandiflorum y tuberosa con toques melosos.',
    gender: 'Femme',
    featured: true,
    volumeOrSizes: ['50ml Parfum', '100ml Parfum'],
    fragranceNotes: {
      top: ['Flor de Naranjo de Túnez', 'Mandarina Verde'],
      heart: ['Jazmín de Grasse', 'Tuberosa Imperial', 'Ylang-Ylang de Comores'],
      base: ['Miel de Azahar', 'Almizcle Cremoso', 'Vainilla de Madagascar'],
      longevity: 'Eterna (12h+)',
      sillage: 'Envolvente / Intenso',
      family: 'Floral de Nicho'
    }
  },
  {
    id: 'perfume-05',
    name: 'Citrus Zest & Midnight Vetiver',
    brand: 'Maison L\'AURA',
    category: 'perfume',
    priceUSD: 260,
    rating: 4.8,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=80',
    tags: ['Vetiver de Haití', 'Bergamota de Calabria', 'Vigorizante'],
    inStock: true,
    stockQuantity: 31,
    sku: 'AUR-PERF-CIT05',
    luxuryTier: 'Niche Parfum',
    description: 'La frescura chispeante de la bergamota de Calabria y el pomelo amargo se funden con el magnetismo oscuro del vetiver terroso de Haití.',
    gender: 'Homme',
    featured: false,
    volumeOrSizes: ['100ml Parfum'],
    fragranceNotes: {
      top: ['Bergamota de Calabria', 'Pomelo Amargo', 'Menta Piperita'],
      heart: ['Pimienta Negra de Madagascar', 'Geranio Bourbon'],
      base: ['Vetiver de Haití', 'Musgo de Roble', 'Pachulí Oscuro'],
      longevity: 'Larga Duración (8-12h)',
      sillage: 'Moderado',
      family: 'Cítrico Aromático'
    }
  },

  // WATCHES
  {
    id: 'watch-01',
    name: 'Chronos Tourbillon Volant Royale',
    brand: 'CHRONOS Horlogerie',
    category: 'watch',
    priceUSD: 14500,
    rating: 5.0,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Tourbillon Volante', 'Oro Rosa 18K', 'Edición 25 Piezas'],
    inStock: true,
    stockQuantity: 3,
    sku: 'CHR-WAT-TOUR01',
    luxuryTier: 'Haute Horlogerie',
    description: 'Una obra maestra de la micro-mecánica suiza. Tourbillon volante cage expuesto a las 6 en punto, caja de oro rosa de 18K esculpida a mano y esfera de zafiro ahumado.',
    gender: 'Unisex',
    featured: true,
    watchSpecs: {
      movement: 'Tourbillon Mecánico',
      caseMaterial: 'Oro Rosa 18K',
      powerReserve: '72 Horas',
      waterResistance: '50 Metros',
      strap: 'Piel de Caimán',
      caseDiameter: '41 mm'
    }
  },
  {
    id: 'watch-02',
    name: 'Celestial Moonphase Perpetual Automatic',
    brand: 'CHRONOS Horlogerie',
    category: 'watch',
    priceUSD: 8900,
    rating: 4.9,
    reviewsCount: 58,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
    tags: ['Fase Lunar Zafiro', 'Titanio Grado 5', 'Calendario Perpetuo'],
    inStock: true,
    stockQuantity: 5,
    sku: 'CHR-WAT-CELE02',
    luxuryTier: 'Haute Horlogerie',
    description: 'Esfera de aventurina azul estrellado que evoca el firmamento nocturno. Complicación astronómica de fase lunar real calibrada para mantener precisión durante 122 años.',
    gender: 'Unisex',
    featured: true,
    watchSpecs: {
      movement: 'Automático Suizo',
      caseMaterial: 'Titanio Grado 5',
      powerReserve: '60 Horas',
      waterResistance: '100 Metros',
      strap: 'Brazalete Titanio',
      caseDiameter: '40 mm'
    }
  },
  {
    id: 'watch-03',
    name: 'Obsidian Skeleton Chronograph Limited',
    brand: 'CHRONOS Horlogerie',
    category: 'watch',
    priceUSD: 11200,
    rating: 4.9,
    reviewsCount: 37,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
    tags: ['Movimiento Esqueleto', 'Cerámica Negra', 'Cronógrafo'],
    inStock: true,
    stockQuantity: 4,
    sku: 'CHR-WAT-SKEL03',
    luxuryTier: 'Edición Limitada',
    description: 'Arquitectura esqueletizada audaz en cerámica de alta tecnología mate. Movimiento integrado manufactura de rueda de pilares visible desde ambos cristales de zafiro.',
    gender: 'Homme',
    featured: true,
    watchSpecs: {
      movement: 'Cronógrafo de Alta Precisión',
      caseMaterial: 'Cerámica Negra',
      powerReserve: '55 Horas',
      waterResistance: '100 Metros',
      strap: 'Caucho de Lujo',
      caseDiameter: '42 mm'
    }
  },
  {
    id: 'watch-04',
    name: 'Elysium Diamond & Rose Gold Automatic',
    brand: 'CHRONOS Horlogerie',
    category: 'watch',
    priceUSD: 9800,
    rating: 4.8,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    tags: ['Diamantes VVS', 'Oro Rosa', 'Nácar Natural'],
    inStock: true,
    stockQuantity: 6,
    sku: 'CHR-WAT-ELY04',
    luxuryTier: 'Colección Privada',
    description: 'Bisel engastado con 56 diamantes corte brillante de pureza VVS. Esfera de nácar natural con reflejos iridiscentes y segundero en forma de hoja en relieve.',
    gender: 'Femme',
    featured: false,
    watchSpecs: {
      movement: 'Automático Suizo',
      caseMaterial: 'Oro Rosa 18K',
      powerReserve: '42 Horas',
      waterResistance: '30 Metros',
      strap: 'Cuero Italiano',
      caseDiameter: '36 mm'
    }
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9821',
    customerName: 'Victoria de la Serna',
    email: 'victoria.delaserna@luxure.com',
    phone: '+34 612 884 920',
    items: [
      { productId: 'perfume-01', productName: 'Oud Impérial Extrait de Parfum', quantity: 1, priceUSD: 380, engravingText: 'V.D.S. MCMXCV' }
    ],
    totalUSD: 380,
    status: 'Empaque de Lujo',
    date: '2026-07-27',
    luxuryPackaging: true,
    complementarySample: 'Velvet Iris 2ml',
    shippingAddress: 'Paseo de la Castellana 142, Madrid, España'
  },
  {
    id: 'ORD-9822',
    customerName: 'Alejandro Sterling',
    email: 'a.sterling@capital.com',
    phone: '+52 55 4192 0033',
    items: [
      { productId: 'watch-01', productName: 'Chronos Tourbillon Volant Royale', quantity: 1, priceUSD: 14500, engravingText: 'A.S. - 2026' }
    ],
    totalUSD: 14500,
    status: 'En Preparación',
    date: '2026-07-27',
    luxuryPackaging: true,
    complementarySample: 'Citrus Zest 2ml',
    shippingAddress: 'Av. Paseo de las Palmas 730, Lomas de Chapultepec, CDMX'
  },
  {
    id: 'ORD-9819',
    customerName: 'Sophia Lindqvist',
    email: 'sophia@nordicgroup.se',
    phone: '+46 8 555 3102',
    items: [
      { productId: 'perfume-04', productName: 'Fleur Royale de Grasse', quantity: 2, priceUSD: 680 }
    ],
    totalUSD: 680,
    status: 'Enviado',
    date: '2026-07-26',
    luxuryPackaging: true,
    complementarySample: 'Oud Impérial 2ml',
    shippingAddress: 'Strandvägen 42, Stockholm, Sweden'
  }
];

export const INITIAL_CUSTOMERS: CustomerVIP[] = [
  {
    id: 'VIP-001',
    name: 'Victoria de la Serna',
    email: 'victoria.delaserna@luxure.com',
    phone: '+34 612 884 920',
    tier: 'Platino VIP',
    totalSpentUSD: 18450,
    preferredCategory: 'Ambos',
    favoriteNotesOrStyle: ['Oud Camboyano', 'Oro Rosa', 'Rosa de Taif'],
    lastPurchaseDate: '2026-07-27',
    conciergeNotes: 'Prefiere entregas con estuche grabado en pan de oro y muestras de extractos de nicho.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'VIP-002',
    name: 'Alejandro Sterling',
    email: 'a.sterling@capital.com',
    phone: '+52 55 4192 0033',
    tier: 'Platino VIP',
    totalSpentUSD: 34200,
    preferredCategory: 'watch',
    favoriteNotesOrStyle: ['Tourbillon', 'Titanio Grado 5', 'Complicaciones'],
    lastPurchaseDate: '2026-07-27',
    conciergeNotes: 'Coleccionista de Alta Relojería. Asiste a eventos privados de lanzamiento en Ginebra.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'VIP-003',
    name: 'Isabella von Furstenberg',
    email: 'isabella@vonfursten.de',
    phone: '+49 89 2108 901',
    tier: 'Oro Royale',
    totalSpentUSD: 9800,
    preferredCategory: 'perfume',
    favoriteNotesOrStyle: ['Iris de Florencia', 'Jazmín de Grasse', 'Gamuza'],
    lastPurchaseDate: '2026-07-21',
    conciergeNotes: 'Entusiasta de la floricultura de Grasse. Solicita siempre el frasco con atomizador personalizado.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  }
];

export const SALES_MONTHLY_DATA = [
  { month: 'Ene', perfumes: 32000, relojes: 88000, total: 120000 },
  { month: 'Feb', perfumes: 41000, relojes: 94000, total: 135000 },
  { month: 'Mar', perfumes: 38000, relojes: 112000, total: 150000 },
  { month: 'Abr', perfumes: 49000, relojes: 105000, total: 154000 },
  { month: 'May', perfumes: 58000, relojes: 128000, total: 186000 },
  { month: 'Jun', perfumes: 64000, relojes: 142000, total: 206000 },
  { month: 'Jul', perfumes: 71000, relojes: 165000, total: 236000 }
];

export const CATEGORY_DISTRIBUTION = [
  { name: 'Oud & Maderas', value: 35, color: '#C5A059' },
  { name: 'Alta Relojería (Tourbillon)', value: 28, color: '#2C3E50' },
  { name: 'Ámbar Oriental', value: 18, color: '#D4AF37' },
  { name: 'Cronógrafos / Esqueleto', value: 12, color: '#8E44AD' },
  { name: 'Florales de Grasse', value: 7, color: '#E8A7A1' }
];
