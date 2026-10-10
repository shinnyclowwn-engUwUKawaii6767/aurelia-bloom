import React from 'react';
import { formatCOP } from '../../utils/currency';
import { X, CheckCircle2, Sparkles, Heart, Sprout } from 'lucide-react';

import { ConsciousArrangementOrder } from '../../types';

interface OrderSuccessModalProps {
  orderData: ConsciousArrangementOrder | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderData,
  onClose,
}) => {
  if (!orderData) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#fff8f6] rounded-3xl border border-[#ddbfc6]/60 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#564147] hover:text-[#a8295e] transition-colors rounded-full hover:bg-[#f5ece9]"
          aria-label="Cerrar confirmación"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-[#ffd9e2] text-[#a8295e] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="font-ui text-xs text-[#735c00] font-semibold uppercase tracking-widest block mb-1">
          Arreglo Floral Preparado · 100% Personalizado
        </span>

        <h3 className="font-editorial text-2xl sm:text-3xl text-[#1e1b19] font-semibold mb-3">
          ¡Tu encargo personalizado está en marcha!
        </h3>

        <p className="font-editorial text-sm text-[#564147] mb-6 leading-relaxed">
          Nuestras maestras floristas han recibido tu configuración personalizada. Cada flor será recolectada en fresco de fincas locales y ensamblada siguiendo con exactitud tu disposición elegida.
        </p>

        <div className="bg-[#f5ece9] p-5 rounded-2xl text-left font-ui text-xs text-[#564147] space-y-2.5 border border-[#ddbfc6]/40 mb-6">
          {orderData.styleName && (
            <div className="flex justify-between border-b border-[#ddbfc6]/30 pb-2">
              <span className="font-medium">Estilo & Disposición:</span>
              <span className="font-semibold text-[#1e1b19] text-right">{orderData.styleName}</span>
            </div>
          )}

          {orderData.sizeName && (
            <div className="flex justify-between border-b border-[#ddbfc6]/30 pb-2">
              <span className="font-medium">Escala / Tallos:</span>
              <span className="font-semibold text-[#1e1b19] text-right">{orderData.sizeName}</span>
            </div>
          )}

          <div className="flex justify-between border-b border-[#ddbfc6]/30 pb-2">
            <span className="font-medium">Armonía Cromática:</span>
            <span className="font-semibold text-[#1e1b19] capitalize text-right">{orderData.palette}</span>
          </div>

          <div className="flex justify-between border-b border-[#ddbfc6]/30 pb-2">
            <span className="font-medium">Soporte & Envoltorio:</span>
            <span className="font-semibold text-[#1e1b19] text-right">{orderData.support}</span>
          </div>

          {orderData.secondLifeSummary && (
            <div className="p-2.5 rounded-xl bg-white/80 border border-[#ddbfc6]/30 text-xs text-[#735c00]">
              <span className="font-bold flex items-center gap-1.5 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#a8295e]" />
                Doble Uso del Material:
              </span>
              <p className="text-[#564147] font-editorial">{orderData.secondLifeSummary}</p>
            </div>
          )}

          {orderData.selectedFlowers && orderData.selectedFlowers.length > 0 && (
            <div className="border-b border-[#ddbfc6]/30 pb-2">
              <span className="block font-medium mb-1.5">Flores Colombianas Seleccionadas:</span>
              <div className="flex flex-wrap gap-1.5">
                {orderData.selectedFlowers.map((fl, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-white text-[#a8295e] border border-[#ddbfc6]/40 font-semibold text-[11px]"
                  >
                    {fl}
                  </span>
                ))}
              </div>
            </div>
          )}

          {orderData.seedChoice && (
            <div className="flex justify-between border-b border-[#ddbfc6]/30 pb-2">
              <span className="font-medium">Semilla de Tarjeta Germinable:</span>
              <span className="font-semibold text-[#1e1b19]">{orderData.seedChoice}</span>
            </div>
          )}

          {orderData.message && (
            <div className="border-b border-[#ddbfc6]/30 pb-2">
              <span className="block text-[#8a7177] mb-0.5 font-medium">Dedicatoria para caligrafiar:</span>
              <span className="font-editorial italic text-[#1e1b19] text-sm">&ldquo;{orderData.message}&rdquo;</span>
            </div>
          )}

          {orderData.clientNotes && (
            <div className="border-b border-[#ddbfc6]/30 pb-2">
              <span className="block text-[#8a7177] mb-0.5 font-medium">Preferencia Especial del Cliente:</span>
              <span className="font-editorial text-[#1e1b19]">{orderData.clientNotes}</span>
            </div>
          )}

          <div className="flex justify-between pt-1.5 text-sm font-semibold">
            <span>Inversión Total:</span>
            <span className="text-[#a8295e] text-lg font-editorial">{formatCOP(orderData.price)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center text-xs text-[#735c00] font-editorial italic mb-6">
          <Sprout className="w-4 h-4 text-[#a8295e]" />
          <span>Empaque en cofre kraft FSC 100% libre de plásticos y espuma floral tóxica.</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-colors shadow-md shadow-[#a8295e]/20"
        >
          Aceptar y Seguir Explorando
        </button>
      </div>
    </div>
  );
};
