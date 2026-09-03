import React from 'react';
import { ROUTE_SUMMARY } from '@/data/admin/mockData';

export const RouteSequenceTimeline = () => {
  const sequenceStops = [
    { id: 'S', type: 'start', title: 'Start', location: 'Guwahati, Assam', time: '08:00AM', badgeBg: '#047857' },
    { id: '1', type: 'stop', title: 'Jorhat, Assam', distance: '104 km • 1h 45m', time: '09:45 AM', badgeBg: '#2563EB' },
    { id: '2', type: 'stop', title: 'Nagaon, Assam', distance: '84 km • 1h 15m', time: '11:30 AM', badgeBg: '#7C3AED' },
    { id: '3', type: 'stop', title: 'Hojai, Assam', distance: '98 km • 1h 10m', time: '01:00 PM', badgeBg: '#EA580C' },
    { id: '4', type: 'stop', title: 'Shillong, Meghalaya', distance: '91 km • 1h 20m', time: '02:20 PM', badgeBg: '#DC2626' },
    { id: '5', type: 'stop', title: 'Dimapur, Nagaland', distance: '86 km • 1h 05m', time: '04:30 PM', badgeBg: '#059669' },
    { id: '6', type: 'stop', title: 'Tezpur, Assam', distance: '71 km • 55m', time: '05:35 PM', badgeBg: '#059669' },
    { id: 'E', type: 'end', title: 'End', location: 'Guwahati, Assam', time: '06:45 PM', badgeBg: '#047857' },
  ];

  return (
    <div className="card route-summary-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '460px' }}>
      {/* Top Header */}
      <div className="card-header" style={{ marginBottom: '12px', flexShrink: 0 }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>Optimized Route Summary</h2>
      </div>

      {/* 4 Summary Metric Boxes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '14px', flexShrink: 0 }}>
        <div style={{ padding: '8px 4px', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Total Distance</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>
            {ROUTE_SUMMARY.totalDistance}
          </div>
        </div>

        <div style={{ padding: '8px 4px', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Total Time</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>
            {ROUTE_SUMMARY.totalTime}
          </div>
        </div>

        <div style={{ padding: '8px 4px', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Est. Fuel Cost</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>
            {ROUTE_SUMMARY.fuelCost}
          </div>
        </div>

        <div style={{ padding: '8px 4px', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Stops</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>
            {ROUTE_SUMMARY.stops}
          </div>
        </div>
      </div>

      {/* Subheading: Route Sequence */}
      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', flexShrink: 0 }}>
        Route Sequence
      </div>

      {/* Vertical Sequence Timeline */}
      <div className="route-timeline-compact" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        {sequenceStops.map((stop, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              padding: '3px 0',
              zIndex: 2,
            }}
          >
            {/* Connecting Vertical Track Line */}
            {idx < sequenceStops.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '16px',
                  bottom: '-16px',
                  width: '2px',
                  backgroundColor: '#E2E8F0',
                  zIndex: -1,
                }}
              />
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              {/* Circular Badge */}
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: stop.badgeBg,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 800,
                  flexShrink: 0,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              >
                {stop.id}
              </div>

              {/* Stop Info */}
              <div style={{ lineHeight: 1.2, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {stop.title}
                  </span>
                  {stop.location && (
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {stop.location}
                    </span>
                  )}
                </div>
                {stop.distance && (
                  <div style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>
                    {stop.distance}
                  </div>
                )}
              </div>
            </div>

            {/* Time on Right */}
            <div style={{ fontSize: '10.5px', fontWeight: 500, color: 'var(--text-muted)', flexShrink: 0 }}>
              {stop.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
