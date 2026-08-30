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
    <div className="card">
      <div className="card-header" style={{ marginBottom: '12px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Alternative Routes</h2>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}></th>
              <th>Route Option</th>
              <th>Distance</th>
              <th>Time</th>
              <th>Est. Fuel Cost</th>
              <th>Tolls</th>
              <th>Stops</th>
              <th>Efficiency</th>
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
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'transparent',
                  }}
                >
                  <td>
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => handleSelectRoute(route)}
                      style={{ cursor: 'pointer', accentColor: '#059669' }}
                    />
                  </td>
                  <td style={{ fontWeight: 600, color: isSelected ? '#047857' : 'var(--text-primary)' }}>
                    {route.name}
                  </td>
                  <td>{route.distance}</td>
                  <td style={{ fontWeight: 600 }}>{route.time}</td>
                  <td style={{ color: '#047857', fontWeight: 600 }}>{route.fuelCost}</td>
                  <td>{route.tolls}</td>
                  <td>{route.stops}</td>
                  <td>
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
