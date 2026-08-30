import React from 'react';
import { PlusCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supportTicketsList } from '../../data/helpSupportData';

export default function SupportTicketsCard({ onViewTicket, onRaiseTicket, onViewAll }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight leading-snug">
            Your Support Tickets
          </h2>

          <button
            type="button"
            onClick={onViewAll}
            className="px-3 py-1 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Ticket List */}
        <div className="divide-y divide-slate-100">
          {supportTicketsList.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => onViewTicket && onViewTicket(ticket)}
              className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 hover:bg-slate-50/70 rounded-xl px-2 -mx-2 transition-colors cursor-pointer group"
            >
              {/* Left: Status Line + Ticket Info */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Vertical colored indicator line */}
                <div
                  className={`w-1 h-8 rounded-full flex-shrink-0 ${ticket.lineColor}`}
                />

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">
                      {ticket.id}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {ticket.date}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 truncate group-hover:text-emerald-700 transition-colors mt-0.5">
                    {ticket.subject}
                  </span>
                </div>
              </div>

              {/* Right: Badge + Chevron */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border ${ticket.statusColor}`}
                >
                  {ticket.status}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button: Raise a New Ticket */}
      <div className="pt-4 border-t border-slate-100 mt-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onRaiseTicket}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-600 text-[#0D7A48] hover:bg-emerald-50 text-xs font-bold transition-all cursor-pointer shadow-2xs"
        >
          <span>Raise a New Ticket</span>
          <PlusCircle className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
