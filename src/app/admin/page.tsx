'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Application, Branch, NewsItem, Staff } from '@/lib/types';
import {
  Inbox,
  Users,
  Bell,
  Building2,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  PlusCircle,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  const branchLabels: Record<string, string> = {
    edirne: 'Edirne',
    tekirdag: 'Tekirdağ',
    kirklareli: 'Kırklareli',
    'luleburgaz-kurs': 'Lüleburgaz Kurs',
    'edirne-kurs': 'Edirne Kurs',
    'tekirdag-kurs': 'Tekirdağ Kurs',
    'genel-mudurluk': 'Genel Müdürlük',
    merkez: 'Merkez',
  };

  const getBranchName = (id: string) => {
    return branches.find((b) => b.id === id)?.name || branchLabels[id] || id;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appRes, newsRes, staffRes, branchRes] = await Promise.all([
        fetch('/api/applications'),
        fetch('/api/news?all=true'),
        fetch('/api/staff'),
        fetch('/api/branches'),
      ]);

      const [appData, newsData, staffData, branchData] = await Promise.all([
        appRes.json(),
        newsRes.json(),
        staffRes.json(),
        branchRes.json(),
      ]);

      if (Array.isArray(appData)) setApplications(appData);
      if (Array.isArray(newsData)) setNews(newsData);
      if (Array.isArray(staffData)) setStaff(staffData);
      if (Array.isArray(branchData)) setBranches(branchData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus as Application['status'] } : a))
      );
    } catch (err) {
      console.error('Status update failed', err);
    }
  };

  const pendingApps = applications.filter((a) => a.status === 'bekliyor');
  const calledApps = applications.filter((a) => a.status === 'arandi');
  const enrolledApps = applications.filter((a) => a.status === 'kayit-tamamlandi');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#0F2547]">
            Yönetim Kontrol Paneli
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Meriç Eğitim Kurumları web sitesi, kadro, duyuru ve ön kayıt başvuruları yönetim merkezi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/haberler"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1D4ED8] hover:bg-blue-700 transition-colors shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Yeni Duyuru/Haber</span>
          </Link>

          <Link
            href="/admin/kadro"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#0F2547] bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Yeni Kadro Ekle</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Applications */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Ön Kayıt Başvuruları
            </div>
            <div className="text-2xl font-black text-[#0F2547] mt-1">
              {applications.length}
            </div>
            <div className="text-[11px] font-semibold text-amber-600 mt-0.5">
              {pendingApps.length} Bekleyen Talep
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        {/* Staff */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Toplam Kadro
            </div>
            <div className="text-2xl font-black text-[#1D4ED8] mt-1">
              {staff.length}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
              Tüm Şube Kadroları
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* News */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Duyurular & Haberler
            </div>
            <div className="text-2xl font-black text-[#0F2547] mt-1">
              {news.length}
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">
              {news.filter((n) => n.is_published).length} Yayında İçerik
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Bell className="w-6 h-6" />
          </div>
        </div>

        {/* Branches */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Şubeler & Kampüsler
            </div>
            <div className="text-2xl font-black text-[#0F2547] mt-1">
              {branches.length || 6}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
              3 Kampüs + 2 Kurs + Merkez
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-[#0F2547] flex items-center gap-2">
              <Inbox className="w-5 h-5 text-[#1D4ED8]" />
              <span>Gelen Ön Kayıt & Randevu Başvuruları</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Web sitemiz üzerinden velilerin oluşturduğu son kayıt talepleri.
            </p>
          </div>

          <Link
            href="/admin/basvurular"
            className="text-xs font-bold text-[#1D4ED8] hover:text-[#0F2547] flex items-center gap-1"
          >
            <span>Tüm Başvuruları Yönet</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Yükleniyor...</div>
        ) : applications.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">Henüz başvuru bulunmuyor.</div>
        ) : (
          <>
            {/* Mobile & Tablet Card View (< lg screens) */}
            <div className="lg:hidden p-4 space-y-3.5">
              {applications.slice(0, 6).map((app) => (
                <div
                  key={app.id}
                  className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 space-y-3 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-extrabold text-[#0F2547] text-sm">
                        {app.parent_name}
                      </div>
                      <a
                        href={`tel:${app.phone.replace(/\s+/g, '')}`}
                        className="text-xs text-[#1D4ED8] font-bold flex items-center gap-1 mt-0.5 hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{app.phone}</span>
                      </a>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-slate-400 block font-semibold">
                        {app.created_at}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-[#1D4ED8] inline-block mt-1">
                        {getBranchName(app.branch_id)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Öğrenci & Kademe
                      </span>
                      <span className="font-bold text-slate-800">{app.student_name}</span>
                      <span className="text-slate-500 text-[11px] ml-1.5 font-medium">
                        ({app.grade_level})
                      </span>
                    </div>
                  </div>

                  {app.notes && (
                    <div className="text-xs text-slate-600 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60">
                      <span className="font-bold text-amber-900 text-[10px] uppercase block mb-0.5">
                        Veli Notu:
                      </span>
                      {app.notes}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2.5 pt-1">
                    <div className="flex-1">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`w-full text-xs font-bold rounded-xl px-2.5 py-2 border transition-colors ${
                          app.status === 'bekliyor'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : app.status === 'arandi'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : app.status === 'kayit-tamamlandi'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                      >
                        <option value="bekliyor">Bekliyor</option>
                        <option value="arandi">Arandı / Bilgi Verildi</option>
                        <option value="kayit-tamamlandi">Kayıt Yapıldı</option>
                        <option value="iptal">İptal Edildi</option>
                      </select>
                    </div>

                    <a
                      href={`tel:${app.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Ara</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (lg+ screens) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs table-fixed">
                <colgroup>
                  <col className="w-[100px]" />
                  <col className="w-[155px]" />
                  <col className="w-[140px]" />
                  <col className="w-[115px]" />
                  <col className="w-auto" />
                  <col className="w-[130px]" />
                  <col className="w-[75px]" />
                </colgroup>
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-3.5">Tarih</th>
                    <th className="py-3 px-3.5">Veli & İletişim</th>
                    <th className="py-3 px-3.5">Öğrenci & Kademe</th>
                    <th className="py-3 px-3.5">Şube</th>
                    <th className="py-3 px-3.5">Veli Notu</th>
                    <th className="py-3 px-3.5">Durum</th>
                    <th className="py-3 px-3.5 text-right">Eylem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.slice(0, 6).map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3.5">
                        <div className="font-mono text-[11px] font-semibold text-slate-600 leading-tight">
                          {app.created_at.split(' ')[0]}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                          {app.created_at.split(' ')[1] || ''}
                        </div>
                      </td>
                      <td className="py-3 px-3.5">
                        <div className="font-bold text-[#0F2547] truncate" title={app.parent_name}>
                          {app.parent_name}
                        </div>
                        <a
                          href={`tel:${app.phone.replace(/\s+/g, '')}`}
                          className="text-[#1D4ED8] hover:underline flex items-center gap-1 font-semibold text-[11px] mt-0.5 whitespace-nowrap"
                        >
                          <Phone className="w-2.5 h-2.5 shrink-0" />
                          <span>{app.phone}</span>
                        </a>
                      </td>
                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-slate-800 text-xs truncate" title={app.student_name}>
                          {app.student_name}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5" title={app.grade_level}>
                          {app.grade_level}
                        </div>
                      </td>
                      <td className="py-3 px-3.5">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#1D4ED8] inline-block truncate max-w-full"
                          title={getBranchName(app.branch_id)}
                        >
                          {getBranchName(app.branch_id)}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-slate-600">
                        <div className="truncate text-xs" title={app.notes || 'Not girilmedi'}>
                          {app.notes || <span className="text-slate-300 italic">-</span>}
                        </div>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className={`w-full text-[11px] font-bold rounded-lg px-2 py-1.5 border transition-colors cursor-pointer ${
                            app.status === 'bekliyor'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : app.status === 'arandi'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : app.status === 'kayit-tamamlandi'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          <option value="bekliyor">Bekliyor</option>
                          <option value="arandi">Arandı</option>
                          <option value="kayit-tamamlandi">Kayıt Yapıldı</option>
                          <option value="iptal">İptal Edildi</option>
                        </select>
                      </td>
                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <a
                          href={`tel:${app.phone.replace(/\s+/g, '')}`}
                          className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-colors"
                          title="Telefonla Ara"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Ara</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link
          href="/admin/kadro"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-bold mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-[#0F2547] group-hover:text-[#1D4ED8]">
            Kadro ve Şube Yönetimi →
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Öğretmen ve yöneticilerin hiyerarşik seviye, unvan ve bilgilerini düzenleyin.
          </p>
        </Link>

        <Link
          href="/admin/haberler"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3">
            <Bell className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-[#0F2547] group-hover:text-amber-700">
            Duyuru & Haber Yayınlama →
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Yeni başarılar, sınav takvimleri ve etkinlik duyurularını yayına alın.
          </p>
        </Link>

        <Link
          href="/admin/ayarlar"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-[#0F2547] group-hover:text-emerald-700">
            Kurum & Sosyal Medya →
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Telefon, WhatsApp, Instagram ve YouTube bağlantılarını güncelleyin.
          </p>
        </Link>
      </div>
    </div>
  );
}
