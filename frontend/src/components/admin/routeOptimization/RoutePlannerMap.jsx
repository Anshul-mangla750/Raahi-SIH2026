import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  Plus,
  Minus,
  Navigation,
  Sparkles,
  RefreshCw,
  X,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const RoutePlannerMap = () => {
  const { addToast } = useApp();
  const [fromLocation, setFromLocation] = useState('Guwahati, Assam');
  const [vehicleType, setVehicleType] = useState('Medium Truck');
  const [destinationCount, setDestinationCount] = useState(6);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const waypoints = [
    { id: 'S', name: 'Start: Guwahati', x: 22, y: 32, type: 'start' },
    { id: '1', name: 'Jorhat', x: 65, y: 22, type: 'stop' },
    { id: '2', name: 'Nagaon', x: 49, y: 38, type: 'stop' },
    { id: '3', name: 'Hojai', x: 43, y: 48, type: 'stop' },
    { id: '4', name: 'Shillong', x: 31, y: 49, type: 'stop' },
    { id: '5', name: 'Dimapur', x: 60, y: 38, type: 'stop' },
    { id: '6', name: 'Tezpur', x: 44, y: 25, type: 'stop' },
  ];

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      addToast('Route Re-Calculated', 'Optimized multi-stop circuit: 468 km (saves 1h 25m).', 'success');
    }, 600);
  };

  const handleClear = () => {
    setFromLocation('Guwahati, Assam');
    setDestinationCount(6);
    addToast('Reset', 'Route parameters cleared.', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Route Query Parameter Bar */}
      <div className="route-query-bar">
        <div className="query-field-group">
          <label className="query-field-label">From</label>
          <div className="query-input-wrap">
            <MapPin size={16} color="#059669" />
            <input
              type="text"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              placeholder="Origin address..."
            />
            {fromLocation && (
              <button onClick={() => setFromLocation('')} style={{ color: 'var(--text-muted)' }}>
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        <div className="query-field-group">
          <label className="query-field-label">To / Destination(s)</label>
          <div className="query-input-wrap">
            <MapPin size={16} color="#3B82F6" />
            <select
              value={destinationCount}
              onChange={(e) => setDestinationCount(Number(e.target.value))}
              style={{ cursor: 'pointer' }}
            >
              <option value={6}>6 Destinations Selected (Circuit)</option>
              <option value={4}>4 Destinations Selected (Express)</option>
              <option value={8}>8 Destinations Selected (Regional)</option>
            </select>
          </div>
        </div>

        <div className="query-field-group">
          <label className="query-field-label">Vehicle Type</label>
          <div className="query-input-wrap">
            <Truck size={16} color="#D97706" />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              <option value="Medium Truck">Medium Truck (10T)</option>
              <option value="Heavy Trailer">Heavy Trailer (25T)</option>
              <option value="Light Cargo">Light Cargo Van (3T)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <button
            className="btn btn-primary"
            onClick={handleOptimize}
            disabled={isOptimizing}
          >
            {isOptimizing ? <RefreshCw size={14} className="spin" /> : <Sparkles size={14} />}
            <span>Optimize Route</span>
          </button>
          <button className="btn btn-outline" onClick={handleClear}>
            Clear All
          </button>
        </div>
      </div>

      {/* Interactive Optimized Route Map */}
      <div className="card" style={{ padding: '16px', position: 'relative' }}>
        <div
          className="map-container"
          style={{
            height: '420px',
            backgroundImage: `url('/assets/maps/northeast_satellite.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          {/* Subtle Dark Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.4)',
              pointerEvents: 'none',
            }}
          />

          {/* Dynamic Colored Route Circuit Path */}
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
            {/* Start to Jorhat (Purple / Blue) */}
            <path
              d="M 22 32 Q 44 18 65 22"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 2"
            />
            {/* Jorhat to Nagaon */}
            <path
              d="M 65 22 Q 56 30 49 38"
              stroke="#8B5CF6"
              strokeWidth="2"
              fill="none"
            />
            {/* Nagaon to Hojai (Orange) */}
            <path
              d="M 49 38 L 43 48"
              stroke="#F97316"
              strokeWidth="2"
              fill="none"
            />
            {/* Hojai to Shillong (Red) */}
            <path
              d="M 43 48 Q 36 50 31 49"
              stroke="#EF4444"
              strokeWidth="2"
              fill="none"
            />
            {/* Shillong to Dimapur (Purple) */}
            <path
              d="M 31 49 Q 45 42 60 38"
              stroke="#8B5CF6"
              strokeWidth="2"
              fill="none"
            />
            {/* Dimapur to Tezpur (Green) */}
            <path
              d="M 60 38 Q 52 30 44 25"
              stroke="#10B981"
              strokeWidth="2"
              fill="none"
            />
            {/* Tezpur to End Guwahati (Green return) */}
            <path
              d="M 44 25 Q 33 26 22 32"
              stroke="#047857"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Regional Labels */}
          <div style={{ position: 'absolute', top: '24%', left: '30%', color: '#ffffff', fontSize: '13px', fontWeight: 800, textShadow: '0 1px 3px #000' }}>
            ASSAM
          </div>
          <div style={{ position: 'absolute', top: '42%', left: '20%', color: '#ffffff', fontSize: '12px', fontWeight: 800, textShadow: '0 1px 3px #000' }}>
            MEGHALAYA
          </div>

          {/* Sequenced Waypoint Nodes */}
          {waypoints.map((wp) => {
            const isStart = wp.id === 'S';

            return (
              <div
                key={wp.id}
                style={{
                  position: 'absolute',
                  top: `${wp.y}%`,
                  left: `${wp.x}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: 20,
                }}
                title={wp.name}
              >
                {isStart ? (
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: '#047857',
                      color: '#ffffff',
                      border: '2px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      boxShadow: '0 0 8px rgba(4, 120, 87, 0.8)',
                    }}
                  >
                    <MapPin size={14} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor:
                        wp.id === '1'
                          ? '#3B82F6'
                          : wp.id === '2'
                          ? '#8B5CF6'
                          : wp.id === '3'
                          ? '#F97316'
                          : wp.id === '4'
                          ? '#EF4444'
                          : wp.id === '5'
                          ? '#059669'
                          : '#047857',
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
                    {wp.id}
                  </div>
                )}

                {/* Subtitle location badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '26px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    color: '#ffffff',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '9px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {wp.name}
                </div>
              </div>
            );
          })}

          {/* Map Controls */}
          <div className="map-controls-group">
            <button className="map-btn" title="Zoom In"><Plus size={16} /></button>
            <button className="map-btn" title="Zoom Out"><Minus size={16} /></button>
            <button className="map-btn" title="Center"><Navigation size={15} /></button>
          </div>

          {/* Bottom Left Legend */}
          <div className="map-legend-card" style={{ flexDirection: 'row', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#047857' }} />
              <span>Start Point</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#3B82F6' }} />
              <span>Destination</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 16, height: 3, backgroundColor: '#3B82F6', borderRadius: 2 }} />
              <span>Route</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
