import React from 'react';
import { AlertTriangle, ChevronRight, Gauge, Compass, Radio, Wrench } from 'lucide-react';
import { VEHICLE_ALERTS_SUMMARY } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const AlertsSummaryCard = () => {
  const { setCurrentPage } = useApp();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'speed':
        return <Gauge size={16} color="#EF4444" />;
      case 'route':
        return <Compass size={16} color="#EF4444" />;
      case 'gps':
        return <Radio size={16} color="#F59E0B" />;
      case 'tool':
        return <Wrench size={16} color="#3B82F6" />;
      default:
        return <AlertTriangle size={16} color="#EF4444" />;
    }
  };

  return (
    <div className="card" style={{ height: '100%' }}>
      <div className="card-header" style={{ marginBottom: '12px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Alerts Summary</h2>
        <button className="card-link" onClick={() => setCurrentPage('alerts')}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {VEHICLE_ALERTS_SUMMARY.map((a, i) => (
          <div
            key={i}
            onClick={() => setCurrentPage('alerts')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-card-alt)',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {getIcon(a.icon)}
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                {a.type}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {a.count}
              </span>
              <ChevronRight size={14} color="var(--text-muted)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
