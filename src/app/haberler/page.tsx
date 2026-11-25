import React from 'react';
import { db, ensureDbInitialized } from '@/lib/db';
import { NewsItem } from '@/lib/types';
import TopNewsSlider from '@/components/TopNewsSlider';
import AnnouncementsSection from '@/components/AnnouncementsSection';
import NewsCard from '@/components/NewsCard';
import { Bell, Newspaper, Sparkles, Award } from 'lucide-react';

async function getAllNews() {
  await ensureDbInitialized();
  const res = await db.execute('SELECT * FROM news_announcements WHERE is_published = 1 ORDER BY id DESC');
  return res.rows as unknown as NewsItem[];
}

export default async function HaberlerPage() {
  const allNews = await getAllNews();

  // Separate News/Successes and Announcements/Events
  const newsItems = allNews.filter((n) => n.type === 'haber' || n.type === 'basari');
  const announcements = allNews.filter((n) => n.type === 'duyuru' || n.type === 'etkinlik');

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F2547] via-[#1A365D] to-[#1D4ED8] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300">
            <Bell className="w-4 h-4" />
            <span>Meriç Koleji Haber & Basın Merkezi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Haberler, Duyurular & Etkinlikler
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Kurumumuzdaki güncel akademik gelişmeler, sınav başarıları, erken kayıt duyuruları ve kampüs etkinliklerini buradan takip edebilirsiniz.
          </p>
        </div>
      </div>

      {/* 1. TOP NEWS SLIDER */}
      {newsItems.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0F2547]">
              Öne Çıkan Gündem & Başarı Haberleri
            </h2>
          </div>
          <TopNewsSlider newsItems={newsItems} />
        </section>
      )}

      {/* 2. HABERLER BÜLTENİ GRID */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-bold">
              <Newspaper className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2547]">
                Haberler & Başarı Bülteni
              </h2>
              <p className="text-xs text-slate-500">
                Projelerimiz, TEKNOFEST katılımları ve akademik derecelerimiz
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] border border-blue-200">
            {newsItems.length} Haber
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 3. DEDICATED ANNOUNCEMENTS & OFFICIAL BULLETIN */}
      <section className="pt-4">
        <AnnouncementsSection announcements={announcements} />
      </section>
    </div>
  );
}
