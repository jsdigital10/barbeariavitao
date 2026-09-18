/**
 * Barbearia do Vitor — Agendamento Online
 * Biosite Premium de Agendamento em Tempo Real com Firebase Firestore
 * Suporte a múltiplos serviços, visual 3D cinematográfico e bloqueio em tempo real
 */

import React, { useState, useEffect, useRef } from 'react';
import { ServiceItem, ConfirmedBooking } from './types';
import {
  SERVICES,
  calculateServicesSummary,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from './constants';
import { getSaoPauloNow, createSlotKey, isValidBrazilianPhone } from './utils/dateTime';
import { testFirebaseConnection, bookSlotAtomically, SlotAlreadyBookedError } from './firebase';

import { HeaderHero } from './components/HeaderHero';
import { WorkCarousel } from './components/WorkCarousel';
import { ServicesSection } from './components/ServicesSection';
import { DatePickerSection } from './components/DatePickerSection';
import { TimeSlotsSection } from './components/TimeSlotsSection';
import { CustomerFormSection } from './components/CustomerFormSection';
import { ConfirmationStep } from './components/ConfirmationStep';
import { SuccessView } from './components/SuccessView';
import { Footer } from './components/Footer';

import {
  Scissors3DIcon,
  Calendar3DIcon,
  Clock3DIcon,
  WhatsApp3DIcon,
  Checkmark3DIcon,
} from './components/ThreeDIcon';

import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function App() {
  // Stepper State (1 to 5)
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Booking Form State - Support Multi-Select Services
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([SERVICES[0]]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Ref to smoothly scroll to booking section
  const bookingContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize date with Sao Paulo today
  useEffect(() => {
    testFirebaseConnection();
    const spNow = getSaoPauloNow();
    setSelectedDate(spNow.dateString);
  }, []);

  const scrollToBooking = () => {
    if (bookingContainerRef.current) {
      bookingContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Step Validation Helpers
  const canGoToNext = () => {
    if (step === 1) return selectedServices.length > 0;
    if (step === 2) return Boolean(selectedDate);
    if (step === 3) return Boolean(selectedTime);
    if (step === 4) return customerName.trim().length >= 2 && isValidBrazilianPhone(customerPhone);
    return true;
  };

  const handleNextStep = () => {
    if (!canGoToNext()) return;
    setErrorMessage(null);
    if (step < 5) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5);
      scrollToBooking();
    }
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5);
      scrollToBooking();
    }
  };

  // Multi-select service toggle
  const handleToggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
    // If user changes date, reset selected time
    setSelectedTime('');
    setTimeout(() => {
      setStep(3);
      scrollToBooking();
    }, 200);
  };

  const handleSelectTime = (timeStr: string) => {
    setSelectedTime(timeStr);
    if (timeStr) {
      setTimeout(() => {
        setStep(4);
        scrollToBooking();
      }, 250);
    }
  };

  // Submit Final Booking Atomically
  const handleConfirmBooking = async () => {
    if (selectedServices.length === 0 || !selectedDate || !selectedTime) {
      setErrorMessage('Por favor, selecione ao menos um serviço, data e horário.');
      return;
    }

    if (customerName.trim().length < 2) {
      setErrorMessage('Por favor, digite seu nome completo.');
      setStep(4);
      return;
    }

    if (!isValidBrazilianPhone(customerPhone)) {
      setErrorMessage('Por favor, digite um número de WhatsApp válido.');
      setStep(4);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const slotKey = createSlotKey(selectedDate, selectedTime);
    const summary = calculateServicesSummary(selectedServices);

    try {
      await bookSlotAtomically({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        serviceId: selectedServices.map((s) => s.id).join('+'),
        serviceName: summary.formattedNames,
        services: selectedServices.map((s) => ({ id: s.id, name: s.name, price: s.price })),
        totalDurationMinutes: summary.totalDurationMinutes,
        price: summary.totalPrice,
        date: selectedDate,
        time: selectedTime,
        slotKey: slotKey,
      });

      // Build real WhatsApp message per exact model
      const waMessage = buildWhatsAppMessage({
        customerName: customerName.trim(),
        serviceName: summary.formattedNames,
        services: selectedServices,
        date: selectedDate,
        time: selectedTime,
        price: summary.totalPrice,
        totalDurationMinutes: summary.totalDurationMinutes,
      });

      const waUrl = buildWhatsAppUrl(waMessage);

      setConfirmedBooking({
        appointmentId: slotKey,
        serviceName: summary.formattedNames,
        services: selectedServices,
        price: summary.totalPrice,
        totalDurationMinutes: summary.totalDurationMinutes,
        date: selectedDate,
        formattedDate: selectedDate.split('-').reverse().join('/'),
        time: selectedTime,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        whatsappUrl: waUrl,
      });

      scrollToBooking();
    } catch (err: unknown) {
      console.error('Falha ao reservar horário:', err);
      if (err instanceof SlotAlreadyBookedError) {
        setErrorMessage(
          'Ops! Esse horário acabou de ser reservado por outro cliente. 😕 Escolha outro horário disponível.'
        );
      } else {
        setErrorMessage(
          'Não foi possível concluir o agendamento. Por favor, tente novamente ou verifique sua conexão.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetBooking = () => {
    setConfirmedBooking(null);
    setErrorMessage(null);
    setSelectedTime('');
    setStep(1);
    scrollToBooking();
  };

  const stepLabels = [
    { num: 1, label: 'Serviços', icon: <Scissors3DIcon size={18} /> },
    { num: 2, label: 'Data', icon: <Calendar3DIcon size={18} /> },
    { num: 3, label: 'Horário', icon: <Clock3DIcon size={18} /> },
    { num: 4, label: 'Seus dados', icon: <WhatsApp3DIcon size={18} /> },
    { num: 5, label: 'Confirmar', icon: <Checkmark3DIcon size={18} /> },
  ];

  const summary = calculateServicesSummary(selectedServices);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] relative selection:bg-[#D4AF37]/30 selection:text-[#FFDF73]">
      {/* Background Cinematic Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-gradient-to-b from-[#D4AF37]/15 via-[#AA771C]/5 to-transparent rounded-full blur-[130px]" />
        <div className="absolute top-[800px] -left-48 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-[140px]" />
        <div className="absolute top-[1400px] -right-48 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-[140px]" />
      </div>

      {/* 1. Header & Hero with Big Transparent Logo and Direct CTA */}
      <HeaderHero onStartBooking={scrollToBooking} />

      {/* 2. Carousel of Works with 3D Accents */}
      <WorkCarousel />

      {/* 3. Booking Engine Container */}
      <main
        ref={bookingContainerRef}
        id="agendamento-section"
        className="w-full max-w-4xl mx-auto px-4 py-12 scroll-mt-6"
      >
        {confirmedBooking ? (
          /* Success Screen */
          <SuccessView booking={confirmedBooking} onReset={handleResetBooking} />
        ) : (
          <div className="space-y-8">
            {/* Elegant 3D Stepper Progress Header */}
            <div className="w-full bg-gradient-to-r from-[#121212] via-[#0E0E0E] to-[#121212] rounded-2xl p-3 sm:p-4 border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
              <div className="flex items-center justify-between gap-1 sm:gap-2">
                {stepLabels.map((item, index) => {
                  const isPassed = step > item.num;
                  const isCurrent = step === item.num;

                  return (
                    <React.Fragment key={item.num}>
                      <button
                        type="button"
                        onClick={() => {
                          // Allow jumping back to any already-completed step
                          if (item.num < step) {
                            setStep(item.num as 1 | 2 | 3 | 4 | 5);
                          }
                        }}
                        disabled={item.num > step}
                        className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all ${
                          isCurrent
                            ? 'bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#AA771C] text-[#050505] font-black shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-105'
                            : isPassed
                            ? 'text-[#FFDF73] hover:bg-[#1A1A1A] cursor-pointer'
                            : 'text-[#6B7280] cursor-not-allowed opacity-50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCurrent
                              ? 'bg-[#050505] text-[#FFDF73]'
                              : isPassed
                              ? 'bg-[#D4AF37]/25 text-[#D4AF37]'
                              : 'bg-[#222] text-[#6B7280]'
                          }`}
                        >
                          {isPassed ? <Check className="w-3 h-3 stroke-[3]" /> : item.num}
                        </div>
                        <span className="hidden md:inline text-xs font-semibold">{item.label}</span>
                      </button>

                      {index < stepLabels.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 rounded-full transition-colors ${
                            step > item.num ? 'bg-[#D4AF37]' : 'bg-[#222]'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Step View */}
            <div className="transition-all duration-300">
              {step === 1 && (
                <ServicesSection
                  selectedServices={selectedServices}
                  onToggleService={handleToggleService}
                  onContinue={() => {
                    if (selectedServices.length > 0) {
                      setStep(2);
                      scrollToBooking();
                    }
                  }}
                />
              )}

              {step === 2 && (
                <DatePickerSection
                  selectedDate={selectedDate}
                  onSelectDate={handleSelectDate}
                />
              )}

              {step === 3 && (
                <TimeSlotsSection
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSelectTime={handleSelectTime}
                />
              )}

              {step === 4 && (
                <CustomerFormSection
                  customerName={customerName}
                  customerPhone={customerPhone}
                  onChangeName={setCustomerName}
                  onChangePhone={setCustomerPhone}
                />
              )}

              {step === 5 && selectedServices.length > 0 && (
                <ConfirmationStep
                  services={selectedServices}
                  totalPrice={summary.totalPrice}
                  totalDurationMinutes={summary.totalDurationMinutes}
                  date={selectedDate}
                  time={selectedTime}
                  customerName={customerName}
                  customerPhone={customerPhone}
                  isSubmitting={isSubmitting}
                  errorMessage={errorMessage}
                  onConfirm={handleConfirmBooking}
                  onBackToSlots={() => setStep(3)}
                />
              )}
            </div>

            {/* Stepper Navigation Buttons */}
            {step < 5 && (
              <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20 max-w-xl mx-auto">
                <button
                  id="stepper-back-btn"
                  type="button"
                  onClick={handlePrevStep}
                  disabled={step === 1}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                    step === 1
                      ? 'opacity-0 pointer-events-none'
                      : 'text-[#D1D5DB] hover:text-[#FFF] bg-[#121212] hover:bg-[#1E1E1E] border border-[#333] cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  id="stepper-next-btn"
                  type="button"
                  onClick={handleNextStep}
                  disabled={!canGoToNext()}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    canGoToNext()
                      ? 'bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#AA771C] text-[#050505] shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95'
                      : 'bg-[#181818] text-[#6B7280] border border-[#2A2A2A] cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
