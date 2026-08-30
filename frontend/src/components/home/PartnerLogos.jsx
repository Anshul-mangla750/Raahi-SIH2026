import React from 'react';

export function PartnerLogos() {
  return (
    <div className="hero-trusted-wrap hero-reveal">
      <div className="hero-trusted-title">TRUSTED BY LOGISTICS NETWORKS ACROSS INDIA</div>
      <div className="hero-trusted-logos">
        <div className="trusted-logo-item" title="VRL Logistics">
          <span className="font-black text-xl italic tracking-tighter text-slate-700">VRL</span>
        </div>
        <div className="trusted-logo-item" title="Transport Corporation of India">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <svg width="18" height="13" viewBox="0 0 24 16" fill="none" className="text-slate-700">
                <path d="M2 1L12 15L22 1H16.5L12 9L7.5 1H2Z" fill="currentColor" />
              </svg>
              <span className="font-black text-slate-800 tracking-wider text-base leading-none">TCI</span>
            </div>
            <span className="text-[5px] tracking-widest text-slate-500 font-bold uppercase leading-none mt-0.5">LEADERS IN LOGISTICS</span>
          </div>
        </div>
        <div className="trusted-logo-item" title="Delhivery">
          <span className="font-black text-slate-800 tracking-[0.16em] text-sm">DELHIVERY</span>
        </div>
        <div className="trusted-logo-item" title="Ecom Express">
          <div className="flex flex-col leading-none">
            <span className="font-bold text-slate-800 text-sm tracking-tight">Ecom</span>
            <span className="font-bold text-slate-600 text-xs tracking-normal">Express</span>
          </div>
        </div>
        <div className="trusted-logo-item" title="Blue Dart">
          <span className="font-black text-slate-800 tracking-widest text-sm">BLUE DART</span>
        </div>
      </div>
    </div>
  );
}
