import React from 'react';
import { ChevronRight } from 'lucide-react';
import { LineChart } from '../common/LineChart';
import { ROUTE_STATUS_TREND } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const RouteStatusChart = () => {
  const { setCurrentPage } = useApp();

  const series = [
    { key: 'good', label: 'Good', color: '#10B981' },
    { key: 'moderate', label: 'Moderate', color: '#F59E0B' },
    { key: 'atRisk', label: 'At Risk', color: '#F97316' },
    { key: 'blocked', label: 'Blocked', color: '#EF4444' },
  ];

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '16px 20px' }}>
      <div className="card-header" style={{ marginBottom: '12px' }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>Route Status Overview</h2>
        <button className="card-link" onClick={() => setCurrentPage('analytics')}>
          <span>View Full Report</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LineChart
          data={ROUTE_STATUS_TREND}
          series={series}
          height={200}
          yMax={1500}
          yAxisLabel="No. of Routes"
        />
      </div>
    </div>
  );
};
