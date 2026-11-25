'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({
  variant = 'dark',
  className = '',
  showText = true,
  size = 'md',
}: LogoProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-[#0F2547]' : 'text-white';
  const subTextColor = isDark ? 'text-[#1D4ED8]' : 'text-amber-400';

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  };

  return (
    <Link href="/" className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Original School Logo Image */}
      <div className={`relative ${sizeClasses[size]} flex-shrink-0 flex items-center justify-center`}>
        <img
          src="/logo.png"
          alt="Meriç Eğitim Kurumları Logo"
          className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to SVG if image file is loading
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={`text-lg sm:text-xl font-black tracking-tight font-serif ${textColor} group-hover:text-[#1D4ED8] transition-colors`}
          >
            MERİÇ KOLEJİ
          </span>
          <span
            className={`text-[9px] sm:text-[10px] tracking-widest uppercase font-extrabold ${subTextColor}`}
          >
            EĞİTİM KURUMLARI
          </span>
        </div>
      )}
    </Link>
  );
}
