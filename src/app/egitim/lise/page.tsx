import React from 'react';
import Link from 'next/link';
import { Award, Calendar, CheckCircle2, Trophy, Compass } from 'lucide-react';

export default function LisePage() {
  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-gradient-to-r from-[#0F2547] via-[#1A365D] to-[#1D4ED8] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-[#0F2547] text-xs font-black uppercase tracking-wider">
            <Trophy className="w-4 h-4" />
            <span>YKS & Üniversite Hazırlık Odaklı</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Meriç Anadolu Lisesi: Hayalindeki Üniversiteye Adım At
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            9 ve 10. sınıfta derinlemesine akademik temel; 11 ve 12. sınıfta TYT-AYT sınav kampları, soru çözüm seansları ve profesyonel kariyer danışmanlığı.
          </p>
        </div>
      </div>

      {/* Visual Showcase Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl border border-slate-100 relative h-72 sm:h-96 bg-slate-900">
          <img
            src="/images/level-highschool.jpg"
            alt="Meriç Anadolu Lisesi Çalışma Alanı"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
            Üniversite Hazırlık & Bireysel Çalışma Alanları
          </div>
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            YKS & Küresel Vizyon
          </span>
          <h2 className="text-2xl font-extrabold text-[#0F2547] font-serif">
            Geleceğini İnşa Eden Genç Liderler
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Akademik derinlik, soru çözüm kampları, üniversite kariyer panelleri ve uluslararası yabancı dil sertifikasyonları ile öğrencilerimiz hayallerindeki fakültelere ulaşıyor.
          </p>
          <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>TYT ve AYT Türkiye Geneli Seri Denemeleri</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Yarıyıl ve Bahar Kampı Hızlandırma Programları</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Tıp, Mühendislik ve Hukuk Odaklı Tercih Koçluğu</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0F2547]">TYT - AYT Yoğun Kampları</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            ÖSYM sınav formatına birebir uyumlu denemeler, gece etütleri, soru çözüm kulüpleri ve hızlandırma programları.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0F2547]">Kariyer & Tercih Danışmanlığı</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tıp, Mühendislik, Hukuk ve Mimarlık fakültelerine yönelik üniversite tanıtım gezileri, mezun buluşmaları ve uzman rehberlik desteği.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0F2547]">Uluslararası MUN & Erasmus</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Dünya sorunlarına çözüm üreten Model United Nations kulübü ve Avrupa Birliği öğrenci değişim projeleri.
          </p>
        </div>
      </div>

      <div className="text-center pt-6">
        <Link
          href="/on-kayit"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-[#0F2547] bg-amber-400 hover:bg-amber-300 shadow-xl transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>Anadolu Lisesi Ön Kayıt ve Bursluluk Başvurusu</span>
        </Link>
      </div>
    </div>
  );
}
