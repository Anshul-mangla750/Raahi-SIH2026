import React from 'react';

export const GaugeChart = ({
  value = 92,
  max = 100,
  label = 'Efficient',
  size = 200,
  strokeWidth = 14,
  color = '#047857',
}) => {
  const percentage = Math.min(Math.max(value / max, 0), 1);
  const radius = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2 + 20;

  // Arc calculations for a 180-degree semi-circle (from 180deg to 0deg)
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength * (1 - percentage);

  return (
    <div className="efficiency-gauge-container">
      <div className="gauge-svg-wrap" style={{ width: size, height: size / 2 + 30 }}>
        <svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
          {/* Background Semi-circle Track */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active Gauge Value Arc */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>

        {/* Center Text */}
        <div className="gauge-value">
          <span className="gauge-val-text">{value}%</span>
          <span className="gauge-val-label">{label}</span>
        </div>
      </div>
    </div>
  );
};
