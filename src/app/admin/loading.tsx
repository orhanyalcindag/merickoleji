import React from 'react';

export default function AdminLoading() {
  return (
    <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
      <div className="w-10 h-10 rounded-full border-3 border-slate-200 border-t-[#1D4ED8] animate-spin"></div>
      <div className="text-xs font-bold text-slate-400 tracking-wider">
        Yönetim Verileri Yükleniyor...
      </div>
    </div>
  );
}
