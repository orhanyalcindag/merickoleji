'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NewsItem } from '@/lib/types';
import NewsCard from './NewsCard';
import { Bell, Award, Sparkles, BookOpen, Layers, ArrowRight } from 'lucide-react';

interface HomeNewsSectionProps {
  initialNews: NewsItem[];
}

export default function HomeNewsSection({ initialNews }: HomeNewsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tümü', icon: Layers },
    { id: 'duyuru', label: 'Duyurular', icon: Bell },
    { id: 'haber', label: 'Haberler', icon: BookOpen },
    { id: 'basari', label: 'Başarılarımız', icon: Award },
    { id: 'etkinlik', label: 'Etkinlikler', icon: Sparkles },
  ];

  const filtered = activeCategory === 'all'
    ? initialNews
    : initialNews.filter((n) => n.type === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-[#0F2547] text-amber-400 shadow-md shadow-blue-950/20 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-[#0F2547] border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
              {cat.id !== 'all' && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-amber-400 text-[#0F2547]' : 'bg-slate-100 text-slate-500'
                }`}>
                  {initialNews.filter((n) => n.type === cat.id).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* News Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-sm text-slate-500">Bu kategoride henüz duyuru veya haber bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 6).map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="text-center pt-4">
        <Link
          href="/haberler"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#0F2547] bg-white border border-slate-300 hover:border-[#1D4ED8] hover:text-[#1D4ED8] shadow-xs hover:shadow-md transition-all duration-200"
        >
          <span>Tüm Haber ve Duyuruları Görüntüle</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
