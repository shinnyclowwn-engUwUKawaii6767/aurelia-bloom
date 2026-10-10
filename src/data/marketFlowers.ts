import { FloralStructure, FloralBase, LookbookCategory } from '../types';

export interface MarketFlower {
  id: string;
  name: string;
  subname: string;
  scientificName: string;
  lookbookCategory: LookbookCategory;
  categoryTitle: string;
  categoryIcon: string;
  origin: string;
  colorName: string;
  colorHex: string;
  paletteGroup: 'pastel' | 'calido' | 'botanico' | 'vibrante';
  fragrance: 'Neutro / Hipoalergénico' | 'Suave y Dulce' | 'Herbal Fresco' | 'Balsámico Relajante';
  vaseLifeDays: number;
  seasonAvailability: string;
  pricePerStemCOP: number;
  shortDescription: string;
  fullDescription: string;
  ecoFeature: string;
  image: string;
}

export interface ReusableMaterial {
  id: string;
  name: string;
  craftOrigin: string;
  materialType: string;
  secondLifeTitle: string;
  secondLifeDescription: string;
  secondLifeCategory: 'Hogar & Mesa' | 'Jardín & Siembra' | 'Moda & Joyería' | 'Organización';
  priceCOP: number;
  recyclableBadge: string;
  image: string;
  includedInBase: boolean;
}

export interface DispositionStyle {
  id: 'silvestre' | 'ikebana' | 'atelier' | 'cascada';
  name: string;
  tagline: string;
  description: string;
  heightRecommended: 'Bajo (Centro de mesa)' | 'Medio (Consola / Escritorio)' | 'Alto (Pieza de suelo / Rincón)';
  idealVibe: string;
  baseStemCountMin: number;
  image: string;
}

export interface ArrangementSize {
  id: 'petite' | 'atelier' | 'declaracion';
  name: string;
  stemsLabel: string;
  stemCountTarget: number;
  dimensions: string;
  basePriceCOP: number;
  recommendedSpaces: string;
}

// 1. TÉCNICAS DE ESTRUCTURA FLORAL (MECÁNICA SOSTENIBLE ZERO-PLASTIC)
export const FLORAL_STRUCTURES: FloralStructure[] = [
  {
    id: 'struct-wire',
    name: 'Malla de gallinero (Chicken Wire)',
    tagline: 'El método más popular y versátil',
    shortDescription:
      'Malla de alambre galvanizado arrugada en bola 3D. Sus huecos sostienen los tallos en cualquier ángulo. Flexible, económica y dura años.',
    fullDescription:
      'Es el método más popular y versátil. Se corta un trozo de malla metálica galvanizada, se arruga suavemente formando una bola tridimensional y se introduce en la base. Los huecos de la red sostienen los tallos en cualquier ángulo. Es flexible, económica y dura años.',
    ecoFeature: '100% Reutilizable y reciclable por años, sin microplásticos ni espumas.',
    idealFor: 'Arreglos tupidos, campestres, floreros altos y mesas festivas.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'struct-kenzan',
    name: 'Kenzan (Pinhead / Rana floral)',
    tagline: 'Arte ancestral japonés del Ikebana',
    shortDescription:
      'Bloque pesado de latón con cientos de agujas hacia arriba donde los tallos se clavan directo. Ideal para platos llanos y líneas minimalistas.',
    fullDescription:
      'Originario del arte japonés del Ikebana. Es un bloque pesado de plomo u latón con cientos de agujas de metal que miran hacia arriba. Se coloca en el fondo del recipiente y los tallos se clavan directamente en las agujas. Ideal para arreglos minimalistas, platos llanos y diseños lineales.',
    ecoFeature: 'Pieza de por vida de latón macizo; fija tallos con precisión milimétrica.',
    idealFor: 'Platos llanos, arreglos minimalistas, ramas esculturales y estética zen.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'struct-branches',
    name: 'Estructuras de ramas entrelazadas',
    tagline: '100% Biodegradable & Compostable en casa',
    shortDescription:
      'Ramas flexibles (sauce, hiedra o poda) dobladas formando una red natural de soporte dentro del florero. Va directo al compost.',
    fullDescription:
      'Una técnica 100% biodegradable. Se introducen ramas flexibles (como sauce, hiedra o restos de poda) dobladas y entrelazadas dentro del florero para crear una red natural que sujeta las flores. Al marchitarse el arreglo, todo va directo al compost.',
    ecoFeature: 'Cero manufactura industrial; material botánico que se biodegrada en casa.',
    idealFor: 'Arreglos silvestres de prado, bouquets orgánicos y estética naturalista.',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'struct-tape',
    name: 'Rejilla de cinta de papel',
    tagline: 'Cinta kraft impermeable biodegradable',
    shortDescription:
      'Cuadrícula superficial en floreros de boca ancha usando cinta de papel en lugar de plásticos. Soporta tallos con total libertad visual.',
    fullDescription:
      'Si se necesita asegurar la parte superior de un florero de boca ancha, se puede crear una cuadrícula en la superficie usando cinta adhesiva de papel (masking tape) o cinta impermeable de grado profesional (que sea biodegradable), en lugar de la cinta plástica tradicional.',
    ecoFeature: 'Papel kraft con adhesivo vegetal natural biodegradable.',
    idealFor: 'Floreros de boca ancha, urnas y arreglos expandidos de salón.',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
  },
];

