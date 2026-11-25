'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { Menu, X, LayoutDashboard, Users, Bell, Inbox, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const [pendingCount, setPendingCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isLoginPage) {
      // Check auth cookie or fetch status
      fetch('/api/applications')
        .then((res) => {
          if (res.status === 401) {
            router.push('/admin/login');
            return [];
          }
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            const count = data.filter((a) => a.status === 'bekliyor').length;
            setPendingCount(count);
          }
        })
        .catch(() => {});
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const quickNav = [
    { label: 'Özet', href: '/admin', icon: LayoutDashboard },
    { label: 'Kadro', href: '/admin/kadro', icon: Users },
    { label: 'Haberler', href: '/admin/haberler', icon: Bell },
    { label: 'Başvurular', href: '/admin/basvurular', icon: Inbox, count: pendingCount },
    { label: 'Ayarlar', href: '/admin/ayarlar', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100/70">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar pendingApplicationsCount={pendingCount} />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#0A1930] z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="absolute top-3 right-3">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                aria-label="Menüyü Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <AdminSidebar
              pendingApplicationsCount={pendingCount}
              onClose={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Top Header */}
        <div className="lg:hidden bg-[#0A1930] text-white border-b border-slate-800">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Admin Menüsünü Aç"
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className="font-extrabold text-sm text-amber-400">
                Meriç Yönetim Paneli
              </span>
            </div>
            <div className="flex items-center gap-2">
              {pendingCount > 0 && (
                <Link
                  href="/admin/basvurular"
                  className="text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-[#0F2547]"
                >
                  {pendingCount} Yeni
                </Link>
              )}
              <a
                href="/admin/login"
                className="text-xs text-red-400 hover:text-red-300 font-bold px-2 py-1"
              >
                Çıkış
              </a>
            </div>
          </div>

          {/* Quick Tab Strip for Fast Mobile Navigation */}
          <div className="flex items-center gap-1 overflow-x-auto px-3 pb-2 scrollbar-none text-xs">
            {quickNav.map((tab) => {
              const isActive = pathname === tab.href;
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#1D4ED8] text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400 text-[#0F2547] font-black">
                      {tab.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
