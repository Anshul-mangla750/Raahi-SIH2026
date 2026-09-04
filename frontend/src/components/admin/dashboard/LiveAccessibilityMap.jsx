import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { AdminLeafletMap } from '@/components/admin/maps/AdminLeafletMap';

export const LiveAccessibilityMap = ({ isFullScreen = false }) => {
  const { setCurrentPage } = useApp();
  const [selectedPin, setSelectedPin] = useState(null);

  const waypoints = [
    { id: 'gw', name: 'Guwahati (Hub)', state: 'Assam', pos: [26.1445, 91.7362], status: 'good', vehicles: 4 },
    { id: 'sh', name: 'Shillong', state: 'Meghalaya', pos: [25.5788, 91.8933], status: 'good', vehicles: 2 },
    { id: 'ng', name: 'Nagaon', state: 'Assam', pos: [26.3452, 92.6841], status: 'good', vehicles: 3 },
    { id: 'tz', name: 'Tezpur', state: 'Assam', pos: [26.6528, 92.7926], status: 'moderate', vehicles: 2 },
    { id: 'jh', name: 'Jorhat', state: 'Assam', pos: [26.7509, 94.2037], status: 'blocked', alert: 'Landslide on NH-13', vehicles: 1 },
    { id: 'dm', name: 'Dimapur', state: 'Nagaland', pos: [25.9090, 93.7266], status: 'moderate', vehicles: 3 },
    { id: 'kh', name: 'Kohima', state: 'Nagaland', pos: [25.6751, 94.1086], status: 'at-risk', alert: 'Heavy rain warning', vehicles: 1 },
    { id: 'im', name: 'Imphal', state: 'Manipur', pos: [24.8170, 93.9368], status: 'good', vehicles: 2 },
    { id: 'az', name: 'Aizawl', state: 'Mizoram', pos: [23.7271, 92.7176], status: 'at-risk', alert: 'Mudslide risk', vehicles: 1 },
    { id: 'ag', name: 'Agartala', state: 'Tripura', pos: [23.8315, 91.2868], status: 'good', vehicles: 2 },
    { id: 'it', name: 'Itanagar', state: 'Arunachal Pradesh', pos: [27.0844, 93.6053], status: 'good', vehicles: 2 },
  ];

  const routes = [
    // Guwahati to Nagaon
    { id: 'r1', coordinates: [[26.1445, 91.7362], [26.3452, 92.6841]], color: '#10B981', weight: 3.5 },
    // Nagaon to Tezpur
    { id: 'r2', coordinates: [[26.3452, 92.6841], [26.6528, 92.7926]], color: '#10B981', weight: 3.5 },
    // Tezpur to Itanagar
    { id: 'r3', coordinates: [[26.6528, 92.7926], [27.0844, 93.6053]], color: '#10B981', weight: 3.5 },
    // Nagaon to Jorhat
    { id: 'r4', coordinates: [[26.3452, 92.6841], [26.7509, 94.2037]], color: '#F59E0B', weight: 3.5 },
    // Jorhat NH-13 Blocked
    { id: 'r5', coordinates: [[26.7509, 94.2037], [27.15, 94.65]], color: '#EF4444', weight: 4, dashArray: '5, 5' },
    // Nagaon to Dimapur
    { id: 'r6', coordinates: [[26.3452, 92.6841], [25.9090, 93.7266]], color: '#F59E0B', weight: 3.5 },
    // Dimapur to Kohima
    { id: 'r7', coordinates: [[25.9090, 93.7266], [25.6751, 94.1086]], color: '#F97316', weight: 3.5 },
    // Guwahati to Shillong
    { id: 'r8', coordinates: [[26.1445, 91.7362], [25.5788, 91.8933]], color: '#10B981', weight: 3.5 },
    // Shillong to Silchar to Imphal
    { id: 'r9', coordinates: [[25.5788, 91.8933], [24.8333, 92.7789], [24.8170, 93.9368]], color: '#10B981', weight: 3.5 },
  ];

  const markers = waypoints.map((w) => {
    const color =
      w.status === 'good'
        ? '#10B981'
        : w.status === 'moderate'
        ? '#F59E0B'
        : w.status === 'at-risk'
        ? '#F97316'
        : '#EF4444';

    return {
      id: w.id,
      position: w.pos,
      label: w.name,
      color: color,
      onClick: () => setSelectedPin(w),
      popupContent: (
        <div style={{ minWidth: '150px', padding: '2px 4px' }}>
          <strong style={{ color: '#0F172A', display: 'block', fontSize: '13px' }}>
            {w.name}
          </strong>
          <span style={{ fontSize: '11px', color: '#64748B' }}>State: {w.state}</span>
          <div style={{ fontSize: '11px', color: '#334155', marginTop: '3px' }}>
            Status: <strong style={{ color }}>{w.status.toUpperCase()}</strong>
          </div>
          {w.alert && (
            <div style={{ fontSize: '10.5px', color: '#DC2626', fontWeight: 600, marginTop: '2px' }}>
              ⚠️ {w.alert}
            </div>
          )}
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
            Active Vehicles: <strong>{w.vehicles}</strong>
          </div>
        </div>
      ),
    };
  });

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
            Real-time Telemetry
          </span>
        </div>

        <button
          className="btn btn-outline btn-sm"
          onClick={() => setCurrentPage('live-map')}
          style={{ fontSize: '12px', padding: '4px 10px' }}
        >
          Open Live Cockpit ↗
        </button>
      </div>

      {/* Real Leaflet Map Viewport */}
      <div
        className="map-viewport"
        style={{
          height: isFullScreen ? 'calc(100vh - 200px)' : '420px',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <AdminLeafletMap
          center={[25.85, 93.00]}
          zoom={7.2}
          minZoom={6}
          maxZoom={14}
          height="100%"
          tileProvider="carto"
          markers={markers}
          routes={routes}
          showTileSwitch={true}
        />
      </div>
    </div>
  );
};

export default LiveAccessibilityMap;
