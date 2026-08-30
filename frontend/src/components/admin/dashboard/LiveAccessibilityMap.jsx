import React, { useState } from 'react';
import {
  Maximize2,
  Plus,
  Minus,
  Navigation,
  Layers,
  Truck,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const LiveAccessibilityMap = ({ isFullScreen = false }) => {
  const { setCurrentPage } = useApp();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPin, setSelectedPin] = useState(null);
  const [activeLayer, setActiveLayer] = useState('terrain'); // 'terrain' | 'satellite' | 'routes'

  const waypoints = [
    { id: 'gw', name: 'Guwahati (Hub)', state: 'Assam', x: 26, y: 55, status: 'good', vehicles: 4 },
    { id: 'sh', name: 'Shillong', state: 'Meghalaya', x: 28, y: 70, status: 'good', vehicles: 2 },
    { id: 'ng', name: 'Nagaon', state: 'Assam', x: 42, y: 48, status: 'good', vehicles: 3 },
    { id: 'tz', name: 'Tezpur', state: 'Assam', x: 44, y: 38, status: 'moderate', vehicles: 2 },
    { id: 'jh', name: 'Jorhat', state: 'Assam', x: 60, y: 32, status: 'blocked', alert: 'Landslide on NH-13', vehicles: 1 },
    { id: 'dm', name: 'Dimapur', state: 'Nagaland', x: 68, y: 45, status: 'moderate', vehicles: 3 },
    { id: 'kh', name: 'Kohima', state: 'Nagaland', x: 74, y: 54, status: 'at-risk', alert: 'Heavy rain warning', vehicles: 1 },
    { id: 'im', name: 'Imphal', state: 'Manipur', x: 72, y: 68, status: 'good', vehicles: 2 },
    { id: 'az', name: 'Aizawl', state: 'Mizoram', x: 50, y: 82, status: 'at-risk', alert: 'Mudslide risk', vehicles: 1 },
    { id: 'ag', name: 'Agartala', state: 'Tripura', x: 32, y: 84, status: 'good', vehicles: 2 },
    { id: 'it', name: 'Itanagar', state: 'Arunachal Pradesh', x: 56, y: 18, status: 'good', vehicles: 2 },
  ];

  return (
    <div className="card" style={{ padding: '16px', position: 'relative' }}>
      {/* Card Header */}
      <div className="card-header" style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 className="card-title" style={{ margin: 0 }}>Live Accessibility Map</h2>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '11px',
              color: '#059669',
              backgroundColor: '#ecfdf5',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.4)',
              }}
            />
            Real-time
          </span>
        </div>

        <button
          className="btn btn-outline"
          style={{ padding: '4px 10px', fontSize: '11px', gap: '4px' }}
          onClick={() => setCurrentPage('live-map')}
        >
          <span>View Full Map</span>
          <Maximize2 size={12} />
        </button>
      </div>

      {/* Map Canvas Frame */}
      <div
        className="map-container"
        style={{
          height: isFullScreen ? 'calc(100vh - 200px)' : '340px',
          backgroundImage: `url('/assets/maps/northeast_satellite.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Dark overlay for map clarity and high-contrast routes */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            pointerEvents: 'none',
          }}
        />

        {/* Dynamic Route SVG Overlay */}
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
          {/* Main Road Arteries across Northeast */}
          {/* Guwahati to Nagaon (Good - Green) */}
          <path d="M 26 55 Q 34 50 42 48" stroke="#10B981" strokeWidth="1.2" fill="none" strokeDasharray="none" />
          
          {/* Nagaon to Tezpur (Good - Green) */}
          <path d="M 42 48 Q 43 43 44 38" stroke="#10B981" strokeWidth="1.2" fill="none" />
          
          {/* Tezpur to Itanagar (Good - Green) */}
          <path d="M 44 38 Q 50 28 56 18" stroke="#10B981" strokeWidth="1.2" fill="none" />
          
          {/* Nagaon to Jorhat (Moderate - Amber) */}
          <path d="M 42 48 Q 51 40 60 32" stroke="#F59E0B" strokeWidth="1.2" fill="none" />
          
          {/* Jorhat NH-13 (Blocked - Red) */}
          <path d="M 60 32 Q 64 30 68 28" stroke="#EF4444" strokeWidth="1.5" fill="none" strokeDasharray="1.5 1.5" />
          
          {/* Nagaon to Dimapur (Moderate - Amber) */}
          <path d="M 42 48 Q 55 46 68 45" stroke="#F59E0B" strokeWidth="1.2" fill="none" />
          
          {/* Dimapur to Kohima (At Risk - Orange) */}
          <path d="M 68 45 Q 71 50 74 54" stroke="#F97316" strokeWidth="1.2" fill="none" />
          
          {/* Kohima to Imphal (Good - Green) */}
          <path d="M 74 54 Q 73 61 72 68" stroke="#10B981" strokeWidth="1.2" fill="none" />
          
          {/* Guwahati to Shillong (Good - Green) */}
          <path d="M 26 55 Q 27 62 28 70" stroke="#10B981" strokeWidth="1.2" fill="none" />
          
          {/* Shillong to Agartala (Good - Green) */}
          <path d="M 28 70 Q 30 77 32 84" stroke="#10B981" strokeWidth="1.2" fill="none" />
          
          {/* Shillong to Aizawl (At Risk - Orange) */}
          <path d="M 28 70 Q 39 76 50 82" stroke="#F97316" strokeWidth="1.2" fill="none" />
        </svg>

        {/* Region Labels */}
        <div style={{ position: 'absolute', top: '15%', left: '46%', color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 600, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>
          Arunachal Pradesh
        </div>
        <div style={{ position: 'absolute', top: '44%', left: '32%', color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: 700, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>
          Assam
        </div>
        <div style={{ position: 'absolute', top: '65%', left: '22%', color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 600, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>
          Meghalaya
        </div>
        <div style={{ position: 'absolute', top: '48%', left: '76%', color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 600, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>
          Nagaland
        </div>
        <div style={{ position: 'absolute', top: '67%', left: '76%', color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 600, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>
          Manipur
        </div>
        <div style={{ position: 'absolute', top: '80%', left: '54%', color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 600, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>
          Mizoram
        </div>
        <div style={{ position: 'absolute', top: '82%', left: '24%', color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 600, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>
          Tripura
        </div>

        {/* Interactive Waypoint & Hazard Markers */}
        {waypoints.map((wp) => {
          const isBlocked = wp.status === 'blocked';
          const isAtRisk = wp.status === 'at-risk';
          const isModerate = wp.status === 'moderate';

          return (
            <div
              key={wp.id}
              onClick={() => setSelectedPin(selectedPin?.id === wp.id ? null : wp)}
              style={{
                position: 'absolute',
                top: `${wp.y}%`,
                left: `${wp.x}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: 5,
              }}
              title={`${wp.name} - ${wp.status.toUpperCase()}`}
            >
              {isBlocked ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#EF4444',
                    border: '2px solid #FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  ✕
                </div>
              ) : isAtRisk ? (
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#F97316',
                    border: '2px solid #FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)',
                  }}
                >
                  <span style={{ fontSize: '9px', color: '#fff', fontWeight: 'bold' }}>!</span>
                </div>
              ) : isModerate ? (
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#F59E0B',
                    border: '2px solid #FFFFFF',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    border: '2px solid #FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '8px', color: '#fff' }}>✓</span>
                </div>
              )}

              {/* Pin Tooltip Popup */}
              {selectedPin?.id === wp.id && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '26px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#1E293B',
                    color: '#FFFFFF',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    width: '170px',
                    zIndex: 20,
                    fontSize: '11px',
                  }}
                >
                  <div style={{ fontWeight: 'bold', color: '#6EE7B7', fontSize: '12px' }}>
                    {wp.name}
                  </div>
                  <div style={{ color: '#94A3B8', marginTop: 2 }}>Status: <strong style={{ color: '#fff' }}>{wp.status}</strong></div>
                  <div style={{ color: '#94A3B8' }}>Active Fleet: {wp.vehicles} trucks</div>
                  {wp.alert && <div style={{ color: '#FCA5A5', marginTop: 4, fontWeight: 500 }}>⚠️ {wp.alert}</div>}
                </div>
              )}
            </div>
          );
        })}

        {/* Live Moving Vehicle Markers */}
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '34%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#3B82F6',
            color: '#FFFFFF',
            padding: '3px 6px',
            borderRadius: '4px',
            border: '1px solid #FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '10px',
            fontWeight: 600,
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          <Truck size={12} />
          <span>AS-01</span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '58%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#3B82F6',
            color: '#FFFFFF',
            padding: '3px 6px',
            borderRadius: '4px',
            border: '1px solid #FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '10px',
            fontWeight: 600,
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          <Truck size={12} />
          <span>NL-01</span>
        </div>

        {/* Map Legend Overlay */}
        <div className="map-legend-card">
          <div className="map-legend-row">
            <span className="map-legend-line" style={{ backgroundColor: '#10B981' }} />
            <span>Good</span>
          </div>
          <div className="map-legend-row">
            <span className="map-legend-line" style={{ backgroundColor: '#F59E0B' }} />
            <span>Moderate</span>
          </div>
          <div className="map-legend-row">
            <span className="map-legend-line" style={{ backgroundColor: '#F97316' }} />
            <span>At Risk</span>
          </div>
          <div className="map-legend-row">
            <span className="map-legend-line" style={{ backgroundColor: '#EF4444' }} />
            <span>Blocked</span>
          </div>
          <div className="map-legend-row" style={{ marginTop: '2px' }}>
            <Truck size={12} color="#3B82F6" />
            <span>Vehicle</span>
          </div>
        </div>

        {/* Map Controls */}
        <div className="map-controls-group">
          <button className="map-btn" onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))} title="Zoom In">
            <Plus size={16} />
          </button>
          <button className="map-btn" onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))} title="Zoom Out">
            <Minus size={16} />
          </button>
          <button className="map-btn" onClick={() => { setSelectedPin(null); setZoomLevel(1); }} title="Center Map">
            <Navigation size={15} />
          </button>
          <button className="map-btn" onClick={() => setActiveLayer(activeLayer === 'terrain' ? 'satellite' : 'terrain')} title="Switch Map Layer">
            <Layers size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
