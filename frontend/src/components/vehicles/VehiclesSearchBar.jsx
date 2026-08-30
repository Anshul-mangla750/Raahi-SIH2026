import React from 'react';
import { Search } from 'lucide-react';

export default function VehiclesSearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="flex items-center justify-end w-full">
      <div className="relative w-full sm:w-80 md:w-[400px]">
        {/* Vertically centered left-aligned search icon */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
          <Search className="w-4 h-4 text-slate-400" />
        </div>

        {/* Input with proper left padding so text never overlaps icon */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Vehicle Number or Driver Name..."
          className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
