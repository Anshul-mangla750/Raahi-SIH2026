import React from 'react';
import { toast } from 'sonner';

export const ReportsByTypeChart = () => {
  const items = [
    { label: 'Road Damage', count: 32, percent: '25%', color: '#10B981' },
    { label: 'Traffic Jam', count: 24, percent: '19%', color: '#3B82F6' },
    { label: 'Accident', count: 20, percent: '16%', color: '#EF4444' },
    { label: 'Road Block', count: 18, percent: '14%', color: '#F59E0B' },
    { label: 'Weather Issue', count: 14, percent: '11%', color: '#8B5CF6' },
    { label: 'Others', count: 20, percent: '15%', color: '#64748B' },
  ];

  const total = 128;
  const size = 125;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;
  const segments = items.map((item) => {
    const frac = item.count / total;
    const length = frac * circumference;
    const offset = -accumulatedPercent * circumference;
    accumulatedPercent += frac;
    return { stroke: item.color, length, offset };
  });

  return (
    <div
      className="card"
      style={{
        padding: '14px 16px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Reports by Type
        </h2>
        <button
          onClick={() => toast.info('Detailed breakdown by report category opened.')}
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
          View Details
        </button>
      </div>

      {/* Donut and Legend */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '6px 0' }}>
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
            />
            {segments.map((seg, idx) => (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={seg.stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={`${seg.length} ${circumference}`}
                strokeDashoffset={seg.offset}
              />
            ))}
          </svg>

          {/* Center text */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              128
            </span>
            <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: '#334155', fontWeight: 500 }}>{item.label}</span>
              </div>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {item.count}
                <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '2px' }}>
                  ({item.percent})
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
