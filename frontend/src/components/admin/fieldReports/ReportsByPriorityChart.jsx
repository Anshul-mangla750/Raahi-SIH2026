import React from 'react';

export const ReportsByPriorityChart = () => {
  const items = [
    { label: 'High', count: 48, percent: '38%', color: '#EF4444' },
    { label: 'Medium', count: 44, percent: '34%', color: '#F59E0B' },
    { label: 'Low', count: 22, percent: '17%', color: '#10B981' },
    { label: 'Informational', count: 14, percent: '11%', color: '#64748B' },
  ];

  const total = 128;
  const size = 135;
  const strokeWidth = 16;
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
      <div className="card-header" style={{ marginBottom: '8px', flexShrink: 0 }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>
          Reports by Priority
        </h2>
      </div>

      {/* Donut and Legend */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          padding: '10px 0',
        }}
      >
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
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              128
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11.5px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: '#334155', fontWeight: 500 }}>{item.label}</span>
              </div>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
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
