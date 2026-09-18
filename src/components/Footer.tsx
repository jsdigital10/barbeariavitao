import React from 'react';
import { BARBERSHOP_NAME } from '../constants';
import { Clock, Sparkles, CalendarCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#D4AF37]/20 bg-[#070707] py-12 px-4 mt-16 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Brand Name */}
        <div>
          <div className="inline-flex items-center gap-2 mb-2 text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-semibold">Exclusividade & Tradição</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#F3F4F6] font-serif">
            {BARBERSHOP_NAME}
          </h3>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1 italic">
            “Estilo, cuidado e horário reservado para você.”
          </p>
        </div>

        {/* Operating Hours Card - No Direct WhatsApp */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-6 py-4 rounded-2xl bg-[#0E0E0E] border border-[#D4AF37]/25 shadow-md">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#E5E7EB]">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>
              Horário de atendimento:{' '}
              <strong className="text-[#FFDF73]">08:00 às 19:00</strong>
            </span>
          </div>

          <div className="hidden sm:block w-px h-5 bg-[#333]" />

          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#9CA3AF]">
            <CalendarCheck className="w-4 h-4 text-emerald-400" />
            <span>Agendamentos exclusivos pelo site</span>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-4 border-t border-[#1C1C1C] text-[11px] text-[#6B7280]">
          <p>© {new Date().getFullYear()} {BARBERSHOP_NAME}. Todos os direitos reservados.</p>
          <p className="mt-1">Agendamento online seguro e em tempo real conectado ao Firebase.</p>
        </div>
      </div>
    </footer>
  );
};
