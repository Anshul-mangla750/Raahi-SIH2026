import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, UserCog } from 'lucide-react';
import { loginTabs } from '../../data/authData';

export default function LoginTypeTabs({ activeTab, setActiveTab }) {
  const getIcon = (iconName, isActive) => {
    const iconClass = `w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-colors ${
      isActive ? 'text-emerald-600' : 'text-slate-500'
    }`;
    switch (iconName) {
      case 'user':
        return <User className={iconClass} />;
      case 'shield':
        return <ShieldCheck className={iconClass} />;
      case 'operator':
        return <UserCog className={iconClass} />;
      default:
        return <User className={iconClass} />;
    }
  };

  return (
    <div className="w-full grid grid-cols-3 border border-slate-200/90 rounded-xl bg-slate-100/70 p-1 mb-4">
      {loginTabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 sm:px-2.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
              isActive
                ? 'text-emerald-700 bg-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            {getIcon(tab.icon, isActive)}
            <span className="truncate">{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute -bottom-1 left-2 right-2 h-[2px] bg-emerald-500 rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
