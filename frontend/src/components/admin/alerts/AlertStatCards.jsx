import React from 'react';
import { AlertTriangle, ShieldAlert, Bell, CheckCircle2, Eye } from 'lucide-react';

export const AlertStatCards = () => {
  const stats = [
    {
      title: 'Total Alerts',
      value: '28',
      period: 'All Time',
      icon: AlertTriangle,
      iconColor: '#EF4444',
      iconBg: '#FEF2F2',
      borderAccent: 'rgba(239, 68, 68, 0.15)',
    },
    {
      title: 'Critical Alerts',
      value: '8',
      period: 'Requires Immediate Action',
      icon: ShieldAlert,
      iconColor: '#EF4444',
      iconBg: '#FEF2F2',
      borderAccent: 'rgba(239, 68, 68, 0.15)',
    },
    {
      title: 'Active Alerts',
      value: '12',
      period: 'Currently Active',
      icon: Bell,
      iconColor: '#F97316',
      iconBg: '#FFF7ED',
      borderAccent: 'rgba(249, 115, 22, 0.15)',
    },
    {
      title: 'Resolved Alerts',
      value: '16',
      period: 'This Month',
      icon: CheckCircle2,
      iconColor: '#10B981',
      iconBg: '#ECFDF5',
      borderAccent: 'rgba(16, 185, 129, 0.15)',
    },
    {
      title: 'Acknowledged',
      value: '20',
      period: 'This Month',
      icon: Eye,
      iconColor: '#3B82F6',
      iconBg: '#EFF6FF',
      borderAccent: 'rgba(59, 130, 246, 0.15)',
    },
  ];

  return (
    <div
      className="alert-stat-cards-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '14px',
        width: '100%',
      }}
    >
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;

        return (
          <div
            key={idx}
            className="card alert-stat-card"
            style={{
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            }}
          >
            {/* Icon Box */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: stat.iconBg,
                color: stat.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconComponent size={22} />
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span
                style={{
                  fontSize: '11.5px',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {stat.title}
              </span>
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                  margin: '2px 0',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: '10.5px',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {stat.period}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
