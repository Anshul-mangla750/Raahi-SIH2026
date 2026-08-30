import React from 'react';
import { CheckCircle2, Download } from 'lucide-react';
import { ROUTE_INSIGHTS } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const RouteInsightsCard = () => {
  const { openModal } = useApp();

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div className="card-header" style={{ marginBottom: '16px' }}>
          <h2 className="card-title" style={{ margin: 0 }}>Route Insights</h2>
        </div>

        <div className="insights-list">
          {ROUTE_INSIGHTS.map((insight, i) => (
            <div key={i} className="insight-item">
              <CheckCircle2 size={16} />
              <span>{insight}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <button
          className="btn btn-outline"
          style={{ width: '100%', padding: '10px 16px', color: '#059669', borderColor: '#10B981', fontWeight: 600 }}
          onClick={() => openModal('exportPlan')}
        >
          <Download size={16} />
          <span>Export Route Plan</span>
        </button>
      </div>
    </div>
  );
};
