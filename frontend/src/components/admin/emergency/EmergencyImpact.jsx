import React from 'react';
import { Ban, AlertTriangle, Maximize2, Truck, Clock } from 'lucide-react';

export const EmergencyImpact = () => {
  const impacts = [
    {
      icon: Ban,
      label: 'Traffic Status',
      value: 'Blocked',
      color: '#0F172A',
      isBold: true,
    },
    {
      icon: AlertTriangle,
      label: 'Severity',
      value: 'High',
      color: '#DC2626',
      isBold: true,
    },
    {
      icon: Maximize2,
      label: 'Affected Distance',
      value: '12.5 km',
      color: '#1E293B',
      isBold: false,
    },
    {
      icon: Truck,
      label: 'Vehicles Affected',
      value: '24',
      color: '#1E293B',
      isBold: false,
    },
    {
      icon: Clock,
      label: 'Last Updated',
      value: '21 May 2025, 10:15 AM',
      color: '#1E293B',
      isBold: false,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {/* Title */}
      <h2
        style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: 700,
          color: '#0F172A',
        }}
      >
        Emergency Impact
      </h2>

      {/* Card Container aligned with map height */}
      <div
        className="card"
        style={{
          height: '350px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          padding: '16px 20px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        {impacts.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === impacts.length - 1;
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748B' }}>
                <Icon size={16} color="#475569" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '13px', fontWeight: 500 }}>{item.label}</span>
              </div>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: item.isBold ? 700 : 500,
                  color: item.color,
                }}
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
