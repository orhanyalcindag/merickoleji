import React from 'react';
import Link from 'next/link';
import { Handshake, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AnlasmaliKurumlarPage() {
  const partners = [
    { name: 'Trakya Üniversitesi', type: 'Akademik İş Birliği ve Laboratuvar Kullanımı' },
    { name: 'Edirne Ticaret ve Sanayi Odası (ETSO)', type: 'Kurumsal İndirim ve Eğitim Protokolü' },
    { name: 'Tekirdağ Ticaret ve Sanayi Odası (TTSO)', type: 'Kurumsal İndirim ve Burs Protokolü' },
    { name: 'Kırklareli Ticaret ve Sanayi Odası (KTSO)', type: 'Kurumsal İş Birliği Anlaşması' },
    { name: 'Edirne Barosu & Tekirdağ Barosu', type: 'Meslek Mensuplarına Özel Eğitim İndirimi' },
    { name: 'Trakya Tabip Odası', type: 'Sağlık Çalışanlarına Özel Eğitim Protokolü' },
    { name: 'OKULİSTİK Dijital Öğrenme Ağı', type: 'Eğitim Teknolojileri ve Ölçme Değerlendirme' },
    { name: 'Cambridge University Press & Assessment', type: 'Uluslararası Yabancı Dil Sınav Merkezi' },
  ];

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-gradient-to-r from-[#0F2547] via-[#1A365D] to-[#1D4ED8] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300">
            <Handshake className="w-4 h-4" />
            <span>İş Birliklerimiz</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Anlaşmalı Kurumlar & Protokoller
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Meriç Eğitim Kurumları; Trakya&apos;nın saygın kamu kurumları, üniversiteleri, meslek odaları ve uluslararası akreditasyon kuruluşlarıyla güçlü iş birliği protokolleri yürütmektedir.
          </p>
        </div>
      </div>

      {/* International Accreditation Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl border border-slate-100 relative h-72 sm:h-80 bg-slate-900">
          <img
            src="/images/news-cambridge.jpg"
            alt="Cambridge & Oxford Uluslararası Dil Diplomaları"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-amber-400 text-[#0F2547] text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
            Cambridge Yetkili Sınav Merkezi
          </div>
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">
            Küresel Geçerlilikte Sertifikasyon
          </span>
          <h2 className="text-2xl font-extrabold text-[#0F2547] font-serif">
            Dünya Standartlarında İngilizce Eğitimi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Meriç Koleji, Cambridge Assessment English resmi hazırlık merkezidir. Öğrencilerimiz Starters, Movers, Flyers, KET, PET ve FCE sınavlarına kendi okullarında girerek ömür boyu geçerli uluslararası dil diplomalarını alır.
          </p>
          <div className="space-y-2 pt-1 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Avrupa Ortak Dil Çerçevesi (CEFR) Uyumlu</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Yurt Dışı Üniversite ve Vize Başvurularında Muafiyet</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {partners.map((p, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-[#0F2547]">
              {p.name}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {p.type}
            </p>
            <div className="pt-2 text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Aktif Kurumsal Protokol</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
