import React from 'react';
import { Clock, Route, IndianRupee, MapPin } from 'lucide-react';
import { ROUTE_SEQUENCE, ROUTE_SUMMARY } from '@/data/admin/mockData';

export const RouteSequenceTimeline = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Optimized Route Summary Card */}
      <div className="card">
        <div className="card-header" style={{ marginBottom: '16px' }}>
          <h2 className="card-title" style={{ margin: 0 }}>Optimized Route Summary</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--bg-card-alt)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Distance</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: 4 }}>
              {ROUTE_SUMMARY.totalDistance}
            </div>
          </div>

          <div style={{ padding: '12px', backgroundColor: 'var(--bg-card-alt)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Time</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: 4 }}>
              {ROUTE_SUMMARY.totalTime}
            </div>
          </div>

          <div style={{ padding: '12px', backgroundColor: 'var(--bg-card-alt)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Est. Fuel Cost</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#047857', marginTop: 4 }}>
              {ROUTE_SUMMARY.fuelCost}
            </div>
          </div>

          <div style={{ padding: '12px', backgroundColor: 'var(--bg-card-alt)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Stops</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: 4 }}>
              {ROUTE_SUMMARY.stops}
            </div>
          </div>
        </div>
      </div>

      {/* Chronological Route Sequence Timeline */}
      <div className="card">
        <div className="card-header" style={{ marginBottom: '16px' }}>
          <h2 className="card-title" style={{ margin: 0 }}>Route Sequence</h2>
        </div>

        <div className="route-sequence-list">
          {ROUTE_SEQUENCE.map((seq, i) => {
            const isStart = seq.id === 'S';
            const isEnd = seq.id === 'E';

            return (
              <div key={i} className="route-sequence-item">
                <div
                  className={`sequence-badge ${
                    isStart ? 'start' : isEnd ? 'end' : ''
                  }`}
                >
                  {seq.id}
                </div>

                <div className="sequence-details">
                  <div>
                    <div className="sequence-location">{seq.name}</div>
                    <div className="sequence-distance">{seq.distance}</div>
                  </div>

                  <div className="sequence-time">{seq.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
