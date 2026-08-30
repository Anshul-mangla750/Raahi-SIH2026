import React from 'react';
import { Building2, Phone, Mail, MapPin, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompanyInformationCard({ companyData, onEdit }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D7A48] border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight leading-snug">
              Company Information
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-tight">
              Update your company details and contact information.
            </p>
          </div>
        </div>

        {/* Content Body: Left Graphic + Right Information Details */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center mt-2">
          {/* Left: Green Freight Truck Graphic */}
          <div className="sm:col-span-5 h-44 rounded-2xl bg-gradient-to-b from-teal-50/70 to-emerald-100/50 border border-emerald-200/60 p-3 flex items-center justify-center relative overflow-hidden group">
            {/* Background geometric road & sky shapes */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-2 left-3 w-8 h-8 rounded-full bg-emerald-300/40 blur-xs" />
              <div className="absolute bottom-0 inset-x-0 h-12 bg-slate-300/40 rounded-t-xl" />
            </div>

            {/* Truck Graphic */}
            <svg
              viewBox="0 0 160 100"
              className="w-full h-full object-contain relative z-10 filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stacked Cargo Boxes behind */}
              <rect x="15" y="48" width="20" height="20" rx="2" fill="#D97706" />
              <rect x="25" y="32" width="18" height="18" rx="2" fill="#F59E0B" />
              <line x1="25" y1="41" x2="43" y2="41" stroke="#B45309" strokeWidth="1" />

              {/* Truck Trailer Container */}
              <rect x="42" y="24" width="70" height="46" rx="4" fill="#0D7A48" />
              <rect x="45" y="27" width="64" height="40" rx="3" fill="#10B981" fillOpacity="0.85" />
              <line x1="45" y1="46" x2="109" y2="46" stroke="#065F46" strokeWidth="1.5" />
              {/* Small Logo Emblem on Trailer */}
              <circle cx="77" cy="46" r="6" fill="#047857" />
              <path d="M77 43 L80 49 H74 Z" fill="#D1FAE5" />

              {/* Cabin */}
              <path d="M112 34 L128 34 L142 50 L142 70 L112 70 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
              <path d="M116 38 L126 38 L136 49 L116 49 Z" fill="#38BDF8" fillOpacity="0.8" />
              <rect x="139" y="58" width="3" height="6" rx="1" fill="#F59E0B" />

              {/* Chassis & Wheels */}
              <rect x="38" y="67" width="105" height="5" fill="#334155" />
              <circle cx="58" cy="72" r="10" fill="#1E293B" />
              <circle cx="58" cy="72" r="4.5" fill="#94A3B8" />
              <circle cx="95" cy="72" r="10" fill="#1E293B" />
              <circle cx="95" cy="72" r="4.5" fill="#94A3B8" />
              <circle cx="130" cy="72" r="10" fill="#1E293B" />
              <circle cx="130" cy="72" r="4.5" fill="#94A3B8" />
            </svg>
          </div>

          {/* Right: Company Information Details */}
          <div className="sm:col-span-7 space-y-3">
            {/* Company Name */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center flex-shrink-0 text-slate-500 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Company Name
                </span>
                <span className="text-xs font-black text-slate-900 truncate">
                  {companyData.companyName}
                </span>
              </div>
            </div>

            {/* Contact Number */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center flex-shrink-0 text-slate-500 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Contact Number
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {companyData.businessPhone}
                </span>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center flex-shrink-0 text-slate-500 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Email Address
                </span>
                <span className="text-xs font-bold text-slate-800 truncate">
                  {companyData.businessEmail}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center flex-shrink-0 text-slate-500 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Address
                </span>
                <span className="text-xs font-bold text-slate-800 leading-snug">
                  {companyData.companyAddress}, {companyData.city}, {companyData.state} {companyData.pincode}, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="pt-4 border-t border-slate-100 flex justify-end mt-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
        >
          <span>Edit Information</span>
          <Edit3 className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}
