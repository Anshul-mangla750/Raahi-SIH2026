import React from 'react';

export const DonutChart = ({
  data = [],
  total = null,
  totalLabel = 'Total',
  size = 140,
  strokeWidth = 16,
  showLegend = true,
  className = '',
}) => {
  // Calculate total sum if not explicitly given
  const calculatedTotal = total !== null ? total : data.reduce((sum, item) => sum + (item.count || item.value || 0), 0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className={`donut-chart-container ${className}`}>
      {/* SVG Donut Circle */}
      <div className="donut-svg-wrapper" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="var(--border-subtle)"
            strokeWidth={strokeWidth}
          />

          {/* Slices */}
          {data.map((item, index) => {
            const val = item.count !== undefined ? item.count : (item.value || 0);
            const percent = calculatedTotal > 0 ? val / calculatedTotal : 0;
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedPercent * circumference;
            accumulatedPercent += percent;

            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease' }}
              />
            );
          })}
        </svg>

        {/* Center Label and Value */}
        <div className="donut-center-content">
          <span className="donut-center-value">{calculatedTotal}</span>
          <span className="donut-center-label">{totalLabel}</span>
        </div>
      </div>

      {/* Legend List */}
      {showLegend && (
        <div className="donut-legend">
          {data.map((item, index) => (
            <div key={index} className="donut-legend-item">
              <div className="donut-legend-label">
                <span className="donut-legend-dot" style={{ backgroundColor: item.color }} />
                <span>{item.label}</span>
              </div>
              <span className="donut-legend-val">
                {item.amount || item.count || item.value}
                {item.percentage !== undefined && (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: 4 }}>
                    ({item.percentage}%)
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