// 2. BASES SOSTENIBLES DEL ARREGLO FLORAL
export const FLORAL_BASES: FloralBase[] = [
  {
    id: 'base-ceramica',
    name: 'Cerámica artesanal y arcilla',
    craftOrigin: 'Alfarería tradicional de Ráquira & La Chamba',
    materialType: 'Barro cocido chamotado y cerámica gres',
    shortDescription:
      'Vasijas, platos hondos y jarrones de barro cocido o cerámica. Pesados, ultra estables, no contaminan y aportan textura orgánica.',
    fullDescription:
      'Vasijas, platos hondos y jarrones de barro cocido o cerámica. Son pesados (lo que da estabilidad a arreglos grandes), no contaminan y aportan una textura orgánica muy valorada en el diseño actual.',
    secondLifeTitle: 'Frutero, Cuenco de Mesa o Tazón Cerámico',
    secondLifeDescription:
      'Apto para el contacto con alimentos o como elemento decorativo permanente en la sala o comedor.',
    priceCOP: 35000,
    badge: 'Barro Vivo · 100% Orgánico',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'base-vidrio',
    name: 'Vidrio reciclado',
    craftOrigin: 'Taller de vidrio artesanal y recuperación posconsumo, Bogotá',
    materialType: '100% Vidrio recuperado posconsumo sin plomo',
    shortDescription:
      'Floreros vintage de segunda mano, frascos de conservas o botellas de vino reutilizadas. Transparencia poética y cero huella nueva.',
    fullDescription:
      'Desde floreros vintage comprados en tiendas de segunda mano hasta frascos de conservas, botellas de vino o recipientes de vidrio transparente reutilizados.',
    secondLifeTitle: 'Licorera, Decantador de Agua o Florero Eterno',
    secondLifeDescription:
      'Límpialo fácilmente y úsalo toda la vida para agua fresca en el velador o conservas en la cocina.',
    priceCOP: 28000,
    badge: '100% Posconsumo Reutilizado',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'base-piedra',
    name: 'Piedra, mármol o cemento',
    craftOrigin: 'Canteras de Barichara & vaciado mineral curado',
    materialType: 'Piedra natural tallada o cemento curado al agua',
    shortDescription:
      'Cuencos pesados de gran formato. Retienen el agua a la perfección, previenen cualquier vuelco de tallos pesados y son eternos.',
    fullDescription:
      'Ideales para arreglos pesados de gran formato. Los cuencos de piedra natural o cemento curado retienen el agua perfectamente y son eternos.',
    secondLifeTitle: 'Jardinera de Suculentas o Fuente Meditativa',
    secondLifeDescription:
      'Pieza arquitectónica sólida que sirve como macetero de exterior, fuente de agua o portavelas rústico.',
    priceCOP: 45000,
    badge: 'Mineral Inmutable & Eterno',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'base-madera',
    name: 'Bases de madera tratada o troncos vaciados',
    craftOrigin: 'Carpintería de recuperación forestal, Cundinamarca',
    materialType: 'Secciones de troncos caídos o cajas de madera natural',
    shortDescription:
      'Secciones de troncos caídos o cajas de madera natural impermeabilizadas con cera de abejas o cuenco interno de contención.',
    fullDescription:
      'Se pueden usar secciones de troncos caídos o cajas de madera natural. Nota: Si la madera no es estanca, se debe impermeabilizar usando cera de abejas natural o colocar un cuenco de vidrio oculto en su interior para contener el agua.',
    secondLifeTitle: 'Caja Organizadora o Maceta Rústica de Huerto',
    secondLifeDescription:
      'Almacena especias en la cocina o utilízala como jardinera natural para aromáticas en el balcón.',
    priceCOP: 38000,
    badge: 'Madera Caída · Cera Natural',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'base-fibras',
    name: 'Cestas de fibras naturales',
    craftOrigin: 'Tejedoras campesinas de Barichara, San Gil & Ráquira',
    materialType: 'Mimbre, yute, ratán o esparto tejido a mano',
    shortDescription:
      'Cestas de mimbre, yute, ratán o esparto. Incluyen un contenedor interior reutilizable para contener el agua fresca de los tallos.',
    fullDescription:
      'Mimbre, yute, ratán o esparto. Al igual que con la madera, para contener el agua de las flores frescas se introduce un recipiente de vidrio, cerámica o metal reutilizable dentro de la cesta.',
    secondLifeTitle: 'Panera Campestre, Costurero o Canasto Organizador',
    secondLifeDescription:
      'Un cesto textil cálido para servir panes frescos en la mesa dominical o guardar labores del hogar.',
    priceCOP: 32000,
    badge: 'Fibras Vegetales 100% Biodegradables',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
  },
];

