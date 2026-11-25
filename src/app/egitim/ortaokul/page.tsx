import React from 'react';
import Link from 'next/link';
import { GraduationCap, Award, Calendar, CheckCircle2, Target } from 'lucide-react';

export default function OrtaokulPage() {
  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-gradient-to-r from-[#0F2547] via-[#1A365D] to-[#1D4ED8] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-[#0F2547] text-xs font-black uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>LGS Hazırlık Odaklı Ortaokul</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Meriç Ortaokulu: Hedef Nitelikli Liseler
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            5, 6, 7 ve 8. sınıflarda güçlü akademik temel, haftalık Türkiye geneli deneme sınavları ve yeni nesil mantık muhakeme soru kamplarıyla öğrencilerimizi zirveye taşıyoruz.
          </p>
        </div>
      </div>

      {/* Visual Showcase Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl border border-slate-100 relative h-72 sm:h-96 bg-slate-900">
          <img
            src="/images/level-middle.jpg"
            alt="Meriç Ortaokulu Fen ve Deney Laboratuvarı"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
            Fen Laboratuvarı ve Deneme Salonları
          </div>
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
            Akademik Disiplin & Yüksek Başarı
          </span>
          <h2 className="text-2xl font-extrabold text-[#0F2547] font-serif">
            LGS Maratonunda Birebir Rehberlik
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Haftalık kurumsal denemeler, yapay zeka analizli soru karnesi ve branş öğretmenlerimizle soru çözüm ofisleri ile öğrencilerimiz sınav heyecanını tecrübeye dönüştürüyor.
          </p>
          <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Yılda 35+ Türkiye Geneli Kurumsal Deneme Sınavı</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Her Öğrenciye Özel Birebir Eğitim Mentoru</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Akşam Soru Çözüm ve Etüt Seansları</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0F2547]">Haftalık LGS Denemeleri</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Türkiye genelinde uygulanan kurumsal deneme sınavları ve soru çözüm saatleri ile sınav pratiği en üst seviyeye çıkarılır.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0F2547]">Birebir Öğrenci Koçluğu</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Her 8. sınıf öğrencimizin haftalık soru hedeflerini, ders çalışma planını ve motivasyonunu takip eden özel bir eğitim mentoru vardır.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0F2547]">Soru Çözüm Ofisleri</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Öğrencilerimiz yapamadıkları her soruyu branş öğretmenleriyle birebir etüt masalarında çözerek hiçbir eksik konu bırakmaz.
          </p>
        </div>
      </div>

      <div className="text-center pt-6">
        <Link
          href="/on-kayit"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-[#0F2547] bg-amber-400 hover:bg-amber-300 shadow-xl transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>Ortaokul Kayıt ve Bursluluk Sınavı Başvurusu</span>
        </Link>
      </div>
    </div>
  );
}
