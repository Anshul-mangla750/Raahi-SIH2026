import React from 'react';
import {
  Clock,
  Timer,
  XCircle,
  Star,
  ArrowRight,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  topRoutesData,
  vehiclePerformanceData,
  performanceSummaryData,
} from '../../data/reportsData';

export default function ReportsTablesRow() {
  const getSummaryIcon = (icon) => {
    switch (icon) {
      case 'clock-check':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        );
      case 'clock-timer':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center flex-shrink-0">
            <Timer className="w-4 h-4" />
          </div>
        );
      case 'cancel':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center flex-shrink-0">
            <XCircle className="w-4 h-4" />
          </div>
        );
      case 'star':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center flex-shrink-0">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
      {/* 1. Top Routes by Deliveries */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#0B1E36] tracking-tight mb-3">
            Top Routes by Deliveries
          </h3>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase">
                  <th className="pb-2 font-bold">Route</th>
                  <th className="pb-2 font-bold text-center">Deliveries</th>
                  <th className="pb-2 font-bold text-center">Successful</th>
                  <th className="pb-2 font-bold text-center">Failed</th>
                  <th className="pb-2 font-bold text-right">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px] font-medium text-slate-700">
                {topRoutesData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 font-bold text-slate-800 truncate max-w-[130px]">
                      {item.route}
                    </td>
                    <td className="py-2.5 text-center text-slate-500">{item.deliveries}</td>
                    <td className="py-2.5 text-center text-slate-500">{item.successful}</td>
                    <td className="py-2.5 text-center text-slate-500">{item.failed}</td>
                    <td className="py-2.5 text-right font-bold text-slate-800">
                      <div className="flex flex-col items-end">
                        <span>{item.successRate}</span>
                        <div className="w-16 h-1 rounded-full bg-slate-100 overflow-hidden mt-1">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${item.rateNum}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Link */}
        <div className="pt-3 border-t border-slate-100 mt-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <span>View all routes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Vehicle Performance */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#0B1E36] tracking-tight mb-3">
            Vehicle Performance
          </h3>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase">
                  <th className="pb-2 font-bold">Vehicle</th>
                  <th className="pb-2 font-bold text-center">Deliveries</th>
                  <th className="pb-2 font-bold text-center">Distance (km)</th>
                  <th className="pb-2 font-bold text-right">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px] font-medium text-slate-700">
                {vehiclePerformanceData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 font-bold text-slate-800 truncate">
                      {item.vehicle}
                    </td>
                    <td className="py-2.5 text-center text-slate-500">{item.deliveries}</td>
                    <td className="py-2.5 text-center text-slate-500">{item.distance}</td>
                    <td className="py-2.5 text-right font-bold text-emerald-600">
                      {item.successRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Link */}
        <div className="pt-3 border-t border-slate-100 mt-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <span>View all vehicles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Performance Summary */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#0B1E36] tracking-tight mb-4">
            Performance Summary
          </h3>

          <div className="space-y-4">
            {performanceSummaryData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getSummaryIcon(item.icon)}
                  <span className="text-xs font-bold text-slate-700">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <span className="text-xs sm:text-sm font-black text-slate-900">
                    {item.value}
                  </span>
                  <div
                    className={`flex items-center text-[10px] font-extrabold ${
                      item.isGood ? 'text-emerald-600' : 'text-rose-500'
                    }`}
                  >
                    {item.isGood ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{item.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
