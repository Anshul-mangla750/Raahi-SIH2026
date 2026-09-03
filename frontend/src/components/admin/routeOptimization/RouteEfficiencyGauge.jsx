import React from 'react';
import { Clock, Fuel } from 'lucide-react';

export const RouteEfficiencyGauge = () => {
  const percentage = 0.92;
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength * (1 - percentage);

  return (
    <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="card-header" style={{ width: '100%', marginBottom: '4px', flexShrink: 0 }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>Route Efficiency</h2>
      </div>

      {/* Semi-circle Gauge SVG */}
      <div style={{ position: 'relative', width: `${size}px`, height: `${size / 2 + 20}px`, marginTop: '4px' }}>
        <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
          {/* Track */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Active Arc */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="#047857"
            strokeWidth={strokeWidth}
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>

        {/* Value Inside Gauge */}
        <div
          style={{
            position: 'absolute',
            bottom: '4px',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
            92%
          </span>
          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Efficient
          </span>
        </div>
      </div>

      {/* You are saving subtext */}
      <div style={{ width: '100%', marginTop: '8px' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'left', marginBottom: '6px' }}>
          You are saving
        </div>

        {/* 2 Savings Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              padding: '8px 10px',
            }}
          >
            <Clock size={18} color="#059669" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                1h 25m
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Time
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              padding: '8px 10px',
            }}
          >
            <Fuel size={18} color="#059669" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                ₹ 1,320
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Fuel Cost
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
