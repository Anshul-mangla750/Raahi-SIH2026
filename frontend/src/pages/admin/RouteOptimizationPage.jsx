import React from 'react';
import { Route, Calendar, CloudSun } from 'lucide-react';
import { RoutePlannerMap } from '@/components/admin/routeOptimization/RoutePlannerMap';
import { RouteSequenceTimeline } from '@/components/admin/routeOptimization/RouteSequenceTimeline';
import { DistanceComparisonChart } from '@/components/admin/routeOptimization/DistanceComparisonChart';
import { CostBreakdownChart } from '@/components/admin/routeOptimization/CostBreakdownChart';
import { RouteEfficiencyGauge } from '@/components/admin/routeOptimization/RouteEfficiencyGauge';
import { AlternativeRoutesTable } from '@/components/admin/routeOptimization/AlternativeRoutesTable';
import { RouteInsightsCard } from '@/components/admin/routeOptimization/RouteInsightsCard';
import { WEATHER_DATA } from '@/data/admin/mockData';

export const RouteOptimizationPage = () => {
  return (
    <div className="route-optimization-page">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1>
            <Route size={24} color="#059669" />
            Route Optimization
          </h1>
          <p>Find the most efficient routes to save time, fuel and ensure timely deliveries.</p>
        </div>

        <div className="header-widgets-group">
          <div className="info-pill-card">
            <Calendar size={18} color="var(--text-muted)" />
            <div className="info-pill-text">
              <span className="info-pill-primary">21 May 2025</span>
              <span className="info-pill-secondary">Wednesday, 10:30 AM</span>
            </div>
          </div>

          <div className="info-pill-card">
            <CloudSun size={20} color="#F59E0B" />
            <div className="info-pill-text">
              <span className="info-pill-primary">{WEATHER_DATA.temp}</span>
              <span className="info-pill-secondary">{WEATHER_DATA.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map & Route Sequence Timeline Section */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.8fr 1.2fr', marginBottom: '24px', alignItems: 'start' }}>
        <RoutePlannerMap />
        <RouteSequenceTimeline />
      </div>

      {/* Analytics Triad: Distance Comparison, Cost Breakdown, Efficiency Gauge */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <DistanceComparisonChart />
        <CostBreakdownChart />
        <RouteEfficiencyGauge />
      </div>

      {/* Bottom Row: Alternative Routes & Route Insights */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.8fr 1.2fr', marginBottom: '24px' }}>
        <AlternativeRoutesTable />
        <RouteInsightsCard />
      </div>
    </div>
  );
};
