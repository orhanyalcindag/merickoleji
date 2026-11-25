# Meriç Eğitim Kurumları (Meriç Koleji) Web Sitesi & Yönetim Paneli

Türkiye'nin en prestijli özel okul standartlarında (TED, Bahçeşehir, İTÜ GVO) tasarlanmış; modern, dinamik, tam responsive ve kalıcı veritabanı destekli kurumsal kolej web sitesi ve yönetim paneli.

---

## 🌟 Öne Çıkan Özellikler

### 1. Modern Mimari ve Prestijli Tasarım
- **Framework:** Next.js 16 (App Router), React 19, TypeScript.
- **Stil & Tasarım:** Tailwind CSS ile kurumsal renk paleti:
  - **Kurumsal Güven Laciverti:** `#0F2547` / `#0A1930`
  - **Dinamik Eğitim Mavisi:** `#1D4ED8`
  - **Sıcak Kehribar/Altın Vurgusu:** `#F59E0B`
  - **Ferah Açık Zeminler:** `#F8FAFC`
- **İkonografi:** Lucide Icons & özel optimize edilmiş vektörel SVG armalar.
- **Kalıcı Veritabanı:** Dahili SQLite (`@libsql/client`) ile sıfır kurulum gerektiren, taşınabilir ve kalıcı veritabanı mimarisi. İlk çalıştırmada tüm kurumsal veriler, 6 şube ve 40 uzman kadro üyesi ile otomatik dolar (auto-seed).

### 2. Kurumsal Veriler & Şubeler
1. **Genel Müdürlük:** Cumhuriyet Mah. Elif Hanım Sk. Dinçgül İş Merkezi No:9 Kat:2, Süleymanpaşa/Tekirdağ | Tel: 0282 262 02 00 | E-posta: info@mericokullari.com
2. **Edirne Kampüsü:** Kurtuluş Mah. 20214. Sk. Eski TOKİ Mevkii, Edirne | Tel: 0284 225 00 90 (Anaokulu, OKULİSTİK İlkokul, LGS Ortaokul, Anadolu Lisesi)
3. **Kırklareli Kampüsü:** İstasyon Mah. 4. İstasyon Sk. No:21, Kırklareli | Tel: 0288 214 94 94 (Anaokulu, İlkokul, Ortaokul, Anadolu Lisesi)
4. **Tekirdağ Kampüsü:** 100. Yıl Mah. Kerem Sk. No:6, Süleymanpaşa/Tekirdağ | Tel: 0282 260 14 70 (Anaokulu, EYSİS İlkokul, Ortaokul, Anadolu Lisesi)
5. **Meriç Eğitim Kursu (Tekirdağ):** 100. Yıl Mah. Tevfik Kaptan Sk. No:7/3, Süleymanpaşa | Tel: 0282 261 96 66 (LGS & YKS Hazırlık)
6. **Birey Eğitim Kursu (Lüleburgaz):** Siteler Mah. İstasyon Cad. No:79, Lüleburgaz/Kırklareli | Tel: 0288 415 77 33 (YKS & LGS Hazırlık)

---

## 🏛️ Sayfalar ve Kullanıcı Deneyimi

- **Sticky Header (Üst Menü):** Hızlı iletişim barı, kurumsal Meriç Koleji kalkan arması logosu, çok seviyeli açılır menüler, tek tıkla arama ve dikkat çekici **"Ön Kayıt / Randevu Al"** butonu.
- **Ana Sayfa (`/`):**
  - Modern tam ekran Hero bölümü ve kurumsal sloganlar (*"Geleceğin İçin Geleceğin Yer!"*).
  - Hızlı Kademe Kartları: Anaokulu, İlkokul (OKULİSTİK & EYSİS), Ortaokul (LGS Hazırlık), Anadolu Lisesi (YKS).
  - İstatistik Bandı (3 Kampüs, 2 Kurs Merkezi, 150+ Kadro, %98.4 Başarı Oranı).
  - Güncel Duyurular & Haberler (Kategori sekmeli filtreleme: Tümü, Duyurular, Haberler, Başarılar, Etkinlikler).
  - Kampüsler & Kurs Merkezleri rehberi (Tek tıkla ara, yol tarifi ve randevu).
  - Veli görüşleri (slider/grid) ve sosyal medya akışı (Instagram, Facebook, YouTube, WhatsApp).
