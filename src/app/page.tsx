import React from 'react';
import Link from 'next/link';
import { db, ensureDbInitialized } from '@/lib/db';
import { Branch, NewsItem } from '@/lib/types';
import TopNewsSlider from '@/components/TopNewsSlider';
import AnnouncementsSection from '@/components/AnnouncementsSection';
import CampusCard from '@/components/CampusCard';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import {
  Calendar,
  Building2,
  GraduationCap,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Star,
  Quote,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsAppIcon } from '@/components/SocialIcons';

async function getData() {
  await ensureDbInitialized();
  const branchesRes = await db.execute('SELECT * FROM branches ORDER BY order_num ASC');
  const newsRes = await db.execute('SELECT * FROM news_announcements WHERE is_published = 1 ORDER BY id DESC');
  const staffCountRes = await db.execute('SELECT COUNT(*) as count FROM staff');

  return {
    branches: branchesRes.rows as unknown as Branch[],
    allNews: newsRes.rows as unknown as NewsItem[],
    staffCount: Number(staffCountRes.rows[0].count),
  };
}

export default async function HomePage() {
  const { branches, allNews, staffCount } = await getData();

  // SEPARATE HABERLER AND DUYURULAR
  const newsArticles = allNews.filter((n) => n.type === 'haber' || n.type === 'basari' || n.is_featured === 1);
  const announcements = allNews.filter((n) => n.type === 'duyuru' || n.type === 'etkinlik');

  const campusesOnly = branches.filter((b) => b.type === 'kampus');
  const coursesOnly = branches.filter((b) => b.type === 'kurs');

  return (
    <div className="space-y-16 pb-20">
      {/* 1. TOP NEWS SLIDER (HABERLER EN ÜSTTE SLIDER ŞEKLİNDE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-wider text-[#0F2547]">
              Gündem & Öne Çıkan Haberler
            </span>
          </div>
          <Link
            href="/haberler"
            className="text-xs font-bold text-[#1D4ED8] hover:text-[#0F2547] flex items-center gap-1 transition-colors"
          >
            <span>Tüm Haber Bülteni</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* The Slider */}
        <TopNewsSlider newsItems={newsArticles} />
      </section>

      {/* 2. HERO / INSTITUTIONAL PRESENTATION */}
      <section className="relative bg-gradient-to-br from-[#0A1930] via-[#0F2547] to-[#1D4ED8] text-white overflow-hidden py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 max-w-7xl lg:mx-auto">
        {/* Background Graphic Accents */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="px-6 sm:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Highlight badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>2025-2026 Erken Kayıt Fırsatları & Başarı Bursları Başladı</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight leading-tight sm:leading-none">
                Geleceğin İçin <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                  Geleceğin Yer!
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
                Meriç Eğitim Kurumları; Anaokulundan Anadolu Lisesine, OKULİSTİK ve EYSİS destekli modern eğitim modellerimiz, köklü kurs merkezlerimiz ve seçkin öğretmen kadromuzla Trakya&apos;nın eğitim meşalesidir.
              </p>

              {/* Feature Checkpoints */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-200 font-medium pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>3 Büyük Kampüs & 2 Kurs Merkezi</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>OKULİSTİK & EYSİS Entegrasyonu</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Cambridge Çift Dilli Müfredat</span>
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <Link
                  href="/on-kayit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-sm sm:text-base text-[#0F2547] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-400/25 hover:-translate-y-1 transition-all duration-200"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Ön Kayıt / Randevu Al</span>
                </Link>

                <a
                  href="#duyurular"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xs hover:-translate-y-1 transition-all duration-200"
                >
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span>Duyuruları ve Kampüsleri Gör</span>
                </a>
              </div>
            </div>

            {/* Right Visual (5 cols) with AI Generated Campus Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-gradient-to-b from-white/15 to-white/5 p-3 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden shadow-inner h-80 sm:h-96 bg-slate-900">
                  <img
                    src="/images/hero-campus.jpg"
                    alt="Meriç Koleji Kampüsü"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1930] via-transparent to-transparent"></div>

                  {/* Floating Stat Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl text-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                        LGS & YKS Başarı Oranı
                      </div>
                      <div className="text-2xl font-black text-[#0F2547]">
                        %98.4 Yerleştirme
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center text-[#0F2547] font-black text-xl">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Second floating mini-badge */}
                <div className="absolute -top-3 -left-3 bg-[#0F2547] text-white px-3.5 py-1.5 rounded-xl border border-amber-400/50 shadow-lg text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Trakya&apos;nın En Güçlü Kadrosu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-r border-slate-100 last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-[#0F2547]">3 Kampüs</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500">
              Edirne • Kırklareli • Tekirdağ
            </div>
          </div>
          <div className="space-y-1 border-r border-slate-100 last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-[#1D4ED8]">2 Kurs Merkezi</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500">
              Tekirdağ & Lüleburgaz Birey
            </div>
          </div>
          <div className="space-y-1 border-r border-slate-100 last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-amber-500">150+ Kadro</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500">
              Alanında Uzman Öğretici & Yönetici
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#0F2547]">25+ Yıl</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500">
              Bölgesel Güven & Eğitim Mirası
            </div>
          </div>
        </div>
      </section>

      {/* 4. EDUCATION LEVELS (HIZLI KADEME KARTLARI WITH AI IMAGES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1D4ED8]">
            Eğitim Kademelerimiz
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2547] font-serif">
            Her Yaşta Bütüncül ve Nitelikli Eğitim
          </h2>
          <p className="text-sm text-slate-600">
            Erken çocukluktan üniversite hazırlığına kadar her kademede çağdaş metotlar, uluslararası akreditasyon ve yapay zeka destekli takip sistemi uyguluyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Anaokulu */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src="/images/level-kindergarten.jpg"
                  alt="Meriç Anaokulu"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-amber-400 text-[#0F2547] text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm">
                  3 - 6 Yaş
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-extrabold text-[#0F2547] group-hover:text-amber-600 transition-colors">
                  Meriç Anaokulu
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  Oyun temelli öğrenme, çift dilli erken İngilizce eğitimi, montessori beceri istasyonları ve duyusal atölyeler.
                </p>
                <div className="space-y-1 pt-1 text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Çift Dilli Erken Eğitim</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Doğa ve Sanat Atölyeleri</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                href="/egitim/anaokulu"
                className="w-full py-2.5 rounded-xl font-bold text-xs text-[#1D4ED8] group-hover:text-[#0F2547] group-hover:bg-amber-400 group-hover:border-amber-400 border border-slate-200 flex items-center justify-center gap-1.5 transition-all duration-300"
              >
                <span>Programı Keşfet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* İlkokul */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-[#1D4ED8] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src="/images/level-primary.jpg"
                  alt="Meriç İlkokulu"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#1D4ED8] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm">
                  OKULİSTİK & EYSİS
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-extrabold text-[#0F2547] group-hover:text-[#1D4ED8] transition-colors">
                  Meriç İlkokulu
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  OKULİSTİK ve EYSİS dijital takip altyapısı ile her kazanım birebir ölçülür. Güçlü temel bilimler ve kodlama.
                </p>
                <div className="space-y-1 pt-1 text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    <span>Haftalık Kazanım Analizi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    <span>Birebir Etüt ve Takviye</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                href="/egitim/ilkokul"
                className="w-full py-2.5 rounded-xl font-bold text-xs text-[#1D4ED8] group-hover:text-white group-hover:bg-[#1D4ED8] group-hover:border-[#1D4ED8] border border-slate-200 flex items-center justify-center gap-1.5 transition-all duration-300"
              >
                <span>Programı Keşfet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Ortaokul */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-purple-400 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src="/images/level-middle.jpg"
                  alt="Meriç Ortaokulu"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm">
                  LGS Hazırlık
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-extrabold text-[#0F2547] group-hover:text-purple-600 transition-colors">
                  Meriç Ortaokulu
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  Haftalık deneme sınavları, mentorluk sistemi, soru çözüm ofisleri ve yeni nesil mantık muhakeme kampları.
                </p>
                <div className="space-y-1 pt-1 text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Yoğun Soru Çözüm Ofisleri</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Birebir LGS Koçluğu</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                href="/egitim/ortaokul"
                className="w-full py-2.5 rounded-xl font-bold text-xs text-[#1D4ED8] group-hover:text-white group-hover:bg-purple-600 group-hover:border-purple-600 border border-slate-200 flex items-center justify-center gap-1.5 transition-all duration-300"
              >
                <span>Programı Keşfet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Lise */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src="/images/level-highschool.jpg"
                  alt="Meriç Anadolu Lisesi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm">
                  YKS & Üniversite
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-extrabold text-[#0F2547] group-hover:text-emerald-600 transition-colors">
                  Anadolu Lisesi
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  Hedef odaklı YKS (TYT-AYT) hazırlığı, kariyer danışmanlığı, üniversite gezileri ve uluslararası projeler.
                </p>
                <div className="space-y-1 pt-1 text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tıp & Mühendislik Kampları</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Birebir Tercih Koçluğu</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                href="/egitim/lise"
                className="w-full py-2.5 rounded-xl font-bold text-xs text-[#1D4ED8] group-hover:text-white group-hover:bg-emerald-600 group-hover:border-emerald-600 border border-slate-200 flex items-center justify-center gap-1.5 transition-all duration-300"
              >
                <span>Programı Keşfet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEPARATE DEDICATED ANNOUNCEMENTS SECTION (DUYURULAR VE RESMİ TAKVİM) */}
      <section id="duyurular" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <AnnouncementsSection announcements={announcements} />
      </section>

      {/* 6. CAMPUSES & COURSE CENTERS DIRECTORY */}
      <section id="kampusler" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1D4ED8]">
            Yerleşkelerimiz
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2547] font-serif">
            Kampüslerimiz & Kurs Merkezlerimiz
          </h2>
          <p className="text-sm text-slate-600">
            Edirne, Kırklareli, Tekirdağ ve Lüleburgaz&apos;daki modern yerleşkelerimizle Trakya&apos;nın her noktasındayız.
          </p>
        </div>

        {/* Kolej Kampüsleri */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#1D4ED8]" />
            <h3 className="text-lg font-extrabold text-[#0F2547]">
              Kolej Kampüslerimiz
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campusesOnly.map((campus) => (
              <CampusCard key={campus.id} branch={campus} />
            ))}
          </div>
        </div>

        {/* Kurs Merkezleri */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-extrabold text-[#0F2547]">
              Özel Eğitim Kurs Merkezlerimiz (LGS & YKS Sınav Hazırlığı)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coursesOnly.map((course) => (
              <CampusCard key={course.id} branch={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY MERİÇ (EĞİTİMDE MERİÇ FARKI) */}
      <section className="bg-gradient-to-br from-[#0F2547] to-[#0A1930] text-white py-20 rounded-3xl mx-4 sm:mx-6 max-w-7xl lg:mx-auto px-6 sm:px-12">
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Neden Meriç Eğitim Kurumları?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
              Trakya&apos;nın En Prestijli Eğitim Standartları
            </h2>
            <p className="text-sm text-slate-300 font-light">
              Öğrencilerimizi sadece sınavlara değil; hayat boyu öğrenen, sorgulayan, yabancı dilde akıcı ve erdemli dünya vatandaşları olarak hayata hazırlıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-[#0F2547] flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-white">OKULİSTİK & EYSİS Takibi</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Öğrenci başarısını şansa bırakmıyoruz. Dijital veri analitiğiyle her öğrencinin gelişim haritasını haftalık çıkarıyoruz.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-white">Cambridge & CEFR Dili</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Avrupa Ortak Dil Çerçevesi standartlarında, anadili İngilizce olan öğretmenler eşliğinde akıcı konuşma ve uluslararası sertifikasyon.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-white">Birebir Koçluk & PDR</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Her öğrencinin kendine özel bir mentoru vardır. Sınav kaygısı, hedef belirleme ve kariyer planlaması uzman rehberlikle yürütülür.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-white">LGS & YKS Şampiyonlukları</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Bölgenin en köklü kurs merkezi birikimimiz ve seçkin deneme sınavı maratonlarımızla Türkiye derecelerine ulaşıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PARENT TESTIMONIALS (GERÇEK GOOGLE HARİTALAR VELİ VE MEZUN YORUMLARI) */}
      <GoogleReviewsSection />

      {/* 9. PRE-REGISTRATION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#0F2547] via-[#163868] to-[#1D4ED8] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Geleceğe Güvenle Adım Atın
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
                Çocuğunuzun Geleceğini Birlikte Şekillendirelim
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed font-light">
                Erken kayıt indirimleri, bursluluk sınavları ve kampüs tanıtım randevusu için hemen ön başvuru formunu doldurun; uzman eğitim danışmanlarımız sizi arasın.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
              <Link
                href="/on-kayit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-[#0F2547] bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-400/20 hover:-translate-y-1 transition-all duration-200"
              >
                <Calendar className="w-5 h-5" />
                <span>Ön Kayıt / Randevu Formu</span>
              </Link>
              <a
                href="tel:02822620200"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              >
                <span>Hemen Bizi Arayın</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
