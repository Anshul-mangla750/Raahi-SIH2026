import React from 'react';
import { Truck, ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const ActiveVehiclesList = () => {
  const { setCurrentPage } = useApp();

  const activeVehicles = [
    {
      id: 'AS01AB1234',
      route: 'Guwahati → Itanagar',
      status: 'On Time',
      isDelayed: false,
    },
    {
      id: 'AS02CD5678',
      route: 'Silchar → Aizawl',
      status: 'Delayed',
      isDelayed: true,
    },
    {
      id: 'ML05EF9012',
      route: 'Shillong → Tura',
      status: 'On Time',
      isDelayed: false,
    },
    {
      id: 'NL01GH3456',
      route: 'Dimapur → Kohima',
      status: 'Delayed',
      isDelayed: true,
    },
    {
      id: 'MN01IJ7890',
      route: 'Imphal → Ukhrul',
      status: 'On Time',
      isDelayed: false,
    },
  ];

  return (
    <div
      className="card"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '14px 16px',
      }}
    >
      {/* Header */}
      <div
        className="card-header"
        style={{
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2 className="card-title" style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>
          Active Vehicles
        </h2>
        <button
          className="card-link"
          onClick={() => setCurrentPage('vehicle-tracking')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--primary-600)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* 5-Vehicle Compact List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        {activeVehicles.map((veh, index) => (
          <div
            key={veh.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 0',
              borderBottom: index < activeVehicles.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}
          >
            {/* Left: Truck Icon + ID & Route */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Truck size={13} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.2,
                  }}
                >
                  {veh.id}
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {veh.route}
                </span>
              </div>
            </div>

            {/* Right: Status Pill */}
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '9999px',
                backgroundColor: veh.isDelayed ? '#FEF3C7' : '#DCFCE7',
                color: veh.isDelayed ? '#D97706' : '#059669',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: veh.isDelayed ? '#D97706' : '#059669',
                }}
              />
              {veh.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
