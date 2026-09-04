import React, { useState } from 'react';
import {
  Users,
  Calendar,
  CloudSun,
  ShieldCheck,
  Search,
  CheckCircle,
  Truck,
  Award,
  Phone,
  Plus,
} from 'lucide-react';
import { DRIVER_KPIS, DRIVER_ROSTER } from '@/data/admin/driverManagementData';
import { toast } from 'sonner';

export const DriverManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredDrivers = DRIVER_ROSTER.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.assignedVehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.corridor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className="driver-management-page"
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
            <Users size={24} color="#059669" />
            Driver Management & Operations
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: '#64748B' }}>
            Track driver allocations, safety scoring, licensing compliance, and real-time duty roster.
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

      {/* 2. Driver KPI Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
      >
        {DRIVER_KPIS.map((kpi) => (
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
              minHeight: '94px',
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
                {kpi.id === 'total_drivers' && <Users size={16} />}
                {kpi.id === 'active_duty' && <CheckCircle size={16} />}
                {kpi.id === 'in_transit' && <Truck size={16} />}
                {kpi.id === 'safety_score' && <ShieldCheck size={16} />}
              </div>
            </div>

            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', lineHeight: 1.1, margin: '6px 0 2px' }}>
              {kpi.value}
            </div>

            <div style={{ fontSize: '10.5px', color: '#94A3B8' }}>
              {kpi.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Driver Roster Table */}
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
              Active Driver Roster
            </h3>
            <span style={{ fontSize: '11.5px', color: '#64748B' }}>
              Real-time driver credentials, assigned vehicles and safety compliance
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '4px 10px',
                width: '190px',
              }}
            >
              <Search size={14} color="#64748B" />
              <input
                type="text"
                placeholder="Search driver / vehicle..."
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
              <option value="On Route">On Route</option>
              <option value="Available">Available</option>
              <option value="Delayed">Delayed</option>
              <option value="Resting">Resting</option>
            </select>

            <button
              onClick={() => toast.info('Driver onboarding form opened.')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: '#059669',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Plus size={14} />
              <span>Add Driver</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '11.5px' }}>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Driver Name & ID</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Phone / Contact</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Assigned Vehicle</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Corridor / Route</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Safety Score</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Trips</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver, idx) => (
                <tr
                  key={driver.id}
                  style={{
                    borderBottom: idx === filteredDrivers.length - 1 ? 'none' : '1px solid #F1F5F9',
                  }}
                >
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{driver.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>{driver.id} • {driver.licenseNo}</div>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>{driver.phone}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#2563EB' }}>
                    {driver.assignedVehicle}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>{driver.corridor}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', minWidth: '28px' }}>
                        {driver.safetyScore}%
                      </span>
                      <div style={{ width: '60px', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${driver.safetyScore}%`,
                            height: '100%',
                            backgroundColor: driver.safetyScore >= 90 ? '#10B981' : driver.safetyScore >= 80 ? '#F59E0B' : '#EF4444',
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0F172A' }}>
                    {driver.tripsCompleted}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor:
                          driver.status === 'On Route'
                            ? '#DCFCE7'
                            : driver.status === 'Available'
                            ? '#EFF6FF'
                            : driver.status === 'Delayed'
                            ? '#FEF3C7'
                            : '#F1F5F9',
                        color:
                          driver.status === 'On Route'
                            ? '#15803D'
                            : driver.status === 'Available'
                            ? '#2563EB'
                            : driver.status === 'Delayed'
                            ? '#D97706'
                            : '#475569',
                      }}
                    >
                      {driver.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverManagementPage;
