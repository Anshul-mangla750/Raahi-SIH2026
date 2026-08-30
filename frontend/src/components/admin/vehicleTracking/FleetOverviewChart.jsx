import React from 'react';
import { DonutChart } from '../common/DonutChart';
import { FLEET_OVERVIEW_DATA } from '@/data/admin/mockData';

export const FleetOverviewChart = () => {
  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Fleet Overview</h2>
      </div>

      <DonutChart
        data={FLEET_OVERVIEW_DATA}
        total={86}
        totalLabel="Total Vehicles"
        size={140}
        strokeWidth={16}
      />
    </div>
  );
};
