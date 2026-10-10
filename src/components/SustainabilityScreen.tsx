import React, { useState } from 'react';
import { MATERIALS_DATA } from '../data/mockData';
import { MaterialItem, ConsciousArrangementOrder, GalleryItem } from '../types';
import { ConsciousArrangementCreator } from './ConsciousArrangementCreator';
import { formatCOP } from '../utils/currency';
import {
  BookOpen,
  Download,
  Mail,
  CheckCircle2,
} from 'lucide-react';

interface SustainabilityScreenProps {
  onOpenManifesto: () => void;
  onOpenOrderConfirmation: (orderData: ConsciousArrangementOrder) => void;
  initialPreset?: GalleryItem | null;
  onClearPreset?: () => void;
}

export const SustainabilityScreen: React.FC<SustainabilityScreenProps> = ({
  onOpenManifesto,
  onOpenOrderConfirmation,
  initialPreset,
  onClearPreset,
}) => {
  const [guideEmail, setGuideEmail] = useState('');
  const [guideRequested, setGuideRequested] = useState(false);



  const handleGuideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideEmail) return;
    setGuideRequested(true);
  };

  return (
    <div className="w-full bg-[#fff8f6] text-[#1e1b19]">
      {/* 1. CATÁLOGO Y PERSONALIZACIÓN DE PRIMERO */}
      <ConsciousArrangementCreator
        onOpenOrderConfirmation={onOpenOrderConfirmation}
        initialPreset={initialPreset}
        onClearPreset={onClearPreset}
      />

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
            Recibe gratis nuestra Guía de Cuidado Floral
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
