import React, { useState } from 'react';
import { DistrictManagementHeader } from '@/components/admin/districtManagement/DistrictManagementHeader';
import { DistrictSelector } from '@/components/admin/districtManagement/DistrictSelector';
import { DistrictKPICards } from '@/components/admin/districtManagement/DistrictKPICards';
import { ConnectivityMap } from '@/components/admin/districtManagement/ConnectivityMap';
import { DistrictSummaryCard } from '@/components/admin/districtManagement/DistrictSummaryCard';
import { RouteConnectivityTable } from '@/components/admin/districtManagement/RouteConnectivityTable';

export const DistrictManagementPage = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('tezpur');

  return (
    <div
      className="district-management-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        paddingBottom: '24px',
      }}
    >
      {/* 1. Page Header with Title, Subtitle, Date & Weather Cards */}
      <DistrictManagementHeader />

      {/* 2. District Selector Dropdown */}
      <DistrictSelector
        selectedDistrict={selectedDistrict}
        onSelectDistrict={setSelectedDistrict}
      />

      {/* 3. Four KPI / Summary Cards */}
      <DistrictKPICards />

      {/* 4. Route Connectivity Overview: Map (~70%) & District Summary (~30%) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        <h2
          style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: 700,
            color: '#0F172A',
          }}
        >
          Route Connectivity Overview
        </h2>

        <div
          className="district-connectivity-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.9fr 1.05fr',
            gap: '16px',
            alignItems: 'start',
            width: '100%',
          }}
        >
          <ConnectivityMap />
          <DistrictSummaryCard />
        </div>
      </div>

      {/* 5. Route-wise Connectivity Data Table with Pagination */}
      <RouteConnectivityTable />
    </div>
  );
};

export default DistrictManagementPage;
