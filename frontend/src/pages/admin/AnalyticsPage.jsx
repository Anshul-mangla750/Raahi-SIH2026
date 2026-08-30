import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Fuel,
  Leaf,
  Clock,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { RouteStatusChart } from '@/components/admin/dashboard/RouteStatusChart';
import { DistrictConnectivityTable } from '@/components/admin/dashboard/DistrictConnectivityTable';
import { ReportsTrendChart } from '@/components/admin/fieldReports/ReportsTrendChart';
import { DonutChart } from '@/components/admin/common/DonutChart';

export const AnalyticsPage = () => {
  const complianceData = [
    { label: 'On-Time (< 30m delay)', count: 88, percentage: 88, color: '#10B981' },
    { label: 'Weather Delay', count: 8, percentage: 8, color: '#F59E0B' },
    { label: 'Hazard Breakdown', count: 4, percentage: 4, color: '#EF4444' },
  ];

  return (
    <div className="analytics-page" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1>
            <BarChart3 size={24} color="#059669" />
            Analytics & Executive Intelligence
          </h1>
          <p>Comprehensive fleet SLA compliance, fuel economy benchmarking, and district logistics network health.</p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="stat-card-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>
            <TrendingUp size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-title">Network Uptime</div>
            <div className="stat-value">98.2%</div>
            <div className="stat-subtitle">+1.4% vs last month</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
            <Fuel size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-title">Fleet Fuel Efficiency</div>
            <div className="stat-value">7.8 km/L</div>
            <div className="stat-subtitle">Optimized via AI Rerouting</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#ECFDF5', color: '#047857' }}>
            <Leaf size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-title">Carbon Saved</div>
            <div className="stat-value">14.2 Tons</div>
            <div className="stat-subtitle">CO2 equivalent this quarter</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#F5F3FF', color: '#7C3AED' }}>
            <Clock size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-title">Mean Transit Time</div>
            <div className="stat-value">6h 12m</div>
            <div className="stat-subtitle">Across 8 NER Corridors</div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid-2">
        <RouteStatusChart />
        <ReportsTrendChart />
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <DistrictConnectivityTable />
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>
            SLA Delivery Compliance Rate
          </h3>
          <DonutChart
            data={complianceData}
            total="88%"
            totalLabel="On-Time Rate"
            size={140}
          />
        </div>
      </div>
    </div>
  );
};
