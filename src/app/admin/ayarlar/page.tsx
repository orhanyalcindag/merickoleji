'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsAppIcon } from '@/components/SocialIcons';

export default function AdminAyarlarPage() {
  const [settings, setSettings] = useState({
    school_name: 'Meriç Eğitim Kurumları',
    slogan: 'Geleceğin İçin Geleceğin Yer! Geleceği Şekillendiren Eğitim',
    general_phone: '0282 262 02 00',
    general_email: 'info@mericokullari.com',
    general_address: 'Cumhuriyet Mah. Elif Hanım Sk. Dinçgül İş Merkezi No:9 Kat:2, Süleymanpaşa/Tekirdağ',
    social_instagram: 'https://instagram.com/merickoleji',
    social_facebook: 'https://facebook.com/merickoleji',
    social_youtube: 'https://youtube.com/@merickoleji',
    social_whatsapp: '902822620200',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object') {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F2547] flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#1D4ED8]" />
            <span>Kurum & Sosyal Medya Ayarları</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Site genelindeki telefon numaraları, adresler, kurumsal slogan ve sosyal medya hesaplarını tek merkezden güncelleyin.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Ayarlar Başarıyla Kaydedildi!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Kurumsal Bilgiler */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
            1. Genel Kurumsal Bilgiler
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kurum Adı</label>
              <input
                type="text"
                value={settings.school_name}
                onChange={(e) => setSettings({ ...settings, school_name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kurumsal Slogan</label>
              <input
                type="text"
                value={settings.slogan}
                onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Genel Merkez Telefonu</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={settings.general_phone}
                  onChange={(e) => setSettings({ ...settings, general_phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Genel İletişim E-Postası</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={settings.general_email}
                  onChange={(e) => setSettings({ ...settings, general_email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>
          </div>

          <div className="text-xs pt-2">
            <label className="block font-bold text-slate-700 mb-1">Genel Merkez Adresi</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <textarea
                rows={2}
                value={settings.general_address}
                onChange={(e) => setSettings({ ...settings, general_address: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300"
              ></textarea>
            </div>
          </div>
        </div>

        {/* 2. Sosyal Medya & WhatsApp */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
            2. Sosyal Medya ve WhatsApp İletişim Linkleri
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <InstagramIcon className="w-4 h-4 text-pink-600" />
                <span>Instagram Sayfası URL</span>
              </label>
              <input
                type="url"
                value={settings.social_instagram}
                onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FacebookIcon className="w-4 h-4 text-blue-600" />
                <span>Facebook Sayfası URL</span>
              </label>
              <input
                type="url"
                value={settings.social_facebook}
                onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <YoutubeIcon className="w-4 h-4 text-red-600" />
                <span>YouTube Kanalı URL</span>
              </label>
              <input
                type="url"
                value={settings.social_youtube}
                onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp İletişim Numarası (Ülke kodu ile)</span>
              </label>
              <input
                type="text"
                placeholder="Örn: 902822620200"
                value={settings.social_whatsapp}
                onChange={(e) => setSettings({ ...settings, social_whatsapp: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-[#0F2547] bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Kaydediliyor...' : 'Tüm Ayarları Güncelle'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
