'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Staff } from '@/lib/types';
import {
  X,
  GraduationCap,
  Briefcase,
  Award,
  Calendar,
  Building2,
  BookOpen,
} from 'lucide-react';

interface StaffModalProps {
  staff: Staff | null;
  branchName?: string;
  onClose: () => void;
}

export default function StaffModal({ staff, branchName, onClose }: StaffModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (staff) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [staff, onClose]);

  if (!staff) return null;

  const getHierarchyBadge = (level: number) => {
    switch (level) {
      case 1:
        return { label: 'Üst Yönetim', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 2:
        return { label: 'İdari & Rehberlik', color: 'bg-blue-100 text-blue-900 border-blue-300' };
      default:
        return { label: 'Akademik Kadro', color: 'bg-slate-100 text-slate-800 border-slate-300' };
    }
  };

  const badge = getHierarchyBadge(staff.hierarchy_level);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="h-28 bg-gradient-to-r from-[#0F2547] via-[#1A365D] to-[#1D4ED8] relative p-6 flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${badge.color}`}>
              {badge.label}
            </span>
            {branchName && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-xs flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {branchName}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 pb-6 pt-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 mb-5">
            {/* Photo */}
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 flex-shrink-0">
              <img
                src={staff.photo}
                alt={staff.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const initials = staff.name.split(' ').map(n => n[0]).slice(0, 2).join('');
                  (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%230F2547"/><text x="50%" y="54%" font-size="70" font-family="sans-serif" font-weight="bold" fill="%23F59E0B" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;
                }}
              />
            </div>

            {/* Title & Name */}
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-2xl font-extrabold text-[#0F2547]">
                {staff.name}
              </h3>
              <p className="text-sm font-semibold text-[#1D4ED8]">
                {staff.title}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#1D4ED8]" />
                  {staff.subject}
                </span>
                {staff.experience_years > 0 && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-600" />
                    {staff.experience_years}+ Yıl Deneyim
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Education & Bio Details */}
          <div className="space-y-4">
            {/* Education Box */}
            {staff.education && (
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#1D4ED8] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Eğitim Geçmişi / Mezuniyet
                  </div>
                  <div className="text-sm font-semibold text-[#0F2547] mt-0.5">
                    {staff.education}
                  </div>
                </div>
              </div>
            )}

            {/* Biography */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#1D4ED8]" />
                Özgeçmiş & Eğitsel Vizyon
              </div>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {staff.bio || 'Meriç Eğitim Kurumları çatısı altında öğrencilerimizin akademik, sosyal ve zihinsel gelişimine rehberlik etmektedir.'}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <span>Meriç Eğitim Kurumları Onaylı Kadro Profili</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Kapat
                </button>
                <Link
                  href={`/on-kayit?branch=${staff.branch_id}`}
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-bold text-[#0F2547] bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Görüşme / Randevu Al</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
