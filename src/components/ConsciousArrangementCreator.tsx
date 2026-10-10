import React, { useState, useMemo, useEffect } from 'react';
import {
  FLORAL_STRUCTURES,
  FLORAL_BASES,
  LOOKBOOK_METADATA,
  MARKET_FLOWERS_COLOMBIA,
  ARRANGEMENT_SIZES,
  SEED_TYPES,
  OCCASIONS_LIST,
  MarketFlower,
  ArrangementSize,
} from '../data/marketFlowers';
import { ConsciousArrangementOrder, GalleryItem, LookbookCategory } from '../types';
import { formatCOP } from '../utils/currency';
import {
  Sparkles,
  Leaf,
  Recycle,
  CheckCircle2,
  Plus,
  Minus,
  RotateCcw,
  Sliders,
  Calendar,
  Layers,
  Sprout,
  Compass,
  ArrowRight,
  Info,
  Flower2,
  Palette,
  X,
  Crown,
  Ruler,
  Paintbrush,
  Cloud,
  ChevronRight,
  Check,
  MapPin,
  Clock,
  Sparkle,
} from 'lucide-react';

interface ConsciousArrangementCreatorProps {
  onOpenOrderConfirmation: (orderData: ConsciousArrangementOrder) => void;
  initialPreset?: GalleryItem | null;
  onClearPreset?: () => void;
}

