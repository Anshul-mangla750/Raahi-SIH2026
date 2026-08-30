import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Clock, Calendar, LayoutDashboard, CheckCircle2 } from 'lucide-react';
import { initialPlatformPreferences } from '../../data/settingsData';

export default function PlatformPreferencesSection({ onSave, onCancel }) {
  const [preferences, setPreferences] = useState(initialPlatformPreferences);

  const handleChange = (field, value) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setPreferences(initialPlatformPreferences);
    onCancel();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight">
          Platform Preferences
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Customize regional localization, formats, and startup layout preferences.
        </p>
      </div>

      {/* Preferences Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(preferences);
        }}
        className="space-y-4 max-w-xl"
      >
        {/* Language */}
        <div>
          <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
            Language
          </label>
          <div className="relative">
            <select
              value={preferences.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs appearance-none cursor-pointer"
            >
              <option value="English">English (Default)</option>
              <option value="Assamese">অসমীয়া (Assamese)</option>
              <option value="Hindi">हिन्दी (Hindi)</option>
              <option value="Bengali">বাংলা (Bengali)</option>
            </select>
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▾
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div>
          <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
            Timezone
          </label>
          <div className="relative">
            <select
              value={preferences.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs appearance-none cursor-pointer"
            >
              <option value="India Standard Time (IST) - GMT+5:30">
                India Standard Time (IST) - GMT+5:30
              </option>
              <option value="UTC - Coordinated Universal Time">
                UTC - Coordinated Universal Time
              </option>
            </select>
            <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▾
            </div>
          </div>
        </div>

        {/* Date Format */}
        <div>
          <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
            Date Format
          </label>
          <div className="relative">
            <select
              value={preferences.dateFormat}
              onChange={(e) => handleChange('dateFormat', e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs appearance-none cursor-pointer"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 28/05/2025)</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 05/28/2025)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2025-05-28)</option>
            </select>
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▾
            </div>
          </div>
        </div>

        {/* Default Dashboard View */}
        <div>
          <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
            Default Dashboard View
          </label>
          <div className="relative">
            <select
              value={preferences.defaultView}
              onChange={(e) => handleChange('defaultView', e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs appearance-none cursor-pointer"
            >
              <option value="Dashboard">Dashboard</option>
              <option value="My Consignments">My Consignments</option>
              <option value="Live Tracking & GPS">Live Tracking & GPS</option>
              <option value="Route Planning">Route Planning</option>
            </select>
            <LayoutDashboard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▾
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
}
