import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CAROUSEL_IMAGES } from '../constants';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const WorkCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = CAROUSEL_IMAGES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay management
  useEffect(() => {
    if (isPaused) return;

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      setTimeout(() => setIsPaused(false), 2000);
      return;
    }

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <section id="trabalhos-section" className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Galeria Exclusiva</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F3F4F6] tracking-tight font-serif">
          Conheça alguns dos nossos trabalhos
        </h2>
        <p className="text-sm sm:text-base text-[#9CA3AF] mt-2 max-w-lg mx-auto">
          Precisão em cada corte, alinhamento impecável e acabamento de alto padrão.
        </p>
      </div>

      {/* Main Carousel Card with Glassmorphism & Gold Highlights */}
      <div
        id="work-carousel-container"
        className="relative group rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0A0A]/90 border border-[#D4AF37]/25 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Viewport */}
        <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden bg-[#080808]">
          {CAROUSEL_IMAGES.map((src, index) => {
            const isActive = index === currentIndex;
            const isPrev = (currentIndex - 1 + total) % total === index;
            const isNext = (currentIndex + 1) % total === index;

            return (
              <div
                key={src}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                  isActive
                    ? 'opacity-100 scale-100 z-20 pointer-events-auto'
                    : isPrev || isNext
                    ? 'opacity-0 scale-95 z-10 pointer-events-none'
                    : 'opacity-0 scale-90 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={src}
                  alt={`Trabalho Barbearia do Vitor ${index + 1}`}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover object-center select-none"
                />
                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30 pointer-events-none" />
                <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
              </div>
            );
          })}

          {/* Navigation Controls */}
          <button
            id="carousel-btn-prev"
            type="button"
            onClick={prevSlide}
            aria-label="Foto anterior"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-[#050505]/70 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#050505] border border-[#D4AF37]/30 transition-all duration-300 backdrop-blur-md cursor-pointer shadow-lg active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            id="carousel-btn-next"
            type="button"
            onClick={nextSlide}
            aria-label="Próxima foto"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-[#050505]/70 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#050505] border border-[#D4AF37]/30 transition-all duration-300 backdrop-blur-md cursor-pointer shadow-lg active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Bottom Indicators & Label */}
          <div className="absolute bottom-4 inset-x-0 z-30 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050505]/70 backdrop-blur-md border border-[#D4AF37]/20">
              {CAROUSEL_IMAGES.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  id={`carousel-indicator-${i}`}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Ir para foto ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? 'w-6 bg-gradient-to-r from-[#D4AF37] to-[#FFF2B2] shadow-[0_0_10px_rgba(212,175,55,0.8)]'
                      : 'w-2 bg-[#4B5563]/60 hover:bg-[#9CA3AF]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
