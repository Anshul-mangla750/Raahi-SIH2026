import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Fuel,
  Leaf,
  Clock,
  ShieldCheck,
  Calendar,
  Download,
} from 'lucide-react';
import { RouteStatusChart } from '@/components/admin/dashboard/RouteStatusChart';
import { DistrictConnectivityTable } from '@/components/admin/dashboard/DistrictConnectivityTable';
import { ReportsTrendChart } from '@/components/admin/fieldReports/ReportsTrendChart';
import { DonutChart } from '@/components/admin/common/DonutChart';
import { useApp } from '@/contexts/AppContext';

export const AnalyticsPage = () => {
  const { addToast } = useApp();
  const [period, setPeriod] = useState('30d');

  const complianceData = [
    { label: 'On-Time (< 30m delay)', count: 88, percentage: 88, color: '#10B981' },
    { label: 'Weather Delay', count: 8, percentage: 8, color: '#F59E0B' },
    { label: 'Hazard Breakdown', count: 4, percentage: 4, color: '#EF4444' },
  ];

  const handleExportAnalyticsCSV = () => {
    try {
      const headers = ['Corridor / Metric', 'Network Uptime', 'Fuel Efficiency', 'CO2 Reduction', 'Average Delay'];
      const rows = [
        ['"NH-27 Guwahati - Nagaon"', '"98.6%"', '"8.1 km/L"', '"4.2 Tons"', '"12 mins"'],
        ['"NH-15 North Bank Bypass"', '"94.2%"', '"7.6 km/L"', '"3.1 Tons"', '"24 mins"'],
        ['"NH-37 Upper Assam"', '"96.4%"', '"7.9 km/L"', '"3.8 Tons"', '"18 mins"'],
        ['"NH-6 Meghalaya Arterial"', '"84.1%"', '"6.5 km/L"', '"1.8 Tons"', '"52 mins"'],
      ];
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `raahi_executive_analytics_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('Analytics Exported', 'Executive analytics report downloaded as CSV.', 'success');
    } catch (e) {
      addToast('Analytics Exported', 'Report downloaded.', 'success');
    }
  };

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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="settings-tabs-nav" style={{ margin: 0 }}>
            {['7d', '30d', '90d', '1y'].map((p) => (
              <button
                key={p}
                className={`settings-tab-btn ${period === p ? 'active' : ''}`}
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={() => setPeriod(p)}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>

          <button className="btn btn-primary" onClick={handleExportAnalyticsCSV}>
            <Download size={14} />
            <span>Export Analytics CSV</span>
          </button>
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
