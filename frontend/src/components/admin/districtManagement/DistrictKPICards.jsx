import React from 'react';
import { Network, XCircle } from 'lucide-react';
import { RoadPerspectiveIcon, RoadBarrierIcon } from './RoadPerspectiveIcon';
import { DISTRICT_KPI_STATS } from '@/data/admin/districtManagementData';

export const DistrictKPICards = () => {
  const renderIcon = (type, color) => {
    switch (type) {
      case 'road':
        return <RoadPerspectiveIcon size={24} color={color} />;
      case 'network':
        return <Network size={22} color={color} />;
      case 'warning':
        return <RoadBarrierIcon size={24} color={color} />;
      case 'danger':
        return <XCircle size={24} color={color} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="district-kpi-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        width: '100%',
      }}
    >
      {DISTRICT_KPI_STATS.map((card) => (
        <div
          key={card.id}
          className="card"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '14px 18px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            minHeight: '84px',
          }}
        >
          {/* Icon Box */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: card.theme.iconBg,
              border: `1px solid ${card.theme.iconBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {renderIcon(card.type, card.theme.iconColor)}
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B' }}>
              {card.label}
            </span>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#0F172A',
                lineHeight: 1.1,
                margin: '2px 0',
              }}
            >
              {card.value}
            </span>
            <span style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 500 }}>
              {card.supportingText}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
