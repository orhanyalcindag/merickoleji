'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from './Logo';
import {
  LayoutDashboard,
  Users,
  Bell,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Building2,
  Calendar,
} from 'lucide-react';

interface AdminSidebarProps {
  pendingApplicationsCount?: number;
  onClose?: () => void;
}

export default function AdminSidebar({
  pendingApplicationsCount = 0,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (onClose) onClose();
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  const navItems = [
    { label: 'Genel Bakış', href: '/admin', icon: LayoutDashboard },
    { label: 'Kadro & Öğretmenler', href: '/admin/kadro', icon: Users },
    { label: 'Duyurular & Haberler', href: '/admin/haberler', icon: Bell },
    {
      label: 'Ön Kayıt Başvuruları',
      href: '/admin/basvurular',
      icon: Inbox,
      badge: pendingApplicationsCount > 0 ? pendingApplicationsCount : undefined,
    },
    { label: 'Kurum & Sosyal Medya', href: '/admin/ayarlar', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0A1930] text-slate-300 min-h-screen flex flex-col justify-between border-r border-slate-800 p-4">
      {/* Top Header */}
      <div className="space-y-6">
        <div className="px-2 pt-2 pb-4 border-b border-slate-800">
          <Logo variant="light" />
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mt-2 px-1">
            Yönetim & Kontrol Paneli
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#1D4ED8] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-[#0F2547] font-black">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2 pt-6 border-t border-slate-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <ExternalLink className="w-4 h-4 text-slate-500" />
            <span>Web Sitesini Aç</span>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Güvenli Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
}
