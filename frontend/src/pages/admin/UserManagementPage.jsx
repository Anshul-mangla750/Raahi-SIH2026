import React, { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  CloudSun,
  Users,
  UserCheck,
  Search,
  Plus,
  Mail,
  MoreVertical,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

export const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const usersList = [
    {
      id: 'USR-001',
      name: 'Admin User (You)',
      email: 'admin.raahi@gov.in',
      role: 'Government Administrator',
      roleClass: 'badge-high',
      region: 'All North Eastern States',
      status: 'Active',
      lastActive: 'Just now',
    },
    {
      id: 'USR-002',
      name: 'Dr. B. K. Sarma',
      email: 'bk.sarma@assam.gov.in',
      role: 'District Officer',
      roleClass: 'badge-medium',
      region: 'Kamrup Metropolitan & Darrang',
      status: 'Active',
      lastActive: '12 mins ago',
    },
    {
      id: 'USR-003',
      name: 'Debashish Sharma',
      email: 'debashish.s@nerlogi.in',
      role: 'Regional Dispatcher',
      roleClass: 'badge-low',
      region: 'Guwahati Freight Central',
      status: 'Active',
      lastActive: '1 hour ago',
    },
    {
      id: 'USR-004',
      name: 'Anamika Hazarika',
      email: 'anamika.h@nerlogi.in',
      role: 'Disaster Relief Coordinator',
      roleClass: 'badge-medium',
      region: 'Tezpur & Sonitpur Command',
      status: 'Active',
      lastActive: '3 hours ago',
    },
    {
      id: 'USR-005',
      name: 'T. L. Jamir',
      email: 'tl.jamir@nagaland.gov.in',
      role: 'District Officer',
      roleClass: 'badge-medium',
      region: 'Kohima & Dimapur Corridor',
      status: 'Active',
      lastActive: 'Yesterday',
    },
    {
      id: 'USR-006',
      name: 'Sanjeev Roy',
      email: 'sanjeev.roy@nerlogi.in',
      role: 'Fleet Inspector',
      roleClass: 'badge-low',
      region: 'Silchar & Cachar Terminal',
      status: 'Inactive',
      lastActive: '3 days ago',
    },
  ];

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div
      className="user-management-page"
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
            <ShieldCheck size={24} color="#059669" />
            User & Personnel Management
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: '#64748B' }}>
            Manage administrative roles, regional officer assignments, access levels and security permissions.
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

      {/* 2. User KPI Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
      >
        <div className="card" style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Total Personnel</span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '6px 0 2px' }}>28</div>
          <span style={{ fontSize: '10.5px', color: '#059669', fontWeight: 600 }}>Active across 7 states</span>
        </div>
        <div className="card" style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Government Admins</span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '6px 0 2px' }}>6</div>
          <span style={{ fontSize: '10.5px', color: '#2563EB', fontWeight: 600 }}>Full system authority</span>
        </div>
        <div className="card" style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Regional Dispatchers</span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '6px 0 2px' }}>14</div>
          <span style={{ fontSize: '10.5px', color: '#7C3AED', fontWeight: 600 }}>Hub-level route control</span>
        </div>
        <div className="card" style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Field Inspectors</span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '6px 0 2px' }}>8</div>
          <span style={{ fontSize: '10.5px', color: '#D97706', fontWeight: 600 }}>Mobile app verified</span>
        </div>
      </div>

      {/* 3. Personnel Table */}
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
              Authorized Department Personnel
            </h3>
            <span style={{ fontSize: '11.5px', color: '#64748B' }}>
              Official administrative directory & RBAC credentials
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
                width: '180px',
              }}
            >
              <Search size={14} color="#64748B" />
              <input
                type="text"
                placeholder="Search user / email..."
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

            <button
              onClick={() => toast.info('Invite team member modal opened')}
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
              <span>Invite User</span>
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '11.5px' }}>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Personnel Name & Email</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Role</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Assigned Region</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '10px 14px', fontWeight: 600 }}>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, idx) => (
                <tr
                  key={u.id}
                  style={{
                    borderBottom: idx === filteredUsers.length - 1 ? 'none' : '1px solid #F1F5F9',
                  }}
                >
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{u.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>{u.email}</div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor:
                          u.role === 'Government Administrator'
                            ? '#DCFCE7'
                            : u.role === 'District Officer'
                            ? '#EFF6FF'
                            : '#F5F3FF',
                        color:
                          u.role === 'Government Administrator'
                            ? '#15803D'
                            : u.role === 'District Officer'
                            ? '#2563EB'
                            : '#7C3AED',
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>{u.region}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '2px 7px',
                        borderRadius: '4px',
                        backgroundColor: u.status === 'Active' ? '#DCFCE7' : '#F1F5F9',
                        color: u.status === 'Active' ? '#15803D' : '#64748B',
                      }}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#64748B', fontSize: '12px' }}>
                    {u.lastActive}
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

export default UserManagementPage;
