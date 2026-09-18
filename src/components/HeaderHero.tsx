import React from 'react';
import { LOGO_URL, BARBERSHOP_TAGLINE, BARBERSHOP_SUBTITLE } from '../constants';
import { Calendar3DIcon } from './ThreeDIcon';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeaderHeroProps {
  onStartBooking: () => void;
}

export const HeaderHero: React.FC<HeaderHeroProps> = ({ onStartBooking }) => {
  return (
    <header className="relative w-full overflow-hidden pt-8 pb-12 px-4 flex flex-col items-center text-center">
      {/* Cinematic Golden Ambient Glow behind Logo */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[#D4AF37]/15 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none -z-10" />

      {/* Subtle Floating Gold Particle Accents */}
      <div className="absolute top-12 left-1/4 w-1.5 h-1.5 rounded-full bg-[#FFDF73] opacity-70 blur-[0.5px] animate-float pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-2 h-2 rounded-full bg-[#D4AF37] opacity-60 blur-[0.5px] animate-float-delay pointer-events-none" />

      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101010]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-md shadow-md animate-fade-in">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Agendamento Online Oficial</span>
      </div>

      {/* Main Logo Container - BIG, Transparent, Fade + Light Zoom + Subtle Gold Glow */}
      <div className="relative group max-w-[280px] sm:max-w-sm md:max-w-md w-full my-2 transition-all duration-700 ease-out animate-logo-entrance">
        {/* Soft Radial Gold Halo strictly behind PNG */}
        <div className="absolute inset-0 bg-radial-gradient from-[#D4AF37]/20 via-transparent to-transparent opacity-80 blur-2xl -z-10" />

        <img
          src={LOGO_URL}
          alt="Barbearia do Vitor"
          className="w-full h-auto object-contain drop-shadow-[0_10px_35px_rgba(212,175,55,0.25)] select-none hover:scale-[1.02] transition-transform duration-500"
          loading="eager"
          decoding="sync"
        />
      </div>

      {/* Tagline & Subtitle */}
      <div className="mt-4 max-w-xl mx-auto space-y-2.5">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#F9FAFB] tracking-tight font-serif">
          {BARBERSHOP_TAGLINE}
        </h1>
        <p className="text-sm sm:text-base text-[#9CA3AF] font-light max-w-md mx-auto leading-relaxed">
          {BARBERSHOP_SUBTITLE}
        </p>
      </div>

      {/* Main Primary CTA Button */}
      <div className="mt-7">
        <button
          id="hero-agendar-agora-btn"
          type="button"
          onClick={onStartBooking}
          className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#AA771C] text-[#050505] font-extrabold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.35),0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-98 cursor-pointer"
        >
          <Calendar3DIcon size={28} className="group-hover:rotate-6 transition-transform duration-300" />
          <span>AGENDAR AGORA</span>
          <ArrowDown className="w-4 h-4 ml-1 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </header>
  );
};
