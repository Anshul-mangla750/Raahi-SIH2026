import React, { useState } from 'react';
import { Truck, ChevronRight, Search } from 'lucide-react';
import { LIVE_VEHICLES_LIST } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const LiveVehiclesTable = () => {
  const { openModal } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = LIVE_VEHICLES_LIST.filter(
    (v) =>
      v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header" style={{ marginBottom: '12px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Live Vehicles</h2>
        <button
          className="card-link"
          onClick={() => openModal('support', { topic: 'Fleet Vehicle Telematics' })}
        >
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Vehicle Feed List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
        {filteredVehicles.map((v) => {
          const isMoving = v.status === 'Moving';
          const isDelayed = v.status === 'Delayed';
          const isStopped = v.status === 'Stopped';

          const iconColor = isMoving ? '#059669' : isDelayed ? '#D97706' : isStopped ? '#EF4444' : '#64748B';
          const iconBg = isMoving ? '#ECFDF5' : isDelayed ? '#FFFBEB' : isStopped ? '#FEF2F2' : '#F1F5F9';

          return (
            <div
              key={v.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-card-alt)',
                gap: '12px',
              }}
            >
              {/* Left Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '150px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: iconBg,
                    color: iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Truck size={16} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {v.id}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{v.model}</span>
                </div>
              </div>

              {/* Driver name */}
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', minWidth: '90px' }}>
                {v.driver}
              </div>

              {/* Status Pill */}
              <span className={`badge badge-${v.statusClass}`}>
                {v.status}
              </span>

              {/* Speed */}
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', minWidth: '55px', textAlign: 'right' }}>
                {v.speed}
              </div>

              {/* Timestamp */}
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '55px', textAlign: 'right' }}>
                {v.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
