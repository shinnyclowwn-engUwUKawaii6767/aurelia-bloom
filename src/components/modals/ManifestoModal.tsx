import React from 'react';
import { X, Sparkles, Sprout, Heart, ShieldCheck } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCustomizer?: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({
  isOpen,
  onClose,
  onOpenCustomizer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#fff8f6] rounded-2xl border border-[#ddbfc6]/60 shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#564147] hover:text-[#a8295e] transition-colors rounded-full hover:bg-[#f5ece9]"
          aria-label="Cerrar manifiesto"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 text-[#a8295e] font-ui text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          <Sprout className="w-4 h-4" />
          <span>Nuestro Compromiso Ético</span>
        </div>

        <h2 className="font-editorial text-2xl sm:text-3xl text-[#1e1b19] font-semibold mb-4 leading-tight">
          Manifiesto Aurelia Bloom: <br />
          <span className="italic text-[#a8295e]">La Revolución de la Floristería Honesta</span>
        </h2>

        <div className="space-y-4 font-editorial text-sm sm:text-base text-[#564147] leading-relaxed">
          <p>
            Durante décadas, la industria floral masiva ha normalizado el uso de <strong>espumas fenólicas sintéticas</strong> (el comúnmente llamado &quot;oasis floral&quot;). Cada bloque equivale a cientos de miles de microplásticos no biodegradables que terminan en nuestros acuíferos, mientras las flores son rociadas con químicos para ocultar el marchitamiento.
          </p>

          <p>
            En <strong>Aurelia Bloom</strong> creemos que la belleza no puede sustentarse en el daño ecológico. El arte de regalar emociones debe sanar, no intoxicar:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-xl bg-[#f5ece9] border border-[#ddbfc6]/40">
              <h4 className="font-editorial font-semibold text-[#a8295e] mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> 1. Cero Espuma Verde
              </h4>
              <p className="text-xs text-[#564147]">
                Utilizamos técnicas japonesas de fijación mecánica Kenzan y mallas de celulosa natural reciclable.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f5ece9] border border-[#ddbfc6]/40">
              <h4 className="font-editorial font-semibold text-[#735c00] mb-1 flex items-center gap-2">
                <Sprout className="w-4 h-4" /> 2. Flores de Kilómetro 0
              </h4>
              <p className="text-xs text-[#564147]">
                Priorizamos pequeños cultivadores agroecológicos de la Sabana de Bogotá, Rionegro (Antioquia) y el Eje Cafetero.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f5ece9] border border-[#ddbfc6]/40">
              <h4 className="font-editorial font-semibold text-[#a8295e] mb-1 flex items-center gap-2">
                <Heart className="w-4 h-4" /> 3. Tintes 100% Botánicos
              </h4>
              <p className="text-xs text-[#564147]">
                Nuestras sedas y linos se tiñen exclusivamente con pieles de cebolla, huesos de aguacate y pétalos.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f5ece9] border border-[#ddbfc6]/40">
              <h4 className="font-editorial font-semibold text-[#735c00] mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 4. Papel Semilla Vivo
              </h4>
              <p className="text-xs text-[#564147]">
                Nuestras tarjetas no van a la basura: se plantan en tierra para renacer como flores silvestres.
              </p>
            </div>
          </div>

          <p className="italic text-[#735c00]">
            &ldquo;Devolver a la tierra más de lo que tomamos de ella: ése es el único lujo verdadero.&rdquo;
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-[#ddbfc6]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-ui text-xs text-[#564147]">
            Firmado por Aurelia Soler &amp; el equipo botánico.
          </span>
          <button
            onClick={() => {
              onClose();
              if (onOpenCustomizer) onOpenCustomizer();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-colors"
          >
            Personalizar Ramo Consciente
          </button>
        </div>
      </div>
    </div>
  );
};
