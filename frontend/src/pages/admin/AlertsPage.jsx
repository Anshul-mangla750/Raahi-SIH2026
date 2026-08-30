import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Filter,
  Plus,
  Radio,
  MapPin,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const AlertsPage = () => {
  const { alerts, openModal, addToast } = useApp();
  const [filterSeverity, setFilterSeverity] = useState('All');

  const filteredAlerts = alerts.filter(
    (a) => filterSeverity === 'All' || a.severity === filterSeverity
  );

  const handleResolveAlert = (id, title) => {
    addToast('Alert Resolved', `Alert "${title}" marked as resolved and broadcast updated.`, 'success');
  };

  return (
    <div className="alerts-page" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1>
            <Bell size={24} color="#EF4444" />
            Alerts & Notifications Command Center
          </h1>
          <p>Real-time incident dispatch, landslide triggers, and highway congestion management.</p>
        </div>

        <button className="btn btn-danger" onClick={() => openModal('createAlert')}>
          <Plus size={16} />
          <span>Broadcast New Alert</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>Filter Severity:</span>
          {['All', 'High', 'Medium', 'Low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`btn ${filterSeverity === sev ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '4px 12px', fontSize: '12px' }}
            >
              {sev}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Active Alerts: <strong>{filteredAlerts.length}</strong>
        </span>
      </div>

      {/* Alerts Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredAlerts.map((alert) => {
          const isHigh = alert.severity === 'High';
          const isMedium = alert.severity === 'Medium';

          return (
            <div
              key={alert.id}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                borderLeft: `5px solid ${isHigh ? '#EF4444' : isMedium ? '#F59E0B' : '#10B981'}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                <div style={{ marginTop: '2px' }}>
                  {isHigh ? (
                    <AlertOctagon size={22} color="#EF4444" />
                  ) : isMedium ? (
                    <AlertTriangle size={22} color="#F59E0B" />
                  ) : (
                    <CheckCircle2 size={22} color="#10B981" />
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {alert.title}
                    </span>
                    <span className={`badge badge-${alert.severityClass || 'medium'}`}>
                      {alert.severity} Severity
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} /> {alert.location || 'Northeast Corridor'}
                    </span>
                    <span>🕒 Reported at {alert.time}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-outline"
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                  onClick={() => handleResolveAlert(alert.id, alert.title)}
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
