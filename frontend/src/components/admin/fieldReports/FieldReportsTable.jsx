import React, { useState } from 'react';
import {
  MoreVertical,
  ChevronRight,
  Construction,
  Car,
  AlertOctagon,
  AlertTriangle,
  CloudRain,
  Fuel,
  Wrench,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

export const FieldReportsTable = ({ typeFilter = 'All', priorityFilter = 'All', statusFilter = 'All' }) => {
  const { openModal } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionId, setOpenActionId] = useState(null);

  const reportsData = [
    {
      id: 'FR-2025-0128',
      type: 'Road Damage',
      typeIcon: Construction,
      typeColor: '#059669',
      location: 'NH-27, Tezpur Assam',
      driver: 'Rakesh Das',
      role: 'Driver',
      priority: 'High',
      priorityBg: '#FEE2E2',
      priorityColor: '#EF4444',
      status: 'In Progress',
      statusBg: '#EFF6FF',
      statusColor: '#2563EB',
      date: '21 May 2025',
      time: '10:15 AM',
    },
    {
      id: 'FR-2025-0127',
      type: 'Traffic Jam',
      typeIcon: Car,
      typeColor: '#F97316',
      location: 'NH-37, Nagaon Assam',
      driver: 'Anupam Saikia',
      role: 'Driver',
      priority: 'Medium',
      priorityBg: '#FEF3C7',
      priorityColor: '#D97706',
      status: 'Resolved',
      statusBg: '#ECFDF5',
      statusColor: '#059669',
      date: '21 May 2025',
      time: '09:45 AM',
    },
    {
      id: 'FR-2025-0126',
      type: 'Accident',
      typeIcon: AlertOctagon,
      typeColor: '#EF4444',
      location: 'NH-27, Dhekiakjuli Assam',
      driver: 'Bikash Borah',
      role: 'Driver',
      priority: 'High',
      priorityBg: '#FEE2E2',
      priorityColor: '#EF4444',
      status: 'In Progress',
      statusBg: '#EFF6FF',
      statusColor: '#2563EB',
      date: '21 May 2025',
      time: '09:20 AM',
    },
    {
      id: 'FR-2025-0125',
      type: 'Road Block',
      typeIcon: AlertTriangle,
      typeColor: '#8B5CF6',
      location: 'NH-2, Diphu Assam',
      driver: 'Manoj Kalita',
      role: 'Driver',
      priority: 'High',
      priorityBg: '#FEE2E2',
      priorityColor: '#EF4444',
      status: 'Pending',
      statusBg: '#FFEDD5',
      statusColor: '#EA580C',
      date: '21 May 2025',
      time: '08:50 AM',
    },
    {
      id: 'FR-2025-0124',
      type: 'Weather Issue',
      typeIcon: CloudRain,
      typeColor: '#3B82F6',
      location: 'NH-37, Hojai Assam',
      driver: 'Jitu Kalita',
      role: 'Driver',
      priority: 'Medium',
      priorityBg: '#FEF3C7',
      priorityColor: '#D97706',
      status: 'Resolved',
      statusBg: '#ECFDF5',
      statusColor: '#059669',
      date: '21 May 2025',
      time: '08:30 AM',
    },
    {
      id: 'FR-2025-0123',
      type: 'Fuel Shortage',
      typeIcon: Fuel,
      typeColor: '#059669',
      location: 'NH-27, Tezpur Assam',
      driver: 'Nitulpal Dutta',
      role: 'Driver',
      priority: 'Low',
      priorityBg: '#ECFDF5',
      priorityColor: '#059669',
      status: 'Resolved',
      statusBg: '#ECFDF5',
      statusColor: '#059669',
      date: '21 May 2025',
      time: '08:10 AM',
    },
    {
      id: 'FR-2025-0122',
      type: 'Vehicle Breakdown',
      typeIcon: Wrench,
      typeColor: '#8B5CF6',
      location: 'NH-2, Lumding Assam',
      driver: 'Ashok Leyland',
      role: 'Driver',
      priority: 'High',
      priorityBg: '#FEE2E2',
      priorityColor: '#EF4444',
      status: 'In Progress',
      statusBg: '#EFF6FF',
      statusColor: '#2563EB',
      date: '21 May 2025',
      time: '07:55 AM',
    },
    {
      id: 'FR-2025-0121',
      type: 'Other Issue',
      typeIcon: HelpCircle,
      typeColor: '#64748B',
      location: 'NH-37, Morigaon Assam',
      driver: 'Sanjib Ahmed',
      role: 'Driver',
      priority: 'Low',
      priorityBg: '#ECFDF5',
      priorityColor: '#059669',
      status: 'Pending',
      statusBg: '#FFEDD5',
      statusColor: '#EA580C',
      date: '21 May 2025',
      time: '07:40 AM',
    },
  ];

  const filtered = reportsData.filter((r) => {
    if (typeFilter !== 'All' && r.type !== typeFilter) return false;
    if (priorityFilter !== 'All' && r.priority !== priorityFilter) return false;
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    return true;
  });

  const handleRowClick = (rep) => {
    openModal('reportDetail', {
      id: rep.id,
      title: `${rep.type} - ${rep.location}`,
      type: rep.type,
      location: rep.location,
      reportedBy: `${rep.driver} (${rep.role})`,
      priority: rep.priority,
      status: rep.status,
      time: `${rep.date} ${rep.time}`,
      description: `Field incident report regarding ${rep.type.toLowerCase()} logged at ${rep.location}.`,
    });
  };

  return (
    <div
      className="card"
      style={{
        padding: '16px 18px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Table Area */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Report ID</th>
              <th style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Type</th>
              <th style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Location</th>
              <th style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Reported By</th>
              <th style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Priority</th>
              <th style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Reported On</th>
              <th style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rep) => {
              const TypeIcon = rep.typeIcon;

              return (
                <tr
                  key={rep.id}
                  onClick={() => handleRowClick(rep)}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="alerts-table-row"
                >
                  {/* Report ID */}
                  <td style={{ padding: '10px 10px', fontSize: '12px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>
                    {rep.id}
                  </td>

                  {/* Type */}
                  <td style={{ padding: '10px 10px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TypeIcon size={15} color={rep.typeColor} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', fontWeight: 500, color: '#0F172A' }}>
                        {rep.type}
                      </span>
                    </div>
                  </td>

                  {/* Location */}
                  <td style={{ padding: '10px 10px', fontSize: '11.5px', color: '#334155', whiteSpace: 'nowrap' }}>
                    {rep.location}
                  </td>

                  {/* Reported By */}
                  <td style={{ padding: '10px 10px', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '12px', fontWeight: 500, color: '#0F172A', lineHeight: 1.2 }}>
                      {rep.driver}
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '1px' }}>
                      {rep.role}
                    </div>
                  </td>

                  {/* Priority */}
                  <td style={{ padding: '10px 10px', whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: rep.priorityBg,
                        color: rep.priorityColor,
                        fontSize: '11px',
                        fontWeight: 600,
                        display: 'inline-block',
                      }}
                    >
                      {rep.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '10px 10px', whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: rep.statusBg,
                        color: rep.statusColor,
                        fontSize: '11px',
                        fontWeight: 600,
                        display: 'inline-block',
                      }}
                    >
                      {rep.status}
                    </span>
                  </td>

                  {/* Reported On */}
                  <td style={{ padding: '10px 10px', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#0F172A', lineHeight: 1.2 }}>
                      {rep.date}
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '1px' }}>
                      {rep.time}
                    </div>
                  </td>

                  {/* Actions (3-dots) */}
                  <td style={{ padding: '10px 10px', textAlign: 'center', position: 'relative' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenActionId(openActionId === rep.id ? null : rep.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748B',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                      }}
                      title="Actions"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {/* Popover */}
                    {openActionId === rep.id && (
                      <div
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '32px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #E2E8F0',
                          borderRadius: '6px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                          zIndex: 30,
                          minWidth: '130px',
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                          textAlign: 'left',
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenActionId(null);
                            handleRowClick(rep);
                          }}
                          className="action-menu-item"
                        >
                          View Details
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenActionId(null);
                            toast.info(`Marked ${rep.id} as In Progress`);
                          }}
                          className="action-menu-item"
                        >
                          Mark In Progress
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenActionId(null);
                            toast.success(`Marked ${rep.id} as Resolved`);
                          }}
                          className="action-menu-item"
                          style={{ color: '#059669' }}
                        >
                          Mark Resolved
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '14px',
          paddingTop: '10px',
          borderTop: '1px solid #F1F5F9',
        }}
      >
        <span style={{ fontSize: '11.5px', color: '#64748B' }}>
          Showing 1 to 8 of 128 reports
        </span>

        {/* Page Nav Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
          <span style={{ fontSize: '11px', color: '#94A3B8', padding: '0 4px' }}>..</span>
          <button
            onClick={() => setCurrentPage(16)}
            className={`pagination-btn ${currentPage === 16 ? 'active' : ''}`}
          >
            16
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, 16))}
            className="pagination-btn"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
