import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsAppIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-[#0A1930] text-slate-300 pt-16 pb-8 border-t border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: About & Logo (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Meriç Eğitim Kurumları; Trakya&apos;nın öncü eğitim meşalesi olarak anaokulundan üniversite kapılarına uzanan yolculukta bilimin, aklın ve insani değerlerin ışığında dünya vatandaşı liderler yetiştirir.
            </p>
            <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-800/40 text-xs">
              <span className="text-amber-400 font-bold block mb-1">Kurumsal Sloganımız:</span>
              <span className="italic text-slate-200">
                &ldquo;Geleceğin İçin Geleceğin Yer! Geleceği Şekillendiren Eğitim.&rdquo;
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/merickoleji"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#E1306C] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/merickoleji"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@merickoleji"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/902822620200"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#25D366] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Fast Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-blue-900/80 pb-2">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ana Sayfa</span>
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Biz Kimiz?</span>
                </Link>
              </li>
              <li>
                <Link href="/kadromuz" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-semibold">Organizasyon Şeması</span>
                </Link>
              </li>
              <li>
                <Link href="/basarilarimiz" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Başarılarımız</span>
                </Link>
              </li>
              <li>
                <Link href="/anlasmali-kurumlar" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Anlaşmalı Kurumlar</span>
                </Link>
              </li>
              <li>
                <Link href="/haberler" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Haberler & Duyurular</span>
                </Link>
              </li>
              <li>
                <Link href="/on-kayit" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300">Ön Kayıt Başvurusu</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-slate-400">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Yönetici Paneli</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Education Programs (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-blue-900/80 pb-2">
              Kademelerimiz
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/egitim/anaokulu" className="hover:text-amber-400 transition-colors">
                  Meriç Anaokulu
                </Link>
              </li>
              <li>
                <Link href="/egitim/ilkokul" className="hover:text-amber-400 transition-colors">
                  İlkokul (OKULİSTİK & EYSİS)
                </Link>
              </li>
              <li>
                <Link href="/egitim/ortaokul" className="hover:text-amber-400 transition-colors">
                  Ortaokul (LGS Hazırlık)
                </Link>
              </li>
              <li>
                <Link href="/egitim/lise" className="hover:text-amber-400 transition-colors">
                  Anadolu Lisesi (YKS)
                </Link>
              </li>
              <li>
                <Link href="/kampusler" className="hover:text-amber-400 transition-colors">
                  Tekirdağ Kurs Merkezi
                </Link>
              </li>
              <li>
                <Link href="/kampusler" className="hover:text-amber-400 transition-colors">
                  Lüleburgaz Birey Kursu
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact Directory (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-blue-900/80 pb-2">
              Kampüslerimiz & Şubelerimiz
            </h4>

            <div className="space-y-3 text-xs">
              {/* Edirne */}
              <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                <div className="text-white font-bold flex justify-between items-center mb-0.5">
                  <span className="text-amber-300">Edirne Kampüsü</span>
                  <a href="tel:02842250090" className="text-blue-400 hover:text-white flex items-center gap-1 font-semibold">
                    <Phone className="w-3 h-3" /> 0284 225 00 90
                  </a>
                </div>
                <p className="text-slate-400 truncate">Kurtuluş Mah. 20214. Sk. Eski TOKİ Mevkii, Edirne</p>
              </div>

              {/* Kırklareli */}
              <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                <div className="text-white font-bold flex justify-between items-center mb-0.5">
                  <span className="text-amber-300">Kırklareli Kampüsü</span>
                  <a href="tel:02882149494" className="text-blue-400 hover:text-white flex items-center gap-1 font-semibold">
                    <Phone className="w-3 h-3" /> 0288 214 94 94
                  </a>
                </div>
                <p className="text-slate-400 truncate">İstasyon Mah. 4. İstasyon Sk. No:21, Kırklareli</p>
              </div>

              {/* Tekirdağ */}
              <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                <div className="text-white font-bold flex justify-between items-center mb-0.5">
                  <span className="text-amber-300">Tekirdağ Kampüsü</span>
                  <a href="tel:02822601470" className="text-blue-400 hover:text-white flex items-center gap-1 font-semibold">
                    <Phone className="w-3 h-3" /> 0282 260 14 70
                  </a>
                </div>
                <p className="text-slate-400 truncate">100. Yıl Mah. Kerem Sk. No:6, Süleymanpaşa/Tekirdağ</p>
              </div>

              {/* Kurs Merkezleri */}
              <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-amber-300 font-bold">Tekirdağ Kursu:</div>
                  <div className="text-slate-400">Tevfik Kaptan Sk. No:7/3</div>
                </div>
                <a href="tel:02822619666" className="text-blue-400 hover:text-white font-semibold">
                  0282 261 96 66
                </a>
              </div>

              <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-amber-300 font-bold">Lüleburgaz Birey Kursu:</div>
                  <div className="text-slate-400">İstasyon Cad. No:79</div>
                </div>
                <a href="tel:02884157733" className="text-blue-400 hover:text-white font-semibold">
                  0288 415 77 33
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-center lg:text-left">
            <span>© {new Date().getFullYear()} Meriç Eğitim Kurumları. Tüm hakları saklıdır.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-slate-400">
              Tasarım & Yazılım:{' '}
              <a
                href="https://gridlabsoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-200 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
              >
                <span>gridlabsoft</span>
              </a>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              MEB Onaylı Özel Eğitim Kurumu
            </span>
            <Link href="/iletisim" className="hover:text-slate-300 transition-colors">
              KVKK & Gizlilik Politikası
            </Link>
            <Link href="/admin" className="hover:text-amber-400 transition-colors">
              Personel / Yönetim Girişi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
