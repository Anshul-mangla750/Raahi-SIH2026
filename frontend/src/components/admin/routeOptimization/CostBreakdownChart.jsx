import React from 'react';

export const CostBreakdownChart = () => {
  const breakdown = [
    { label: 'Fuel Cost', amount: '₹3,240', percent: '52%', color: '#047857' },
    { label: 'Driver Cost', amount: '₹ 1,800', percent: '29%', color: '#2563EB' },
    { label: 'Toll Cost', amount: '₹ 900', percent: '14%', color: '#EA580C' },
    { label: 'Miscellaneous', amount: '₹ 300', percent: '5%', color: '#7C3AED' },
  ];

  // SVG Donut calculation
  const size = 126;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Segment lengths (circumference = 348.7)
  const segments = [
    { stroke: '#047857', length: 0.52 * circumference, offset: 0 },
    { stroke: '#2563EB', length: 0.29 * circumference, offset: -0.52 * circumference },
    { stroke: '#EA580C', length: 0.14 * circumference, offset: -(0.52 + 0.29) * circumference },
    { stroke: '#7C3AED', length: 0.05 * circumference, offset: -(0.52 + 0.29 + 0.14) * circumference },
  ];

  return (
    <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header" style={{ marginBottom: '8px', flexShrink: 0 }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>Estimated Cost Breakdown</h2>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '10px 0' }}>
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
            />

            {/* Colored slices */}
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
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              ₹ 6,240
            </span>
            <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Total Cost
            </span>
          </div>
        </div>

        {/* Legend on Right */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {breakdown.map((item, idx) => (
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
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{item.label}</span>
              </div>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {item.amount}
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
