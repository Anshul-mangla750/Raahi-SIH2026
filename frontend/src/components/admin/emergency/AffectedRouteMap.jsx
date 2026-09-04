import React from 'react';
import { AdminLeafletMap, createCustomMarkerIcon } from '@/components/admin/maps/AdminLeafletMap';

export const AffectedRouteMap = () => {
  // Real coordinates from Guwahati to Tezpur along NH-27
  const guwahatiPos = [26.1445, 91.7362];
  const tezpurPos = [26.6528, 92.7926];
  const floodPos = [26.608, 92.853]; // Kolia Bhomora Bridge section

  // Route 1: Normal segment from Guwahati to Nagaon Bypass junction
  const normalRoute1 = [
    [26.1445, 91.7362],
    [26.18, 91.95],
    [26.22, 92.20],
    [26.3452, 92.6841],
  ];

  // Route 2: Red Affected Flood Zone across Kolia Bhomora Bridge corridor
  const floodAffectedRoute = [
    [26.3452, 92.6841],
    [26.48, 92.78],
    [26.608, 92.853], // Bridge
    [26.63, 92.83],
  ];

  // Route 3: Final approach into Tezpur Hub
  const normalRoute2 = [
    [26.63, 92.83],
    [26.6528, 92.7926],
  ];

  const markers = [
    {
      id: 'gw-pin',
      position: guwahatiPos,
      label: 'Guwahati',
      color: '#10B981',
      popupContent: (
        <div style={{ padding: '2px 4px' }}>
          <strong style={{ color: '#0F172A', display: 'block' }}>Guwahati Transit Hub</strong>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Origin Point • Route NH-27</span>
        </div>
      ),
    },
    {
      id: 'tz-pin',
      position: tezpurPos,
      label: 'Tezpur',
      color: '#10B981',
      popupContent: (
        <div style={{ padding: '2px 4px' }}>
          <strong style={{ color: '#0F172A', display: 'block' }}>Tezpur Regional Terminal</strong>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Destination Point</span>
        </div>
      ),
    },
    {
      id: 'flood-marker',
      position: floodPos,
      iconType: 'flood',
      color: '#DC2626',
      size: 36,
      popupContent: (
        <div style={{ minWidth: '180px', padding: '4px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#DC2626', marginBottom: '2px' }}>
            Flood Incident (Active)
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>
            Near Kolia Bhomora Bridge, Assam
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px', lineHeight: 1.35 }}>
            Heavy rainfall has caused severe waterlogging and structural hazard on the road surface.
          </div>
        </div>
      ),
    },
  ];

  const routes = [
    {
      id: 'nh27-clear-1',
      coordinates: normalRoute1,
      color: '#10B981',
      weight: 4.5,
      name: 'NH-27 Guwahati Segment (Operational)',
    },
    {
      id: 'nh27-flood-blocked',
      coordinates: floodAffectedRoute,
      color: '#EF4444',
      weight: 5,
      name: 'NH-27 Bridge Section (BLOCKED - FLOOD HAZARD)',
    },
    {
      id: 'nh27-clear-2',
      coordinates: normalRoute2,
      color: '#10B981',
      weight: 4.5,
      name: 'NH-27 Tezpur Approach (Operational)',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      <h2
        style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: 700,
          color: '#0F172A',
        }}
      >
        Affected Route
      </h2>

      <div
        className="card"
        style={{
          height: '350px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <AdminLeafletMap
          center={[26.42, 92.35]}
          zoom={9}
          minZoom={8}
          maxZoom={14}
          height="100%"
          tileProvider="carto"
          markers={markers}
          routes={routes}
        />
      </div>
    </div>
  );
};
