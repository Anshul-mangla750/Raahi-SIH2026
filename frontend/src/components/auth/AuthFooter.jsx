import React from 'react';

export default function AuthFooter() {
  return (
    <footer className="w-full py-4 text-center text-xs text-slate-500 font-medium select-none z-30">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span>© 2026 NER LogiSmart. All rights reserved.</span>
        <span className="text-slate-300 hidden sm:inline">|</span>
        <a href="#privacy" className="hover:text-emerald-600 transition-colors">
          Privacy Policy
        </a>
        <span className="text-slate-300 hidden sm:inline">|</span>
        <a href="#terms" className="hover:text-emerald-600 transition-colors">
          Terms of Service
        </a>
        <span className="text-slate-300 hidden sm:inline">|</span>
        <a href="#contact" className="hover:text-emerald-600 transition-colors">
          Contact Us
        </a>
      </div>
    </footer>
  );
}
