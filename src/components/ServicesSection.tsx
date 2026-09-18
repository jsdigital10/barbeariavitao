import React from 'react';
import { ServiceItem } from '../types';
import { SERVICES, formatCurrencyBRL, calculateServicesSummary } from '../constants';
import {
  Scissors3DIcon,
  Beard3DIcon,
  Combo3DIcon,
  Eyebrow3DIcon,
  Straightening3DIcon,
  Checkmark3DIcon,
  Sparkle3DIcon,
} from './ThreeDIcon';
import { Check, Clock, Plus, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
  onContinue: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServices,
  onToggleService,
  onContinue,
}) => {
  const renderIcon = (type: ServiceItem['iconType']) => {
    switch (type) {
      case 'haircut':
        return <Scissors3DIcon size={44} />;
      case 'beard':
        return <Beard3DIcon size={44} />;
      case 'combo':
        return <Combo3DIcon size={44} />;
      case 'eyebrow':
        return <Eyebrow3DIcon size={44} />;
      case 'straightening':
        return <Straightening3DIcon size={44} />;
      default:
        return <Scissors3DIcon size={44} />;
    }
  };

  const summary = calculateServicesSummary(selectedServices);
  const hasSelection = selectedServices.length > 0;

  return (
    <div id="services-step-container" className="w-full relative pb-16">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141414] border border-[#D4AF37]/30 text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-[#FFDF73]" />
          <span>Multi-seleção liberada</span>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F3F4F6] font-serif">
          Escolha um ou mais serviços
        </h3>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1 max-w-md mx-auto">
          Você pode combinar serviços (Ex: Corte + Barba ou Sobrancelha). Toque para marcar ou desmarcar.
        </p>
      </div>

      {/* Services Grid with 3D Bevels and Perspective */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {SERVICES.map((service) => {
          const isSelected = selectedServices.some((s) => s.id === service.id);

          return (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => onToggleService(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggleService(service);
                }
              }}
              className={`relative group rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-300 cursor-pointer text-left flex flex-col justify-between select-none ${
                isSelected
                  ? 'bg-gradient-to-br from-[#1C180F] via-[#12110C] to-[#0A0A0A] border-2 border-[#D4AF37] shadow-[0_12px_35px_rgba(212,175,55,0.25),inset_0_1px_1px_rgba(255,242,178,0.4)] scale-[1.015] z-10'
                  : 'bg-[#0E0E0E]/90 hover:bg-[#141414] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 shadow-[0_8px_20px_rgba(0,0,0,0.6)] hover:-translate-y-1'
              }`}
            >
              {/* Discount Badge */}
              {service.discountBadge && (
                <div className="absolute -top-2.5 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#050505] text-[10px] font-black tracking-wider uppercase shadow-[0_4px_12px_rgba(212,175,55,0.4)] flex items-center gap-1 z-20">
                  <Sparkle3DIcon size={12} />
                  <span>{service.discountBadge}</span>
                </div>
              )}

              {/* Card Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  {/* 3D Icon Vessel */}
                  <div
                    className={`shrink-0 p-2.5 rounded-2xl transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#2A2415] to-[#14120B] border border-[#D4AF37]/60 shadow-[0_4px_15px_rgba(212,175,55,0.3)]'
                        : 'bg-[#141414] border border-[#262626] group-hover:border-[#D4AF37]/30'
                    }`}
                  >
                    {renderIcon(service.iconType)}
                  </div>

                  <div>
                    <span
                      className={`text-[10px] sm:text-[11px] uppercase tracking-wider font-bold ${
                        isSelected ? 'text-[#FFDF73]' : 'text-[#D4AF37]'
                      }`}
                    >
                      {service.category}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#F3F4F6] mt-0.5 font-serif group-hover:text-[#FFDF73] transition-colors">
                      {service.name}
                    </h4>
                    <p className="text-xs text-[#9CA3AF] mt-1 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* 3D Checkbox Medallion */}
                <div className="shrink-0 pt-0.5">
                  <div
                    className={`w-6 h-6 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#AA771C] border-[#FFEBB0] text-[#050505] shadow-[0_0_12px_rgba(212,175,55,0.8)] scale-110'
                        : 'border-[#333333] bg-[#141414] text-transparent group-hover:border-[#D4AF37]/50 group-hover:text-[#D4AF37]/30'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* Price & Duration Strip */}
              <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{service.durationMinutes} min</span>
                </div>

                <div className="text-right">
                  {service.originalPrice ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-[#6B7280] line-through">
                        {formatCurrencyBRL(service.originalPrice)}
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-[#FFDF73] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                        {formatCurrencyBRL(service.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-base sm:text-lg font-extrabold text-[#F3F4F6] group-hover:text-[#FFDF73] transition-colors">
                      {formatCurrencyBRL(service.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3D Floating Multi-Select Summary Bar */}
      {hasSelection && (
        <div className="sticky bottom-4 z-30 mt-8 max-w-2xl mx-auto px-2 animate-fade-in">
          <div className="rounded-2xl p-4 sm:p-5 bg-[#0C0C0C]/95 border-2 border-[#D4AF37]/60 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.2)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3.5">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#D4AF37] text-[#050505] text-[10px] font-black uppercase">
                  {selectedServices.length}{' '}
                  {selectedServices.length === 1 ? 'Serviço' : 'Serviços'}
                </span>
                <span className="text-xs text-[#9CA3AF] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  ~{summary.totalDurationMinutes} min
                </span>
              </div>
              <p className="text-sm font-bold text-[#F3F4F6] mt-1 truncate max-w-xs font-serif">
                {summary.formattedNames}
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] block">
                  Total
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#FFDF73] font-serif drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                  {formatCurrencyBRL(summary.totalPrice)}
                </span>
              </div>

              <button
                id="btn-continue-from-services"
                type="button"
                onClick={onContinue}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#AA771C] text-[#050505] font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Avançar para Data</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
