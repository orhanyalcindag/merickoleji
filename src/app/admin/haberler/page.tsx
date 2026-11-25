'use client';

import React, { useState, useEffect } from 'react';
import { NewsItem, Branch } from '@/lib/types';
import {
  Bell,
  PlusCircle,
  Pencil,
  Trash2,
  Calendar,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  X,
  Search,
  Eye,
  EyeOff,
  Star,
} from 'lucide-react';

export default function AdminHaberlerPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'duyuru' as 'duyuru' | 'haber' | 'etkinlik' | 'basari',
    branch_id: 'all',
    image: '',
    summary: '',
    content: '',
    date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
    is_featured: 0,
    is_published: 1,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [nRes, bRes] = await Promise.all([
        fetch('/api/news?all=true'),
        fetch('/api/branches'),
      ]);
      const [nData, bData] = await Promise.all([nRes.json(), bRes.json()]);
      if (Array.isArray(nData)) setNewsList(nData);
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

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      type: 'duyuru',
      branch_id: 'all',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      summary: '',
      content: '',
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      is_featured: 0,
      is_published: 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      type: item.type,
      branch_id: item.branch_id,
      image: item.image,
      summary: item.summary,
      content: item.content,
      date: item.date,
      is_featured: item.is_featured,
      is_published: item.is_published,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu duyuru/haberi silmek istediğinize emin misiniz?')) return;
    try {
      await fetch(`/api/news/${id}`, { method: 'DELETE' });
      setNewsList((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const togglePublished = async (item: NewsItem) => {
    const updatedStatus = item.is_published ? 0 : 1;
    try {
      await fetch(`/api/news/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, is_published: updatedStatus }),
      });
      setNewsList((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, is_published: updatedStatus } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFeatured = async (item: NewsItem) => {
    const updated = item.is_featured ? 0 : 1;
    try {
      await fetch(`/api/news/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, is_featured: updated }),
      });
      setNewsList((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, is_featured: updated } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await fetch(`/api/news/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      setModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNews = newsList.filter((n) => {
    const matchType = selectedType === 'all' || n.type === selectedType;
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.summary.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#0F2547] flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#1D4ED8]" />
            <span>Duyurular & Haberler Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sınav duyuruları, okul haberleri, etkinlikler ve gurur tablolarını yayınlayın ve düzenleyin.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1D4ED8] hover:bg-blue-700 transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Yeni Haber/Duyuru Ekle</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Type Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['all', 'duyuru', 'haber', 'basari', 'etkinlik'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedType === t
                    ? 'bg-[#0F2547] text-amber-400'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t === 'all'
                  ? `Tümü (${newsList.length})`
                  : t === 'duyuru'
                  ? `Duyurular (${newsList.filter((n) => n.type === 'duyuru').length})`
                  : t === 'haber'
                  ? `Haberler (${newsList.filter((n) => n.type === 'haber').length})`
                  : t === 'basari'
                  ? `Başarılar (${newsList.filter((n) => n.type === 'basari').length})`
                  : `Etkinlikler (${newsList.filter((n) => n.type === 'etkinlik').length})`}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Başlıkta ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 w-full sm:w-56 focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
            />
          </div>
        </div>
      </div>

      {/* News List Table & Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Haberler yükleniyor...</div>
        ) : filteredNews.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">İçerik bulunamadı.</div>
        ) : (
          <>
            {/* Mobile & Tablet Card View (< lg screens) */}
            <div className="lg:hidden p-4 space-y-3.5">
              {filteredNews.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 space-y-3 shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-extrabold text-[#0F2547] text-sm line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                        {item.summary}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          item.type === 'duyuru'
                            ? 'bg-amber-100 text-amber-800'
                            : item.type === 'basari'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.type === 'etkinlik'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {item.type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => toggleFeatured(item)}
                        className={`p-1.5 rounded-xl border transition-colors ${
                          item.is_featured
                            ? 'bg-amber-100 border-amber-300 text-amber-600'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500'
                        }`}
                        title={item.is_featured ? 'Öne Çıkarıldı' : 'Öne Çıkar'}
                      >
                        <Star className={`w-3.5 h-3.5 ${item.is_featured ? 'fill-amber-500' : ''}`} />
                      </button>

                      <button
                        onClick={() => togglePublished(item)}
                        className={`px-2 py-1 rounded-xl text-[11px] font-bold border transition-colors ${
                          item.is_published
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        {item.is_published ? 'Yayında' : 'Taslak'}
                      </button>

                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-xl bg-blue-50 text-[#1D4ED8] hover:bg-blue-100 transition-colors"
                        title="Düzenle"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
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
                  <col className="w-auto" />
                  <col className="w-[90px]" />
                  <col className="w-[115px]" />
                  <col className="w-[95px]" />
                  <col className="w-[80px]" />
                  <col className="w-[100px]" />
                  <col className="w-[80px]" />
                </colgroup>
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-3.5">Görsel & Başlık</th>
                    <th className="py-3 px-3.5">Tür</th>
                    <th className="py-3 px-3.5">İlgili Şube</th>
                    <th className="py-3 px-3.5">Tarih</th>
                    <th className="py-3 px-3.5 text-center">Öne Çıkar</th>
                    <th className="py-3 px-3.5 text-center">Durum</th>
                    <th className="py-3 px-3.5 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredNews.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-extrabold text-[#0F2547] text-xs truncate" title={item.title}>
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate mt-0.5" title={item.summary}>
                              {item.summary}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            item.type === 'duyuru'
                              ? 'bg-amber-100 text-amber-800'
                              : item.type === 'basari'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.type === 'etkinlik'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-600 font-semibold">
                        <span className="truncate block max-w-full">
                          {item.branch_id === 'all' ? 'Tüm Kampüsler' : item.branch_id}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-400 font-mono">
                        {item.date}
                      </td>
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <button
                          onClick={() => toggleFeatured(item)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            item.is_featured
                              ? 'bg-amber-100 border-amber-300 text-amber-600'
                              : 'bg-slate-100 border-slate-200 text-slate-400 hover:text-amber-500'
                          }`}
                          title={item.is_featured ? 'Öne Çıkarıldı' : 'Öne Çıkar'}
                        >
                          <Star className={`w-3.5 h-3.5 ${item.is_featured ? 'fill-amber-500' : ''}`} />
                        </button>
                      </td>
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <button
                          onClick={() => togglePublished(item)}
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
                            item.is_published
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}
                        >
                          {item.is_published ? (
                            <>
                              <Eye className="w-3 h-3 text-emerald-600" />
                              <span>Yayında</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-slate-400" />
                              <span>Taslak</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-[#1D4ED8] transition-colors"
                            title="Düzenle"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
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
                {editingItem ? 'Duyuru/Haberi Düzenle' : 'Yeni Duyuru / Haber Ekle'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Başlık *</label>
                <input
                  type="text"
                  required
                  placeholder="Haber veya duyuru başlığı..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tür *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as NewsItem['type'] })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold"
                  >
                    <option value="duyuru">Duyuru</option>
                    <option value="haber">Haber</option>
                    <option value="basari">Başarı / Gurur</option>
                    <option value="etkinlik">Etkinlik</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">İlgili Şube *</label>
                  <select
                    value={formData.branch_id}
                    onChange={(e) => setFormData({ ...formData, branch_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="all">Tüm Kampüsler</option>
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tarih</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kapak Görseli URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
                {formData.image && (
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200 mt-2">
                    <img
                      src={formData.image}
                      alt="Kapak Önizleme"
                      className="w-16 h-12 rounded-lg object-cover border border-slate-300 shrink-0"
                    />
                    <div className="text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700 block">Kapak Görseli Önizleme</span>
                      Görsel geçerli ve listeleme kartlarında bu şekilde görünecek.
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kısa Özet (Listeleme Kartlarında Görünür)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Bir iki cümlelik dikkat çekici özet..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detaylı İçerik (Zengin Metin)</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Haber veya duyurunun tüm paragraf ve açıklamaları..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-sans"
                ></textarea>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.is_featured === 1}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked ? 1 : 0 })}
                    className="rounded-sm border-slate-300 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Ana Sayfada Öne Çıkar</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.is_published === 1}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked ? 1 : 0 })}
                    className="rounded-sm border-slate-300 text-[#1D4ED8] focus:ring-[#1D4ED8]"
                  />
                  <span>Yayında (Görünür)</span>
                </label>
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
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#1D4ED8] hover:bg-blue-700 shadow-xs"
                >
                  {editingItem ? 'Değişiklikleri Kaydet' : 'Yayınla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
