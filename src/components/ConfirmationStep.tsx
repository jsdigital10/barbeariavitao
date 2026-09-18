import React from 'react';
import { ServiceItem } from '../types';
import { formatCurrencyBRL, formatDateBR } from '../constants';
import { Scissors3DIcon, Calendar3DIcon, Clock3DIcon, WhatsApp3DIcon } from './ThreeDIcon';
import { User, ShieldCheck, AlertCircle, Loader2, Sparkles, Check } from 'lucide-react';

interface ConfirmationStepProps {
  services: ServiceItem[];
  totalPrice: number;
  totalDurationMinutes: number;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  isSubmitting: boolean;
  errorMessage: string | null;
  onConfirm: () => void;
  onBackToSlots: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  services,
  totalPrice,
  totalDurationMinutes,
  date,
  time,
  customerName,
  customerPhone,
  isSubmitting,
  errorMessage,
  onConfirm,
  onBackToSlots,
}) => {
  const formattedDate = formatDateBR(date);
  const formattedTotalPrice = formatCurrencyBRL(totalPrice);

  return (
    <div id="confirmation-step-container" className="w-full max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-[#F3F4F6] font-serif">
          Confirme seu horário
        </h3>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
          Revise os detalhes antes de confirmar sua reserva na Barbearia do Vitor
        </p>
      </div>

      {/* Error Banner if slot was taken or transaction failed */}
      {errorMessage && (
        <div
          id="booking-error-banner"
          className="mb-5 p-4 rounded-2xl bg-red-950/70 border-2 border-red-500/60 shadow-xl text-left flex items-start gap-3 animate-shake"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-bold text-red-200">{errorMessage}</p>
            <button
              type="button"
              onClick={onBackToSlots}
              className="mt-2 inline-flex items-center text-xs font-semibold text-[#FFDF73] underline hover:text-white cursor-pointer"
            >
              Voltar e escolher outro horário livre →
            </button>
          </div>
        </div>
      )}

      {/* Premium 3D Ticket Card */}
      <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#121212] via-[#0D0D0D] to-[#070707] border-2 border-[#D4AF37]/45 shadow-[0_25px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.15)] backdrop-blur-2xl space-y-4">
        {/* Decorative Gold Header Ribbon */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#F3F4F6] font-serif tracking-wider uppercase">
              Resumo do Agendamento
            </span>
          </div>
          <span className="px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[10px] font-black text-[#FFDF73] uppercase tracking-wider">
            {services.length} {services.length === 1 ? 'Serviço' : 'Serviços'}
          </span>
        </div>

        {/* Selected Services List */}
        <div className="space-y-2 py-1">
          <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
            <Scissors3DIcon size={18} />
            <span>Serviços Escolhidos</span>
          </div>

          <div className="space-y-1.5 bg-[#161616]/70 p-3 rounded-2xl border border-[#262626]">
            {services.map((srv) => (
              <div key={srv.id} className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="text-[#F3F4F6] font-medium">{srv.name}</span>
                </div>
                <span className="text-[#D1D5DB] font-semibold">{formatCurrencyBRL(srv.price)}</span>
              </div>
            ))}

            <div className="pt-2 mt-2 border-t border-[#333] flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>Duração estimada total:</span>
              <span className="font-semibold text-[#D4AF37]">~{totalDurationMinutes} minutos</span>
            </div>
          </div>
        </div>

        {/* Rows for Date, Time, Customer and Total */}
        <div className="space-y-3.5 divide-y divide-[#222]">
          {/* Total Value */}
          <div className="flex items-center justify-between pt-3">
            <span className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wider">
              Valor Total
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#FFDF73] font-serif drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">
              {formattedTotalPrice}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <Calendar3DIcon size={18} />
              <span className="font-medium">Data</span>
            </div>
            <span className="text-sm sm:text-base font-bold text-[#F3F4F6]">{formattedDate}</span>
          </div>

          {/* Time */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <Clock3DIcon size={18} />
              <span className="font-medium">Horário</span>
            </div>
            <span className="text-base sm:text-lg font-extrabold text-[#FFDF73]">{time}</span>
          </div>

          {/* Customer */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <User className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-medium">Cliente</span>
            </div>
            <span className="text-sm sm:text-base font-bold text-[#F3F4F6]">{customerName}</span>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <WhatsApp3DIcon size={18} />
              <span className="font-medium">WhatsApp</span>
            </div>
            <span className="text-sm font-semibold text-[#D1D5DB]">{customerPhone}</span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#9CA3AF]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Reserva atômica e bloqueio imediato via Firebase Firestore</span>
        </div>

        {/* Primary Action Button */}
        <button
          id="confirm-booking-submit-btn"
          type="button"
          disabled={isSubmitting}
          onClick={onConfirm}
          className={`w-full mt-3 py-4 px-6 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer ${
            isSubmitting
              ? 'bg-[#4B3B11] text-[#9CA3AF] cursor-wait'
              : 'bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#AA771C] text-[#050505] shadow-[0_10px_30px_rgba(212,175,55,0.45)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.65)] hover:scale-[1.02] active:scale-98'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
              <span>Verificando e bloqueando horário...</span>
            </>
          ) : (
            <>
              <Clock3DIcon size={24} />
              <span>Confirmar Agendamento</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
