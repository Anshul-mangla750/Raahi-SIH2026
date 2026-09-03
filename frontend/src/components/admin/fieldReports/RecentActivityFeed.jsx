import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Construction,
  CloudRain,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const RecentActivityFeed = () => {
  const { setCurrentPage } = useApp();

  const activities = [
    {
      id: 1,
      icon: AlertTriangle,
      color: '#EF4444',
      text: 'New road damage reported on NH-27, Tezpur',
      time: '10:15 AM',
    },
    {
      id: 2,
      icon: CheckCircle2,
      color: '#10B981',
      text: 'Traffic jam report on NH-37 resolved',
      time: '09:45 AM',
    },
    {
      id: 3,
      icon: Clock,
      color: '#F97316',
      text: 'Accident reported on NH-27, Dhekiakjuli',
      time: '09:20 AM',
    },
    {
      id: 4,
      icon: Construction,
      color: '#8B5CF6',
      text: 'Road block reported on NH-2, Diphu',
      time: '08:50 AM',
    },
    {
      id: 5,
      icon: CloudRain,
      color: '#3B82F6',
      text: 'Weather issue reported on NH-37, Hojai',
      time: '08:30 AM',
    },
  ];

  return (
    <div
      className="card"
      style={{
        padding: '16px 18px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Recent Activity
          </h2>
          <button
            onClick={() => setCurrentPage('alerts')}
            style={{
              background: 'none',
              border: 'none',
              color: '#059669',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            View All
          </button>
        </div>

        {/* List of 5 rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activities.map((act, idx) => {
            const Icon = act.icon;
            const isLast = idx === activities.length - 1;

            return (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '9px 0',
                  borderBottom: isLast ? 'none' : '1px solid #F1F5F9',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <Icon size={16} color={act.color} style={{ flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: '11.5px',
                      color: '#334155',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {act.text}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500, flexShrink: 0 }}>
                  {act.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Button */}
      <div style={{ marginTop: '14px' }}>
        <button
          onClick={() => setCurrentPage('alerts')}
          style={{
            width: '100%',
            padding: '7px 16px',
            backgroundColor: '#ffffff',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            fontSize: '11.5px',
            fontWeight: 600,
            color: '#334155',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
          }}
          className="btn-export-outline"
        >
          View All Activity
        </button>
      </div>
    </div>
  );
};
