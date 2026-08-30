import React from 'react';
import {
  MapPin,
  Clock,
  Eye,
  MoreVertical,
  Star,
  ArrowRight,
} from 'lucide-react';

export default function VehicleRow({ item }) {
  const getStatusBadge = (statusType) => {
    switch (statusType) {
      case 'in-transit':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'picked-up':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'delayed':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'delivered':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'idle':
        return 'bg-orange-50 text-orange-700 border-orange-200/80';
      case 'under-maintenance':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/80';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all p-4 sm:p-5 flex flex-col lg:grid lg:grid-cols-12 gap-4 items-center">
      {/* 1. Vehicle Details (Col Span 3) */}
      <div className="flex items-center gap-3.5 w-full lg:col-span-3 min-w-0">
        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/80">
          <img
            src={item.image}
            alt={item.vehicleNo}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80';
            }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight truncate">
            {item.vehicleNo}
          </span>
          <span className="text-xs font-semibold text-slate-500 mt-0.5 truncate">
            {item.model}
          </span>
          <span className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
            {item.capacity}
          </span>
          <span className="text-[11px] text-slate-400 font-medium truncate">
            {item.modelYear}
          </span>
        </div>
      </div>

      {/* 2. Driver Details (Col Span 2) */}
      <div className="flex items-center gap-3 w-full lg:col-span-2 min-w-0 border-t lg:border-t-0 pt-2.5 lg:pt-0">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
          <img
            src={item.driver.avatar}
            alt={item.driver.name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80';
            }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-slate-900 truncate">
            {item.driver.name}
          </span>
          <span className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
            {item.driver.phone}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 mt-0.5">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{item.driver.rating}</span>
          </div>
        </div>
      </div>

      {/* 3. Status (Col Span 3) */}
      <div className="flex flex-col w-full lg:col-span-3 justify-center border-t lg:border-t-0 pt-2.5 lg:pt-0">
        <div className="flex items-center">
          <span
            className={`inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border ${getStatusBadge(
              item.status.type
            )}`}
          >
            {item.status.label}
          </span>
        </div>

        {/* Route / SubLabel */}
        {item.status.route ? (
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 my-1">
            <span>{item.status.route.split('→')[0].trim()}</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
            <span>{item.status.route.split('→')[1]?.trim()}</span>
          </div>
        ) : item.status.subLabel ? (
          <div className="text-xs font-medium text-slate-500 my-1">
            {item.status.subLabel}
          </div>
        ) : null}

        {/* Progress Bar & Percentage */}
        {item.status.progressPercent !== undefined ? (
          <div className="flex flex-col gap-1 w-full max-w-[160px]">
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full ${item.status.progressColor}`}
                style={{ width: `${item.status.progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              {item.status.progressText}
            </span>
          </div>
        ) : (
          <span className="text-[10px] text-slate-400 font-medium">-</span>
        )}
      </div>

      {/* 4. Current Location (Col Span 2) */}
      <div className="flex items-start gap-2 w-full lg:col-span-2 min-w-0 border-t lg:border-t-0 pt-2.5 lg:pt-0">
        <MapPin className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-slate-700 leading-snug">
            {item.location.name}
          </span>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer text-left mt-1 w-fit"
          >
            View on Map
          </button>
        </div>
      </div>

      {/* 5. Last Updated (Col Span 1.5 ~ Col Span 1 in 12-grid) */}
      <div className="flex items-start gap-2 w-full lg:col-span-1 min-w-0 border-t lg:border-t-0 pt-2.5 lg:pt-0">
        <Clock className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-slate-700 leading-tight">
            {item.lastUpdated.date}
          </span>
          <span className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
            {item.lastUpdated.time}
          </span>
          {item.lastUpdated.subText && (
            <span className="text-[10px] font-bold text-rose-500 leading-tight mt-0.5">
              {item.lastUpdated.subText}
            </span>
          )}
        </div>
      </div>

      {/* 6. Actions (Col Span 1) */}
      <div className="flex items-center justify-end gap-1.5 w-full lg:col-span-1 border-t lg:border-t-0 pt-2.5 lg:pt-0">
        <button
          type="button"
          title="View vehicle details"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-8 h-8 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          type="button"
          title="More options"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
