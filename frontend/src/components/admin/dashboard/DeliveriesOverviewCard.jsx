import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DonutChart } from '../common/DonutChart';
import { DELIVERIES_OVERVIEW } from '@/data/admin/mockData';

export const DeliveriesOverviewCard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(DELIVERIES_OVERVIEW.period);

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '14px 16px' }}>
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '14px' }}>Deliveries Overview</h2>
        <div style={{ position: 'relative' }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: '2px 20px 2px 8px',
              fontSize: '11px',
              fontWeight: 500,
              borderRadius: '4px',
              borderColor: 'var(--border-light)',
              appearance: 'none',
              cursor: 'pointer',
              backgroundColor: 'var(--bg-card-alt)',
              color: 'var(--text-primary)',
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

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DonutChart
          data={DELIVERIES_OVERVIEW.breakdown}
          total={DELIVERIES_OVERVIEW.total}
          totalLabel="Total"
          size={100}
          strokeWidth={12}
        />
      </div>
    </div>
  );
};
