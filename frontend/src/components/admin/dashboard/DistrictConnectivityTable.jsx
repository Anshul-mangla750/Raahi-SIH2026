import React from 'react';
import { ChevronRight } from 'lucide-react';
import { DISTRICT_CONNECTIVITY } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const DistrictConnectivityTable = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '12px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>District-wise Connectivity</h2>
        <button className="card-link" onClick={() => setCurrentPage('analytics')}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="table-container">
        <table className="custom-table" style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px 12px' }}>District</th>
              <th style={{ padding: '8px 12px' }}>Good</th>
              <th style={{ padding: '8px 12px' }}>Moderate</th>
              <th style={{ padding: '8px 12px' }}>At Risk</th>
              <th style={{ padding: '8px 12px' }}>Blocked</th>
              <th style={{ padding: '8px 12px' }}>Connectivity Score</th>
            </tr>
          </thead>
          <tbody>
            {DISTRICT_CONNECTIVITY.map((d, i) => (
              <tr key={i}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>{d.district}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-muted)' }}>{d.good}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-muted)' }}>{d.moderate}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-muted)' }}>{d.atRisk}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-muted)' }}>{d.blocked}</td>
                <td style={{ padding: '8px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
                    <div className="progress-bar-container" style={{ flex: 1 }}>
                      <div
                        className={`progress-bar-fill ${d.score >= 70 ? 'success' : 'warning'}`}
                        style={{ width: `${d.score}%` }}
                      />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, minWidth: '32px' }}>
                      {d.score}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend below table */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span>Good (&gt;70%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          <span>Moderate (40-69%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#F97316' }} />
          <span>At Risk (20-39%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <span>Blocked (&lt;20%)</span>
        </div>
      </div>
    </div>
  );
};
