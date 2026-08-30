import React from 'react';
import { onTimeDeliveryData } from '../../data/transporterData';

export default function OnTimeDeliveryChart() {
  const { rate, period, points, dates } = onTimeDeliveryData;
  const maxY = 100;
  const width = 360;
  const height = 130;
  const paddingLeft = 10;
  const paddingRight = 10;
  const paddingTop = 15;
  const paddingBottom = 10;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const getX = (index) => paddingLeft + (index / (points.length - 1)) * chartW;
  const getY = (val) => paddingTop + chartH - (val / maxY) * chartH;

  const lineD = points
    .map((val, idx) => {
      const x = getX(idx);
      const y = getY(val);
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  const areaD = `${lineD} L ${getX(points.length - 1)} ${height - paddingBottom} L ${getX(0)} ${
    height - paddingBottom
  } Z`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1E36] tracking-tight">
          On-Time Delivery Rate
        </h3>
        <div className="flex flex-col items-end leading-tight">
          <span className="text-base sm:text-lg font-black text-emerald-600">
            {rate}
          </span>
          <span className="text-[9px] font-bold text-slate-400">
            {period}
          </span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex items-center gap-1 my-auto">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between h-28 pr-1 text-[9px] font-bold text-slate-400 flex-shrink-0 select-none">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        {/* SVG Canvas */}
        <div className="flex-1 flex flex-col">
          <div className="relative w-full h-28">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[100, 75, 50, 25, 0].map((level) => {
                const yPos = getY(level);
                return (
                  <line
                    key={level}
                    x1={paddingLeft}
                    y1={yPos}
                    x2={width - paddingRight}
                    y2={yPos}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Area Fill */}
              <path d={areaD} fill="url(#greenGradient)" />

              {/* Line */}
              <path
                d={lineD}
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((val, idx) => {
                const x = getX(idx);
                const y = getY(val);
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill="#10B981"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          </div>

          {/* X-Axis Dates */}
          <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-bold text-slate-400 pt-1 px-1">
            {dates.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
