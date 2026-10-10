import React from 'react';
import { GalleryItem } from '../../types';
import { formatCOP } from '../../utils/currency';
import { X, Sparkles, Flower2, Recycle, Compass, MapPin, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';

interface ArrangementModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onOrderCustom?: (item: GalleryItem) => void;
}

export const ArrangementModal: React.FC<ArrangementModalProps> = ({
  item,
  onClose,
  onOrderCustom,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#fff8f6] rounded-3xl border border-[#ddbfc6]/60 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#564147] hover:text-[#a8295e] transition-colors rounded-full hover:bg-[#f5ece9] z-10"
          aria-label="Cerrar modal de arreglo"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Image & Quick Badges */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#ddbfc6]/40 relative aspect-[4/5]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#a8295e] text-white text-[11px] font-ui font-semibold px-3 py-1 rounded-full shadow-md">
                {item.styleName}
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl border border-[#ddbfc6]/60 shadow-md">
                <div className="flex items-center gap-2 text-xs font-ui text-[#2d5a3f] font-semibold">
                  <Recycle className="w-4 h-4 text-[#2d5a3f] shrink-0" />
                  <span>2ª Vida: {item.secondLifeTitle}</span>
                </div>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 bg-white rounded-xl border border-[#ddbfc6]/30">
                <span className="text-[11px] font-ui text-[#564147] block">Talla de catálogo</span>
                <span className="text-xs font-ui font-semibold text-[#1e1b19]">{item.sizeName}</span>
                <span className="text-[10px] text-[#735c00] font-ui block mt-0.5">{item.stemCountTarget} tallos</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#ddbfc6]/30">
                <span className="text-[11px] font-ui text-[#564147] block">Dimensiones</span>
                <span className="text-xs font-ui font-semibold text-[#1e1b19]">{item.dimensions}</span>
                <span className="text-[10px] text-emerald-700 font-ui block mt-0.5">100% Sin Oasis</span>
              </div>
            </div>
          </div>

          {/* Details & Customization Options */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 bg-[#ffd9e2] text-[#a8295e] text-[11px] font-ui font-semibold rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="px-2.5 py-0.5 bg-[#ffe088]/60 text-[#735c00] text-[11px] font-ui font-semibold rounded-full">
                  Paleta {item.paletteName}
                </span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#1e1b19] font-medium leading-tight">
                {item.title}
              </h3>
              <p className="font-editorial text-sm text-[#564147] mt-2.5 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Flowers in Arrangement (Strictly Market Flowers) */}
            <div className="p-4 bg-white rounded-2xl border border-[#ddbfc6]/40 shadow-xs">
              <h4 className="font-ui text-xs font-semibold text-[#a8295e] mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                <Flower2 className="w-4 h-4 text-[#a8295e]" /> Flores del Mercado Colombiano Incluidas:
              </h4>
              <div className="space-y-2">
                {item.flowerDetails && item.flowerDetails.length > 0 ? (
                  item.flowerDetails.map((fl, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2 bg-[#fff8f6] rounded-xl border border-[#ddbfc6]/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a8295e]" />
                        <span className="font-editorial font-medium text-[#1e1b19]">{fl.name}</span>
                        {fl.colorName && (
                          <span className="text-[11px] text-[#564147] italic">({fl.colorName})</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#735c00] font-ui bg-[#ffe088]/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" /> {fl.origin}
                        </span>
                        <span className="text-[11px] font-ui font-semibold text-[#a8295e] w-12 text-right">
                          × {fl.count} tallos
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {item.flowers.map((fl, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#fff8f6] rounded-full text-xs font-editorial text-[#564147] border border-[#ddbfc6]/30"
                      >
                        {fl}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sustainable Structure & Base */}
            <div className="p-4 bg-[#fbf2ef] rounded-2xl border border-[#ddbfc6]/50 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-ui text-xs font-semibold text-[#2d5a3f] flex items-center gap-1.5 uppercase tracking-wide">
                  <Recycle className="w-4 h-4 text-[#2d5a3f]" /> Estructura & Base 100% Sin Plástico:
                </h4>
                <span className="text-[10px] font-ui font-semibold text-[#2d5a3f] bg-emerald-100 px-2 py-0.5 rounded-full">
                  {item.recyclableBadge}
                </span>
              </div>
              <div className="text-xs font-ui text-[#1e1b19] space-y-1">
                <p>
                  <strong>Mecánica:</strong> {item.structureName}
                </p>
                <p>
                  <strong>Base:</strong> {item.baseName}
                </p>
              </div>
              <p className="font-editorial text-xs text-[#564147] leading-relaxed pt-1 border-t border-[#ddbfc6]/30">
                <strong>Segunda vida garantizada:</strong> {item.secondLifeDescription}
              </p>
            </div>

            {/* Price & Action Buttons */}
            <div className="pt-3 border-t border-[#ddbfc6]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#564147] font-ui block">Precio transparente de catálogo</span>
                <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#a8295e]">
                  {formatCOP(item.price)}
                </span>
                <span className="text-[10px] text-[#564147] block">Incluye tallos, soporte y empaque cero plástico</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    onClose();
                    if (onOrderCustom) onOrderCustom(item);
                  }}
                  className="px-6 py-3 bg-[#a8295e] text-white rounded-full font-ui text-xs sm:text-sm font-semibold hover:bg-[#912150] transition-colors shadow-md flex items-center justify-center gap-2 group"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Personalizar este diseño</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
