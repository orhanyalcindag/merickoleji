'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { NewsItem } from '@/lib/types';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowRight,
  Award,
  Sparkles,
  BookOpen,
  Volume2,
  Pause,
  Play,
} from 'lucide-react';

interface TopNewsSliderProps {
  newsItems: NewsItem[];
}

export default function TopNewsSlider({ newsItems }: TopNewsSliderProps) {
  // Only news & successes for the top slider
  const sliderItems = newsItems.filter(
    (item) => item.type === 'haber' || item.type === 'basari' || item.is_featured === 1
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = sliderItems.length || 1;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused || sliderItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderItems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, sliderItems.length]);

  if (sliderItems.length === 0) return null;

  const current = sliderItems[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderItems.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      // Swiped left -> next
      handleNext();
    } else if (diff < -50) {
      // Swiped right -> prev
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 shadow-2xl border border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image with Dark Vignette */}
      <div className="relative h-[480px] sm:h-[520px] lg:h-[580px] w-full overflow-hidden">
        {sliderItems.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transform scale-100 animate-in zoom-in-105 duration-10000"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/hero-campus.jpg';
                }}
              />
              {/* Luxury Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1930] via-[#0F2547]/75 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1930]/90 via-[#0A1930]/60 to-transparent"></div>
            </div>
          );
        })}

        {/* Content Container (Overlay on top of active slide) */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-12 flex flex-col justify-end pb-14 sm:pb-16">
          <div className="max-w-3xl space-y-3 sm:space-y-4 text-white">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-amber-400 text-[#0F2547] shadow-lg">
                {current.type === 'basari' ? (
                  <>
                    <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Gurur Tablomuz</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Öne Çıkan Haber</span>
                  </>
                )}
              </span>

              {current.branch_id !== 'all' && (
                <span className="text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-white backdrop-blur-md uppercase tracking-wide">
                  {current.branch_id} Kampüsü
                </span>
              )}

              <span className="text-[10px] sm:text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                <span>{current.date}</span>
              </span>
            </div>

            {/* Slide Title */}
            <h2 className="text-xl sm:text-3xl lg:text-5xl font-black font-serif leading-snug sm:leading-tight tracking-tight drop-shadow-md">
              <Link href={`/haberler/${current.id}`} className="hover:text-amber-300 transition-colors">
                {current.title}
              </Link>
            </h2>

            {/* Summary */}
            <p className="text-xs sm:text-base text-slate-200 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl font-light">
              {current.summary}
            </p>

            {/* Action Button & Slider Controls */}
            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-4">
              <Link
                href={`/haberler/${current.id}`}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-[#0F2547] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-400/20 hover:-translate-y-0.5 transition-all"
              >
                <span>Haberin Detayını Oku</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>

              <Link
                href="/haberler"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
              >
                <span>Tüm Bülten</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-black/40 hover:bg-amber-400 hover:text-[#0F2547] text-white backdrop-blur-md flex items-center justify-center border border-white/10 transition-all"
          aria-label="Önceki Haber"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-black/40 hover:bg-amber-400 hover:text-[#0F2547] text-white backdrop-blur-md flex items-center justify-center border border-white/10 transition-all"
          aria-label="Sonraki Haber"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Bar: Indicators & Counter */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-12 z-30 flex items-center gap-2.5 sm:gap-4 bg-black/60 backdrop-blur-md px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-white/10">
          {/* Pause / Play toggle */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-slate-300 hover:text-amber-400 transition-colors"
            title={isPaused ? 'Otomatik Oynat' : 'Durdur'}
          >
            {isPaused ? <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {sliderItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-4 sm:w-6 h-1.5 sm:h-2 bg-amber-400'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slayt ${idx + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="font-mono text-[10px] sm:text-xs font-bold text-amber-300 pl-1 border-l border-white/20">
            0{currentIndex + 1} / 0{total}
          </div>
        </div>
      </div>
    </div>
  );
}
