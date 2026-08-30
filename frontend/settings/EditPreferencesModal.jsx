import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

export default function EditPreferencesModal({ isOpen, initialData, onClose, onSave }) {
  const [formData, setFormData] = useState(initialData);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-lg border border-slate-200 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#0D7A48]" />
              <span className="text-sm font-black text-[#0B1E36]">
                Edit Business Preferences
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Route Preference */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                Default Route Preference
              </label>
              <select
                value={formData.routePreference || 'Fastest Route'}
                onChange={(e) =>
                  setFormData({ ...formData, routePreference: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Fastest Route">Fastest Route</option>
                <option value="Shortest Distance">Shortest Distance</option>
                <option value="Toll-Free Route">Toll-Free Route</option>
                <option value="Fuel Efficient Route">Fuel Efficient Route</option>
              </select>
            </div>

            {/* Auto Assign */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                Auto Assign Consignments
              </label>
              <select
                value={formData.autoAssign || 'Enabled'}
                onChange={(e) =>
                  setFormData({ ...formData, autoAssign: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>

            {/* Delivery Confirmation */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                Delivery Confirmation
              </label>
              <select
                value={formData.deliveryConfirmation || 'Proof of Delivery'}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryConfirmation: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Proof of Delivery">Proof of Delivery (POD)</option>
                <option value="OTP Verification">OTP Verification</option>
                <option value="Digital Signature">Digital Signature</option>
              </select>
            </div>

            {/* Distance Unit */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                Distance Unit
              </label>
              <select
                value={formData.distanceUnit || 'Kilometers (km)'}
                onChange={(e) =>
                  setFormData({ ...formData, distanceUnit: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Kilometers (km)">Kilometers (km)</option>
                <option value="Miles (mi)">Miles (mi)</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                Language
              </label>
              <select
                value={formData.language || 'English'}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="English">English</option>
                <option value="Assamese">অসমীয়া (Assamese)</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
                <option value="Bengali">বাংলা (Bengali)</option>
              </select>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
