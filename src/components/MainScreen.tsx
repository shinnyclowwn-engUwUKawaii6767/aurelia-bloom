import React, { useState } from 'react';
import { GALLERY_DATA, WORKSHOPS_DATA } from '../data/mockData';
import { GalleryItem, Workshop, ActivePage } from '../types';
import { formatCOP } from '../utils/currency';
const heroBgImage = 'https://images.unsplash.com/photo-1527609635833-38e4a5f7c941?fm=jpg&q=80&w=2000&auto=format&fit=crop';
import {
  Flower2,
  PartyPopper,
  Truck,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Leaf,
} from 'lucide-react';

interface MainScreenProps {
  onSelectArrangement: (item: GalleryItem) => void;
  onBookWorkshop: (workshop: Workshop) => void;
  onNavigatePage: (page: ActivePage) => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({
  onSelectArrangement,
  onBookWorkshop,
  onNavigatePage,
}) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    nombre: '',
    email: '',
    asunto: 'Consulta General',
    mensaje: '',
  });

 export const MainScreen: React.FC<MainScreenProps> = ({
  onSelectArrangement,
  onBookWorkshop,
  onNavigatePage,
}) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    nombre: '',
    email: '',
    asunto: 'Consulta General',
    mensaje: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.nombre || !contactData.email) return;

    setIsSending(true);
    setSendError(false);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'e97b5b45-710f-4461-8b19-e8e3c88559c2',
          subject: `Aurelia Bloom · ${contactData.asunto}`,
          from_name: contactData.nombre,
          email: contactData.email,
          message: contactData.mensaje,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContactSubmitted(true);
      } else {
        setSendError(true);
      }
    } catch {
      setSendError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        id="inicio"
        className="relative h-[90vh] min-h-[620px] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={heroBgImage}
            alt="Taller y floristería botánica artesanal Aurelia Bloom"
            className="w-full h-full object-cover object-center sm:object-[60%_center] lg:object-[68%_center] transition-transform duration-10000 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff8f6]/95 via-[#fff8f6]/85 to-[#fff8f6]/25 lg:to-transparent" />
        </div>

        <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl py-12 lg:py-16">
            <span className="font-ui text-sm text-[#a8295e] uppercase tracking-[0.2em] mb-4 block">
              <span className="font-editorial italic text-xl sm:text-2xl text-[#063311] font-normal tracking-normal capitalize block">
                Donde florecen las flores, también lo hace la esperanza.
              </span>
            </span>

            <h1 className="font-display-title text-4xl sm:text-5xl lg:text-6xl text-[#1e1b19] font-light mb-8 leading-[1.18]">
              Cada flor guarda un recuerdo, <br />
              <span className="italic text-[#a8295e] font-normal">cada ramo una emoción.</span>
            </h1>

            <div className="flex flex-wrap gap-3.5 sm:gap-5 items-center">
              <button
                id="hero-descubre-btn"
                onClick={() => {
                  const el = document.getElementById('servicios');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 sm:px-9 py-3.5 sm:py-4 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:translate-y-[-2px] hover:bg-[#912150] transition-all duration-300 shadow-lg shadow-[#a8295e]/20"
              >
                Descubre nuestros arreglos
              </button>

              <button
                id="hero-nosotros-btn"
                onClick={() => {
                  const el = document.getElementById('nosotros');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 sm:px-9 py-3.5 sm:py-4 border-[1.5px] border-[#735c00] text-[#735c00] rounded-full font-ui text-sm font-semibold hover:bg-[#735c00]/10 transition-colors duration-300"
              >
                Sobre nosotros
              </button>

              <button
                id="hero-sostenibilidad-btn"
                onClick={() => onNavigatePage('sostenibilidad')}
                className="px-6 py-3.5 sm:py-4 bg-[#fff8f6]/95 border border-[#ddbfc6] text-[#a8295e] rounded-full font-ui text-sm font-semibold hover:bg-[#ffd9e2]/50 transition-colors duration-300 flex items-center gap-2"
              >
                <Leaf className="w-4 h-4" />
                <span>Floristería Sin Plásticos</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 right-8 sm:right-16 hidden lg:block">
          <div className="flex items-center gap-4 text-[#564147]">
            <span className="font-ui text-sm">Scroll para explorar</span>
            <div className="w-px h-12 bg-[#ddbfc6]/70" />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="nosotros"
        className="py-24 px-4 sm:px-8 lg:px-16 bg-[#fbf2ef] relative overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbLEBhZxLBT25ZP0b9_npjBWQ-w7OvRqGtI8o1gt8iM-MyKH2OasidTi9LPNjtNo8fWFnekMOzVgn3SZbDYaHmA2XtD3rR-PZ1jlAojNmju9KsrxDDoPFytjbt66bhhGc2x-OwGmDc0ZL88owP7yj_IhDQrw3oDnknOf8wTodG-L6aurATxfoF33NjZ6xS2tYxnQqkeFGTzsVvkQfnVLHrjbto7eBTv-k0Bi077TMzMQPB3-W_hEQaP01zbg0W_yuS8t6G4mBQnUiagw"
                alt="Aurelia Bloom Workshop"
                className="w-full h-[460px] sm:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 organic-shape bg-[#735c00]/10 -z-10 blur-xl" />
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="max-w-xl">
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-6">
                Nuestra Filosofía
              </h2>
              <p className="font-editorial text-base sm:text-lg text-[#564147] mb-8 leading-relaxed italic border-l-2 border-[#735c00] pl-4">
                &ldquo;En Aurelia Bloom creemos que cada flor cuenta una historia. Que son un lenguaje de emociones. Nacimos con la idea de transformar momentos cotidianos en recuerdos inolvidables, llevando la belleza de la naturaleza a cada rincón.&rdquo;
              </p>
              <p className="font-editorial text-sm sm:text-base text-[#1e1b19] mb-10 leading-relaxed">
                Nacido de una pasión por la botánica y el diseño editorial, nuestro estudio floral busca elevar el acto de regalar a una experiencia sensorial única. Seleccionamos manualmente cada flor de cultivadores locales sostenibles para asegurar frescura y durabilidad en cada arreglo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-4 rounded-xl bg-[#fff8f6] border border-[#ddbfc6]/30">
                  <h4 className="font-ui text-sm font-semibold text-[#735c00] mb-2 uppercase tracking-wide">
                    Nuestra Visión
                  </h4>
                  <p className="font-editorial text-xs sm:text-sm text-[#564147] leading-relaxed">
                    Convertirnos en la floristería referente en la región, reconocida por la creatividad, calidad y el cariño que ponemos en cada diseño.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#fff8f6] border border-[#ddbfc6]/30">
                  <h4 className="font-ui text-sm font-semibold text-[#735c00] mb-2 uppercase tracking-wide">
                    Nuestra Misión
                  </h4>
                  <p className="font-editorial text-xs sm:text-sm text-[#564147] leading-relaxed">
                    Crear arreglos florales únicos que transmitan emociones, celebren la vida y acompañen a nuestros clientes en sus momentos más importantes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicios" className="py-24 px-4 sm:px-8 lg:px-16 bg-[#fff8f6]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-4">
              Servicios Exclusivos
            </h2>
            <div className="w-24 h-0.5 bg-[#735c00] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group p-8 sm:p-10 bg-white border border-[#ddbfc6]/40 rounded-2xl hover:border-[#a8295e]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#a8295e]/5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#ffd9e2] flex items-center justify-center mb-8 text-[#a8295e] group-hover:scale-110 transition-transform">
                  <Flower2 className="w-7 h-7" />
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#1e1b19] font-medium mb-4">
                  Arreglos Personalizados
                </h3>
                <p className="font-editorial text-sm text-[#564147] mb-6 leading-relaxed">
                  Creamos piezas únicas que capturan la esencia de tu mensaje, utilizando el sentimiento y cariño con flores frescas recolectadas a diario.
                </p>
              </div>
              <button
                onClick={() => onNavigatePage('sostenibilidad')}
                className="inline-flex items-center text-[#a8295e] font-ui text-sm font-semibold group/link hover:text-[#912150]"
              >
                <span>Configurar a medida</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Service 2 */}
            <div className="group p-8 sm:p-10 bg-white border border-[#ddbfc6]/40 rounded-2xl hover:border-[#a8295e]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#a8295e]/5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#ffe088] flex items-center justify-center mb-8 text-[#735c00] group-hover:scale-110 transition-transform">
                  <PartyPopper className="w-7 h-7" />
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#1e1b19] font-medium mb-4">
                  Decoración de Eventos
                </h3>
                <p className="font-editorial text-sm text-[#564147] mb-6 leading-relaxed">
                  Transformamos espacios en jardines encantados para bodas y eventos especiales, con un estilo romántico y sofisticado libre de plásticos.
                </p>
              </div>
              <a
                href="#contacto"
                className="inline-flex items-center text-[#a8295e] font-ui text-sm font-semibold group/link hover:text-[#912150]"
              >
                <span>Saber más</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Service 3 */}
            <div className="group p-8 sm:p-10 bg-white border border-[#ddbfc6]/40 rounded-2xl hover:border-[#a8295e]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#a8295e]/5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#ffd9e2] flex items-center justify-center mb-8 text-[#a8295e] group-hover:scale-110 transition-transform">
                  <Truck className="w-7 h-7" />
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#1e1b19] font-medium mb-4">
                  Entregas a Domicilio
                </h3>
                <p className="font-editorial text-sm text-[#564147] mb-6 leading-relaxed">
                  Servicio de entrega local cuidado y puntual en cofre de transporte rígido FSC, garantizando que cada ramo llegue en perfectas condiciones.
                </p>
              </div>
              <a
                href="#galeria"
                className="inline-flex items-center text-[#a8295e] font-ui text-sm font-semibold group/link hover:text-[#912150]"
              >
                <span>Ver catálogo</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section
        id="talleres"
        className="py-24 px-4 sm:px-8 lg:px-16 bg-[#efe6e3] relative overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="flex-1 order-2 lg:order-1">
            <span className="font-ui text-xs font-semibold text-[#735c00] uppercase tracking-[0.2em] mb-4 block">
              Aprende con nosotros
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-6">
              Talleres de Arte Floral
            </h2>
            <p className="font-editorial text-base sm:text-lg text-[#564147] mb-8 leading-relaxed">
              Sumérgete en el mundo de la botánica y descubre las técnicas de composición que utilizamos en nuestro taller. Espacios íntimos diseñados para despertar tu creatividad y conectar con la naturaleza.
            </p>

            <div className="space-y-4 mb-8">
              {WORKSHOPS_DATA.map((ws) => (
                <div
                  key={ws.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-[#fff8f6]/80 border-l-4 border-[#a8295e] rounded-r-xl gap-4 shadow-sm"
                >
                  <div className="flex-1">
                    <h4 className="font-ui text-base font-semibold text-[#1e1b19]">
                      {ws.title}
                    </h4>
                    <p className="text-xs text-[#564147] font-ui mt-0.5">
                      {ws.date} • {ws.time} • Solo {ws.spotsLeft} plazas
                    </p>
                  </div>
                  <button
                    onClick={() => onBookWorkshop(ws)}
                    className="px-6 py-2.5 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-colors whitespace-nowrap self-start sm:self-center shadow-sm"
                  >
                    Reserva tu cupo ({formatCOP(ws.price)})
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2 grid grid-cols-2 gap-4 w-full">
            <div className="pt-8 sm:pt-12">
              <img
                className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg transition-transform hover:scale-102"
                alt="Floral workshop hands"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG_EdVXiZIxNPaE95c_qUfNvZDlDFBTFsuy3t6Og_iD7rwBfl06NqBECbNOYL7Sg7wHET5u2q1TbEk5qBMuvQI0-8WJ1ORO6wP8gRL-kKDL14U5co3sjkx243TTfDFTT5T7cIUGJMSIiqSKZ25ADdNISMYPeJtdwoK7D-Fwxt-7oCdrr9H8dvaDiCo7-qrajunuz1KAJ9mEkEt0KviVt6H3pS4FDIDsrp1gi9xNlefI8nMssdk6St3LDKxIJ5FzPw3JlFCqilHnC4"
              />
            </div>
            <div>
              <img
                className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg transition-transform hover:scale-102"
                alt="Flowers on wooden table"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUmTSP1DRT1VqsP0BQmzkR0BjW1Zr4i19_0bpE0uIQWYO9U_pV7EW0VbLDzFQtEW1rjn6E97MhRgI08YtB9M4OAUQKWlJHeuKu9M5X0rz7KcF90lDEei2-d2MU-A3Z0P2vKOj03I-0WZC_x83QxjQpJUR29ag-h21dOTdnA4QpKvcDmZ144k3xM7-A1PC8y3pbH7sv0IlTNBWHY3m-t4TffEF98PzIcBtquhD78kEVJP8l4NcTrfnPNokotVifuINUDTKu1H2v76E"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-24 px-4 sm:px-8 lg:px-16 bg-[#fff8f6]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 gap-4">
            <div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold">
                Nuestra Colección
              </h2>
              <p className="font-editorial text-sm sm:text-base text-[#564147] mt-2">
                Explora nuestras últimas creaciones y diseños botánicos.
              </p>
            </div>
            <button
              onClick={() => onNavigatePage('sostenibilidad')}
              className="font-ui text-sm font-semibold text-[#a8295e] hover:underline underline-offset-4 self-start sm:self-auto"
            >
              Ver materiales e inventario sostenible →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]">
            {GALLERY_DATA.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectArrangement(item)}
                className={`group overflow-hidden rounded-2xl relative cursor-pointer border border-[#ddbfc6]/30 shadow-sm ${
                  item.span || ''
                }`}
              >
                <img
                  alt={item.title}
                  src={item.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#a8295e]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <span className="font-editorial text-white text-base sm:text-lg font-semibold mb-2 drop-shadow-md">
                    {item.title}
                  </span>
                  <span className="font-ui text-xs text-white bg-[#a8295e] px-5 py-2 rounded-full font-semibold shadow-md">
                    Ver Detalles ({formatCOP(item.price)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        className="py-24 px-4 sm:px-8 lg:px-16 bg-[#f5ece9] border-t border-[#ddbfc6]/30"
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1e1b19] font-semibold mb-6">
              Ponte en contacto
            </h2>
            <p className="font-editorial text-base text-[#564147] mb-12 leading-relaxed">
              ¿Tienes una idea especial o necesitas asesoramiento para un evento? Escríbenos y hagamos realidad tus emociones con un diseño botánico a tu medida.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-ui text-sm font-semibold text-[#1e1b19]">Llámanos</p>
                  <p className="font-editorial text-sm text-[#564147]">+57 300 548 4382</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-ui text-sm font-semibold text-[#1e1b19]">Email</p>
                  <p className="font-editorial text-sm text-[#564147]">helloaureliabloom@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ffd9e2] text-[#a8295e] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-ui text-sm font-semibold text-[#1e1b19]">Visítanos</p>
                  <p className="font-editorial text-sm text-[#564147]">
                    Cra. 7 #67-42, Chapinero / Zona G, Bogotá, Colombia
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-10">
              <a
                href="#contacto"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center border border-[#ddbfc6] text-[#564147] hover:bg-[#a8295e] hover:text-white transition-all shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#contacto"
                aria-label="YouTube"
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center border border-[#ddbfc6] text-[#564147] hover:bg-[#a8295e] hover:text-white transition-all shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            {contactSubmitted ? (
              <div className="p-10 bg-white rounded-2xl shadow-sm border border-[#ddbfc6]/40 text-center space-y-4">
                <div className="w-16 h-16 bg-[#ffd9e2] text-[#a8295e] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-2xl text-[#1e1b19] font-semibold">
                  ¡Mensaje Recibido!
                </h3>
                <p className="font-editorial text-sm text-[#564147] max-w-md mx-auto">
                  Gracias por escribirnos, <strong>{contactData.nombre}</strong>. Una de nuestras floristas te responderá a <strong>{contactData.email}</strong> en menos de 24 horas.
                </p>
                <button
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactData({ nombre: '', email: '', asunto: 'Consulta General', mensaje: '' });
                  }}
                  className="px-6 py-2.5 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleContactSubmit}
                className="p-8 sm:p-10 bg-white rounded-2xl shadow-sm border border-[#ddbfc6]/40"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactData.nombre}
                      onChange={(e) =>
                        setContactData({ ...contactData, nombre: e.target.value })
                      }
                      placeholder="Tu nombre"
                      className="w-full bg-[#fff8f6] border-none border-b border-[#ddbfc6] focus:border-[#735c00] focus:ring-0 transition-all py-3 px-3 text-sm font-editorial"
                    />
                  </div>
                  <div>
                    <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactData.email}
                      onChange={(e) =>
                        setContactData({ ...contactData, email: e.target.value })
                      }
                      placeholder="hola@ejemplo.com"
                      className="w-full bg-[#fff8f6] border-none border-b border-[#ddbfc6] focus:border-[#735c00] focus:ring-0 transition-all py-3 px-3 text-sm font-editorial"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-2">
                    Asunto
                  </label>
                  <select
                    value={contactData.asunto}
                    onChange={(e) =>
                      setContactData({ ...contactData, asunto: e.target.value })
                    }
                    className="w-full bg-[#fff8f6] border-none border-b border-[#ddbfc6] focus:border-[#735c00] focus:ring-0 transition-all py-3 px-3 text-sm font-ui"
                  >
                    <option>Consulta General</option>
                    <option>Evento o Boda</option>
                    <option>Taller de Flores</option>
                    <option>Pedido Especial</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    value={contactData.mensaje}
                    onChange={(e) =>
                      setContactData({ ...contactData, mensaje: e.target.value })
                    }
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    className="w-full bg-[#fff8f6] border-none border-b border-[#ddbfc6] focus:border-[#735c00] focus:ring-0 transition-all py-3 px-3 resize-none text-sm font-editorial"
                  />
                </div>

                <button
  type="submit"
  disabled={isSending}
  className="w-full py-4 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:translate-y-[-2px] hover:bg-[#912150] transition-all shadow-md shadow-[#a8295e]/15 disabled:opacity-60 disabled:cursor-not-allowed"
>
  {isSending ? 'Enviando...' : 'Enviar Mensaje'}
</button>
{sendError && (
  <p className="text-sm text-red-600 mt-3 text-center">
    No pudimos enviar tu mensaje. Escríbenos directo a helloaureliabloom@gmail.com
  </p>
)}
                >
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
