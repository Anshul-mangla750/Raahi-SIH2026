import React from 'react';
import { CheckCircle2, Download } from 'lucide-react';
import { ROUTE_INSIGHTS } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const RouteInsightsCard = () => {
  const { openModal } = useApp();

  return (
    <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div className="card-header" style={{ marginBottom: '12px' }}>
          <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>Route Insights</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {ROUTE_INSIGHTS.map((insight, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{insight}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <button
          className="btn btn-outline"
          style={{
            width: '100%',
            padding: '8px 16px',
            color: '#059669',
            borderColor: '#059669',
            backgroundColor: '#FFFFFF',
            fontWeight: 600,
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          onClick={() => openModal('exportPlan')}
        >
          <Download size={15} />
          <span>Export Route Plan</span>
        </button>
      </div>
    </div>
  );
};
