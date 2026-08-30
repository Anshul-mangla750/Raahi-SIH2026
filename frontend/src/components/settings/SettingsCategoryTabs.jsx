import React from 'react';
import {
  Settings,
  User,
  Bell,
  ShieldCheck,
  SlidersHorizontal,
  Layers,
} from 'lucide-react';

export default function SettingsCategoryTabs({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
    { id: 'integrations', label: 'Integrations', icon: Layers },
  ];

  return (
    <div className="border-b border-slate-200/90 overflow-x-auto custom-scrollbar select-none">
      <div className="flex items-center gap-6 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 py-3 text-xs font-bold transition-all relative cursor-pointer ${
                isActive
                  ? 'text-[#0D7A48] font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-[#0D7A48]' : 'text-slate-400'
                }`}
              />
              <span>{tab.label}</span>

              {/* Bottom active indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D7A48] rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
