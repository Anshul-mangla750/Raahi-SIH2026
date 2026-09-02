import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const RecentFieldReportsList = () => {
  const { setCurrentPage, openModal, reports } = useApp();
  const displayList = reports && reports.length > 0 ? reports.slice(0, 3) : [];

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '14px 16px' }}>
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '14px' }}>Recent Field Reports</h2>
        <button className="card-link" onClick={() => setCurrentPage('field-reports')}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, justifyContent: 'space-between' }}>
        {displayList.map((rep) => (
          <div
            key={rep.id}
            onClick={() => openModal('reportDetail', rep)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 6px',
              borderBottom: '1px solid var(--border-subtle)',
              cursor: 'pointer',
            }}
          >
            <img
              src={rep.image || '/assets/field-reports/landslide.jpg'}
              alt={rep.title || rep.type}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                objectFit: 'cover',
                flexShrink: 0,
              }}
              onError={(e) => {
                e.target.src = '/assets/field-reports/landslide.jpg';
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: 1.2,
                }}
              >
                {rep.title || rep.description || rep.type}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginTop: '2px',
                }}
              >
                {rep.location} • {rep.reporterName || rep.reporter || 'Inspector'} • {rep.reportedOn || rep.time || 'Today'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
