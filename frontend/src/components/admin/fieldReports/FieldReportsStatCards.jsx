import React from 'react';
import { FileText, ClipboardCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const FieldReportsStatCards = () => {
  const stats = [
    {
      title: 'Total Reports',
      value: '128',
      period: 'All Time',
      icon: FileText,
      iconColor: '#059669',
      iconBg: '#ECFDF5',
    },
    {
      title: 'Reports This Month',
      value: '36',
      period: '28% of total',
      icon: ClipboardCheck,
      iconColor: '#3B82F6',
      iconBg: '#EFF6FF',
    },
    {
      title: 'Resolved Reports',
      value: '78',
      period: '61% of total',
      icon: CheckCircle2,
      iconColor: '#8B5CF6',
      iconBg: '#F5F3FF',
    },
    {
      title: 'Pending Reports',
      value: '32',
      period: '25% of total',
      icon: Clock,
      iconColor: '#F97316',
      iconBg: '#FFF7ED',
    },
    {
      title: 'Overdue Reports',
      value: '8',
      period: 'Requires Attention',
      icon: AlertCircle,
      iconColor: '#EF4444',
      iconBg: '#FEF2F2',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '14px',
        width: '100%',
      }}
      className="field-reports-stat-grid"
    >
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;

        return (
          <div
            key={idx}
            className="card"
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
            {/* Left Icon */}
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

            {/* Right Metric Details */}
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
