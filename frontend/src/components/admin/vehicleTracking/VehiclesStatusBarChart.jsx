import React from 'react';

export const VehiclesStatusBarChart = () => {
  const bars = [
    { label: 'Moving', count: 58, color: '#047857' },
    { label: 'Idle', count: 12, color: '#3B82F6' },
    { label: 'Stopped', count: 9, color: '#EF4444' },
    { label: 'Delayed', count: 7, color: '#F59E0B' },
    { label: 'Offline', count: 0, color: '#94A3B8' },
  ];

  const maxVal = 80;

  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Vehicles by Status</h2>
      </div>

      <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '12px', padding: '10px 0 0 0', position: 'relative' }}>
        {/* Y Axis Guides */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        {bars.map((b, i) => {
          const heightPercent = (b.count / maxVal) * 100;

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                flex: 1,
                height: '100%',
                justifyContent: 'flex-end',
                marginLeft: i === 0 ? '24px' : '0',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {b.count}
              </span>
              <div
                style={{
                  width: '100%',
                  maxWidth: '36px',
                  height: `${Math.max(heightPercent, 2)}%`,
                  backgroundColor: b.color,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.4s ease',
                }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {b.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
