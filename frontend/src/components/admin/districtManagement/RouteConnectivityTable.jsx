import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ROUTE_CONNECTIVITY_DATA } from '@/data/admin/districtManagementData';

export const RouteConnectivityTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Good':
        return {
          backgroundColor: '#DCFCE7',
          color: '#15803D',
        };
      case 'Moderate':
        return {
          backgroundColor: '#FEF3C7',
          color: '#D97706',
        };
      case 'Poor':
        return {
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
        };
      default:
        return {
          backgroundColor: '#F1F5F9',
          color: '#475569',
        };
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'Good':
        return '#10B981';
      case 'Moderate':
        return '#F59E0B';
      case 'Poor':
        return '#EF4444';
      default:
        return '#64748B';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
      {/* Title */}
      <h2
        style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: 700,
          color: '#0F172A',
        }}
      >
        Route-wise Connectivity
      </h2>

      {/* Table Card Container */}
      <div
        className="card"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
          overflow: 'hidden',
        }}
      >
        {/* Table wrapper for mobile responsiveness */}
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '12.5px',
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid #E2E8F0',
                  color: '#64748B',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  backgroundColor: '#FAFAFA',
                }}
              >
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Route Name</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Route Type</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>From</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>To</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Total Distance</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Accessibility Status</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Accessibility (%)</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {ROUTE_CONNECTIVITY_DATA.map((row, idx) => {
                const isLast = idx === ROUTE_CONNECTIVITY_DATA.length - 1;
                const statusStyle = getStatusBadgeStyle(row.status);
                const progressColor = getProgressColor(row.status);

                return (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: isLast ? 'none' : '1px solid #F1F5F9',
                      transition: 'background-color 0.1s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {/* Route Name */}
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0F172A' }}>
                      {row.name}
                    </td>

                    {/* Route Type */}
                    <td style={{ padding: '12px 16px', color: '#64748B' }}>
                      {row.type}
                    </td>

                    {/* From */}
                    <td style={{ padding: '12px 16px', color: '#334155' }}>
                      {row.from}
                    </td>

                    {/* To */}
                    <td style={{ padding: '12px 16px', color: '#334155' }}>
                      {row.to}
                    </td>

                    {/* Total Distance */}
                    <td style={{ padding: '12px 16px', color: '#0F172A', fontWeight: 500 }}>
                      {row.distance}
                    </td>

                    {/* Accessibility Status Badge */}
                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: '4px',
                          ...statusStyle,
                        }}
                      >
                        {row.status}
                      </span>
                    </td>

                    {/* Accessibility (%) with thin progress bar */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ minWidth: '32px', color: '#334155', fontWeight: 500 }}>
                          {row.accessibilityPct}%
                        </span>
                        <div
                          style={{
                            width: '75px',
                            height: '5px',
                            backgroundColor: '#E2E8F0',
                            borderRadius: '3px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${row.accessibilityPct}%`,
                              height: '100%',
                              backgroundColor: progressColor,
                              borderRadius: '3px',
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Last Updated */}
                    <td style={{ padding: '12px 16px', color: '#64748B', fontSize: '12px' }}>
                      {row.lastUpdated}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderTop: '1px solid #F1F5F9',
            backgroundColor: '#ffffff',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {/* Record Count */}
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Showing 1 to 5 of 24 routes
          </span>

          {/* Pagination Controls matching screenshot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '4px',
                color: '#64748B',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.6 : 1,
              }}
            >
              <ChevronLeft size={14} />
            </button>

            {/* Page 1 (Active, green) */}
            <button
              onClick={() => setCurrentPage(1)}
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: currentPage === 1 ? '#15803D' : '#ffffff',
                border: currentPage === 1 ? 'none' : '1px solid #E2E8F0',
                borderRadius: '4px',
                color: currentPage === 1 ? '#ffffff' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              1
            </button>

            {/* Page 2 */}
            <button
              onClick={() => setCurrentPage(2)}
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: currentPage === 2 ? '#15803D' : '#ffffff',
                border: currentPage === 2 ? 'none' : '1px solid #E2E8F0',
                borderRadius: '4px',
                color: currentPage === 2 ? '#ffffff' : '#334155',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              2
            </button>

            {/* Page 3 */}
            <button
              onClick={() => setCurrentPage(3)}
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: currentPage === 3 ? '#15803D' : '#ffffff',
                border: currentPage === 3 ? 'none' : '1px solid #E2E8F0',
                borderRadius: '4px',
                color: currentPage === 3 ? '#ffffff' : '#334155',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              3
            </button>

            {/* Ellipsis */}
            <span style={{ fontSize: '12px', color: '#94A3B8', padding: '0 4px' }}>
              ...
            </span>

            {/* Page 5 */}
            <button
              onClick={() => setCurrentPage(5)}
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: currentPage === 5 ? '#15803D' : '#ffffff',
                border: currentPage === 5 ? 'none' : '1px solid #E2E8F0',
                borderRadius: '4px',
                color: currentPage === 5 ? '#ffffff' : '#334155',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              5
            </button>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
              disabled={currentPage === 5}
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '4px',
                color: '#64748B',
                cursor: currentPage === 5 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 5 ? 0.6 : 1,
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
