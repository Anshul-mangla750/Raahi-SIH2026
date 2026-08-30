import React from 'react';
import { ChevronRight } from 'lucide-react';
import { DonutChart } from '../common/DonutChart';
import { REPORTS_BY_TYPE } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const ReportsByTypeChart = () => {
  const { openModal } = useApp();

  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Reports by Type</h2>
        <button
          className="card-link"
          onClick={() => openModal('support', { topic: 'Field Incident Categories Breakdown' })}
        >
          <span>View Details</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <DonutChart
        data={REPORTS_BY_TYPE}
        total={128}
        totalLabel="Total"
        size={130}
        strokeWidth={15}
      />
    </div>
  );
};
