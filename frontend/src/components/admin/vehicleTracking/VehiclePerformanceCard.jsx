import React from 'react';
import { Route, Fuel, Gauge, Clock, Package, ChevronRight } from 'lucide-react';
import { VEHICLE_PERFORMANCE_METRICS } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const VehiclePerformanceCard = () => {
  const { setCurrentPage } = useApp();

  const metrics = [
    { label: 'Total Distance Travelled', value: VEHICLE_PERFORMANCE_METRICS.totalDistance, icon: Route, color: '#059669' },
    { label: 'Total Fuel Consumed', value: VEHICLE_PERFORMANCE_METRICS.totalFuel, icon: Fuel, color: '#059669' },
    { label: 'Average Fuel Efficiency', value: VEHICLE_PERFORMANCE_METRICS.avgFuelEfficiency, icon: Gauge, color: '#059669' },
    { label: 'Total Engine Hours', value: VEHICLE_PERFORMANCE_METRICS.totalEngineHours, icon: Clock, color: '#059669' },
    { label: 'Total Deliveries', value: VEHICLE_PERFORMANCE_METRICS.totalDeliveries, icon: Package, color: '#059669' },
  ];

  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '12px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>
          Vehicle Performance
          <span className="card-subtitle" style={{ marginLeft: 6 }}>(This Month)</span>
        </h2>
        <button className="card-link" onClick={() => setCurrentPage('analytics')}>
          <span>View Report</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 0',
                borderBottom: i === metrics.length - 1 ? 'none' : '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#ECFDF5',
                    color: m.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={15} />
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {m.label}
                </span>
              </div>

              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {m.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
