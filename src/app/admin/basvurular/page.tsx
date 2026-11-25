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

      {/* Applications Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Başvurular yükleniyor...</div>
        ) : filteredApps.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">Kayıt başvurusu bulunamadı.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Tarih</th>
                  <th className="py-3 px-4">Veli Adı & İletişim</th>
                  <th className="py-3 px-4">Öğrenci & Kademesi</th>
                  <th className="py-3 px-4">Tercih Edilen Kampüs</th>
                  <th className="py-3 px-4">Veli Notu & Talebi</th>
                  <th className="py-3 px-4">Görüşme Durumu</th>
                  <th className="py-3 px-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                      {app.created_at}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-[#0F2547] text-sm">{app.parent_name}</div>
                      <a
                        href={`tel:${app.phone.replace(/\s+/g, '')}`}
                        className="text-[#1D4ED8] hover:underline font-semibold flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3 h-3" />
                        {app.phone}
                      </a>
                      {app.email && (
                        <div className="text-[11px] text-slate-400 mt-0.5">{app.email}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{app.student_name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{app.grade_level}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-[11px] px-2.5 py-1 rounded-md bg-blue-50 text-[#1D4ED8] uppercase">
                        {app.branch_id}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs text-slate-600">
                      {app.notes ? (
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-[11px] line-clamp-3">
                          {app.notes}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Not girilmedi</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border transition-colors ${
                          app.status === 'bekliyor'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : app.status === 'arandi'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : app.status === 'kayit-tamamlandi'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                      >
                        <option value="bekliyor">Bekliyor (Arama Yapılmadı)</option>
                        <option value="arandi">Arandı / Bilgi Verildi</option>
                        <option value="kayit-tamamlandi">Kayıt Yapıldı</option>
                        <option value="iptal">İptal Edildi</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${app.phone.replace(/\s+/g, '')}`}
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                          title="Telefonla Ara"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
