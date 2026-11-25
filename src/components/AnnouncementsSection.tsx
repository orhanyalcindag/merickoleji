'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NewsItem } from '@/lib/types';
import {
  Bell,
  Calendar,
  Sparkles,
  ArrowRight,
  Pin,
  Building2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface AnnouncementsSectionProps {
  announcements: NewsItem[];
}

export default function AnnouncementsSection({ announcements }: AnnouncementsSectionProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  const filtered = selectedBranch === 'all'
    ? announcements
    : announcements.filter((a) => a.branch_id === selectedBranch || a.branch_id === 'all');

  // Extract day and month for modern calendar badge
  const parseDate = (dateStr: string) => {
    const parts = dateStr.split(' ');
    if (parts.length >= 2) {
      return { day: parts[0], month: parts[1].slice(0, 3).toUpperCase(), year: parts[2] || '' };
    }
    return { day: '15', month: 'KAS', year: '2025' };
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold">
            <Bell className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
            <span>Resmi Bildirim Merkezi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2547] font-serif">
            Duyurular & Akademik Takvim
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Sınav takvimleri, erken kayıt duyuruları, veli bültenleri ve kampüs etkinlikleri.
          </p>
        </div>

        {/* Branch Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'Tüm Şubeler' },
            { id: 'edirne', label: 'Edirne' },
            { id: 'tekirdag', label: 'Tekirdağ' },
            { id: 'kirklareli', label: 'Kırklareli' },
            { id: 'tekirdag-kurs', label: 'Tekirdağ Kurs' },
            { id: 'luleburgaz-kurs', label: 'Lüleburgaz Kurs' },
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBranch(b.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedBranch === b.id
                  ? 'bg-[#0F2547] text-amber-400 shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements Notice Board Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-sm">
          Bu şubeye ait aktif duyuru bulunmamaktadır.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const dateObj = parseDate(item.date);
            const isFeatured = item.is_featured === 1;

            return (
              <div
                key={item.id}
                className={`group bg-white rounded-2xl p-5 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                  isFeatured
                    ? 'border-amber-400/90 shadow-sm shadow-amber-400/10'
                    : 'border-slate-200/90 shadow-xs hover:border-blue-400'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Date Block + Badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Modern Date Box */}
                      <div className="w-12 h-14 rounded-xl bg-gradient-to-b from-[#0F2547] to-[#1D4ED8] text-white flex flex-col items-center justify-center font-bold shadow-sm flex-shrink-0">
                        <span className="text-base font-black leading-none">{dateObj.day}</span>
                        <span className="text-[10px] font-bold text-amber-300 uppercase leading-tight mt-0.5">
                          {dateObj.month}
                        </span>
                      </div>

                      <div>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                            item.type === 'etkinlik'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {item.type === 'etkinlik' ? 'Etkinlik' : 'Resmi Duyuru'}
                        </span>
                        {item.branch_id !== 'all' && (
                          <div className="text-[11px] font-semibold text-slate-400 mt-0.5 flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-[#1D4ED8]" />
                            <span>{item.branch_id}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {isFeatured && (
                      <span className="flex-shrink-0 p-1.5 rounded-lg bg-amber-50 text-amber-600" title="Önemli Duyuru">
                        <Pin className="w-4 h-4 fill-amber-500" />
                      </span>
                    )}
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-base font-extrabold text-[#0F2547] group-hover:text-[#1D4ED8] transition-colors leading-snug line-clamp-2">
                      <Link href={`/haberler/${item.id}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/haberler/${item.id}`}
                    className="text-xs font-bold text-[#1D4ED8] group-hover:text-amber-600 flex items-center gap-1 transition-colors"
                  >
                    <span>Duyuruyu İncele</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
