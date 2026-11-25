'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, ExternalLink, MessageSquare, ThumbsUp, MapPin } from 'lucide-react';

interface GoogleReview {
  id: string;
  name: string;
  campus: string;
  campusTag: 'edirne' | 'tekirdag' | 'kirklareli';
  role: string;
  rating: number;
  date: string;
  comment: string;
  isLocalGuide?: boolean;
  avatarBg: string;
  avatarText: string;
  mapsUrl: string;
}

const realGoogleReviews: GoogleReview[] = [
  {
    id: '1',
    name: 'Gözde Öztürk',
    campus: 'Tekirdağ Şubesi',
    campusTag: 'tekirdag',
    role: 'LGS Hazırlık Velisi',
    rating: 5,
    date: '8 ay önce',
    comment:
      'LGS hazırlık sürecinde çocuğumuza ve bize verdikleri sonsuz destekten dolayı çok teşekkür ederiz. İyi ki yollarımız kesişmiş. Başarılarınız daim olsun.',
    avatarBg: 'bg-blue-600',
    avatarText: 'GÖ',
    mapsUrl: 'https://www.google.com/maps/search/Meri%C3%A7+E%C4%9Fitim+Kursu+Tekirda%C4%9F',
  },
  {
    id: '2',
    name: 'İrem Özcan',
    campus: 'Edirne Kampüsü',
    campusTag: 'edirne',
    role: 'Kolej Velisi',
    rating: 5,
    date: 'Google Haritalar',
    comment:
      'Okulun ve eğitimin çok başarılı olduğunu düşünüyorum. Gerek öğretmenlerin ilgi ve alakası gerek okulun imkanları çok iyi. Ayrıca müzik eğitimi konusunda çok gelişmiş bir okul olduğunu düşünüyorum.',
    avatarBg: 'bg-emerald-600',
    avatarText: 'İÖ',
    mapsUrl: 'https://www.google.com/maps/search/%C3%96zel+Edirne+Meri%C3%A7+Koleji',
  },
  {
    id: '3',
    name: 'Esat Güler',
    campus: 'Tekirdağ Şubesi',
    campusTag: 'tekirdag',
    role: 'Veli & Mezun Yakını',
    rating: 5,
    date: '7 ay önce',
    comment:
      'Sadece sınav değil her konuda öğrencilerinin yanında olan Meriç Eğitim Kurumlarına çok teşekkür ederim. Her yönüyle harika bir kurum.',
    avatarBg: 'bg-amber-600',
    avatarText: 'EG',
    mapsUrl: 'https://www.google.com/maps/search/Meri%C3%A7+E%C4%9Fitim+Kursu+Tekirda%C4%9F',
  },
  {
    id: '4',
    name: 'Eylül Birincioğlu',
    campus: 'Edirne Kampüsü',
    campusTag: 'edirne',
    role: 'İlkokul / Ortaokul Velisi',
    rating: 5,
    date: 'Google Haritalar',
    comment:
      'Verilen yabancı dil ve müzik eğitimi harika. Çocuklarınızı güvenle emanet edebileceğiniz, ilgi ve alakayı fazlasıyla gösteren harika bir okul.',
    avatarBg: 'bg-indigo-600',
    avatarText: 'EB',
    mapsUrl: 'https://www.google.com/maps/search/%C3%96zel+Edirne+Meri%C3%A7+Koleji',
  },
  {
    id: '5',
    name: 'Meral Tabaksoy',
    campus: 'Kırklareli Kampüsü',
    campusTag: 'kirklareli',
    role: 'Yerel Rehber & Veli',
    rating: 5,
    date: 'Google Haritalar',
    isLocalGuide: true,
    comment:
      'Okulun her şeyine hakim; veli ve öğrenciyi müşteri gibi değil yakın dost ve aile ferdi gibi gördüğünü yakından gözlemledim. Bu okulun bir üyesi ve aile ferdi gibi hissettiriyorlar.',
    avatarBg: 'bg-purple-600',
    avatarText: 'MT',
    mapsUrl: 'https://www.google.com/maps/search/%C3%96zel+K%C4%B1rklareli+Meri%C3%A7+Koleji',
  },
  {
    id: '6',
    name: 'Erhan Gözütok',
    campus: 'Tekirdağ Şubesi',
    campusTag: 'tekirdag',
    role: 'LGS Öğrenci Velisi',
    rating: 5,
    date: '2 yıl önce',
    comment:
      'Eğitim kurumu olarak Tekirdağ\'da bir numara, LGS\'ye hazırlanan çocuklarınızı gözünüz kapalı teslim edebilirsiniz.',
    avatarBg: 'bg-rose-600',
    avatarText: 'EG',
    mapsUrl: 'https://www.google.com/maps/search/Meri%C3%A7+E%C4%9Fitim+Kursu+Tekirda%C4%9F',
  },
  {
    id: '7',
    name: 'Fethiye Öztürklü',
    campus: 'Edirne Kampüsü',
    campusTag: 'edirne',
    role: 'Müzik & Dil Programı Velisi',
    rating: 5,
    date: 'Google Haritalar',
    comment:
      'Okulun yabancı dil eğitiminin çok iyi olduğunu duymuştum ama müzik eğitimi beni daha çok etkiledi. Çocuğumun piyanoda çaldığı ilk parça beni çok duygulandırdı. Tüm öğretmenlerimize teşekkür ederiz.',
    avatarBg: 'bg-teal-600',
    avatarText: 'FÖ',
    mapsUrl: 'https://www.google.com/maps/search/%C3%96zel+Edirne+Meri%C3%A7+Koleji',
  },
  {
    id: '8',
    name: 'Göktuğ Turpçu',
    campus: 'Kırklareli Kampüsü',
    campusTag: 'kirklareli',
    role: 'Öğrenci / Mezun',
    rating: 5,
    date: 'Google Haritalar',
    comment:
      'Güzel bir kurum, okulun matematik Öğretmeni Özgür Acet muhteşem bir öğretmen.',
    avatarBg: 'bg-sky-600',
    avatarText: 'GT',
    mapsUrl: 'https://www.google.com/maps/search/%C3%96zel+K%C4%B1rklareli+Meri%C3%A7+Koleji',
  },
  {
    id: '9',
    name: 'Halit Kurt',
    campus: 'Tekirdağ Şubesi',
    campusTag: 'tekirdag',
    role: 'YKS Hazırlık Velisi',
    rating: 5,
    date: '2 yıl önce',
    comment:
      'YKS sınavına hazırlık sürecinde kızıma göstermiş oldukları ilgi ve alakadan dolayı tüm öğretmenlerimize çok teşekkür ederim.',
    avatarBg: 'bg-amber-700',
    avatarText: 'HK',
    mapsUrl: 'https://www.google.com/maps/search/Meri%C3%A7+E%C4%9Fitim+Kursu+Tekirda%C4%9F',
  },
  {
    id: '10',
    name: 'Alperen Çakmak',
    campus: 'Edirne Kampüsü',
    campusTag: 'edirne',
    role: 'Kolej Mezunu / Veli',
    rating: 5,
    date: 'Google Haritalar',
    comment:
      'Başta müdürümüz ve kurucumuz olmak üzere alanında uzman kadrosuyla Edirne\'de eğitimin tek adresi.',
    avatarBg: 'bg-blue-700',
    avatarText: 'AÇ',
    mapsUrl: 'https://www.google.com/maps/search/%C3%96zel+Edirne+Meri%C3%A7+Koleji',
  },
];

