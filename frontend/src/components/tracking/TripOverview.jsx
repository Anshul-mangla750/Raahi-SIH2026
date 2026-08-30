import React from 'react';
import {
  GitFork,
  TrendingUp,
  MapPin,
  Clock,
  Package,
} from 'lucide-react';
import { tripOverviewData } from '../../data/liveTrackingData';

export default function TripOverview() {
  const data = tripOverviewData;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between h-full">
      <h3 className="text-sm sm:text-base font-extrabold text-[#0B1E36] tracking-tight mb-3">
        Trip Overview
      </h3>

      <div className="grid grid-cols-2 gap-4 py-1">
        {/* Total Distance */}
        <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/60 border border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 flex-shrink-0 mt-0.5">
            <GitFork className="w-3.5 h-3.5 rotate-90" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-slate-400 leading-tight">
              Total Distance
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
              {data.totalDistance}
            </span>
          </div>
        </div>

        {/* Distance Travelled */}
        <div className="flex items-start gap-2.5 p-2 rounded-xl bg-emerald-50/40 border border-emerald-100/60">
          <div className="w-7 h-7 rounded-lg bg-white border border-emerald-200/80 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-slate-400 leading-tight">
              Distance Travelled
            </span>
            <span className="text-xs sm:text-sm font-black text-emerald-600 mt-0.5">
              {data.distanceTravelled}
            </span>
          </div>
        </div>

        {/* Remaining Distance */}
        <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/60 border border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 flex-shrink-0 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-slate-400 leading-tight">
              Remaining Distance
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
              {data.remainingDistance}
            </span>
          </div>
        </div>

        {/* Estimated Time */}
        <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/60 border border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 flex-shrink-0 mt-0.5">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-slate-400 leading-tight">
              Estimated Time
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
              {data.estimatedTime}
            </span>
          </div>
        </div>

        {/* ETA */}
        <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/60 border border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 flex-shrink-0 mt-0.5">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-slate-400 leading-tight">
              ETA
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
              {data.eta}
            </span>
          </div>
        </div>

        {/* Consignments */}
        <div className="flex items-start gap-2.5 p-2 rounded-xl bg-blue-50/40 border border-blue-100/60">
          <div className="w-7 h-7 rounded-lg bg-white border border-blue-200/80 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
            <Package className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-slate-400 leading-tight">
              Consignments
            </span>
            <span className="text-xs sm:text-sm font-black text-blue-600 mt-0.5">
              {data.consignments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
