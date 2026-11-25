'use client';

import React from 'react';
import { WhatsAppIcon } from './SocialIcons';

export default function FloatingActions() {
  return (
    <aside aria-label="Hızlı WhatsApp İletişim" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/902822620200"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-emerald-400/20"
        aria-label="WhatsApp Danışma Hattı"
        title="WhatsApp Danışma Hattı"
      >
        {/* Subtle pulsing background ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-25 animate-ping pointer-events-none"></span>

        {/* Official Flawless WhatsApp Icon */}
        <WhatsAppIcon className="w-7 h-7 relative z-10" />

        {/* Hover Tooltip (desktop) */}
        <span className="hidden sm:group-hover:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#0F2547] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap items-center gap-1.5 pointer-events-none border border-slate-700">
          <span>WhatsApp Danışma Hattı</span>
        </span>
      </a>
    </aside>
  );
}
