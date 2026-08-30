import React, { useState } from 'react';
import { Plus, Minus, Navigation, Layers, Truck } from 'lucide-react';
import { LIVE_VEHICLES_LIST } from '@/data/admin/mockData';

export const FleetTrackingMap = () => {
  const [mapType, setMapType] = useState('Map'); // 'Map' | 'Satellite'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Position coordinates on the map container
  const vehiclePins = [
    { ...LIVE_VEHICLES_LIST[0], x: 28, y: 35, speedVal: '45 km/h' },
    { ...LIVE_VEHICLES_LIST[1], x: 44, y: 25, speedVal: '60km/h' },
    { ...LIVE_VEHICLES_LIST[2], x: 44, y: 38, speedVal: '55 km/h' },
    { ...LIVE_VEHICLES_LIST[3], x: 50, y: 45, speedVal: '40 km/h' },
    { ...LIVE_VEHICLES_LIST[4], x: 28, y: 45, speedVal: '35 km/h' },
  ];

  return (
    <div className="card" style={{ padding: '16px', position: 'relative' }}>
      <div
        className="map-container"
        style={{
          height: '380px',
          backgroundImage:
            mapType === 'Satellite'
              ? `url('/assets/maps/northeast_satellite.jpg')`
              : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Map Type Switcher (Map / Satellite) in top-left */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            padding: '2px',
            zIndex: 10,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <button
            onClick={() => setMapType('Map')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: mapType === 'Map' ? 700 : 500,
              backgroundColor: mapType === 'Map' ? '#ffffff' : 'transparent',
              color: mapType === 'Map' ? '#0f172a' : '#64748b',
              borderRadius: '4px',
              boxShadow: mapType === 'Map' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            Map
          </button>
          <button
            onClick={() => setMapType('Satellite')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: mapType === 'Satellite' ? 700 : 500,
              backgroundColor: mapType === 'Satellite' ? '#ffffff' : 'transparent',
              color: mapType === 'Satellite' ? '#0f172a' : '#64748b',
              borderRadius: '4px',
              boxShadow: mapType === 'Satellite' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            Satellite
          </button>
        </div>

        {/* Dynamic Road Network overlay */}
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
          {/* Brahmaputra river curve */}
          <path
            d="M 10 38 Q 30 32 50 30 T 90 22"
            stroke="#93c5fd"
            strokeWidth="3"
            fill="none"
            opacity="0.7"
          />
          {/* Arterial Highways */}
          <path d="M 20 45 L 28 35 L 44 25 L 60 28" stroke="#3b82f6" strokeWidth="1.2" fill="none" />
          <path d="M 28 35 L 44 38 L 50 45 L 70 50" stroke="#10b981" strokeWidth="1.2" fill="none" />
          <path d="M 28 45 L 35 55 L 45 65" stroke="#f97316" strokeWidth="1.2" fill="none" />
        </svg>

        {/* Place Labels on Map */}
        <div style={{ position: 'absolute', top: '38%', left: '19%', color: '#334155', fontSize: '11px', fontWeight: 700 }}>
          Guwahati
        </div>
        <div style={{ position: 'absolute', top: '27%', left: '44%', color: '#334155', fontSize: '11px', fontWeight: 700 }}>
          Tezpur
        </div>
        <div style={{ position: 'absolute', top: '40%', left: '38%', color: '#334155', fontSize: '11px', fontWeight: 700 }}>
          Nagaon
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '44%', color: '#334155', fontSize: '11px', fontWeight: 700 }}>
          Hojai
        </div>
        <div style={{ position: 'absolute', top: '28%', left: '55%', color: '#334155', fontSize: '11px', fontWeight: 700 }}>
          Mangaldoi
        </div>

        {/* Vehicle Callout Markers */}
        {vehiclePins.map((veh, i) => {
          const isMoving = veh.status === 'Moving';
          const isDelayed = veh.status === 'Delayed';
          const isStopped = veh.status === 'Stopped';

          const bgColor = isMoving ? '#047857' : isDelayed ? '#d97706' : isStopped ? '#dc2626' : '#2563eb';

          return (
            <div
              key={i}
              onClick={() => setSelectedVehicle(selectedVehicle?.id === veh.id ? null : veh)}
              style={{
                position: 'absolute',
                top: `${veh.y}%`,
                left: `${veh.x}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: 15,
              }}
            >
              {/* Callout Bubble */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: `1.5px solid ${bgColor}`,
                  borderRadius: '6px',
                  padding: '4px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  whiteSpace: 'nowrap',
                }}
              >
                <div
                  style={{
                    backgroundColor: bgColor,
                    color: '#ffffff',
                    padding: '3px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Truck size={12} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a' }}>{veh.id}</span>
                  <span style={{ fontSize: '9px', color: '#64748b' }}>{veh.speedVal}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Controls */}
        <div className="map-controls-group">
          <button className="map-btn" onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))} title="Zoom In">
            <Plus size={16} />
          </button>
          <button className="map-btn" onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))} title="Zoom Out">
            <Minus size={16} />
          </button>
          <button className="map-btn" onClick={() => setZoomLevel(1)} title="Center">
            <Navigation size={15} />
          </button>
        </div>

        {/* Bottom Legend */}
        <div
          className="map-legend-card"
          style={{
            flexDirection: 'row',
            gap: '12px',
            padding: '6px 12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }} />
            <span>Moving</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3B82F6' }} />
            <span>Idle</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444' }} />
            <span>Stopped</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
            <span>Delayed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#94A3B8' }} />
            <span>Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
};
