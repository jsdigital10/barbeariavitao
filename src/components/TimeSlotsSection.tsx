import React, { useEffect, useState, useCallback } from 'react';
import { BUSINESS_TIME_SLOTS } from '../constants';
import { listenToDayAvailability } from '../firebase';
import { createSlotKey, isSlotPassed } from '../utils/dateTime';
import { Clock3DIcon, Lock3DIcon } from './ThreeDIcon';
import { Check, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';

interface TimeSlotsSectionProps {
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // HH:mm
  onSelectTime: (time: string) => void;
}

export const TimeSlotsSection: React.FC<TimeSlotsSectionProps> = ({
  selectedDate,
  selectedTime,
  onSelectTime,
}) => {
  const [takenSlotKeys, setTakenSlotKeys] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [listenerError, setListenerError] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  const setupListener = useCallback(() => {
    if (!selectedDate) return () => {};

    setIsLoading(true);
    setListenerError(null);

    const unsubscribe = listenToDayAvailability(
      selectedDate,
      (takenKeys) => {
        setTakenSlotKeys(takenKeys);
        setIsLoading(false);
        setIsRefreshing(false);
        const now = new Date();
        setLastSyncTime(
          now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        );
      },
      (err) => {
        console.error('Firebase availability listener error:', err);
        setListenerError('Não foi possível sincronizar disponibilidade em tempo real.');
        setIsLoading(false);
        setIsRefreshing(false);
      }
    );

    return unsubscribe;
  }, [selectedDate]);

  useEffect(() => {
    const unsub = setupListener();
    return () => {
      unsub();
    };
  }, [setupListener]);

  // If the user's currently selected slot gets reserved in real time by someone else, deselect it immediately!
  useEffect(() => {
    if (!selectedTime) return;
    const currentKey = createSlotKey(selectedDate, selectedTime);
    if (takenSlotKeys.has(currentKey)) {
      onSelectTime('');
    }
  }, [takenSlotKeys, selectedDate, selectedTime, onSelectTime]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    // Restart listener query to pull fresh snapshot
    setupListener();
  };

  const formattedSelectedDate = selectedDate.split('-').reverse().join('/');

  return (
    <div id="time-slots-step-container" className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-[#141414] border border-[#D4AF37]/40 mb-2 shadow-[0_8px_20px_rgba(212,175,55,0.15)]">
          <Clock3DIcon size={44} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#F3F4F6] font-serif">
          Escolha seu horário
        </h3>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
          Sessões reservadas com intervalo de 45 min para atendimento pontual e exclusivo
        </p>

        {/* Real-time Status Badge + Manual Refresh */}
        <div className="flex items-center justify-center gap-2 mt-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E0E0E] border border-emerald-500/30 text-[11px] text-[#D1D5DB] shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">Ao vivo via Firebase</span>
            {lastSyncTime && (
              <span className="text-[#6B7280] hidden sm:inline">• Sincronizado às {lastSyncTime}</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleManualRefresh}
            title="Atualizar disponibilidade agora"
            className="p-1.5 rounded-full bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37]/50 text-[#9CA3AF] hover:text-[#D4AF37] transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#D4AF37]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-[#D1D5DB]">Disponível</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-red-400 font-medium">Ocupado / Indisponível</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          <span className="text-[#FFDF73] font-bold">Selecionado</span>
        </div>
      </div>

      {listenerError && (
        <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 text-xs text-center flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span>{listenerError}</span>
        </div>
      )}

      {/* 3D Slots Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`skel-${i}`}
              className="h-16 rounded-2xl bg-[#121212] animate-pulse border border-[#222]"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {BUSINESS_TIME_SLOTS.map((time) => {
            const slotKey = createSlotKey(selectedDate, time);
            const isTakenInDb = takenSlotKeys.has(slotKey);
            const isPast = isSlotPassed(selectedDate, time);
            const isOccupiedOrUnavailable = isTakenInDb || isPast;
            const isSelected = selectedTime === time;

            let statusLabel = 'Disponível';
            if (isTakenInDb) statusLabel = 'Indisponível';
            else if (isPast) statusLabel = 'Encerrado';

            return (
              <button
                key={time}
                id={`slot-btn-${slotKey}`}
                type="button"
                disabled={isOccupiedOrUnavailable}
                onClick={() => onSelectTime(time)}
                className={`relative group rounded-2xl p-3 flex flex-col items-center justify-center transition-all duration-300 select-none cursor-pointer ${
                  isOccupiedOrUnavailable
                    ? 'cursor-not-allowed bg-[#080808] border-2 border-red-950/60 text-[#6B7280] shadow-[inset_0_3px_8px_rgba(0,0,0,0.85)] opacity-60'
                    : isSelected
                    ? 'bg-gradient-to-b from-[#FFF4BD] via-[#D4AF37] to-[#8C6212] text-[#050505] font-black border-2 border-[#FFE899] shadow-[0_10px_25px_rgba(212,175,55,0.6),inset_0_1px_1px_rgba(255,255,255,0.8)] scale-105 z-10'
                    : 'bg-gradient-to-b from-[#181818] to-[#101010] hover:from-[#222019] hover:to-[#16140E] text-[#F3F4F6] border border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-[0_6px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-1 active:translate-y-0'
                }`}
              >
                {/* 3D Top Time Display */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-base sm:text-lg font-extrabold tracking-tight font-sans ${
                      isOccupiedOrUnavailable
                        ? 'line-through text-[#6B7280]'
                        : isSelected
                        ? 'text-[#050505]'
                        : 'text-[#F9FAFB]'
                    }`}
                  >
                    {time}
                  </span>
                </div>

                {/* Subtext Status Badge with 3D Lock / Check / Dot */}
                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                  {isOccupiedOrUnavailable ? (
                    <div className="flex items-center gap-1 text-red-400/90 font-extrabold">
                      <Lock3DIcon size={14} />
                      <span>{statusLabel}</span>
                    </div>
                  ) : isSelected ? (
                    <div className="flex items-center gap-1 text-[#050505] font-black">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Escolhido</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Livre</span>
                    </div>
                  )}
                </div>

                {/* Stamp overlay on unavailable */}
                {isOccupiedOrUnavailable && (
                  <div className="absolute inset-0 rounded-2xl bg-red-950/10 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Selected Time Callout Banner */}
      {selectedTime && (
        <div className="mt-6 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/15 to-[#D4AF37]/25 border border-[#D4AF37]/50 text-xs sm:text-sm text-[#E5E7EB] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>
              Horário selecionado:{' '}
              <strong className="text-[#FFDF73]">{formattedSelectedDate}</strong> às{' '}
              <strong className="text-[#FFDF73] text-base">{selectedTime}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
