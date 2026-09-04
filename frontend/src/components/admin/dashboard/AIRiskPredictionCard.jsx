import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { DonutChart } from '../common/DonutChart';
import { AI_RISK_PREDICTIONS } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const AIRiskPredictionCard = () => {
  const { setCurrentPage } = useApp();

  const riskData = [
    { label: 'High Risk', count: 23, percentage: 26, color: '#EF4444' },
    { label: 'Medium', count: 36, percentage: 41, color: '#F59E0B' },
    { label: 'Low Risk', count: 28, percentage: 32, color: '#10B981' },
  ];

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px 18px' }}>
      {/* Card Header with Title, Subtitle, and View All */}
      <div className="card-header" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
          <h2 className="card-title" style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
            AI Risk Prediction
          </h2>
          <span style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--text-muted)' }}>
            (Next 24-48 Hours)
          </span>
        </div>
        <button
          className="card-link"
          onClick={() => setCurrentPage('ai-predictions')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: 600, color: 'var(--primary-600)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Main Content: Left Donut + Right Legend */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '4px 0' }}>
        <DonutChart
          data={riskData}
          total={87}
          totalLabel="Total Risks"
          size={135}
          strokeWidth={15}
        />
      </div>

      {/* Bottom Divider & AI Status */}
      <div
        style={{
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11.5px',
          color: 'var(--text-muted)',
        }}
      >
        <Sparkles size={14} color="#059669" />
        <span>AI model updated {AI_RISK_PREDICTIONS?.lastUpdated || '30 mins ago'}</span>
      </div>
    </div>
  );
};
