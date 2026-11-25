import React from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, Calendar, Heart, ShieldCheck } from 'lucide-react';

export default function AnaokuluPage() {
  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-gradient-to-r from-[#0F2547] via-[#1A365D] to-[#1D4ED8] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300">
            <Sparkles className="w-4 h-4" />
            <span>3 - 6 Yaş Erken Çocukluk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Meriç Anaokulu: Sevgiyle Büyüyen Adımlar
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Çocuklarımızın doğuştan gelen merak duygusunu besleyen, çift dilli (Bilingual) oyun temelli öğrenme ortamı ve güvenli yaşam alanları sunuyoruz.
          </p>
        </div>
      </div>

      {/* Visual Showcase Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl border border-slate-100 relative h-72 sm:h-96 bg-slate-900">
          <img
            src="/images/level-kindergarten.jpg"
            alt="Meriç Koleji Anaokulu Montessori Sınıfı"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-amber-400 text-[#0F2547] text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
            Montessori ve Oyun Alanları
          </div>
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Erken Çocuklukta Güven & Keşif
          </span>
          <h2 className="text-2xl font-extrabold text-[#0F2547] font-serif">
            Merak Eden, Üreten ve Mutlu Çocuklar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Geniş bahçe alanlarımız, organik tarım köşemiz, drama ve ritim atölyelerimizle her çocuğun kendi hızında, sevgi dolu ellerde gelişmesini sağlıyoruz.
          </p>
          <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Günde 2 Saat Native Speaker Destekli İngilizce</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Diyetisyen Onaylı Doğal ve Taze 3 Öğün Beslenme</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>7/24 Güvenlik ve Kameralı Korunaklı Kampüs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0F2547]">Çift Dilli (Bilingual) Eğitim</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            İngilizceyi bir ders olarak değil, günlük yaşamın doğal bir parçası olarak şarkılar, masallar ve oyunlarla deneyimletiyoruz.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0F2547]">Montessori & Beceri İstasyonları</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Öz bakım becerileri, el-göz koordinasyonu, duyu materyalleri ve doğa atölyeleri ile bağımsız ve özgüvenli bireyler yetiştiriyoruz.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0F2547]">PDR & Gelişim Takipleri</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Uzman gelişim psikologlarımız her öğrencimizin sosyal, duygusal ve bilişsel kilometre taşlarını düzenli gözlemleyerek velilerimizle paylaşır.
          </p>
        </div>
      </div>

      <div className="text-center pt-6">
        <Link
          href="/on-kayit"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-[#0F2547] bg-amber-400 hover:bg-amber-300 shadow-xl transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>Anaokulu Tanıtım Randevusu Al</span>
        </Link>
      </div>
    </div>
  );
}
