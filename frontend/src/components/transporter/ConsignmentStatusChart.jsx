import React from 'react';
import { consignmentStatusData } from '../../data/transporterData';

export default function ConsignmentStatusChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between h-full">
      {/* Title */}
      <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1E36] tracking-tight mb-2">
        Consignment Status
      </h3>

      {/* Donut Chart & Legend Container */}
      <div className="flex items-center gap-3.5 my-auto">
        {/* SVG Donut Chart */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f1f5f9" strokeWidth="4.5" />
            {/* In Transit 66.7% (Green) */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#10B981"
              strokeWidth="4.5"
              strokeDasharray="66.7 33.3"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Delivered 38.9% (Blue) */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#2563EB"
              strokeWidth="4.5"
              strokeDasharray="38.9 61.1"
              strokeDashoffset="-66.7"
              strokeLinecap="round"
            />
            {/* Delayed 11.1% (Orange) */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#F97316"
              strokeWidth="4.5"
              strokeDasharray="11.1 88.9"
              strokeDashoffset="-105.6"
              strokeLinecap="round"
            />
          </svg>

          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <span className="text-lg sm:text-xl font-black text-slate-900 leading-none">
              {consignmentStatusData.total}
            </span>
            <span className="text-[9px] font-bold text-slate-400 mt-0.5">Total</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex flex-col space-y-2 min-w-0 flex-1">
          {consignmentStatusData.breakdown.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-1 text-[11px]">
              <span className="flex items-center gap-2 text-slate-600 truncate min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.dotClass}`} />
                <span className="truncate">{item.label}</span>
              </span>
              <span className="font-bold text-slate-800 flex-shrink-0 text-[10px] sm:text-[11px]">
                {item.count} ({item.percent})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