- **Kadromuz & Organizasyon Şeması (`/kadromuz`):**
  - Üstte 6 birim için **Şube Seçici Sekmeler (Tabs)**.
  - Hiyerarşik bağlantı çizgileri içeren **Ağaç Şeması (Org Chart)**:
    - **1. Seviye (Tepe):** Kurucu & Genel Müdür veya Kampüs Müdürü (Altın taç rozetli tepe kartı).
    - **2. Seviye:** Müdür Yardımcıları & Rehberlik (PDR) Birimi.
    - **3. Seviye:** Branş Zümreleri ve Öğretmenler (Matematik, Fen, Türkçe, Yabancı Dil, Sınıf Öğretmenleri, Robotik vb.).
  - Herhangi bir karta tıklandığında açılan detaylı **Kadro Modalı** (Fotoğraf, unvan, eğitim geçmişi, deneyim, biyografi ve randevu butonu).
- **Kademeler:**
  - `/egitim/anaokulu`: Çift dilli öğrenme, montessori ve erken çocukluk.
  - `/egitim/ilkokul`: OKULİSTİK ve EYSİS dijital takip altyapısı.
  - `/egitim/ortaokul`: Yoğun LGS hazırlık kampları ve soru çözüm ofisleri.
  - `/egitim/lise`: YKS (TYT-AYT) maratonu ve kariyer rehberliği.
- **Kurumsal:**
  - `/hakkimizda`: Tarihçe, misyon ve vizyon.
  - `/basarilarimiz`: LGS ve YKS gurur tabloları, derece listeleri.
  - `/anlasmali-kurumlar`: Üniversiteler, ticaret odaları ve barolar ile kurumsal protokoller.
- **Ön Kayıt & İletişim:**
  - `/on-kayit`: Veli adı, telefon, öğrenci sınıf düzeyi ve şube seçilebilen interaktif başvuru formu (veriler anında `/admin` paneline düşer).
  - `/iletisim`: 6 birimin tüm adres, telefon ve harita detayları.

---

## ⚙️ Yönetim Paneli (`/admin`)

Yönetim paneline `/admin` rotasından erişilir:
- **Giriş Bilgileri:**
  - **Kullanıcı Adı:** `admin`
  - **Şifre:** `meric2025` (veya `admin123`)
  *(Giriş ekranında geliştirme ve test kolaylığı için "Otomatik Doldur" butonu mevcuttur)*

### Yönetim Modülleri:
1. **Dashboard (`/admin`):**
   - Toplam ön kayıt, bekleyen başvurular, toplam kadro, haber ve kampüs sayaçları.
   - Son gelen veli ön kayıt başvuruları tablosu (hızlı arandı/bekliyor/kayıt yapıldı durum güncellemesi).
2. **Kadro Yönetimi (`/admin/kadro`):**
   - Şube bazında öğretmen/yönetici ekleme, düzenleme ve silme.
   - Şube, Ad-Soyad, Unvan, Hiyerarşi Seviyesi (1, 2, 3), Branş, Fotoğraf URL, Eğitim, Deneyim ve Sıralama yönetimi.
3. **Duyuru & Haber Yönetimi (`/admin/haberler`):**
   - Yeni haber, duyuru, etkinlik veya başarı oluşturma.
   - Başlık, tür, kampüs filtresi, kapak görseli, özet, zengin metin, öne çıkarma ve yayına alma toggle'ları.
4. **Başvuru Yönetimi (`/admin/basvurular`):**
   - Gelen tüm veli taleplerini filtreleme, durumunu değiştirme (`bekliyor`, `arandi`, `kayit-tamamlandi`, `iptal`), veliyi tek tıkla arama.
5. **Kurum & Sosyal Medya Ayarları (`/admin/ayarlar`):**
   - Genel merkez telefonu, e-postası, adresi, sloganı ile Instagram, Facebook, YouTube ve WhatsApp numaralarını tek ekrandan güncelleme.

---

## 🚀 Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın (port 3000)
npm run dev

# veya Üretim derlemesi alıp çalıştırın
npm run build
npm run start
```

Sunucu başladığında tarayıcınızdan `http://localhost:3000` adresine giderek siteyi, `http://localhost:3000/admin` adresine giderek yönetim panelini test edebilirsiniz.
