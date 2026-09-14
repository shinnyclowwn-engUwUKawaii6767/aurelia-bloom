import React, { useState } from 'react';
import { ActivePage } from '../types';
import { Menu, X, Sparkles, Leaf } from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onOpenCustomizer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onOpenCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: ActivePage, sectionId?: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#ddbfc6]/40 sticky top-0 z-50 h-20 sm:h-22 transition-all duration-300">
      <nav className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto h-full gap-4 lg:gap-8">
        {/* Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('inicio')}
          className="flex items-center gap-2 text-left group transition-transform hover:opacity-90 shrink-0 py-2 pr-2"
        >
          <span className="font-editorial text-2xl sm:text-3xl text-[#735c00] italic font-normal tracking-tight">
            aurelia
          </span>
          <span className="font-editorial text-2xl sm:text-3xl text-[#a8295e] font-bold tracking-tight">
            BLOOM
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-4 2xl:gap-7">
          <button
            id="nav-inicio"
            onClick={() => handleNavClick('inicio')}
            className={`font-ui text-sm font-semibold tracking-wide transition-all duration-200 px-3 py-1.5 rounded-full ${
              activePage === 'inicio'
                ? 'text-[#a8295e] bg-[#ffd9e2]/50'
                : 'text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80'
            }`}
          >
            Inicio
          </button>

          <button
            id="nav-nosotros"
            onClick={() => handleNavClick('inicio', 'nosotros')}
            className="font-ui text-sm font-semibold tracking-wide text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80 transition-all duration-200 px-3 py-1.5 rounded-full"
          >
            Sobre Nosotros
          </button>

          <button
            id="nav-servicios"
            onClick={() => handleNavClick('inicio', 'servicios')}
            className="font-ui text-sm font-semibold tracking-wide text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80 transition-all duration-200 px-3 py-1.5 rounded-full"
          >
            Servicios
          </button>

          <button
            id="nav-talleres"
            onClick={() => handleNavClick('inicio', 'talleres')}
            className="font-ui text-sm font-semibold tracking-wide text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80 transition-all duration-200 px-3 py-1.5 rounded-full"
          >
            Talleres
          </button>

          {/* Sostenibilidad & Materiales page trigger (Image 3) */}
          <button
            id="nav-sostenibilidad"
            onClick={() => handleNavClick('sostenibilidad')}
            className={`font-ui text-sm font-semibold tracking-wide transition-all duration-200 px-3.5 py-1.5 rounded-full flex items-center gap-2 ${
              activePage === 'sostenibilidad'
                ? 'text-[#a8295e] bg-[#ffd9e2]/60 shadow-xs'
                : 'text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-[#a8295e]" />
            <span>Sostenibilidad &amp; Materiales</span>
          </button>

          <button
            id="nav-galeria"
            onClick={() => handleNavClick('inicio', 'galeria')}
            className="font-ui text-sm font-semibold tracking-wide text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80 transition-all duration-200 px-3 py-1.5 rounded-full"
          >
            Galería
          </button>

          <button
            id="nav-contacto"
            onClick={() => handleNavClick('inicio', 'contacto')}
            className="font-ui text-sm font-semibold tracking-wide text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80 transition-all duration-200 px-3 py-1.5 rounded-full"
          >
            Contacto
          </button>
        </div>

        {/* Action Controls: CTA & Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            id="nav-cta-btn"
            onClick={() => {
              if (activePage === 'sostenibilidad') {
                const el = document.getElementById('creador-arreglo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (onOpenCustomizer) onOpenCustomizer();
              } else {
                handleNavClick('sostenibilidad', 'creador-arreglo');
              }
            }}
            className="hidden sm:inline-flex items-center px-5 sm:px-7 py-2.5 sm:py-3 bg-[#a8295e] text-white rounded-full font-ui text-xs sm:text-sm font-semibold hover:bg-[#912150] hover:scale-[0.98] transition-all duration-200 shadow-md shadow-[#a8295e]/20 whitespace-nowrap"
          >
            Descubre nuestros arreglos
          </button>

          {/* Mobile/Tablet Hamburger Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9] transition-all rounded-xl border border-[#ddbfc6]/40"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fff8f6] border-b border-[#ddbfc6]/50 px-6 py-6 shadow-2xl animate-fadeIn">
          <div className="flex flex-col gap-3.5 max-w-lg mx-auto">
            <button
              onClick={() => handleNavClick('inicio')}
              className={`text-left font-ui text-base font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                activePage === 'inicio' ? 'text-[#a8295e] bg-[#ffd9e2]/50' : 'text-[#564147] hover:bg-[#f5ece9]'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('inicio', 'nosotros')}
              className="text-left font-ui text-base font-semibold text-[#564147] px-4 py-2.5 rounded-xl hover:bg-[#f5ece9] transition-colors"
            >
              Sobre Nosotros
            </button>
            <button
              onClick={() => handleNavClick('inicio', 'servicios')}
              className="text-left font-ui text-base font-semibold text-[#564147] px-4 py-2.5 rounded-xl hover:bg-[#f5ece9] transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => handleNavClick('inicio', 'talleres')}
              className="text-left font-ui text-base font-semibold text-[#564147] px-4 py-2.5 rounded-xl hover:bg-[#f5ece9] transition-colors"
            >
              Talleres
            </button>
            <button
              onClick={() => handleNavClick('sostenibilidad')}
              className={`text-left font-ui text-base font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
                activePage === 'sostenibilidad' ? 'text-[#a8295e] bg-[#ffd9e2]/60' : 'text-[#564147] hover:bg-[#f5ece9]'
              }`}
            >
              <Leaf className="w-4 h-4 text-[#a8295e]" />
              <span>Sostenibilidad &amp; Materiales</span>
            </button>
            <button
              onClick={() => handleNavClick('inicio', 'galeria')}
              className="text-left font-ui text-base font-semibold text-[#564147] px-4 py-2.5 rounded-xl hover:bg-[#f5ece9] transition-colors"
            >
              Galería
            </button>
            <button
              onClick={() => handleNavClick('inicio', 'contacto')}
              className="text-left font-ui text-base font-semibold text-[#564147] px-4 py-2.5 rounded-xl hover:bg-[#f5ece9] transition-colors"
            >
              Contacto
            </button>

            <div className="pt-3 border-t border-[#ddbfc6]/40 mt-1">
              <button
                onClick={() => {
                  handleNavClick('sostenibilidad', 'creador-arreglo');
                }}
                className="w-full py-3.5 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold text-center shadow-md shadow-[#a8295e]/20 hover:bg-[#912150] transition-colors"
              >
                Descubre nuestros arreglos
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
