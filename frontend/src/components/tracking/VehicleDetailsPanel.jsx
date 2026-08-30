import React from 'react';
import {
  Phone,
  Star,
  ArrowRight,
  Compass,
  Gauge,
  Fuel,
  Clock,
} from 'lucide-react';
import { activeTrackingVehicle } from '../../data/liveTrackingData';
import { motion } from 'framer-motion';

export default function VehicleDetailsPanel({ onViewDetails }) {
  const vehicle = activeTrackingVehicle;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* 1. Header: Title + Status Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <h3 className="text-sm sm:text-base font-extrabold text-[#0B1E36] tracking-tight">
            Vehicle Details
          </h3>
          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            {vehicle.status}
          </span>
        </div>

        {/* 2. Vehicle & Driver Summary */}
        <div className="flex items-start gap-3.5 mt-3.5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/80">
            <img
              src={vehicle.image}
              alt={vehicle.vehicleNo}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
              {vehicle.vehicleNo}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-0.5">
              {vehicle.model}
            </span>
            <span className="text-xs font-semibold text-slate-700 mt-1">
              Driver: {vehicle.driver}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{vehicle.phone}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mt-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{vehicle.rating}</span>
            </div>
          </div>
        </div>

        {/* 3. Route Section */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-800">
                {vehicle.route.start}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {vehicle.route.startState}
              </span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />

            <div className="flex flex-col text-right">
              <span className="font-extrabold text-slate-800">
                {vehicle.route.destination}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {vehicle.route.destinationState}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2.5">
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#0D7A48]"
                style={{ width: `${vehicle.progress.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mt-1">
              <span>{vehicle.progress.completedText}</span>
              <span>{vehicle.progress.etaText}</span>
            </div>
          </div>
        </div>

        {/* 4. Detail Stats (2-Column Grid) */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100">
          {/* Distance Travelled */}
          <div className="flex items-start gap-2">
            <Compass className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-slate-400">
                Distance Travelled
              </span>
              <span className="text-xs font-extrabold text-slate-800">
                {vehicle.stats.distanceTravelled}
              </span>
            </div>
          </div>

          {/* Speed */}
          <div className="flex items-start gap-2">
            <Gauge className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-slate-400">Speed</span>
              <span className="text-xs font-extrabold text-slate-800">
                {vehicle.stats.speed}
              </span>
            </div>
          </div>

          {/* Fuel Level */}
          <div className="flex items-start gap-2">
            <Fuel className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-slate-400">Fuel Level</span>
              <span className="text-xs font-extrabold text-slate-800">
                {vehicle.stats.fuelLevel}
              </span>
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-slate-400">Last Updated</span>
              <span className="text-xs font-extrabold text-slate-800">
                {vehicle.stats.lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Action Button */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <motion.button
          type="button"
          onClick={onViewDetails}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          View Full Details
        </motion.button>
      </div>
    </div>
  );
}
