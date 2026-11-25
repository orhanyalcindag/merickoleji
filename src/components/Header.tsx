'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  Users,
  Award,
  Building2,
  Calendar,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const navLinks = [
    {
      label: 'Hakkımızda',
      id: 'about',
      children: [
        { label: 'Biz Kimiz?', href: '/hakkimizda', icon: Building2, desc: 'Tarihçemiz, misyon ve vizyonumuz' },
        { label: 'Kadromuz (Organizasyon Şeması)', href: '/kadromuz', icon: Users, desc: 'Tüm şubelerimizin hiyerarşik kadro yapısı' },
        { label: 'Başarılarımız', href: '/basarilarimiz', icon: Award, desc: 'LGS, YKS ve olimpiyat gurur tablolarımız' },
        { label: 'Anlaşmalı Kurumlar', href: '/anlasmali-kurumlar', icon: GraduationCap, desc: 'İş birliklerimiz ve kurumsal avantajlar' },
      ],
    },
    {
      label: 'Eğitim Modelimiz',
      id: 'education',
      children: [
        { label: 'Anaokulu', href: '/egitim/anaokulu', icon: Sparkles, desc: 'Çift dilli erken çocukluk ve beceri atölyeleri' },
        { label: 'İlkokul (OKULİSTİK & EYSİS)', href: '/egitim/ilkokul', icon: BookOpen, desc: 'Temel kazanımlar ve yapay zeka destekli takip' },
        { label: 'Ortaokul (LGS Hazırlık)', href: '/egitim/ortaokul', icon: GraduationCap, desc: 'LGS odaklı akademik kamp ve mentorluk' },
        { label: 'Anadolu Lisesi (YKS & Rehberlik)', href: '/egitim/lise', icon: Award, desc: 'Kariyer planlama ve üniversite hazırlığı' },
      ],
    },
    {
      label: 'Kampüslerimiz',
      href: '/kampusler',
    },
    {
      label: 'Haberler & Duyurular',
      href: '/haberler',
    },
    {
      label: 'İletişim',
      href: '/iletisim',
    },
  ];

  return (
    <>
      {/* TOP CONTACT BAR */}
      <div className="bg-[#0F2547] text-white text-xs py-2 px-4 border-b border-blue-900/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:02822620200"
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Genel Merkez: (0282) 262 02 00</span>
            </a>
            <a
              href="mailto:info@mericokullari.com"
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>info@mericokullari.com</span>
            </a>
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Edirne • Kırklareli • Tekirdağ • Lüleburgaz</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-amber-300 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              2027-2028 Erken Kayıt Dönemi Başladı
            </span>
            <div className="h-3 w-px bg-slate-700"></div>
            <Link
              href="/admin"
              className="text-slate-400 hover:text-white transition-colors text-[11px]"
            >
              Yönetim Paneli
            </Link>
          </div>
        </div>
      </div>

      {/* STICKY MAIN HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-white py-4 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Logo variant="dark" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              if (item.children) {
                const isOpen = openDropdown === item.id;
                return (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setOpenDropdown(item.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        isOpen
                          ? 'text-[#1D4ED8] bg-blue-50'
                          : 'text-[#0F2547] hover:text-[#1D4ED8] hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#1D4ED8]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 mt-1 transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="space-y-1">
                          {item.children.map((child) => {
                            const IconComponent = child.icon;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 group/item transition-colors"
                              >
                                <div className="p-2 rounded-lg bg-blue-100 text-[#1D4ED8] group-hover/item:bg-[#1D4ED8] group-hover/item:text-white transition-colors">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-[#0F2547] group-hover/item:text-[#1D4ED8] transition-colors">
                                    {child.label}
                                  </div>
                                  <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                    {child.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#1D4ED8] bg-blue-50'
                      : 'text-[#0F2547] hover:text-[#1D4ED8] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/on-kayit"
              className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#0F2547] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-md hover:shadow-lg shadow-amber-400/20 hover:-translate-y-0.5 transition-all duration-200 group flex-shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F2547] group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="hidden sm:inline">Ön Kayıt / Randevu Al</span>
              <span className="sm:hidden">Ön Kayıt</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Menüyü Aç"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bottom-0 bg-white/98 backdrop-blur-md z-50 overflow-y-auto border-t border-slate-200 p-5 shadow-2xl animate-in slide-in-from-top-4 duration-200 flex flex-col justify-between">
            <div className="space-y-4">
              {navLinks.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.id} className="border-b border-slate-100 pb-3">
                      <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2">
                        {item.label}
                      </div>
                      <div className="space-y-1 pl-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center justify-between py-2 text-sm font-semibold text-[#0F2547] hover:text-[#1D4ED8]"
                          >
                            <span>{child.label}</span>
                            <ArrowRight className="w-4 h-4 text-slate-400" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.href} className="border-b border-slate-100 pb-3">
                    <Link
                      href={item.href!}
                      className="block py-1 text-base font-bold text-[#0F2547] hover:text-[#1D4ED8]"
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}

              {/* Mobile Quick Contact & Action */}
              <div className="pt-2 space-y-3">
                <Link
                  href="/on-kayit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-center text-[#0F2547] bg-amber-400 hover:bg-amber-300 shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Ön Kayıt Başvurusu Yap</span>
                </Link>

                <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs text-slate-600">
                  <div className="font-bold text-[#0F2547] text-sm">Hızlı Kampüs Hatları:</div>
                  <div className="flex justify-between items-center py-1">
                    <span>Edirne Kampüsü:</span>
                    <a href="tel:02842250090" className="font-bold text-[#1D4ED8]">0284 225 00 90</a>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span>Kırklareli Kampüsü:</span>
                    <a href="tel:02882149494" className="font-bold text-[#1D4ED8]">0288 214 94 94</a>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span>Tekirdağ Kampüsü:</span>
                    <a href="tel:02822601470" className="font-bold text-[#1D4ED8]">0282 260 14 70</a>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span>Tekirdağ Kursu:</span>
                    <a href="tel:02822619666" className="font-bold text-[#1D4ED8]">0282 261 96 66</a>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span>Lüleburgaz Kursu:</span>
                    <a href="tel:02884157733" className="font-bold text-[#1D4ED8]">0288 415 77 33</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
