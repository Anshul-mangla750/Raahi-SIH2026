import React from 'react';
import { AdminLeafletMap } from '@/components/admin/maps/AdminLeafletMap';

export const ConnectivityMap = () => {
  // Tezpur (Sonitpur district) boundary polygon coordinates
  const tezpurDistrictPolygon = [
    [26.98, 92.50],
    [27.05, 92.82],
    [26.92, 93.25],
    [26.65, 93.22],
    [26.56, 92.95],
    [26.52, 92.65],
    [26.70, 92.42],
  ];

  // Route 1: NH-27 (Green, High Accessibility)
  const nh27Route = [
    [26.45, 92.45],
    [26.54, 92.60],
    [26.608, 92.853],
    [26.6528, 92.7926],
  ];

  // Route 2: NH-15 (Green, High Accessibility towards North Bank / Dibrugarh)
  const nh15Route = [
    [26.6528, 92.7926],
    [26.72, 92.98],
    [26.85, 93.35],
    [27.02, 93.80],
  ];

  // Route 3: NH-217 (Orange, Moderate Accessibility)
  const nh217Route = [
    [26.6528, 92.7926],
    [26.55, 93.05],
    [26.48, 93.35],
    [26.42, 93.60],
  ];

  // Route 4: SH-2 (Green, Good State Highway towards Bhalukpong)
  const sh2Route = [
    [26.6528, 92.7926],
    [26.78, 92.70],
    [26.92, 92.68],
    [27.01, 92.65],
  ];

  // Route 5: SH-16 (Red, Poor Accessibility towards Nameri)
  const sh16Route = [
    [26.6528, 92.7926],
    [26.75, 92.85],
    [26.86, 92.87],
    [26.93, 92.88],
  ];

  const routes = [
    { id: 'nh27', coordinates: nh27Route, color: '#10B981', weight: 4.5, name: 'NH-27 (Good • 95% Accessibility)' },
    { id: 'nh15', coordinates: nh15Route, color: '#10B981', weight: 4.5, name: 'NH-15 (Good • 90% Accessibility)' },
    { id: 'nh217', coordinates: nh217Route, color: '#F59E0B', weight: 4.5, name: 'NH-217 (Moderate • 60% Accessibility)' },
    { id: 'sh2', coordinates: sh2Route, color: '#10B981', weight: 4, name: 'SH-2 (Moderate • 55% Accessibility)' },
    { id: 'sh16', coordinates: sh16Route, color: '#EF4444', weight: 4, name: 'SH-16 (Poor • 20% Accessibility)' },
  ];

  const markers = [
    {
      id: 'tz-hub',
      position: [26.6528, 92.7926],
      label: 'Tezpur HQ',
      color: '#059669',
      popupContent: (
        <div style={{ padding: '2px 4px' }}>
          <strong style={{ color: '#0F172A', display: 'block' }}>Tezpur District HQ</strong>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Primary Regional Logistics Hub</span>
        </div>
      ),
    },
    {
      id: 'bhalukpong',
      position: [27.01, 92.65],
      label: 'Bhalukpong',
      color: '#10B981',
      popupContent: 'SH-2 Border Post • Accessible',
    },
    {
      id: 'nameri',
      position: [26.93, 92.88],
      label: 'Nameri',
      color: '#EF4444',
      popupContent: 'SH-16 Section • Restricted Access Due to Waterlogging',
    },
  ];

  const polygons = [
    {
      id: 'tezpur-dist',
      positions: tezpurDistrictPolygon,
      color: '#10B981',
      fillColor: '#10B981',
      fillOpacity: 0.07,
      weight: 2,
      dashArray: '5, 5',
      popup: 'Tezpur District Boundary (Area: 2,867 sq km)',
    },
  ];

  const legendOverlay = (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        border: '1px solid #E2E8F0',
        borderRadius: '6px',
        padding: '8px 12px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '18px', height: '3px', borderRadius: '2px', backgroundColor: '#10B981' }} />
        <span style={{ fontSize: '10.5px', color: '#475569', fontWeight: 600 }}>
          Good (High Accessibility)
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '18px', height: '3px', borderRadius: '2px', backgroundColor: '#F59E0B' }} />
        <span style={{ fontSize: '10.5px', color: '#475569', fontWeight: 600 }}>
          Moderate (Partial Access)
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '18px', height: '3px', borderRadius: '2px', backgroundColor: '#EF4444' }} />
        <span style={{ fontSize: '10.5px', color: '#475569', fontWeight: 600 }}>
          Poor (Not Accessible)
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="card"
      style={{
        height: '370px',
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
        center={[26.75, 92.85]}
        zoom={9.2}
        minZoom={8}
        maxZoom={15}
        height="100%"
        tileProvider="carto"
        polygons={polygons}
        routes={routes}
        markers={markers}
        legend={legendOverlay}
      />
    </div>
  );
};

export default ConnectivityMap;
