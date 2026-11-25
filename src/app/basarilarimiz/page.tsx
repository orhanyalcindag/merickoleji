import React from 'react';
import Link from 'next/link';
import { Award, Trophy, Star, CheckCircle2, Calendar } from 'lucide-react';

export default function BasarilarimizPage() {
  const successes = [
    {
      category: '2025 YKS Derecelerimiz',
      items: [
        'Türkiye 142.si - İTÜ Bilgisayar Mühendisliği',
        'Türkiye 318.si - Boğaziçi Üniversitesi Endüstri Mühendisliği',
        'Türkiye 520.si - Hacettepe Üniversitesi Tıp Fakültesi',
        'Türkiye 840.si - Koç Üniversitesi Hukuk Fakültesi (Tam Burslu)',
        'İlk 10.000\'de 48 Derece Öğrencimiz',
      ],
    },
    {
      category: '2025 LGS Derecelerimiz',
      items: [
        '500 Tam Puan ile Türkiye 1.liği (Edirne ve Tekirdağ)',
        '%0.01 - %1.00 Diliminde 34 Öğrenci',
        'Galatasaray, Kabataş Erkek ve İstanbul Erkek Liselerine Yerleşen 8 Öğrenci',
        'Trakya Bölgesi Fen Liselerine Yerleşen 76 Öğrenci',
      ],
    },
    {
      category: 'Bilim, Robotik & TEKNOFEST',
      items: [
        'TEKNOFEST Çevre ve Enerji Teknolojileri Bölge 1.liği',
        'FLL (FIRST LEGO League) Robotik Tasarım Şampiyonluğu',
        'TÜBİTAK Ortaokul ve Lise Araştırma Projeleri 4 Bölge Derecesi',
      ],
    },
    {
      category: 'Yabancı Dil & Uluslararası Başarılar',
      items: [
        'Cambridge ESOL Sınavlarında %98.2 Üstün Başarı Oranı',
        'Avrupa Dil Pasaportu (CEFR B2-C1 Düzeyi) Sahibi Mezunlar',
        'MUN (Model United Nations) En İyi Delege Ödülleri',
      ],
    },
  ];

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F2547] via-[#1A365D] to-[#1D4ED8] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Gurur Tablomuz</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Akademik, Bilimsel ve Kültürel Başarılarımız
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Meriç Eğitim Kurumları öğrencileri, edindikleri disiplin ve aldıkları üst düzey rehberlik sayesinde her yıl Türkiye genelindeki sınav ve yarışmalarda zirvede yer alıyor.
          </p>
        </div>
      </div>

      {/* Photo Showcase of Trophies & Robotics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md flex flex-col">
          <div className="relative h-64 overflow-hidden bg-slate-900">
            <img
              src="/images/news-success.jpg"
              alt="LGS ve YKS Derece Öğrencilerimiz"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-amber-400 text-[#0F2547] text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
              YKS & LGS Zirvesi
            </div>
          </div>
          <div className="p-6 space-y-2">
            <h3 className="text-lg font-extrabold text-[#0F2547]">
              Türkiye Dereceleri ve Kitlesel Başarı
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Her yıl Trakya genelinde Türkiye 1.leri ve ilk 1000&apos;de onlarca öğrencimizle Meriç Koleji ailesi olarak gurur duyuyoruz.
            </p>
          </div>
        </div>

        <div className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md flex flex-col">
          <div className="relative h-64 overflow-hidden bg-slate-900">
            <img
              src="/images/news-robotics.jpg"
              alt="TEKNOFEST ve Robotik Şampiyonluğu"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-[#1D4ED8] text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
              TEKNOFEST & Bilim
            </div>
          </div>
          <div className="p-6 space-y-2">
            <h3 className="text-lg font-extrabold text-[#0F2547]">
              Mühendislik & Robotik Takımı Şampiyonlukları
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Öğrencilerimiz ulusal robotik liglerinde, TÜBİTAK projelerinde ve teknoloji yarışmalarında yenilikçi projeleriyle ödüller kazanıyor.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Success Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {successes.map((sec, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6 hover:shadow-xl hover:border-amber-400 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0F2547]">
                {sec.category}
              </h3>
            </div>

            <ul className="space-y-3">
              {sec.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center pt-6">
        <Link
          href="/on-kayit"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-[#0F2547] bg-amber-400 hover:bg-amber-300 shadow-xl transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>Başarı Ailemize Katılmak İçin Ön Kayıt Yaptırın</span>
        </Link>
      </div>
    </div>
  );
}
