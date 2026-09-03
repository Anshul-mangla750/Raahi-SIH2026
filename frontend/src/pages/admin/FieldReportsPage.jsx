import React, { useState } from 'react';
import { FileText, Calendar, CloudSun } from 'lucide-react';
import { FieldReportsStatCards } from '@/components/admin/fieldReports/FieldReportsStatCards';
import { FieldReportsFilterBar } from '@/components/admin/fieldReports/FieldReportsFilterBar';
import { FieldReportsTable } from '@/components/admin/fieldReports/FieldReportsTable';
import { ReportsLocationMap } from '@/components/admin/fieldReports/ReportsLocationMap';
import { ReportsByTypeChart } from '@/components/admin/fieldReports/ReportsByTypeChart';
import { ReportsTrendChart } from '@/components/admin/fieldReports/ReportsTrendChart';
import { ReportsByPriorityChart } from '@/components/admin/fieldReports/ReportsByPriorityChart';
import { RecentActivityFeed } from '@/components/admin/fieldReports/RecentActivityFeed';
import { WEATHER_DATA } from '@/data/admin/mockData';
import { toast } from 'sonner';

export const FieldReportsPage = () => {
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleExportReport = () => {
    toast.success('Exporting Field Reports Summary (PDF / CSV)...');
  };

  return (
    <div
      className="field-reports-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
      }}
    >
      {/* 1. Page Header with Title, Subtitle, Date and Weather Widgets */}
      <div
        className="page-header-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div className="page-title-group">
          <h1
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: 0,
              fontSize: '20px',
              fontWeight: 800,
              color: 'var(--text-primary)',
            }}
          >
            <FileText size={22} color="#0F172A" />
            Field Reports
          </h1>
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: '12px',
              color: 'var(--text-muted)',
            }}
          >
            Manage, view and analyze all field reports submitted from the field.
          </p>
        </div>

        {/* Right Widgets: Calendar and Weather */}
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
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                21 May 2025
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Wednesday, 10:30 AM
              </span>
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
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {WEATHER_DATA.temp}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                {WEATHER_DATA.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 5 Horizontal Statistics Cards */}
      <FieldReportsStatCards />

      {/* 3. Horizontal Filter Bar */}
      <FieldReportsFilterBar
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onExport={handleExportReport}
      />

      {/* 4. Main Content Grid: Left Table, Right Map & Category Breakdown */}
      <div
        className="field-reports-main-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.75fr 1.05fr',
          gap: '16px',
          alignItems: 'start',
        }}
      >
        {/* Left: Reports Table */}
        <FieldReportsTable
          typeFilter={typeFilter}
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
        />

        {/* Right: Reports by Location Map + Reports by Type */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ReportsLocationMap />
          <ReportsByTypeChart />
        </div>
      </div>

      {/* 5. Bottom Analytics Row: Reports Trend, Reports by Priority, Recent Activity */}
      <div
        className="field-reports-bottom-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          alignItems: 'stretch',
        }}
      >
        <ReportsTrendChart />
        <ReportsByPriorityChart />
        <RecentActivityFeed />
      </div>
    </div>
  );
};
