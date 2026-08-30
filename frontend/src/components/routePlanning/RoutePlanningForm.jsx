import React, { useState } from 'react';
import { Truck, MapPin, ArrowRight, Calendar, ChevronDown, Route } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoutePlanningForm({ onPlanRoute }) {
  const [vehicle, setVehicle] = useState('AS 01 GC 9876');
  const [startLocation, setStartLocation] = useState('Guwahati, Assam');
  const [destination, setDestination] = useState('Dibrugarh, Assam');
  const [date, setDate] = useState('21 May 2025');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-3.5 sm:p-4">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3.5 sm:gap-4">
        {/* Horizontal Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:flex xl:items-center gap-3 sm:gap-3.5 flex-1">
          {/* 1. Select Vehicle */}
          <div className="flex-1 min-w-[170px]">
            <label className="text-[11px] font-bold text-slate-400 block mb-1">
              Select Vehicle
            </label>
            <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-800 hover:border-slate-300 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-slate-500" />
                <span>{vehicle}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* 2. Start Location */}
          <div className="flex-1 min-w-[170px]">
            <label className="text-[11px] font-bold text-slate-400 block mb-1">
              Start Location
            </label>
            <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-800 hover:border-slate-300 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{startLocation}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Arrow Divider (visible on desktop) */}
          <div className="hidden xl:flex items-center justify-center pt-5">
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* 3. Destination */}
          <div className="flex-1 min-w-[170px]">
            <label className="text-[11px] font-bold text-slate-400 block mb-1">
              Destination
            </label>
            <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-800 hover:border-slate-300 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{destination}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* 4. Select Date */}
          <div className="flex-1 min-w-[150px]">
            <label className="text-[11px] font-bold text-slate-400 block mb-1">
              Select Date
            </label>
            <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-800 hover:border-slate-300 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>{date}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* 5. Plan Route Button */}
        <div className="xl:pt-5">
          <motion.button
            type="button"
            onClick={onPlanRoute}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full xl:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm hover:shadow-xs transition-all cursor-pointer"
          >
            <Route className="w-3.5 h-3.5" />
            <span>Plan Route</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
