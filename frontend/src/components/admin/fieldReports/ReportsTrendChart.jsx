import React from 'react';
import { useApp } from '@/contexts/AppContext';

export const ReportsTrendChart = () => {
  const { setCurrentPage } = useApp();

  const data = [
    { date: '15 May', count: 18 },
    { date: '16 May', count: 22 },
    { date: '17 May', count: 17 },
    { date: '18 May', count: 25 },
    { date: '19 May', count: 20 },
    { date: '20 May', count: 28 },
    { date: '21 May', count: 36 },
  ];

  const yTicks = [50, 40, 30, 20, 10, 0];

  const width = 360;
  const height = 165;
  const paddingLeft = 28;
  const paddingRight = 14;
  const paddingTop = 22; // extra room for values above dots
  const paddingBottom = 28;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const getX = (idx) => paddingLeft + (idx / (data.length - 1)) * chartW;
  const getY = (val) => paddingTop + chartH - (val / 50) * chartH;

  const pathData = data
    .map((d, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx)} ${getY(d.count)}`)
    .join(' ');

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
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '6px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Reports Trend
        </h2>
        <button
          onClick={() => setCurrentPage('analytics')}
          style={{
            background: 'none',
            border: 'none',
            color: '#059669',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          View Full Report
        </button>
      </div>

      {/* SVG Line Chart */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          {/* Horizontal Grid Lines and Y-axis Labels */}
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
                  x={paddingLeft - 6}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="8.5"
                  fill="#94A3B8"
                  fontWeight="500"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* X axis Date Labels */}
          {data.map((d, idx) => {
            const x = getX(idx);
            return (
              <text
                key={d.date}
                x={x}
                y={height - 8}
                textAnchor="middle"
                fontSize="8.5"
                fill="#94A3B8"
                fontWeight="500"
              >
                {d.date}
              </text>
            );
          })}

          {/* Trend Line */}
          <path
            d={pathData}
            fill="none"
            stroke="#047857"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points and Value Labels */}
          {data.map((d, idx) => {
            const x = getX(idx);
            const y = getY(d.count);

            return (
              <g key={d.date}>
                {/* Numeric value above point */}
                <text
                  x={x}
                  y={y - 7}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="700"
                  fill="#1E293B"
                >
                  {d.count}
                </text>
                {/* Point */}
                <circle
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="#047857"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '6px' }}>
          <span style={{ width: '12px', height: '3px', backgroundColor: '#047857', borderRadius: '2px' }} />
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Reports</span>
        </div>
      </div>
    </div>
  );
};
