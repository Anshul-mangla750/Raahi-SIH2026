import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function ConsignmentsPagination({
  totalItems = 0,
  currentPage = 1,
  pageSize = 10,
  onPageChange = () => {},
  onPageSizeChange = () => {},
}) {
  const [pageSizeOpen, setPageSizeOpen] = useState(false);
  const pageSizes = [5, 10, 20, 50];

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startRecord = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endRecord = Math.min(safeCurrentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (safeCurrentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (safeCurrentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', safeCurrentPage, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 select-none">
      {/* Left: Summary text */}
      <div className="text-xs font-bold text-slate-500">
        Showing <span className="text-slate-900 font-extrabold">{startRecord}</span> to <span className="text-slate-900 font-extrabold">{endRecord}</span> of <span className="text-slate-900 font-extrabold">{totalItems}</span> consignments
      </div>

      {/* Center/Right: Page navigation + page size dropdown */}
      <div className="flex items-center gap-3">
        {/* Pagination buttons */}
        <div className="flex items-center gap-1">
          {/* Previous */}
          <button
            type="button"
            disabled={safeCurrentPage <= 1}
            onClick={() => onPageChange(safeCurrentPage - 1)}
            className={`w-8 h-8 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 transition-colors ${
              safeCurrentPage <= 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 hover:text-slate-800 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          {getPageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="px-1 text-slate-400 font-bold text-xs">
                  ...
                </span>
              );
            }

            const isActive = p === safeCurrentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0D7A48] text-white font-black shadow-xs'
                    : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                {p}
              </button>
            );
          })}

          {/* Next */}
          <button
            type="button"
            disabled={safeCurrentPage >= totalPages}
            onClick={() => onPageChange(safeCurrentPage + 1)}
            className={`w-8 h-8 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 transition-colors ${
              safeCurrentPage >= totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 hover:text-slate-800 cursor-pointer'
            }`}
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
                    onPageSizeChange(size);
                    setPageSizeOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 cursor-pointer ${
                    pageSize === size ? 'text-emerald-600 font-bold bg-emerald-50/50' : 'text-slate-700'
                  }`}
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
