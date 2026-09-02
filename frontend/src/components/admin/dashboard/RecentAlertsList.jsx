import React from 'react';
import { AlertTriangle, AlertOctagon, CheckCircle2, ChevronRight, CloudRain, Construction } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const RecentAlertsList = () => {
  const { alerts, setCurrentPage } = useApp();

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '14px 16px' }}>
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '14px' }}>Recent Alerts</h2>
        <button className="card-link" onClick={() => setCurrentPage('alerts')}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, justifyContent: 'space-between' }}>
        {alerts.slice(0, 4).map((alt) => {
          const rawSev = (alt.severity || alt.severityClass || 'medium').toLowerCase();
          const isHigh = rawSev.includes('high');
          const isMedium = rawSev.includes('med');
          const badgeClass = isHigh ? 'badge-high' : isMedium ? 'badge-medium' : 'badge-low';

          return (
            <div
              key={alt.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '6px',
                padding: '4px 6px',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  {isHigh ? (
                    <AlertOctagon size={14} color="#EF4444" />
                  ) : isMedium ? (
                    <AlertTriangle size={14} color="#F59E0B" />
                  ) : (
                    <CheckCircle2 size={14} color="#10B981" />
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {alt.title}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {alt.location ? `${alt.location} • ` : ''}{alt.time}
                  </span>
                </div>
              </div>

              <span className={`badge ${badgeClass}`} style={{ fontSize: '10px', padding: '2px 6px', flexShrink: 0 }}>
                {alt.severity || 'Medium'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
