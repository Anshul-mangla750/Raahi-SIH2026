import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function SettingsHeaderBanner() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1E36] tracking-tight leading-tight">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-0.5">
          Manage your account, preferences and system settings.
        </p>
      </div>

      {/* Decorative Logistics Illustration Banner */}
      <div className="relative hidden sm:flex items-center justify-end h-16 w-80 flex-shrink-0 overflow-hidden select-none pointer-events-none">
        {/* Background Hills */}
        <svg
          viewBox="0 0 300 80"
          className="absolute inset-0 w-full h-full opacity-60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 65 Q 60 30, 130 50 T 260 40 T 320 60 L 320 80 L 0 80 Z"
            fill="#E2E8F0"
          />
          <path
            d="M20 70 Q 80 40, 160 55 T 300 45 L 300 80 L 20 80 Z"
            fill="#CBD5E1"
            opacity="0.4"
          />
          {/* Subtle green tree silhouettes */}
          <circle cx="90" cy="45" r="8" fill="#10B981" opacity="0.3" />
          <circle cx="105" cy="48" r="6" fill="#059669" opacity="0.35" />
          <circle cx="210" cy="42" r="7" fill="#10B981" opacity="0.3" />
        </svg>

        {/* Green Delivery Truck SVG */}
        <div className="relative z-10 mr-12 transform scale-90 -translate-y-1">
          <svg width="120" height="50" viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cargo Box */}
            <rect x="5" y="10" width="75" height="30" rx="3" fill="#0D7A48" />
            <rect x="8" y="13" width="69" height="24" rx="2" fill="#10B981" fillOpacity="0.8" />
            {/* Horizontal Line on Box */}
            <line x1="8" y1="25" x2="77" y2="25" stroke="#065F46" strokeWidth="1.5" />
            {/* Truck Cabin */}
            <path d="M80 18 L95 18 L106 28 L106 40 L80 40 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            {/* Cabin Windshield */}
            <path d="M84 21 L93 21 L101 28 L84 28 Z" fill="#0284C7" fillOpacity="0.75" />
            {/* Headlight */}
            <rect x="104" y="32" width="2" height="4" rx="1" fill="#FBBF24" />
            {/* Chassis */}
            <rect x="3" y="38" width="103" height="3" fill="#334155" />
            {/* Wheels */}
            <circle cx="22" cy="41" r="7" fill="#1E293B" />
            <circle cx="22" cy="41" r="3" fill="#94A3B8" />
            <circle cx="65" cy="41" r="7" fill="#1E293B" />
            <circle cx="65" cy="41" r="3" fill="#94A3B8" />
            <circle cx="95" cy="41" r="7" fill="#1E293B" />
            <circle cx="95" cy="41" r="3" fill="#94A3B8" />
          </svg>
        </div>

        {/* Security Shield */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md border-2 border-white">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
