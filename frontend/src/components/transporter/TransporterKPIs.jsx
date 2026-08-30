import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, Route } from 'lucide-react';
import { kpisData } from '../../data/transporterData';

export default function TransporterKPIs() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'package':
        return <Package className="w-5 h-5 stroke-[2.2]" />;
      case 'truck':
      case 'truck-road':
        return <Truck className="w-5 h-5 stroke-[2.2]" />;
      case 'clock':
        return <Clock className="w-5 h-5 stroke-[2.2]" />;
      case 'road':
        return <Route className="w-5 h-5 stroke-[2.2]" />;
      default:
        return <Package className="w-5 h-5 stroke-[2.2]" />;
    }
  };

  const renderSparkline = (points, strokeColor) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 100;
    const height = 24;

    const pathD = points
      .map((val, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-6 overflow-visible" preserveAspectRatio="none">
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
      {kpisData.map((kpi, idx) => (
        <motion.div
          key={kpi.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.05 }}
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="bg-white rounded-2xl px-4 py-3.5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer min-h-[125px]"
        >
          {/* Top Row: Icon + Value & Title */}
          <div className="flex items-start gap-3">
            {/* Icon Container */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xs ${kpi.iconBg}`}>
              {getIcon(kpi.icon)}
            </div>

            {/* Value & Label */}
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-slate-400 truncate leading-tight">
                {kpi.title}
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none mt-1 whitespace-nowrap">
                {kpi.value}
              </div>
              <span className="text-[10px] text-slate-400 font-medium leading-none mt-1 truncate">
                {kpi.subtitle}
              </span>
            </div>
          </div>

          {/* Bottom Row: Trend + Sparkline */}
          <div className="mt-3 pt-2 border-t border-slate-100/80 flex flex-col space-y-1">
            <span
              className={`text-[10px] font-bold ${
                kpi.trendColor || (kpi.isIncrease ? 'text-emerald-600' : 'text-rose-500')
              }`}
            >
              {kpi.trend}
            </span>
            {renderSparkline(kpi.points, kpi.sparklineColor)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
