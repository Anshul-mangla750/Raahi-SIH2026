import React, { useState } from 'react';
import { ALTERNATIVE_ROUTES } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const AlternativeRoutesTable = () => {
  const { addToast } = useApp();
  const [selectedRouteId, setSelectedRouteId] = useState('opt');

  const handleSelectRoute = (route) => {
    setSelectedRouteId(route.id);
    addToast('Route Selected', `Switched active plan to "${route.name}".`, 'info');
  };

  return (
    <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header" style={{ marginBottom: '10px', flexShrink: 0 }}>
        <h2 className="card-title" style={{ margin: 0, fontSize: '15px' }}>Alternative Routes</h2>
      </div>

      <div style={{ flex: 1, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E2E8F0', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600 }}>
              <th style={{ width: '32px', padding: '8px 4px' }}></th>
              <th style={{ padding: '8px 8px' }}>Route Option</th>
              <th style={{ padding: '8px 8px' }}>Distance</th>
              <th style={{ padding: '8px 8px' }}>Time</th>
              <th style={{ padding: '8px 8px' }}>Est. Fuel Cost</th>
              <th style={{ padding: '8px 8px' }}>Tolls</th>
              <th style={{ padding: '8px 8px' }}>Stops</th>
              <th style={{ padding: '8px 8px' }}>Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {ALTERNATIVE_ROUTES.map((route) => {
              const isSelected = selectedRouteId === route.id;

              return (
                <tr
                  key={route.id}
                  onClick={() => handleSelectRoute(route)}
                  style={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: isSelected ? '#F0FDF4' : 'transparent',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  <td style={{ padding: '9px 4px', textAlign: 'center' }}>
                    <div
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        border: isSelected ? '4px solid #059669' : '1.5px solid #CBD5E1',
                        backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                        display: 'inline-block',
                        verticalAlign: 'middle',
                      }}
                    />
                  </td>
                  <td style={{ padding: '9px 8px', fontWeight: 600, color: isSelected ? '#047857' : 'var(--text-primary)' }}>
                    {route.name}
                  </td>
                  <td style={{ padding: '9px 8px', color: 'var(--text-secondary)' }}>{route.distance}</td>
                  <td style={{ padding: '9px 8px', fontWeight: 600, color: 'var(--text-primary)' }}>{route.time}</td>
                  <td style={{ padding: '9px 8px', color: '#047857', fontWeight: 600 }}>{route.fuelCost}</td>
                  <td style={{ padding: '9px 8px', color: 'var(--text-secondary)' }}>{route.tolls}</td>
                  <td style={{ padding: '9px 8px', color: 'var(--text-secondary)' }}>{route.stops}</td>
                  <td style={{ padding: '9px 8px' }}>
                    <span
                      style={{
                        color: Number(route.efficiency.replace('%', '')) >= 90 ? '#059669' : '#D97706',
                        fontWeight: 700,
                      }}
                    >
                      {route.efficiency}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
