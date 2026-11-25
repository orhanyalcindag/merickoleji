'use client';

import React, { useState, useEffect } from 'react';
import { Application, Branch } from '@/lib/types';
import {
  Inbox,
  Phone,
  Search,
  CheckCircle2,
  Trash2,
  Clock,
  Filter,
  FileText,
  Building2,
  Send,
} from 'lucide-react';

export default function AdminBasvurularPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [aRes, bRes] = await Promise.all([
        fetch('/api/applications'),
        fetch('/api/branches'),
      ]);
      const [aData, bData] = await Promise.all([aRes.json(), bRes.json()]);
      if (Array.isArray(aData)) setApplications(aData);
      if (Array.isArray(bData)) setBranches(bData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: status as Application['status'] } : a))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu ön kayıt başvurusunu silmek istediğinize emin misiniz?')) return;
    try {
      await fetch(`/api/applications/${id}`, { method: 'DELETE' });
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredApps = applications.filter((a) => {
    const matchStatus = selectedStatus === 'all' || a.status === selectedStatus;
    const matchBranch = selectedBranch === 'all' || a.branch_id === selectedBranch;
    const matchSearch =
      a.parent_name.toLowerCase().includes(search.toLowerCase()) ||
      a.student_name.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search);
    return matchStatus && matchBranch && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#0F2547] flex items-center gap-2">
            <Inbox className="w-6 h-6 text-[#1D4ED8]" />
            <span>Ön Kayıt Başvuruları & Talepler</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Web sitesinden gelen veli randevu ve kayıt taleplerini takip edin, görüşme durumlarını güncelleyin.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
          Toplam <b>{applications.length}</b> Başvuru ({applications.filter((a) => a.status === 'bekliyor').length} Bekleyen)
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'Tümü' },
              { id: 'bekliyor', label: 'Bekliyor' },
              { id: 'arandi', label: 'Arandı / Bilgi Verildi' },
              { id: 'kayit-tamamlandi', label: 'Kayıt Yapıldı' },
              { id: 'iptal', label: 'İptal' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStatus(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedStatus === s.id
                    ? 'bg-[#0F2547] text-amber-400'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s.label} ({s.id === 'all' ? applications.length : applications.filter((a) => a.status === s.id).length})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Veli, öğrenci, tel ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 w-full sm:w-56 focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
            />
          </div>
        </div>
      </div>

      {/* Applications List & Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Başvurular yükleniyor...</div>
        ) : filteredApps.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">Kayıt başvurusu bulunamadı.</div>
        ) : (
          <>
            {/* Mobile & Tablet Card View (< lg screens) */}
            <div className="lg:hidden p-4 space-y-3.5">
              {filteredApps.map((app) => (
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
                      {app.email && (
                        <div className="text-[11px] text-slate-400 mt-0.5">{app.email}</div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-slate-400 block font-semibold">
                        {app.created_at}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-[#1D4ED8] inline-block mt-1">
                        {branches.find((b) => b.id === app.branch_id)?.name || app.branch_id}
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

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`tel:${app.phone.replace(/\s+/g, '')}`}
                        className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-colors shadow-xs"
                        title="Telefonla Ara"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200 transition-colors"
                        title="Başvuruyu Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (lg+ screens) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs table-fixed">
                <colgroup>
                  <col className="w-[100px]" />
                  <col className="w-[165px]" />
                  <col className="w-[140px]" />
                  <col className="w-[115px]" />
                  <col className="w-auto" />
                  <col className="w-[135px]" />
                  <col className="w-[80px]" />
                </colgroup>
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-3.5">Tarih</th>
                    <th className="py-3 px-3.5">Veli & İletişim</th>
                    <th className="py-3 px-3.5">Öğrenci & Kademesi</th>
                    <th className="py-3 px-3.5">Kampüs</th>
                    <th className="py-3 px-3.5">Veli Notu</th>
                    <th className="py-3 px-3.5">Durum</th>
                    <th className="py-3 px-3.5 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map((app) => (
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
                        <div className="font-bold text-[#0F2547] text-sm truncate" title={app.parent_name}>
                          {app.parent_name}
                        </div>
                        <a
                          href={`tel:${app.phone.replace(/\s+/g, '')}`}
                          className="text-[#1D4ED8] hover:underline font-semibold flex items-center gap-1 text-[11px] mt-0.5 whitespace-nowrap"
                        >
                          <Phone className="w-2.5 h-2.5 shrink-0" />
                          <span>{app.phone}</span>
                        </a>
                        {app.email && (
                          <div className="text-[10px] text-slate-400 truncate mt-0.5" title={app.email}>
                            {app.email}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-slate-800 text-xs truncate" title={app.student_name}>
                          {app.student_name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5" title={app.grade_level}>
                          {app.grade_level}
                        </div>
                      </td>
                      <td className="py-3 px-3.5">
                        <span
                          className="font-bold text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-[#1D4ED8] inline-block truncate max-w-full"
                          title={branches.find((b) => b.id === app.branch_id)?.name || app.branch_id}
                        >
                          {branches.find((b) => b.id === app.branch_id)?.name || app.branch_id}
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
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:${app.phone.replace(/\s+/g, '')}`}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            title="Telefonla Ara"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
