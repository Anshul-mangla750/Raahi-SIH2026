import React from 'react';
import { motion } from 'framer-motion';

export default function AuthNetworkStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#0c1c33]/90 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 shadow-xl text-white w-56 sm:w-60"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-200 tracking-tight">Live Network Status</span>
        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      <div className="flex items-center gap-3.5">
        {/* Donut Chart */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="14" fill="transparent" stroke="#1e293b" strokeWidth="4.5" />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#10B981"
              strokeWidth="4.5"
              strokeDasharray="60 100"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#F59E0B"
              strokeWidth="4.5"
              strokeDasharray="18 100"
              strokeDashoffset="-60"
              strokeLinecap="round"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#EF4444"
              strokeWidth="4.5"
              strokeDasharray="10 100"
              strokeDashoffset="-78"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col space-y-1 text-[11px] font-medium flex-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Open
            </span>
            <span className="font-bold text-slate-200">68%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> At Risk
            </span>
            <span className="font-bold text-slate-200">21%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Blocked
            </span>
            <span className="font-bold text-slate-200">11%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
