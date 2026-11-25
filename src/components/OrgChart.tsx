'use client';

import React, { useState } from 'react';
import { Branch, Staff } from '@/lib/types';
import StaffModal from './StaffModal';
import {
  Users,
  Building2,
  Phone,
  MapPin,
  Search,
  Crown,
  Shield,
  BookOpen,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface OrgChartProps {
  branches: Branch[];
  initialStaff: Staff[];
}

const getAvatarFallback = (staff: { name: string; gender?: string }) => {
  if (staff.gender === 'erkek') return '/images/staff/default-male.svg';
  if (staff.gender === 'kadin') return '/images/staff/default-female.svg';
  // Fallback by common female letters or names if gender unset
  return '/images/staff/default-female.svg';
};

export default function OrgChart({ branches, initialStaff }: OrgChartProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(branches[0]?.id || 'genel-mudurluk');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'tree' | 'grid' | 'official'>('tree');

  const officialImages: Record<string, { title: string; image: string }> = {
    edirne: {
      title: 'Edirne Kampüsü Resmi Kadro Ağacı',
      image: '/images/staff/edirne-kadro-agaci.png',
    },
    kirklareli: {
      title: 'Kırklareli Kampüsü Resmi Kadro Ağacı',
      image: '/images/staff/kirklareli-kadro-agaci.png',
    },
    tekirdag: {
      title: 'Tekirdağ Kampüsü Resmi Kadro Ağacı',
      image: '/images/staff/tekirdag-kadro-agaci.png',
    },
  };

  // Filter staff by selected branch
  const branchStaff = initialStaff.filter((s) => s.branch_id === selectedBranchId);
  const currentBranch = branches.find((b) => b.id === selectedBranchId);

  // Apply search query if present
  const filteredStaff = searchQuery
    ? branchStaff.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : branchStaff;

  // Split into hierarchy levels
  const level1 = filteredStaff.filter((s) => s.hierarchy_level === 1);
  const level2 = filteredStaff.filter((s) => s.hierarchy_level === 2);
  const level3 = filteredStaff.filter((s) => s.hierarchy_level === 3);

  // Group level 3 by subject / department for clean visual organization
  const subjectGroups: { [subject: string]: Staff[] } = {};
  level3.forEach((staff) => {
    const key = staff.subject || 'Diğer Branşlar';
    if (!subjectGroups[key]) subjectGroups[key] = [];
    subjectGroups[key].push(staff);
  });

  return (
    <div className="space-y-8">
      {/* 1. BRANCH SELECTOR TABS */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200/80">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
          <span>Şube ve Kampüs Seçimi:</span>
          <span className="text-[#1D4ED8] font-semibold">{branches.length} Kurumsal Birim</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {branches.map((b) => {
            const isSelected = b.id === selectedBranchId;
            return (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBranchId(b.id);
                  setSearchQuery('');
                  if (viewMode === 'official' && !officialImages[b.id]) {
                    setViewMode('tree');
                  }
                }}
                className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#0F2547] text-amber-400 shadow-md shadow-blue-950/20'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-[#0F2547]'
                }`}
              >
                <Building2 className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{b.name}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    isSelected ? 'bg-amber-400 text-[#0F2547]' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {initialStaff.filter((s) => s.branch_id === b.id).length} Kişi
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CAMPUS DETAILS BANNER */}
      {currentBranch && (
        <div className="bg-gradient-to-r from-[#0F2547] via-[#163560] to-[#1D4ED8] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/10 via-blue-500/10 to-transparent pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentBranch.type === 'merkez' ? 'Genel Müdürlük ve Yönetim' : currentBranch.type === 'kurs' ? 'Özel Eğitim Kurs Merkezi' : 'Kolej ve Kampüs Yerleşkesi'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
                {currentBranch.name}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  {currentBranch.address}
                </span>
                <a
                  href={`tel:${currentBranch.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-1.5 text-amber-300 hover:text-white font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {currentBranch.phone}
                </a>
              </div>
              {currentBranch.features && (
                <p className="text-xs text-slate-300/90 pt-1">
                  <span className="font-bold text-amber-400">Birim Donanımları: </span>
                  {currentBranch.features}
                </p>
              )}
            </div>

            {/* View Switcher & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Kadroda ara (ad, branş)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-56 pl-9 pr-3 py-2 rounded-xl text-xs bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* View Toggle */}
              <div className="bg-black/25 p-1 rounded-xl flex items-center border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setViewMode('tree')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    viewMode === 'tree' ? 'bg-amber-400 text-[#0F2547] font-bold shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Şema Görünümü
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-amber-400 text-[#0F2547] font-bold shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Zümre Listesi
                </button>
                {officialImages[selectedBranchId] && (
                  <button
                    onClick={() => setViewMode('official')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      viewMode === 'official' ? 'bg-amber-400 text-[#0F2547] font-bold shadow-xs' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>Orijinal Afiş</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. ORGANIZATIONAL CHART (TREE, GRID, OR OFFICIAL IMAGE VIEW) */}
      {viewMode === 'official' && officialImages[selectedBranchId] ? (
        /* OFFICIAL IMAGE VIEW */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-xs font-bold text-[#1D4ED8] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Resmi Web Sitesi Kadro Afişi</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2547]">
                {officialImages[selectedBranchId].title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Kurumun resmi web sitesinde yayımlanan orijinal hiyerarşik kadro ağacı görselidir. Detaylı incelemek için görsele tıklayabilir veya tam boyutta açabilirsiniz.
              </p>
            </div>
            <a
              href={officialImages[selectedBranchId].image}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F2547] hover:bg-[#1D4ED8] text-amber-400 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
            >
              <span>Orijinal Afişi Tam Boyutta Aç ↗</span>
            </a>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center p-3 sm:p-6">
            <a
              href={officialImages[selectedBranchId].image}
              target="_blank"
              rel="noopener noreferrer"
              title="Tam boyutta görüntülemek için tıklayın"
              className="block cursor-zoom-in group"
            >
              <img
                src={officialImages[selectedBranchId].image}
                alt={officialImages[selectedBranchId].title}
                className="w-full max-h-[80vh] object-contain rounded-xl shadow-lg group-hover:scale-[1.01] transition-transform duration-200"
              />
            </a>
          </div>
        </div>
      ) : viewMode === 'tree' ? (
        <div className="relative bg-gradient-to-b from-slate-50 to-blue-50/40 rounded-3xl p-4 sm:p-6 lg:p-10 border border-slate-200 shadow-inner overflow-x-auto">
          {/* Mobile Scroll Hint Banner */}
          <div className="lg:hidden flex items-center justify-between p-2.5 mb-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            <span className="font-semibold flex items-center gap-1.5">
              <span>👉 Şemayı sağa/sola kaydırarak inceleyebilirsiniz</span>
            </span>
            <button
              onClick={() => setViewMode('grid')}
              className="text-[11px] font-black underline text-[#1D4ED8] shrink-0 ml-2"
            >
              Listeye Geç
            </button>
          </div>

          {/* Legend Banner */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-semibold text-slate-600 mb-6 sm:mb-8 pb-4 border-b border-slate-200">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 border border-amber-600 inline-block shadow-xs"></span>
              <span>1. Seviye: Üst Yönetim & Kampüs Müdürlüğü</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-800 inline-block shadow-xs"></span>
              <span>2. Seviye: Müdür Yardımcıları & Rehberlik (PDR)</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-white border border-slate-400 inline-block shadow-xs"></span>
              <span>3. Seviye: Branş Zümreleri & Öğretmenler</span>
            </span>
          </div>

          <div className="min-w-[700px] flex flex-col items-center">
            {/* LEVEL 1: TOP MANAGEMENT */}
            <div className="flex flex-col items-center">
              <div className="text-xs font-extrabold uppercase tracking-widest text-amber-600 mb-3 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-500" />
                <span>Üst Yönetim / Kurum Lideri</span>
              </div>

              {level1.length === 0 ? (
                <div className="text-xs text-slate-400 italic">Yönetici kaydı bulunamadı</div>
              ) : (
                <div className="flex flex-wrap justify-center gap-6">
                  {level1.map((leader) => (
                    <div
                      key={leader.id}
                      onClick={() => setSelectedStaff(leader)}
                      className="group cursor-pointer bg-white rounded-2xl p-5 border-2 border-amber-400 shadow-lg hover:shadow-2xl hover:border-amber-500 hover:-translate-y-1 transition-all duration-200 w-80 relative flex flex-col items-center text-center"
                    >
                      {/* Golden Crown Ribbon */}
                      <div className="absolute -top-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-[#0F2547] text-[11px] font-black uppercase px-3 py-0.5 rounded-full shadow-md flex items-center gap-1">
                        <Crown className="w-3 h-3 text-[#0F2547]" />
                        <span>1. Seviye Tepe Yönetim</span>
                      </div>

                      {/* Photo */}
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md mb-3 bg-slate-100">
                        <img
                          src={leader.photo}
                          alt={leader.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = getAvatarFallback(leader);
                          }}
                        />
                      </div>

                      <h4 className="text-lg font-extrabold text-[#0F2547] group-hover:text-[#1D4ED8] transition-colors">
                        {leader.name}
                      </h4>
                      <p className="text-xs font-bold text-amber-700 mt-0.5">
                        {leader.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {leader.education}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 w-full flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold text-[#1D4ED8]">{leader.subject}</span>
                        <span className="font-bold text-amber-600">{leader.experience_years}+ Yıl</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* VERTICAL CONNECTOR LINE (From Level 1 to Level 2) */}
              <div className="w-0.5 h-12 bg-gradient-to-b from-amber-400 to-blue-600 my-1"></div>
            </div>

            {/* LEVEL 2: VICE PRINCIPALS & PDR */}
            <div className="w-full flex flex-col items-center">
              {/* Horizontal crossbar connecting level 2 */}
              <div className="relative w-3/4 max-w-4xl h-4">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-600 -mt-1"></div>
              </div>

              <div className="text-xs font-extrabold uppercase tracking-widest text-[#1D4ED8] mb-3 flex items-center gap-1.5 mt-2">
                <Shield className="w-4 h-4 text-[#1D4ED8]" />
                <span>İdari Koordinasyon & Rehberlik (PDR)</span>
              </div>

              {level2.length === 0 ? (
                <div className="text-xs text-slate-400 italic">İdari kadro kaydı bulunamadı</div>
              ) : (
                <div className="flex flex-wrap justify-center gap-5 max-w-5xl">
                  {level2.map((admin) => (
                    <div
                      key={admin.id}
                      onClick={() => setSelectedStaff(admin)}
                      className="group cursor-pointer bg-white rounded-xl p-4 border border-blue-200 shadow-md hover:shadow-xl hover:border-[#1D4ED8] hover:-translate-y-1 transition-all duration-200 w-64 flex flex-col items-center text-center"
                    >
                      <div className="w-18 h-18 rounded-xl overflow-hidden border border-blue-300 shadow-sm mb-2.5 bg-slate-100">
                        <img
                          src={admin.photo}
                          alt={admin.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = getAvatarFallback(admin);
                          }}
                        />
                      </div>
                      <h4 className="text-sm font-extrabold text-[#0F2547] group-hover:text-[#1D4ED8] transition-colors">
                        {admin.name}
                      </h4>
                      <p className="text-[11px] font-bold text-[#1D4ED8] mt-0.5 line-clamp-1">
                        {admin.title}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                        {admin.subject}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* VERTICAL CONNECTOR LINE (From Level 2 to Level 3) */}
              <div className="w-0.5 h-12 bg-gradient-to-b from-blue-600 to-slate-400 my-1"></div>
            </div>

            {/* LEVEL 3: ACADEMIC FACULTY & DEPARTMENTS */}
            <div className="w-full flex flex-col items-center">
              {/* Horizontal crossbar connecting level 3 */}
              <div className="relative w-5/6 max-w-5xl h-4">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-300"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-400 -mt-1"></div>
              </div>

              <div className="text-xs font-extrabold uppercase tracking-widest text-slate-700 mb-6 flex items-center gap-1.5 mt-2">
                <BookOpen className="w-4 h-4 text-[#1D4ED8]" />
                <span>Akademik Zümre Başkanları & Uzman Öğretmen Kadrosu</span>
              </div>

              {level3.length === 0 ? (
                <div className="text-xs text-slate-400 italic">Öğretmen kaydı bulunamadı</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
                  {level3.map((teacher) => (
                    <div
                      key={teacher.id}
                      onClick={() => setSelectedStaff(teacher)}
                      className="group cursor-pointer bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3.5"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-2xs flex-shrink-0 bg-slate-100">
                        <img
                          src={teacher.photo}
                          alt={teacher.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = getAvatarFallback(teacher);
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] block truncate">
                          {teacher.subject}
                        </span>
                        <h5 className="text-xs sm:text-sm font-extrabold text-[#0F2547] group-hover:text-[#1D4ED8] transition-colors truncate">
                          {teacher.name}
                        </h5>
                        <p className="text-[11px] text-slate-500 truncate">
                          {teacher.title}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1D4ED8] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW GROUPED BY SUBJECT */
        <div className="space-y-6">
          {Object.entries(subjectGroups).map(([subject, members]) => (
            <div key={subject} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-extrabold text-[#0F2547] flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <GraduationCap className="w-5 h-5 text-[#1D4ED8]" />
                <span>{subject} Zümresi</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#1D4ED8]">
                  {members.length} Öğretmen
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((teacher) => (
                  <div
                    key={teacher.id}
                    onClick={() => setSelectedStaff(teacher)}
                    className="group cursor-pointer p-3.5 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-center gap-3.5"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-2xs flex-shrink-0 bg-slate-100">
                      <img
                        src={teacher.photo}
                        alt={teacher.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = getAvatarFallback(teacher);
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-[#0F2547] group-hover:text-[#1D4ED8] transition-colors truncate">
                        {teacher.name}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">{teacher.title}</p>
                      <p className="text-[11px] text-amber-700 font-medium mt-0.5 truncate">
                        {teacher.education}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. MODAL POPUP */}
      <StaffModal
        staff={selectedStaff}
        branchName={currentBranch?.name}
        onClose={() => setSelectedStaff(null)}
      />
    </div>
  );
}
