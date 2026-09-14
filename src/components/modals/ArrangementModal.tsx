import React from 'react';
import { GalleryItem } from '../../types';
import { formatCOP } from '../../utils/currency';
import { X, Sparkles, Heart, Check, Flower2, ShieldAlert } from 'lucide-react';

interface ArrangementModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onOrderCustom?: () => void;
}

export const ArrangementModal: React.FC<ArrangementModalProps> = ({
  item,
  onClose,
  onOrderCustom,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#fff8f6] rounded-2xl border border-[#ddbfc6]/60 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#564147] hover:text-[#a8295e] transition-colors rounded-full hover:bg-[#f5ece9]"
          aria-label="Cerrar modal de arreglo"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-72 sm:h-80 object-cover"
            />
          </div>

          <div>
            <span className="font-ui text-xs text-[#735c00] font-semibold uppercase tracking-wider block mb-1">
              {item.category}
            </span>
            <h3 className="font-editorial text-2xl text-[#1e1b19] font-semibold mb-3 leading-snug">
              {item.title}
            </h3>
            <p className="font-editorial text-sm text-[#564147] mb-4 leading-relaxed">
              {item.description}
            </p>

            <div className="mb-4 p-3.5 bg-[#f5ece9] rounded-xl border border-[#ddbfc6]/40">
              <h4 className="font-ui text-xs font-semibold text-[#a8295e] mb-2 flex items-center gap-1.5">
                <Flower2 className="w-3.5 h-3.5" /> Variedades Botánicas:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.flowers.map((fl, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white rounded-full text-xs font-editorial text-[#564147] border border-[#ddbfc6]/30"
                  >
                    {fl}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#ddbfc6]/30">
              <div>
                <span className="text-xs text-[#564147] font-ui block">Precio estimado</span>
                <span className="font-editorial text-2xl font-bold text-[#a8295e]">
                  {formatCOP(item.price)}
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  if (onOrderCustom) onOrderCustom();
                }}
                className="px-6 py-2.5 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-colors shadow-sm"
              >
                Encargar similar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
