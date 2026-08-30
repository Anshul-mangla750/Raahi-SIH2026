import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Truck,
  XCircle,
  MapPin,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { reportsKPIData } from '../../data/reportsData';

// Clean SVG Sparkline Wave generator
const Sparkline = ({ points, color }) => {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 120;
  const height = 28;

  const pathCoords = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathString = `M ${pathCoords.join(' L ')}`;

  return (
    <div className="w-full h-7 overflow-hidden mt-2">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
        fill="none"
      >
        <path
          d={pathString}
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default function ReportsKPIs() {
  const getIcon = (iconName, color) => {
    switch (iconName) {
      case 'calendar':
        return (
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Calendar className="w-5 h-5" />
          </div>
        );
      case 'check-circle':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        );
      case 'truck':
        return (
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Truck className="w-5 h-5" />
          </div>
        );
      case 'x-circle':
        return (
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <XCircle className="w-5 h-5" />
          </div>
        );
      case 'map-pin':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <MapPin className="w-5 h-5" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
      {reportsKPIData.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-xs hover:border-slate-300/80 transition-all duration-200 group"
        >
          {/* Top: Icon + Label & Value */}
          <div className="flex items-center gap-3">
            {getIcon(card.icon, card.color)}

            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-slate-400 leading-tight truncate">
                {card.title}
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#0B1E36] tracking-tight leading-tight mt-0.5">
                {card.value}
              </span>
            </div>
          </div>

          {/* Trend */}
          <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold">
            {card.isNegative ? (
              <div className="flex items-center gap-1 text-rose-600">
                <TrendingDown className="w-3 h-3" />
                <span>{card.trend}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="w-3 h-3" />
                <span>{card.trend}</span>
              </div>
            )}
          </div>

          {/* Bottom Wave Sparkline */}
          <Sparkline points={card.points} color={card.color} />
        </div>
      ))}
    </div>
  );
}
