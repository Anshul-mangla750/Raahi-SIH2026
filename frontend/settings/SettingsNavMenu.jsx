import React from 'react';
import { User, Building2, Bell, Lock, SlidersHorizontal } from 'lucide-react';

export default function SettingsNavMenu({ activeTab, onSelectTab }) {
  const menuItems = [
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'company', label: 'Company Information', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-2.5 sm:p-3">
      {/* Category List */}
      <nav className="flex lg:flex-col gap-1 overflow-x-auto custom-scrollbar select-none">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  isActive ? 'text-[#0D7A48]' : 'text-slate-400'
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
