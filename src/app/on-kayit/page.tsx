'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Calendar,
  Phone,
  Mail,
  User,
  GraduationCap,
  Building2,
  CheckCircle2,
  Send,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

function PreRegistrationContent() {
  const searchParams = useSearchParams();
  const preSelectedBranch = searchParams.get('branch') || 'edirne';

  const [formData, setFormData] = useState({
    parent_name: '',
    phone: '',
    email: '',
    student_name: '',
    grade_level: 'İlkokul (1. Sınıf)',
    branch_id: preSelectedBranch,
    notes: '',
  });

  useEffect(() => {
    if (preSelectedBranch) {
      setFormData((prev) => ({ ...prev, branch_id: preSelectedBranch }));
    }
  }, [preSelectedBranch]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const branches = [
    { id: 'edirne', name: 'Edirne Kampüsü (Anaokulu, İlkokul, Ortaokul, Lise)' },
    { id: 'kirklareli', name: 'Kırklareli Kampüsü (Anaokulu, İlkokul, Ortaokul, Lise)' },
    { id: 'tekirdag', name: 'Tekirdağ Kampüsü (Anaokulu, İlkokul, Ortaokul, Lise)' },
    { id: 'tekirdag-kurs', name: 'Tekirdağ Kurs Merkezi (LGS & YKS Hazırlık)' },
    { id: 'luleburgaz-kurs', name: 'Lüleburgaz Birey Kursu (YKS & LGS Hazırlık)' },
    { id: 'genel-mudurluk', name: 'Genel Müdürlük (Kurumsal İletişim)' },
  ];

  const gradeLevels = [
    'Anaokulu (3 - 4 Yaş)',
    'Anaokulu (5 - 6 Yaş Hazırlık)',
    'İlkokul (1. Sınıf - OKULİSTİK)',
    'İlkokul (2. Sınıf)',
    'İlkokul (3. Sınıf)',
    'İlkokul (4. Sınıf)',
    'Ortaokul (5. Sınıf)',
    'Ortaokul (6. Sınıf)',
    'Ortaokul (7. Sınıf)',
    'Ortaokul (8. Sınıf - LGS Hazırlık)',
    'Anadolu Lisesi (9. Sınıf Hazırlık/Giriş)',
    'Anadolu Lisesi (10. Sınıf)',
    'Anadolu Lisesi (11. Sınıf - TYT)',
    'Anadolu Lisesi (12. Sınıf - YKS)',
    'Mezun / Sınav Kurs Grubu (YKS)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Başvuru gönderilemedi');
      }

      setSuccessMessage(data.message || 'Ön kayıt başvurunuz başarıyla alındı.');
      setFormData({
        parent_name: '',
        phone: '',
        email: '',
        student_name: '',
        grade_level: 'İlkokul (1. Sınıf)',
        branch_id: 'edirne',
        notes: '',
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Bir hata oluştu. Lütfen telefon numarası ve zorunlu alanları kontrol ediniz.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Info & Benefits (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-[#0F2547] to-[#1D4ED8] rounded-3xl p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>2027-2028 Erken Kayıt Dönemi</span>
            </div>

            <h1 className="text-3xl font-black font-serif leading-tight">
              Ön Kayıt & Kampüs Randevusu
            </h1>

            <p className="text-sm text-slate-200 leading-relaxed">
              Çocuğunuzun geleceğini güvenle inşa etmek için formu doldurun. Uzman eğitim danışmanlarımız sizi arayarak bursluluk sınavları, OKULİSTİK/EYSİS sistemlerimiz ve okul imkânları hakkında detaylı bilgi versin.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Avantajlı erken kayıt indirimleri ve taksit imkanları</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Birebir akademik seviye tespit ve öğrenci koçluğu görüşmesi</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Kampüs laboratuvarları, havuz ve sanat atölyeleri rehberli turu</span>
              </div>
            </div>

            {/* Direct hotline */}
            <div className="pt-4 border-t border-white/15">
              <div className="text-xs text-slate-300">Doğrudan Danışman Hattı:</div>
              <a
                href="tel:02822620200"
                className="text-lg font-black text-amber-300 hover:text-white transition-colors flex items-center gap-2 mt-1"
              >
                <Phone className="w-4 h-4" />
                <span>(0282) 262 02 00</span>
              </a>
            </div>
          </div>

          {/* Quick FAQ card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-sm font-extrabold text-[#0F2547] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#1D4ED8]" />
              <span>Başvuru Süreci Nasıl İşler?</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Formunuz bize ulaştığı anda tercih ettiğiniz kampüsümüzün eğitim koordinatörüne iletilir. En geç 24 saat içerisinde velimiz aranarak uygun bir randevu günü belirlenir.
            </p>
          </div>
        </div>

        {/* Right Side: Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
          {successMessage ? (
            <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F2547]">
                Başvurunuz Başarıyla Alındı!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {successMessage}
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSuccessMessage(null)}
                  className="px-6 py-3 rounded-xl text-xs font-bold text-[#0F2547] bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs"
                >
                  Yeni Bir Başvuru Yap
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-[#0F2547]">
                  Ön Kayıt Başvuru Formu
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Lütfen aşağıdaki bilgileri eksiksiz doldurunuz. (* ile belirtilen alanlar zorunludur)
                </p>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Veli Bilgileri */}
              <div className="space-y-4">
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <User className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  <span>1. Veli İletişim Bilgileri</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Veli Adı Soyadı *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ayşe Yılmaz"
                      value={formData.parent_name}
                      onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Telefon Numarası *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Örn: 0532 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    E-Posta Adresi (Opsiyonel)
                  </label>
                  <input
                    type="email"
                    placeholder="Örn: veli@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Öğrenci ve Okul Tercihi */}
              <div className="space-y-4 pt-2">
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <GraduationCap className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  <span>2. Öğrenci & Kampüs Tercihi</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Öğrenci Adı Soyadı *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ali Yılmaz"
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Öğrencinin Sınıf Düzeyi *
                    </label>
                    <select
                      value={formData.grade_level}
                      onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
                    >
                      {gradeLevels.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    İlgilendiğiniz Kampüs / Şube *
                  </label>
                  <select
                    value={formData.branch_id}
                    onChange={(e) => setFormData({ ...formData, branch_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white font-semibold text-[#0F2547] focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Eklemek İstediğiniz Notlar veya Sorular
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Bursluluk sınavı, servis güzergahları, yemekhane veya sormak istediğiniz diğer konular..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
                  ></textarea>
                </div>
              </div>

              {/* KVKK Onay */}
              <div className="flex items-start gap-2.5 text-xs text-slate-500 pt-2">
                <input
                  type="checkbox"
                  required
                  id="kvkk"
                  className="rounded-sm border-slate-300 text-[#1D4ED8] focus:ring-[#1D4ED8] mt-0.5"
                />
                <label htmlFor="kvkk" className="cursor-pointer">
                  Meriç Eğitim Kurumları tarafından kişisel verilerimin KVKK kapsamında işlenmesini ve kayıt süreci ile ilgili benimle iletişime geçilmesini kabul ediyorum.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-black text-sm text-[#0F2547] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-400/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Gönderiliyor...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Ön Kayıt Başvurusunu Tamamla</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PreRegistrationPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-500">Yükleniyor...</div>}>
      <PreRegistrationContent />
    </Suspense>
  );
}
