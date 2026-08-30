import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Truck, AlertTriangle } from 'lucide-react';
import { authStats } from '../../data/authData';

export default function AuthStatsCard() {
  const getIcon = (icon) => {
    switch (icon) {
      case 'road':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19L8 5H16L20 19" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="7" x2="12" y2="10" strokeDasharray="1 1" strokeLinecap="round" />
              <line x1="12" y1="14" x2="12" y2="17" strokeDasharray="1 1" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'building':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 stroke-[1.8]" />
          </div>
        );
      case 'truck':
        return (
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6 stroke-[1.8]" />
          </div>
        );
      case 'alert-triangle':
        return (
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 stroke-[1.8]" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-200/80"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
        {authStats.map((stat) => (
          <div key={stat.id} className="flex items-center gap-2.5">
            {getIcon(stat.icon)}
            <div className="flex flex-col">
              <span className={`text-base sm:text-lg font-black ${stat.color} tracking-tight leading-none`}>
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
