import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Calendar, Phone, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="max-w-xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-xl">
        {/* Visual Badge */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#1D4ED8] text-xs font-black uppercase tracking-wider border border-blue-100">
            <span>404 • Sayfa Bulunamadı</span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-black text-[#0F2547] font-serif tracking-tight">
            404
          </h1>

          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2547]">
            Aradığınız Sayfaya Ulaşılamadı
          </h2>

          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Aramış olduğunuz bağlantı güncellenmiş, taşınmış veya adresi hatalı yazılmış olabilir. Aşağıdaki hızlı bağlantıları kullanarak dilediğiniz bölüme kolayca ulaşabilirsiniz.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0F2547] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <Link
            href="/on-kayit"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-[#0F2547] font-bold text-sm shadow-md transition-all duration-200"
          >
            <Calendar className="w-4 h-4" />
            <span>Ön Kayıt / Randevu</span>
          </Link>
        </div>

        {/* Helper footer */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500">
          <Link href="/kampusler" className="hover:text-[#1D4ED8] font-semibold transition-colors">
            Kampüslerimiz
          </Link>
          <span>•</span>
          <Link href="/kadromuz" className="hover:text-[#1D4ED8] font-semibold transition-colors">
            Kadromuz
          </Link>
          <span>•</span>
          <Link href="/iletisim" className="hover:text-[#1D4ED8] font-semibold transition-colors">
            İletişim & Ulaşım
          </Link>
        </div>
      </div>
    </div>
  );
}
