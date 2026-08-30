import React from 'react';
import {
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { deliveryHistoryKPIs } from '../../data/deliveryHistoryData';

export default function DeliveryHistoryKPIs() {
  const getBadgeIllustration = (avatar) => {
    switch (avatar) {
      case 'truck':
        return (
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-100 to-teal-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Package className="w-6 h-6 text-[#0D7A48]" />
          </div>
        );
      case 'check':
        return (
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 border border-emerald-400 flex items-center justify-center flex-shrink-0 shadow-xs text-white">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        );
      case 'pin':
        return (
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-cyan-50 border border-blue-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
        );
      case 'cross':
        return (
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-100 to-red-50 border border-rose-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <XCircle className="w-6 h-6 text-rose-600" />
          </div>
        );
      case 'road':
        return (
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-100 to-emerald-50 border border-teal-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <MapPin className="w-6 h-6 text-teal-600" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6 text-[#0D7A48]" />
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
      {deliveryHistoryKPIs.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-xs hover:border-slate-300/80 transition-all duration-200 group"
        >
          {/* Card Top: Avatar + Title & Value */}
          <div className="flex items-center gap-3">
            {getBadgeIllustration(card.avatar)}

            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-slate-400 leading-tight truncate">
                {card.title}
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#0B1E36] tracking-tight leading-tight mt-0.5">
                {card.value}
              </span>
            </div>
          </div>

          {/* Trend Indicator */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-start gap-1 text-[11px] font-bold">
            {card.isNegative ? (
              <div className="flex items-center gap-1 text-rose-600">
                <TrendingDown className="w-3 h-3" />
                <span>{card.trend}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="w-3 h-3" />
                <span>{card.trend}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
