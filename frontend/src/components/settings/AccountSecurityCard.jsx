import React from 'react';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  Laptop,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccountSecurityCard({ onSelectSecurityItem }) {
  const securityItems = [
    {
      id: 'password',
      title: 'Change Password',
      subtitle: 'Update your account password',
      icon: KeyRound,
    },
    {
      id: '2fa',
      title: 'Two-Factor Authentication',
      subtitle: 'Add an extra layer of security',
      icon: ShieldCheck,
    },
    {
      id: 'sessions',
      title: 'Active Sessions',
      subtitle: 'Manage your active login sessions',
      icon: Laptop,
    },
    {
      id: 'activity',
      title: 'Login Activity',
      subtitle: 'View recent account activity',
      icon: Clock,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Header + Upper Right Shield Graphic */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D7A48] border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight leading-snug">
              Account Security
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-tight">
              Keep your account secure and protected.
            </p>
          </div>
        </div>

        {/* 3D-styled Security Shield Illustration */}
        <div className="hidden sm:flex items-center justify-center w-20 h-14 relative flex-shrink-0">
          <div className="w-12 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-emerald-600 p-0.5 shadow-md flex items-center justify-center transform -rotate-6">
            <div className="w-full h-full bg-white/10 rounded-2xl backdrop-blur-xs flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Clickable Setting Rows */}
      <div className="divide-y divide-slate-100 mt-2">
        {securityItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              type="button"
              whileHover={{ x: 3 }}
              onClick={() => onSelectSecurityItem(item.id)}
              className="w-full py-3 flex items-center justify-between gap-3 text-left hover:bg-slate-50/70 rounded-xl px-2.5 -mx-2.5 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 border border-slate-200/80 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 leading-tight block group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium leading-tight block mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
