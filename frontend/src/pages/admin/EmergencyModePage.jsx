import React from 'react';
import { EmergencyHeader } from '@/components/admin/emergency/EmergencyHeader';
import { EmergencyOverview } from '@/components/admin/emergency/EmergencyOverview';
import { AffectedRouteMap } from '@/components/admin/emergency/AffectedRouteMap';
import { EmergencyImpact } from '@/components/admin/emergency/EmergencyImpact';
import { AlternateRoutes } from '@/components/admin/emergency/AlternateRoutes';

export const EmergencyModePage = () => {
  return (
    <div
      className="emergency-page-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        paddingBottom: '20px',
      }}
    >
      {/* 1. Page Header with Title, Subtitle, Date & Weather Cards */}
      <EmergencyHeader />

      {/* 2. Emergency Overview Card (Flood Hazard, Active Badge, Route & Timings) */}
      <EmergencyOverview />

      {/* 3. Affected Route Map & Emergency Impact (Two-Column Layout) */}
      <div
        className="emergency-route-impact-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.9fr 1.05fr',
          gap: '16px',
          alignItems: 'start',
          width: '100%',
        }}
      >
        <AffectedRouteMap />
        <EmergencyImpact />
      </div>

      {/* 4. Alternate Routes (3-Column Route Cards Grid) */}
      <AlternateRoutes />
    </div>
  );
};

export const EmergencyPage = EmergencyModePage;
export default EmergencyModePage;
