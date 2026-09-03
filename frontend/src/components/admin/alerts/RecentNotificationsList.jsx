import React from 'react';
import { toast } from 'sonner';

export const RecentNotificationsList = () => {
  const notifications = [
    { text: 'New maintenance schedule generated', time: '10:28 AM' },
    { text: 'Route optimization completed successfully', time: '10:15 AM' },
    { text: 'Vehicle AS-01-EF-9012 reached destination', time: '09:55 AM' },
    { text: 'Fuel report generated for 20 May 2025', time: '09:30 AM' },
    { text: 'System backup completed successfully', time: '09:00 AM' },
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
        height: '100%',
      }}
    >
      {/* Header with Title and View All button */}
      <div
        className="card-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
          flexShrink: 0,
        }}
      >
        <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>
          Recent Notifications
        </h2>
        <button
          onClick={() => toast.info('All notifications history opened.')}
          style={{
            background: 'none',
            border: 'none',
            color: '#059669',
            fontSize: '11.5px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          View All
        </button>
      </div>

      {/* Notifications List */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '4px 0',
        }}
      >
        {notifications.map((item, idx) => {
          const isLast = idx === notifications.length - 1;

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '9px 0',
                borderBottom: isLast ? 'none' : '1px solid #F1F5F9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#059669',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '12px', color: '#334155', fontWeight: 500, lineHeight: 1.3 }}>
                  {item.text}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500, flexShrink: 0 }}>
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
