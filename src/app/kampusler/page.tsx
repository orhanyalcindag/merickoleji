import React from 'react';
import { db, ensureDbInitialized } from '@/lib/db';
import { Branch } from '@/lib/types';
import CampusCard from '@/components/CampusCard';
import { Building2, GraduationCap, MapPin, Sparkles } from 'lucide-react';



async function getBranches() {
  await ensureDbInitialized();
  const res = await db.execute('SELECT * FROM branches ORDER BY order_num ASC');
  return res.rows as unknown as Branch[];
}

export default async function KampuslerPage() {
  const branches = await getBranches();
  const campuses = branches.filter((b) => b.type === 'kampus');
  const courses = branches.filter((b) => b.type === 'kurs');
  const headquarters = branches.filter((b) => b.type === 'merkez');

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F2547] via-[#1A365D] to-[#1D4ED8] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300">
            <MapPin className="w-4 h-4" />
            <span>Trakya Genelinde 6 Yerleşke</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Kampüslerimiz & Kurs Merkezlerimiz
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Edirne, Kırklareli, Tekirdağ ve Lüleburgaz&apos;daki çağdaş eğitim kampüslerimiz ve sınav hazırlık kurs merkezlerimizle geleceği şekillendiriyoruz.
          </p>
        </div>
      </div>

      {/* Kolej Kampüsleri */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Building2 className="w-6 h-6 text-[#1D4ED8]" />
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F2547]">
              Kolej Kampüslerimiz
            </h2>
            <p className="text-xs text-slate-500">
              Anaokulu, İlkokul, Ortaokul ve Anadolu Lisesi kademelerinde kesintisiz eğitim veren entegre yerleşkelerimiz.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campuses.map((c) => (
            <CampusCard key={c.id} branch={c} />
          ))}
        </div>
      </div>

      {/* Özel Eğitim Kurs Merkezleri */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <GraduationCap className="w-6 h-6 text-amber-500" />
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F2547]">
              Özel Eğitim Kurs Merkezlerimiz
            </h2>
            <p className="text-xs text-slate-500">
              LGS ve YKS maratonuna yönelik yoğun etüt, birebir soru çözümü ve Türkiye Geneli deneme programları.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((c) => (
            <CampusCard key={c.id} branch={c} />
          ))}
        </div>
      </div>

      {/* Genel Merkez */}
      {headquarters.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-extrabold text-[#0F2547]">
            Genel Müdürlük & İdari Merkez
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {headquarters.map((h) => (
              <CampusCard key={h.id} branch={h} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
