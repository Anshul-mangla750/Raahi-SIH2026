import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ShieldCheck, Smartphone, Laptop, CheckCircle2 } from 'lucide-react';
import { activeSessionData } from '../../data/settingsData';

export default function SecuritySettingsSection({ onUpdatePassword, onToggle2FA, onLogoutOtherDevices }) {
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.newPass) {
      alert('Please fill in password fields.');
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      alert('New passwords do not match.');
      return;
    }
    onUpdatePassword();
    setPasswords({ current: '', newPass: '', confirm: '' });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight">
          Security Settings
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Manage password, authentication methods, and active browser sessions.
        </p>
      </div>

      {/* 1. Change Password Form */}
      <div className="space-y-4">
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
          Change Password
        </h4>

        <form onSubmit={handlePasswordSubmit} className="space-y-3.5 max-w-md">
          {/* Current Password */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                placeholder="Enter current password"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs pr-9"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={passwords.newPass}
                onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                placeholder="Enter new password"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs pr-9"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs pr-9"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer mt-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Update Password</span>
          </motion.button>
        </form>
      </div>

      {/* 2. Two-Factor Authentication */}
      <div className="pt-5 border-t border-slate-100">
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex-shrink-0 mt-0.5">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 leading-tight block">
                Two-Factor Authentication (2FA)
              </span>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Add an extra layer of security to your account with SMS or Authenticator OTP.
              </p>
            </div>
          </div>

          {/* Toggle */}
          <button
            type="button"
            onClick={() => {
              setTwoFactorEnabled(!twoFactorEnabled);
              onToggle2FA(!twoFactorEnabled);
            }}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
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
      </div>

      {/* 3. Active Sessions */}
      <div className="pt-5 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Active Sessions
          </h4>
          <button
            type="button"
            onClick={onLogoutOtherDevices}
            className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
          >
            Logout Other Devices
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200/80 flex-shrink-0">
              <Laptop className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900">
                  {activeSessionData.device}
                </span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Current Session
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                {activeSessionData.location} • IP: {activeSessionData.ip}
              </span>
            </div>
          </div>

          <span className="text-[11px] text-emerald-600 font-bold hidden sm:inline-block">
            ● Active Now
          </span>
        </div>
      </div>
    </div>
  );
}
