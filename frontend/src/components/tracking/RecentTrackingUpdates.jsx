import React from 'react';
import { Truck, Check, ArrowRight } from 'lucide-react';
import { recentTrackingUpdates } from '../../data/liveTrackingData';

export default function RecentTrackingUpdates() {
  const getIcon = (type) => {
    if (type === 'truck') {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center flex-shrink-0">
          <Truck className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center flex-shrink-0">
        <Check className="w-4 h-4 stroke-[2.5]" />
      </div>
    );
  };

  const getStatusBadge = (statusType) => {
    switch (statusType) {
      case 'in-transit':
        return 'bg-blue-50 text-blue-700 border border-blue-200/80';
      case 'reached':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200/80';
      case 'started':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-200/80';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-sm sm:text-base font-extrabold text-[#0B1E36] tracking-tight mb-3">
          Recent Tracking Updates
        </h3>

        <div className="space-y-3">
          {recentTrackingUpdates.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors border border-slate-100"
            >
              {/* Left icon + location & description */}
              <div className="flex items-center gap-3 min-w-0">
                {getIcon(item.iconType)}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900 truncate">
                      {item.location}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${getStatusBadge(
                        item.statusType
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                    {item.text}
                  </span>
                </div>
              </div>

              {/* Right timestamp */}
              <div className="text-right flex-shrink-0">
                <div className="text-[11px] font-bold text-slate-700">
                  {item.date}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Link */}
      <div className="pt-3 border-t border-slate-100 flex justify-center mt-3">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          <span>View All Updates</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