// LOOKBOOK COPY & MANIFIESTO
export const LOOKBOOK_METADATA = {
  title: 'THE AURELIA BLOOM LOOKBOOK',
  subtitle: '100% Zero-Plastic • 100% Biodegradable • Cultivated in Colombia',
  manifesto:
    'Welcome to a new era of floral design. At Aurelia Bloom, we have completely banned single-use plastics, synthetic floral foam (oasis), and plastic tape from our workshop. Every bloom in this catalog is curated for its natural strength, designed to lock perfectly into reusable chicken wire nets, steel kenzans, or organic twig structures. This is how nature looks when it is allowed to stay natural.',
  categories: [
    {
      id: 'focal' as LookbookCategory,
      number: '1',
      title: 'The Focal Showstoppers',
      icon: '👑',
      tagline: 'Las estrellas de tu arreglo',
      summary:
        'Aportan impacto visual masivo y anclan tu diseño sin requerir bloques de espuma plástica para mantenerse erguidas.',
      fullDescription:
        'The stars of your arrangement. They bring massive visual impact and anchor your design without needing plastic foam blocks to stand tall.',
    },
    {
      id: 'line' as LookbookCategory,
      number: '2',
      title: 'The Line & Silhouette Builders',
      icon: '📐',
      tagline: 'Definen altura, flujo y límites',
      summary:
        'Especies que marcan la arquitectura y las fronteras de tu arreglo usando únicamente su porte orgánico.',
      fullDescription:
        'These species define the height, flow, and boundaries of your arrangement using only their organic posture.',
    },
    {
      id: 'texture' as LookbookCategory,
      number: '3',
      title: 'The Texture & Transition Harmonizers',
      icon: '🎨',
      tagline: 'Los conectores naturales',
      summary:
        'Se entrelazan a través del arreglo, cubriendo vacíos y generando soporte físico mutuo entre los tallos.',
      fullDescription:
        'The connectors. They weave through your arrangement, bridging gaps and creating natural stability by intertwining.',
    },
    {
      id: 'cloud' as LookbookCategory,
      number: '4',
      title: 'The Airy Filler Clouds',
      icon: '☁️',
      tagline: 'El toque final etéreo',
      summary:
        'Flósculos delicados que integran el diseño mientras ocultan mágicamente la mecánica estructural de soporte.',
      fullDescription:
        'The finishing touch. These delicate florets blend your design together while magically concealing your structural base.',
    },
  ],
};

