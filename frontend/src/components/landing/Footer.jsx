import React from 'react';
import footerMountains from '../../assets/footer-mountains.jpg';

export default function Footer() {
  return (
    <footer
      className="relative w-full py-16 sm:py-20 select-none bg-cover bg-bottom bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${footerMountains})` }}
    >
      {/* Subtle overlay for text contrast preserving the mountain image */}
      <div className="absolute inset-0 bg-[#061122]/60 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-2.5">
        {/* Centered Brand Logo */}
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-8.5 h-8.5 flex-shrink-0 flex items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-400/30">
            <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7L33 29H7L20 7Z" fill="#10B981" />
              <path d="M20 7L28 29H12L20 7Z" fill="#34D399" fillOpacity="0.85" />
              <path 
                d="M10 29C15 24 17 27 24 22C28 19 31 29 31 29" 
                stroke="#60A5FA" 
                strokeWidth="3.2" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
          <div className="flex items-baseline tracking-tight">
            <span className="text-2xl sm:text-3xl font-black text-white">NER Logi</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">Smart</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-slate-200 font-medium tracking-wide">
          Smart Logistics. Stronger Northeast.
        </p>

        {/* Copyright */}
        <p className="text-[11px] sm:text-xs text-slate-300 font-normal pt-1">
          2025 NER LogiSmart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
