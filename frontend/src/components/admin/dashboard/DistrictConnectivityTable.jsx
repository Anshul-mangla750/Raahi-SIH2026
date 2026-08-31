import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { DISTRICT_CONNECTIVITY } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';
import ApiClient from '@/lib/api';

export const DistrictConnectivityTable = () => {
  const { setCurrentPage } = useApp();
  const [districtsList, setDistrictsList] = useState(DISTRICT_CONNECTIVITY);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await ApiClient.getAdminDistricts();
        if (res?.success && res.data && res.data.length > 0) {
          const mapped = res.data.map(d => ({
            district: d.name,
            good: `${Math.round(d.connectivity_score * 0.85)}%`,
            moderate: `${Math.round((100 - d.connectivity_score) * 0.6)}%`,
            atRisk: `${Math.round((100 - d.connectivity_score) * 0.3)}%`,
            blocked: `${Math.round((100 - d.connectivity_score) * 0.1)}%`,
            score: d.connectivity_score,
            status: d.connectivity_status,
          }));
          setDistrictsList(mapped);
        }
      } catch (e) {
        console.warn('Using fallback districts list:', e);
      }
    };

    fetchDistricts();
  }, []);

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
            {districtsList.map((d, i) => (
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
          paddingTop: '8px',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '11px',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span>Optimal (&gt;70%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          <span>Caution (50-70%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <span>Severely Impacted (&lt;50%)</span>
        </div>
      </div>
    </div>
  );
};