// 3. FLORES DEL LOOKBOOK CULTIVADAS EN COLOMBIA
export const MARKET_FLOWERS_COLOMBIA: MarketFlower[] = [
  // 👑 1. THE FOCAL SHOWSTOPPERS
  {
    id: 'fl-1',
    name: 'Rosas & Mini Rosas',
    subname: 'The Sturdy Icons',
    scientificName: 'Rosa x hybrida',
    lookbookCategory: 'focal',
    categoryTitle: 'The Focal Showstoppers',
    categoryIcon: '👑',
    origin: 'Sabana de Bogotá (Sopó)',
    colorName: 'Ámbar, cappuccino y crema',
    colorHex: '#c79c78',
    paletteGroup: 'calido',
    fragrance: 'Suave y Dulce',
    vaseLifeDays: 14,
    seasonAvailability: 'Cosecha continua todo el año',
    pricePerStemCOP: 4500,
    shortDescription:
      'Tallos leñosos y rígidos que actúan como pilares naturales, anclándose firmemente en nuestra malla metálica.',
    fullDescription:
      'Grown in the Savanna of Bogotá, their rigid, woody stems act as natural pillars, locking securely into our reusable wire frameworks.',
    ecoFeature: 'Tallos leñosos autoreportados sin tutores de alambre ni plástico.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fl-2',
    name: 'Hortensias',
    subname: 'The Cloud Makers',
    scientificName: 'Hydrangea macrophylla',
    lookbookCategory: 'focal',
    categoryTitle: 'The Focal Showstoppers',
    categoryIcon: '👑',
    origin: 'Rionegro (Oriente Antioqueño)',
    colorName: 'Azul nieve y jade empolvado',
    colorHex: '#7fa1c3',
    paletteGroup: 'pastel',
    fragrance: 'Neutro / Hipoalergénico',
    vaseLifeDays: 16,
    seasonAvailability: 'Cosecha continua de altura',
    pricePerStemCOP: 5200,
    shortDescription:
      'Bellezas antioqueñas que llenan amplios espacios con un solo tallo, reduciendo residuos y manteniendo el arreglo liviano.',
    fullDescription:
      'These massive Antioquian beauties fill vast spaces with just a single stem, reducing overall flower waste and keeping your arrangement lightweight and breathable.',
    ecoFeature: 'Llenado volumétrico limpio que minimiza la cantidad de tallos requeridos.',
    image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fl-3',
    name: 'Girasoles',
    subname: 'The Earth Anchors',
    scientificName: 'Helianthus annuus',
    lookbookCategory: 'focal',
    categoryTitle: 'The Focal Showstoppers',
    categoryIcon: '👑',
    origin: 'Villa de Leyva & Boyacá',
    colorName: 'Amarillo sol y centro tostado',
    colorHex: '#e5ad23',
    paletteGroup: 'calido',
    fragrance: 'Herbal Fresco',
    vaseLifeDays: 15,
    seasonAvailability: 'Cosecha soleada andina',
    pricePerStemCOP: 4800,
    shortDescription:
      'Audaces y pesados. Los equilibramos con vasijas de cerámica o piedra para contrarrestar su porte con aplomo natural.',
    fullDescription:
      'Bold and heavy. We pair these radiant suns with handcrafted ceramic or volcanic stone vessels to naturally counterweight their glorious, top-heavy stems.',
    ecoFeature: 'Flores de fuerte fuste que se balancean por gravedad sin químicos.',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fl-4',
    name: 'Anturios',
    subname: 'The Zero-Waste Sculptures',
    scientificName: 'Anthurium andraeanum',
    lookbookCategory: 'focal',
    categoryTitle: 'The Focal Showstoppers',
    categoryIcon: '👑',
    origin: 'Fusagasugá (Cundinamarca)',
    colorName: 'Blanco marfil y esmeralda',
    colorHex: '#f5f0ea',
    paletteGroup: 'botanico',
    fragrance: 'Neutro / Hipoalergénico',
    vaseLifeDays: 22,
    seasonAvailability: 'Viveros conservacionistas',
    pricePerStemCOP: 6500,
    shortDescription:
      'Corazones exóticos con escudo laqueado natural de altísima duración. Prosperan en Kenzan sin envolturas plásticas.',
    fullDescription:
      'With a glossy, lacquer-like natural shield, these exotic hearts are incredibly long-lasting. They thrive on minimalist metal kenzans, completely eliminating the need for supportive plastic wraps.',
    ecoFeature: 'Cutícula vegetal cérea impermeable que protege la flor de por sí.',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
  },

  // 📐 2. THE LINE & SILHOUETTE BUILDERS
  {
    id: 'fl-5',
    name: 'Lirios',
    subname: 'The Living Spires',
    scientificName: 'Lilium orientalis',
    lookbookCategory: 'line',
    categoryTitle: 'The Line & Silhouette Builders',
    categoryIcon: '📐',
    origin: 'Sabana de Bogotá (Facatativá)',
    colorName: 'Rosa lirio y blanco níveo',
    colorHex: '#e8b8c8',
    paletteGroup: 'pastel',
    fragrance: 'Suave y Dulce',
    vaseLifeDays: 18,
    seasonAvailability: 'Floración continua',
    pricePerStemCOP: 4900,
    shortDescription:
      'Altas espigas señoriales que florecen progresivamente por semanas. Aportan altura estructural y son 100% compostables en casa.',
    fullDescription:
      'Stately, tall stalks that bloom progressively over weeks. They give structural height to your arrangement and decompose beautifully in home compost bins.',
    ecoFeature: 'Apertura escalonada sin conservantes sintéticos; tallo 100% compostable.',
    image: 'https://images.unsplash.com/photo-1558697698-9300a84a6a99?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fl-6',
    name: 'Boca de Dragón',
    subname: 'The Wild Trails',
    scientificName: 'Antirrhinum majus',
    lookbookCategory: 'line',
    categoryTitle: 'The Line & Silhouette Builders',
    categoryIcon: '📐',
    origin: 'Subachoque & Tenjo',
    colorName: 'Coral silvestre y salmón',
    colorHex: '#e07a5f',
    paletteGroup: 'vibrante',
    fragrance: 'Herbal Fresco',
    vaseLifeDays: 14,
    seasonAvailability: 'Temporada fresca andina',
    pricePerStemCOP: 3200,
    shortDescription:
      'Espigas juguetonas que curvan naturalmente hacia la luz. Ideales para siluetas campestres asimétricas sin tutores plásticos.',
    fullDescription:
      'Playful spires that instinctively curve toward the light. Perfect for creating loose, asymmetrical, field-style silhouettes without rigid plastic stakes.',
    ecoFeature: 'Movimiento fototrópico libre que crea dinamismo orgánico genuino.',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
  },

  // 🎨 3. THE TEXTURE & TRANSITION HARMONIZERS
  {
    id: 'fl-7',
    name: 'Claveles',
    subname: 'The Ruffled Staples',
    scientificName: 'Dianthus caryophyllus',
    lookbookCategory: 'texture',
    categoryTitle: 'The Texture & Transition Harmonizers',
    categoryIcon: '🎨',
    origin: 'Madrid (Cundinamarca)',
    colorName: 'Borgoña, melocotón y rosado',
    colorHex: '#8e384d',
    paletteGroup: 'calido',
    fragrance: 'Suave y Dulce',
    vaseLifeDays: 21,
    seasonAvailability: 'Orgullo colombiano todo el año',
    pricePerStemCOP: 2200,
    shortDescription:
      'Orgullo colombiano. Sus tallos nudosos crean una cuadrícula entrelazada natural que sostiene las flores vecinas.',
    fullDescription:
      'Colombia’s pride. Their unique notched stems create a brilliant, natural interlocking grid inside the vase, physically supporting weaker flowers around them.',
    ecoFeature: 'Máxima longevidad comprobada en agua pura sin aditivos químicos.',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fl-8',
    name: 'Pompones',
    subname: 'The Resilient Spheres',
    scientificName: 'Chrysanthemum morifolium',
    lookbookCategory: 'texture',
    categoryTitle: 'The Texture & Transition Harmonizers',
    categoryIcon: '🎨',
    origin: 'Rionegro & Marinilla',
    colorName: 'Lavanda, lila y blanco puro',
    colorHex: '#a084ca',
    paletteGroup: 'pastel',
    fragrance: 'Neutro / Hipoalergénico',
    vaseLifeDays: 20,
    seasonAvailability: 'Cosecha continua andina',
    pricePerStemCOP: 2300,
    shortDescription:
      'Gemas geométricas muy resistentes que se agrupan firmemente para ocultar la mecánica de alambre sin perder pétalos.',
    fullDescription:
      'Tough, geometric gems that can handle being clustered tightly together to hide structural wire setups without losing a single petal.',
    ecoFeature: 'Pétalos firmes que resisten la fricción del montaje sostenible.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fl-9',
    name: 'Astromelias',
    subname: 'The Mid-Tier Clusters',
    scientificName: 'Alstroemeria aurea',
    lookbookCategory: 'texture',
    categoryTitle: 'The Texture & Transition Harmonizers',
    categoryIcon: '🎨',
    origin: 'Facatativá (Sabana de Bogotá)',
    colorName: 'Rubor suave y amarillo solar',
    colorHex: '#d8b4e2',
    paletteGroup: 'pastel',
    fragrance: 'Neutro / Hipoalergénico',
    vaseLifeDays: 18,
    seasonAvailability: 'Floración continua',
    pricePerStemCOP: 2400,
    shortDescription:
      'Racimos multirramificados que dan cuerpo al centro. Tallos deshojados a mano que mantienen el agua cristalina sin químicos.',
    fullDescription:
      'Bursting with miniature multi-bloom patterns, we use these to flesh out the center of bouquets, cleaning the lower stems manually so your water stays clear without chemical treatments.',
    ecoFeature: 'Múltiples capullos por vara que van abriendo día tras día.',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fl-10',
    name: 'Gerberas',
    subname: 'The Graphic Wheels',
    scientificName: 'Gerbera jamesonii',
    lookbookCategory: 'texture',
    categoryTitle: 'The Texture & Transition Harmonizers',
    categoryIcon: '🎨',
    origin: 'San Antonio del Tequendama',
    colorName: 'Naranja fuego y carmesí',
    colorHex: '#f26419',
    paletteGroup: 'vibrante',
    fragrance: 'Neutro / Hipoalergénico',
    vaseLifeDays: 14,
    seasonAvailability: 'Todo el año',
    pricePerStemCOP: 3000,
    shortDescription:
      'Ruedas circulares de tallo hueco que descansan sobre las celdas de la malla sin tubos ni alambres plásticos invasivos.',
    fullDescription:
      'Radiant, flat circular faces. Because their stems are naturally hollow, we rest them directly onto our wire mesh pockets rather than forcing plastic tubes or wire wraps around them.',
    ecoFeature: 'Soporte gravitacional libre sobre la red sin enfundado sintético.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
  },

  // ☁️ 4. THE AIRY FILLER CLOUDS
  {
    id: 'fl-11',
    name: 'Velo de Novia & Limonium',
    subname: 'The Ethereal Mists',
    scientificName: 'Gypsophila paniculata & Limonium sinuatum',
    lookbookCategory: 'cloud',
    categoryTitle: 'The Airy Filler Clouds',
    categoryIcon: '☁️',
    origin: 'Tenjo & Sabana de Bogotá',
    colorName: 'Blanco bruma y lavanda suave',
    colorHex: '#ded6dc',
    paletteGroup: 'botanico',
    fragrance: 'Neutro / Hipoalergénico',
    vaseLifeDays: 25,
    seasonAvailability: 'Cosecha de estación',
    pricePerStemCOP: 2200,
    shortDescription:
      'Niebla botánica delicada que oculta la mecánica metálica y se seca en sitio para una exhibición permanente.',
    fullDescription:
      'Intricate, branching stems that mimic natural fog. They drape beautifully over the edges of recycled glass jars, completely hiding the metal mechanics beneath. Bonus: They dry flawlessly in place, transforming your fresh arrangement into a permanent dried display.',
    ecoFeature: 'Flor de doble ciclo: fresca y posteriormente flor seca permanente.',
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fl-12',
    name: 'Eucalipto Cinerea & Olivo',
    subname: 'The Botanical Whispers',
    scientificName: 'Eucalyptus cinerea & Olea europaea',
    lookbookCategory: 'cloud',
    categoryTitle: 'The Airy Filler Clouds',
    categoryIcon: '☁️',
    origin: 'Sesquilé & Villa de Leyva',
    colorName: 'Verde glauco y plateado',
    colorHex: '#7a9287',
    paletteGroup: 'botanico',
    fragrance: 'Balsámico Relajante',
    vaseLifeDays: 22,
    seasonAvailability: 'Poda forestal sostenible',
    pricePerStemCOP: 1800,
    shortDescription:
      'Ramas balsámicas aromáticas que dan volumen etéreo y purifican el aire del hogar con su fragancia pura.',
    fullDescription:
      'Aromatic branches with silvery leaves that weave naturally between floral stems, masking structural mechanics while scenting the air.',
    ecoFeature: 'Aroma limpio balsámico natural; se puede colgar en la ducha tras el ramo.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
  },
];

