import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function VehiclesPagination({
  totalItems = 12,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}) {
  const [pageSizeOpen, setPageSizeOpen] = useState(false);
  const pageSizes = [10, 20, 50];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 select-none">
      {/* Left: Summary text */}
      <div className="text-xs font-bold text-slate-400">
        Showing 1 to 6 of {totalItems} vehicles
      </div>

      {/* Center/Right: Page navigation + page size dropdown */}
      <div className="flex items-center gap-3">
        {/* Pagination buttons */}
        <div className="flex items-center gap-1">
          {/* Previous */}
          <button
            type="button"
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page 1 (Active) */}
          <button
            type="button"
            className="w-8 h-8 rounded-xl bg-[#0D7A48] text-white font-black text-xs flex items-center justify-center shadow-xs cursor-pointer"
          >
            1
          </button>

          {/* Page 2 */}
          <button
            type="button"
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 font-bold text-xs transition-colors cursor-pointer"
          >
            2
          </button>

          {/* Page 3 */}
          <button
            type="button"
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 font-bold text-xs transition-colors cursor-pointer"
          >
            3
          </button>

          {/* Ellipsis */}
          <span className="px-1 text-slate-400 font-bold text-xs">...</span>

          {/* Page 8 */}
          <button
            type="button"
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 font-bold text-xs transition-colors cursor-pointer"
          >
            8
          </button>

          {/* Next */}
          <button
            type="button"
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Page size dropdown */}
        <div className="relative ml-2">
          <button
            type="button"
            onClick={() => setPageSizeOpen(!pageSizeOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-all cursor-pointer"
          >
            <span>{pageSize}/page</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {pageSizeOpen && (
            <div className="absolute right-0 bottom-full mb-1.5 w-28 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30 text-xs font-semibold">
              {pageSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    if (onPageSizeChange) onPageSizeChange(size);
                    setPageSizeOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 cursor-pointer"
                >
                  {size}/page
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
