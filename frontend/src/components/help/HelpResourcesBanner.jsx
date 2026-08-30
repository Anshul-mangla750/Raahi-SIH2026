import React from 'react';
import { BookOpen, PlayCircle, Activity, ChevronRight, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { bottomHelpResources } from '../../data/helpSupportData';

export default function HelpResourcesBanner({ onSelectResource }) {
  const getIcon = (type) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-emerald-700" />;
      case 'play':
        return <PlayCircle className="w-5 h-5 text-emerald-700" />;
      case 'pulse':
        return <Activity className="w-5 h-5 text-emerald-700" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="rounded-2xl bg-[#EBF7F0]/90 border border-[#BDE5CE] p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xs">
      {/* Left: 24/7 Headset Graphic + Heading */}
      <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C8EBDA] to-[#A7DEC0] flex items-center justify-center flex-shrink-0 shadow-2xs border border-[#96D6B2]">
          <Headphones className="w-7 h-7 text-[#0D7A48]" />
          <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-[#0D7A48] text-white text-[8px] font-black shadow-xs">
            24/7
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm sm:text-base font-black text-[#0B1E36] leading-tight">
            Need more help?
          </h3>
          <p className="text-xs text-slate-600 font-medium leading-tight mt-1 max-w-xs">
            Explore our resources to learn more and get the most out of Raahi.
          </p>
        </div>
      </div>

      {/* Right: 3 Resource Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full flex-1">
        {bottomHelpResources.map((res) => (
          <motion.div
            key={res.id}
            whileHover={{ y: -2 }}
            onClick={() => onSelectResource && onSelectResource(res.id)}
            className="p-3.5 rounded-xl bg-white border border-[#BDE5CE] hover:border-emerald-400 shadow-2xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                {getIcon(res.icon)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black text-[#0B1E36] group-hover:text-emerald-700 transition-colors truncate">
                  {res.title}
                </span>
                <span className="text-[10px] text-slate-400 font-medium leading-tight truncate mt-0.5">
                  {res.description}
                </span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
