import React from 'react';
import { formatCOP } from '../../utils/currency';
import { X, CheckCircle2, Sparkles, Heart, Sprout } from 'lucide-react';

interface OrderSuccessModalProps {
  orderData: {
    palette: string;
    support: string;
    message: string;
    price: number;
  } | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderData,
  onClose,
}) => {
  if (!orderData) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#fff8f6] rounded-2xl border border-[#ddbfc6]/60 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#564147] hover:text-[#a8295e] transition-colors rounded-full hover:bg-[#f5ece9]"
          aria-label="Cerrar confirmación"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-[#ffd9e2] text-[#a8295e] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="font-ui text-xs text-[#735c00] font-semibold uppercase tracking-widest block mb-1">
          Artesanía Ética Preparada
        </span>

        <h3 className="font-editorial text-2xl text-[#1e1b19] font-semibold mb-3">
          ¡Tu encargo consciente está en marcha!
        </h3>

        <p className="font-editorial text-sm text-[#564147] mb-6 leading-relaxed">
          Nuestras maestras floristas han recibido tu configuración. Cada flor será recolectada de fincas agroecológicas y atada a mano con cinta de pura seda Habotai.
        </p>

        <div className="bg-[#f5ece9] p-4 rounded-xl text-left font-ui text-xs text-[#564147] space-y-2 border border-[#ddbfc6]/40 mb-6">
          <div className="flex justify-between border-b border-[#ddbfc6]/30 pb-1.5">
            <span>Paleta Botánica:</span>
            <span className="font-semibold text-[#1e1b19] capitalize">{orderData.palette}</span>
          </div>
          <div className="flex justify-between border-b border-[#ddbfc6]/30 pb-1.5">
            <span>Soporte / Envoltorio:</span>
            <span className="font-semibold text-[#1e1b19] capitalize">{orderData.support}</span>
          </div>
          {orderData.message && (
            <div className="border-b border-[#ddbfc6]/30 pb-1.5">
              <span className="block text-gray-500 mb-0.5">Mensaje para caligrafiar:</span>
              <span className="font-editorial italic text-[#1e1b19]">&ldquo;{orderData.message}&rdquo;</span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-sm font-semibold">
            <span>Inversión Total:</span>
            <span className="text-[#a8295e] text-base font-editorial">{formatCOP(orderData.price)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center text-xs text-[#735c00] font-editorial italic mb-6">
          <Sprout className="w-4 h-4" />
          <span>Incluye tarjeta de papel semilla germinable y cofre protector FSC.</span>
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
