import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, Calendar, Award, Sparkles, Cpu, Layers } from 'lucide-react';

export default function IlkokulPage() {
  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-gradient-to-r from-[#0F2547] via-[#1A365D] to-[#1D4ED8] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-[#0F2547] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>OKULİSTİK & EYSİS Entegre İlkokul</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Meriç İlkokulu: Temelden Zirveye Güçlü Başlangıç
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            1, 2, 3 ve 4. sınıflarımızda OKULİSTİK dijital öğrenme portalı ve EYSİS (Eğitim Yönetim ve Süreç İzleme Sistemi) ile her öğrencimizin öğrenme adımlarını yapay zeka ve uzman öğretmenlerimizle takip ediyoruz.
          </p>
        </div>
      </div>

      {/* Visual Showcase Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl border border-slate-100 relative h-72 sm:h-96 bg-slate-900">
          <img
            src="/images/level-primary.jpg"
            alt="Meriç İlkokulu İnteraktif Sınıfı"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-[#1D4ED8] text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
            Akıllı Tahta & Dijital Tablet Dersi
          </div>
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">
            Çağdaş Sınıf Teknolojileri
          </span>
          <h2 className="text-2xl font-extrabold text-[#0F2547] font-serif">
            Ezberden Uzak, Kazanım Odaklı İlkokul
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Sınıflarımızda uygulanan interaktif eğitim teknolojileri, her çocuğun yaparak ve yaşayarak öğrenmesini sağlar. Kodlama ve algoritma dersleriyle temel mantık muhakeme becerileri pekiştirilir.
          </p>
          <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>OKULİSTİK Dijital Kazanım Değerlendirme</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>EYSİS ile Birebir Öğrenci Gelişim Karnesi</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Robotik Kodlama ve Satranç Kulüpleri</span>
            </div>
          </div>
        </div>
      </div>

      {/* OKULISTIK & EYSIS Showcase */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-blue-200 shadow-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F2547]">
              OKULİSTİK & EYSİS Destekli Bireysel Eğitim Modeli
            </h2>
            <p className="text-xs text-slate-500">
              Türkiye&apos;nin en güvenilir ölçme-değerlendirme altyapısı okulumuzda aktif olarak uygulanır.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
            <h4 className="font-extrabold text-[#0F2547] text-sm">Haftalık Kazanım Takibi</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Her dersin ve konunun kavranma oranı dijital testler ve soru analizleriyle haritalandırılır.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <h4 className="font-extrabold text-[#0F2547] text-sm">Birebir Telafi & Etüt</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Öğrencinin eksik kaldığı kazanımlar tespit edilir edilmez hafta içi özel etüt programıyla tamamlanır.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <h4 className="font-extrabold text-[#0F2547] text-sm">Ayrıntılı Veli Karnesi</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Velilerimiz öğrencinin haftalık konu performansını ve soru çözüm başarı grafiğini online portaldan izler.
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-base font-extrabold text-[#0F2547]">Güçlü Temel Matematik & Okuma</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hızlı okuma ve anlama teknikleri, problem çözme stratejileri ve yaratıcı yazarlık atölyeleri.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-base font-extrabold text-[#0F2547]">Cambridge Young Learners</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Haftalık 12 saat yoğun İngilizce, drama, konuşma kulüpleri ve Cambridge Starters/Movers hazırlığı.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-base font-extrabold text-[#0F2547]">Robotik Kodlama & STEM</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Blok tabanlı kodlama, algoritma mantığı ve uygulamalı fen laboratuvarı deneyleri.
          </p>
        </div>
      </div>

      <div className="text-center pt-6">
        <Link
          href="/on-kayit"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-[#0F2547] bg-amber-400 hover:bg-amber-300 shadow-xl transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>İlkokul Ön Kayıt & Bilgi Formu</span>
        </Link>
      </div>
    </div>
  );
}
