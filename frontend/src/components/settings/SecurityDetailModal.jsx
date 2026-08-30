import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Lock,
  KeyRound,
  ShieldCheck,
  Laptop,
  Clock,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { activeSessionData } from '../../data/settingsData';

export default function SecurityDetailModal({ itemType, onClose, onActionFeedback }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  if (!itemType) return null;

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
              <Lock className="w-4 h-4 text-[#0D7A48]" />
              <span className="text-sm font-black text-[#0B1E36]">
                {itemType === 'password' && 'Change Password'}
                {itemType === '2fa' && 'Two-Factor Authentication'}
                {itemType === 'sessions' && 'Active Login Sessions'}
                {itemType === 'activity' && 'Recent Login Activity'}
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

          {/* Modal Content */}
          <div className="p-5">
            {/* 1. Change Password */}
            {itemType === 'password' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onActionFeedback('Password changed successfully.');
                  onClose();
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrent ? 'text' : 'password'}
                      placeholder="••••••••"
                      required
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 pr-8"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showCurrent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? 'text' : 'password'}
                      placeholder="••••••••"
                      required
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 pr-8"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showNew ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            )}

            {/* 2. 2FA */}
            {itemType === '2fa' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Authenticator / SMS OTP Verification
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Require OTP verification code when logging in from new devices.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !twoFactorEnabled;
                      setTwoFactorEnabled(next);
                      onActionFeedback(next ? 'Two-Factor Authentication Enabled.' : 'Two-Factor Authentication Disabled.');
                    }}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      twoFactorEnabled ? 'bg-[#0D7A48]' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-[#0D7A48] text-white text-xs font-bold shadow-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* 3. Active Sessions */}
            {itemType === 'sessions' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Laptop className="w-5 h-5 text-slate-500" />
                    <div>
                      <span className="text-xs font-black text-slate-900 block">
                        {activeSessionData.device}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {activeSessionData.location} • Current Session
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600">● Active</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      onActionFeedback('Logged out of all other active sessions.');
                      onClose();
                    }}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Logout Other Devices
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* 4. Login Activity */}
            {itemType === 'activity' && (
              <div className="space-y-2.5">
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Windows • Chrome</span>
                      <span className="text-[10px] text-slate-400">Faridabad, India • 103.212.144.52</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600">Just now</span>
                  </div>

                  <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Android • Chrome Mobile</span>
                      <span className="text-[10px] text-slate-400">Guwahati, India • 157.48.21.90</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Yesterday, 04:30 PM</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-[#0D7A48] text-white text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
