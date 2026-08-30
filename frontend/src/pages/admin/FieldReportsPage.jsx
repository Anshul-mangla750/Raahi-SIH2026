import React from 'react';
import {
  FileText,
  Calendar,
  CloudSun,
  FileCheck2,
  CheckCircle2,
  Clock,
  AlertOctagon,
} from 'lucide-react';
import { StatCard } from '@/components/admin/common/StatCard';
import { FieldReportsTable } from '@/components/admin/fieldReports/FieldReportsTable';
import { ReportsLocationMap } from '@/components/admin/fieldReports/ReportsLocationMap';
import { ReportsByTypeChart } from '@/components/admin/fieldReports/ReportsByTypeChart';
import { ReportsTrendChart } from '@/components/admin/fieldReports/ReportsTrendChart';
import { ReportsByPriorityChart } from '@/components/admin/fieldReports/ReportsByPriorityChart';
import { RecentActivityFeed } from '@/components/admin/fieldReports/RecentActivityFeed';
import { FIELD_REPORT_STATS, WEATHER_DATA } from '@/data/admin/mockData';

export const FieldReportsPage = () => {
  return (
    <div className="field-reports-page">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1>
            <FileText size={24} color="#059669" />
            Field Reports
          </h1>
          <p>Manage, view and analyze all field reports submitted from the field.</p>
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

      {/* 5 KPI Stat Cards from Image 5 */}
      <div className="stat-card-grid">
        <StatCard
          title="Total Reports"
          value={FIELD_REPORT_STATS.totalReports.value}
          period={FIELD_REPORT_STATS.totalReports.label}
          icon={FileText}
          iconBg="#ECFDF5"
          iconColor="#059669"
        />

        <StatCard
          title="Reports This Month"
          value={FIELD_REPORT_STATS.reportsThisMonth.value}
          period={FIELD_REPORT_STATS.reportsThisMonth.label}
          icon={FileCheck2}
          iconBg="#EFF6FF"
          iconColor="#3B82F6"
        />

        <StatCard
          title="Resolved Reports"
          value={FIELD_REPORT_STATS.resolvedReports.value}
          period={FIELD_REPORT_STATS.resolvedReports.label}
          icon={CheckCircle2}
          iconBg="#ECFDF5"
          iconColor="#059669"
        />

        <StatCard
          title="Pending Reports"
          value={FIELD_REPORT_STATS.pendingReports.value}
          period={FIELD_REPORT_STATS.pendingReports.label}
          icon={Clock}
          iconBg="#FFFBEB"
          iconColor="#D97706"
        />

        <StatCard
          title="Overdue Reports"
          value={FIELD_REPORT_STATS.overdueReports.value}
          period={FIELD_REPORT_STATS.overdueReports.label}
          isDanger={true}
          icon={AlertOctagon}
          iconBg="#FEF2F2"
          iconColor="#EF4444"
        />
      </div>

      {/* Filter Toolbar & Data Table Section with Location Map & Reports by Type */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.8fr 1.2fr', marginBottom: '24px', alignItems: 'start' }}>
        <FieldReportsTable />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ReportsLocationMap />
          <ReportsByTypeChart />
        </div>
      </div>

      {/* Bottom Grid: Reports Trend, Reports by Priority, Recent Activity */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <ReportsTrendChart />
        <ReportsByPriorityChart />
        <RecentActivityFeed />
      </div>
    </div>
  );
};
