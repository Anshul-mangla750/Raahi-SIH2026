import React from 'react';
import { Calendar, CloudSun } from 'lucide-react';

export const EmergencyHeader = () => {
  return (
    <div
      className="emergency-header-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        width: '100%',
      }}
    >
      {/* Title & Subtitle */}
      <div className="page-title-group">
        <h1
          style={{
            margin: 0,
            fontSize: '22px',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.02em',
          }}
        >
          Emergency
        </h1>
        <p
          style={{
            margin: '4px 0 0 0',
            fontSize: '12.5px',
            color: '#64748B',
          }}
        >
          View current emergencies on routes and find alternative routes.
        </p>
      </div>

      {/* Right Side Date and Weather Widgets */}
      <div
        className="header-widgets-group"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Date Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#ffffff',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '8px 14px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
          }}
        >
          <Calendar size={18} color="#0F172A" />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
              21 May 2025
            </span>
            <span style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
              Wednesday,10:30 AM
            </span>
          </div>
        </div>

        {/* Weather Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#ffffff',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '8px 14px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
          }}
        >
          <CloudSun size={20} color="#F59E0B" />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              24°C
            </span>
            <span style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
              Guwahati
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
