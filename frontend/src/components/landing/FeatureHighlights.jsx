import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CloudRain, GitFork, Truck, Bell } from 'lucide-react';
import { heroHighlights } from '../../data/landingData';

export default function FeatureHighlights() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="w-5 h-5" />;
      case 'cloud-rain':
        return <CloudRain className="w-5 h-5" />;
      case 'route':
        return <GitFork className="w-5 h-5 rotate-90" />;
      case 'truck':
        return <Truck className="w-5 h-5" />;
      case 'bell':
        return <Bell className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-4">
      {heroHighlights.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * index }}
          whileHover={{ y: -3 }}
          className="flex flex-col items-center text-center group cursor-pointer"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-xs transition-all duration-200 group-hover:scale-110 group-hover:shadow-md ${item.bgColor}`}
          >
            {getIcon(item.icon)}
          </div>
          <span className="mt-2 text-[11px] leading-tight font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors whitespace-pre-line">
            {item.title}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
