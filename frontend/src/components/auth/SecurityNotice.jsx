import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function SecurityNotice() {
  return (
    <div className="bg-emerald-50/80 border border-emerald-100/90 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 mt-5">
      <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 flex-shrink-0">
        <ShieldCheck className="w-5 h-5" />
      </div>
      <div className="flex flex-col">
        <h5 className="text-xs font-bold text-emerald-800 leading-tight">
          Secure & Trusted
        </h5>
        <p className="text-[11px] text-slate-500 font-normal leading-snug mt-0.5">
          Your data is protected with enterprise-grade security and encryption.
        </p>
      </div>
    </div>
  );
}
