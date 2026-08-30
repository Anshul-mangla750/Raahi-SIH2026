import React from 'react';
import { ChevronRight } from 'lucide-react';
import { LineChart } from '../common/LineChart';
import { REPORTS_TREND } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const ReportsTrendChart = () => {
  const { setCurrentPage } = useApp();

  const series = [
    { key: 'count', label: 'Reports', color: '#047857' },
  ];

  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Reports Trend</h2>
        <button className="card-link" onClick={() => setCurrentPage('analytics')}>
          <span>View Full Report</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <LineChart
        data={REPORTS_TREND}
        series={series}
        height={180}
        yMax={50}
        showLegend={true}
      />
    </div>
  );
};
