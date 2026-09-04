import React, { useState } from 'react';
import { AdminLeafletMap } from '@/components/admin/maps/AdminLeafletMap';

export const RoutePlannerMap = () => {
  const waypoints = [
    { id: 'S', name: 'Start: Guwahati', label: 'S', subtext: 'Guwahati', pos: [26.1445, 91.7362], color: '#059669', type: 'stop' },
    { id: '1', name: 'Stop 1: Tezpur', label: '1', subtext: 'Tezpur', pos: [26.6528, 92.7926], color: '#2563EB', type: 'stop' },
    { id: '2', name: 'Stop 2: Nagaon', label: '2', subtext: 'Nagaon', pos: [26.3452, 92.6841], color: '#7C3AED', type: 'stop' },
    { id: '3', name: 'Stop 3: Hojai', label: '3', subtext: 'Hojai', pos: [26.0020, 92.8620], color: '#EA580C', type: 'stop' },
    { id: '4', name: 'Stop 4: Shillong', label: '4', subtext: 'Shillong', pos: [25.5788, 91.8933], color: '#DC2626', type: 'stop' },
    { id: '5', name: 'Stop 5: Dimapur', label: '5', subtext: 'Dimapur', pos: [25.9090, 93.7266], color: '#059669', type: 'stop' },
    { id: '6', name: 'Stop 6: Jorhat', label: '6', subtext: 'Jorhat', pos: [26.7509, 94.2037], color: '#2563EB', type: 'stop' },
  ];

  // Route sequence segments
  const routes = [
    {
      id: 'seg-1',
      coordinates: [
        [26.1445, 91.7362], // Guwahati
        [26.42, 92.25],
        [26.6528, 92.7926], // Tezpur
      ],
      color: '#2563EB',
      weight: 4,
      name: 'Leg 1: Guwahati → Tezpur (112 km)',
    },
    {
      id: 'seg-2',
      coordinates: [
        [26.6528, 92.7926], // Tezpur
        [26.50, 92.75],
        [26.3452, 92.6841], // Nagaon
      ],
      color: '#7C3AED',
      weight: 4,
      name: 'Leg 2: Tezpur → Nagaon (58 km)',
    },
    {
      id: 'seg-3',
      coordinates: [
        [26.3452, 92.6841], // Nagaon
        [26.15, 92.78],
        [26.0020, 92.8620], // Hojai
      ],
      color: '#EA580C',
      weight: 4,
      name: 'Leg 3: Nagaon → Hojai (44 km)',
    },
    {
      id: 'seg-4',
      coordinates: [
        [26.0020, 92.8620], // Hojai
        [25.85, 92.35],
        [25.5788, 91.8933], // Shillong
      ],
      color: '#DC2626',
      weight: 4,
      dashArray: '6, 4',
      name: 'Leg 4: Hojai → Shillong (108 km - Mountain Ghat)',
    },
    {
      id: 'seg-5',
      coordinates: [
        [26.3452, 92.6841], // Nagaon
        [26.10, 93.20],
        [25.9090, 93.7266], // Dimapur
      ],
      color: '#10B981',
      weight: 4,
      name: 'Leg 5: Alternate Nagaon → Dimapur (124 km)',
    },
  ];

  const markers = waypoints.map((w) => ({
    id: w.id,
    position: w.pos,
    iconType: 'stop',
    label: w.label,
    subtext: w.subtext,
    color: w.color,
    popupContent: (
      <div style={{ padding: '2px 4px' }}>
        <strong style={{ color: '#0F172A', display: 'block' }}>{w.name}</strong>
        <span style={{ fontSize: '11px', color: '#64748B' }}>Waypoint ID: {w.id}</span>
      </div>
    ),
  }));

  return (
    <div className="card route-map-card" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
      <div
        className="map-container"
        style={{
          height: '460px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AdminLeafletMap
          center={[26.25, 92.85]}
          zoom={8.2}
          minZoom={6}
          maxZoom={15}
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

export default RoutePlannerMap;
