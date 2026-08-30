import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Send, Megaphone } from 'lucide-react';

export default function NotificationSettingsCard({ onToggle }) {
  const [toggles, setToggles] = useState({
    email: true,
    sms: true,
    push: true,
    marketing: false,
  });

  const handleToggle = (key) => {
    setToggles((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (onToggle) onToggle(key, next[key]);
      return next;
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D7A48] border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight leading-snug">
              Notification Settings
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-tight">
              Choose how you want to receive notifications.
            </p>
          </div>
        </div>

        {/* Content with Left Toggles + Right Mobile Bell Illustration */}
        <div className="flex items-center justify-between gap-4 mt-2">
          {/* Left Toggles */}
          <div className="space-y-3 flex-1 min-w-0">
            {/* Email Notifications */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-800 truncate">
                    Email Notifications
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium truncate">
                    Receive important updates
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggle('email')}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggles.email ? 'bg-[#0D7A48]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    toggles.email ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* SMS Notifications */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Smartphone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-800 truncate">
                    SMS Notifications
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium truncate">
                    Receive alerts via SMS
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggle('sms')}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggles.sms ? 'bg-[#0D7A48]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    toggles.sms ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Send className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-800 truncate">
                    Push Notifications
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium truncate">
                    Receive push notifications
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggle('push')}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggles.push ? 'bg-[#0D7A48]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    toggles.push ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Marketing Updates */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Megaphone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-800 truncate">
                    Marketing Updates
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium truncate">
                    Updates about new features
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggle('marketing')}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggles.marketing ? 'bg-[#0D7A48]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    toggles.marketing ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right: Decorative 3D Phone & Bell Graphic */}
          <div className="hidden sm:flex items-center justify-center w-24 h-32 relative flex-shrink-0">
            {/* Phone Body */}
            <div className="w-20 h-32 rounded-2xl bg-gradient-to-b from-blue-400 via-indigo-500 to-slate-700 p-1 shadow-lg relative flex flex-col items-center justify-center overflow-hidden border-2 border-white">
              <div className="w-full h-full bg-slate-50 rounded-xl p-1.5 flex flex-col items-center justify-center relative">
                {/* 3D Bell */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md mb-1 animate-bounce">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                {/* Notification card preview */}
                <div className="w-full bg-emerald-50 rounded-md p-1 border border-emerald-200 flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="h-1.5 w-8 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
