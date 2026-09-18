import React from 'react';
import { applyPhoneMask, isValidBrazilianPhone } from '../utils/dateTime';
import { User, Phone, ShieldCheck } from 'lucide-react';
import { WhatsApp3DIcon } from './ThreeDIcon';

interface CustomerFormSectionProps {
  customerName: string;
  customerPhone: string;
  onChangeName: (name: string) => void;
  onChangePhone: (phone: string) => void;
}

export const CustomerFormSection: React.FC<CustomerFormSectionProps> = ({
  customerName,
  customerPhone,
  onChangeName,
  onChangePhone,
}) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = applyPhoneMask(raw);
    onChangePhone(formatted);
  };

  const isPhoneValid = isValidBrazilianPhone(customerPhone);
  const isNameValid = customerName.trim().length >= 2;

  return (
    <div id="customer-info-step-container" className="w-full max-w-lg mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 mb-2">
          <WhatsApp3DIcon size={40} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#F3F4F6] font-serif">
          Seus dados para contato
        </h3>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
          Sem cadastro, sem senhas. Apenas seu nome e WhatsApp para confirmar a reserva.
        </p>
      </div>

      <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-[#0E0E0E]/95 border border-[#D4AF37]/25 shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="customer-name-input"
            className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1.5"
          >
            Seu Nome Completo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
              <User className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <input
              id="customer-name-input"
              type="text"
              autoComplete="name"
              placeholder="Ex: João da Silva"
              value={customerName}
              onChange={(e) => onChangeName(e.target.value)}
              maxLength={70}
              className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#161616] border text-base text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none transition-all ${
                isNameValid
                  ? 'border-[#D4AF37]/60 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                  : 'border-[#333333] focus:border-[#D4AF37]/50'
              }`}
            />
          </div>
          {customerName.length > 0 && !isNameValid && (
            <p className="text-[11px] text-amber-400 mt-1">Digite pelo menos 2 caracteres.</p>
          )}
        </div>

        {/* WhatsApp / Phone Field */}
        <div>
          <label
            htmlFor="customer-phone-input"
            className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1.5"
          >
            WhatsApp / Celular
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <input
              id="customer-phone-input"
              type="tel"
              autoComplete="tel"
              placeholder="(34) 99999-9999"
              value={customerPhone}
              onChange={handlePhoneChange}
              maxLength={15}
              className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#161616] border text-base text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none transition-all ${
                isPhoneValid
                  ? 'border-emerald-500/60 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                  : 'border-[#333333] focus:border-[#D4AF37]/50'
              }`}
            />
          </div>
          <p className="text-[11px] text-[#9CA3AF] mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
            <span>Usado exclusivamente para enviar o lembrete da sua reserva.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
