import React from 'react';
import {
  Route,
  AlertTriangle,
  AlertOctagon,
  Truck,
  Package,
  Calendar,
  CloudSun,
  ChevronDown,
} from 'lucide-react';
import { StatCard } from '@/components/admin/common/StatCard';
import { LiveAccessibilityMap } from '@/components/admin/dashboard/LiveAccessibilityMap';
import { AIRiskPredictionCard } from '@/components/admin/dashboard/AIRiskPredictionCard';
import { WeatherCard } from '@/components/admin/dashboard/WeatherCard';
import { DeliveriesOverviewCard } from '@/components/admin/dashboard/DeliveriesOverviewCard';
import { ActiveVehiclesList } from '@/components/admin/dashboard/ActiveVehiclesList';
import { RecentAlertsList } from '@/components/admin/dashboard/RecentAlertsList';
import { RecentFieldReportsList } from '@/components/admin/dashboard/RecentFieldReportsList';
import { RouteStatusChart } from '@/components/admin/dashboard/RouteStatusChart';
import { DistrictConnectivityTable } from '@/components/admin/dashboard/DistrictConnectivityTable';
import { DASHBOARD_METRICS, WEATHER_DATA } from '@/data/admin/mockData';

export const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      {/* Page Header / Welcome Banner */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1>Welcome back, Admin 👋</h1>
          <p>Here's what's happening across the North Eastern Region today.</p>
        </div>

        <div className="header-widgets-group">
          {/* Date pill */}
          <div className="info-pill-card">
            <Calendar size={18} color="var(--text-muted)" />
            <div className="info-pill-text">
              <span className="info-pill-primary">21 May 2025, 10:30 AM</span>
            </div>
          </div>

          {/* Weather pill */}
          <div className="info-pill-card" style={{ cursor: 'pointer' }}>
            <CloudSun size={20} color="#F59E0B" />
            <div className="info-pill-text">
              <span className="info-pill-primary">24°C</span>
              <span className="info-pill-secondary">Guwahati</span>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid (5 Cards from Image 1) */}
      <div className="stat-card-grid">
        <StatCard
          title="Total Routes Monitored"
          value={DASHBOARD_METRICS.totalRoutes.value}
          trend={DASHBOARD_METRICS.totalRoutes.trend}
          period={DASHBOARD_METRICS.totalRoutes.period}
          icon={Route}
          iconBg="#ECFDF5"
          iconColor="#059669"
        />

        <StatCard
          title="Routes at Risk"
          value={DASHBOARD_METRICS.routesAtRisk.value}
          trend={DASHBOARD_METRICS.routesAtRisk.trend}
          period={DASHBOARD_METRICS.routesAtRisk.period}
          isRisk={true}
          icon={AlertTriangle}
          iconBg="#FFFBEB"
          iconColor="#D97706"
        />

        <StatCard
          title="Blocked Routes"
          value={DASHBOARD_METRICS.blockedRoutes.value}
          trend={DASHBOARD_METRICS.blockedRoutes.trend}
          period={DASHBOARD_METRICS.blockedRoutes.period}
          isDanger={true}
          icon={AlertOctagon}
          iconBg="#FEF2F2"
          iconColor="#EF4444"
        />

        <StatCard
          title="Active Vehicles"
          value={DASHBOARD_METRICS.activeVehicles.value}
          trend={DASHBOARD_METRICS.activeVehicles.trend}
          period={DASHBOARD_METRICS.activeVehicles.period}
          icon={Truck}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
        />

        <StatCard
          title="Deliveries in Transit"
          value={DASHBOARD_METRICS.deliveriesInTransit.value}
          trend={DASHBOARD_METRICS.deliveriesInTransit.trend}
          period={DASHBOARD_METRICS.deliveriesInTransit.period}
          icon={Package}
          iconBg="#F5F3FF"
          iconColor="#7C3AED"
        />
      </div>

      {/* Main Row: Live Map & AI Risk / Weather Column */}
      <div className="dashboard-main-grid">
        <LiveAccessibilityMap />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AIRiskPredictionCard />
          <WeatherCard />
        </div>
      </div>

      {/* Four Column Middle Row (Deliveries Overview, Active Vehicles, Recent Alerts, Recent Field Reports) */}
      <div className="dashboard-four-col-grid">
        <DeliveriesOverviewCard />
        <ActiveVehiclesList />
        <RecentAlertsList />
        <RecentFieldReportsList />
      </div>

      {/* Bottom Row: Route Status Trend Chart & District-wise Connectivity Table */}
      <div className="dashboard-bottom-grid">
        <RouteStatusChart />
        <DistrictConnectivityTable />
      </div>
    </div>
  );
};
