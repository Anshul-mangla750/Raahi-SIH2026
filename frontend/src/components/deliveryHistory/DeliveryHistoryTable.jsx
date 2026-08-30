import React from 'react';
import { Eye, Truck, Calendar, Clock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DeliveryHistoryTable({ deliveries, onSelectDelivery }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200/90';
      case 'Delayed':
        return 'bg-amber-50 text-amber-700 border border-amber-200/90';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border border-rose-200/90';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/40 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-5">Consignment & Route</th>
              <th className="py-3 px-4 sm:px-5">Receiver & Contact</th>
              <th className="py-3 px-4 sm:px-5">Vehicle Details</th>
              <th className="py-3 px-4 sm:px-5">Delivered On & Time</th>
              <th className="py-3 px-4 sm:px-5">Status</th>
              <th className="py-3 px-4 sm:px-5">Payment</th>
              <th className="py-3 px-4 sm:px-5 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-xs">
            {deliveries.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-400">
                  No deliveries found matching the filters.
                </td>
              </tr>
            ) : (
              deliveries.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onSelectDelivery(row)}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                >
                  {/* 1. Consignment & Route */}
                  <td className="py-3.5 px-4 sm:px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/70">
                        <img
                          src={row.image}
                          alt={row.id}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-slate-900 text-xs sm:text-sm tracking-tight leading-tight">
                          {row.id}
                        </span>

                        {/* Origin & Destination with dotted route */}
                        <div className="flex flex-col mt-1.5 text-[11px] font-semibold text-slate-600 space-y-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                            <span className="truncate">{row.origin}</span>
                          </div>
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                            <span className="truncate">{row.destination}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. Receiver & Contact */}
                  <td className="py-3.5 px-4 sm:px-5 align-middle">
                    <div className="flex flex-col min-w-0">
                      <span className="font-extrabold text-slate-900 truncate">
                        {row.receiver}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {row.contactPerson}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold mt-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{row.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* 3. Vehicle Details */}
                  <td className="py-3.5 px-4 sm:px-5 align-middle">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100 text-blue-600 flex-shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-extrabold text-slate-900 truncate">
                          {row.vehicleNo}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {row.vehicleModel}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* 4. Delivered On & Time */}
                  <td className="py-3.5 px-4 sm:px-5 align-middle">
                    <div className="flex flex-col text-[11px] font-semibold text-slate-600 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{row.deliveredDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{row.deliveredTime}</span>
                      </div>
                    </div>
                  </td>

                  {/* 5. Status Badge */}
                  <td className="py-3.5 px-4 sm:px-5 align-middle">
                    <span
                      className={`text-[11px] font-extrabold px-2.5 py-1 rounded-md inline-block ${getStatusBadge(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* 6. Payment */}
                  <td className="py-3.5 px-4 sm:px-5 align-middle font-black text-slate-900 text-sm">
                    {row.payment}
                  </td>

                  {/* 7. Action Button */}
                  <td className="py-3.5 px-4 sm:px-5 align-middle text-right">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDelivery(row);
                      }}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/90 text-slate-600 hover:text-emerald-700 hover:border-emerald-200 transition-all cursor-pointer shadow-2xs"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
