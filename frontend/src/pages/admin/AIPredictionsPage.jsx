import React from 'react';
import {
  Sparkles,
  AlertTriangle,
  CloudRain,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { DonutChart } from '@/components/admin/common/DonutChart';
import { AI_RISK_PREDICTIONS } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const AIPredictionsPage = () => {
  const { setCurrentPage } = useApp();

  const predictionsList = [
    {
      route: 'NH-13 (Jorhat → Pasighat)',
      riskLevel: 'Critical (88%)',
      cause: 'Landslide vulnerability triggered by 48mm continuous precipitation.',
      recommendation: 'Divert heavy commercial traffic via NH-15 North Bank route.',
      timeWindow: 'Next 6-12 hours',
      priority: 'high',
    },
    {
      route: 'NH-6 (Shillong → Silchar)',
      riskLevel: 'Moderate (62%)',
      cause: 'Mudflow risk near Sonapur tunnel zone.',
      recommendation: 'Enforce convoy speed limit of 25 km/h with spotters.',
      timeWindow: 'Next 12-24 hours',
      priority: 'medium',
    },
    {
      route: 'NH-2 (Dimapur → Kohima)',
      riskLevel: 'Moderate (54%)',
      cause: 'Water seepage on hill slopes near Chumukedima.',
      recommendation: 'Standby earthmoving machinery stationed at KM-42.',
      timeWindow: 'Next 24-48 hours',
      priority: 'medium',
    },
    {
      route: 'NH-27 (Guwahati → Nagaon)',
      riskLevel: 'Low (12%)',
      cause: 'Clear 4-lane bypass operational with normal drainage.',
      recommendation: 'Optimal primary transit corridor for heavy payloads.',
      timeWindow: 'Next 48 hours',
      priority: 'low',
    },
  ];

  return (
    <div className="ai-predictions-page" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1>
            <Sparkles size={24} color="#3B82F6" />
            AI Risk & Predictive Logistics Engine
          </h1>
          <p>Machine learning risk assessment powered by terrain sensors, IMD satellite telemetry, and historical road vulnerability models.</p>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid-3">
        <div className="card">
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Risk Distribution (24-48h)</h3>
          <DonutChart
            data={AI_RISK_PREDICTIONS.breakdown}
            total={AI_RISK_PREDICTIONS.totalRisks}
            totalLabel="Monitored Risks"
            size={140}
          />
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>AI Model Confidence</h3>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#047857', marginTop: '12px' }}>96.4%</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Trained on 10+ years of Northeast monsoon logistics, landslide telemetry, and road obstruction datasets.
            </p>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Last synced: 30 mins ago</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Proactive Reroute Actions</h3>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#2563EB', marginTop: '12px' }}>14 Routes</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Automated rerouting saved an estimated 38 fleet transit hours today.
            </p>
          </div>
          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '8px', fontSize: '12px' }}
            onClick={() => setCurrentPage('route-optimization')}
          >
            <span>Launch Route Optimizer</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Predictions Feed Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title" style={{ margin: 0 }}>High-Confidence Route Vulnerability Forecasts</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {predictionsList.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '16px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-card-alt)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.route}
                  </span>
                  <span className={`badge badge-${item.priority}`}>
                    {item.riskLevel}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {item.timeWindow}
                  </span>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                  <strong>Trigger:</strong> {item.cause}
                </p>

                <p style={{ fontSize: '12px', color: '#047857', margin: 0, fontWeight: 500 }}>
                  <strong>AI Recommendation:</strong> {item.recommendation}
                </p>
              </div>

              <button
                className="btn btn-outline"
                style={{ padding: '6px 12px', fontSize: '12px', flexShrink: 0 }}
                onClick={() => setCurrentPage('route-optimization')}
              >
                Apply Reroute
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
