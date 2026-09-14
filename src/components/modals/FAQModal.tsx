import React from 'react';
import { X, HelpCircle } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      q: '¿Por qué no utilizan la clásica espuma verde (oasis)?',
      a: 'La espuma floral sintética es un derivado del petróleo cargado de fenol y formaldehído que se fragmenta en millones de microplásticos irreparables. En Aurelia Bloom empleamos la técnica Kenzan tradicional japonesa de latón y mallas de celulosa 100% compostables.',
    },
    {
      q: '¿Cómo se planta la tarjeta de papel semilla que acompaña al ramo?',
      a: 'Humedece el papel en agua durante unas horas, colócalo bajo un centímetro de sustrato húmedo en una maceta iluminada, y riégalo a diario. En 10-14 días germinarán flores silvestres (manzanilla, amapolas y caléndula).',
    },
    {
      q: '¿Cuánto duran los arreglos frescos en comparación con los tradicionales?',
      a: 'Nuestras flores provienen de cosechas locales matutinas que no han pasado semanas en cámaras refrigeradas ni viajes transatlánticos. Con agua fresca renovada cada dos días y tallos recortados en bisel, suelen mantenerse radiantes entre 7 y 12 días.',
    },
    {
      q: '¿Hacen entregas en el mismo día?',
      a: 'Sí, para pedidos realizados antes de las 13:00h dentro de la zona urbana local, entregamos en mano en vehículos ecológicos dentro de nuestro cofre rígido de transporte FSC.',
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#fff8f6] rounded-2xl border border-[#ddbfc6]/60 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#564147] hover:text-[#a8295e] transition-colors rounded-full hover:bg-[#f5ece9]"
          aria-label="Cerrar FAQ"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#735c00] font-ui text-xs font-semibold uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Dudas frecuentes</span>
        </div>

        <h3 className="font-editorial text-2xl text-[#1e1b19] font-semibold mb-6">
          Preguntas Frecuentes
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#f5ece9] border border-[#ddbfc6]/40">
              <h4 className="font-editorial text-base font-semibold text-[#a8295e] mb-1.5">
                {faq.q}
              </h4>
              <p className="font-editorial text-xs sm:text-sm text-[#564147] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
