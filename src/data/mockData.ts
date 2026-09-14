import { MaterialItem, Workshop, GalleryItem } from '../types';

export const MATERIALS_DATA: MaterialItem[] = [
  {
    id: 'mat-1',
    name: 'Papel de Algodón con Semillas Silvestres',
    category: 'envoltorios',
    badge: '100% Plantable',
    badgeType: 'plantable',
    spec1Label: 'Gramaje',
    spec1Value: '280 g/m²',
    spec2Label: 'Origen',
    spec2Value: 'Sabana de Bogotá',
    reuseNote: 'Jardinería viva',
    availability: 'En Stock',
    description:
      'Elaborado artesanalmente con descartes textiles de algodón puro y semillas vivas de clavelina y caléndula. Textura algodonosa y borde rústico deshilachado.',
    image:
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mat-2',
    name: 'Cintas de Seda Botánica Aurelia',
    category: 'detalles',
    badge: 'Tinte 100% Botánico',
    badgeType: 'natural',
    spec1Label: 'Fibras',
    spec1Value: 'Pura Seda Habotai',
    spec2Label: 'Origen',
    spec2Value: 'Barichara, Santander',
    reuseNote: 'Lazos para el cabello o regalos',
    availability: 'En Stock',
    description:
      'Teñidas a fuego lento en nuestro taller con pétalos deshidratados de peonía y cortezas de granada. Bordes deshilachados con tacto ultra vaporoso.',
    image:
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mat-3',
    name: 'Kenzan Tradicional & Vasija Cerámica',
    category: 'soportes',
    badge: 'De por Vida',
    badgeType: 'lifetime',
    spec1Label: 'Material',
    spec1Value: 'Latón & Gres Chamotado',
    spec2Label: 'Alfarería',
    spec2Value: 'Ráquira, Boyacá',
    reuseNote: 'Permanente',
    availability: 'Piezas Únicas',
    description:
      'La técnica Ikebana que erradica la espuma plástica. Clavos de alta densidad para sostener tallos con solo un espejo de agua fresca. Pieza de colección.',
    image:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mat-4',
    name: 'Flor Fresca de Temporada & Hibiscos',
    category: 'flores',
    badge: 'Km 0 & Sin Pesticidas',
    badgeType: 'local',
    spec1Label: 'Cosecha',
    spec1Value: 'Matutina Diaria',
    spec2Label: 'Fincas',
    spec2Value: 'Sabana de Bogotá & Rionegro',
    reuseNote: 'Compostable en 4 semanas',
    availability: 'Frescura Óptima',
    description:
      'Flores cortadas 24h antes del diseño, alimentadas con abonos orgánicos. Aromas auténticos que no han sido neutralizados por preservantes químicos industriales.',
    image:
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mat-5',
    name: 'Saquitos Botánicos Monograma AB',
    category: 'detalles',
    badge: 'Zero Waste',
    badgeType: 'zerowaste',
    spec1Label: 'Bordado',
    spec1Value: 'Artesanal en Lino',
    spec2Label: 'Relleno',
    spec2Value: 'Lavanda & Rosas',
    reuseNote: 'Ambientador de armario',
    availability: 'Incluido en Pedidos',
    description:
      'Confeccionados con los retales sobrantes de nuestros talleres de costura y rellenos de pétalos sobrantes deshidratados al aire natural. Fragancia relajante.',
    image:
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mat-6',
    name: 'Cofre de Transporte Aurelia Bloom',
    category: 'envoltorios',
    badge: 'Certificado FSC',
    badgeType: 'fsc',
    spec1Label: 'Material',
    spec1Value: 'Kraft Reciclado 650g',
    spec2Label: 'Tintas',
    spec2Value: 'Base de Agua y Soja',
    reuseNote: '100% Biodegradable',
    availability: 'En Stock',
    description:
      'Estructura de alta protección climática sin recubrimientos plásticos ni pegamentos tóxicos. Diseñado como caja organizadora de recuerdos o maceta de semilleros.',
    image:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
  },
];

