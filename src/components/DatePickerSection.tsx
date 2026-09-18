import React, { useState } from 'react';
import { getSaoPauloNow, isDateInPast } from '../utils/dateTime';
import { Calendar3DIcon } from './ThreeDIcon';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface DatePickerSectionProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (dateStr: string) => void;
}

export const DatePickerSection: React.FC<DatePickerSectionProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const nowSP = getSaoPauloNow();

  // Internal month view state
  const [currentYear, setCurrentYear] = useState(nowSP.year);
  const [currentMonth, setCurrentMonth] = useState(nowSP.month); // 1-12

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const weekDayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Days in month calculation
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayWeekIndex = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0 = Sunday

  // Navigation
  const prevMonth = () => {
    // Prevent navigating to a month before current month/year
    if (currentYear === nowSP.year && currentMonth <= nowSP.month) return;

    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const isPrevDisabled = currentYear === nowSP.year && currentMonth <= nowSP.month;

  // Quick shortcuts calculation
  const todayStr = nowSP.dateString;

  // Tomorrow calculation
  const tomorrowDateObj = new Date(nowSP.year, nowSP.month - 1, nowSP.day + 1);
  const tomorrowStr = `${tomorrowDateObj.getFullYear()}-${String(
    tomorrowDateObj.getMonth() + 1
  ).padStart(2, '0')}-${String(tomorrowDateObj.getDate()).padStart(2, '0')}`;

  return (
    <div id="date-picker-step-container" className="w-full max-w-xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 mb-2">
          <Calendar3DIcon size={40} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#F3F4F6] font-serif">
          Qual dia fica melhor para você?
        </h3>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
          Selecione uma data para verificar os horários disponíveis
        </p>
      </div>

      {/* Quick Select Buttons */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-5">
        <button
          id="btn-quick-today"
          type="button"
          onClick={() => {
            onSelectDate(todayStr);
            setCurrentMonth(nowSP.month);
            setCurrentYear(nowSP.year);
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
            selectedDate === todayStr
              ? 'bg-[#D4AF37] text-[#050505] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
              : 'bg-[#121212] text-[#E5E7EB] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
          }`}
        >
          Hoje ({String(nowSP.day).padStart(2, '0')}/{String(nowSP.month).padStart(2, '0')})
        </button>

        <button
          id="btn-quick-tomorrow"
          type="button"
          onClick={() => {
            onSelectDate(tomorrowStr);
            setCurrentMonth(tomorrowDateObj.getMonth() + 1);
            setCurrentYear(tomorrowDateObj.getFullYear());
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
            selectedDate === tomorrowStr
              ? 'bg-[#D4AF37] text-[#050505] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
              : 'bg-[#121212] text-[#E5E7EB] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
          }`}
        >
          Amanhã (
          {String(tomorrowDateObj.getDate()).padStart(2, '0')}/
          {String(tomorrowDateObj.getMonth() + 1).padStart(2, '0')})
        </button>
      </div>

      {/* Calendar Card */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-[#0D0D0D]/90 border border-[#D4AF37]/25 shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        {/* Month Header Navigation */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D4AF37]/15">
          <button
            id="cal-prev-month-btn"
            type="button"
            onClick={prevMonth}
            disabled={isPrevDisabled}
            className={`p-2 rounded-xl border border-[#D4AF37]/20 transition-all ${
              isPrevDisabled
                ? 'opacity-30 cursor-not-allowed text-[#6B7280]'
                : 'hover:bg-[#D4AF37]/20 text-[#D4AF37] cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <span className="text-base sm:text-lg font-bold text-[#F3F4F6] font-serif tracking-wide">
              {monthNames[currentMonth - 1]} {currentYear}
            </span>
          </div>

          <button
            id="cal-next-month-btn"
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-xl border border-[#D4AF37]/20 hover:bg-[#D4AF37]/20 text-[#D4AF37] transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDayHeaders.map((dayName, idx) => (
            <div
              key={dayName}
              className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider py-1 ${
                idx === 0 || idx === 6 ? 'text-[#D4AF37]/70' : 'text-[#9CA3AF]'
              }`}
            >
              {dayName}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {/* Empty prefix slots */}
          {Array.from({ length: firstDayWeekIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(
              dayNum
            ).padStart(2, '0')}`;

            const isPast = isDateInPast(dayStr);
            const isSelected = selectedDate === dayStr;
            const isToday = dayStr === nowSP.dateString;

            return (
              <button
                key={dayStr}
                id={`cal-day-${dayStr}`}
                type="button"
                disabled={isPast}
                onClick={() => onSelectDate(dayStr)}
                className={`aspect-square rounded-xl sm:rounded-2xl flex flex-col items-center justify-center relative transition-all duration-200 text-xs sm:text-sm font-semibold cursor-pointer ${
                  isPast
                    ? 'opacity-25 cursor-not-allowed text-[#6B7280] bg-[#111111]/30'
                    : isSelected
                    ? 'bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#AA771C] text-[#050505] font-black shadow-[0_0_20px_rgba(212,175,55,0.6)] scale-105 z-10'
                    : 'bg-[#141414] hover:bg-[#202020] text-[#E5E7EB] hover:text-[#FFF] border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 active:scale-95'
                }`}
              >
                <span>{dayNum}</span>

                {isToday && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] absolute bottom-1.5 shadow-[0_0_6px_#D4AF37]" />
                )}

                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#050505] absolute bottom-1.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Indicator */}
      {selectedDate && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#E5E7EB]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>
              Data selecionada:{' '}
              <strong className="text-[#FFDF73]">
                {selectedDate.split('-').reverse().join('/')}
              </strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
