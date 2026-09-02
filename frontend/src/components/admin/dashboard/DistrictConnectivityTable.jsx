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
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '16px 20px' }}>
      <div className="card-header" style={{ marginBottom: '12px' }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>District-wise Connectivity</h2>
        <button className="card-link" onClick={() => setCurrentPage('analytics')}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="table-container" style={{ flex: 1, overflowX: 'auto' }}>
        <table className="custom-table" style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px 10px', textAlign: 'left', whiteSpace: 'nowrap', width: '22%' }}>DISTRICT</th>
              <th style={{ padding: '8px 8px', textAlign: 'center', whiteSpace: 'nowrap', width: '11%' }}>GOOD</th>
              <th style={{ padding: '8px 8px', textAlign: 'center', whiteSpace: 'nowrap', width: '13%' }}>MODERATE</th>
              <th style={{ padding: '8px 8px', textAlign: 'center', whiteSpace: 'nowrap', width: '12%' }}>AT RISK</th>
              <th style={{ padding: '8px 8px', textAlign: 'center', whiteSpace: 'nowrap', width: '12%' }}>BLOCKED</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', whiteSpace: 'nowrap', width: '30%' }}>CONNECTIVITY SCORE</th>
            </tr>
          </thead>
          <tbody>
            {districtsList.map((d, i) => {
              const fillColor = d.score >= 70 ? '#10B981' : d.score >= 50 ? '#F59E0B' : '#EF4444';
              return (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '9px 10px', fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>
                    {d.district}
                  </td>
                  <td style={{ padding: '9px 8px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {d.good}
                  </td>
                  <td style={{ padding: '9px 8px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {d.moderate}
                  </td>
                  <td style={{ padding: '9px 8px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {d.atRisk}
                  </td>
                  <td style={{ padding: '9px 8px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {d.blocked}
                  </td>
                  <td style={{ padding: '9px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '110px' }}>
                      <div style={{ flex: 1, height: '6px', borderRadius: '9999px', backgroundColor: '#E2E8F0', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${d.score}%`,
                            backgroundColor: fillColor,
                            borderRadius: '9999px',
                            transition: 'width 0.4s ease',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, minWidth: '32px', textAlign: 'right', color: 'var(--text-primary)' }}>
                        {d.score}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend below table */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginTop: 'auto',
          paddingTop: '12px',
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
