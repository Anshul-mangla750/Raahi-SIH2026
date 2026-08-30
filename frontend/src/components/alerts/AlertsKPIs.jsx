import React from 'react';
import {
  AlertTriangle,
  AlertCircle,
  GitFork,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { alertsKPIData } from '../../data/alertsData';

export default function AlertsKPIs() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'alert-triangle':
        return <AlertTriangle className="w-5 h-5" />;
      case 'alert-circle':
        return <AlertCircle className="w-5 h-5" />;
      case 'git-fork':
        return <GitFork className="w-5 h-5 rotate-90" />;
      case 'check-circle':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {alertsKPIData.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-xs hover:border-slate-300/80 transition-all duration-200 group"
        >
          {/* Card Top: Icon + Title & Value */}
          <div className="flex items-center gap-3.5">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${card.iconBg}`}
            >
              {getIcon(card.icon)}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                {card.title}
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#0B1E36] tracking-tight leading-tight mt-0.5">
                {card.value}
              </span>
            </div>
          </div>

          {/* Subtitle & Trend */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 font-medium text-[11px] truncate">
              {card.subtitle}
            </span>

            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 flex-shrink-0">
              <TrendingUp className="w-3 h-3" />
              <span>{card.trend}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
