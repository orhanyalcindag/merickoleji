import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db, ensureDbInitialized } from '@/lib/db';
import { NewsItem } from '@/lib/types';
import {
  Calendar,
  ArrowLeft,
  Share2,
  Building2,
  Award,
  Bell,
  Sparkles,
  BookOpen,
} from 'lucide-react';



async function getNewsItem(idOrSlug: string) {
  await ensureDbInitialized();
  const isNumeric = /^\d+$/.test(idOrSlug);
  let result;
  if (isNumeric) {
    result = await db.execute({
      sql: 'SELECT * FROM news_announcements WHERE id = ?',
      args: [Number(idOrSlug)],
    });
  } else {
    result = await db.execute({
      sql: 'SELECT * FROM news_announcements WHERE slug = ?',
      args: [idOrSlug],
    });
  }

  if (result.rows.length === 0) return null;
  return result.rows[0] as unknown as NewsItem;
}

async function getRelatedNews(currentId: number) {
  await ensureDbInitialized();
  const res = await db.execute({
    sql: 'SELECT * FROM news_announcements WHERE id != ? AND is_published = 1 ORDER BY id DESC LIMIT 3',
    args: [currentId],
  });
  return res.rows as unknown as NewsItem[];
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getNewsItem(id);

  if (!item) {
    notFound();
  }

  const related = await getRelatedNews(item.id);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'duyuru':
        return { label: 'Duyuru', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'basari':
        return { label: 'Başarı', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'etkinlik':
        return { label: 'Etkinlik', color: 'bg-purple-100 text-purple-900 border-purple-300' };
      default:
        return { label: 'Haber', color: 'bg-blue-100 text-blue-900 border-blue-300' };
    }
  };

  const badge = getTypeBadge(item.type);

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/haberler"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#1D4ED8] hover:text-[#0F2547] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Haber ve Duyurulara Dön</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badge.color}`}>
            {badge.label}
          </span>
          {item.branch_id !== 'all' && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>{item.branch_id.toUpperCase()}</span>
            </span>
          )}
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 ml-auto">
            <Calendar className="w-3.5 h-3.5" />
            <span>{item.date}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F2547] font-serif leading-tight">
          {item.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed border-l-4 border-amber-400 pl-4 py-1 italic">
          {item.summary}
        </p>
      </div>

      {/* Featured Cover Image */}
      <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 max-h-[480px]">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
          {item.content}
        </div>

        {/* Share & CTA */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Meriç Eğitim Kurumları Basın ve Kurumsal İletişim Birimi
          </div>
          <Link
            href="/on-kayit"
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-[#0F2547] bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs"
          >
            Ön Kayıt / Kampüs Randevusu Al
          </Link>
        </div>
      </div>

      {/* Related News */}
      {related.length > 0 && (
        <div className="space-y-4 pt-8">
          <h3 className="text-xl font-extrabold text-[#0F2547]">
            Diğer Güncel Duyurular
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/haberler/${rel.id}`}
                className="group bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#1D4ED8] uppercase">
                    {rel.type}
                  </span>
                  <h4 className="text-xs font-bold text-[#0F2547] group-hover:text-[#1D4ED8] transition-colors mt-1 line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                  {rel.date}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
