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
  MapPin,
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
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardPage = () => {
  const { kpis } = useApp();
  const { user } = useAuth();
  
  const metrics = kpis || DASHBOARD_METRICS;
  const todayDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const todayTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="dashboard-page">
      {/* Page Header / Welcome Banner */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1>Welcome back, {user?.name || 'Admin'} 👋</h1>
          <p>Here's what's happening across the Northern Eastern Region today.</p>
        </div>

        <div className="header-widgets-group">
          {/* Location Selector pill */}
          <div className="info-pill-card" style={{ cursor: 'pointer' }}>
            <MapPin size={16} color="var(--primary-600)" />
            <div className="info-pill-text">
              <span className="info-pill-primary">Assam / NER Region</span>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </div>

          {/* Date pill */}
          <div className="info-pill-card">
            <Calendar size={16} color="var(--text-muted)" />
            <div className="info-pill-text">
              <span className="info-pill-primary">{todayDate}, {todayTime}</span>
            </div>
          </div>

          {/* Weather pill */}
          <div className="info-pill-card" style={{ cursor: 'pointer' }}>
            <CloudSun size={18} color="#F59E0B" />
            <div className="info-pill-text">
              <span className="info-pill-primary">24°C • Heavy Rain Risk</span>
              <span className="info-pill-secondary">Guwahati (IMD)</span>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid (Connected to Live Database API) */}
      <div className="stat-card-grid">
        <StatCard
          title="Total Routes Monitored"
          value={metrics.totalRoutes?.value || '1,248'}
          trend={metrics.totalRoutes?.trend || '+12.5%'}
          period={metrics.totalRoutes?.period || 'vs yesterday'}
          icon={Route}
          iconBg="#ECFDF5"
          iconColor="#059669"
        />

        <StatCard
          title="Routes at Risk"
          value={metrics.routesAtRisk?.value || '87'}
          trend={metrics.routesAtRisk?.trend || '+8.3%'}
          period={metrics.routesAtRisk?.period || 'vs yesterday'}
          isRisk={true}
          icon={AlertTriangle}
          iconBg="#FFFBEB"
          iconColor="#D97706"
        />

        <StatCard
          title="Blocked Routes"
          value={metrics.blockedRoutes?.value || '23'}
          trend={metrics.blockedRoutes?.trend || '+15.2%'}
          period={metrics.blockedRoutes?.period || 'vs yesterday'}
          isDanger={true}
          icon={AlertOctagon}
          iconBg="#FEF2F2"
          iconColor="#EF4444"
        />

        <StatCard
          title="Active Vehicles"
          value={metrics.activeVehicles?.value || '312'}
          trend={metrics.activeVehicles?.trend || '+6.1%'}
          period={metrics.activeVehicles?.period || 'vs yesterday'}
          icon={Truck}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
        />

        <StatCard
          title="Deliveries in Transit"
          value={metrics.deliveriesInTransit?.value || '156'}
          trend={metrics.deliveriesInTransit?.trend || '+9.4%'}
          period={metrics.deliveriesInTransit?.period || 'vs yesterday'}
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
