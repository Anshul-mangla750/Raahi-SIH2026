import React from 'react';
import { DISTANCE_COMPARISON } from '@/data/admin/mockData';

export const DistanceComparisonChart = () => {
  const maxDistance = 600;
  const yTicks = [600, 450, 300, 150, 0];

  const items = [
    { name: 'Current Route', distance: 520, color: '#94A3B8' },
    { name: 'Optimized Route', distance: 468, color: '#047857', isOptimized: true },
    { name: 'Shortest Route', distance: 452, color: '#86EFAC' },
    { name: 'Alternative 1', distance: 485, color: '#A7F3D0' },
    { name: 'Alternative 2', distance: 510, color: '#A7F3D0' },
  ];

  return (
    <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header" style={{ marginBottom: '8px', flexShrink: 0 }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>Distance Comparison</h2>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Unit label */}
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2px' }}>
          km
        </div>

        {/* Chart Area with Y-axis & Gridlines */}
        <div style={{ display: 'flex', height: '170px', position: 'relative' }}>
          {/* Y-axis Ticks */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingRight: '8px',
              fontSize: '10px',
              color: 'var(--text-muted)',
              width: '28px',
              textAlign: 'right',
              flexShrink: 0,
            }}
          >
            {yTicks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>

          {/* Chart Plot Area with Grid Lines and Bars */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around' }}>
            {/* Horizontal Grid Lines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pointerEvents: 'none',
              }}
            >
              {yTicks.map((tick, i) => (
                <div
                  key={i}
                  style={{
                    width: '100%',
                    borderBottom: i === yTicks.length - 1 ? '1px solid #CBD5E1' : '1px dashed #F1F5F9',
                  }}
                />
              ))}
            </div>

            {/* 5 Vertical Bars */}
            {items.map((item, idx) => {
              const heightPercent = (item.distance / maxDistance) * 100;

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                    width: '16%',
                    zIndex: 2,
                  }}
                >
                  {/* Value Above Bar */}
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      color: item.isOptimized ? '#047857' : 'var(--text-primary)',
                      marginBottom: '4px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.distance} km
                  </span>

                  {/* Bar */}
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '34px',
                      height: `${heightPercent}%`,
                      backgroundColor: item.color,
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.4s ease',
                      boxShadow: item.isOptimized ? '0 2px 6px rgba(4, 120, 87, 0.25)' : 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* X-axis Labels */}
        <div style={{ display: 'flex', paddingLeft: '36px', justifyContent: 'space-around', marginTop: '6px' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: '18%',
                textAlign: 'center',
                fontSize: '9.5px',
                fontWeight: item.isOptimized ? 700 : 500,
                color: item.isOptimized ? '#047857' : 'var(--text-muted)',
                lineHeight: 1.2,
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