export function GoogleLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function GoogleReviewsSection() {
  const [selectedTag, setSelectedTag] = useState<'all' | 'edirne' | 'tekirdag' | 'kirklareli'>('all');

  const filteredReviews =
    selectedTag === 'all'
      ? realGoogleReviews
      : realGoogleReviews.filter((r) => r.campusTag === selectedTag);

  return (
    <section className="bg-gradient-to-b from-blue-50/60 via-slate-50 to-white py-16 border-y border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header & Google Trust Badge */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-2 border-b border-slate-200/80">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-bold text-slate-700">
              <GoogleLogo className="w-4 h-4" />
              <span>Google Haritalar Doğrulanmış Değerlendirmeleri</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2547] font-serif tracking-tight">
              Velilerimizin Gözünden Meriç Koleji
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Edirne, Tekirdağ ve Kırklareli kampüslerimizde eğitim gören öğrenci ve velilerimizin Google İşletme profillerinde paylaştığı gerçek deneyimler.
            </p>
          </div>

          {/* Aggregate Rating Badge */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-md flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center">
              <span className="text-lg font-black text-amber-600 leading-none">4.8</span>
              <span className="text-[9px] font-bold text-amber-700">/ 5.0</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs font-extrabold text-[#0F2547] mt-1">Trakya Geneli Yüksek Memnuniyet</div>
              <div className="text-[11px] text-slate-500">70+ Doğrulanmış Google İncelemesi</div>
            </div>
          </div>
        </div>

        {/* Campus Filter Tabs */}
        <div className="flex items-center justify-center sm:justify-start gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 ${
              selectedTag === 'all'
                ? 'bg-[#0F2547] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>Tüm Kampüsler</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">
              {realGoogleReviews.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedTag('edirne')}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 ${
              selectedTag === 'edirne'
                ? 'bg-[#1D4ED8] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>Edirne Kampüsü</span>
            <span className="text-[10px] text-amber-300 font-extrabold">4.6 ★</span>
          </button>

          <button
            onClick={() => setSelectedTag('tekirdag')}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 ${
              selectedTag === 'tekirdag'
                ? 'bg-[#1D4ED8] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>Tekirdağ Şubesi</span>
            <span className="text-[10px] text-amber-300 font-extrabold">5.0 ★</span>
          </button>

          <button
            onClick={() => setSelectedTag('kirklareli')}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 ${
              selectedTag === 'kirklareli'
                ? 'bg-[#1D4ED8] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>Kırklareli Kampüsü</span>
            <span className="text-[10px] text-amber-300 font-extrabold">4.1 ★</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/90 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header: Stars & Google Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    <GoogleLogo className="w-3 h-3" />
                    <span>{review.date}</span>
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic line-clamp-5">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author & Campus Info */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full ${review.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
                  >
                    {review.avatarText}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-[#0F2547] truncate flex items-center gap-1.5">
                      <span>{review.name}</span>
                      {review.isLocalGuide && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-amber-100 text-amber-800 font-bold shrink-0">
                          Yerel Rehber
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                      <span className="text-[#1D4ED8] font-semibold">{review.campus}</span>
                      <span>•</span>
                      <span>{review.role}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={review.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Google Haritalar'da Görüntüle"
                  className="text-slate-300 hover:text-[#4285F4] transition-colors p-1"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link to Google Maps */}
        <div className="text-center pt-2">
          <a
            href="https://www.google.com/maps/search/%C3%96zel+Edirne+Meri%C3%A7+Koleji"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 shadow-xs hover:shadow-md text-[#0F2547] text-xs font-bold transition-all"
          >
            <GoogleLogo className="w-4 h-4" />
            <span>Tüm Google Haritalar Yorumlarını İnceleyin</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
