import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const RecentFieldReportsList = () => {
  const { setCurrentPage, openModal, reports } = useApp();
  const displayList = reports && reports.length > 0 ? reports.slice(0, 3) : [];

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header" style={{ marginBottom: '10px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Recent Field Reports</h2>
        <button className="card-link" onClick={() => setCurrentPage('field-reports')}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
        {displayList.map((rep) => (
          <div
            key={rep.id}
            onClick={() => openModal('reportDetail', rep)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-card-alt)',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)',
            }}
          >
            <img
              src={rep.image || '/assets/field-reports/landslide.jpg'}
              alt={rep.title || rep.type}
              className="report-thumbnail"
              onError={(e) => {
                e.target.src = '/assets/field-reports/landslide.jpg';
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {rep.title || rep.description || rep.type}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '2px',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                <span>{rep.location}</span>
                <span>{rep.reportedOn || rep.time || 'Today'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
