import React from 'react';
import { topRoutesData } from '../../data/transporterData';

export default function TopRoutesList() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1E36] tracking-tight">
          Top Routes
        </h3>
        <button
          type="button"
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Subheaders */}
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pb-1 border-b border-slate-100 mb-1">
        <span>Route</span>
        <span>Deliveries</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-50 my-auto">
        {topRoutesData.map((item) => (
          <div key={item.route} className="flex items-center justify-between gap-2 py-2 text-xs">
            {/* Route Name */}
            <span className="font-semibold text-slate-700 truncate min-w-0 flex-1">
              {item.route}
            </span>

            {/* Horizontal Progress Bar & Count */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-16 sm:w-20 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{ width: `${(item.count / item.max) * 100}%` }}
                  className="h-full rounded-full bg-emerald-600"
                />
              </div>
              <span className="font-bold text-slate-900 text-xs min-w-[12px] text-right">
                {item.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
