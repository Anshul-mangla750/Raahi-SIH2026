import React from 'react';
import { Package, Truck, GitFork, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { quickHelpCards } from '../../data/helpSupportData';

export default function QuickHelpCards({ onSelectCategory }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'package':
        return <Package className="w-5 h-5 text-emerald-700" />;
      case 'truck':
        return <Truck className="w-5 h-5 text-blue-700" />;
      case 'route':
        return <GitFork className="w-5 h-5 text-amber-700 rotate-90" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-purple-700" />;
      default:
        return <Package className="w-5 h-5 text-emerald-700" />;
    }
  };

  const getIconBg = (color) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 border-emerald-200/80';
      case 'blue':
        return 'bg-blue-50 border-blue-200/80';
      case 'amber':
        return 'bg-amber-50 border-amber-200/80';
      case 'purple':
        return 'bg-purple-50 border-purple-200/80';
      default:
        return 'bg-slate-50 border-slate-200/80';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {quickHelpCards.map((card) => (
        <motion.div
          key={card.id}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.15 }}
          onClick={() => onSelectCategory(card.id)}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div>
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center border mb-3.5 transition-transform group-hover:scale-105 ${getIconBg(
                card.color
              )}`}
            >
              {getIcon(card.icon)}
            </div>

            <h3 className="text-sm font-black text-[#0B1E36] tracking-tight group-hover:text-emerald-700 transition-colors">
              {card.title}
            </h3>

            <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5">
              {card.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
            <span>Explore guides →</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
