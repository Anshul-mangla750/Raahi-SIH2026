import React from 'react';
import { Play, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { routeEstimatesData } from '../../data/routePlanningData';

export default function RouteEstimatesCard({ onSaveDraft, onStartJourney }) {
  const data = routeEstimatesData;

  return (
    <div className="flex flex-col justify-between h-full space-y-4">
      {/* Estimates Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5">
        <h3 className="text-sm font-black text-[#0B1E36] tracking-tight mb-4">
          Estimates
        </h3>

        <div className="space-y-2.5 text-xs font-bold">
          <div className="flex items-center justify-between text-slate-500">
            <span>Total Distance</span>
            <span className="text-slate-900 font-extrabold">{data.totalDistance}</span>
          </div>

          <div className="flex items-center justify-between text-slate-500">
            <span>Total Time</span>
            <span className="text-slate-900 font-extrabold">{data.totalTime}</span>
          </div>

          <div className="flex items-center justify-between text-slate-500">
            <span>Fuel Cost (Est.)</span>
            <span className="text-slate-900 font-extrabold">{data.fuelCost}</span>
          </div>

          <div className="flex items-center justify-between text-slate-500">
            <span>Toll Cost (Est.)</span>
            <span className="text-slate-900 font-extrabold">{data.tollCost}</span>
          </div>

          <div className="h-px bg-slate-100 my-2" />

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-800 font-extrabold text-xs sm:text-sm">
              Total Cost (Est.)
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-600">
              {data.totalCost}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions: Save as Draft & Start Journey */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <motion.button
          type="button"
          onClick={onSaveDraft}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
        >
          <Bookmark className="w-3.5 h-3.5 text-slate-500" />
          <span>Save as Draft</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={onStartJourney}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Start Journey</span>
        </motion.button>
      </div>
    </div>
  );
}
