import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Award,
  Users,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Target,
  Compass,
} from 'lucide-react';

export default function HakkimizdaPage() {
  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F2547] via-[#1A365D] to-[#1D4ED8] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300">
            <Building2 className="w-4 h-4" />
            <span>Biz Kimiz?</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Geleceği Şekillendiren Eğitim Mirası
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Meriç Eğitim Kurumları; çeyrek asrı aşkın birikimi, modern kampüs altyapısı ve yenilikçi eğitim modelleri ile Trakya&apos;da binlerce genci aydınlık bir geleceğe taşımaktadır.
          </p>
        </div>
      </div>

      {/* Main Story & Values */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1D4ED8]">
            Kurumsal Tarihçemiz & Vizyonumuz
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2547] font-serif">
            Köklü Deneyim, Çağdaş Dünya Standartları
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Kuruluşumuzdan bu yana temel hedefimiz; Atatürk ilkelerine bağlı, akıl ve bilimi rehber edinen, en az bir yabancı dili ana dili gibi konuşabilen ve evrensel insani değerleri benimsemiş nesiller yetiştirmektir.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Edirne, Kırklareli ve Tekirdağ kampüslerimiz ile Tekirdağ ve Lüleburgaz kurs merkezlerimizde; anaokulu çağındaki bir çocuğun ilk merak kıvılcımından, bir gencin hayalindeki üniversite amfisine adım atışına kadar her aşamada yanındayız.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
              <div className="text-2xl font-black text-[#1D4ED8]">%98.4</div>
              <div className="text-xs text-slate-600 font-semibold mt-0.5">Üniversite & Nitelikli Lise Başarısı</div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80">
              <div className="text-2xl font-black text-amber-700">150+</div>
              <div className="text-xs text-slate-600 font-semibold mt-0.5">Kıdemli Akademik Kadro</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 relative h-80 sm:h-96">
            <img
              src="/images/hero-campus.jpg"
              alt="Meriç Koleji Kampüsü ve Öğrencilerimiz"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2547]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Trakya'nın Eğitim Güvencesi</div>
                <div className="text-sm font-black text-[#0F2547]">Modern Kampüsler & Seçkin Kadro</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#0F2547] flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0F2547]">
            Misyonumuz
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Öğrencilerimizin bireysel farklılıklarını gözeterek onları akademik donanımı yüksek, analitik düşünebilen, teknoloji ve yabancı dile hakim, çevreye ve topluma duyarlı bireyler olarak yetiştirmek; Trakya&apos;dan dünyaya uzanan başarı köprüleri inşa etmektir.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0F2547]">
            Vizyonumuz
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Türkiye&apos;nin en saygın eğitim markaları (TED, Bahçeşehir, İTÜ GVO) standartlarında, dijital pedagoji ve yapay zeka destekli eğitimde öncü, öğrencilerini uluslararası düzeyde rekabete hazırlayan model bir okul ekosistemi olmaktır.
          </p>
        </div>
      </div>

      {/* Link to Org Chart */}
      <div className="bg-gradient-to-r from-blue-900 to-[#0F2547] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black font-serif">
            Hiyerarşik Kadro Yapımızı İnceleyin
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Tüm kampüslerimizin kurucu, idareci ve öğretmen kadrosunu interaktif organizasyon şemasında görüntüleyebilirsiniz.
          </p>
        </div>
        <Link
          href="/kadromuz"
          className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#0F2547] bg-amber-400 hover:bg-amber-300 transition-colors shadow-md flex items-center gap-2 flex-shrink-0"
        >
          <Users className="w-4 h-4" />
          <span>Organizasyon Şemasına Git</span>
        </Link>
      </div>
    </div>
  );
}