// REUSABLE MATERIALS & SIZES
export const DISPOSITION_STYLES: DispositionStyle[] = [
  {
    id: 'silvestre',
    name: 'Silvestre & Orgánico de Campo',
    tagline: 'Movimiento libre como un prado vivo de la Sabana',
    description: 'Composición asimétrica y desestructurada con múltiples alturas. Los tallos respiran libremente generando la sensación de haber sido recién recolectados al alba en el campo.',
    heightRecommended: 'Medio (Consola / Escritorio)',
    idealVibe: 'Natural, etéreo y bohemio',
    baseStemCountMin: 14,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ikebana',
    name: 'Ikebana Escultural Zen',
    tagline: 'Fijación ancestral en Kenzan con protagonismo del vacío',
    description: 'Estética japonesa contemporánea que resalta la curva natural de cada rama, la pureza de la línea y el espacio negativo. Diseñado para contemplación tranquila sin masa recargada.',
    heightRecommended: 'Bajo (Centro de mesa)',
    idealVibe: 'Minimalista, artístico y sereno',
    baseStemCountMin: 8,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'atelier',
    name: 'Bouquet Atelier Envolvente',
    tagline: 'Domo clásico en espiral con densidad aterciopelada',
    description: 'Técnica de atado holandés en espiral continua que forma una cúpula voluptuosa y equilibrada de flores desde cualquier ángulo visual.',
    heightRecommended: 'Medio (Consola / Escritorio)',
    idealVibe: 'Romántico, elegante y armónico',
    baseStemCountMin: 16,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cascada',
    name: 'Cascada Botánica Contemporánea',
    tagline: 'Fluidez asimétrica con caída dramática de ramas',
    description: 'Diseño arquitectónico con descolgamiento fluido de follajes y orquídeas. Crea una silueta dinámica perfecta para aparadores, chimeneas o mesas alargadas.',
    heightRecommended: 'Alto (Pieza de suelo / Rincón)',
    idealVibe: 'Escenográfico, silvestre y dramático',
    baseStemCountMin: 18,
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
  },
];

