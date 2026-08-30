import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { DonutChart } from '../common/DonutChart';
import { AI_RISK_PREDICTIONS } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const AIRiskPredictionCard = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <div>
          <h2 className="card-title" style={{ margin: 0 }}>
            AI Risk Prediction
            <span className="card-subtitle" style={{ marginLeft: 6 }}>(Next 24-48 Hours)</span>
          </h2>
        </div>
        <button className="card-link" onClick={() => setCurrentPage('ai-predictions')}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <DonutChart
          data={AI_RISK_PREDICTIONS.breakdown}
          total={AI_RISK_PREDICTIONS.totalRisks}
          totalLabel="Total Risks"
          size={140}
          strokeWidth={16}
        />
      </div>

      <div
        style={{
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: 'var(--text-muted)',
        }}
      >
        <Sparkles size={14} color="#3B82F6" />
        <span>AI model updated {AI_RISK_PREDICTIONS.lastUpdated}</span>
      </div>
    </div>
  );
};
