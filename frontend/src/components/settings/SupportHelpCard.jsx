import React from 'react';
import { Headphones, Phone, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportHelpCard({ onVisitHelpCenter }) {
  return (
    <div className="rounded-2xl bg-[#EBF7F0]/90 border border-[#BDE5CE] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
      {/* Left: Headset + Support Text */}
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-[#C8EBDA] text-[#0D7A48] flex items-center justify-center flex-shrink-0 shadow-2xs border border-[#A7DEC0]">
          <Headphones className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#0B1E36] leading-tight">
            Need Help?
          </h3>
          <p className="text-xs text-slate-600 font-medium leading-tight mt-0.5 max-w-sm">
            Our support team is here to help you 24/7. Reach out to us anytime.
          </p>
        </div>
      </div>

      {/* Center: Contact Info */}
      <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700 py-1 border-t md:border-t-0 md:border-l md:border-r border-[#C8EBDA] md:px-6">
        {/* Call */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/80 border border-[#BDE5CE] flex items-center justify-center text-slate-600">
            <Phone className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block leading-none">
              Call Support
            </span>
            <span className="font-extrabold text-slate-900 leading-tight">
              +918001234567
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/80 border border-[#BDE5CE] flex items-center justify-center text-slate-600">
            <Mail className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block leading-none">
              Email Support
            </span>
            <span className="font-extrabold text-slate-900 leading-tight">
              support@raahitransporter.com
            </span>
          </div>
        </div>
      </div>

      {/* Right: Visit Help Center Button */}
      <div className="flex-shrink-0 self-start md:self-center">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onVisitHelpCenter}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <span>Visit Help Center</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}
