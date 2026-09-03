import React from 'react';

export const AlertsTrendChart = () => {
  const days = ['15 May', '16 May', '17 May', '18 May', '19 May', '20 May', '21 May'];
  const yTicks = [40, 30, 20, 10, 0];

  const series = [
    {
      name: 'Critical',
      color: '#EF4444',
      values: [20, 21, 19, 16, 20, 16, 16],
    },
    {
      name: 'High',
      color: '#F97316',
      values: [23, 31, 27, 28, 32, 23, 25],
    },
    {
      name: 'Medium',
      color: '#EAB308',
      values: [9, 12, 9, 10, 11, 8, 9],
    },
    {
      name: 'Low',
      color: '#3B82F6',
      values: [4, 6, 5, 6, 6, 5, 5],
    },
  ];

  // SVG Chart bounds
  const width = 420;
  const height = 175;
  const paddingLeft = 32;
  const paddingRight = 15;
  const paddingTop = 14;
  const paddingBottom = 32;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const getX = (idx) => paddingLeft + (idx / (days.length - 1)) * chartW;
  const getY = (val) => paddingTop + chartH - (val / 40) * chartH;

  return (
    <div
      className="card"
      style={{
        padding: '16px 18px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div className="card-header" style={{ marginBottom: '6px', flexShrink: 0 }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>
          Alerts Trend (Last 7 Days)
        </h2>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          {/* Horizontal Grid lines and Y labels */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? 'none' : '3 3'}
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="9.5"
                  fill="#94A3B8"
                  fontWeight="500"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* X axis Day Labels */}
          {days.map((day, idx) => {
            const x = getX(idx);
            return (
              <text
                key={day}
                x={x}
                y={height - 10}
                textAnchor="middle"
                fontSize="9"
                fill="#94A3B8"
                fontWeight="500"
              >
                {day}
              </text>
            );
          })}

          {/* Data Lines & Dots */}
          {series.map((s) => {
            const pathData = s.values
              .map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx)} ${getY(val)}`)
              .join(' ');

            return (
              <g key={s.name}>
                {/* Line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Points */}
                {s.values.map((val, idx) => (
                  <circle
                    key={idx}
                    cx={getX(idx)}
                    cy={getY(val)}
                    r="3.5"
                    fill={s.color}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            );
          })}
        </svg>

        {/* Bottom Legend */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            marginTop: '8px',
          }}
        >
          {series.map((s) => (
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '14px',
                  height: '3px',
                  backgroundColor: s.color,
                  borderRadius: '2px',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