export const WORKSHOPS_DATA: Workshop[] = [
  {
    id: 'workshop-1',
    title: 'Composición Primaveral',
    date: 'Sábado, 15 de Mayo',
    time: '10:00 AM',
    duration: '2.5 horas',
    price: 180000,
    spotsLeft: 4,
    instructor: 'Aurelia Soler',
    description:
      'Aprende a combinar texturas y alturas creando ramos silvestres armónicos sin el uso de esponjas sintéticas. Incluye flores frescas de temporada y desayuno botánico.',
    includes: ['Selección de flores de proximidad', 'Tijeras de poda japonesas (en préstamo)', 'Ramo creado para llevar a casa', 'Café de especialidad colombiano y repostería artesana'],
  },
  {
    id: 'workshop-2',
    title: 'Ramos de Novia Minimalistas',
    date: 'Viernes, 28 de Mayo',
    time: '17:00 PM',
    duration: '3 horas',
    price: 240000,
    spotsLeft: 2,
    instructor: 'Elena Valdés',
    description:
      'Explora las proporciones etéreas, atados con cintas de seda botánica teñidas a mano y técnicas de durabilidad para bodas de inspiración editorial.',
    includes: ['Flores nobles colombianas (orquídeas, rosas de jardín, ranúnculos)', 'Cintas de seda pura Habotai', 'Guía impresa de hidratación', 'Copa de espumoso artesanal'],
  },
  {
    id: 'workshop-3',
    title: 'Ikebana Contemporáneo & Fijación en Kenzan',
    date: 'Jueves, 10 de Junio',
    time: '18:30 PM',
    duration: '2.5 horas',
    price: 260000,
    spotsLeft: 5,
    instructor: 'Kenji & Aurelia',
    description:
      'La milenaria técnica japonesa adaptada a flores silvestres de la Sabana. Descubre el vacío, la asimetría y el respeto reverente a la línea natural del tallo.',
    includes: ['Kenzan de latón macizo que te llevas', 'Cuenco de cerámica artesanal de Ráquira (Boyacá)', 'Flores esculturales de temporada', 'Infusión floral caliente'],
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Ramo Poético "Amanecer en Provenza"',
    category: 'Colección de Temporada',
    description:
      'Una sinfonía de peonías coral, rosas inglesas de jardín y ramilletes de alchemilla silvestre. Envuelta en papel de semillas germinable.',
    flowers: ['Peonías Coral Charm', 'Rosa David Austin', 'Eucalipto Cinerea', 'Alchemilla Mollis'],
    price: 165000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRHEdu7Rks_InHCLEiBaarHvQS30U-_OjAnuSLwNmaSLAOar4AmZdJyi0KXLpL3OSEfF-LHCb1CF9BTShj0lDjS21FV--LAXf71nbOiHO3UrEqmPOltTHEqRAs5t256NosMy2N1j_as0E-wp0BXVJztURzuU9NBq9sQwk5NAUhyy0eXT_Urck3xnUM24fPFVVbRNs6gJuzgTl0_C4WLQahSR21FY5UyrR4kZf2VboGUYHyK0IsLv8iBJyMh5_MwbyY_Viv2QecM8pN5w',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'gal-2',
    title: 'Pureza Botánica: Tulipanes Blancos',
    category: 'Monovarietal Minimalista',
    description:
      'Selección de tulipanes dobles de cultivo biológico certificado, acompañados de papel kraft reciclado y sello Aurelia Bloom en cera botánica.',
    flowers: ['Tulipán Blanco Doble Mount Tacoma', 'Follaje de Olivo'],
    price: 125000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC7GiBKA31Qybvp10i4lK3pXfmutNsxzFfnPxugEw1pKlfTfgdB8TrVLOiJS_64X_Cc-6grgEJv7YphG3i7TXCCoO27y7SxO2hRSzCqMxsQ-SnlX2QIro1YRb4N77O1sDzguCiwyMxmwY7JzDrbHQ_ERwPxPYSoGTvrTGaj7BHlBetRMHHfTUabrBY9jQk1PNWxiZuvwNO0zeV06V68jvW8QsTaAiZEJpGkulPip7_6aAywLoV_vNnuY5itRiRWLxLOQEVFeZg9wqQ',
  },
  {
    id: 'gal-3',
    title: 'Calidez Rústica de Girasoles & Trigo',
    category: 'Composición Silvestre',
    description:
      'Girasoles miniatura aterciopelados con espigas de trigo seco y rosas ámbar en vasija de gres envejecida.',
    flowers: ['Girasol Teddy Bear', 'Trigo Secado al Sol', 'Rosa Café Latte', 'Cardo Azul'],
    price: 140000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAVmeIsNbfL4nJSjMBTYBfqw1sJp4I8AVD4WcUtYHUYwq3IU0mgvqtUzrC5oSWEGXcl1GAfcxi0LKiWCajufR6VLzphFEp71Oaj7auaTMkOr_C1HDMK9EBDPk7xJDhkGJrLkjjjb_cvlKvs1bRo4FcGUrU-1AqnFP1XjxXpaqPLj0yJ0Q06rRnVdVgUm1FHDWYZXLJznaAx5PUFJ64FFxDmNNO3m3VEkcEbP4qLzbxvJIFvuajBPGAiY_NVLTJR_X4PgWbYvy8P4jw',
  },
  {
    id: 'gal-4',
    title: 'Centro Nupcial de Orquídeas & Rosas',
    category: 'Diseño para Eventos',
    description:
      'Cascada botánica ingrávida diseñada para mesas imperiales. Montada sobre mallas mecánicas sin esponjas fenólicas contaminantes.',
    flowers: ['Orquídea Phalaenopsis', 'Rosa O’Hara Pálida', 'Eucalipto Baby Blue', 'Helecho Cuero'],
    price: 320000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAb7Vh3h4tsjytfCopI8lzDkoC9CwlpI-k0AsEF46dSf_olbcngmTZFAdbDN52SdU28JbrXEUxe9cFfzsDks2bX3Ji8skOkPsbbvJdw7CyPN2GYP18HlV4I4hpfczqmToOJgAuTI8v8SHFhdssZan6t1nSfUFeVtbc2HNmbFv8oJ1ZERtyHy3VOYDC8sBwmYlb0mPWytyd0D6__na-U0NuRKKwIjIM9yQAdl9TBv_T9vgxkWMEkXFX0nHI8ACqG05yZ5imGuj8nphk',
    span: 'md:col-span-2',
  },
];
