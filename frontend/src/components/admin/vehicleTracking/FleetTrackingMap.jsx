import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { LIVE_VEHICLES_LIST } from '@/data/admin/mockData';
import { AdminLeafletMap } from '@/components/admin/maps/AdminLeafletMap';

export const FleetTrackingMap = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(LIVE_VEHICLES_LIST[0]);

  // Real geographic coordinates for active fleet in Assam / Northeast
  const vehiclePositions = [
    { ...LIVE_VEHICLES_LIST[0], pos: [26.24, 92.15], speedVal: '45 km/h' },
    { ...LIVE_VEHICLES_LIST[1], pos: [26.65, 92.80], speedVal: '60 km/h' },
    { ...LIVE_VEHICLES_LIST[2], pos: [26.55, 93.45], speedVal: '55 km/h' },
    { ...LIVE_VEHICLES_LIST[3], pos: [24.85, 92.80], speedVal: '40 km/h' },
    { ...LIVE_VEHICLES_LIST[4], pos: [25.75, 91.90], speedVal: '35 km/h' },
  ];

  const markers = vehiclePositions.map((v) => {
    const isSelected = selectedVehicle && selectedVehicle.id === v.id;
    const color =
      v.status === 'In-Transit' || v.status === 'Optimal'
        ? '#059669'
        : v.status === 'Delayed'
        ? '#D97706'
        : '#2563EB';

    return {
      id: v.id,
      position: v.pos,
      iconType: 'truck',
      color: isSelected ? '#10B981' : color,
      size: isSelected ? 34 : 28,
      onClick: () => setSelectedVehicle(v),
      popupContent: (
        <div style={{ minWidth: '160px', padding: '2px 4px' }}>
          <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '13px' }}>
            {v.id}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
            Driver: {v.driver}
          </div>
          <div style={{ fontSize: '11px', color: '#334155', fontWeight: 600, marginTop: '2px' }}>
            Speed: {v.speedVal || v.speed} • {v.route}
          </div>
          <div style={{ marginTop: '4px' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '3px',
                backgroundColor: color === '#059669' ? '#DCFCE7' : '#EFF6FF',
                color: color,
              }}
            >
              {v.status}
            </span>
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden', position: 'relative', height: '100%', minHeight: '430px' }}>
      <div
        className="map-container"
        style={{
          height: '420px',
          width: '100%',
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <AdminLeafletMap
          center={[26.15, 92.50]}
          zoom={7.8}
          minZoom={6}
          maxZoom={15}
          height="100%"
          tileProvider="carto"
          markers={markers}
          showTileSwitch={true}
        />

        {/* Selected Vehicle Info Overlay Bar */}
        {selectedVehicle && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              right: '50px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(6px)',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              zIndex: 1000,
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Truck size={15} />
              </div>
              <div>
                <strong style={{ fontSize: '12.5px', color: '#0F172A', display: 'block' }}>
                  {selectedVehicle.id} ({selectedVehicle.driver})
                </strong>
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  Route: {selectedVehicle.route}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11.5px' }}>
              <span style={{ color: '#475569' }}>
                Speed: <strong>{selectedVehicle.speedVal || selectedVehicle.speed || '52 km/h'}</strong>
              </span>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: '#DCFCE7',
                  color: '#15803D',
                  fontWeight: 700,
                  fontSize: '11px',
                }}
              >
                {selectedVehicle.status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FleetTrackingMap;