export const ARRANGEMENT_SIZES: ArrangementSize[] = [
  {
    id: 'petite',
    name: 'Petite Consciente',
    stemsLabel: '8 – 10 tallos seleccionados',
    stemCountTarget: 9,
    dimensions: '25 – 30 cm altura',
    basePriceCOP: 120000,
    recommendedSpaces: 'Mesa de noche, velador o tocador personal',
  },
  {
    id: 'atelier',
    name: 'Atelier Esencial (Más elegido)',
    stemsLabel: '16 – 18 tallos de temporada',
    stemCountTarget: 17,
    dimensions: '45 – 50 cm altura',
    basePriceCOP: 165000,
    recommendedSpaces: 'Mesa de centro, comedor o recibidor principal',
  },
  {
    id: 'declaracion',
    name: 'Gran Declaración de Autor',
    stemsLabel: '26 – 30 tallos premium',
    stemCountTarget: 28,
    dimensions: '65 – 70 cm altura',
    basePriceCOP: 235000,
    recommendedSpaces: 'Puntos focales, celebraciones o salas de estar',
  },
];

export const REUSABLE_MATERIALS: ReusableMaterial[] = [
  {
    id: 'mat-vidrio',
    name: 'Florero en Vidrio Soplado 100% Reciclado',
    craftOrigin: 'Taller artesanal de vidrio soplado, Bogotá',
    materialType: '100% Vidrio recuperado posconsumo sin plomo',
    secondLifeTitle: 'Decantador de Agua o Florero Eterno',
    secondLifeDescription:
      'Tras la vida de las flores, lávalo con agua tibia. Funciona como una hermosa licorera de mesa, decantador de agua para tu velador o candelero para velas cilíndricas.',
    secondLifeCategory: 'Hogar & Mesa',
    priceCOP: 42000,
    recyclableBadge: '100% Reciclado & Eterno',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    includedInBase: false,
  },
  {
    id: 'mat-kenzan',
    name: 'Kenzan Tradicional + Cuenco Cerámico de Ráquira',
    craftOrigin: 'Alfarería ancestral de Ráquira (Boyacá) & Latón macizo',
    materialType: 'Latón de por vida + Barro cocido chamotado con pigmentos de tierra',
    secondLifeTitle: 'Tazón de Matcha, Joyero o Cuenco Aperitivo',
    secondLifeDescription:
      'El Kenzan (rana de clavos) te servirá toda la vida para cualquier arreglo casero. El cuenco cerámico es apto para alimentos: úsalo como tazón de té matcha, para servir aceitunas o como cuenco para joyas.',
    secondLifeCategory: 'Hogar & Mesa',
    priceCOP: 55000,
    recyclableBadge: 'Sin Fin de Vida Útil',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    includedInBase: false,
  },
  {
    id: 'mat-fique',
    name: 'Canasto en Fibra Natural de Fique & Algodón Reciclado',
    craftOrigin: 'Tejedoras campesinas de San Gil & Curití (Santander)',
    materialType: '100% Fibra vegetal de fique biodegradable y algodón textil recuperado',
    secondLifeTitle: 'Panera Artesanal, Organizador o Maceta Colgante',
    secondLifeDescription:
      'Al terminar las flores, este cesto estructurado es ideal como organizador de escritorio, panera rústica para la mesa dominical o macetero colgante para plantas aromáticas.',
    secondLifeCategory: 'Organización',
    priceCOP: 38000,
    recyclableBadge: '100% Biodegradable',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    includedInBase: false,
  },
  {
    id: 'mat-furoshiki',
    name: 'Envoltorio Furoshiki en Lino Teñido con Botánicos',
    craftOrigin: 'Telar artesanal de Barichara teñido con semillas de aguacate',
    materialType: '100% Lino orgánico y tintes botánicos al fuego',
    secondLifeTitle: 'Pañuelo de Cuello, Servilleta Gourmet o Envoltorio Reutilizable',
    secondLifeDescription:
      'Siguiendo la tradición zero-waste de Japón, la tela que envuelve el arreglo se reutiliza como pañuelo de seda/lino, servilleta individual para vajillas de autor o para empacar regalos sin usar papel.',
    secondLifeCategory: 'Moda & Joyería',
    priceCOP: 28000,
    recyclableBadge: 'Cero Residuo Textil',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
    includedInBase: false,
  },
  {
    id: 'mat-papel',
    name: 'Pliego de Papel Semilla Germinable + Cintas de Algodón',
    craftOrigin: 'Fabricación artesanal en la Sabana de Bogotá',
    materialType: 'Retales de algodón blanco reciclado con semillas de flores vivas',
    secondLifeTitle: 'Mini Jardín Silvestre Plantable en Casa',
    secondLifeDescription:
      'Tras admirar tu ramo, corta el envoltorio en pedazos pequeños y plántalo en una maceta con tierra húmeda. En 10-14 días germinarán margaritas, manzanilla y caléndulas.',
    secondLifeCategory: 'Jardín & Siembra',
    priceCOP: 0,
    recyclableBadge: '100% Germinable',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    includedInBase: true,
  },
];

export const SEED_TYPES = [
  { id: 'manzanilla', name: 'Manzanilla & Caléndula', benefit: 'Flores medicinales de infusión y aroma dulce' },
  { id: 'albahaca', name: 'Albahaca & Menta Silvestre', benefit: 'Hierbas aromáticas vivas para tu cocina' },
  { id: 'amapolas', name: 'Amapolas & Clavelinas Campestres', benefit: 'Polinizadoras amigables con abejas y mariposas' },
];

export const OCCASIONS_LIST = [
  'Celebración & Cumpleaños',
  'Amor, Romance & Aniversario',
  'Agradecimiento & Reconocimiento',
  'Auto-cuidado & Armonía para el Hogar',
  'Sanación, Paz & Abrazo al Corazón',
  'Encargo Libre de Autor',
];
