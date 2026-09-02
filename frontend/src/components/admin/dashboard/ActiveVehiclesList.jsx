import React from 'react';
import { Truck, ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const ActiveVehiclesList = () => {
  const { setCurrentPage, vehicles } = useApp();
  const displayList = vehicles && vehicles.length > 0 ? vehicles.slice(0, 5) : [];

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '14px 16px' }}>
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '14px' }}>Active Vehicles</h2>
        <button className="card-link" onClick={() => setCurrentPage('vehicle-tracking')}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, justifyContent: 'space-between' }}>
        {displayList.map((veh) => {
          const rawStatus = (veh.status || 'Moving').toLowerCase();
          const isDelayed = rawStatus.includes('delay');
          const isStopped = rawStatus.includes('stop') || rawStatus.includes('break');
          const badgeClass = isStopped ? 'badge-high' : isDelayed ? 'badge-medium' : 'badge-low';

          return (
            <div
              key={veh.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 6px',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Truck size={12} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                    {veh.id}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {veh.route || 'Guwahati → Itanagar'}
                  </span>
                </div>
              </div>

              <span className={`badge ${badgeClass}`} style={{ fontSize: '10px', padding: '2px 6px', flexShrink: 0 }}>
                {veh.status || 'Moving'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
