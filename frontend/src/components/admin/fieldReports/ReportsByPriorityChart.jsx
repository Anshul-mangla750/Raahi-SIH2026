import React from 'react';
import { DonutChart } from '../common/DonutChart';
import { REPORTS_BY_PRIORITY } from '@/data/admin/mockData';

export const ReportsByPriorityChart = () => {
  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Reports by Priority</h2>
      </div>

      <DonutChart
        data={REPORTS_BY_PRIORITY}
        total={128}
        totalLabel="Total"
        size={130}
        strokeWidth={15}
      />
    </div>
  );
};
