import React from 'react';
import { Clock, Fuel } from 'lucide-react';
import { GaugeChart } from '../common/GaugeChart';
import { ROUTE_SUMMARY } from '@/data/admin/mockData';

export const RouteEfficiencyGauge = () => {
  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Route Efficiency</h2>
      </div>

      <GaugeChart
        value={92}
        max={100}
        label="Efficient"
        size={180}
        color="#047857"
      />

      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>You are saving</span>
        
        <div className="savings-card-row">
          <div className="saving-pill">
            <Clock size={20} color="#059669" />
            <div className="saving-pill-info">
              <span className="saving-pill-val">{ROUTE_SUMMARY.savingsTime}</span>
              <span className="saving-pill-label">Time</span>
            </div>
          </div>

          <div className="saving-pill">
            <Fuel size={20} color="#059669" />
            <div className="saving-pill-info">
              <span className="saving-pill-val">{ROUTE_SUMMARY.savingsFuel}</span>
              <span className="saving-pill-label">Fuel Cost</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
