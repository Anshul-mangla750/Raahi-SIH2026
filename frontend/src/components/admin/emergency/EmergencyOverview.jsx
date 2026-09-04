import React from 'react';
import { Route, MapPin, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { FloodHouseIcon } from './FloodHouseIcon';

export const EmergencyOverview = () => {
  const details = [
    {
      icon: Route,
      label: 'Affected Route',
      value: 'NH-27, Guwahati → Tezpur',
      isBold: false,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Near Kolia Bhomora Bridge, Assam',
      isBold: false,
    },
    {
      icon: Calendar,
      label: 'Reported On',
      value: '21 May 2025, 08:45 AM',
      isBold: false,
    },
    {
      icon: Clock,
      label: 'Expected Clearance',
      value: '21 May 2025, 06:00 PM',
      isBold: false,
    },
    {
      icon: ShieldCheck,
      label: 'Reported By',
      value: 'System Alert',
      isBold: true,
    },
  ];

  return (
    <div
      className="emergency-overview-card card"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        padding: '18px 24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
      }}
    >
      {/* Title */}
      <h2
        style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: 700,
          color: '#0F172A',
        }}
      >
        Emergency Overview
      </h2>

      {/* Main Grid: Left flood summary & Right detail attributes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1px 1.4fr',
          gap: '28px',
          alignItems: 'center',
        }}
      >
        {/* Left Side: Large Flood Icon & Details */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Icon Box */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '10px',
              backgroundColor: '#FEF2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: '1px solid #FEE2E2',
            }}
          >
            <FloodHouseIcon size={38} color="#EF4444" />
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  letterSpacing: '0.01em',
                }}
              >
                Active
              </span>
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: '22px',
                fontWeight: 800,
                color: '#0F172A',
                lineHeight: 1.2,
              }}
            >
              Flood
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: '12.5px',
                color: '#64748B',
                lineHeight: 1.4,
              }}
            >
              Heavy rainfall has caused flooding on the route.
            </p>
          </div>
        </div>

        {/* Subtle Vertical Divider */}
        <div
          style={{
            width: '1px',
            height: '100%',
            minHeight: '110px',
            backgroundColor: '#F1F5F9',
          }}
        />

        {/* Right Side: Emergency Info List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '11px',
            width: '100%',
          }}
        >
          {details.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '170px 1fr',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '12.5px',
                }}
              >
                {/* Label with icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                  <IconComp size={15} color="#475569" style={{ flexShrink: 0 }} />
                  <span style={{ fontWeight: 500 }}>{item.label}</span>
                </div>

                {/* Value */}
                <div
                  style={{
                    color: item.isBold ? '#0F172A' : '#1E293B',
                    fontWeight: item.isBold ? 700 : 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
