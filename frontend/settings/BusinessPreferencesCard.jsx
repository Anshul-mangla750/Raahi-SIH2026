import React from 'react';
import {
  SlidersHorizontal,
  Route,
  Zap,
  FileCheck,
  Compass,
  Calendar,
  Globe,
  ChevronRight,
  Edit3,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BusinessPreferencesCard({ preferences, onEdit }) {
  const prefItems = [
    {
      id: 'route',
      name: 'Default Route Preference',
      value: preferences.routePreference || 'Fastest Route',
      icon: Route,
    },
    {
      id: 'autoAssign',
      name: 'Auto Assign Consignments',
      value: preferences.autoAssign || 'Enabled',
      icon: Zap,
    },
    {
      id: 'confirmation',
      name: 'Delivery Confirmation',
      value: preferences.deliveryConfirmation || 'Proof of Delivery',
      icon: FileCheck,
    },
    {
      id: 'unit',
      name: 'Distance Unit',
      value: preferences.distanceUnit || 'Kilometers (km)',
      icon: Compass,
    },
    {
      id: 'dateFormat',
      name: 'Date & Time Format',
      value: preferences.dateTimeFormat || 'DD MMM YYYY, 12:00 PM',
      icon: Calendar,
    },
    {
      id: 'language',
      name: 'Language',
      value: preferences.language || 'English',
      icon: Globe,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2 flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D7A48] border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
          <SlidersHorizontal className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight leading-snug">
            Business Preferences
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-tight">
            Manage your business and operational preferences.
          </p>
        </div>
      </div>

      {/* Vertical Timeline List with Green Dots and Line - Evenly distributed */}
      <div className="relative pl-6 flex-1 flex flex-col justify-between my-4 min-h-[280px]">
        {/* Vertical continuous green line connecting top to bottom */}
        <div className="absolute left-1.5 top-3 bottom-3 w-0.5 bg-emerald-500 rounded-full" />

        {prefItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="relative flex items-center justify-between gap-3 text-xs py-2 group cursor-default"
            >
              {/* Timeline green circle node */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-2xs">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>

              {/* Left: Icon + Name */}
              <div className="flex items-center gap-2.5 text-slate-700 min-w-0">
                <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="font-bold text-slate-800 truncate text-xs sm:text-[13px]">
                  {item.name}
                </span>
              </div>

              {/* Right: Value + Chevron */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="font-bold text-slate-500 text-[11px] sm:text-xs">
                  {item.value}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Button Area - Anchored to bottom with margin-top: auto */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end flex-shrink-0">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
        >
          <span>Edit Preferences</span>
          <Edit3 className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}
