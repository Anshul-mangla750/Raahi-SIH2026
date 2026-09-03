import React, { useState } from 'react';
import {
  Calendar,
  Download,
  MoreVertical,
  ChevronDown,
  AlertTriangle,
  Route,
  Fuel,
  Wrench,
  ShieldAlert,
  AlertCircle,
  DoorOpen,
  Cpu,
} from 'lucide-react';
import { toast } from 'sonner';

export const AlertsOverviewTable = () => {
  const [severityFilter, setSeverityFilter] = useState('All Severity');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [openActionId, setOpenActionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const initialAlerts = [
    {
      id: 'ALT-2025-0056',
      type: 'Over Speeding',
      typeIcon: AlertTriangle,
      typeColor: '#EF4444',
      severity: 'Critical',
      severityBg: '#FEE2E2',
      severityColor: '#EF4444',
      message: 'Vehicle AS-01-CD-5678 exceeded speed limit',
      secondaryMessage: 'Limit: 60 km/h, Recorded: 82 km/h',
      vehicle: 'AS-01-CD-5678',
      driver: 'Manoj Kalita',
      date: '21 May 2025',
      time: '10:25 AM',
      status: 'Active',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
    },
    {
      id: 'ALT-2025-0055',
      type: 'Route Deviation',
      typeIcon: Route,
      typeColor: '#8B5CF6',
      severity: 'High',
      severityBg: '#FFEDD5',
      severityColor: '#EA580C',
      message: 'Vehicle AS-01-AB-1234 deviated from assigned route',
      secondaryMessage: 'Deviation: 8.5 km',
      vehicle: 'AS-01-AB-1234',
      driver: 'Rakesh Das',
      date: '21 May 2025',
      time: '10:15 AM',
      status: 'Active',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
    },
    {
      id: 'ALT-2025-0054',
      type: 'Low Fuel',
      typeIcon: Fuel,
      typeColor: '#3B82F6',
      severity: 'Medium',
      severityBg: '#FEF3C7',
      severityColor: '#D97706',
      message: 'Vehicle AS-01-GH-3456 fuel level is low',
      secondaryMessage: 'Fuel Level: 12%',
      vehicle: 'AS-01-GH-3456',
      driver: 'Bikash Borah',
      date: '21 May 2025',
      time: '09:50 AM',
      status: 'Acknowledged',
      statusBg: '#EFF6FF',
      statusColor: '#2563EB',
    },
    {
      id: 'ALT-2025-0053',
      type: 'Engine Issue',
      typeIcon: Cpu,
      typeColor: '#EF4444',
      severity: 'High',
      severityBg: '#FFEDD5',
      severityColor: '#EA580C',
      message: 'Abnormal engine temperature detected',
      secondaryMessage: 'Temperature: 102°C',
      vehicle: 'AS-01-EF-9012',
      driver: 'Anupam Saikia',
      date: '21 May 2025',
      time: '09:30 AM',
      status: 'Active',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
    },
    {
      id: 'ALT-2025-0052',
      type: 'Maintenance Due',
      typeIcon: Wrench,
      typeColor: '#10B981',
      severity: 'Low',
      severityBg: '#EFF6FF',
      severityColor: '#3B82F6',
      message: 'Vehicle AS-01-IJ-7890 is due for maintenance',
      secondaryMessage: 'Due in: 2 days',
      vehicle: 'AS-01-IJ-7890',
      driver: 'Jitu Kalita',
      date: '21 May 2025',
      time: '09:10 AM',
      status: 'Resolved',
      statusBg: '#ECFDF5',
      statusColor: '#059669',
    },
    {
      id: 'ALT-2025-0051',
      type: 'Geo-fence Breach',
      typeIcon: ShieldAlert,
      typeColor: '#8B5CF6',
      severity: 'High',
      severityBg: '#FFEDD5',
      severityColor: '#EA580C',
      message: 'Vehicle AS-01-KL-1122 exited geo-fenced area',
      secondaryMessage: 'Location: Narengi Industrial Area',
      vehicle: 'AS-01-KL-1122',
      driver: 'Nitulpaul Dutta',
      date: '21 May 2025',
      time: '08:45 AM',
      status: 'Active',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
    },
    {
      id: 'ALT-2025-0050',
      type: 'Harsh Braking',
      typeIcon: AlertCircle,
      typeColor: '#F97316',
      severity: 'Medium',
      severityBg: '#FEF3C7',
      severityColor: '#D97706',
      message: 'Harsh braking detected in vehicle AS-01-CD-5678',
      secondaryMessage: 'Count: 5 times',
      vehicle: 'AS-01-CD-5678',
      driver: 'Manoj Kalita',
      date: '21 May 2025',
      time: '08:20 AM',
      status: 'Acknowledged',
      statusBg: '#EFF6FF',
      statusColor: '#2563EB',
    },
    {
      id: 'ALT-2025-0049',
      type: 'Door Open',
      typeIcon: DoorOpen,
      typeColor: '#10B981',
      severity: 'Low',
      severityBg: '#EFF6FF',
      severityColor: '#3B82F6',
      message: 'Rear door opened while vehicle in motion',
      secondaryMessage: 'Duration: 45 seconds',
      vehicle: 'AS-01-AB-1234',
      driver: 'Rakesh Das',
      date: '21 May 2025',
      time: '08:05 AM',
      status: 'Resolved',
      statusBg: '#ECFDF5',
      statusColor: '#059669',
    },
  ];

  const [alerts, setAlerts] = useState(initialAlerts);

  const handleAction = (alertId, actionType) => {
    setOpenActionId(null);
    if (actionType === 'acknowledge') {
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === alertId
            ? { ...a, status: 'Acknowledged', statusBg: '#EFF6FF', statusColor: '#2563EB' }
            : a
        )
      );
      toast.info(`Alert ${alertId} marked as Acknowledged.`);
    } else if (actionType === 'resolve') {
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === alertId
            ? { ...a, status: 'Resolved', statusBg: '#ECFDF5', statusColor: '#059669' }
            : a
        )
      );
      toast.success(`Alert ${alertId} marked as Resolved.`);
    } else {
      toast.info(`Viewing details for alert ${alertId}`);
    }
  };

  const handleExport = () => {
    toast.success('Exporting Alerts Report (PDF / CSV)...');
  };

  const filteredAlerts = alerts.filter((item) => {
    if (severityFilter !== 'All Severity' && item.severity !== severityFilter) return false;
    if (typeFilter !== 'All Types' && item.type !== typeFilter) return false;
    if (statusFilter !== 'All Status' && item.status !== statusFilter) return false;
    return true;
  });

  return (
    <div
      className="card alerts-overview-card"
      style={{
        padding: '18px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Header & Filter Controls Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Alerts Overview
        </h2>

        {/* Filters Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Severity Filter */}
          <div className="filter-select-wrapper">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All Severity">All Severity</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <ChevronDown size={13} className="filter-select-arrow" />
          </div>

          {/* Type Filter */}
          <div className="filter-select-wrapper">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All Types">All Types</option>
              <option value="Over Speeding">Over Speeding</option>
              <option value="Route Deviation">Route Deviation</option>
              <option value="Low Fuel">Low Fuel</option>
              <option value="Engine Issue">Engine Issue</option>
              <option value="Maintenance Due">Maintenance Due</option>
              <option value="Geo-fence Breach">Geo-fence Breach</option>
              <option value="Harsh Braking">Harsh Braking</option>
              <option value="Door Open">Door Open</option>
            </select>
            <ChevronDown size={13} className="filter-select-arrow" />
          </div>

          {/* Status Filter */}
          <div className="filter-select-wrapper">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Acknowledged">Acknowledged</option>
              <option value="Resolved">Resolved</option>
            </select>
            <ChevronDown size={13} className="filter-select-arrow" />
          </div>

          {/* Date Range Picker Pill */}
          <div className="filter-date-pill">
            <Calendar size={14} color="#64748B" />
            <span>18 May 2025 - 21 May 2025</span>
            <ChevronDown size={13} color="#64748B" />
          </div>

          {/* Export Report Button */}
          <button onClick={handleExport} className="btn-export-outline">
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '980px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Alert ID</th>
              <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Type</th>
              <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Severity</th>
              <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Message</th>
              <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Vehicle/Driver</th>
              <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Time</th>
              <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((alert) => {
              const TypeIcon = alert.typeIcon;

              return (
                <tr
                  key={alert.id}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="alerts-table-row"
                >
                  {/* Alert ID */}
                  <td style={{ padding: '12px 12px', fontSize: '12px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>
                    {alert.id}
                  </td>

                  {/* Type */}
                  <td style={{ padding: '12px 12px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TypeIcon size={16} color={alert.typeColor} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '12.5px', fontWeight: 500, color: '#0F172A' }}>
                        {alert.type}
                      </span>
                    </div>
                  </td>

                  {/* Severity */}
                  <td style={{ padding: '12px 12px', whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        padding: '3px 9px',
                        borderRadius: '4px',
                        backgroundColor: alert.severityBg,
                        color: alert.severityColor,
                        fontSize: '11px',
                        fontWeight: 600,
                        display: 'inline-block',
                      }}
                    >
                      {alert.severity}
                    </span>
                  </td>

                  {/* Message */}
                  <td style={{ padding: '12px 12px', maxWidth: '280px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', lineHeight: 1.3 }}>
                      {alert.message}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                      {alert.secondaryMessage}
                    </div>
                  </td>

                  {/* Vehicle / Driver */}
                  <td style={{ padding: '12px 12px', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
                      {alert.vehicle}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                      {alert.driver}
                    </div>
                  </td>

                  {/* Time */}
                  <td style={{ padding: '12px 12px', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '12px', fontWeight: 500, color: '#0F172A', lineHeight: 1.3 }}>
                      {alert.date}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                      {alert.time}
                    </div>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '12px 12px', whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '4px',
                        backgroundColor: alert.statusBg,
                        color: alert.statusColor,
                        fontSize: '11px',
                        fontWeight: 600,
                        display: 'inline-block',
                      }}
                    >
                      {alert.status}
                    </span>
                  </td>

                  {/* Actions (3-dot dropdown) */}
                  <td style={{ padding: '12px 12px', textAlign: 'center', position: 'relative' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenActionId(openActionId === alert.id ? null : alert.id);
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

                    {/* Popover Menu */}
                    {openActionId === alert.id && (
                      <div
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '38px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #E2E8F0',
                          borderRadius: '6px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                          zIndex: 30,
                          minWidth: '150px',
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                          textAlign: 'left',
                        }}
                      >
                        <button
                          onClick={() => handleAction(alert.id, 'details')}
                          className="action-menu-item"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleAction(alert.id, 'acknowledge')}
                          className="action-menu-item"
                        >
                          Mark as Acknowledged
                        </button>
                        <button
                          onClick={() => handleAction(alert.id, 'resolve')}
                          className="action-menu-item"
                          style={{ color: '#059669' }}
                        >
                          Resolve Alert
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
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid #F1F5F9',
        }}
      >
        <span style={{ fontSize: '11.5px', color: '#64748B' }}>
          Showing 1 to 8 of 28 alerts
        </span>

        {/* Page Nav Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="pagination-btn"
          >
            &lt;
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, 3))}
            className="pagination-btn"
          >
            &gt;
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            className="pagination-btn"
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};
