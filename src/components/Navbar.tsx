import React, { useState } from 'react';
import { ActivePage } from '../types';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onOpenCustomizer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
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
      <nav className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto h-full gap-4">
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

        {/* Desktop Navigation Links in requested order:
            1. inicio
            2. servicios
            3. arreglos personalizados
            4. talleres
            5. galeria
            6. sobre nosotros
            7. contacto
        */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-4 2xl:gap-6">
          {/* 1. Inicio */}
          <button
            id="nav-inicio"
            onClick={() => handleNavClick('inicio')}
            className={`font-ui text-sm font-semibold tracking-wide transition-all duration-200 px-3 py-1.5 rounded-full ${
              activePage === 'inicio'
                ? 'text-[#a8295e] bg-[#ffd9e2]/60'
                : 'text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80'
            }`}
          >
            Inicio
          </button>

          {/* 2. Servicios */}
          <button
            id="nav-servicios"
            onClick={() => handleNavClick('inicio', 'servicios')}
            className="font-ui text-sm font-semibold tracking-wide text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80 transition-all duration-200 px-3 py-1.5 rounded-full"
          >
            Servicios
          </button>

          {/* 3. Arreglos Personalizados */}
          <button
            id="nav-arreglos-personalizados"
            onClick={() => handleNavClick('sostenibilidad')}
            className={`font-ui text-sm font-semibold tracking-wide transition-all duration-200 px-3.5 py-1.5 rounded-full ${
              activePage === 'sostenibilidad'
                ? 'text-[#a8295e] bg-[#ffd9e2]/70 shadow-xs'
                : 'text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80'
            }`}
          >
            Arreglos Personalizados
          </button>

          {/* 4. Talleres */}
          <button
            id="nav-talleres"
            onClick={() => handleNavClick('inicio', 'talleres')}
            className="font-ui text-sm font-semibold tracking-wide text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80 transition-all duration-200 px-3 py-1.5 rounded-full"
          >
            Talleres
          </button>

          {/* 5. Galería */}
          <button
            id="nav-galeria"
            onClick={() => handleNavClick('inicio', 'galeria')}
            className="font-ui text-sm font-semibold tracking-wide text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80 transition-all duration-200 px-3 py-1.5 rounded-full"
          >
            Galería
          </button>

          {/* 6. Sobre Nosotros */}
          <button
            id="nav-nosotros"
            onClick={() => handleNavClick('inicio', 'nosotros')}
            className="font-ui text-sm font-semibold tracking-wide text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80 transition-all duration-200 px-3 py-1.5 rounded-full"
          >
            Sobre Nosotros
          </button>

          {/* 7. Contacto */}
          <button
            id="nav-contacto"
            onClick={() => handleNavClick('inicio', 'contacto')}
            className="font-ui text-sm font-semibold tracking-wide text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9]/80 transition-all duration-200 px-3 py-1.5 rounded-full"
          >
            Contacto
          </button>
        </div>

        {/* Mobile/Tablet Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-[#564147] hover:text-[#a8295e] hover:bg-[#f5ece9] transition-all rounded-xl border border-[#ddbfc6]/40"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer with exact same scale */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fff8f6] border-b border-[#ddbfc6]/50 px-6 py-6 shadow-2xl animate-fadeIn">
          <div className="flex flex-col gap-3 max-w-lg mx-auto">
            {/* 1. Inicio */}
            <button
              id="mobile-nav-inicio"
              onClick={() => handleNavClick('inicio')}
              className={`text-left font-ui text-base font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                activePage === 'inicio' ? 'text-[#a8295e] bg-[#ffd9e2]/50' : 'text-[#564147] hover:bg-[#f5ece9]'
              }`}
            >
              Inicio
            </button>

            {/* 2. Servicios */}
            <button
              id="mobile-nav-servicios"
              onClick={() => handleNavClick('inicio', 'servicios')}
              className="text-left font-ui text-base font-semibold text-[#564147] px-4 py-2.5 rounded-xl hover:bg-[#f5ece9] transition-colors"
            >
              Servicios
            </button>

            {/* 3. Arreglos Personalizados */}
            <button
              id="mobile-nav-arreglos-personalizados"
              onClick={() => handleNavClick('sostenibilidad')}
              className={`text-left font-ui text-base font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                activePage === 'sostenibilidad' ? 'text-[#a8295e] bg-[#ffd9e2]/60' : 'text-[#564147] hover:bg-[#f5ece9]'
              }`}
            >
              Arreglos Personalizados
            </button>

            {/* 4. Talleres */}
            <button
              id="mobile-nav-talleres"
              onClick={() => handleNavClick('inicio', 'talleres')}
              className="text-left font-ui text-base font-semibold text-[#564147] px-4 py-2.5 rounded-xl hover:bg-[#f5ece9] transition-colors"
            >
              Talleres
            </button>

            {/* 5. Galería */}
            <button
              id="mobile-nav-galeria"
              onClick={() => handleNavClick('inicio', 'galeria')}
              className="text-left font-ui text-base font-semibold text-[#564147] px-4 py-2.5 rounded-xl hover:bg-[#f5ece9] transition-colors"
            >
              Galería
            </button>

            {/* 6. Sobre Nosotros */}
            <button
              id="mobile-nav-nosotros"
              onClick={() => handleNavClick('inicio', 'nosotros')}
              className="text-left font-ui text-base font-semibold text-[#564147] px-4 py-2.5 rounded-xl hover:bg-[#f5ece9] transition-colors"
            >
              Sobre Nosotros
            </button>

            {/* 7. Contacto */}
            <button
              id="mobile-nav-contacto"
              onClick={() => handleNavClick('inicio', 'contacto')}
              className="text-left font-ui text-base font-semibold text-[#564147] px-4 py-2.5 rounded-xl hover:bg-[#f5ece9] transition-colors"
            >
              Contacto
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
