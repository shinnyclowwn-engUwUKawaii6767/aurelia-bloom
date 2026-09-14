import React, { useState } from 'react';
import { Workshop } from '../../types';
import { formatCOP } from '../../utils/currency';
import { X, Calendar, Clock, Check, Users, Sparkles } from 'lucide-react';

interface WorkshopBookingModalProps {
  workshop: Workshop | null;
  onClose: () => void;
}

export const WorkshopBookingModal: React.FC<WorkshopBookingModalProps> = ({
  workshop,
  onClose,
}) => {
  const [spots, setSpots] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dietary, setDietary] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!workshop) return null;

  const totalPrice = workshop.price * spots;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#fff8f6] rounded-2xl border border-[#ddbfc6]/60 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#564147] hover:text-[#a8295e] transition-colors rounded-full hover:bg-[#f5ece9]"
          aria-label="Cerrar modal de reserva"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#ffd9e2] text-[#a8295e] rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-editorial text-2xl text-[#1e1b19] font-semibold">
              ¡Reserva Confirmada!
            </h3>
            <p className="font-editorial text-sm text-[#564147] max-w-md mx-auto">
              Hemos reservado <strong>{spots} {spots === 1 ? 'plaza' : 'plazas'}</strong> para el taller{' '}
              <strong className="text-[#a8295e]">{workshop.title}</strong> el {workshop.date} a las {workshop.time}.
            </p>
            <div className="p-4 bg-[#f5ece9] rounded-xl text-xs text-[#564147] font-ui text-left space-y-1.5 max-w-sm mx-auto border border-[#ddbfc6]/40">
              <div className="flex justify-between">
                <span>Asistente:</span>
                <span className="font-semibold text-[#1e1b19]">{name}</span>
              </div>
              <div className="flex justify-between">
                <span>Email de confirmación:</span>
                <span className="font-semibold text-[#1e1b19]">{email}</span>
              </div>
              <div className="flex justify-between">
                <span>Total abonado (simulado):</span>
                <span className="font-semibold text-[#a8295e]">{formatCOP(totalPrice)}</span>
              </div>
            </div>
            <p className="text-xs text-[#735c00] font-editorial italic">
              Recibirás en tu correo los detalles de acceso y las pautas para disfrutar de la experiencia.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-colors shadow-sm"
            >
              Entendido, ¡gracias!
            </button>
          </div>
        ) : (
          <div>
            <span className="font-ui text-xs text-[#735c00] font-semibold uppercase tracking-wider block mb-1">
              Reserva tu plaza
            </span>
            <h3 className="font-editorial text-2xl text-[#1e1b19] font-semibold mb-2">
              {workshop.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs font-ui text-[#564147] mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#a8295e]" /> {workshop.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#a8295e]" /> {workshop.time} ({workshop.duration})
              </span>
              <span className="flex items-center gap-1 bg-[#ffd9e2] text-[#3e001d] px-2 py-0.5 rounded-full font-medium">
                <Users className="w-3 h-3" /> Solo quedan {workshop.spotsLeft} plazas
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-4 bg-[#f5ece9] rounded-xl border border-[#ddbfc6]/40 mb-4">
                <h4 className="font-editorial text-xs font-semibold text-[#a8295e] mb-2 uppercase tracking-wider">
                  El taller incluye:
                </h4>
                <ul className="text-xs font-editorial text-[#564147] space-y-1">
                  {workshop.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#a8295e]">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre y apellidos"
                    className="w-full bg-[#fff8f6] border border-[#ddbfc6] rounded-lg px-3 py-2.5 text-sm font-ui focus:outline-none focus:border-[#a8295e]"
                  />
                </div>
                <div>
                  <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hola@ejemplo.com"
                    className="w-full bg-[#fff8f6] border border-[#ddbfc6] rounded-lg px-3 py-2.5 text-sm font-ui focus:outline-none focus:border-[#a8295e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-1">
                    Teléfono Móvil
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+57 300 000 0000"
                    className="w-full bg-[#fff8f6] border border-[#ddbfc6] rounded-lg px-3 py-2.5 text-sm font-ui focus:outline-none focus:border-[#a8295e]"
                  />
                </div>
                <div>
                  <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-1">
                    Número de plazas
                  </label>
                  <select
                    value={spots}
                    onChange={(e) => setSpots(Number(e.target.value))}
                    className="w-full bg-[#fff8f6] border border-[#ddbfc6] rounded-lg px-3 py-2.5 text-sm font-ui focus:outline-none focus:border-[#a8295e]"
                  >
                    {[1, 2, 3, 4].slice(0, workshop.spotsLeft).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'plaza' : 'plazas'} ({formatCOP(n * workshop.price)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-ui text-xs font-semibold text-[#1e1b19] mb-1">
                  Alergias o preferencias de desayuno (opcional)
                </label>
                <input
                  type="text"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  placeholder="Ej: vegano, sin gluten, alergia a frutos secos"
                  className="w-full bg-[#fff8f6] border border-[#ddbfc6] rounded-lg px-3 py-2 text-sm font-ui focus:outline-none focus:border-[#a8295e]"
                />
              </div>

              <div className="pt-4 border-t border-[#ddbfc6]/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#564147] font-ui block">Precio total</span>
                  <span className="font-editorial text-2xl font-bold text-[#a8295e]">
                    {formatCOP(totalPrice)}
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#a8295e] text-white rounded-full font-ui text-sm font-semibold hover:bg-[#912150] transition-colors shadow-md shadow-[#a8295e]/20"
                >
                  Confirmar Reserva
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
