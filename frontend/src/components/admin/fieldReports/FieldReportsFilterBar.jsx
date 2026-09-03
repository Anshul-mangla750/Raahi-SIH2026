import React from 'react';
import { Calendar, ChevronDown, Filter, Download } from 'lucide-react';
import { toast } from 'sonner';

export const FieldReportsFilterBar = ({
  typeFilter,
  setTypeFilter,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  onExport,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        width: '100%',
      }}
      className="field-reports-filter-bar"
    >
      {/* Left Filter Selects and Date Range */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* Report Type Filter */}
        <div className="filter-select-wrapper">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
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
            <option value="Other Issue">Other Issue</option>
          </select>
          <ChevronDown size={13} className="filter-select-arrow" />
        </div>

        {/* Priority Filter */}
        <div className="filter-select-wrapper">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-select"
            style={{ minWidth: '135px' }}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <ChevronDown size={13} className="filter-select-arrow" />
        </div>

        {/* Status Filter */}
        <div className="filter-select-wrapper">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
            style={{ minWidth: '135px' }}
          >
            <option value="All">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Pending">Pending</option>
          </select>
          <ChevronDown size={13} className="filter-select-arrow" />
        </div>

        {/* Date Range Picker Pill */}
        <div className="filter-date-pill">
          <Calendar size={14} color="#64748B" />
          <span>18 May 2025 - 21 May 2025</span>
          <ChevronDown size={13} color="#64748B" />
        </div>
      </div>

      {/* Right Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          className="btn-export-outline"
          onClick={() => {
            setTypeFilter('All');
            setPriorityFilter('All');
            setStatusFilter('All');
            toast.info('Filters reset to default.');
          }}
        >
          <Filter size={14} />
          <span>Filters</span>
        </button>

        <button className="btn-export-outline" onClick={onExport}>
          <Download size={14} />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
};
