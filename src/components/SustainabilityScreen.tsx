import React, { useState } from 'react';
import { MATERIALS_DATA } from '../data/mockData';
import { MaterialItem } from '../types';
import { formatCOP } from '../utils/currency';
import {
  Leaf,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Sprout,
  Ban,
  Droplets,
  Gift,
  CheckCircle2,
  HelpCircle,
  Mail,
  Layers,
  Recycle,
  Heart,
  Palette,
  BookOpen,
  Download,
  Send,
} from 'lucide-react';

interface SustainabilityScreenProps {
  onOpenManifesto: () => void;
  onOpenOrderConfirmation: (orderData: {
    palette: string;
    support: string;
    message: string;
    price: number;
  }) => void;
}

export const SustainabilityScreen: React.FC<SustainabilityScreenProps> = ({
  onOpenManifesto,
  onOpenOrderConfirmation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedPalette, setSelectedPalette] = useState<'silvestre' | 'secado' | 'monocromo'>('silvestre');
  const [selectedSupport, setSelectedSupport] = useState<'papel' | 'kenzan' | 'jarron'>('papel');
  const [message, setMessage] = useState('');
  const [guideEmail, setGuideEmail] = useState('');
  const [guideRequested, setGuideRequested] = useState(false);

  // Filter materials
  const filteredMaterials =
    selectedCategory === 'todos'
      ? MATERIALS_DATA
      : MATERIALS_DATA.filter((mat) => {
          if (selectedCategory === 'envoltorios') return mat.category === 'envoltorios';
          if (selectedCategory === 'soportes') return mat.category === 'soportes';
          if (selectedCategory === 'flores') return mat.category === 'flores';
          if (selectedCategory === 'detalles') return mat.category === 'detalles';
          return true;
        });

  // Calculate customized price in COP
  const basePrice = 145000;
  const supportExtra =
    selectedSupport === 'kenzan' ? 55000 : selectedSupport === 'jarron' ? 42000 : 0;
  const totalPrice = basePrice + supportExtra;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paletteNames = {
      silvestre: 'Silvestre Pastel (Peonía & Hibisco)',
      secado: 'Eterno Secado (Lavanda & Eucalipto)',
      monocromo: 'Monocromo Ámbar & Crema Natural',
    };
    const supportNames = {
      papel: 'Papel de Semillas Plantable + Cintas',
      kenzan: 'Kenzan Tradicional + Vasija en Cerámica (+ $ 55.000 COP)',
      jarron: 'Jarrón de Vidrio Soplado Reciclado (+ $ 42.000 COP)',
    };

    onOpenOrderConfirmation({
      palette: paletteNames[selectedPalette],
      support: supportNames[selectedSupport],
      message,
      price: totalPrice,
    });
  };

  const handleGuideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideEmail) return;
    setGuideRequested(true);
  };

  return (
    <div className="w-full bg-[#fff8f6] text-[#1e1b19]">
      {/* 1. HERO SECTION (matching Image 3) */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Stats */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffd9e2]/60 border border-[#ddbfc6] text-[#a8295e] font-ui text-xs font-semibold tracking-wider uppercase mb-6 shadow-xs">
              <Leaf className="w-3.5 h-3.5 text-[#a8295e]" />
              <span>BELLEZA CONSCIENTE &amp; ARTESANÍA ÉTICA</span>
            </div>

            {/* Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1e1b19] font-normal leading-[1.12] mb-6 tracking-tight">
              Arreglos con alma, <br />
              <span className="italic text-[#a8295e] font-normal">libres de plástico</span> y en <br />
              armonía con la tierra.
            </h1>

            {/* Subtext */}
            <p className="font-editorial text-base sm:text-lg text-[#564147] mb-8 leading-relaxed max-w-xl">
              En Aurelia Bloom redefinimos la floristería de alta gama despidiéndonos de los microplásticos. Erradicamos la espuma floral tóxica, reemplazándola por técnicas ancestrales japonesas de fijación, papeles de fibra de algodón natural y empaques 100% reutilizables que nutren la tierra tras su viaje.
            </p>

            {/* 3 Stat Counters */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 border-y border-[#ddbfc6]/40 mb-8">
              <div>
                <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#a8295e] block">
                  100%
                </span>
                <span className="font-ui text-xs sm:text-sm text-[#564147] mt-1 block leading-tight">
                  Libres de Plástico &amp; Oasis Sintético
                </span>
              </div>
              <div>
                <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#735c00] block">
                  Zero
                </span>
                <span className="font-ui text-xs sm:text-sm text-[#564147] mt-1 block leading-tight">
                  Residuos Químicos Contaminantes
                </span>
              </div>
              <div>
                <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#a8295e] block">
                  100%
                </span>
                <span className="font-ui text-xs sm:text-sm text-[#564147] mt-1 block leading-tight">
                  Fibras Compostables &amp; Papel Semilla
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="sostenibilidad-personalizar-hero-btn"
                onClick={() => {
                  const el = document.getElementById('creador-arreglo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-all duration-300 shadow-md shadow-[#a8295e]/20 flex items-center gap-2 group"
              >
                <span>Personalizar Arreglo Eco</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="sostenibilidad-manifiesto-btn"
                onClick={onOpenManifesto}
                className="px-8 py-4 bg-white border border-[#735c00] text-[#735c00] rounded-full font-ui text-sm font-semibold hover:bg-[#735c00]/5 transition-colors duration-300"
              >
                Leer Nuestro Manifiesto
              </button>
            </div>
          </div>

          {/* Right Column: Hero Card with Luxury Eco Flatlay (as seen in Image 3) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#ddbfc6]/40 bg-white">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUmTSP1DRT1VqsP0BQmzkR0BjW1Zr4i19_0bpE0uIQWYO9U_pV7EW0VbLDzFQtEW1rjn6E97MhRgI08YtB9M4OAUQKWlJHeuKu9M5X0rz7KcF90lDEei2-d2MU-A3Z0P2vKOj03I-0WZC_x83QxjQpJUR29ag-h21dOTdnA4QpKvcDmZ144k3xM7-A1PC8y3pbH7sv0IlTNBWHY3m-t4TffEF98PzIcBtquhD78kEVJP8l4NcTrfnPNokotVifuINUDTKu1H2v76E"
                alt="Cofre Aurelia Bloom y materiales sostenibles"
                className="w-full h-[450px] sm:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Bottom Card Tag Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#fff8f6]/95 backdrop-blur-md border border-[#ddbfc6]/60 shadow-lg flex items-center justify-between">
                <div>
                  <h4 className="font-editorial text-base font-semibold text-[#1e1b19]">
                    Cofre Aurelia Bloom
                  </h4>
                  <p className="font-editorial text-xs text-[#564147]">
                    Cartón Kraft FSC, Seda Botánica y Papel Semilla
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#ffe088] text-[#735c00] flex items-center justify-center font-editorial font-bold text-xs shrink-0 shadow-xs border border-[#e9c349]">
                  AB
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NUESTRA DIFERENCIA: ADIÓS A LA FLORISTERÍA TÓXICA (4 Pillars) */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 bg-[#fbf2ef] border-t border-[#ddbfc6]/30">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-ui text-xs font-semibold text-[#a8295e] uppercase tracking-[0.2em] mb-2 block">
              TRANSPARENCIA &amp; CONSCIENCIA
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-4">
              Nuestra Diferencia: Adiós a la floristería tóxica
            </h2>
            <p className="font-editorial text-sm sm:text-base text-[#564147] leading-relaxed">
              La industria tradicional oculta microplásticos no degradables bajo apariencias verdes. En Aurelia Bloom elegimos la nobleza de los materiales honestos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="bg-white p-7 rounded-2xl border border-[#ddbfc6]/40 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#a8295e]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center mb-6">
                  <Ban className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-semibold text-[#1e1b19] mb-3">
                  Cero Espuma Tóxica
                </h3>
                <p className="font-editorial text-sm text-[#564147] leading-relaxed mb-4">
                  Reemplazamos el oasis de microplásticos por kenzan (ranas de plomo/bronce japonés reutilizables de por vida) y malla de celulosa biodegradable.
                </p>
              </div>
              <span className="inline-block self-start px-3 py-1 bg-[#f5ece9] text-[#a8295e] font-ui text-xs font-semibold rounded-full border border-[#ddbfc6]/30">
                Fijación Mecánica Natural
              </span>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-7 rounded-2xl border border-[#ddbfc6]/40 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#735c00]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffe088] text-[#735c00] flex items-center justify-center mb-6">
                  <Sprout className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-semibold text-[#1e1b19] mb-3">
                  Papel Semilla Plantable
                </h3>
                <p className="font-editorial text-sm text-[#564147] leading-relaxed mb-4">
                  Nuestras tarjetas y fajines de algodón contienen semillas de flores silvestres. Tras deleitarte con el ramo, entiérralos en tierra fértil y verás germinar manzanilla y amapolas.
                </p>
              </div>
              <span className="inline-block self-start px-3 py-1 bg-[#f5ece9] text-[#735c00] font-ui text-xs font-semibold rounded-full border border-[#ddbfc6]/30">
                100% Germinable
              </span>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-7 rounded-2xl border border-[#ddbfc6]/40 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#a8295e]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center mb-6">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-semibold text-[#1e1b19] mb-3">
                  Seda &amp; Lino Botánico
                </h3>
                <p className="font-editorial text-sm text-[#564147] leading-relaxed mb-4">
                  Todas nuestras cintas provienen de lino rústico y seda salvaje teñidas a mano con residuos orgánicos: cuescos de aguacate para el rosa empolvado, piel de cebolla para el ámbar.
                </p>
              </div>
              <span className="inline-block self-start px-3 py-1 bg-[#f5ece9] text-[#a8295e] font-ui text-xs font-semibold rounded-full border border-[#ddbfc6]/30">
                Sin Colorantes Químicos
              </span>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-7 rounded-2xl border border-[#ddbfc6]/40 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#735c00]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffe088] text-[#735c00] flex items-center justify-center mb-6">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-semibold text-[#1e1b19] mb-3">
                  Cajas y Saquitos Joya
                </h3>
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

      {/* 3. INVENTARIO DE MATERIALES DISPONIBLES (Trazabilidad Total) */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-ui text-xs font-semibold text-[#735c00] uppercase tracking-[0.2em] mb-2 block">
            TRAZABILIDAD TOTAL
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-4">
            Inventario de Materiales Disponibles
          </h2>
          <p className="font-editorial text-sm sm:text-base text-[#564147] leading-relaxed">
            Explora cada componente con el que nuestros maestros floristas dan vida a tus pedidos especiales. Pureza, origen ético y respeto botánico.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'envoltorios', label: 'Envoltorios' },
            { id: 'soportes', label: 'Soportes & Cerámica' },
            { id: 'flores', label: 'Flores de Estación' },
            { id: 'detalles', label: 'Detalles Botánicos' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-ui text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-[#a8295e] text-white shadow-sm'
                  : 'bg-[#f5ece9] text-[#564147] hover:bg-[#ffd9e2]/50 hover:text-[#a8295e]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 6 Material Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className="bg-white rounded-2xl border border-[#ddbfc6]/40 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* Image + Top Badge */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#fff8f6]/95 backdrop-blur-md text-[#a8295e] font-ui text-xs font-semibold rounded-full shadow-sm border border-[#ddbfc6]/40 flex items-center gap-1.5">
                      <Sprout className="w-3 h-3 text-[#a8295e]" />
                      {mat.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Specs row */}
                  <div className="grid grid-cols-2 gap-2 pb-3 mb-3 border-b border-[#ddbfc6]/30 text-xs font-ui">
                    <div>
                      <span className="text-[#8a7177] block">{mat.spec1Label}:</span>
                      <span className="font-semibold text-[#1e1b19]">{mat.spec1Value}</span>
                    </div>
                    <div>
                      <span className="text-[#8a7177] block">{mat.spec2Label}:</span>
                      <span className="font-semibold text-[#1e1b19]">{mat.spec2Value}</span>
                    </div>
                  </div>

                  <h3 className="font-editorial text-xl font-semibold text-[#1e1b19] mb-2 leading-snug">
                    {mat.name}
                  </h3>
                  <p className="font-editorial text-xs sm:text-sm text-[#564147] leading-relaxed mb-4">
                    {mat.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Reutilización + Stock Status */}
              <div className="px-6 py-3.5 bg-[#f5ece9]/70 border-t border-[#ddbfc6]/30 flex items-center justify-between text-xs font-ui">
                <div className="flex items-center gap-1.5 text-[#735c00]">
                  <Recycle className="w-3.5 h-3.5" />
                  <span className="font-medium truncate max-w-[140px] sm:max-w-[170px]">{mat.reuseNote}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#fff8f6] border border-[#ddbfc6]/40 text-[#564147] font-semibold text-[11px]">
                  {mat.availability}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CREADOR DE ARREGLO CONSCIENTE (Interactive Customizer) */}
      <section
        id="creador-arreglo"
        className="py-24 px-4 sm:px-8 lg:px-16 bg-[#fbf2ef] border-t border-[#ddbfc6]/30"
      >
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-ui text-xs font-semibold text-[#a8295e] uppercase tracking-[0.2em] mb-2 block">
              EXPERIENCIA ARTESANAL
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-3">
              Creador de Arreglo Consciente
            </h2>
            <p className="font-editorial text-sm sm:text-base text-[#564147]">
              Configura tu ramo eligiendo cada elemento natural. Te garantizamos cero plásticos y máxima duración botánica.
            </p>
          </div>

          <form
            onSubmit={handleOrderSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ddbfc6]/50 shadow-xl space-y-8"
          >
            {/* Step 1: Paleta Botánica */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#ffd9e2] text-[#a8295e] font-ui text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-editorial text-lg font-semibold text-[#1e1b19]">
                  Paleta Botánica
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'silvestre',
                    title: 'Silvestre Pastel',
                    desc: 'Peonías, hibiscos, ranúnculos y alchemilla.',
                    tag: 'Fresco y Romántico',
                    colorDot: 'bg-[#ffb1c7]',
                  },
                  {
                    id: 'secado',
                    title: 'Eterno Secado',
                    desc: 'Lavanda salvaje, eucalipto preserved y trigo.',
                    tag: 'Duración > 1 Año',
                    colorDot: 'bg-[#ffe088]',
                  },
                  {
                    id: 'monocromo',
                    title: 'Monocromo Ámbar',
                    desc: 'Rosas té, proteas y frutos de eucalipto.',
                    tag: 'Atemporal y Cálido',
                    colorDot: 'bg-[#d8a47f]',
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    onClick={() => setSelectedPalette(item.id as any)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedPalette === item.id
                        ? 'border-[#a8295e] bg-[#ffd9e2]/15 shadow-sm'
                        : 'border-[#ddbfc6]/40 bg-[#fff8f6] hover:border-[#a8295e]/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-editorial font-semibold text-base text-[#1e1b19]">
                          {item.title}
                        </span>
                        <div className={`w-3.5 h-3.5 rounded-full ${item.colorDot}`} />
                      </div>
                      <p className="font-editorial text-xs text-[#564147] mb-3">
                        {item.desc}
                      </p>
                    </div>
                    <span className="font-ui text-[11px] font-semibold text-[#a8295e] bg-white px-2.5 py-1 rounded-full border border-[#ddbfc6]/30 self-start">
                      {item.tag}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2: Soporte o Envoltorio */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#ffd9e2] text-[#a8295e] font-ui text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-editorial text-lg font-semibold text-[#1e1b19]">
                  Soporte o Envoltorio
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'papel',
                    title: 'Papel de Semillas + Cintas',
                    extra: 'Incluido en base',
                    desc: 'Papel de algodón plantable y lazo de seda botánica.',
                  },
                  {
                    id: 'kenzan',
                    title: 'Kenzan Tradicional + Vasija',
                    extra: '+ $ 55.000 COP',
                    desc: 'Base de latón macizo y cuenco de gres artesanal de Ráquira.',
                  },
                  {
                    id: 'jarron',
                    title: 'Jarrón Vidrio Reciclado',
                    extra: '+ $ 42.000 COP',
                    desc: 'Soplado a boca a partir de botellas recuperadas.',
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    onClick={() => setSelectedSupport(item.id as any)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedSupport === item.id
                        ? 'border-[#a8295e] bg-[#ffd9e2]/15 shadow-sm'
                        : 'border-[#ddbfc6]/40 bg-[#fff8f6] hover:border-[#a8295e]/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-editorial font-semibold text-sm sm:text-base text-[#1e1b19]">
                          {item.title}
                        </span>
                      </div>
                      <p className="font-editorial text-xs text-[#564147] mb-3">
                        {item.desc}
                      </p>
                    </div>
                    <span className="font-ui text-xs font-bold text-[#735c00] bg-white px-2.5 py-1 rounded-full border border-[#ddbfc6]/30 self-start">
                      {item.extra}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Mensaje Caligrafiado */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#ffd9e2] text-[#a8295e] font-ui text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-editorial text-lg font-semibold text-[#1e1b19]">
                  Mensaje Caligrafiado en Tarjeta de Semillas
                </h3>
              </div>
              <p className="font-editorial text-xs text-[#564147] mb-3">
                Caligrafiado a mano por nuestras floristas con tinta botánica al agua. Esta tarjeta puede plantarse en maceta al terminar el ramo.
              </p>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu dedicatoria especial o mensaje para la tarjeta plantable..."
                className="w-full bg-[#fff8f6] border border-[#ddbfc6] rounded-xl p-3.5 text-sm font-editorial focus:outline-none focus:border-[#a8295e] resize-none"
              />
            </div>

            {/* Summary Bar */}
            <div className="pt-6 border-t border-[#ddbfc6]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center shrink-0">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-ui text-xs font-bold text-[#1e1b19]">
                    Garantía Circular Aurelia Bloom
                  </h4>
                  <p className="font-editorial text-xs text-[#564147]">
                    Incluye instrucciones para plantar la tarjeta y conservar las flores
                  </p>
                </div>
              </div>

              <button
                type="submit"
                id="btn-encargar-personalizado"
                className="w-full sm:w-auto px-8 py-4 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-all shadow-md shadow-[#a8295e]/20"
              >
                Encargar Arreglo Personalizado ({formatCOP(totalPrice)})
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 5. CUIDADO CIRCULAR (¿Cómo devolver la vida a cada componente tras recibir tu ramo?) */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Visual Workshop Wooden Plaque */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#ddbfc6]/40">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbLEBhZxLBT25ZP0b9_npjBWQ-w7OvRqGtI8o1gt8iM-MyKH2OasidTi9LPNjtNo8fWFnekMOzVgn3SZbDYaHmA2XtD3rR-PZ1jlAojNmju9KsrxDDoPFytjbt66bhhGc2x-OwGmDc0ZL88owP7yj_IhDQrw3oDnknOf8wTodG-L6aurATxfoF33NjZ6xS2tYxnQqkeFGTzsVvkQfnVLHrjbto7eBTv-k0Bi077TMzMQPB3-W_hEQaP01zbg0W_yuS8t6G4mBQnUiagw"
                alt="Florista cuidando materiales sostenibles"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="font-ui text-xs font-semibold uppercase tracking-wider text-[#ffe088] block mb-1">
                    Aurelia Bloom • Taller Botánico
                  </span>
                  <h4 className="font-editorial text-xl font-semibold">
                    El arte de regalar emociones vivas
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 3 Steps (01, 02, 03) */}
          <div className="lg:col-span-7">
            <span className="font-ui text-xs font-semibold text-[#735c00] uppercase tracking-[0.2em] mb-2 block">
              CUIDADO CIRCULAR
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-8 leading-tight">
              ¿Cómo devolver la vida a cada componente tras recibir tu ramo?
            </h2>

            <div className="space-y-6">
              {/* Step 01 */}
              <div className="flex gap-4 p-5 rounded-2xl bg-[#fbf2ef] border border-[#ddbfc6]/40">
                <span className="font-editorial text-2xl font-bold text-[#a8295e] shrink-0">
                  01
                </span>
                <div>
                  <h4 className="font-editorial text-base sm:text-lg font-semibold text-[#1e1b19] mb-1">
                    Siembra tu etiqueta de papel semilla
                  </h4>
                  <p className="font-editorial text-xs sm:text-sm text-[#564147] leading-relaxed">
                    Corta la tarjeta en pequeños fragmentos, colócala en una maceta con tierra húmeda y cúbrela levemente. En 10 a 14 días verás brotar flores silvestres (amapolas, margaritas y caléndulas).
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="flex gap-4 p-5 rounded-2xl bg-[#fbf2ef] border border-[#ddbfc6]/40">
                <span className="font-editorial text-2xl font-bold text-[#735c00] shrink-0">
                  02
                </span>
                <div>
                  <h4 className="font-editorial text-base sm:text-lg font-semibold text-[#1e1b19] mb-1">
                    Secado natural al aire de tus flores
                  </h4>
                  <p className="font-editorial text-xs sm:text-sm text-[#564147] leading-relaxed">
                    Cuando el agua comience a menguar, retira el ramo del jarrón, átalo con la cinta de seda botánica y cuélgalo boca abajo en un espacio fresco y sombreado durante 15 días.
                  </p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="flex gap-4 p-5 rounded-2xl bg-[#fbf2ef] border border-[#ddbfc6]/40">
                <span className="font-editorial text-2xl font-bold text-[#a8295e] shrink-0">
                  03
                </span>
                <div>
                  <h4 className="font-editorial text-base sm:text-lg font-semibold text-[#1e1b19] mb-1">
                    Reutiliza el cofre y saquitos AB
                  </h4>
                  <p className="font-editorial text-xs sm:text-sm text-[#564147] leading-relaxed">
                    El cofre rígido de cartón FSC es perfecto para guardar recuerdos, fotografías o joyería. El saquito de lino bordado perfumará tus cajones con lavanda y rosas secas durante más de un año.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GUÍA BOTÁNICA EXCLUSIVA (100% GRATUITA · SIN SUSCRIPCIONES) */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 bg-[#f5ece9] border-t border-[#ddbfc6]/40">
        <div className="max-w-[840px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffd9e2] text-[#a8295e] font-ui text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <BookOpen className="w-4 h-4 text-[#a8295e]" />
            <span>Guía Botánica Exclusiva · 100% Gratuita</span>
          </div>

          <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1e1b19] mb-4 leading-snug">
            Recibe gratis nuestra Guía de Cuidado Floral y Trazabilidad
          </h3>

          <p className="font-editorial text-sm sm:text-base text-[#564147] mb-8 max-w-2xl mx-auto leading-relaxed">
            En Aurelia Bloom <strong className="text-[#1e1b19]">no manejamos suscripciones ni cuotas recurrentes</strong>. Te obsequiamos nuestra guía completa en formato digital con técnicas de secado artesanal, germinación de papel semilla y mapas de cosecha local. Al recibirla por correo, dispondrás de un canal directo para consultar dudas con nuestras floristas y encargar arreglos a medida, <strong className="text-[#a8295e]">totalmente GRATIS</strong>.
          </p>

          {guideRequested ? (
            <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#ddbfc6] shadow-md max-w-lg mx-auto text-center animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-xl font-semibold text-[#1e1b19] mb-2">
                ¡Guía enviada con éxito!
              </h4>
              <p className="font-editorial text-sm text-[#564147] mb-4 leading-relaxed">
                Hemos enviado la guía botánica en PDF a <strong className="text-[#a8295e]">{guideEmail}</strong>. Revisa tu bandeja de entrada en los próximos minutos.
              </p>
              <div className="p-3 bg-[#fff8f6] rounded-xl border border-[#ddbfc6]/50 text-left flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#a8295e] shrink-0 mt-0.5" />
                <p className="font-ui text-xs text-[#564147] leading-relaxed">
                  <strong>Contacto directo:</strong> Puedes responder directamente a ese correo si deseas asesoramiento botánico personalizado o coordinar un encargo floral exclusivo.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto">
              <form
                onSubmit={handleGuideSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-5"
              >
                <input
                  type="email"
                  required
                  value={guideEmail}
                  onChange={(e) => setGuideEmail(e.target.value)}
                  placeholder="Introduce tu correo electrónico"
                  className="flex-1 bg-white border border-[#ddbfc6] rounded-full px-5 py-3.5 text-sm font-editorial text-[#1e1b19] placeholder:text-[#564147]/60 focus:outline-none focus:border-[#a8295e] shadow-xs"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap hover:scale-[0.99]"
                >
                  <Download className="w-4 h-4" />
                  <span>Obtener Guía Gratis</span>
                </button>
              </form>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#564147] font-ui">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#063311]" />
                  100% Gratis · Sin suscripción
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#063311]" />
                  Descarga inmediata en PDF
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#063311]" />
                  Contacto directo por email
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
