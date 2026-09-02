import React, { useState } from 'react';

export const LineChart = ({
  data = [],
  series = [],
  height = 200,
  yMax = null,
  showLegend = true,
  yAxisLabel = null,
  className = '',
}) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data.length || !series.length) return null;

  const padding = { top: 16, right: 24, bottom: 26, left: 66 };
  const width = 600; // viewBox internal units

  // Calculate max value across series
  const computedMax =
    yMax ||
    Math.max(
      ...data.flatMap((d) =>
        series.map((s) => (typeof d[s.key] === 'number' ? d[s.key] : 0))
      )
    ) * 1.15 || 100;

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const centerY = padding.top + chartHeight / 2;

  // Coordinate helper
  const getX = (index) => padding.left + (index / (data.length - 1)) * chartWidth;
  const getY = (value) => height - padding.bottom - (value / computedMax) * chartHeight;

  return (
    <div className={`line-chart-container ${className}`} style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      >
        {/* Y Axis Label Title */}
        {yAxisLabel && (
          <text
            x={14}
            y={centerY}
            transform={`rotate(-90 14 ${centerY})`}
            fill="var(--text-muted)"
            fontSize="10"
            fontWeight="600"
            textAnchor="middle"
          >
            {yAxisLabel}
          </text>
        )}

        {/* Horizontal Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = height - padding.bottom - ratio * chartHeight;
          const val = Math.round(ratio * computedMax);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="var(--border-subtle)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={y + 3.5}
                fill="var(--text-muted)"
                fontSize="10"
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((d, i) => {
          const x = getX(i);
          return (
            <text
              key={i}
              x={x}
              y={height - 8}
              fill="var(--text-muted)"
              fontSize="10"
              textAnchor="middle"
            >
              {d.date || d.label}
            </text>
          );
        })}

        {/* Lines for each series */}
        {series.map((s) => {
          const points = data.map((d, i) => `${getX(i)},${getY(d[s.key] || 0)}`).join(' ');

          return (
            <g key={s.key}>
              <polyline
                fill="none"
                stroke={s.color}
                strokeWidth="2.5"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dots */}
              {data.map((d, i) => (
                <circle
                  key={i}
                  cx={getX(i)}
                  cy={getY(d[s.key] || 0)}
                  r={hoverIndex === i ? 5 : 3.5}
                  fill={s.color}
                  stroke="var(--bg-card)"
                  strokeWidth="1.5"
                  style={{ transition: 'r 0.15s ease' }}
                />
              ))}
            </g>
          );
        })}

        {/* Interactive Hover Vertical Bar */}
        {data.map((d, i) => {
          const x = getX(i);
          return (
            <rect
              key={i}
              x={x - chartWidth / (data.length * 2)}
              y={padding.top}
              width={chartWidth / data.length}
              height={chartHeight}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: 'pointer' }}
            />
          );
        })}
      </svg>

      {/* Legend */}
      {showLegend && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '12px',
            flexWrap: 'wrap',
          }}
        >
          {series.map((s) => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
              <span
                style={{
                  width: '12px',
                  height: '3px',
                  backgroundColor: s.color,
                  borderRadius: '2px',
                }}
              />
              <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
