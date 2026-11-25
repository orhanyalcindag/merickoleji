'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building2,
  Navigation,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: 'genel-mudurluk',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const branches = [
    {
      name: 'Genel Müdürlük',
      city: 'Tekirdağ',
      address: 'Cumhuriyet Mah. Elif Hanım Sk. Dinçgül İş Merkezi No:9 Kat:2, Süleymanpaşa/Tekirdağ',
      phone: '0282 262 02 00',
      email: 'info@mericokullari.com',
      map_url: 'https://maps.google.com/?q=Tekirda%C4%9F+S%C3%BCleymanpa%C5%9Fa',
      badge: 'Yönetim Merkezi',
    },
    {
      name: 'Edirne Kampüsü',
      city: 'Edirne',
      address: 'Kurtuluş Mah. 20214. Sk. Eski TOKİ Mevkii, Edirne',
      phone: '0284 225 00 90',
      email: 'edirne@mericokullari.com',
      map_url: 'https://maps.google.com/?q=Edirne+Kurtulu%C5%9F+Mahallesi',
      badge: 'Kolej Yerleşkesi',
    },
    {
      name: 'Kırklareli Kampüsü',
      city: 'Kırklareli',
      address: 'İstasyon Mah. 4. İstasyon Sk. No:21, Kırklareli',
      phone: '0288 214 94 94',
      email: 'kirklareli@mericokullari.com',
      map_url: 'https://maps.google.com/?q=K%C4%B1rklareli+%C4%B0stasyon+Mahallesi',
      badge: 'Kolej Yerleşkesi',
    },
    {
      name: 'Tekirdağ Kampüsü',
      city: 'Tekirdağ',
      address: '100. Yıl Mah. Kerem Sk. No:6, Süleymanpaşa/Tekirdağ',
      phone: '0282 260 14 70',
      email: 'tekirdag@mericokullari.com',
      map_url: 'https://maps.google.com/?q=Tekirda%C4%9F+100.+Y%C4%B1l+Mahallesi',
      badge: 'Kolej Yerleşkesi',
    },
    {
      name: 'Meriç Eğitim Kursu (Tekirdağ)',
      city: 'Tekirdağ',
      address: '100. Yıl Mah. Tevfik Kaptan Sk. No:7/3, Süleymanpaşa/Tekirdağ',
      phone: '0282 261 96 66',
      email: 'kurs@mericokullari.com',
      map_url: 'https://maps.google.com/?q=Tekirda%C4%9F+Tevfik+Kaptan+Sokak',
      badge: 'LGS & YKS Kursu',
    },
    {
      name: 'Birey Eğitim Kursu (Lüleburgaz)',
      city: 'Kırklareli',
      address: 'Siteler Mah. İstasyon Cad. No:79, Lüleburgaz/Kırklareli',
      phone: '0288 415 77 33',
      email: 'luleburgaz@mericokullari.com',
      map_url: 'https://maps.google.com/?q=L%C3%BCleburgaz+%C4%B0stasyon+Caddesi',
      badge: 'YKS & LGS Kursu',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parent_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          student_name: 'İletişim Talebi',
          grade_level: 'Genel Bilgi Talebi',
          branch_id: formData.branch,
          notes: formData.message,
        }),
      });
      setSubmitted(true);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F2547] via-[#1A365D] to-[#1D4ED8] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Bize Ulaşın
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            İletişim & Yerleşkelerimiz
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Eğitim modellerimiz, kayıt koşulları ve kampüs turları hakkında bilgi almak için şubelerimizle doğrudan iletişime geçebilir veya formu doldurabilirsiniz.
          </p>
        </div>
      </div>

      {/* Grid: Campus Contacts (All 6 locations) */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-[#0F2547] flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#1D4ED8]" />
          <span>Tüm Şubelerimiz & İletişim Numaraları</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1D4ED8]">
                    {b.city}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800">
                    {b.badge}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-[#0F2547]">
                  {b.name}
                </h3>

                <div className="space-y-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#1D4ED8] flex-shrink-0" />
                    <a
                      href={`tel:${b.phone.replace(/\s+/g, '')}`}
                      className="font-bold text-[#0F2547] hover:text-[#1D4ED8] transition-colors"
                    >
                      {b.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>{b.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={b.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-600 hover:text-[#1D4ED8] flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Haritada Aç</span>
                </a>

                <Link
                  href="/on-kayit"
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-400 text-[#0F2547] hover:bg-amber-300 transition-colors"
                >
                  Randevu Al
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form & Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-[#0F2547] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1D4ED8]" />
              <span>Ziyaret & Çalışma Saatleri</span>
            </h3>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-800">Hafta İçi (Pazartesi - Cuma):</span>
                <span>08:30 - 18:30</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-800">Cumartesi:</span>
                <span>09:00 - 17:00</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-slate-800">Pazar:</span>
                <span className="text-amber-600 font-semibold">Randevu ile Ziyaret</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              * Kampüslerimizi ve laboratuvarlarımızı randevulu olarak hafta sonu da ziyaret edebilirsiniz.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-[#0F2547]">Mesajınız İletildi</h4>
              <p className="text-xs text-slate-600">
                Talebiniz kayıt altına alınmıştır. İlgili birimimiz en kısa sürede sizinle iletişime geçecektir.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-[#1D4ED8] underline pt-2"
              >
                Yeni Mesaj Gönder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#0F2547]">
                  Bize Mesaj Gönderin
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Görüş, öneri ve kayıt sorularınız için formu doldurabilirsiniz.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Adınız Soyadınız"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Telefon Numaranız *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  İlgili Kampüs / Birim
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  <option value="genel-mudurluk">Genel Müdürlük (Tekirdağ)</option>
                  <option value="edirne">Edirne Kampüsü</option>
                  <option value="kirklareli">Kırklareli Kampüsü</option>
                  <option value="tekirdag">Tekirdağ Kampüsü</option>
                  <option value="tekirdag-kurs">Meriç Kursu (Tekirdağ)</option>
                  <option value="luleburgaz-kurs">Birey Kursu (Lüleburgaz)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mesajınız
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="İletmek istediğiniz mesajınız..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1D4ED8]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0F2547] bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Gönderiliyor...' : 'Mesajı İlet'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
