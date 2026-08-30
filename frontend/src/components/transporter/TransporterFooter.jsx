import React from 'react';
import { ShieldCheck, Headphones } from 'lucide-react';

export default function TransporterFooter() {
  return (
    <footer className="pt-4 pb-2 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-slate-500">
      {/* Left: Security notice */}
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>
          <strong className="font-bold text-slate-700">Your data is secure with us.</strong> We are committed to safety, privacy and transparency.
        </span>
      </div>

      {/* Right: Support notice */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Headphones className="w-4 h-4 text-slate-400" />
        <span>
          Need help?{' '}
          <button type="button" className="font-bold text-emerald-600 hover:underline cursor-pointer">
            Contact Support
          </button>
        </span>
      </div>
    </footer>
  );
}
