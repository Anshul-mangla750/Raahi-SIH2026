import React from 'react';
import {
  Compass,
  ListOrdered,
  Clock,
  Fuel,
  Landmark,
  ChevronRight,
} from 'lucide-react';
import { routeOverviewMetrics } from '../../data/routePlanningData';

export default function RouteOverviewCard() {
  const getIcon = (type) => {
    switch (type) {
      case 'distance':
        return <Compass className="w-5 h-5 text-slate-600 stroke-[2]" />;
      case 'stops':
        return <ListOrdered className="w-5 h-5 text-slate-600 stroke-[2]" />;
      case 'time':
        return <Clock className="w-5 h-5 text-slate-600 stroke-[2]" />;
      case 'fuel':
        return <Fuel className="w-5 h-5 text-slate-600 stroke-[2]" />;
      case 'toll':
        return <Landmark className="w-5 h-5 text-slate-600 stroke-[2]" />;
      default:
        return <Compass className="w-5 h-5 text-slate-600 stroke-[2]" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Route Overview Metrics Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5">
        <h3 className="text-sm font-black text-[#0B1E36] tracking-tight mb-4">
          Route Overview
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {routeOverviewMetrics.map((metric) => (
            <div key={metric.id} className="flex flex-col items-center min-w-0">
              <div className="mb-2 text-slate-600">
                {getIcon(metric.icon)}
              </div>
              <span className="text-[11px] font-bold text-slate-400 leading-tight">
                {metric.title}
              </span>
              <span className="text-sm sm:text-base font-black text-slate-900 leading-tight mt-1 truncate">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Preferred Route Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 hover:border-emerald-200 transition-all cursor-pointer group">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Preferred Route
        </h4>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                Fastest Route (NH-27)
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                Recommended
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              This route has the best balance of time and fuel efficiency.
            </p>
          </div>

          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
