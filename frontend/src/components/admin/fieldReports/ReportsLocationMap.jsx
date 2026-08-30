import React from 'react';
import { Plus, Minus, ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const ReportsLocationMap = () => {
  const { setCurrentPage } = useApp();

  const clusters = [
    { name: 'Tezpur', count: 8, x: 55, y: 35, color: '#EF4444' },
    { name: 'Guwahati', count: 12, x: 26, y: 55, color: '#10B981' },
    { name: 'Nagaon', count: 5, x: 62, y: 48, color: '#F59E0B' },
    { name: 'Hojai', count: 4, x: 54, y: 68, color: '#8B5CF6' },
    { name: 'Diphu', count: 3, x: 74, y: 76, color: '#3B82F6' },
  ];

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header" style={{ marginBottom: '10px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Reports by Location</h2>
        <button className="card-link" onClick={() => setCurrentPage('live-map')}>
          <span>View Full Map</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div
        className="map-container"
        style={{
          flex: 1,
          minHeight: '220px',
          backgroundImage: `url('/assets/maps/northeast_satellite.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.45)' }} />

        {/* Dynamic Road lines */}
        <svg
          viewBox="0 0 100 100"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <path d="M 26 55 L 55 35 L 62 48 L 54 68 L 74 76" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        </svg>

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
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: c.color,
                color: '#ffffff',
                border: '2px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 800,
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              {c.count}
            </div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#ffffff',
                textShadow: '0 1px 2px #000',
                marginTop: 2,
              }}
            >
              {c.name}
            </span>
          </div>
        ))}

        {/* Controls */}
        <div className="map-controls-group">
          <button className="map-btn" title="Zoom In"><Plus size={14} /></button>
          <button className="map-btn" title="Zoom Out"><Minus size={14} /></button>
        </div>
      </div>
    </div>
  );
};
