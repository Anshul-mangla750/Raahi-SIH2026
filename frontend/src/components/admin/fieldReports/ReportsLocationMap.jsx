import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const ReportsLocationMap = () => {
  const { setCurrentPage } = useApp();
  const [zoom, setZoom] = useState(1);

  const clusters = [
    { name: 'Tezpur', count: 8, x: 58, y: 28, color: '#DC2626' },
    { name: 'Guwahati', count: 12, x: 26, y: 56, color: '#059669' },
    { name: 'Nagaon', count: 5, x: 65, y: 46, color: '#F97316' },
    { name: 'Hojai', count: 4, x: 56, y: 68, color: '#7C3AED' },
    { name: 'Diphu', count: 3, x: 78, y: 74, color: '#2563EB' },
  ];

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
          marginBottom: '10px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Reports by Location
        </h2>
        <button
          onClick={() => setCurrentPage('live-map')}
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
          View Full Map
        </button>
      </div>

      {/* Light Map Container */}
      <div
        className="map-container"
        style={{
          height: '210px',
          width: '100%',
          backgroundImage: `url('/northeast-atlas-map.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          borderRadius: '6px',
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
        }}
      >
        {/* Subtle Light Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            pointerEvents: 'none',
          }}
        />

        {/* Dynamic Road and Highway Lines */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {/* Brahmaputra river bend */}
          <path
            d="M 10 48 Q 30 42 55 35 T 90 25"
            stroke="#93C5FD"
            strokeWidth="3.5"
            fill="none"
            opacity="0.6"
          />
          {/* Highway Network */}
          <path
            d="M 26 56 L 45 42 L 58 28 L 75 32"
            stroke="#3B82F6"
            strokeWidth="1.5"
            fill="none"
            opacity="0.75"
          />
          <path
            d="M 26 56 L 48 52 L 65 46 L 78 74"
            stroke="#10B981"
            strokeWidth="1.5"
            fill="none"
            opacity="0.75"
          />
          <path
            d="M 65 46 L 56 68 L 78 74"
            stroke="#F97316"
            strokeWidth="1.5"
            fill="none"
            opacity="0.75"
          />
        </svg>

        {/* Highway Badges */}
        <div
          style={{
            position: 'absolute',
            top: '36%',
            left: '38%',
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#1E40AF',
            fontSize: '8px',
            fontWeight: 700,
            padding: '1px 3px',
            borderRadius: '2px',
            border: '1px solid #BFDBFE',
            pointerEvents: 'none',
          }}
        >
          NH-31
        </div>
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '52%',
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#065F46',
            fontSize: '8px',
            fontWeight: 700,
            padding: '1px 3px',
            borderRadius: '2px',
            border: '1px solid #A7F3D0',
            pointerEvents: 'none',
          }}
        >
          NH-37
        </div>

        {/* Location Cluster Badges */}
        {clusters.map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${c.y}%`,
              left: `${c.x}%`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: c.color,
                color: '#ffffff',
                border: '2px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10.5px',
                fontWeight: 800,
                boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              }}
            >
              {c.count}
            </div>
            <span
              style={{
                fontSize: '9.5px',
                fontWeight: 700,
                color: '#1E293B',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                padding: '1px 4px',
                borderRadius: '3px',
                marginTop: '2px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap',
              }}
            >
              {c.name}
            </span>
          </div>
        ))}

        {/* Zoom Controls */}
        <div
          style={{
            position: 'absolute',
            right: '8px',
            bottom: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            zIndex: 15,
          }}
        >
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#ffffff',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#334155',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Plus size={13} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#ffffff',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#334155',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Minus size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
