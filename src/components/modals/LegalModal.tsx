import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#fff8f6] rounded-2xl border border-[#ddbfc6]/60 shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#564147] hover:text-[#a8295e] transition-colors rounded-full hover:bg-[#f5ece9]"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-editorial text-2xl text-[#1e1b19] font-semibold mb-4 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#a8295e]" />
          {title}
        </h3>

        <div className="space-y-4 font-editorial text-sm text-[#564147] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};
