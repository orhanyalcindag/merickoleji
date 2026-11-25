import React from 'react';
import Link from 'next/link';
import { Branch } from '@/lib/types';
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  Calendar,
  Sparkles,
  Building2,
  CheckCircle2,
} from 'lucide-react';

interface CampusCardProps {
  branch: Branch;
  staffCount?: number;
}

export default function CampusCard({ branch, staffCount }: CampusCardProps) {
  const getBranchImage = (id: string) => {
    switch (id) {
      case 'edirne':
        return '/images/campus-edirne.jpg';
      case 'kirklareli':
        return '/images/campus-kirklareli.jpg';
      case 'tekirdag':
        return '/images/campus-tekirdag.jpg';
      case 'tekirdag-kurs':
        return '/images/course-center.jpg';
      case 'luleburgaz-kurs':
        return '/images/course-luleburgaz.jpg';
      default:
        return '/images/hero-campus.jpg';
    }
  };

  const featureList = branch.features ? branch.features.split(',').map((f) => f.trim()) : [];

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image header */}
        <div className="relative h-48 overflow-hidden bg-slate-900">
          <img
            src={getBranchImage(branch.id)}
            alt={branch.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2547] via-transparent to-black/30"></div>

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-[#0F2547] shadow-md">
              {branch.city}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-xs">
              {branch.type === 'merkez' ? 'Merkez' : branch.type === 'kurs' ? 'Kurs Merkezi' : 'Kampüs'}
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-xl font-extrabold text-white font-serif drop-shadow-sm">
              {branch.name}
            </h3>
          </div>
        </div>

        {/* Info Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{branch.address}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#1D4ED8] flex-shrink-0" />
              <a
                href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                className="font-bold text-[#0F2547] hover:text-[#1D4ED8] transition-colors"
              >
                {branch.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{branch.email}</span>
            </div>
          </div>

          {/* Features Pills */}
          {featureList.length > 0 && (
            <div className="pt-3 border-t border-slate-100">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Öne Çıkan İmkânlar</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {featureList.slice(0, 4).map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-[#1D4ED8] border border-blue-100/80 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#1D4ED8]" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <a
            href={branch.map_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-slate-500" />
            <span>Yol Tarifi</span>
          </a>

          <Link
            href={`/on-kayit?branch=${branch.id}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-[#0F2547] bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Randevu Al</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
