import React, { useState, useMemo } from 'react';
import { GALLERY_DATA, WORKSHOPS_DATA } from '../data/mockData';
import { GalleryItem, Workshop, ActivePage } from '../types';
import { formatCOP } from '../utils/currency';
const heroBgImage = 'https://images.unsplash.com/photo-1527609635833-38e4a5f7c941?fm=jpg&q=80&w=2000&auto=format&fit=crop';
import {
  Flower2,
  PartyPopper,
  Truck,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Recycle,
  Sliders,
  Leaf,
  Eye,
  RotateCcw,
  Compass,
  Ban,
  Sprout,
  Droplets,
  Gift,
} from 'lucide-react';

interface MainScreenProps {
  onSelectArrangement: (item: GalleryItem) => void;
  onCustomizeArrangement?: (item: GalleryItem) => void;
  onBookWorkshop: (workshop: Workshop) => void;
  onNavigatePage: (page: ActivePage) => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({
  onSelectArrangement,
  onCustomizeArrangement,
  onBookWorkshop,
  onNavigatePage,
}) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    nombre: '',
    email: '',
    asunto: 'Consulta General',
    mensaje: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  // Gallery Filters (Aligned with customizable catalog structure & bases)
  const [galleryStructureFilter, setGalleryStructureFilter] = useState<string>('todos');
  const [galleryBaseFilter, setGalleryBaseFilter] = useState<string>('todos');
  const [galleryPaletteFilter, setGalleryPaletteFilter] = useState<string>('todas');

  const filteredGalleryItems = useMemo(() => {
    return GALLERY_DATA.filter((item) => {
      if (galleryStructureFilter !== 'todos' && item.structureId !== galleryStructureFilter) {
        return false;
      }
      if (galleryBaseFilter !== 'todos' && item.baseId !== galleryBaseFilter) {
        return false;
      }
      if (galleryPaletteFilter !== 'todas' && item.paletteGroup !== galleryPaletteFilter) {
        return false;
      }
      return true;
    });
  }, [galleryStructureFilter, galleryBaseFilter, galleryPaletteFilter]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.nombre || !contactData.email) return;

