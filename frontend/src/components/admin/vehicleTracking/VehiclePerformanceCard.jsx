import React from 'react';
import { Route, Fuel, Gauge, Clock, Package, ChevronRight } from 'lucide-react';
import { VEHICLE_PERFORMANCE_METRICS } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const VehiclePerformanceCard = () => {
  const { setCurrentPage } = useApp();

  const metrics = [
    { label: 'Total Distance Travelled', value: VEHICLE_PERFORMANCE_METRICS.totalDistance, icon: Route },
    { label: 'Total Fuel Consumed', value: VEHICLE_PERFORMANCE_METRICS.totalFuel, icon: Fuel },
    { label: 'Average Fuel Efficiency', value: VEHICLE_PERFORMANCE_METRICS.avgFuelEfficiency, icon: Gauge },
    { label: 'Total Engine Hours', value: VEHICLE_PERFORMANCE_METRICS.totalEngineHours, icon: Clock },
    { label: 'Total Deliveries', value: VEHICLE_PERFORMANCE_METRICS.totalDeliveries, icon: Package },
  ];

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '16px' }}>
      {/* Header with Title, (This Month) and View Report Link */}
      <div className="card-header" style={{ marginBottom: '8px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>Vehicle Performance</h2>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 500 }}>(This Month)</span>
        </div>
        <button
          className="card-link"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontSize: '11.5px',
            color: '#059669',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            padding: 0,
          }}
          onClick={() => setCurrentPage('analytics')}
        >
          <span>View Report</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Evenly distributed metric rows filling available card height */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '260px',
        }}
      >
        {metrics.map((m, i) => {
          const Icon = m.icon;
          const isLast = i === metrics.length - 1;

          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: isLast ? 'none' : '1px solid var(--border-subtle)',
              }}
            >
              {/* Left Side: Icon & Metric Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} />
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {m.label}
                </span>
              </div>

              {/* Right Side: Bold Value */}
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
