import React, { useState } from 'react';
import { Route, Calendar, CloudSun } from 'lucide-react';
import { RouteConfigBar } from '@/components/admin/routeOptimization/RouteConfigBar';
import { RoutePlannerMap } from '@/components/admin/routeOptimization/RoutePlannerMap';
import { RouteSequenceTimeline } from '@/components/admin/routeOptimization/RouteSequenceTimeline';
import { DistanceComparisonChart } from '@/components/admin/routeOptimization/DistanceComparisonChart';
import { CostBreakdownChart } from '@/components/admin/routeOptimization/CostBreakdownChart';
import { RouteEfficiencyGauge } from '@/components/admin/routeOptimization/RouteEfficiencyGauge';
import { AlternativeRoutesTable } from '@/components/admin/routeOptimization/AlternativeRoutesTable';
import { RouteInsightsCard } from '@/components/admin/routeOptimization/RouteInsightsCard';
import { WEATHER_DATA } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const RouteOptimizationPage = () => {
  const { addToast } = useApp();
  const [fromLocation, setFromLocation] = useState('Guwahati, Assam');
  const [vehicleType, setVehicleType] = useState('Medium Truck');
  const [destinationCount, setDestinationCount] = useState(6);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      addToast('Route Re-Calculated', 'Optimized multi-stop circuit: 468 km (saves 1h 25m).', 'success');
    }, 500);
  };

  const handleClear = () => {
    setFromLocation('Guwahati, Assam');
    setDestinationCount(6);
    setVehicleType('Medium Truck');
    addToast('Reset', 'Route parameters cleared.', 'info');
  };

  return (
    <div className="route-optimization-page" style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {/* 1. Page Header with Title & Top Widgets */}
      <div className="page-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div className="page-title-group">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
            <Route size={22} color="#059669" />
            Route Optimization
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
            Find the most efficient routes to save time, fuel and ensure timely deliveries.
          </p>
        </div>

        <div className="header-widgets-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Calendar Widget */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              padding: '8px 14px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <Calendar size={18} color="#059669" />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>21 May 2025</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Wednesday, 10:30 AM</span>
            </div>
          </div>

          {/* Weather Widget */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              padding: '8px 14px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <CloudSun size={20} color="#F59E0B" />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{WEATHER_DATA.temp}</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{WEATHER_DATA.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Full-Width Route Query Configuration Bar */}
      <RouteConfigBar
        fromLocation={fromLocation}
        setFromLocation={setFromLocation}
        destinationCount={destinationCount}
        setDestinationCount={setDestinationCount}
        vehicleType={vehicleType}
        setVehicleType={setVehicleType}
        handleOptimize={handleOptimize}
        handleClear={handleClear}
        isOptimizing={isOptimizing}
      />

      {/* 3. Main Map & Route Sequence Timeline Section */}
      <div className="route-map-summary-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', alignItems: 'stretch' }}>
        <RoutePlannerMap />
        <RouteSequenceTimeline />
      </div>

      {/* 4. Analytics Triad: Distance Comparison, Cost Breakdown, Efficiency Gauge */}
      <div className="route-analytics-triad" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <DistanceComparisonChart />
        <CostBreakdownChart />
        <RouteEfficiencyGauge />
      </div>

      {/* 5. Bottom Row: Alternative Routes & Route Insights */}
      <div className="route-bottom-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
        <AlternativeRoutesTable />
        <RouteInsightsCard />
      </div>
    </div>
  );
};
