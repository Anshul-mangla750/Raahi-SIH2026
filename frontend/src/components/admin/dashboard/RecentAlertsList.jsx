import React from 'react';
import { AlertTriangle, AlertOctagon, CheckCircle2, ChevronRight, CloudRain, Construction } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const RecentAlertsList = () => {
  const { alerts, setCurrentPage } = useApp();

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header" style={{ marginBottom: '10px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Recent Alerts</h2>
        <button className="card-link" onClick={() => setCurrentPage('alerts')}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
        {alerts.slice(0, 4).map((alt) => {
          const isHigh = alt.severityClass === 'high';
          const isMedium = alt.severityClass === 'medium';

          return (
            <div
              key={alt.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '8px',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-card-alt)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
                <div style={{ marginTop: '2px', flexShrink: 0 }}>
                  {isHigh ? (
                    <AlertOctagon size={16} color="#EF4444" />
                  ) : isMedium ? (
                    <AlertTriangle size={16} color="#F59E0B" />
                  ) : (
                    <CheckCircle2 size={16} color="#10B981" />
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                      lineHeight: 1.25,
                    }}
                  >
                    {alt.title}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{alt.time}</span>
                </div>
              </div>

              <span
                className={`badge badge-${alt.severityClass || 'medium'}`}
                style={{ flexShrink: 0 }}
              >
                {alt.severity}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
