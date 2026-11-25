import React from 'react';
import { db, ensureDbInitialized } from '@/lib/db';
import { Branch, Staff } from '@/lib/types';
import OrgChart from '@/components/OrgChart';
import { Users, Sparkles, Award } from 'lucide-react';



async function getStaffData() {
  await ensureDbInitialized();
  const branchesRes = await db.execute('SELECT * FROM branches ORDER BY order_num ASC');
  const staffRes = await db.execute('SELECT * FROM staff ORDER BY hierarchy_level ASC, order_num ASC, id ASC');

  return {
    branches: branchesRes.rows as unknown as Branch[],
    staff: staffRes.rows as unknown as Staff[],
  };
}

export default async function KadromuzPage() {
  const { branches, staff } = await getStaffData();

  return (
    <div className="py-12 space-y-10">
      {/* Page Title & Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#0F2547] via-[#1A3868] to-[#1D4ED8] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300">
              <Users className="w-4 h-4" />
              <span>Hiyerarşik Organizasyon Şeması</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
              Kadro ve Organizasyon Yapımız
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Trakya&apos;nın seçkin eğitim meşalesi Meriç Eğitim Kurumları; alanında uzman idarecileri, deneyimli zümre başkanları ve rehberlik kadrosu ile öğrencilerimizin geleceğine yön veriyor. Aşağıdaki şube sekmelerini kullanarak her kampüsümüzün hiyerarşik organizasyon şemasını inceleyebilirsiniz.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-amber-300 pt-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Kartlara tıklayarak detaylı özgeçmiş ve eğitim bilgilerini görüntüleyebilirsiniz.</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Org Chart Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <OrgChart branches={branches} initialStaff={staff} />
      </div>
    </div>
  );
}
