import React from 'react';
import { Truck, ChevronRight } from 'lucide-react';
import { RECENT_TRIPS } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const RecentTripsTable = () => {
  const { openModal } = useApp();

  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '12px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Recent Trips</h2>
        <button
          className="card-link"
          onClick={() => openModal('support', { topic: 'Fleet Trip Logs' })}
        >
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Route</th>
              <th>Start Time</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_TRIPS.map((t, i) => {
              const isMoving = t.statusClass === 'in-progress';
              const isDelayed = t.statusClass === 'delayed';
              const isStopped = t.statusClass === 'stopped';

              const iconColor = isMoving ? '#059669' : isDelayed ? '#D97706' : '#EF4444';
              const iconBg = isMoving ? '#ECFDF5' : isDelayed ? '#FFFBEB' : '#FEF2F2';

              return (
                <tr key={i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          backgroundColor: iconBg,
                          color: iconColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Truck size={14} />
                      </div>
                      <span style={{ fontWeight: 600 }}>{t.vehicle}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{t.driver}</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{t.route}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{t.startTime}</td>
                  <td>
                    <span className={`badge badge-${t.statusClass}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '100px' }}>
                      <div className="progress-bar-container" style={{ flex: 1 }}>
                        <div
                          className={`progress-bar-fill ${
                            isDelayed ? 'warning' : isStopped ? 'danger' : 'success'
                          }`}
                          style={{ width: `${t.progress}%` }}
                        />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, minWidth: '28px' }}>
                        {t.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
