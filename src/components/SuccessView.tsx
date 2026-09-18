import React, { useEffect, useState } from 'react';
import { ConfirmedBooking } from '../types';
import { formatCurrencyBRL } from '../constants';
import { Checkmark3DIcon, WhatsApp3DIcon } from './ThreeDIcon';
import { Calendar, Clock, Scissors, ExternalLink, RotateCcw, Copy, Check, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SuccessViewProps {
  booking: ConfirmedBooking;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ booking, onReset }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Launch celebratory gold and black confetti
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFF2B2', '#AA771C', '#FFFFFF', '#E2E8F0'],
      });
    } catch (e) {
      console.error('Confetti error:', e);
    }

    // Try automatic WhatsApp redirection safely
    const timer = setTimeout(() => {
      try {
        window.open(booking.whatsappUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.warn('Popup blocked by browser, user can click button:', err);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [booking.whatsappUrl]);

  const handleOpenWhatsApp = () => {
    window.open(booking.whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = () => {
    const text = `Agendamento Barbearia do Vitor:\nServiço(s): ${booking.serviceName}\nData: ${booking.formattedDate} às ${booking.time}\nValor: ${formatCurrencyBRL(booking.price)}\nCliente: ${booking.customerName}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div id="booking-success-container" className="w-full max-w-xl mx-auto px-4 py-8 text-center animate-fade-in">
      {/* 3D Checkmark Medallion */}
      <div className="inline-flex items-center justify-center p-3.5 rounded-full bg-gradient-to-b from-[#1C180F] to-[#0A0A0A] border-2 border-[#D4AF37] mb-4 shadow-[0_0_40px_rgba(212,175,55,0.45)] animate-bounce-subtle">
        <Checkmark3DIcon size={68} />
      </div>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F3F4F6] font-serif tracking-tight">
        ✓ Horário reservado com sucesso!
      </h3>
      <p className="text-sm sm:text-base text-[#D4AF37] font-medium mt-1">
        Seu horário foi bloqueado em tempo real no banco de dados
      </p>

      {/* Ticket Details */}
      <div className="mt-6 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#141414] via-[#0E0E0E] to-[#070707] border-2 border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.15)] backdrop-blur-xl text-left">
        <div className="text-center pb-4 border-b border-[#D4AF37]/20">
          <span className="text-[11px] uppercase tracking-widest text-[#9CA3AF]">
            Comprovante de Reserva
          </span>
          <h4 className="text-lg sm:text-xl font-bold text-[#FFDF73] font-serif mt-0.5">
            Barbearia do Vitor
          </h4>
        </div>

        <div className="py-4 space-y-3.5 text-sm">
          {/* Services List */}
          <div>
            <div className="flex items-center justify-between text-[#9CA3AF] mb-1.5">
              <span className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#D4AF37]" />
                Serviço(s):
              </span>
              <strong className="text-[#F3F4F6] text-right font-medium">
                {booking.serviceName}
              </strong>
            </div>

            {booking.services && booking.services.length > 1 && (
              <div className="pl-6 space-y-1 text-xs text-[#9CA3AF]">
                {booking.services.map((srv) => (
                  <div key={srv.id} className="flex items-center justify-between">
                    <span>• {srv.name}</span>
                    <span>{formatCurrencyBRL(srv.price)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#9CA3AF] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              Data:
            </span>
            <strong className="text-[#F3F4F6]">{booking.formattedDate}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#9CA3AF] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              Horário:
            </span>
            <strong className="text-[#FFDF73] text-base">{booking.time}</strong>
          </div>

          {booking.totalDurationMinutes > 0 && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9CA3AF]">Duração total estimada:</span>
              <span className="text-[#D4AF37] font-semibold">~{booking.totalDurationMinutes} min</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-[#222]">
            <span className="text-[#9CA3AF]">Valor Total:</span>
            <strong className="text-xl font-black text-[#FFDF73] font-serif">
              {formatCurrencyBRL(booking.price)}
            </strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#9CA3AF]">Cliente:</span>
            <span className="text-[#E5E7EB] font-medium">{booking.customerName}</span>
          </div>

          {/* Availability Status Check Notice */}
          <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>
              Este horário ({booking.time} em {booking.formattedDate}) já está bloqueado no site como <strong>indisponível</strong> para novos agendamentos.
            </span>
          </div>
        </div>

        {/* Primary Action Button: WhatsApp */}
        <div className="mt-4 pt-4 border-t border-[#D4AF37]/20 space-y-3">
          <button
            id="success-open-whatsapp-btn"
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base tracking-wide bg-gradient-to-r from-[#22C55E] to-[#15803D] hover:from-[#4ADE80] hover:to-[#16A34A] text-white shadow-[0_8px_25px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <WhatsApp3DIcon size={26} />
            <span>ABRIR WHATSAPP</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </button>

          <p className="text-[11px] text-center text-[#9CA3AF]">
            O WhatsApp abrirá com sua mensagem pronta para confirmar. Se não abriu automaticamente, toque no botão acima.
          </p>
        </div>
      </div>

      {/* Secondary Options */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          id="btn-copy-summary"
          type="button"
          onClick={handleCopySummary}
          className="px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] text-xs font-semibold text-[#D1D5DB] border border-[#333] hover:border-[#D4AF37]/40 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#D4AF37]" />}
          <span>{copied ? 'Copiado!' : 'Copiar resumo'}</span>
        </button>

        <button
          id="btn-book-another"
          type="button"
          onClick={onReset}
          className="px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] text-xs font-semibold text-[#FFDF73] border border-[#D4AF37]/30 hover:border-[#D4AF37] flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Fazer novo agendamento</span>
        </button>
      </div>
    </div>
  );
};
