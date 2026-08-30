import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2 } from 'lucide-react';
import { initialCompanyInfo } from '../../data/settingsData';

export default function CompanyInfoSection({ onSave, onCancel }) {
  const [formData, setFormData] = useState(initialCompanyInfo);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(initialCompanyInfo);
    onCancel();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight">
          Company Information
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Manage your registered business and tax details.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Company Name */}
          <div className="sm:col-span-2">
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              Company Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
              />
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Business Email */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              Business Email
            </label>
            <input
              type="email"
              value={formData.businessEmail}
              onChange={(e) => handleChange('businessEmail', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
            />
          </div>

          {/* Business Phone */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              Business Phone
            </label>
            <input
              type="tel"
              value={formData.businessPhone}
              onChange={(e) => handleChange('businessPhone', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
            />
          </div>

          {/* GST Number */}
          <div className="sm:col-span-2">
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              GST Number (GSTIN)
            </label>
            <input
              type="text"
              value={formData.gstNumber}
              onChange={(e) => handleChange('gstNumber', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs uppercase tracking-wider"
            />
          </div>

          {/* Company Address */}
          <div className="sm:col-span-2">
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              Company Address
            </label>
            <input
              type="text"
              value={formData.companyAddress}
              onChange={(e) => handleChange('companyAddress', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
            />
          </div>

          {/* City */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
            />
          </div>

          {/* State */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              State
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
            />
          </div>

          {/* Pincode */}
          <div className="sm:col-span-2 sm:max-w-xs">
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
              Pincode
            </label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleChange('pincode', e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
            />
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
