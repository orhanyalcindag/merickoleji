import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-20 px-4">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-[#1D4ED8] animate-spin"></div>
        <div className="absolute w-8 h-8 rounded-full border-2 border-transparent border-b-amber-400 animate-spin animate-reverse"></div>
      </div>
      <p className="text-xs font-bold text-slate-400 mt-4 tracking-wider uppercase">
        Yükleniyor...
      </p>
    </div>
  );
}
