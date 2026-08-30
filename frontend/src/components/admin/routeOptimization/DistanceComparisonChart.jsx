import React from 'react';
import { DISTANCE_COMPARISON } from '@/data/admin/mockData';

export const DistanceComparisonChart = () => {
  const maxDistance = 600;

  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Distance Comparison</h2>
      </div>

      <div style={{ position: 'relative' }}>
        {/* km label */}
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>km</div>

        <div className="dist-bar-chart">
          {DISTANCE_COMPARISON.map((item, index) => {
            const heightPercent = (item.distance / maxDistance) * 100;
            const isOptimized = item.isOptimized;
            const isShortest = item.isShortest;
            const isCurrent = item.isCurrent;

            return (
              <div key={index} className="dist-bar-col">
                <span className="dist-bar-value">{item.distance} km</span>
                <div
                  className={`dist-bar ${
                    isOptimized ? 'optimized' : isShortest ? 'shortest' : ''
                  }`}
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: isOptimized
                      ? '#047857'
                      : isShortest
                      ? '#6EE7B7'
                      : isCurrent
                      ? '#94A3B8'
                      : '#CBD5E1',
                  }}
                />
                <span className="dist-bar-label">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
