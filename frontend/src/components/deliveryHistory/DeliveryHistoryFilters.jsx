import React from 'react';
import { Search, ChevronDown, RotateCcw } from 'lucide-react';

export default function DeliveryHistoryFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  vehicleFilter,
  onVehicleChange,
  routeFilter,
  onRouteChange,
  onReset,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-3.5 sm:p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        {/* 1. Search Bar */}
        <div className="sm:col-span-2 lg:col-span-2">
          <label className="text-[11px] font-bold text-slate-400 block mb-1">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by Consignment ID, Receiver, Route..."
              className="w-full pl-3 pr-9 py-2 text-xs bg-white border border-slate-200/90 rounded-xl placeholder:text-slate-400 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 2. Status Dropdown */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 block mb-1">
            Status
          </label>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full appearance-none px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer pr-8"
            >
              <option value="all">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Delayed">Delayed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. Vehicle Dropdown */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 block mb-1">
            Vehicle
          </label>
          <div className="relative">
            <select
              value={vehicleFilter}
              onChange={(e) => onVehicleChange(e.target.value)}
              className="w-full appearance-none px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer pr-8"
            >
              <option value="all">All Vehicles</option>
              <option value="AS 01 GC 9876">AS 01 GC 9876</option>
              <option value="AS 12 AB 3456">AS 12 AB 3456</option>
              <option value="AS 01 GC 1234">AS 01 GC 1234</option>
              <option value="AS 15 AC 6789">AS 15 AC 6789</option>
              <option value="AS 11 AD 2468">AS 11 AD 2468</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 4. Route Dropdown & Reset Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <label className="text-[11px] font-bold text-slate-400 block mb-1">
              Route
            </label>
            <div className="relative">
              <select
                value={routeFilter}
                onChange={(e) => onRouteChange(e.target.value)}
                className="w-full appearance-none px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer pr-8"
              >
                <option value="all">All Routes</option>
                <option value="Guwahati → Tezpur">Guwahati → Tezpur</option>
                <option value="Jorhat → Dibrugarh">Jorhat → Dibrugarh</option>
                <option value="Morigaon → Guwahati">Morigaon → Guwahati</option>
                <option value="Nagaon → Tezpur">Nagaon → Tezpur</option>
                <option value="Silchar → Guwahati">Silchar → Guwahati</option>
                <option value="Tezpur → Shillong">Tezpur → Shillong</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="pt-5">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
