import React from 'react';
import {
  Truck,
  ArrowRight,
  Calendar,
  Eye,
  MoreVertical,
  Pill,
  ShoppingBag,
  HardHat,
  Leaf,
  CreditCard,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import StatusTimeline from './StatusTimeline';

export default function ConsignmentRow({ item }) {
  const getStatusBadge = (statusType) => {
    switch (statusType) {
      case 'in-transit':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'picked-up':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'delayed':
        return 'bg-orange-50 text-orange-700 border-orange-200/80';
      case 'delivered':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/80';
    }
  };

  const getPriorityBadge = (priorityType) => {
    switch (priorityType) {
      case 'high':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'medium':
        return 'bg-orange-50 text-orange-700 border-orange-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/80';
    }
  };

  const getCargoIcon = (cargoType) => {
    switch (cargoType) {
      case 'package':
        return <Pill className="w-4 h-4 text-slate-600 stroke-[2.2]" />;
      case 'food':
        return <ShoppingBag className="w-4 h-4 text-slate-600 stroke-[2.2]" />;
      case 'construction':
        return <HardHat className="w-4 h-4 text-orange-500 stroke-[2.2]" />;
      case 'agriculture':
        return <Leaf className="w-4 h-4 text-emerald-600 stroke-[2.2]" />;
      default:
        return <ShoppingBag className="w-4 h-4 text-slate-600 stroke-[2.2]" />;
    }
  };

  const getHeaderIcon = (statusType) => {
    switch (statusType) {
      case 'in-transit':
        return (
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center flex-shrink-0">
            <Package className="w-4 h-4" />
          </div>
        );
      case 'picked-up':
        return (
          <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center flex-shrink-0">
            <Truck className="w-4 h-4" />
          </div>
        );
      case 'delayed':
        return (
          <div className="w-7 h-7 rounded-full bg-orange-50 text-orange-600 border border-orange-200/80 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        );
      case 'delivered':
        return (
          <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 border border-purple-200/80 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case 'cancelled':
        return (
          <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center justify-center flex-shrink-0">
            <XCircle className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-7 h-7 rounded-full bg-slate-50 text-slate-600 border border-slate-200/80 flex items-center justify-center flex-shrink-0">
            <Package className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-6 overflow-hidden">
      {/* 1. Left Thumbnail Image */}
      <div className="w-full sm:w-28 h-24 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/80 self-center sm:self-auto">
        <img
          src={item.image}
          alt={item.id}
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80';
          }}
        />
      </div>

      {/* 2. Consignment Details & Route */}
      <div className="flex flex-col justify-between flex-1 min-w-[220px] max-w-[280px]">
        {/* ID + Status Badge */}
        <div className="flex items-center gap-2">
          {getHeaderIcon(item.statusType)}
          <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
            {item.id}
          </span>
          <span
            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${getStatusBadge(
              item.statusType
            )}`}
          >
            {item.status}
          </span>
        </div>

        {/* Route Origin -> Destination */}
        <div className="flex items-center gap-2 my-2 text-xs font-bold text-slate-800">
          <div className="flex flex-col">
            <span>{item.origin}</span>
            <span className="text-[10px] text-slate-400 font-medium -mt-0.5">{item.originState}</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mx-1" />
          <div className="flex flex-col">
            <span>{item.destination}</span>
            <span className="text-[10px] text-slate-400 font-medium -mt-0.5">{item.destinationState}</span>
          </div>
        </div>

        {/* Vehicle & Priority Info */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500 font-bold">
          <span className="flex items-center gap-1">
            <Truck className="w-3 h-3 text-slate-400" />
            <span>{item.vehicleModel}</span>
          </span>
          <span className="flex items-center gap-1">
            <CreditCard className="w-3 h-3 text-slate-400" />
            <span>{item.vehicleNumber}</span>
          </span>
          <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold border ${getPriorityBadge(item.priorityType)}`}>
            {item.priority}
          </span>
        </div>
      </div>

      {/* 3. Cargo Details */}
      <div className="flex flex-col justify-center min-w-[130px] border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-5">
        <div className="flex items-center gap-1.5">
          {getCargoIcon(item.cargoType)}
          <span className="text-xs font-extrabold text-slate-800">{item.cargoName}</span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-semibold">
          <div>
            <span className="block text-[9px] text-slate-400">Weight</span>
            <span className="font-bold text-slate-700">{item.weight}</span>
          </div>
          <div>
            <span className="block text-[9px] text-slate-400">Booked On</span>
            <span className="font-bold text-slate-700">{item.bookedOn}</span>
          </div>
        </div>
      </div>

      {/* 4. Status Timeline */}
      <div className="flex flex-col justify-center items-center flex-1 min-w-[240px] border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:px-4">
        <StatusTimeline timeline={item.timeline} />
      </div>

      {/* 5. ETA & Delivery Status */}
      <div className="flex flex-col justify-center min-w-[110px] text-left lg:text-right border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-5">
        {item.etaHeading && (
          <span className="text-[10px] font-bold text-slate-400 leading-tight">
            {item.etaHeading}
          </span>
        )}
        <div className="flex items-center lg:justify-end gap-1 text-[11px] font-bold text-slate-700">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span>{item.etaDate}</span>
        </div>
        <span className="text-xs font-black text-slate-900 leading-tight mt-0.5">
          {item.etaTime}
        </span>
        <div className="mt-1">
          <span
            className={`text-[10px] font-extrabold ${
              item.etaStatusType === 'delayed'
                ? 'text-rose-600'
                : 'text-emerald-600'
            }`}
          >
            {item.etaStatus}
          </span>
          {item.etaStatusSub && (
            <span className="block text-[9px] font-bold text-rose-500">
              {item.etaStatusSub}
            </span>
          )}
        </div>
      </div>

      {/* 6. Actions */}
      <div className="flex items-center justify-end gap-1.5 border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-4">
        <button
          type="button"
          title="View Consignment"
          className="w-8 h-8 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          type="button"
          title="More Options"
          className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
