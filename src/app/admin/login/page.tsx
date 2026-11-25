'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { Lock, User, KeyRound, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('meric2025');
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Giriş yapılamadı');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Geçersiz kullanıcı adı veya şifre.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1930] via-[#0F2547] to-[#1D4ED8] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
        {/* Top accent */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-blue-600 to-amber-400"></div>

        <div className="text-center space-y-3 mb-8">
          <div className="inline-block">
            <Logo variant="dark" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>Yönetim Paneli Girişi</span>
          </div>
          <p className="text-xs text-slate-500">
            Lütfen yetkili kullanıcı adı ve şifrenizle giriş yapınız.
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-amber-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Geliştirme & Demo Giriş Bilgileri:
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-[#1D4ED8] underline hover:text-[#0F2547]"
            >
              Otomatik Doldur
            </button>
          </div>
          <div className="flex items-center justify-between font-mono bg-white/80 p-2 rounded-lg border border-amber-200/60 text-[11px]">
            <span>Kullanıcı: <b>admin</b></span>
            <span>Şifre: <b>meric2025</b></span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kullanıcı Adı
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Şifre
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#0F2547] bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-400/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Giriş Yapılıyor...</span>
            ) : (
              <>
                <span>Yönetim Paneline Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 text-center border-t border-slate-100">
          <a href="/" className="text-xs text-slate-500 hover:text-[#1D4ED8] transition-colors font-semibold">
            ← Web Sitesine Geri Dön
          </a>
        </div>
      </div>
    </div>
  );
}