    setIsSending(true);
    setSendError(false);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'e97b5b45-710f-4461-8b19-e8e3c88559c2',
          subject: `Aurelia Bloom · ${contactData.asunto}`,
          from_name: contactData.nombre,
          email: contactData.email,
          message: contactData.mensaje,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContactSubmitted(true);
      } else {
        setSendError(true);
      }
    } catch {
      setSendError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        id="inicio"
        className="relative h-[90vh] min-h-[620px] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={heroBgImage}
            alt="Taller y floristería botánica artesanal Aurelia Bloom"
            className="w-full h-full object-cover object-center sm:object-[60%_center] lg:object-[68%_center] transition-transform duration-10000 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff8f6]/95 via-[#fff8f6]/85 to-[#fff8f6]/25 lg:to-transparent" />
        </div>

        <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl py-12 lg:py-16">
            <span className="font-ui text-sm text-[#a8295e] uppercase tracking-[0.2em] mb-4 block">
              <span className="font-editorial italic text-xl sm:text-2xl text-[#063311] font-normal tracking-normal capitalize block">
                Donde florecen las flores, también lo hace la esperanza.
              </span>
            </span>

            <h1 className="font-display-title text-4xl sm:text-5xl lg:text-6xl text-[#1e1b19] font-light mb-8 leading-[1.18]">
              Cada flor guarda un recuerdo, <br />
              <span className="italic text-[#a8295e] font-normal">cada ramo una emoción.</span>
            </h1>

            <div className="flex flex-wrap gap-3.5 sm:gap-5 items-center">
              <button
                id="hero-descubre-btn"
                onClick={() => onNavigatePage('sostenibilidad')}
                className="px-7 sm:px-9 py-3.5 sm:py-4 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:translate-y-[-2px] hover:bg-[#912150] transition-all duration-300 shadow-lg shadow-[#a8295e]/20 flex items-center gap-2.5"
              >
                <Flower2 className="w-4 h-4 text-white shrink-0" />
                <span>Arreglo personalizado</span>
              </button>

              <button
                id="hero-nosotros-btn"
                onClick={() => {
                  const el = document.getElementById('nosotros');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 sm:px-9 py-3.5 sm:py-4 border-[1.5px] border-[#735c00] text-[#735c00] rounded-full font-ui text-sm font-semibold hover:bg-[#735c00]/10 transition-colors duration-300"
              >
                Sobre nosotros
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 right-8 sm:right-16 hidden lg:block">
          <div className="flex items-center gap-4 text-[#564147]">
            <span className="font-ui text-sm">Scroll para explorar</span>
            <div className="w-px h-12 bg-[#ddbfc6]/70" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicios" className="py-24 px-4 sm:px-8 lg:px-16 bg-[#fff8f6]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-4">
              Servicios Exclusivos
            </h2>
            <div className="w-24 h-0.5 bg-[#735c00] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group p-8 sm:p-10 bg-white border border-[#ddbfc6]/40 rounded-2xl hover:border-[#a8295e]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#a8295e]/5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#ffd9e2] flex items-center justify-center mb-8 text-[#a8295e] group-hover:scale-110 transition-transform">
                  <Flower2 className="w-7 h-7" />
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#1e1b19] font-medium mb-4">
                  Arreglos Personalizados
                </h3>
                <p className="font-editorial text-sm text-[#564147] mb-6 leading-relaxed">
                  Creamos piezas únicas que capturan la esencia de tu mensaje, utilizando el sentimiento y cariño con flores frescas recolectadas a diario.
                </p>
              </div>
              <button
                onClick={() => onNavigatePage('sostenibilidad')}
                className="inline-flex items-center text-[#a8295e] font-ui text-sm font-semibold group/link hover:text-[#912150]"
              >
                <span>Configurar a medida</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Service 2 */}
            <div className="group p-8 sm:p-10 bg-white border border-[#ddbfc6]/40 rounded-2xl hover:border-[#a8295e]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#a8295e]/5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#ffe088] flex items-center justify-center mb-8 text-[#735c00] group-hover:scale-110 transition-transform">
                  <PartyPopper className="w-7 h-7" />
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#1e1b19] font-medium mb-4">
                  Decoración de Eventos
                </h3>
                <p className="font-editorial text-sm text-[#564147] mb-6 leading-relaxed">
                  Transformamos espacios en jardines encantados para bodas y eventos especiales, con un estilo romántico y sofisticado libre de plásticos.
                </p>
              </div>
              <a
                href="#contacto"
                className="inline-flex items-center text-[#a8295e] font-ui text-sm font-semibold group/link hover:text-[#912150]"
              >
                <span>Saber más</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Service 3 */}
            <div className="group p-8 sm:p-10 bg-white border border-[#ddbfc6]/40 rounded-2xl hover:border-[#a8295e]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#a8295e]/5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#ffd9e2] flex items-center justify-center mb-8 text-[#a8295e] group-hover:scale-110 transition-transform">
                  <Truck className="w-7 h-7" />
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#1e1b19] font-medium mb-4">
                  Entregas a Domicilio
                </h3>
                <p className="font-editorial text-sm text-[#564147] mb-6 leading-relaxed">
                  Servicio de entrega local cuidado y puntual en cofre de transporte rígido FSC, garantizando que cada ramo llegue en perfectas condiciones.
                </p>
              </div>
              <a
                href="#galeria"
                className="inline-flex items-center text-[#a8295e] font-ui text-sm font-semibold group/link hover:text-[#912150]"
              >
                <span>Ver catálogo</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section
        id="talleres"
        className="py-24 px-4 sm:px-8 lg:px-16 bg-[#efe6e3] relative overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="flex-1 order-2 lg:order-1">
            <span className="font-ui text-xs font-semibold text-[#735c00] uppercase tracking-[0.2em] mb-4 block">
              Aprende con nosotros
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-6">
              Talleres de Arte Floral
            </h2>
            <p className="font-editorial text-base sm:text-lg text-[#564147] mb-8 leading-relaxed">
              Sumérgete en el mundo de la botánica y descubre las técnicas de composición que utilizamos en nuestro taller. Espacios íntimos diseñados para despertar tu creatividad y conectar con la naturaleza.
            </p>

            <div className="space-y-4 mb-8">
              {WORKSHOPS_DATA.map((ws) => (
                <div
                  key={ws.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-[#fff8f6]/80 border-l-4 border-[#a8295e] rounded-r-xl gap-4 shadow-sm"
                >
                  <div className="flex-1">
                    <h4 className="font-ui text-base font-semibold text-[#1e1b19]">
                      {ws.title}
                    </h4>
                    <p className="text-xs text-[#564147] font-ui mt-0.5">
                      {ws.date} • {ws.time} • Solo {ws.spotsLeft} plazas
                    </p>
                  </div>
                  <button
                    onClick={() => onBookWorkshop(ws)}
                    className="px-6 py-2.5 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-colors whitespace-nowrap self-start sm:self-center shadow-sm"
                  >
                    Reserva tu cupo ({formatCOP(ws.price)})
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2 grid grid-cols-2 gap-4 w-full">
            <div className="pt-8 sm:pt-12">
              <img
                className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg transition-transform hover:scale-102"
                alt="Manos organizando un arreglo floral en el taller"
                src="https://images.unsplash.com/photo-1628927124199-a8a2a5394392?fm=jpg&q=80&w=1200&auto=format&fit=crop"
              />
            </div>
            <div>
              <img
                className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg transition-transform hover:scale-102"
                alt="Flores frescas sobre mesa de madera en el taller Aurelia Bloom"
                src="https://images.unsplash.com/photo-1628761907965-9cc7faee1dc8?fm=jpg&q=80&w=1200&auto=format&fit=crop"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Remodeled Gallery Section (100% aligned with the customizable catalog) */}
      <section id="galeria" className="py-24 px-4 sm:px-8 lg:px-16 bg-[#fff8f6] border-t border-[#ddbfc6]/40">
        <div className="max-w-[1280px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffd9e2]/80 border border-[#ddbfc6] text-[#a8295e] font-ui text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                <Flower2 className="w-3.5 h-3.5 text-[#a8295e]" />
                <span>COLECCIÓN VIVA · 100% DEL CATÁLOGO PERSONALIZABLE</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1e1b19] font-medium leading-tight">
                Galería de Diseños del Catálogo
              </h2>
              <p className="font-editorial text-base text-[#564147] mt-3 leading-relaxed">
                Cada propuesta de esta galería ha sido creada únicamente con las flores frescas del mercado colombiano y materiales reciclables o con doble uso presentes en nuestro catálogo. Puedes encargar cualquier diseño tal como fue soñado o abrirlo en el creador para personalizarlo a tu preferencia.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigatePage('sostenibilidad')}
                className="px-6 py-3 bg-[#a8295e] text-white rounded-full font-ui text-xs sm:text-sm font-semibold hover:bg-[#912150] transition-colors shadow-md flex items-center gap-2 group"
              >
                <Sliders className="w-4 h-4" />
                <span>Diseñar arreglo desde cero</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Interactive Catalog Filters */}
          {/* Interactive Catalog Filters (Estructuras y Bases del Catálogo) */}
          <div className="mb-10 p-5 bg-white rounded-2xl border border-[#ddbfc6]/60 shadow-sm space-y-4">
            {/* 1. Sustainable Structure Filter */}
            <div>
              <span className="font-ui text-xs font-semibold text-[#8a7177] uppercase tracking-wider block mb-2.5">
                Filtrar por Estructura Floral (Mecánica sin espuma plástica):
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'todos', label: 'Todas las estructuras' },
                  { id: 'struct-wire', label: '🕸️ Malla de gallinero' },
                  { id: 'struct-kenzan', label: '⛩️ Kenzan (Pinhead)' },
                  { id: 'struct-branches', label: '🌿 Ramas entrelazadas' },
                  { id: 'struct-tape', label: '📐 Rejilla cinta de papel' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setGalleryStructureFilter(st.id)}
                    className={`px-4 py-2 rounded-full text-xs font-ui font-semibold transition-all ${
                      galleryStructureFilter === st.id
                        ? 'bg-[#a8295e] text-white shadow-xs'
                        : 'bg-[#fff8f6] text-[#564147] hover:bg-[#ffd9e2]/40 border border-[#ddbfc6]/60'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Secondary Filters (Base Sostenible & Paleta) */}
            <div className="pt-3 border-t border-[#ddbfc6]/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-ui text-xs text-[#564147] font-semibold flex items-center gap-1">
                    <Recycle className="w-3.5 h-3.5 text-[#2d5a3f]" /> Base del arreglo:
                  </span>
                  <select
                    value={galleryBaseFilter}
                    onChange={(e) => setGalleryBaseFilter(e.target.value)}
                    className="text-xs font-ui bg-[#fff8f6] border border-[#ddbfc6]/70 rounded-lg px-3 py-1.5 text-[#1e1b19] focus:outline-none focus:border-[#a8295e]"
                  >
                    <option value="todos">Todas las bases</option>
                    <option value="base-ceramica">Cerámica artesanal y arcilla</option>
                    <option value="base-vidrio">Vidrio reciclado</option>
                    <option value="base-piedra">Piedra, mármol o cemento</option>
                    <option value="base-madera">Madera tratada o troncos vaciados</option>
                    <option value="base-fibras">Cestas de fibras naturales</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-ui text-xs text-[#564147] font-semibold">
                    Paleta:
                  </span>
                  <select
                    value={galleryPaletteFilter}
                    onChange={(e) => setGalleryPaletteFilter(e.target.value)}
                    className="text-xs font-ui bg-[#fff8f6] border border-[#ddbfc6]/70 rounded-lg px-3 py-1.5 text-[#1e1b19] focus:outline-none focus:border-[#a8295e]"
                  >
                    <option value="todas">Todas las paletas</option>
                    <option value="calido">Cálida & Terracota</option>
                    <option value="pastel">Pastel & Romántica</option>
                    <option value="botanico">Botánica & Sereno</option>
                    <option value="vibrante">Vibrante & Escénica</option>
                  </select>
                </div>
              </div>

              {/* Status & Reset */}
              <div className="flex items-center gap-3 text-xs font-ui">
                <span className="text-[#8a7177]">
                  Mostrando <strong>{filteredGalleryItems.length}</strong> de {GALLERY_DATA.length} arreglos
                </span>
                {(galleryStructureFilter !== 'todos' || galleryBaseFilter !== 'todos' || galleryPaletteFilter !== 'todas') && (
                  <button
                    onClick={() => {
                      setGalleryStructureFilter('todos');
                      setGalleryBaseFilter('todos');
                      setGalleryPaletteFilter('todas');
                    }}
                    className="text-[#a8295e] hover:underline font-semibold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restablecer</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Catalog Cards Grid */}
          {filteredGalleryItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredGalleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-[#ddbfc6]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-[#a8295e]/40"
                >
                  {/* Card Visual Header */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#fbf2ef]">
                    <img
                      alt={item.title}
                      src={item.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Floating Badge: Structure Technique */}
                    <div className="absolute top-3 left-3 bg-[#a8295e]/90 backdrop-blur-sm text-white text-[11px] font-ui font-semibold px-3 py-1 rounded-full shadow-md max-w-[200px] truncate">
                      {item.structureName}
                    </div>

                    {/* Floating Badge: Size & Stems */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#1e1b19] text-[11px] font-ui font-semibold px-2.5 py-1 rounded-full shadow-md border border-[#ddbfc6]/50">
                      {item.sizeName} · {item.stemCountTarget} tallos
                    </div>

                    {/* Floating Badge: Base & Second Life */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2 rounded-xl border border-[#ddbfc6]/70 shadow-sm flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 truncate">
                        <Recycle className="w-4 h-4 text-[#2d5a3f] shrink-0" />
                        <span className="text-[11px] font-ui text-[#2d5a3f] font-semibold truncate">
                          Base: {item.baseName}
                        </span>
                      </div>
                      <span className="text-[10px] font-ui text-[#735c00] bg-[#ffe088]/40 px-2 py-0.5 rounded-full shrink-0 font-medium">
                        2ª Vida
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Palette Pill */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-ui uppercase font-bold text-[#a8295e] tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-ui text-[#735c00] bg-[#ffe088]/40 px-2 py-0.5 rounded-full">
                          Paleta {item.paletteName}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onSelectArrangement(item)}
                        className="font-editorial text-xl sm:text-2xl text-[#1e1b19] font-medium leading-snug cursor-pointer hover:text-[#a8295e] transition-colors"
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="font-editorial text-xs sm:text-sm text-[#564147] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Included Flowers from Colombian Market */}
                      <div className="mt-4 pt-3 border-t border-[#ddbfc6]/30">
                        <span className="text-[11px] font-ui font-semibold text-[#8a7177] block mb-1.5 flex items-center gap-1 uppercase tracking-wide">
                          <Flower2 className="w-3.5 h-3.5 text-[#a8295e]" />
                          Flores del Mercado Colombiano:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.flowerDetails.map((fl, idx) => (
                            <span
                              key={idx}
                              title={`${fl.name} (${fl.origin}) × ${fl.count} tallos`}
                              className="text-[11px] font-ui bg-[#fff8f6] border border-[#ddbfc6]/50 text-[#564147] px-2.5 py-1 rounded-full flex items-center gap-1"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#a8295e]" />
                              <span>{fl.name}</span>
                              <span className="text-[10px] text-[#735c00] font-semibold">({fl.origin.split(',')[0]})</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Structure and Base Spec */}
                      <div className="mt-3 p-2.5 bg-[#fbf2ef] rounded-xl border border-[#ddbfc6]/30 text-[11px] font-editorial text-[#564147] space-y-0.5">
                        <span className="font-semibold text-[#1e1b19] block">
                          Mecánica: {item.structureName}
                        </span>
                        <span className="text-[#2d5a3f] font-ui text-[10px] font-semibold block">
                          Base: {item.baseName} · {item.recyclableBadge}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer with Price and CTAs */}
                    <div className="mt-6 pt-4 border-t border-[#ddbfc6]/40 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-ui text-[#8a7177] block uppercase">Precio de catálogo</span>
                        <span className="font-editorial text-xl sm:text-2xl font-bold text-[#a8295e]">
                          {formatCOP(item.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectArrangement(item)}
                          className="px-3 py-2 text-xs font-ui font-semibold text-[#564147] hover:text-[#a8295e] hover:bg-[#ffd9e2]/30 rounded-full border border-[#ddbfc6]/60 transition-colors"
                          title="Ver ficha completa y trazabilidad"
                        >
                          Ver ficha
                        </button>

                        <button
                          onClick={() => {
                            if (onCustomizeArrangement) {
                              onCustomizeArrangement(item);
                            } else {
                              onNavigatePage('sostenibilidad');
                            }
                          }}
                          className="px-4 py-2 bg-[#a8295e] text-white text-xs font-ui font-semibold rounded-full hover:bg-[#912150] transition-colors shadow-sm flex items-center gap-1.5 group/btn"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Personalizar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#ddbfc6]/60 my-6">
              <Flower2 className="w-10 h-10 text-[#a8295e] mx-auto mb-3 opacity-60" />
              <h3 className="font-editorial text-xl text-[#1e1b19] font-semibold">
                No encontramos arreglos con los filtros seleccionados
              </h3>
              <p className="font-editorial text-sm text-[#564147] mt-1 max-w-md mx-auto">
                Todos nuestros diseños son personalizables. Restablece los filtros o abre el creador para diseñar cualquier combinación que imagines.
              </p>
              <button
                onClick={() => {
                  setGalleryStructureFilter('todos');
                  setGalleryBaseFilter('todos');
                  setGalleryPaletteFilter('todas');
                }}
                className="mt-4 px-5 py-2 bg-[#a8295e] text-white rounded-full text-xs font-ui font-semibold hover:bg-[#912150] transition-colors"
              >
                Ver todos los arreglos del catálogo
              </button>
            </div>
          )}

          {/* Bottom Invitation Banner */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#ffd9e2]/50 via-[#fbf2ef] to-[#fff8f6] border border-[#ddbfc6]/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-ui text-xs font-bold text-[#735c00] uppercase tracking-wider block mb-1">
                DISPOSICIÓN TOTAL A TU PREFERENCIA
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#1e1b19] font-medium">
                ¿Deseas una combinación única no mostrada en la galería?
              </h3>
              <p className="font-editorial text-sm text-[#564147] mt-2 leading-relaxed">
                Elige entre las 13 flores vivas disponibles en el mercado colombiano, ajusta los tallos uno a uno, selecciona tu soporte de doble uso favorito y define la altura exacta para tu espacio.
              </p>
            </div>
            <button
              onClick={() => onNavigatePage('sostenibilidad')}
              className="px-7 py-3.5 bg-[#a8295e] text-white rounded-full font-ui text-xs sm:text-sm font-semibold hover:bg-[#912150] transition-all shadow-md shrink-0 flex items-center gap-2 group"
            >
              <Sliders className="w-4 h-4" />
              <span>Abrir Creador 100% Personalizado</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="nosotros"
        className="py-24 px-4 sm:px-8 lg:px-16 bg-[#fbf2ef] relative overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbLEBhZxLBT25ZP0b9_npjBWQ-w7OvRqGtI8o1gt8iM-MyKH2OasidTi9LPNjtNo8fWFnekMOzVgn3SZbDYaHmA2XtD3rR-PZ1jlAojNmju9KsrxDDoPFytjbt66bhhGc2x-OwGmDc0ZL88owP7yj_IhDQrw3oDnknOf8wTodG-L6aurATxfoF33NjZ6xS2tYxnQqkeFGTzsVvkQfnVLHrjbto7eBTv-k0Bi077TMzMQPB3-W_hEQaP01zbg0W_yuS8t6G4mBQnUiagw"
                alt="Aurelia Bloom Workshop"
                className="w-full h-[460px] sm:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 organic-shape bg-[#735c00]/10 -z-10 blur-xl" />
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="max-w-xl">
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-6">
                Nuestra Filosofía
              </h2>
              <p className="font-editorial text-base sm:text-lg text-[#564147] mb-8 leading-relaxed italic border-l-2 border-[#735c00] pl-4">
                &ldquo;En Aurelia Bloom creemos que cada flor cuenta una historia. Que son un lenguaje de emociones. Nacimos con la idea de transformar momentos cotidianos en recuerdos inolvidables, llevando la belleza de la naturaleza a cada rincón.&rdquo;
              </p>
              <p className="font-editorial text-sm sm:text-base text-[#1e1b19] mb-10 leading-relaxed">
                Nacido de una pasión por la botánica y el diseño editorial, nuestro estudio floral busca elevar el acto de regalar a una experiencia sensorial única. Seleccionamos manualmente cada flor de cultivadores locales sostenibles para asegurar frescura y durabilidad en cada arreglo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div className="p-4 rounded-xl bg-[#fff8f6] border border-[#ddbfc6]/30">
                  <h4 className="font-ui text-sm font-semibold text-[#735c00] mb-2 uppercase tracking-wide">
                    Nuestra Visión
                  </h4>
                  <p className="font-editorial text-xs sm:text-sm text-[#564147] leading-relaxed">
                    Convertirnos en la floristería referente en la región, reconocida por la creatividad, calidad y el cariño que ponemos en cada diseño.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#fff8f6] border border-[#ddbfc6]/30">
                  <h4 className="font-ui text-sm font-semibold text-[#735c00] mb-2 uppercase tracking-wide">
                    Nuestra Misión
                  </h4>
                  <p className="font-editorial text-xs sm:text-sm text-[#564147] leading-relaxed">
                    Crear arreglos florales únicos que transmitan emociones, celebren la vida y acompañen a nuestros clientes en sus momentos más importantes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NUESTRA DIFERENCIA: ADIÓS A LA FLORISTERÍA TÓXICA (4 Pilares) */}
        <div className="max-w-[1280px] mx-auto mt-20 pt-16 border-t border-[#ddbfc6]/40">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-ui text-xs font-semibold text-[#a8295e] uppercase tracking-[0.2em] mb-2 block">
              TRANSPARENCIA &amp; CONSCIENCIA
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-4">
              Nuestra Diferencia: Adiós a la floristería tóxica
            </h3>
            <p className="font-editorial text-sm sm:text-base text-[#564147] leading-relaxed">
              La industria tradicional oculta microplásticos no degradables bajo apariencias verdes. En Aurelia Bloom elegimos la nobleza de los materiales honestos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pilar 1 */}
            <div className="bg-white p-7 rounded-2xl border border-[#ddbfc6]/40 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#a8295e]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center mb-6">
                  <Ban className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-xl font-semibold text-[#1e1b19] mb-3">
                  Cero Espuma Tóxica
                </h4>
                <p className="font-editorial text-sm text-[#564147] leading-relaxed mb-4">
                  Reemplazamos el oasis de microplásticos por kenzan (ranas de plomo/bronce japonés reutilizables de por vida) y malla de alambre galvanizado y celulosa biodegradable.
                </p>
              </div>
              <span className="inline-block self-start px-3 py-1 bg-[#f5ece9] text-[#a8295e] font-ui text-xs font-semibold rounded-full border border-[#ddbfc6]/30">
                Fijación Mecánica Natural
              </span>
            </div>

            {/* Pilar 2 */}
            <div className="bg-white p-7 rounded-2xl border border-[#ddbfc6]/40 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#735c00]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffe088] text-[#735c00] flex items-center justify-center mb-6">
                  <Sprout className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-xl font-semibold text-[#1e1b19] mb-3">
                  Papel Semilla Plantable
                </h4>
                <p className="font-editorial text-sm text-[#564147] leading-relaxed mb-4">
                  Nuestras tarjetas y fajines de algodón contienen semillas de flores silvestres. Tras deleitarte con el ramo, entiérralos en tierra fértil y verás germinar manzanilla y amapolas.
                </p>
              </div>
              <span className="inline-block self-start px-3 py-1 bg-[#f5ece9] text-[#735c00] font-ui text-xs font-semibold rounded-full border border-[#ddbfc6]/30">
                100% Germinable
              </span>
            </div>

            {/* Pilar 3 */}
            <div className="bg-white p-7 rounded-2xl border border-[#ddbfc6]/40 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#a8295e]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center mb-6">
                  <Droplets className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-xl font-semibold text-[#1e1b19] mb-3">
                  Seda &amp; Lino Botánico
                </h4>
                <p className="font-editorial text-sm text-[#564147] leading-relaxed mb-4">
                  Todas nuestras cintas provienen de lino rústico y seda salvaje teñidas a mano con residuos orgánicos: cuescos de aguacate para el rosa empolvado, piel de cebolla para el ámbar.
                </p>
              </div>
              <span className="inline-block self-start px-3 py-1 bg-[#f5ece9] text-[#a8295e] font-ui text-xs font-semibold rounded-full border border-[#ddbfc6]/30">
                Sin Colorantes Químicos
              </span>
            </div>

            {/* Pilar 4 */}
            <div className="bg-white p-7 rounded-2xl border border-[#ddbfc6]/40 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#735c00]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffe088] text-[#735c00] flex items-center justify-center mb-6">
                  <Gift className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-xl font-semibold text-[#1e1b19] mb-3">
                  Cajas y Saquitos Joya
                </h4>
                <p className="font-editorial text-sm text-[#564147] leading-relaxed mb-4">
                  Nuestros cofres de envío kraft rígido y saquitos de lino con el monograma AB están concebidos como piezas decorativas para organizar tu hogar o perfumar cajones.
                </p>
              </div>
              <span className="inline-block self-start px-3 py-1 bg-[#f5ece9] text-[#735c00] font-ui text-xs font-semibold rounded-full border border-[#ddbfc6]/30">
                Segunda Vida Garantizada
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        className="py-24 px-4 sm:px-8 lg:px-16 bg-[#f5ece9] border-t border-[#ddbfc6]/30"
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-6">
              Ponte en contacto
            </h2>
            <p className="font-editorial text-base text-[#564147] mb-12 leading-relaxed">
              ¿Tienes una idea especial o necesitas asesoramiento para un evento? Escríbenos y hagamos realidad tus emociones con un diseño botánico a tu medida.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-ui text-sm font-semibold text-[#1e1b19]">Llámanos</p>
                  <p className="font-editorial text-sm text-[#564147]">+57 300 548 4382</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-ui text-sm font-semibold text-[#1e1b19]">Email</p>
                  <p className="font-editorial text-sm text-[#564147]">helloaureliabloom@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-ui text-sm font-semibold text-[#1e1b19]">Visítanos</p>
                  <p className="font-editorial text-sm text-[#564147]">
                    Cra. 7 #67-42, Chapinero / Zona G, Bogotá, Colombia
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-10">
              <a
                href="https://www.instagram.com/aurelia_bloom6767"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram @aurelia_bloom6767"
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center border border-[#ddbfc6] text-[#564147] hover:bg-[#a8295e] hover:text-white transition-all shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@aurelia.bloom22"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title="TikTok @aurelia.bloom22"
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center border border-[#ddbfc6] text-[#564147] hover:bg-[#a8295e] hover:text-white transition-all shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.043.87.126V9.4a6.33 6.33 0 0 0-.87-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.49V8.58a8.28 8.28 0 0 0 4.81 1.54v-3.43a4.85 4.85 0 0 1-1-.002z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61594342916512"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook Aurelia Bloom"
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center border border-[#ddbfc6] text-[#564147] hover:bg-[#a8295e] hover:text-white transition-all shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            {contactSubmitted ? (
              <div className="p-10 bg-white rounded-2xl shadow-sm border border-[#ddbfc6]/40 text-center space-y-4">
                <div className="w-16 h-16 bg-[#ffd9e2] text-[#a8295e] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-2xl text-[#1e1b19] font-semibold">
                  ¡Mensaje Recibido!
                </h3>
                <p className="font-editorial text-sm text-[#564147] max-w-md mx-auto">
                  Gracias por escribirnos, <strong>{contactData.nombre}</strong>. Una de nuestras floristas te responderá a <strong>{contactData.email}</strong> en menos de 24 horas.
                </p>
                <button
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactData({ nombre: '', email: '', asunto: 'Consulta General', mensaje: '' });
                  }}
                  className="px-6 py-2.5 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleContactSubmit}
                className="p-8 sm:p-10 bg-white rounded-2xl shadow-sm border border-[#ddbfc6]/40"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactData.nombre}
                      onChange={(e) =>
                        setContactData({ ...contactData, nombre: e.target.value })
                      }
                      placeholder="Tu nombre"
                      className="w-full bg-[#fff8f6] border-none border-b border-[#ddbfc6] focus:border-[#735c00] focus:ring-0 transition-all py-3 px-3 text-sm font-editorial"
                    />
                  </div>
                  <div>
                    <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactData.email}
                      onChange={(e) =>
                        setContactData({ ...contactData, email: e.target.value })
                      }
                      placeholder="hola@ejemplo.com"
                      className="w-full bg-[#fff8f6] border-none border-b border-[#ddbfc6] focus:border-[#735c00] focus:ring-0 transition-all py-3 px-3 text-sm font-editorial"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-2">
                    Asunto
                  </label>
                  <select
                    value={contactData.asunto}
                    onChange={(e) =>
                      setContactData({ ...contactData, asunto: e.target.value })
                    }
                    className="w-full bg-[#fff8f6] border-none border-b border-[#ddbfc6] focus:border-[#735c00] focus:ring-0 transition-all py-3 px-3 text-sm font-ui"
                  >
                    <option>Consulta General</option>
                    <option>Evento o Boda</option>
                    <option>Taller de Flores</option>
                    <option>Pedido Especial</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    value={contactData.mensaje}
                    onChange={(e) =>
                      setContactData({ ...contactData, mensaje: e.target.value })
                    }
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    className="w-full bg-[#fff8f6] border-none border-b border-[#ddbfc6] focus:border-[#735c00] focus:ring-0 transition-all py-3 px-3 resize-none text-sm font-editorial"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:translate-y-[-2px] hover:bg-[#912150] transition-all shadow-md shadow-[#a8295e]/15 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSending ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
                {sendError && (
                  <p className="text-sm text-red-600 mt-3 text-center">
                    No pudimos enviar tu mensaje. Escríbenos directo a helloaureliabloom@gmail.com
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
