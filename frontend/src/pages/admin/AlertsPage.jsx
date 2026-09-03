import React from 'react';
import { Bell, Calendar, CloudSun } from 'lucide-react';
import { AlertStatCards } from '@/components/admin/alerts/AlertStatCards';
import { AlertsOverviewTable } from '@/components/admin/alerts/AlertsOverviewTable';
import { AlertsSeverityChart } from '@/components/admin/alerts/AlertsSeverityChart';
import { AlertsTrendChart } from '@/components/admin/alerts/AlertsTrendChart';
import { RecentNotificationsList } from '@/components/admin/alerts/RecentNotificationsList';
import { WEATHER_DATA } from '@/data/admin/mockData';

export const AlertsPage = () => {
  return (
    <div
      className="alerts-page"
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
            <Bell size={22} color="#0F172A" />
            Alerts & Notifications
          </h1>
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: '12px',
              color: 'var(--text-muted)',
            }}
          >
            Monitor and manage all alerts and notifications across your fleet.
          </p>
        </div>

        {/* Header Right Widgets */}
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

      {/* 2. Alert Statistics Cards (5 Cards in 1 Row) */}
      <AlertStatCards />

      {/* 3. Alerts Overview Table with Filters, Badges & Pagination */}
      <AlertsOverviewTable />

      {/* 4. Bottom Analytics Section (3 Columns) */}
      <div
        className="alerts-bottom-analytics-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.35fr 1.15fr',
          gap: '16px',
          alignItems: 'stretch',
        }}
      >
        <AlertsSeverityChart />
        <AlertsTrendChart />
        <RecentNotificationsList />
      </div>
    </div>
  );
};
