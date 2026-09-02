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

  const columnGridStyle = {
    display: 'grid',
    gridTemplateColumns: '25% 11% 13% 11% 11% 29%',
    alignItems: 'center',
  };

  return (
    <div
      className="card district-connectivity-card"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 20px',
        overflow: 'hidden',
        minHeight: 0,
      }}
    >
      {/* 1. Fixed Card Header */}
      <div className="card-header" style={{ marginBottom: '10px', flexShrink: 0 }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>District-wise Connectivity</h2>
        <button className="card-link" onClick={() => setCurrentPage('analytics')}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* 2. Fixed Table Column Headers */}
      <div
        className="district-table-header"
        style={{
          ...columnGridStyle,
          flexShrink: 0,
          backgroundColor: 'var(--bg-card-alt, #F8FAFC)',
          padding: '6px 10px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--text-muted)',
          letterSpacing: '0.03em',
          marginBottom: '2px',
          userSelect: 'none',
        }}
      >
        <div>DISTRICT</div>
        <div style={{ textAlign: 'center' }}>GOOD</div>
        <div style={{ textAlign: 'center' }}>MODERATE</div>
        <div style={{ textAlign: 'center' }}>AT RISK</div>
        <div style={{ textAlign: 'center' }}>BLOCKED</div>
        <div style={{ paddingLeft: '4px' }}>CONNECTIVITY SCORE</div>
      </div>

      {/* 3. Dedicated Scrollable District Rows Area - constrained to 5-6 rows */}
      <div
        className="district-table-body custom-scrollbar"
        style={{
          flex: 1,
          minHeight: 0,
          maxHeight: '185px',
          height: '185px',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: '4px',
        }}
      >
        {districtsList.map((d, i) => {
          const fillColor = d.score >= 70 ? '#10B981' : d.score >= 50 ? '#F59E0B' : '#EF4444';
          return (
            <div
              key={i}
              style={{
                ...columnGridStyle,
                padding: '6px 10px',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '12px',
                transition: 'background-color 0.15s ease',
              }}
              className="district-row-item"
            >
              <div
                style={{
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'var(--text-primary)',
                }}
                title={d.district}
              >
                {d.district}
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{d.good}</div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{d.moderate}</div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{d.atRisk}</div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{d.blocked}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '4px' }}>
                <div
                  style={{
                    flex: 1,
                    height: '5px',
                    borderRadius: '9999px',
                    backgroundColor: '#E2E8F0',
                    overflow: 'hidden',
                  }}
                >
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
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    minWidth: '30px',
                    textAlign: 'right',
                    color: 'var(--text-primary)',
                  }}
                >
                  {d.score}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Fixed Bottom Status Legend */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0,
          marginTop: 'auto',
          paddingTop: '10px',
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
