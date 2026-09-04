import React, { useState } from 'react';
import {
  Fuel,
  Calendar,
  CloudSun,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  DollarSign,
  Gauge,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  FUEL_KPIS,
  VEHICLE_FUEL_ROSTER,
  FUEL_ANOMALY_ALERTS,
  FUEL_MONTHLY_TREND,
} from '@/data/admin/fuelManagementData';
import { toast } from 'sonner';

export const FuelManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredVehicles = VEHICLE_FUEL_ROSTER.filter((v) => {
    const matchesSearch =
      v.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className="fuel-management-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        paddingBottom: '24px',
      }}
    >
      {/* 1. Header with Title, Subtitle, Date & Weather Cards */}
      <div
        className="page-header-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div className="page-title-group">
          <h1
            style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: 800,
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Fuel size={24} color="#059669" />
            Fuel Management & Telemetry
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: '#64748B' }}>
            Monitor fleet fuel consumption, fuel economy metrics, expenses and detect anomalous tank drains.
          </p>
        </div>

        <div className="header-widgets-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#ffffff',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '8px 14px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
            }}
          >
            <Calendar size={18} color="#0F172A" />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                21 May 2025
              </span>
              <span style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
                Wednesday, 10:30 AM
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#ffffff',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '8px 14px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
            }}
          >
            <CloudSun size={20} color="#F59E0B" />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                24°C
              </span>
              <span style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
                Guwahati
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Fuel KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
      >
        {FUEL_KPIS.map((kpi) => (
          <div
            key={kpi.id}
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              padding: '16px 18px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '100px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                {kpi.label}
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: kpi.bgColor,
                  color: kpi.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {kpi.id === 'fuel_consumed' && <Fuel size={16} />}
                {kpi.id === 'fuel_expense' && <DollarSign size={16} />}
                {kpi.id === 'avg_efficiency' && <Gauge size={16} />}
                {kpi.id === 'active_alerts' && <AlertTriangle size={16} />}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', lineHeight: 1.1, margin: '6px 0 2px' }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>
                {kpi.trend}
              </div>
            </div>

            <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '6px' }}>
              {kpi.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Grid: Table on Left (~68%), Right Side Anomaly Alerts & Trends (~32%) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr',
          gap: '16px',
          alignItems: 'start',
        }}
      >
        {/* Left Side: Vehicle Fuel Roster Table */}
        <div
          className="card"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            overflow: 'hidden',
          }}
        >
          {/* Table Header Controls */}
          <div
            style={{
              padding: '16px',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                Vehicle Fuel Economy Roster
              </h3>
              <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                Real-time tank telemetry & efficiency monitoring
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Search */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  width: '180px',
                }}
              >
                <Search size={14} color="#64748B" />
                <input
                  type="text"
                  placeholder="Search vehicle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '12px',
                    width: '100%',
                  }}
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  height: '32px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#ffffff',
                  fontSize: '12px',
                  color: '#334155',
                  padding: '0 8px',
                  outline: 'none',
                }}
              >
                <option value="All">All Status</option>
                <option value="Optimal">Optimal</option>
                <option value="Low Efficiency">Low Efficiency</option>
                <option value="Anomaly Detected">Anomaly Detected</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '11.5px' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 600 }}>Vehicle & Driver</th>
                  <th style={{ padding: '10px 14px', fontWeight: 600 }}>Model</th>
                  <th style={{ padding: '10px 14px', fontWeight: 600 }}>Tank Level</th>
                  <th style={{ padding: '10px 14px', fontWeight: 600 }}>Efficiency</th>
                  <th style={{ padding: '10px 14px', fontWeight: 600 }}>Month Consumed</th>
                  <th style={{ padding: '10px 14px', fontWeight: 600 }}>Cost</th>
                  <th style={{ padding: '10px 14px', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((row, idx) => (
                  <tr
                    key={row.vehicleId}
                    style={{
                      borderBottom: idx === filteredVehicles.length - 1 ? 'none' : '1px solid #F1F5F9',
                    }}
                  >
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{row.vehicleId}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{row.driver}</div>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>{row.model}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', minWidth: '30px' }}>
                          {row.fuelLevel}%
                        </span>
                        <div style={{ width: '60px', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${row.fuelLevel}%`,
                              height: '100%',
                              backgroundColor: row.fuelLevel < 25 ? '#EF4444' : row.fuelLevel < 50 ? '#F59E0B' : '#10B981',
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>
                      {row.efficiency}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#334155' }}>{row.consumedL}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0F172A' }}>{row.totalCost}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor:
                            row.status === 'Optimal'
                              ? '#DCFCE7'
                              : row.status === 'Low Efficiency'
                              ? '#FEF3C7'
                              : '#FEE2E2',
                          color:
                            row.status === 'Optimal'
                              ? '#15803D'
                              : row.status === 'Low Efficiency'
                              ? '#D97706'
                              : '#DC2626',
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Fuel Anomaly Alerts & Benchmark */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Anomaly Alerts Card */}
          <div
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} color="#DC2626" />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                  Fuel Anomaly & Drain Alerts
                </h3>
              </div>
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#DC2626', backgroundColor: '#FEE2E2', padding: '2px 6px', borderRadius: '4px' }}>
                2 Active
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {FUEL_ANOMALY_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FEE2E2',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B' }}>
                      {alert.vehicleId}
                    </span>
                    <span style={{ fontSize: '10px', color: '#B91C1C' }}>{alert.time}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#7F1D1D', lineHeight: 1.35 }}>
                    {alert.issue}
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>📍 {alert.location}</span>
                    <button
                      onClick={() => toast.success(`Flagged ${alert.vehicleId} for workshop telemetry inspection`)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #FCA5A5',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: '#DC2626',
                        cursor: 'pointer',
                      }}
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Progression Card */}
          <div
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
              Monthly Fleet Economy Trend
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {FUEL_MONTHLY_TREND.map((item) => (
                <div key={item.month} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ fontWeight: 600, color: '#475569', minWidth: '32px' }}>{item.month}</span>
                  <span style={{ color: '#0F172A' }}>{item.consumption.toLocaleString()} L</span>
                  <span style={{ fontWeight: 700, color: '#059669' }}>{item.efficiency} km/L</span>
                  <span style={{ color: '#64748B' }}>₹{item.cost}L</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelManagementPage;
