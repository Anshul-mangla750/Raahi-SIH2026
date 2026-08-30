import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DonutChart } from '../common/DonutChart';
import { DELIVERIES_OVERVIEW } from '@/data/admin/mockData';

export const DeliveriesOverviewCard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(DELIVERIES_OVERVIEW.period);

  return (
    <div className="card" style={{ height: '100%' }}>
      <div className="card-header" style={{ marginBottom: '10px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Deliveries Overview</h2>
        <div style={{ position: 'relative' }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: '4px 24px 4px 8px',
              fontSize: '11px',
              fontWeight: 500,
              borderRadius: '4px',
              borderColor: 'var(--border-light)',
              appearance: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
          <ChevronDown
            size={12}
            color="var(--text-muted)"
            style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
        </div>
      </div>

      <DonutChart
        data={DELIVERIES_OVERVIEW.breakdown}
        total={DELIVERIES_OVERVIEW.total}
        totalLabel="Total"
        size={120}
        strokeWidth={14}
      />
    </div>
  );
};
