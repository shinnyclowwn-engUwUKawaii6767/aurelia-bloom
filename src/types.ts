export type ActivePage = 
  | 'inicio'
  | 'nosotros'
  | 'servicios'
  | 'talleres'
  | 'sostenibilidad'
  | 'galeria'
  | 'contacto';

export interface MaterialItem {
  id: string;
  name: string;
  category: 'envoltorios' | 'soportes' | 'flores' | 'detalles';
  badge: string;
  badgeType?: 'plantable' | 'natural' | 'lifetime' | 'local' | 'zerowaste' | 'fsc';
  spec1Label: string;
  spec1Value: string;
  spec2Label: string;
  spec2Value: string;
  reuseNote: string;
  availability: 'En Stock' | 'Piezas Únicas' | 'Frescura Óptima' | 'Incluido en Pedidos';
  description: string;
  image: string;
}

export interface Workshop {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  spotsLeft: number;
  instructor: string;
  description: string;
  includes: string[];
}

export interface FloralStructure {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  ecoFeature: string;
  idealFor: string;
  image: string;
}

export interface FloralBase {
  id: string;
  name: string;
  craftOrigin: string;
  materialType: string;
  shortDescription: string;
  fullDescription: string;
  secondLifeTitle: string;
  secondLifeDescription: string;
  priceCOP: number;
  badge: string;
  image: string;
}

export type LookbookCategory =
  | 'focal' // 👑 1. The Focal Showstoppers
  | 'line' // 📐 2. The Line & Silhouette Builders
  | 'texture' // 🎨 3. The Texture & Transition Harmonizers
  | 'cloud'; // ☁️ 4. The Airy Filler Clouds

export interface GalleryFlowerItem {
  flowerId: string;
  name: string;
  count: number;
  origin: string;
  colorName?: string;
  categoryTitle?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  flowers: string[];
  flowerDetails: GalleryFlowerItem[];
  price: number;
  image: string;
  span?: string;
  styleId?: 'silvestre' | 'ikebana' | 'atelier' | 'cascada';
  styleName: string;
  structureId: string;
  structureName: string;
  baseId: string;
  baseName: string;
  sizeId: 'petite' | 'atelier' | 'declaracion';
  sizeName: string;
  stemCountTarget: number;
  dimensions: string;
  materialId?: string;
  materialName: string;
  secondLifeTitle: string;
  secondLifeDescription: string;
  secondLifeCategory?: 'Hogar & Mesa' | 'Jardín & Siembra' | 'Moda & Joyería' | 'Organización';
  recyclableBadge: string;
  paletteGroup: 'pastel' | 'calido' | 'botanico' | 'vibrante';
  paletteName: string;
  originRegions: string[];
  initialFlowerCounts: Record<string, number>;
}

export interface ConsciousArrangementOrder {
  palette: string;
  support: string;
  message: string;
  price: number;
  styleName?: string;
  structureName?: string;
  baseName?: string;
  sizeName?: string;
  selectedFlowers?: string[];
  secondLifeSummary?: string;
  seedChoice?: string;
  fragranceChoice?: string;
  heightPreference?: string;
  occasion?: string;
  deliveryDate?: string;
  clientNotes?: string;
}

export interface CustomOrder {
  palette: string;
  support: string;
  message: string;
  recipientName?: string;
  deliveryDate?: string;
  fragrantTouch?: boolean;
}


