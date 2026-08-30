import React from 'react';
import { Headphones, MessageSquare } from 'lucide-react';

export default function HelpHeaderBanner() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1E36] tracking-tight leading-tight">
          Help & Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-1 max-w-xl">
          We&apos;re here to help you, anytime, anywhere. Choose a way to get support or find answers quickly.
        </p>
      </div>

      {/* Decorative Logistics & 24/7 Support Banner */}
      <div className="relative hidden sm:flex items-center justify-end h-20 w-96 flex-shrink-0 select-none pointer-events-none overflow-hidden">
        {/* Background Hills */}
        <svg
          viewBox="0 0 320 80"
          className="absolute inset-0 w-full h-full opacity-40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 65 Q 60 30, 130 50 T 260 40 T 320 60 L 320 80 L 0 80 Z"
            fill="#E2E8F0"
          />
          <circle cx="80" cy="40" r="7" fill="#10B981" opacity="0.3" />
          <circle cx="95" cy="43" r="5" fill="#059669" opacity="0.35" />
          <circle cx="210" cy="38" r="6" fill="#10B981" opacity="0.3" />
        </svg>

        {/* Green Delivery Freight Truck with RAAHI logo */}
        <div className="relative z-10 mr-16 transform scale-90 -translate-y-1">
          <svg width="130" height="55" viewBox="0 0 130 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cargo Box */}
            <rect x="5" y="10" width="80" height="32" rx="3" fill="#0D7A48" />
            <rect x="8" y="13" width="74" height="26" rx="2" fill="#10B981" fillOpacity="0.85" />
            {/* RAAHI Text on Truck */}
            <text x="45" y="30" fill="white" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              RAAHI
            </text>
            {/* Truck Cabin */}
            <path d="M85 18 L102 18 L114 29 L114 42 L85 42 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <path d="M89 21 L100 21 L109 29 L89 29 Z" fill="#0284C7" fillOpacity="0.75" />
            {/* Headlight */}
            <rect x="112" y="34" width="2" height="4" rx="1" fill="#FBBF24" />
            {/* Chassis */}
            <rect x="3" y="40" width="112" height="3" fill="#334155" />
            {/* Wheels */}
            <circle cx="24" cy="43" r="7" fill="#1E293B" />
            <circle cx="24" cy="43" r="3" fill="#94A3B8" />
            <circle cx="70" cy="43" r="7" fill="#1E293B" />
            <circle cx="70" cy="43" r="3" fill="#94A3B8" />
            <circle cx="102" cy="43" r="7" fill="#1E293B" />
            <circle cx="102" cy="43" r="3" fill="#94A3B8" />
          </svg>
        </div>

        {/* Stacked Cargo Boxes */}
        <div className="absolute right-12 bottom-3 z-15 transform scale-75">
          <div className="w-5 h-5 rounded-xs bg-[#D97706] border border-[#B45309]" />
          <div className="w-4 h-4 rounded-xs bg-[#F59E0B] border border-[#D97706] -mt-2 ml-3" />
        </div>

        {/* 24/7 Headset Badge */}
        <div className="absolute right-1 top-2 z-20 w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex flex-col items-center justify-center shadow-md border-2 border-white">
          <Headphones className="w-5 h-5 text-white" />
          <span className="text-[8px] font-black text-emerald-100 leading-none mt-0.5">24/7</span>
        </div>

        {/* Floating Chat Bubble */}
        <div className="absolute right-14 top-1 z-20 px-2 py-0.5 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
        </div>
      </div>
    </div>
  );
}
