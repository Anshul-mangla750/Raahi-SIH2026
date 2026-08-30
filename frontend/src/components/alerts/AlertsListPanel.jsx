import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AlertsListPanel({
  alerts,
  selectedAlert,
  onSelectAlert,
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  currentPage,
  onPageChange,
}) {
  const tabs = [
    { id: 'all', label: 'All Alerts' },
    { id: 'unread', label: 'Unread' },
    { id: 'high', label: 'Critical' },
    { id: 'medium', label: 'Warnings' },
    { id: 'resolved', label: 'Resolved' },
  ];

  const getSeverityBadge = (severity, severityType) => {
    switch (severityType) {
      case 'high':
        return 'bg-rose-50 text-rose-600 border border-rose-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'low':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between h-full">
      <div>
        {/* 1. Header with Search & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h3 className="text-base font-black text-[#0B1E36] tracking-tight">
            All Alerts
          </h3>

          <div className="flex items-center gap-2 flex-1 sm:max-w-xs justify-end">
            {/* Search Input with Proper Padding to Avoid Overlap */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search alerts..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200/90 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Filter Funnel Button */}
            <button
              type="button"
              className="p-2 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Filter Alerts"
            >
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Navigation / Severity Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar py-3 border-b border-slate-100 text-xs font-bold">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0D7A48] text-white shadow-2xs font-extrabold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3. Alert Cards List */}
        <div className="space-y-3 mt-4">
          {alerts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No alerts found matching the criteria.
            </div>
          ) : (
            alerts.map((alert) => {
              const isSelected = selectedAlert?.id === alert.id;

              return (
                <motion.div
                  key={alert.id}
                  layout
                  onClick={() => onSelectAlert(alert)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-rose-300 ring-1 ring-rose-200/80 bg-rose-50/20 shadow-2xs'
                      : 'border-slate-200/80 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  {/* Left: Image Thumbnail */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/70">
                    <img
                      src={alert.image}
                      alt={alert.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Center: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                        {alert.title}
                      </h4>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${getSeverityBadge(
                          alert.severity,
                          alert.severityType
                        )}`}
                      >
                        {alert.severity}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mt-1 truncate">
                      <span>{alert.origin}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span>{alert.destination}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {alert.subtitle}
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold mt-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>

                  {/* Right: Chevron */}
                  <div className="flex items-center pr-1 flex-shrink-0">
                    <ChevronRight
                      className={`w-4 h-4 transition-colors ${
                        isSelected ? 'text-rose-500' : 'text-slate-400'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* 4. Pagination */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 mt-4">
        <span>Showing 1 to {alerts.length} of 12 alerts</span>

        <div className="flex items-center gap-1 font-bold">
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className="w-7 h-7 rounded-lg border border-slate-200/90 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              currentPage === 1
                ? 'bg-[#0D7A48] text-white shadow-2xs font-extrabold'
                : 'border border-slate-200/90 text-slate-600 hover:bg-slate-50'
            }`}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => onPageChange(2)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              currentPage === 2
                ? 'bg-[#0D7A48] text-white shadow-2xs font-extrabold'
                : 'border border-slate-200/90 text-slate-600 hover:bg-slate-50'
            }`}
          >
            2
          </button>
          <button
            type="button"
            onClick={() => onPageChange(2)}
            className="w-7 h-7 rounded-lg border border-slate-200/90 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
