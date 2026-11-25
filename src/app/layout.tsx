import type { Metadata, Viewport } from 'next';
import './globals.css';
import SiteLayout from '@/components/SiteLayout';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Meriç Koleji - Geleceğin İçin Geleceğin Yer! | Meriç Eğitim Kurumları',
  description:
    'Meriç Eğitim Kurumları: Edirne, Kırklareli ve Tekirdağ kampüsleri ile Anaokulu, İlkokul (OKULİSTİK), Ortaokul (LGS) ve Anadolu Lisesi (YKS) kademelerinde Trakya\'nın eğitim öncüsü.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  keywords: [
    'Meriç Koleji',
    'Meriç Eğitim Kurumları',
    'Edirne Kolej',
    'Tekirdağ Kolej',
    'Kırklareli Kolej',
    'Özel Okul Trakya',
    'OKULİSTİK İlkokul',
    'LGS Hazırlık',
    'YKS Kursu',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-sans antialiased bg-[#f8fafc] text-[#0f172a]">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
