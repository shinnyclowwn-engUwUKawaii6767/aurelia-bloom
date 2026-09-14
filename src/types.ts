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

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  flowers: string[];
  price: number;
  image: string;
  span?: string;
}

export interface CustomOrder {
  palette: 'silvestre' | 'secado' | 'monocromo';
  support: 'papel' | 'kenzan' | 'jarron';
  message: string;
  recipientName: string;
  deliveryDate: string;
  fragrantTouch: boolean;
}
