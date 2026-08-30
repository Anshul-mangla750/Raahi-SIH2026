import React from 'react';
import { DonutChart } from '../common/DonutChart';
import { COST_BREAKDOWN } from '@/data/admin/mockData';

export const CostBreakdownChart = () => {
  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Estimated Cost Breakdown</h2>
      </div>

      <DonutChart
        data={COST_BREAKDOWN}
        total="₹ 6,240"
        totalLabel="Total Cost"
        size={140}
        strokeWidth={16}
      />
    </div>
  );
};
