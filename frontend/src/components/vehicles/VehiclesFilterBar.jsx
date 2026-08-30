import React from 'react';
import { Search } from 'lucide-react';

export default function VehiclesFilterBar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}) {
  const tabs = [
    { id: 'all', label: 'All Vehicles' },
    { id: 'on-route', label: 'On Route' },
    { id: 'idle', label: 'Idle' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'offline', label: 'Offline' },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-px">
      {/* Left: Filter Tabs */}
      <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar -mb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`pb-3 text-xs sm:text-sm font-bold tracking-tight transition-all relative whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-[#0D7A48] font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D7A48] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Search Box */}
      <div className="relative w-full md:w-80 pb-2 md:pb-2.5">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Vehicle No., Driver, or Model..."
          className="w-full pl-9.5 pr-4 py-2 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
        />
      </div>
    </div>
  );
}
