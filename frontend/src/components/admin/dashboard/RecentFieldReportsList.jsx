import React from 'react';
import { ChevronRight } from 'lucide-react';
import { RECENT_FIELD_REPORTS } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const RecentFieldReportsList = () => {
  const { setCurrentPage, openModal } = useApp();

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
        {RECENT_FIELD_REPORTS.map((rep) => (
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
              src={rep.image}
              alt={rep.title}
              className="report-thumbnail"
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
                {rep.title}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '2px',
                  fontSize: '11px',
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>{rep.time}</span>
                <span style={{ color: 'var(--primary-600)', fontWeight: 500 }}>{rep.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
