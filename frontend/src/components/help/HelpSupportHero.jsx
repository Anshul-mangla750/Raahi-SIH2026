import React from 'react';
import { Search, Headphones, MapPin } from 'lucide-react';

export default function HelpSupportHero({ searchQuery, onSearchChange }) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-[#0A4D2E] to-[#0B1E36] p-6 sm:p-8 text-white relative overflow-hidden shadow-sm border border-emerald-800/60">
      {/* Background Subtle Mountain Curve */}
      <svg
        viewBox="0 0 800 200"
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 160 Q 200 60, 400 120 T 800 90 L 800 200 L 0 200 Z"
          fill="#10B981"
        />
      </svg>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Text & Search Input */}
        <div className="max-w-xl space-y-3.5">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
              Support & Knowledge Base
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mt-0.5">
              How can we help you?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 font-medium mt-1 leading-relaxed">
              Find answers to common questions or get in touch with our 24/7 Northeast logistics support team.
            </p>
          </div>

          {/* Search Input Bar - Search icon properly aligned on left */}
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4 text-emerald-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for help topics, questions, or guides..."
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white text-slate-900 placeholder:text-slate-400 rounded-2xl border border-emerald-700/50 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 font-medium transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right: Clean Logistics & Support Illustration */}
        <div className="hidden lg:flex items-center justify-center relative w-64 h-36 flex-shrink-0 select-none pointer-events-none">
          {/* Glowing support circle badge */}
          <div className="absolute -top-1 right-12 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg flex items-center justify-center border-2 border-white/80 z-20 animate-pulse">
            <Headphones className="w-6 h-6 text-white" />
          </div>

          {/* Location Pin Badge */}
          <div className="absolute top-2 left-6 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md flex items-center justify-center border-2 border-white/80 z-20">
            <MapPin className="w-4 h-4 text-white" />
          </div>

          {/* Subtle Illustrated Green Delivery Truck */}
          <div className="relative z-10 transform scale-95 translate-y-3">
            <svg width="150" height="70" viewBox="0 0 150 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Cargo Box */}
              <rect x="10" y="15" width="85" height="38" rx="4" fill="#059669" />
              <rect x="13" y="18" width="79" height="32" rx="3" fill="#10B981" fillOpacity="0.9" />
              <line x1="13" y1="34" x2="92" y2="34" stroke="#047857" strokeWidth="1.5" />

              {/* RAAHI Arrow Accent on Box */}
              <path d="M45 28 L55 34 L45 40 Z" fill="#D1FAE5" />

              {/* Cabin */}
              <path d="M96 24 L114 24 L128 38 L128 53 L96 53 Z" fill="#F8FAFC" />
              <path d="M100 27 L112 27 L122 37 L100 37 Z" fill="#38BDF8" fillOpacity="0.85" />
              <rect x="126" y="44" width="2" height="5" rx="1" fill="#F59E0B" />

              {/* Chassis */}
              <rect x="8" y="52" width="122" height="4" fill="#334155" />

              {/* Wheels */}
              <circle cx="32" cy="56" r="9" fill="#1E293B" />
              <circle cx="32" cy="56" r="4" fill="#94A3B8" />
              <circle cx="75" cy="56" r="9" fill="#1E293B" />
              <circle cx="75" cy="56" r="4" fill="#94A3B8" />
              <circle cx="114" cy="56" r="9" fill="#1E293B" />
              <circle cx="114" cy="56" r="4" fill="#94A3B8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
