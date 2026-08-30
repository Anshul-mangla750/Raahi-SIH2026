import React from 'react';
import { BookOpen, PlayCircle, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { resourceCards } from '../../data/helpSupportData';

export default function ExploreResourcesSection({ onSelectResource }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-emerald-700" />;
      case 'video':
        return <PlayCircle className="w-5 h-5 text-blue-700" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-purple-700" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-700" />;
    }
  };

  const getIconBg = (iconName) => {
    switch (iconName) {
      case 'book':
        return 'bg-emerald-50 border-emerald-200/80';
      case 'video':
        return 'bg-blue-50 border-blue-200/80';
      case 'activity':
        return 'bg-purple-50 border-purple-200/80';
      default:
        return 'bg-slate-50 border-slate-200/80';
    }
  };

  return (
    <div className="space-y-3.5">
      <h3 className="text-sm sm:text-base font-black text-[#0B1E36] tracking-tight">
        Explore More Resources
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {resourceCards.map((res) => (
          <motion.div
            key={res.id}
            whileHover={{ y: -2 }}
            onClick={() => onSelectResource(res.id)}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${getIconBg(
                    res.icon
                  )}`}
                >
                  {getIcon(res.icon)}
                </div>

                {res.id === 'status' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Operational</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                    {res.badge}
                  </span>
                )}
              </div>

              <h4 className="text-xs sm:text-sm font-black text-[#0B1E36] tracking-tight group-hover:text-emerald-700 transition-colors">
                {res.title}
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                {res.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
              <span>View Resource</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
