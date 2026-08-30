import React from 'react';
import { Package, Truck, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { consignmentsKPIData } from '../../data/consignmentsData';

export default function ConsignmentsKPIs() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'package':
        return <Package className="w-6 h-6 stroke-[2.2]" />;
      case 'truck':
        return <Truck className="w-6 h-6 stroke-[2.2]" />;
      case 'clock':
        return <Clock className="w-6 h-6 stroke-[2.2]" />;
      case 'check-circle':
        return <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />;
      case 'x-circle':
        return <XCircle className="w-6 h-6 stroke-[2.2]" />;
      default:
        return <Package className="w-6 h-6 stroke-[2.2]" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-stretch">
      {consignmentsKPIData.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
        >
          {/* Top Row: Circular Icon + Value & Subtitle */}
          <div className="flex items-start gap-3.5">
            {/* Prominent Circular Icon Container */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xs ${kpi.iconBg}`}>
              {getIcon(kpi.icon)}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 truncate leading-tight">
                {kpi.title}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mt-0.5">
                {kpi.value}
              </div>
              <span className="text-[11px] text-slate-400 font-semibold leading-none mt-0.5">
                {kpi.subtitle}
              </span>
            </div>
          </div>

          {/* Bottom Trend */}
          <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center">
            <span
              className={`text-[11px] font-bold ${
                kpi.trendType === 'down'
                  ? 'text-rose-500'
                  : kpi.trendType === 'up'
                  ? 'text-emerald-600'
                  : 'text-slate-400'
              }`}
            >
              {kpi.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
