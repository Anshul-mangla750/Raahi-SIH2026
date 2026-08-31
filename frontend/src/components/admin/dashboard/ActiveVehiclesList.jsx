import React from 'react';
import { Truck, ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const ActiveVehiclesList = () => {
  const { setCurrentPage, vehicles } = useApp();
  const displayList = vehicles && vehicles.length > 0 ? vehicles.slice(0, 5) : [];

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header" style={{ marginBottom: '10px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Active Vehicles</h2>
        <button className="card-link" onClick={() => setCurrentPage('vehicle-tracking')}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
        {displayList.map((veh) => {
          const statusClass = veh.statusClass || (veh.status ? veh.status.toLowerCase() : 'moving');
          return (
            <div
              key={veh.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-card-alt)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#EFF6FF',
                    color: '#3B82F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Truck size={14} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {veh.id}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    {veh.route || 'NER Corridor'} • {veh.speed || '45 km/h'}
                  </span>
                </div>
              </div>

              <span className={`badge badge-${statusClass === 'moving' ? 'on-time' : statusClass}`}>
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: 'currentColor',
                    marginRight: '4px',
                  }}
                />
                {veh.status || 'Moving'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
