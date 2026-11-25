'use client';

import React, { useState, useEffect } from 'react';
import { Branch, Staff } from '@/lib/types';
import {
  Users,
  PlusCircle,
  Pencil,
  Trash2,
  Building2,
  Crown,
  Shield,
  BookOpen,
  Search,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';

export default function AdminKadroPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    branch_id: 'edirne',
    name: '',
    title: '',
    hierarchy_level: 3,
    parent_id: '' as string | number,
    subject: '',
    photo: '',
    bio: '',
    education: '',
    experience_years: 5,
    order_num: 0,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [bRes, sRes] = await Promise.all([
        fetch('/api/branches'),
        fetch('/api/staff'),
      ]);
      const [bData, sData] = await Promise.all([bRes.json(), sRes.json()]);
      if (Array.isArray(bData)) setBranches(bData);
      if (Array.isArray(sData)) setStaffList(sData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingStaff(null);
    setFormData({
      branch_id: selectedBranch === 'all' ? (branches[0]?.id || 'edirne') : selectedBranch,
      name: '',
      title: 'Öğretmen',
      hierarchy_level: 3,
      parent_id: '',
      subject: 'Matematik',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      bio: '',
      education: '',
      experience_years: 5,
      order_num: staffList.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (staff: Staff) => {
    setEditingStaff(staff);
    setFormData({
      branch_id: staff.branch_id,
      name: staff.name,
      title: staff.title,
      hierarchy_level: staff.hierarchy_level,
      parent_id: staff.parent_id || '',
      subject: staff.subject,
      photo: staff.photo,
      bio: staff.bio,
      education: staff.education,
      experience_years: staff.experience_years,
      order_num: staff.order_num,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu kadro üyesini silmek istediğinize emin misiniz?')) return;
    try {
      await fetch(`/api/staff/${id}`, { method: 'DELETE' });
      setStaffList((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        parent_id: formData.parent_id ? Number(formData.parent_id) : null,
      };

      if (editingStaff) {
        await fetch(`/api/staff/${editingStaff.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredStaff = staffList.filter((s) => {
    const matchBranch = selectedBranch === 'all' || s.branch_id === selectedBranch;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase());
    return matchBranch && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#0F2547] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#1D4ED8]" />
            <span>Kadro & Öğretmen Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kampüs yöneticileri, zümre başkanları ve öğretmenleri ekleyin, hiyerarşik şemayı düzenleyin.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#0F2547] bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Yeni Kadro Üyesi Ekle</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Branch Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedBranch('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedBranch === 'all'
                  ? 'bg-[#0F2547] text-amber-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tüm Şubeler ({staffList.length})
            </button>
            {branches.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBranch(b.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedBranch === b.id
                    ? 'bg-[#0F2547] text-amber-400'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {b.name} ({staffList.filter((s) => s.branch_id === b.id).length})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Ad, branş, unvan ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 w-full sm:w-56 focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
            />
          </div>
        </div>
      </div>

      {/* Staff List Table & Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Kadro yükleniyor...</div>
        ) : filteredStaff.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">Kadro kaydı bulunamadı.</div>
        ) : (
          <>
            {/* Mobile & Tablet Card View (< lg screens) */}
            <div className="lg:hidden p-4 space-y-3.5">
              {filteredStaff.map((s) => (
                <div
                  key={s.id}
                  className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 space-y-3 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.photo}
                        alt={s.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="font-extrabold text-[#0F2547] text-sm">{s.name}</div>
                        <div className="text-xs text-slate-500 font-medium">{s.title}</div>
                        <div className="text-[11px] text-[#1D4ED8] font-bold mt-0.5">{s.subject}</div>
                      </div>
                    </div>
                    <span className="font-bold text-[10px] px-2 py-0.5 rounded-md bg-blue-100 text-[#1D4ED8] shrink-0">
                      {branches.find((b) => b.id === s.branch_id)?.name || s.branch_id}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                    <div className="text-slate-500 min-w-0 pr-2">
                      {s.education && (
                        <div className="text-[11px] text-slate-600 truncate">{s.education}</div>
                      )}
                      <div className="text-[11px] font-semibold text-amber-700 mt-0.5">
                        {s.experience_years}+ Yıl Deneyim • #{s.order_num}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-2 rounded-xl bg-blue-50 text-[#1D4ED8] hover:bg-blue-100 transition-colors"
                        title="Düzenle"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Sil"
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
                  <col className="w-[200px]" />
                  <col className="w-[125px]" />
                  <col className="w-[125px]" />
                  <col className="w-auto" />
                  <col className="w-[140px]" />
                  <col className="w-[60px]" />
                  <col className="w-[80px]" />
                </colgroup>
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-3.5">Fotoğraf & Ad Soyad</th>
                    <th className="py-3 px-3.5">Şube</th>
                    <th className="py-3 px-3.5">Hiyerarşi</th>
                    <th className="py-3 px-3.5">Branş & Özgeçmiş</th>
                    <th className="py-3 px-3.5">Eğitim / Deneyim</th>
                    <th className="py-3 px-3.5">Sıra</th>
                    <th className="py-3 px-3.5 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStaff.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.photo}
                            alt={s.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-extrabold text-[#0F2547] text-sm truncate" title={s.name}>
                              {s.name}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate" title={s.title}>
                              {s.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3.5">
                        <span
                          className="font-bold text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-[#1D4ED8] inline-block truncate max-w-full"
                          title={branches.find((b) => b.id === s.branch_id)?.name || s.branch_id}
                        >
                          {branches.find((b) => b.id === s.branch_id)?.name || s.branch_id}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {s.hierarchy_level === 1 && (
                          <span className="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                            <Crown className="w-3 h-3 text-amber-600 shrink-0" />
                            <span>1: Üst Yönetim</span>
                          </span>
                        )}
                        {s.hierarchy_level === 2 && (
                          <span className="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 border border-blue-300">
                            <Shield className="w-3 h-3 text-blue-600 shrink-0" />
                            <span>2: İdari/PDR</span>
                          </span>
                        )}
                        {s.hierarchy_level === 3 && (
                          <span className="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-300">
                            <BookOpen className="w-3 h-3 text-slate-500 shrink-0" />
                            <span>3: Öğretmen</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3.5 text-slate-600">
                        <div className="font-semibold text-slate-800 text-xs truncate" title={s.subject}>
                          {s.subject}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5" title={s.bio}>
                          {s.bio || '-'}
                        </div>
                      </td>
                      <td className="py-3 px-3.5 text-slate-600">
                        <div className="truncate text-xs" title={s.education || ''}>
                          {s.education || '-'}
                        </div>
                        <div className="text-[10px] text-amber-600 font-bold mt-0.5">
                          {s.experience_years}+ Yıl Deneyim
                        </div>
                      </td>
                      <td className="py-3 px-3.5 font-mono font-bold text-slate-400">
                        #{s.order_num}
                      </td>
                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(s)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-[#1D4ED8] transition-colors"
                            title="Düzenle"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors"
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

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 border border-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-[#0F2547]">
                {editingStaff ? 'Kadro Üyesini Düzenle' : 'Yeni Öğretmen / Yönetici Ekle'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Şube *</label>
                  <select
                    value={formData.branch_id}
                    onChange={(e) => setFormData({ ...formData, branch_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ayşe Yılmaz"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unvan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Kampüs Müdürü / Matematik Öğretmeni"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hiyerarşi Seviyesi *</label>
                  <select
                    value={formData.hierarchy_level}
                    onChange={(e) => setFormData({ ...formData, hierarchy_level: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold"
                  >
                    <option value={1}>1: Üst Yönetim (Müdür / Kurucu)</option>
                    <option value={2}>2: İdari & Rehberlik (Müdür Yrd / PDR)</option>
                    <option value={3}>3: Akademik Kadro (Zümre & Öğretmen)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Branş / Alan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Matematik, Fen, Yönetim"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Fotoğraf URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
                {formData.photo && (
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200 mt-2">
                    <img
                      src={formData.photo}
                      alt="Önizleme"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-300 shrink-0"
                    />
                    <div className="text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700 block">Fotoğraf Önizleme</span>
                      Görsel başarıyla yüklendi.
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Eğitim Geçmişi / Üniversite</label>
                  <input
                    type="text"
                    placeholder="Örn: Boğaziçi Üniversitesi Eğitim Fakültesi"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Deneyim (Yıl)</label>
                    <input
                      type="number"
                      value={formData.experience_years}
                      onChange={(e) => setFormData({ ...formData, experience_years: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Sıralama No</label>
                    <input
                      type="number"
                      value={formData.order_num}
                      onChange={(e) => setFormData({ ...formData, order_num: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kısa Biyografi / Özgeçmiş</label>
                <textarea
                  rows={3}
                  placeholder="Kısa eğitici tanıtımı ve vizyonu..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-[#0F2547] bg-amber-400 hover:bg-amber-300 shadow-xs"
                >
                  {editingStaff ? 'Değişiklikleri Kaydet' : 'Kadro Üyesini Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