export const ConsciousArrangementCreator: React.FC<ConsciousArrangementCreatorProps> = ({
  onOpenOrderConfirmation,
  initialPreset,
  onClearPreset,
}) => {
  // --- Current Active Area Navigation (Reemplazando los pasos numéricos genéricos) ---
  // 1: 'estructura-base' -> Estructura & Base Floral
  // 2: 'lookbook' -> Selección Floral · Lookbook
  // 3: 'escala' -> Escala & Proporciones
  // 4: 'detalles' -> Detalles & Personalización
  type CreatorArea = 'estructura-base' | 'lookbook' | 'escala' | 'detalles';
  const [activeArea, setActiveArea] = useState<CreatorArea>('estructura-base');

  // --- Area 1: Estructura & Base Floral ---
  const [selectedStructureId, setSelectedStructureId] = useState<string>('struct-wire');
  const [selectedBaseId, setSelectedBaseId] = useState<string>('base-vidrio');
  const [expandedStructureInfo, setExpandedStructureInfo] = useState<string | null>(null);
  const [expandedBaseInfo, setExpandedBaseInfo] = useState<string | null>(null);

  // --- Area 2: The Aurelia Bloom Lookbook Selection ---
  const [lookbookFilter, setLookbookFilter] = useState<'todos' | LookbookCategory>('todos');
  const [paletteFilter, setPaletteFilter] = useState<'todas' | 'pastel' | 'calido' | 'botanico' | 'vibrante'>('todas');
  const [expandedFlowerInfo, setExpandedFlowerInfo] = useState<string | null>(null);

  // Flower stem counts map (flowerId -> quantity)
  const [flowerCounts, setFlowerCounts] = useState<Record<string, number>>({
    'fl-1': 4, // Rosas & Mini Rosas (The Sturdy Icons)
    'fl-2': 2, // Hortensias (The Cloud Makers)
    'fl-9': 4, // Astromelias (The Mid-Tier Clusters)
    'fl-11': 4, // Velo de Novia & Limonium (The Ethereal Mists)
    'fl-12': 3, // Eucalipto Cinerea & Olivo
  });

  // --- Area 3: Escala & Tamaño ---
  const [selectedSizeId, setSelectedSizeId] = useState<string>('atelier');
  const [heightPreference, setHeightPreference] = useState<string>('Medio (Consola / Escritorio)');

  // --- Area 4: Detalles & Personalización ---
  const [fragranceChoice, setFragranceChoice] = useState<
    'Neutro / Hipoalergénico' | 'Suave y Dulce' | 'Herbal Fresco' | 'Balsámico Relajante'
  >('Suave y Dulce');
  const [occasionChoice, setOccasionChoice] = useState<string>('Celebración & Cumpleaños');
  const [selectedSeedId, setSelectedSeedId] = useState<string>('manzanilla');
  const [message, setMessage] = useState<string>(
    'Que la belleza viva de estas flores ilumine tu hogar y florezca de nuevo en tu jardín con su papel semilla.'
  );
  const [clientNotes, setClientNotes] = useState<string>(
    'Por favor acentuar los tonos cálidos y dejar caída natural en los follajes.'
  );
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );

  // Sync initialPreset when loaded from gallery
  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.structureId) setSelectedStructureId(initialPreset.structureId);
      if (initialPreset.baseId) setSelectedBaseId(initialPreset.baseId);
      if (initialPreset.sizeId) setSelectedSizeId(initialPreset.sizeId);
      if (initialPreset.initialFlowerCounts) {
        setFlowerCounts(initialPreset.initialFlowerCounts);
      }
      setActiveArea('estructura-base');
    }
  }, [initialPreset]);

  // Selected Entities
  const currentStructure = useMemo(
    () => FLORAL_STRUCTURES.find((s) => s.id === selectedStructureId) || FLORAL_STRUCTURES[0],
    [selectedStructureId]
  );

  const currentBase = useMemo(
    () => FLORAL_BASES.find((b) => b.id === selectedBaseId) || FLORAL_BASES[0],
    [selectedBaseId]
  );

  const currentSize = useMemo(
    () => ARRANGEMENT_SIZES.find((s) => s.id === selectedSizeId) || ARRANGEMENT_SIZES[1],
    [selectedSizeId]
  );

  const currentSeed = useMemo(
    () => SEED_TYPES.find((s) => s.id === selectedSeedId) || SEED_TYPES[0],
    [selectedSeedId]
  );

  // Total stem calculation
  const totalStemsCount = useMemo(() => {
    return (Object.values(flowerCounts) as number[]).reduce((acc: number, count: number) => acc + count, 0);
  }, [flowerCounts]);

  // Selected flowers list for summary
  const selectedFlowersList = useMemo(() => {
    return (Object.entries(flowerCounts) as [string, number][])
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => {
        const flower = MARKET_FLOWERS_COLOMBIA.find((f) => f.id === id);
        return {
          flower,
          count,
        };
      })
      .filter((item): item is { flower: MarketFlower; count: number } => !!item.flower);
  }, [flowerCounts]);

  // Price Calculation in COP
  const priceBreakdown = useMemo(() => {
    const baseScalePrice = currentSize.basePriceCOP;
    const baseContainerPrice = currentBase.priceCOP;

    // Extra stem price if user exceeds target allowance
    const targetAllowance = currentSize.stemCountTarget;
    let stemSurcharge = 0;
    if (totalStemsCount > targetAllowance) {
      const extraStems = totalStemsCount - targetAllowance;
      stemSurcharge = extraStems * 3500;
    }

    const totalCOP = baseScalePrice + baseContainerPrice + stemSurcharge;

    return {
      baseScalePrice,
      baseContainerPrice,
      stemSurcharge,
      totalCOP,
    };
  }, [currentSize, currentBase, totalStemsCount]);

  // Handle flower stem adjustment
  const handleStemChange = (flowerId: string, delta: number) => {
    setFlowerCounts((prev) => {
      const current = prev[flowerId] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) {
        const copy = { ...prev };
        delete copy[flowerId];
        return copy;
      }
      return { ...prev, [flowerId]: updated };
    });
  };

  // Quick Inspirations
  const applyInspirationPreset = (presetKey: string) => {
    if (presetKey === 'malla-sabana') {
      setSelectedStructureId('struct-wire');
      setSelectedBaseId('base-vidrio');
      setSelectedSizeId('atelier');
      setFlowerCounts({
        'fl-1': 4, // Rosas & Mini Rosas
        'fl-2': 2, // Hortensias
        'fl-9': 4, // Astromelias
        'fl-11': 4, // Velo de novia & Limonium
        'fl-12': 3, // Eucalipto
      });
      setFragranceChoice('Suave y Dulce');
    } else if (presetKey === 'kenzan-zen') {
      setSelectedStructureId('struct-kenzan');
      setSelectedBaseId('base-ceramica');
      setSelectedSizeId('petite');
      setFlowerCounts({
        'fl-4': 3, // Anturios
        'fl-5': 2, // Lirios
        'fl-12': 2, // Eucalipto y olivo
        'fl-11': 2, // Velo de novia
      });
      setFragranceChoice('Herbal Fresco');
    } else if (presetKey === 'ramas-campestre') {
      setSelectedStructureId('struct-branches');
      setSelectedBaseId('base-fibras');
      setSelectedSizeId('atelier');
      setFlowerCounts({
        'fl-7': 5, // Claveles
        'fl-1': 4, // Rosas
        'fl-8': 4, // Pompones
        'fl-11': 2, // Velo de novia
        'fl-12': 2, // Eucalipto
      });
      setFragranceChoice('Suave y Dulce');
    } else if (presetKey === 'piedra-girasol') {
      setSelectedStructureId('struct-tape');
      setSelectedBaseId('base-piedra');
      setSelectedSizeId('declaracion');
      setFlowerCounts({
        'fl-3': 5, // Girasoles
        'fl-5': 6, // Lirios
        'fl-6': 6, // Boca de dragón
        'fl-10': 5, // Gerberas
        'fl-12': 6, // Eucalipto & olivo
      });
      setFragranceChoice('Balsámico Relajante');
    }
  };

  // Filtered flowers list for Lookbook
  const filteredFlowers = useMemo(() => {
    return MARKET_FLOWERS_COLOMBIA.filter((flower) => {
      const matchCat = lookbookFilter === 'todos' || flower.lookbookCategory === lookbookFilter;
      const matchPal = paletteFilter === 'todas' || flower.paletteGroup === paletteFilter;
      return matchCat && matchPal;
    });
  }, [lookbookFilter, paletteFilter]);

  // Submit Order
  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderData: ConsciousArrangementOrder = {
      palette: `${paletteFilter !== 'todas' ? paletteFilter.toUpperCase() : 'ARMONÍA NATURAL SABANA'} (${selectedFlowersList.map((f) => f.flower.name).slice(0, 3).join(', ')})`,
      support: `${currentBase.name} + ${currentStructure.name}`,
      message: message.trim(),
      price: priceBreakdown.totalCOP,
      structureName: currentStructure.name,
      baseName: currentBase.name,
      sizeName: `${currentSize.name} · ${totalStemsCount} tallos`,
      selectedFlowers: selectedFlowersList.map((f) => `${f.count}x ${f.flower.name} (${f.flower.subname})`),
      secondLifeSummary: `${currentBase.secondLifeTitle} — ${currentBase.secondLifeDescription}`,
      seedChoice: currentSeed.name,
      fragranceChoice,
      heightPreference,
      occasion: occasionChoice,
      deliveryDate,
      clientNotes: clientNotes.trim(),
    };

    onOpenOrderConfirmation(orderData);
  };

  // Switch area and ensure viewport scrolls smoothly to top of workspace
  const handleSelectArea = (newArea: CreatorArea) => {
    setActiveArea(newArea);
    const scrollToTarget = () => {
      const target = document.getElementById('creador-trabajo') || document.getElementById('creador-arreglo');
      if (target) {
        const navHeight = 90;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth',
        });
      }
    };
    scrollToTarget();
    setTimeout(scrollToTarget, 60);
  };

  // Area Navigation Definitions (Reemplazo explícito de los números por nombres de área)
  const areasList = [
    {
      id: 'estructura-base' as CreatorArea,
      name: 'Estructura & Base Floral',
      tag: 'Mecánica sin plástico + Base',
      icon: Sparkles,
      completed: !!selectedStructureId && !!selectedBaseId,
    },
    {
      id: 'lookbook' as CreatorArea,
      name: 'Lookbook · Selección Floral',
      tag: 'Flores cultivadas en Colombia',
      icon: Flower2,
      completed: selectedFlowersList.length > 0,
    },
    {
      id: 'escala' as CreatorArea,
      name: 'Escala & Tamaño',
      tag: `${currentSize.name} · ${totalStemsCount} tallos`,
      icon: Ruler,
      completed: !!selectedSizeId,
    },
    {
      id: 'detalles' as CreatorArea,
      name: 'Detalles & Personalización',
      tag: 'Aroma, dedicatoria & entrega',
      icon: Sprout,
      completed: !!message,
    },
  ];

  return (
    <section id="creador-arreglo" className="py-20 px-4 sm:px-6 lg:px-12 bg-[#fdf8f5] text-[#1e1b19] border-t border-[#ddbfc6]/40">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffd9e2]/80 border border-[#ddbfc6] text-[#a8295e] font-ui text-xs font-semibold uppercase tracking-widest mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#a8295e]" />
            <span>CATÁLOGO PERSONALIZABLE DE AUTOR · 100% ZERO-PLASTIC</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1e1b19] font-normal tracking-tight mb-4 leading-tight">
            Diseña tu Arreglo Floral Consciente <br />
            <span className="italic text-[#a8295e]">personalizado área por área</span>
          </h2>

          <p className="font-editorial text-base sm:text-lg text-[#564147] leading-relaxed">
            Eliminamos por completo la espuma sintética (oasis), los microplásticos y las cintas no degradables. Configura la técnica de estructura, la base artesanal reutilizable y selecciona tus flores directamente desde el <em>Lookbook Aurelia Bloom</em>.
          </p>

          {/* Quick Inspirations Bar */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="font-ui text-xs text-[#8a7177] font-semibold flex items-center gap-1.5 mr-1">
              <Compass className="w-3.5 h-3.5 text-[#a8295e]" />
              Inspiraciones de autor:
            </span>
            <button
              type="button"
              onClick={() => applyInspirationPreset('malla-sabana')}
              className="px-3.5 py-1.5 rounded-full text-xs font-ui bg-white hover:bg-[#ffd9e2]/40 border border-[#ddbfc6]/70 text-[#1e1b19] transition-all hover:border-[#a8295e] shadow-xs"
            >
              🕸️ Malla Sabana & Vidrio Reciclado
            </button>
            <button
              type="button"
              onClick={() => applyInspirationPreset('kenzan-zen')}
              className="px-3.5 py-1.5 rounded-full text-xs font-ui bg-white hover:bg-[#ffd9e2]/40 border border-[#ddbfc6]/70 text-[#1e1b19] transition-all hover:border-[#a8295e] shadow-xs"
            >
              ⛩️ Ikebana Zen & Cerámica Ráquira
            </button>
            <button
              type="button"
              onClick={() => applyInspirationPreset('ramas-campestre')}
              className="px-3.5 py-1.5 rounded-full text-xs font-ui bg-white hover:bg-[#ffd9e2]/40 border border-[#ddbfc6]/70 text-[#1e1b19] transition-all hover:border-[#a8295e] shadow-xs"
            >
              🌿 Ramas Entrelazadas & Cesta de Fibras
            </button>
            <button
              type="button"
              onClick={() => applyInspirationPreset('piedra-girasol')}
              className="px-3.5 py-1.5 rounded-full text-xs font-ui bg-white hover:bg-[#ffd9e2]/40 border border-[#ddbfc6]/70 text-[#1e1b19] transition-all hover:border-[#a8295e] shadow-xs"
            >
              📐 Rejilla Papel & Cuenco Mineral
            </button>
          </div>
        </div>

        {/* Gallery Preset Notification Banner */}
        {initialPreset && (
          <div className="mb-8 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#ffd9e2]/60 border border-[#ddbfc6] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-fadeIn">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#a8295e] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-ui text-[11px] font-bold text-[#a8295e] uppercase tracking-wider block">
                  Diseño de Catálogo Precargado
                </span>
                <p className="font-editorial text-base text-[#1e1b19] font-semibold">
                  Personalizando: <em>{initialPreset.title}</em>
                </p>
                <p className="font-editorial text-xs text-[#564147] mt-0.5">
                  Estructura: <strong>{initialPreset.structureName}</strong> · Base: <strong>{initialPreset.baseName}</strong>. Modifica cualquier elemento a tu total preferencia.
                </p>
              </div>
            </div>
            {onClearPreset && (
              <button
                type="button"
                onClick={onClearPreset}
                className="self-start sm:self-center px-4 py-2 text-xs font-ui font-semibold text-[#564147] hover:text-[#a8295e] bg-white rounded-full border border-[#ddbfc6] hover:bg-[#fff8f6] transition-colors shrink-0 flex items-center gap-1.5 shadow-xs"
              >
                <X className="w-3.5 h-3.5" />
                <span>Restaurar configuración libre</span>
              </button>
            )}
          </div>
        )}

        {/* Area Navigation Bar (Reemplaza los pasos con sus nombres de área específicos) */}
        <div id="creador-trabajo" className="mb-10 max-w-5xl mx-auto scroll-mt-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 p-2 bg-white/90 backdrop-blur-md rounded-2xl border border-[#ddbfc6]/60 shadow-sm">
            {areasList.map((area) => {
              const IconComp = area.icon;
              const isCurrent = activeArea === area.id;

              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => handleSelectArea(area.id)}
                  className={`p-3.5 rounded-xl text-left transition-all ${
                    isCurrent
                      ? 'bg-[#a8295e] text-white shadow-md'
                      : 'bg-transparent text-[#564147] hover:bg-[#fbf2ef]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-ui text-xs font-bold flex items-center gap-1.5">
                      <IconComp className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-[#a8295e]'}`} />
                      {area.name}
                    </span>
                    {area.completed && (
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-[#2d5a3f]'}`}
                      />
                    )}
                  </div>
                  <p
                    className={`text-[11px] font-editorial truncate ${
                      isCurrent ? 'text-white/90' : 'text-[#8a7177]'
                    }`}
                  >
                    {area.tag}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Work Area: Left Panels (7 cols) + Right Sticky Summary (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Customizable Areas (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* AREA 1: ESTRUCTURA Y BASE DEL ARREGLO FLORAL */}
            {activeArea === 'estructura-base' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ddbfc6]/60 shadow-sm space-y-8 animate-fadeIn">
                {/* Area Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-ui text-xs font-bold text-[#a8295e] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#a8295e]" /> ÁREA: ESTRUCTURA & BASE DEL ARREGLO FLORAL
                    </span>
                    <span className="text-xs font-ui text-[#2d5a3f] bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full font-semibold">
                      100% Sin Espuma Plástica
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1e1b19] mb-2">
                    Estructura y Base del Arreglo Floral
                  </h3>
                  <p className="font-editorial text-sm text-[#564147] leading-relaxed">
                    Aurelia Bloom ha desterrado las espumas sintéticas tóxicas. Selecciona la mecánica natural para sujetar los tallos y la vasija o contenedor artesanal que acogerá tu diseño.
                  </p>
                </div>

                {/* SUBSECTION A: Estilos de Estructura / Mecánica Sostenible */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-ui text-sm font-bold text-[#1e1b19] flex items-center gap-2 uppercase tracking-wide">
                      <Layers className="w-4 h-4 text-[#a8295e]" /> 1. Elige la Técnica de Estructura:
                    </h4>
                    <span className="text-[11px] font-ui text-[#8a7177]">
                      Reutilizables o 100% compostables
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {FLORAL_STRUCTURES.map((struct) => {
                      const isSelected = selectedStructureId === struct.id;
                      const isExpanded = expandedStructureInfo === struct.id;

                      return (
                        <div
                          key={struct.id}
                          onClick={() => setSelectedStructureId(struct.id)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#a8295e] bg-[#ffd9e2]/15 shadow-md ring-2 ring-[#a8295e]/20'
                              : 'border-[#ddbfc6]/50 bg-[#fff8f6] hover:border-[#a8295e]/40'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h5 className="font-ui text-sm font-bold text-[#1e1b19] leading-snug">
                                {struct.name}
                              </h5>
                              {isSelected ? (
                                <span className="w-5 h-5 rounded-full bg-[#a8295e] text-white flex items-center justify-center shrink-0 shadow-xs">
                                  <Check className="w-3 h-3" />
                                </span>
                              ) : (
                                <span className="w-5 h-5 rounded-full border border-[#ddbfc6] bg-white shrink-0" />
                              )}
                            </div>

                            <p className="font-ui text-[11px] font-semibold text-[#a8295e] mb-2">
                              {struct.tagline}
                            </p>

                            {/* Breve y concisa para no abrumar al cliente */}
                            <p className="font-editorial text-xs text-[#564147] leading-relaxed">
                              {isExpanded ? struct.fullDescription : struct.shortDescription}
                            </p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-[#ddbfc6]/40 flex items-center justify-between">
                            <span className="text-[10px] font-ui text-[#2d5a3f] font-semibold">
                              ✓ {struct.ecoFeature}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedStructureInfo(isExpanded ? null : struct.id);
                              }}
                              className="text-[11px] font-ui text-[#a8295e] hover:underline flex items-center gap-0.5"
                            >
                              <Info className="w-3 h-3" />
                              {isExpanded ? 'Menos' : 'Detalles'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SUBSECTION B: Bases Sostenibles del Arreglo Floral */}
                <div className="space-y-4 pt-4 border-t border-[#ddbfc6]/40">
                  <div className="flex items-center justify-between">
                    <h4 className="font-ui text-sm font-bold text-[#1e1b19] flex items-center gap-2 uppercase tracking-wide">
                      <Recycle className="w-4 h-4 text-[#2d5a3f]" /> 2. Elige la Base Sostenible del Arreglo:
                    </h4>
                    <span className="text-[11px] font-ui text-[#2d5a3f] font-semibold">
                      Texturas orgánicas con segunda vida
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {FLORAL_BASES.map((baseItem) => {
                      const isSelected = selectedBaseId === baseItem.id;
                      const isExpanded = expandedBaseInfo === baseItem.id;

                      return (
                        <div
                          key={baseItem.id}
                          onClick={() => setSelectedBaseId(baseItem.id)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#a8295e] bg-[#ffd9e2]/15 shadow-md ring-2 ring-[#a8295e]/20'
                              : 'border-[#ddbfc6]/50 bg-[#fff8f6] hover:border-[#a8295e]/40'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h5 className="font-ui text-sm font-bold text-[#1e1b19] leading-snug">
                                  {baseItem.name}
                                </h5>
                                <span className="text-[10px] font-ui text-[#735c00] bg-[#ffe088]/40 px-2 py-0.5 rounded-full inline-block mt-0.5">
                                  {baseItem.badge}
                                </span>
                              </div>
                              {isSelected ? (
                                <span className="w-5 h-5 rounded-full bg-[#a8295e] text-white flex items-center justify-center shrink-0 shadow-xs">
                                  <Check className="w-3 h-3" />
                                </span>
                              ) : (
                                <span className="w-5 h-5 rounded-full border border-[#ddbfc6] bg-white shrink-0" />
                              )}
                            </div>

                            {/* Breve y concisa */}
                            <p className="font-editorial text-xs text-[#564147] leading-relaxed mb-2">
                              {isExpanded ? baseItem.fullDescription : baseItem.shortDescription}
                            </p>

                            <div className="p-2 rounded-xl bg-white/80 border border-[#ddbfc6]/40 text-[11px] font-ui text-[#2d5a3f]">
                              <strong>2ª Vida en casa:</strong> {baseItem.secondLifeTitle}
                            </div>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-[#ddbfc6]/40 flex items-center justify-between">
                            <span className="font-ui text-xs font-bold text-[#a8295e]">
                              +{formatCOP(baseItem.priceCOP)}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedBaseInfo(isExpanded ? null : baseItem.id);
                              }}
                              className="text-[11px] font-ui text-[#a8295e] hover:underline flex items-center gap-0.5"
                            >
                              <Info className="w-3 h-3" />
                              {isExpanded ? 'Menos' : 'Detalles'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Advance Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSelectArea('lookbook')}
                    className="px-6 py-3 bg-[#a8295e] text-white rounded-full font-ui text-xs sm:text-sm font-semibold hover:bg-[#912150] transition-colors shadow-md flex items-center gap-2 group"
                  >
                    <span>Continuar al Lookbook Floral</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* AREA 2: THE AURELIA BLOOM LOOKBOOK (SELECCIÓN DE FLORES) */}
            {activeArea === 'lookbook' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ddbfc6]/60 shadow-sm space-y-7 animate-fadeIn">
                {/* Lookbook Official Header */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#fff2f5] via-[#fdf8f5] to-[#fbf2ef] border border-[#ddbfc6]/80 shadow-xs">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a8295e] text-white font-ui text-[11px] font-bold uppercase tracking-widest mb-3">
                    <Flower2 className="w-3 h-3" />
                    <span>LOOKBOOK OFICIAL AURELIA BLOOM</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1e1b19] tracking-tight mb-1">
                    {LOOKBOOK_METADATA.title}
                  </h3>

                  <p className="font-ui text-xs sm:text-sm font-bold text-[#a8295e] tracking-wide mb-3">
                    {LOOKBOOK_METADATA.subtitle}
                  </p>

                  <p className="font-editorial text-xs sm:text-sm text-[#564147] leading-relaxed italic border-l-2 border-[#a8295e]/50 pl-3">
                    "{LOOKBOOK_METADATA.manifesto}"
                  </p>
                </div>

                {/* Lookbook 4 Categories Filters */}
                <div>
                  <span className="font-ui text-xs font-semibold text-[#8a7177] uppercase tracking-wider block mb-2">
                    Categorías botánicas del Lookbook:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'todos', label: 'Todas las Flores', icon: '🌸' },
                      { id: 'focal', label: '👑 1. Focal Showstoppers', icon: '👑' },
                      { id: 'line', label: '📐 2. Line Builders', icon: '📐' },
                      { id: 'texture', label: '🎨 3. Harmonizers', icon: '🎨' },
                      { id: 'cloud', label: '☁️ 4. Filler Clouds', icon: '☁️' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setLookbookFilter(cat.id as any)}
                        className={`p-2.5 rounded-xl text-xs font-ui font-semibold transition-all text-left ${
                          lookbookFilter === cat.id
                            ? 'bg-[#a8295e] text-white shadow-xs'
                            : 'bg-[#fff8f6] text-[#564147] hover:bg-[#ffd9e2]/30 border border-[#ddbfc6]/60'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Secondary Palette Filter & Flower Counter */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#ddbfc6]/30">
                  <div className="flex items-center gap-2">
                    <span className="font-ui text-xs text-[#564147] font-semibold flex items-center gap-1">
                      <Palette className="w-3.5 h-3.5 text-[#a8295e]" /> Paleta cromática:
                    </span>
                    <select
                      value={paletteFilter}
                      onChange={(e) => setPaletteFilter(e.target.value as any)}
                      className="text-xs font-ui bg-[#fff8f6] border border-[#ddbfc6]/70 rounded-lg px-3 py-1.5 text-[#1e1b19] focus:outline-none focus:border-[#a8295e]"
                    >
                      <option value="todas">Todas las paletas</option>
                      <option value="calido">Cálida & Terracota</option>
                      <option value="pastel">Pastel & Romántica</option>
                      <option value="botanico">Botánica & Sereno</option>
                      <option value="vibrante">Vibrante & Escénica</option>
                    </select>
                  </div>

                  <span className="font-ui text-xs text-[#8a7177]">
                    Mostrando <strong>{filteredFlowers.length}</strong> flores colombianas
                  </span>
                </div>

                {/* Flowers Grid with Brief & Concise Descriptions + Stem Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredFlowers.map((flower) => {
                    const count = flowerCounts[flower.id] || 0;
                    const isExpanded = expandedFlowerInfo === flower.id;

                    return (
                      <div
                        key={flower.id}
                        className={`rounded-2xl border p-4 transition-all flex flex-col justify-between ${
                          count > 0
                            ? 'border-[#a8295e]/80 bg-[#ffd9e2]/15 shadow-sm'
                            : 'border-[#ddbfc6]/50 bg-[#fff8f6] hover:border-[#ddbfc6]'
                        }`}
                      >
                        <div>
                          {/* Image & Category Pill */}
                          <div className="h-32 rounded-xl overflow-hidden relative mb-3 bg-[#fbf2ef]">
                            <img
                              src={flower.image}
                              alt={flower.name}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute top-2 left-2 bg-[#a8295e] text-white text-[10px] font-ui font-semibold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                              <span>{flower.categoryIcon}</span>
                              <span>{flower.categoryTitle}</span>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-ui px-2 py-0.5 rounded-full">
                              {flower.colorName}
                            </div>
                          </div>

                          {/* Flower Titles & Origin */}
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <div>
                              <h4 className="font-ui text-sm font-bold text-[#1e1b19] leading-tight">
                                {flower.name}
                              </h4>
                              <p className="font-ui text-[11px] font-semibold text-[#a8295e]">
                                {flower.subname}
                              </p>
                            </div>
                            <span className="text-[10px] font-ui text-[#735c00] bg-[#ffe088]/40 px-2 py-0.5 rounded-full whitespace-nowrap">
                              {flower.origin}
                            </span>
                          </div>

                          {/* Definición Breve y Concisa para no abrumar al cliente */}
                          <p className="font-editorial text-xs text-[#564147] leading-relaxed my-2">
                            {isExpanded ? flower.fullDescription : flower.shortDescription}
                          </p>
                        </div>

                        {/* Card Bottom: Price, Expand Details & Counter */}
                        <div className="pt-3 border-t border-[#ddbfc6]/40 flex items-center justify-between">
                          <div>
                            <span className="font-ui text-xs font-bold text-[#a8295e] block">
                              {formatCOP(flower.pricePerStemCOP)}
                            </span>
                            <button
                              type="button"
                              onClick={() => setExpandedFlowerInfo(isExpanded ? null : flower.id)}
                              className="text-[10px] font-ui text-[#8a7177] hover:text-[#a8295e] underline"
                            >
                              {isExpanded ? 'Menos' : '+ Info botánica'}
                            </button>
                          </div>

                          {/* Interactive Stem Counter (+ / -) */}
                          <div className="flex items-center gap-2 bg-white rounded-full border border-[#ddbfc6] p-1 shadow-xs">
                            <button
                              type="button"
                              onClick={() => handleStemChange(flower.id, -1)}
                              disabled={count === 0}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                                count > 0
                                  ? 'bg-[#fff8f6] text-[#a8295e] hover:bg-[#ffd9e2]'
                                  : 'text-gray-300 cursor-not-allowed'
                              }`}
                              title="Restar tallo"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>

                            <span className="w-6 text-center font-ui text-xs font-bold text-[#1e1b19]">
                              {count}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleStemChange(flower.id, 1)}
                              className="w-7 h-7 rounded-full bg-[#a8295e] text-white flex items-center justify-center hover:bg-[#912150] transition-colors shadow-xs"
                              title="Agregar tallo"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 flex items-center justify-between border-t border-[#ddbfc6]/40">
                  <button
                    type="button"
                    onClick={() => handleSelectArea('estructura-base')}
                    className="px-5 py-2.5 text-xs font-ui font-semibold text-[#564147] hover:text-[#a8295e]"
                  >
                    ← Volver a Estructura & Base
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectArea('escala')}
                    className="px-6 py-3 bg-[#a8295e] text-white rounded-full font-ui text-xs sm:text-sm font-semibold hover:bg-[#912150] transition-colors shadow-md flex items-center gap-2 group"
                  >
                    <span>Continuar a Escala & Tamaño</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* AREA 3: ESCALA & TAMAÑO */}
            {activeArea === 'escala' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ddbfc6]/60 shadow-sm space-y-7 animate-fadeIn">
                <div>
                  <span className="font-ui text-xs font-bold text-[#a8295e] uppercase tracking-wider block mb-1">
                    ÁREA: ESCALA & TAMAÑO
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1e1b19] mb-2">
                    Elige la Escala y Tamaño del Arreglo
                  </h3>
                  <p className="font-editorial text-sm text-[#564147]">
                    Cada escala incluye un número sugerido de tallos botánicos que balancea el volumen sin sobrecargar la estructura de soporte.
                  </p>
                </div>

                {/* 3 Scales Grid */}
                <div className="space-y-4">
                  {ARRANGEMENT_SIZES.map((size) => {
                    const isSelected = selectedSizeId === size.id;

                    return (
                      <div
                        key={size.id}
                        onClick={() => setSelectedSizeId(size.id)}
                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isSelected
                            ? 'border-[#a8295e] bg-[#ffd9e2]/15 shadow-md ring-2 ring-[#a8295e]/20'
                            : 'border-[#ddbfc6]/50 bg-[#fff8f6] hover:border-[#a8295e]/40'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-ui text-base font-bold text-[#1e1b19]">
                              {size.name}
                            </h4>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#a8295e] text-white flex items-center justify-center shadow-xs">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <p className="font-ui text-xs font-semibold text-[#a8295e] mb-1">
                            {size.stemsLabel} · {size.dimensions}
                          </p>
                          <p className="font-editorial text-xs text-[#564147]">
                            Recomendado para: {size.recommendedSpaces}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-editorial text-xl font-bold text-[#a8295e] block">
                            {formatCOP(size.basePriceCOP)}
                          </span>
                          <span className="text-[10px] font-ui text-[#8a7177]">
                            Base de escala
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Height / Placement Preference */}
                <div className="pt-4 border-t border-[#ddbfc6]/40">
                  <label className="font-ui text-xs font-bold text-[#1e1b19] uppercase tracking-wide block mb-2">
                    Preferencia de altura para nuestras floristas:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      'Bajo (Centro de mesa / Conversación)',
                      'Medio (Consola / Escritorio)',
                      'Alto (Pieza de suelo / Rincón)',
                    ].map((hOption) => (
                      <button
                        key={hOption}
                        type="button"
                        onClick={() => setHeightPreference(hOption)}
                        className={`p-3 rounded-xl text-xs font-ui font-semibold text-center transition-all ${
                          heightPreference === hOption
                            ? 'bg-[#a8295e] text-white shadow-xs'
                            : 'bg-[#fff8f6] text-[#564147] hover:bg-[#ffd9e2]/30 border border-[#ddbfc6]/60'
                        }`}
                      >
                        {hOption}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 flex items-center justify-between border-t border-[#ddbfc6]/40">
                  <button
                    type="button"
                    onClick={() => handleSelectArea('lookbook')}
                    className="px-5 py-2.5 text-xs font-ui font-semibold text-[#564147] hover:text-[#a8295e]"
                  >
                    ← Volver al Lookbook
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectArea('detalles')}
                    className="px-6 py-3 bg-[#a8295e] text-white rounded-full font-ui text-xs sm:text-sm font-semibold hover:bg-[#912150] transition-colors shadow-md flex items-center gap-2 group"
                  >
                    <span>Continuar a Detalles & Personalización</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* AREA 4: DETALLES & PERSONALIZACIÓN */}
            {activeArea === 'detalles' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ddbfc6]/60 shadow-sm space-y-7 animate-fadeIn">
                <div>
                  <span className="font-ui text-xs font-bold text-[#a8295e] uppercase tracking-wider block mb-1">
                    ÁREA: DETALLES & PERSONALIZACIÓN
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1e1b19] mb-2">
                    Ocasión, Aroma Natural y Papel Semilla
                  </h3>
                  <p className="font-editorial text-sm text-[#564147]">
                    Personaliza la dedicatoria caligrafiada en papel de algodón germinable y añade los toques finales para nuestras floristas.
                  </p>
                </div>

                {/* Occasion Selection */}
                <div>
                  <label className="font-ui text-xs font-bold text-[#1e1b19] uppercase tracking-wide block mb-2">
                    Ocasión del arreglo:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {OCCASIONS_LIST.map((occ) => (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => setOccasionChoice(occ)}
                        className={`p-2.5 rounded-xl text-xs font-ui font-semibold text-center transition-all ${
                          occasionChoice === occ
                            ? 'bg-[#a8295e] text-white shadow-xs'
                            : 'bg-[#fff8f6] text-[#564147] hover:bg-[#ffd9e2]/30 border border-[#ddbfc6]/60'
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Natural Fragrance */}
                <div>
                  <label className="font-ui text-xs font-bold text-[#1e1b19] uppercase tracking-wide block mb-2">
                    Perfil aromático 100% botánico:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      'Neutro / Hipoalergénico',
                      'Suave y Dulce',
                      'Herbal Fresco',
                      'Balsámico Relajante',
                    ].map((frag) => (
                      <button
                        key={frag}
                        type="button"
                        onClick={() => setFragranceChoice(frag as any)}
                        className={`p-2.5 rounded-xl text-xs font-ui font-semibold text-center transition-all ${
                          fragranceChoice === frag
                            ? 'bg-[#a8295e] text-white shadow-xs'
                            : 'bg-[#fff8f6] text-[#564147] hover:bg-[#ffd9e2]/30 border border-[#ddbfc6]/60'
                        }`}
                      >
                        {frag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plantable Seed Selection */}
                <div className="p-4 rounded-2xl bg-[#fbf2ef] border border-[#ddbfc6]/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-xs font-bold text-[#2d5a3f] flex items-center gap-1.5 uppercase">
                      <Sprout className="w-4 h-4 text-[#2d5a3f]" /> Tarjeta en Papel Semilla Germinable (Incluida):
                    </span>
                    <span className="text-[10px] font-ui text-[#2d5a3f] bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                      100% Germinable
                    </span>
                  </div>

                  <p className="font-editorial text-xs text-[#564147]">
                    Elige qué flores o hierbas vivas nacerán cuando el destinatario plante la tarjeta en una maceta:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {SEED_TYPES.map((seed) => (
                      <button
                        key={seed.id}
                        type="button"
                        onClick={() => setSelectedSeedId(seed.id)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedSeedId === seed.id
                            ? 'border-[#a8295e] bg-white shadow-xs ring-1 ring-[#a8295e]'
                            : 'border-[#ddbfc6]/60 bg-white/60 hover:bg-white'
                        }`}
                      >
                        <span className="font-ui text-xs font-bold text-[#1e1b19] block mb-0.5">
                          🌱 {seed.name}
                        </span>
                        <span className="text-[10px] font-editorial text-[#564147] line-clamp-1">
                          {seed.benefit}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hand-written Message */}
                <div>
                  <label className="font-ui text-xs font-bold text-[#1e1b19] uppercase tracking-wide block mb-1.5">
                    Mensaje caligrafiado a mano:
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe la dedicatoria especial..."
                    className="w-full text-xs sm:text-sm font-editorial p-3 bg-[#fff8f6] border border-[#ddbfc6]/70 rounded-xl text-[#1e1b19] focus:outline-none focus:border-[#a8295e]"
                  />
                </div>

                {/* Delivery Date & Florist Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-ui text-xs font-bold text-[#1e1b19] uppercase tracking-wide block mb-1.5">
                      Fecha de entrega:
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full text-xs font-ui p-2.5 bg-[#fff8f6] border border-[#ddbfc6]/70 rounded-xl text-[#1e1b19] focus:outline-none focus:border-[#a8295e]"
                    />
                  </div>

                  <div>
                    <label className="font-ui text-xs font-bold text-[#1e1b19] uppercase tracking-wide block mb-1.5">
                      Notas especiales para las maestras floristas:
                    </label>
                    <input
                      type="text"
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      placeholder="Ej. acentuar tonos terracota..."
                      className="w-full text-xs font-editorial p-2.5 bg-[#fff8f6] border border-[#ddbfc6]/70 rounded-xl text-[#1e1b19] focus:outline-none focus:border-[#a8295e]"
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 flex items-center justify-between border-t border-[#ddbfc6]/40">
                  <button
                    type="button"
                    onClick={() => handleSelectArea('escala')}
                    className="px-5 py-2.5 text-xs font-ui font-semibold text-[#564147] hover:text-[#a8295e]"
                  >
                    ← Volver a Escala & Tamaño
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmOrder}
                    className="px-8 py-3.5 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-colors shadow-lg flex items-center gap-2 group"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Confirmar Encargo Consciente</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Live Sticky Preview & Summary Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#ddbfc6]/60 shadow-lg space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#ddbfc6]/40">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#a8295e]" />
                  <h4 className="font-ui text-sm font-bold text-[#1e1b19] uppercase tracking-wider">
                    Resumen del Arreglo
                  </h4>
                </div>
                <span className="text-[11px] font-ui text-[#2d5a3f] bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                  Zero-Plastic
                </span>
              </div>

              {/* Live Structure & Base Info */}
              <div className="p-3.5 rounded-2xl bg-[#fff8f6] border border-[#ddbfc6]/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-ui">
                  <span className="text-[#8a7177] font-semibold">Técnica de Estructura:</span>
                  <span className="font-bold text-[#a8295e] text-right truncate max-w-[180px]">
                    {currentStructure.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-ui">
                  <span className="text-[#8a7177] font-semibold">Base Sostenible:</span>
                  <span className="font-bold text-[#1e1b19] text-right truncate max-w-[180px]">
                    {currentBase.name}
                  </span>
                </div>
                <div className="pt-1.5 border-t border-[#ddbfc6]/30 flex items-center gap-1.5 text-[11px] font-ui text-[#2d5a3f]">
                  <Recycle className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">2ª Vida: {currentBase.secondLifeTitle}</span>
                </div>
              </div>

              {/* Stem Counter vs Scale Goal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-ui">
                  <span className="font-semibold text-[#1e1b19]">
                    Tallos Seleccionados ({currentSize.name}):
                  </span>
                  <span className="font-bold text-[#a8295e]">
                    {totalStemsCount} / {currentSize.stemCountTarget} recomendados
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#fbf2ef] h-2.5 rounded-full overflow-hidden border border-[#ddbfc6]/40">
                  <div
                    className={`h-full transition-all duration-300 ${
                      totalStemsCount >= currentSize.stemCountTarget ? 'bg-[#a8295e]' : 'bg-[#e07a5f]'
                    }`}
                    style={{
                      width: `${Math.min(100, (totalStemsCount / currentSize.stemCountTarget) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Selected Flowers List from Lookbook */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                <span className="font-ui text-[11px] font-semibold text-[#8a7177] uppercase tracking-wide block">
                  Flores Seleccionadas del Lookbook:
                </span>
                {selectedFlowersList.length > 0 ? (
                  selectedFlowersList.map(({ flower, count }) => (
                    <div
                      key={flower.id}
                      className="flex items-center justify-between text-xs p-2 bg-[#fff8f6] rounded-xl border border-[#ddbfc6]/30"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span>{flower.categoryIcon}</span>
                        <span className="font-ui font-medium text-[#1e1b19] truncate">
                          {flower.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-ui text-[11px] font-bold text-[#a8295e]">
                          × {count} tallos
                        </span>
                        <button
                          type="button"
                          onClick={() => handleStemChange(flower.id, -1)}
                          className="text-[#8a7177] hover:text-[#a8295e] text-xs font-bold"
                          title="Quitar un tallo"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-editorial text-[#8a7177] italic p-3 bg-[#fff8f6] rounded-xl text-center">
                    Aún no has agregado flores. Abre el Lookbook Aurelia Bloom para seleccionar tallos.
                  </p>
                )}
              </div>

              {/* Transparent Price Breakdown */}
              <div className="pt-3 border-t border-[#ddbfc6]/40 space-y-1.5 text-xs font-ui">
                <div className="flex justify-between text-[#564147]">
                  <span>Escala {currentSize.name}:</span>
                  <span>{formatCOP(priceBreakdown.baseScalePrice)}</span>
                </div>
                <div className="flex justify-between text-[#564147]">
                  <span>Base ({currentBase.name}):</span>
                  <span>+{formatCOP(priceBreakdown.baseContainerPrice)}</span>
                </div>
                {priceBreakdown.stemSurcharge > 0 && (
                  <div className="flex justify-between text-[#a8295e] font-semibold">
                    <span>
                      Tallos adicionales ({totalStemsCount - currentSize.stemCountTarget}):
                    </span>
                    <span>+{formatCOP(priceBreakdown.stemSurcharge)}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-800 text-[11px]">
                  <span>Estructura y papel semilla germinable:</span>
                  <span>Incluidos</span>
                </div>

                <div className="pt-2 border-t border-[#ddbfc6]/40 flex items-center justify-between">
                  <span className="font-ui text-sm font-bold text-[#1e1b19]">Total Consciente:</span>
                  <span className="font-editorial text-2xl font-bold text-[#a8295e]">
                    {formatCOP(priceBreakdown.totalCOP)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="w-full py-3.5 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-colors shadow-md flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirmar Encargo ({formatCOP(priceBreakdown.totalCOP)})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Guarantee Footer */}
              <p className="text-[11px] font-editorial text-[#8a7177] text-center leading-relaxed">
                Sin intermediarios ni desperdicio. Flores cultivadas en Colombia y entregadas con agua fresca en su soporte reutilizable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
