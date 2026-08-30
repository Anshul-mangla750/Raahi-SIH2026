import React from 'react';
import { Truck, ChevronRight } from 'lucide-react';
import { ACTIVE_VEHICLES_FEED } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const ActiveVehiclesList = () => {
  const { setCurrentPage } = useApp();

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
        {ACTIVE_VEHICLES_FEED.map((veh) => (
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
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{veh.route}</span>
              </div>
            </div>

            <span className={`badge badge-${veh.statusType}`}>
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: veh.statusType === 'on-time' ? '#10B981' : '#F59E0B',
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
