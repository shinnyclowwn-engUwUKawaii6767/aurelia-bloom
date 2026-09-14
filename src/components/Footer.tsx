import React from 'react';
import { ActivePage } from '../types';
import { ShieldCheck, Sprout, Heart, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onOpenFAQ?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  activePage,
  setActivePage,
  onOpenFAQ,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="bg-[#f5ece9] border-t border-[#ddbfc6]/30 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-4 sm:px-8 lg:px-16 max-w-[1280px] mx-auto gap-8">
        {/* Brand identity */}
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <span className="font-editorial text-2xl text-[#a8295e] font-semibold tracking-tight">
              Aurelia Bloom
            </span>
          </div>
          <p className="font-editorial text-sm text-[#564147] max-w-xs leading-relaxed">
            © 2024 Aurelia Bloom. El arte de regalar emociones.
          </p>
        </div>

        {/* Legal & Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <button
            id="footer-privacidad-btn"
            onClick={onOpenPrivacy}
            className="font-ui text-sm text-[#564147] hover:text-[#735c00] transition-colors"
          >
            Privacidad
          </button>
          <button
            id="footer-terminos-btn"
            onClick={onOpenTerms}
            className="font-ui text-sm text-[#564147] hover:text-[#735c00] transition-colors"
          >
            Términos
          </button>
          <button
            id="footer-faq-btn"
            onClick={onOpenFAQ}
            className="font-ui text-sm text-[#564147] hover:text-[#735c00] transition-colors"
          >
            Preguntas Frecuentes
          </button>
          <button
            id="footer-sostenibilidad-btn"
            onClick={() => {
              setActivePage('sostenibilidad');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-ui text-sm transition-colors ${
              activePage === 'sostenibilidad'
                ? 'text-[#a8295e] font-semibold underline underline-offset-4'
                : 'text-[#564147] hover:text-[#a8295e]'
            }`}
          >
            Sostenibilidad
          </button>
        </div>

        {/* Sustainability Certifications (as seen in Image 3.png) */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff8f6] border border-[#ddbfc6]/40 text-[#564147] font-ui text-xs font-medium shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#a8295e]" />
            <span>100% Sin Plásticos</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff8f6] border border-[#ddbfc6]/40 text-[#564147] font-ui text-xs font-medium shadow-sm">
            <Sprout className="w-3.5 h-3.5 text-[#735c00]" />
            <span>Slow Flowers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
