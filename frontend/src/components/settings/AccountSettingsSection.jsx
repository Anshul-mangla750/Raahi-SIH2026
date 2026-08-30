import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Trash2, CheckCircle2 } from 'lucide-react';
import { initialAccountSettings } from '../../data/settingsData';

export default function AccountSettingsSection({ onSave, onCancel }) {
  const [formData, setFormData] = useState(initialAccountSettings);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(initialAccountSettings);
    onCancel();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight">
          Account Settings
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Manage your personal account information.
        </p>
      </div>

      {/* Profile Avatar Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500 shadow-xs flex-shrink-0">
            <img
              src={formData.avatar}
              alt={formData.firstName}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900">
                {formData.firstName} {formData.lastName}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {formData.role}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium mt-0.5">
              {formData.email}
            </span>
          </div>
        </div>

        {/* Avatar Actions */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-slate-500" />
            <span>Change Photo</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
            />
          </div>

          {/* Role (Disabled / Read-only) */}
          <div className="sm:col-span-2">
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              Role
            </label>
            <input
              type="text"
              value={formData.role}
              disabled
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 text-slate-500 font-semibold rounded-xl cursor-not-allowed select-none"
            />
            <span className="text-[10px] text-slate-400 font-medium mt-1 block">
              User role is managed by the organization administrator.
            </span>
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
