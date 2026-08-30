import React from 'react';
import { Eye } from 'lucide-react';
import { recentConsignmentsData } from '../../data/transporterData';

export default function RecentConsignmentsTable() {
  const getStatusBadge = (statusType) => {
    switch (statusType) {
      case 'in-transit':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'delayed':
        return 'bg-orange-50 text-orange-600 border-orange-200/80';
      case 'delivered':
        return 'bg-blue-50 text-blue-600 border-blue-200/80';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200/80';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-sm sm:text-base font-extrabold text-[#0B1E36] tracking-tight">
          Recent Consignments
        </h3>
        <button
          type="button"
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto custom-scrollbar -mx-4 sm:mx-0">
        <table className="w-full text-left text-xs min-w-[700px]">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
              <th className="py-2.5 px-3 font-bold">Consignment ID</th>
              <th className="py-2.5 px-3 font-bold">From</th>
              <th className="py-2.5 px-3 font-bold">To</th>
              <th className="py-2.5 px-3 font-bold">Vehicle No.</th>
              <th className="py-2.5 px-3 font-bold text-center">Status</th>
              <th className="py-2.5 px-3 font-bold">ETA</th>
              <th className="py-2.5 px-3 font-bold text-right">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-50 text-[11px]">
            {recentConsignmentsData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                {/* Consignment ID */}
                <td className="py-3.5 px-3 font-extrabold text-slate-900 whitespace-nowrap">
                  {row.id}
                </td>

                {/* From */}
                <td className="py-3.5 px-3 font-medium text-slate-700 whitespace-nowrap">
                  {row.from}
                </td>

                {/* To */}
                <td className="py-3.5 px-3 font-medium text-slate-700 whitespace-nowrap">
                  {row.to}
                </td>

                {/* Vehicle No. */}
                <td className="py-3.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                  {row.vehicleNo}
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-3 text-center whitespace-nowrap">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border ${getStatusBadge(
                      row.statusType
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* ETA */}
                <td className="py-3.5 px-3 font-semibold text-slate-600 whitespace-nowrap">
                  {row.eta}
                </td>

                {/* Action Button */}
                <td className="py-3.5 px-3 text-right whitespace-nowrap">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
