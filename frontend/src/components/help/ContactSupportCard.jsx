import React from 'react';
import { Phone, Mail, Clock, Headphones, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { supportContactInfo } from '../../data/helpSupportData';

export default function ContactSupportCard({ onOpenSupportQuery }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D7A48] border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight leading-snug">
              Contact Support
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-tight">
              Need more help? Our dedicated support desk is available to assist you.
            </p>
          </div>
        </div>

        {/* Contact Methods List */}
        <div className="space-y-3.5 mt-4">
          {/* 1. Phone Support */}
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Call Support
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                  {supportContactInfo.phone}
                </span>
              </div>
            </div>

            <a
              href={`tel:${supportContactInfo.rawPhone}`}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors shadow-2xs cursor-pointer flex-shrink-0"
            >
              Call Now
            </a>
          </div>

          {/* 2. Email Support */}
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Email Support
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate block">
                  {supportContactInfo.email}
                </span>
              </div>
            </div>

            <a
              href={`mailto:${supportContactInfo.email}?subject=RAAHI Transporter Support Request`}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors shadow-2xs cursor-pointer flex-shrink-0"
            >
              Send Email
            </a>
          </div>

          {/* 3. Support Hours */}
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Support Operating Hours
              </span>
              <span className="text-xs font-bold text-slate-800 leading-tight block mt-0.5">
                {supportContactInfo.hours} • {supportContactInfo.time}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Primary Button */}
      <div className="pt-4 border-t border-slate-100 mt-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenSupportQuery}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact Support</span>
        </motion.button>
      </div>
    </div>
  );
}
