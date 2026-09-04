import React from 'react';
import { Calendar } from 'lucide-react';
import { DISTRICT_SUMMARY_DATA } from '@/data/admin/districtManagementData';

export const DistrictSummaryCard = () => {
  const rows = [
    {
      label: 'District',
      value: DISTRICT_SUMMARY_DATA.district,
      isBold: true,
      hasCalendar: false,
    },
    {
      label: 'Total Roads (KM)',
      value: DISTRICT_SUMMARY_DATA.totalRoads,
      isBold: false,
      hasCalendar: false,
    },
    {
      label: 'Population',
      value: DISTRICT_SUMMARY_DATA.population,
      isBold: false,
      hasCalendar: false,
    },
    {
      label: 'Area',
      value: DISTRICT_SUMMARY_DATA.area,
      isBold: true,
      hasCalendar: false,
    },
    {
      label: 'Last Updated',
      value: DISTRICT_SUMMARY_DATA.lastUpdated,
      isBold: false,
      hasCalendar: true,
    },
  ];

  return (
    <div
      className="card"
      style={{
        height: '370px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        padding: '18px 22px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Title */}
      <h3
        style={{
          margin: '0 0 10px 0',
          fontSize: '14.5px',
          fontWeight: 700,
          color: '#0F172A',
        }}
      >
        District Summary
      </h3>

      {/* Rows with subtle dividers */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-around' }}>
        {rows.map((row, index) => {
          const isLast = index === rows.length - 1;
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: isLast ? 'none' : '1px solid #F1F5F9',
              }}
            >
              {/* Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                {row.hasCalendar && <Calendar size={15} color="#64748B" />}
                <span style={{ fontSize: '12.5px', fontWeight: 500 }}>{row.label}</span>
              </div>

              {/* Value */}
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: row.isBold ? 700 : 500,
                  color: '#0F172A',
                }}
              >
                {row.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
