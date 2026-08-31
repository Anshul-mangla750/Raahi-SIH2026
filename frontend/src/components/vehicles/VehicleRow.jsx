import React from 'react';
import {
  MapPin,
  Clock,
  Eye,
  MoreVertical,
  Star,
  ArrowRight,
} from 'lucide-react';

export default function VehicleRow({ item, vehicle, onViewDetails = () => {} }) {
  const rowItem = item || vehicle;
  if (!rowItem) return null;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const getStatusBadge = (statusType) => {
    switch (statusType) {
      case 'in-transit':
      case 'moving':
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

  const vehicleNo = rowItem.vehicleNo || rowItem.id || 'AS 01 GC 9876';
  const model = rowItem.model || 'TATA 407';
  const capacity = rowItem.capacity || 'Capacity: 1200 kg';
  const modelYear = rowItem.modelYear || 'Model: 2022';
  const image = rowItem.image || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80';

  const driverObj = typeof rowItem.driver === 'string'
    ? {
        name: rowItem.driver,
        phone: '+91 98765 43210',
        rating: '4.8',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      }
    : {
        name: rowItem.driver?.name || 'Bikash Das',
        phone: rowItem.driver?.phone || '+91 98765 43210',
        rating: rowItem.driver?.rating || '4.8',
        avatar: rowItem.driver?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      };

  const statusObj = typeof rowItem.status === 'string'
    ? {
        label: rowItem.status,
        type: rowItem.statusType || rowItem.status.toLowerCase().replace(/\s+/g, '-'),
        route: rowItem.route || rowItem.current_route || 'Guwahati → Dibrugarh',
        progressPercent: 65,
        progressText: 'In Progress',
        progressColor: 'bg-emerald-500',
      }
    : {
        label: rowItem.status?.label || 'In Transit',
        type: rowItem.status?.type || rowItem.statusType || 'in-transit',
        route: rowItem.status?.route || rowItem.route || rowItem.current_route,
        subLabel: rowItem.status?.subLabel,
        progressPercent: rowItem.status?.progressPercent,
        progressText: rowItem.status?.progressText || 'Active',
        progressColor: rowItem.status?.progressColor || 'bg-emerald-500',
      };

  const locationObj = typeof rowItem.location === 'string'
    ? { name: rowItem.location }
    : { name: rowItem.location?.name || rowItem.current_route || 'Near Numaligarh, Assam' };

  const lastUpdatedObj = typeof rowItem.lastUpdated === 'string'
    ? { date: rowItem.lastUpdated, time: '' }
    : {
        date: rowItem.lastUpdated?.date || 'Today',
        time: rowItem.lastUpdated?.time || '11:30 AM',
        subText: rowItem.lastUpdated?.subText,
      };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all p-4 sm:p-5 flex flex-col lg:grid lg:grid-cols-12 gap-4 items-center">
      {/* 1. Vehicle Details (Col Span 3) */}
      <div className="flex items-center gap-3.5 w-full lg:col-span-3 min-w-0">
        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/80">
          <img
            src={image}
            alt={vehicleNo}
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
            {vehicleNo}
          </span>
          <span className="text-xs font-semibold text-slate-500 mt-0.5 truncate">
            {model}
          </span>
          <span className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
            {capacity}
          </span>
          <span className="text-[11px] text-slate-400 font-medium truncate">
            {modelYear}
          </span>
        </div>
      </div>

      {/* 2. Driver Details (Col Span 2) */}
      <div className="flex items-center gap-3 w-full lg:col-span-2 min-w-0 border-t lg:border-t-0 pt-2.5 lg:pt-0">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
          <img
            src={driverObj.avatar}
            alt={driverObj.name}
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
            {driverObj.name}
          </span>
          <span className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
            {driverObj.phone}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 mt-0.5">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{driverObj.rating}</span>
          </div>
        </div>
      </div>

      {/* 3. Status (Col Span 3) */}
      <div className="flex flex-col w-full lg:col-span-3 justify-center border-t lg:border-t-0 pt-2.5 lg:pt-0">
        <div className="flex items-center">
          <span
            className={`inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border ${getStatusBadge(
              statusObj.type
            )}`}
          >
            {statusObj.label}
          </span>
        </div>

        {/* Route / SubLabel */}
        {statusObj.route ? (
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 my-1">
            <span>{statusObj.route.split('→')[0].trim()}</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
            <span>{statusObj.route.split('→')[1]?.trim() || ''}</span>
          </div>
        ) : statusObj.subLabel ? (
          <div className="text-xs font-medium text-slate-500 my-1">
            {statusObj.subLabel}
          </div>
        ) : null}

        {/* Progress Bar & Percentage */}
        {statusObj.progressPercent !== undefined ? (
          <div className="flex flex-col gap-1 w-full max-w-[160px]">
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full ${statusObj.progressColor || 'bg-emerald-500'}`}
                style={{ width: `${statusObj.progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              {statusObj.progressText}
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
            {locationObj.name}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(rowItem);
            }}
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
            {lastUpdatedObj.date}
          </span>
          <span className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
            {lastUpdatedObj.time}
          </span>
          {lastUpdatedObj.subText && (
            <span className="text-[10px] font-bold text-rose-500 leading-tight mt-0.5">
              {lastUpdatedObj.subText}
            </span>
          )}
        </div>
      </div>

      {/* 6. Actions (Col Span 1) */}
      <div className="relative flex items-center justify-end gap-1.5 w-full lg:col-span-1 border-t lg:border-t-0 pt-2.5 lg:pt-0">
        <button
          type="button"
          title="View vehicle details"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(rowItem);
          }}
          className="w-8 h-8 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4" />
        </button>
        
        <div className="relative">
          <button
            type="button"
            title="More options"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1 z-30 text-xs font-semibold">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onViewDetails(rowItem);
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 cursor-pointer flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>Vehicle Specs</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onViewDetails(rowItem);
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 cursor-pointer flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Track Live GPS</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
