import React, { useState } from 'react';
import {
  Filter,
  Download,
  MoreVertical,
  AlertTriangle,
  AlertOctagon,
  CloudRain,
  Fuel,
  Wrench,
  Construction,
  Car,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const FieldReportsTable = () => {
  const { reports, openModal } = useApp();
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const filteredReports = reports.filter((r) => {
    if (typeFilter !== 'All' && r.type !== typeFilter) return false;
    if (priorityFilter !== 'All' && r.priority !== priorityFilter) return false;
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    return true;
  });

  const getReportIcon = (type) => {
    switch (type) {
      case 'Road Damage':
        return <Construction size={16} color="#059669" />;
      case 'Traffic Jam':
        return <Car size={16} color="#3B82F6" />;
      case 'Accident':
        return <AlertOctagon size={16} color="#EF4444" />;
      case 'Road Block':
        return <AlertTriangle size={16} color="#F59E0B" />;
      case 'Weather Issue':
        return <CloudRain size={16} color="#8B5CF6" />;
      case 'Fuel Shortage':
        return <Fuel size={16} color="#059669" />;
      case 'Vehicle Breakdown':
        return <Wrench size={16} color="#EF4444" />;
      default:
        return <HelpCircle size={16} color="#64748B" />;
    }
  };

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      {/* Filter Toolbar matching Image 5 */}
      <div className="filter-toolbar">
        <div className="filter-controls-group">
          {/* Report Type Selector */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="All">All Report Types</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Traffic Jam">Traffic Jam</option>
            <option value="Accident">Accident</option>
            <option value="Road Block">Road Block</option>
            <option value="Weather Issue">Weather Issue</option>
            <option value="Fuel Shortage">Fuel Shortage</option>
            <option value="Vehicle Breakdown">Vehicle Breakdown</option>
          </select>

          {/* Priority Selector */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={{ minWidth: '130px' }}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Status Selector */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ minWidth: '130px' }}
          >
            <option value="All">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Pending">Pending</option>
          </select>

          {/* Date Range pill */}
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: 'var(--bg-card-alt)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>📅 18 May 2025 - 21 May 2025</span>
          </div>
        </div>

        {/* Action Buttons: Filters, Export, New Report */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="btn btn-outline"
            style={{ padding: '8px 14px' }}
            onClick={() => {
              setTypeFilter('All');
              setPriorityFilter('All');
              setStatusFilter('All');
            }}
          >
            <Filter size={14} />
            <span>Reset</span>
          </button>

          <button
            className="btn btn-outline"
            style={{ padding: '8px 14px' }}
            onClick={() => openModal('exportPlan')}
          >
            <Download size={14} />
            <span>Export Report</span>
          </button>

          <button
            className="btn btn-primary"
            style={{ padding: '8px 14px' }}
            onClick={() => openModal('createReport')}
          >
            <Plus size={14} />
            <span>New Report</span>
          </button>
        </div>
      </div>

      {/* Field Reports Data Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Type</th>
              <th>Location</th>
              <th>Reported By</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Reported On</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.slice(0, 8).map((rep) => {
              const priorityClass =
                rep.priority === 'High'
                  ? 'high'
                  : rep.priority === 'Medium'
                  ? 'medium'
                  : 'low';

              const statusClass =
                rep.status === 'In Progress'
                  ? 'in-progress'
                  : rep.status === 'Resolved'
                  ? 'resolved'
                  : 'pending';

              return (
                <tr
                  key={rep.id}
                  onClick={() => openModal('reportDetail', rep)}
                  style={{ cursor: 'pointer' }}
                >
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {rep.id}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {getReportIcon(rep.type)}
                      <span style={{ fontWeight: 500 }}>{rep.type}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{rep.location}</td>
                  <td>{rep.reportedBy}</td>
                  <td>
                    <span className={`badge badge-${priorityClass}`}>
                      {rep.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${statusClass}`}>
                      {rep.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{rep.reportedOn}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal('reportDetail', rep);
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="pagination-wrap">
        <span>Showing 1 to {Math.min(filteredReports.length, 8)} of {filteredReports.length} reports</span>

        <div className="pagination-pages">
          <button
            className="page-num-btn"
            disabled={currentPageNum === 1}
            onClick={() => setCurrentPageNum((p) => Math.max(p - 1, 1))}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            className={`page-num-btn ${currentPageNum === 1 ? 'active' : ''}`}
            onClick={() => setCurrentPageNum(1)}
          >
            1
          </button>
          <button
            className={`page-num-btn ${currentPageNum === 2 ? 'active' : ''}`}
            onClick={() => setCurrentPageNum(2)}
          >
            2
          </button>
          <button
            className={`page-num-btn ${currentPageNum === 3 ? 'active' : ''}`}
            onClick={() => setCurrentPageNum(3)}
          >
            3
          </button>
          <span>..</span>
          <button
            className={`page-num-btn ${currentPageNum === 16 ? 'active' : ''}`}
            onClick={() => setCurrentPageNum(16)}
          >
            16
          </button>
          <button
            className="page-num-btn"
            disabled={currentPageNum === 16}
            onClick={() => setCurrentPageNum((p) => Math.min(p + 1, 16))}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
