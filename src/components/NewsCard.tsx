'use client';

import React from 'react';
import Link from 'next/link';
import { NewsItem } from '@/lib/types';
import { Calendar, ArrowRight, Award, Bell, Sparkles, BookOpen } from 'lucide-react';

interface NewsCardProps {
  item: NewsItem;
  featured?: boolean;
}

export default function NewsCard({ item, featured = false }: NewsCardProps) {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'duyuru':
        return { label: 'Duyuru', color: 'bg-amber-100 text-amber-900 border-amber-300', icon: Bell };
      case 'basari':
        return { label: 'Başarı / Gurur', color: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: Award };
      case 'etkinlik':
        return { label: 'Etkinlik', color: 'bg-purple-100 text-purple-900 border-purple-300', icon: Sparkles };
      default:
        return { label: 'Haber', color: 'bg-blue-100 text-blue-900 border-blue-300', icon: BookOpen };
    }
  };

  const badge = getTypeBadge(item.type);
  const Icon = badge.icon;

  return (
    <article
      className={`group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col ${
        featured ? 'md:flex-row md:items-stretch' : ''
      }`}
    >
      {/* Thumbnail */}
      <div className={`relative overflow-hidden bg-slate-100 ${featured ? 'md:w-1/2 min-h-[260px]' : 'h-52'}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/hero-campus.jpg';
          }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border shadow-sm flex items-center gap-1 ${badge.color}`}>
            <Icon className="w-3.5 h-3.5" />
            <span>{badge.label}</span>
          </span>
          {item.branch_id !== 'all' && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-xs uppercase tracking-wider">
              {item.branch_id}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`p-5 flex-1 flex flex-col justify-between ${featured ? 'md:p-7 md:w-1/2' : ''}`}>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{item.date}</span>
          </div>

          <h3 className={`font-extrabold text-[#0F2547] group-hover:text-[#1D4ED8] transition-colors leading-snug line-clamp-2 ${
            featured ? 'text-xl md:text-2xl' : 'text-base'
          }`}>
            <Link href={`/haberler/${item.id}`}>
              {item.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {item.summary}
          </p>
        </div>

        <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/haberler/${item.id}`}
            className="text-xs sm:text-sm font-bold text-[#1D4ED8] group-hover:text-[#0F2547] flex items-center gap-1.5 transition-colors"
          >
            <span>Detayları Oku</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-[11px] font-medium text-slate-400">Meriç Koleji Haber Bülteni</span>
        </div>
      </div>
    </article>
  );
}
