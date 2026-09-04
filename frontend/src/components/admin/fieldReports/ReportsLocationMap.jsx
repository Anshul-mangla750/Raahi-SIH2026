import React from 'react';
import { AdminLeafletMap } from '@/components/admin/maps/AdminLeafletMap';
import { useApp } from '@/contexts/AppContext';

export const ReportsLocationMap = () => {
  const { setCurrentPage } = useApp();

  const clusters = [
    { name: 'Tezpur', count: 8, pos: [26.6528, 92.7926], color: '#DC2626' },
    { name: 'Guwahati', count: 12, pos: [26.1445, 91.7362], color: '#059669' },
    { name: 'Nagaon', count: 5, pos: [26.3452, 92.6841], color: '#F97316' },
    { name: 'Hojai', count: 4, pos: [26.0020, 92.8620], color: '#7C3AED' },
    { name: 'Diphu', count: 3, pos: [25.8450, 93.4300], color: '#2563EB' },
  ];

  const routes = [
    {
      id: 'r1',
      coordinates: [
        [26.1445, 91.7362],
        [26.3452, 92.6841],
        [26.6528, 92.7926],
      ],
      color: '#3B82F6',
      weight: 3.5,
    },
    {
      id: 'r2',
      coordinates: [
        [26.3452, 92.6841],
        [26.0020, 92.8620],
        [25.8450, 93.4300],
      ],
      color: '#F97316',
      weight: 3.5,
    },
  ];

  const markers = clusters.map((c) => ({
    id: c.name,
    position: c.pos,
    iconType: 'cluster',
    label: `${c.count}`,
    subtext: c.name,
    color: c.color,
    size: 26,
    popupContent: (
      <div style={{ minWidth: '150px', padding: '2px 4px' }}>
        <strong style={{ color: '#0F172A', display: 'block', fontSize: '13px' }}>
          {c.name} Incident Cluster
        </strong>
        <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '2px' }}>
          <strong>{c.count} Active Reports</strong> recorded in this vicinity.
        </div>
      </div>
    ),
  }));

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

      {/* Real Leaflet Map Container */}
      <div
        style={{
          height: '210px',
          width: '100%',
          borderRadius: '6px',
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
          position: 'relative',
        }}
      >
        <AdminLeafletMap
          center={[26.25, 92.65]}
          zoom={7.8}
          minZoom={6}
          maxZoom={14}
          height="100%"
          tileProvider="carto"
          markers={markers}
          routes={routes}
          showTileSwitch={false}
        />
      </div>
    </div>
  );
};

export default ReportsLocationMap;
