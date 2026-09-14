/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActivePage, GalleryItem, Workshop } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MainScreen } from './components/MainScreen';
import { SustainabilityScreen } from './components/SustainabilityScreen';
import { ManifestoModal } from './components/modals/ManifestoModal';
import { WorkshopBookingModal } from './components/modals/WorkshopBookingModal';
import { ArrangementModal } from './components/modals/ArrangementModal';
import { OrderSuccessModal } from './components/modals/OrderSuccessModal';
import { FAQModal } from './components/modals/FAQModal';
import { LegalModal } from './components/modals/LegalModal';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('inicio');
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [selectedArrangement, setSelectedArrangement] = useState<GalleryItem | null>(null);
  const [orderConfirmedData, setOrderConfirmedData] = useState<{
    palette: string;
    support: string;
    message: string;
    price: number;
  } | null>(null);
  const [faqOpen, setFaqOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f6] text-[#1e1b19] relative selection:bg-[#a8295e] selection:text-white">
      {/* Subtle organic noise overlay for luxury paper texture */}
      <div className="fixed inset-0 noise-overlay pointer-events-none z-40" />

      {/* Primary Header / Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCustomizer={() => {
          setActivePage('sostenibilidad');
          setTimeout(() => {
            const el = document.getElementById('creador-arreglo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }}
      />

      {/* Screen Views */}
      <main className="flex-1 w-full">
        {activePage === 'sostenibilidad' ? (
          <SustainabilityScreen
            onOpenManifesto={() => setManifestoOpen(true)}
            onOpenOrderConfirmation={(orderData) => setOrderConfirmedData(orderData)}
          />
        ) : (
          <MainScreen
            onSelectArrangement={(item) => setSelectedArrangement(item)}
            onBookWorkshop={(workshop) => setSelectedWorkshop(workshop)}
            onNavigatePage={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenFAQ={() => setFaqOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenTerms={() => setTermsOpen(true)}
      />

      {/* Interactive Modals */}
      <ManifestoModal
        isOpen={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
        onOpenCustomizer={() => {
          setActivePage('sostenibilidad');
          setTimeout(() => {
            const el = document.getElementById('creador-arreglo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      <WorkshopBookingModal
        workshop={selectedWorkshop}
        onClose={() => setSelectedWorkshop(null)}
      />

      <ArrangementModal
        item={selectedArrangement}
        onClose={() => setSelectedArrangement(null)}
        onOrderCustom={() => {
          setActivePage('sostenibilidad');
          setTimeout(() => {
            const el = document.getElementById('creador-arreglo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      <OrderSuccessModal
        orderData={orderConfirmedData}
        onClose={() => setOrderConfirmedData(null)}
      />

      <FAQModal isOpen={faqOpen} onClose={() => setFaqOpen(false)} />

      <LegalModal
        title="Política de Privacidad y Respeto de Datos"
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      >
        <p>
          En <strong>Aurelia Bloom</strong>, la privacidad de nuestros clientes es tan sagrada como nuestras flores. Toda la información personal facilitada para encargos florales, caligrafía de tarjetas o reservas de talleres se procesa exclusivamente con fines logísticos del pedido.
        </p>
        <p>
          Nunca vendemos ni compartimos datos con terceros publicitarios. Conservamos tus datos bajo cifrado seguro y puedes solicitar su cancelación en cualquier momento escribiendo a <em>hola@aureliabloom.com</em>.
        </p>
      </LegalModal>

      <LegalModal
        title="Términos y Condiciones del Servicio"
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
      >
        <p>
          <strong>1. Frescura Botánica:</strong> Al trabajar con flores vivas de cultivo local y de temporada, pequeñas variaciones en tonos o variedades son testimonio de su naturaleza viva y no tratada químicamente.
        </p>
        <p>
          <strong>2. Entregas Conscientes:</strong> Nuestros repartos se realizan en vehículos de bajas emisiones y dentro del cofre protector rígido FSC reutilizable.
        </p>
        <p>
          <strong>3. Talleres de Flores:</strong> Las cancelaciones de reservas de plazas pueden efectuarse con hasta 48 horas de antelación con derecho a reprogramación en futuras fechas.
        </p>
      </LegalModal>
    </div>
  );
}
