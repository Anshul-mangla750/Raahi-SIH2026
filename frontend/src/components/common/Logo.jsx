import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'default', showSubtitle = true, linkTo = '/', darkBg = false }) {
  return (
    <Link to={linkTo} className="flex items-center gap-3 group focus:outline-none select-none">
      {/* Custom Mountain & Road Brand Icon */}
      <div className={`relative ${size === 'large' ? 'w-12 h-12' : 'w-11 h-11'} flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 shadow-sm group-hover:scale-105 transition-transform`}>
        <svg viewBox="0 0 40 40" className={`${size === 'large' ? 'w-9 h-9' : 'w-8 h-8'}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background mountain peak */}
          <path d="M20 7L33 29H7L20 7Z" fill="#059669" />
          {/* Secondary green gradient peak */}
          <path d="M20 7L28 29H12L20 7Z" fill="#10B981" fillOpacity="0.85" />
          {/* Snow cap highlight */}
          <path d="M20 7L23 13H17L20 7Z" fill="#D1FAE5" />
          {/* River / Highway winding road in deep navy */}
          <path 
            d="M10 29C15 24 17 27 24 22C28 19 31 29 31 29" 
            stroke="#1E3A8A" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight">
          <span className={`${size === 'large' ? 'text-3xl' : 'text-2xl'} font-extrabold ${darkBg ? 'text-white' : 'text-[#0B1E36]'} tracking-tight`}>NER Logi</span>
          <span className={`${size === 'large' ? 'text-3xl' : 'text-2xl'} font-extrabold ${darkBg ? 'text-emerald-400' : 'text-emerald-600'} tracking-tight`}>Smart</span>
        </div>
        {showSubtitle && (
          <span className={`text-[11px] ${darkBg ? 'text-slate-300' : 'text-slate-500'} font-medium tracking-tight -mt-0.5`}>
            Smart Logistics. Stronger Northeast.
          </span>
        )}
      </div>
    </Link>
  );
}
