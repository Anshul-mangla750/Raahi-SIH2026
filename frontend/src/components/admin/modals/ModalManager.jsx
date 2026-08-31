import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '@/contexts/AppContext';
import {
  Truck,
  AlertTriangle,
  FileText,
  Download,
  Headphones,
  UploadCloud,
  CheckCircle,
  MapPin,
  Camera,
} from 'lucide-react';

export const ModalManager = () => {
  const {
    activeModal,
    closeModal,
    selectedItem,
    addVehicle,
    addAlert,
    addFieldReport,
    addToast,
  } = useApp();

  // Add Vehicle Form State
  const [vId, setVId] = useState('');
  const [vModel, setVModel] = useState('Tata 407');
  const [vDriver, setVDriver] = useState('');
  const [vRoute, setVRoute] = useState('Guwahati → Tezpur');

  // Create Alert Form State
  const [aTitle, setATitle] = useState('');
  const [aSeverity, setASeverity] = useState('High');
  const [aLocation, setALocation] = useState('NH-27 Corridor');

  // Create Field Report State
  const [frType, setFrType] = useState('Road Damage');
  const [frLocation, setFrLocation] = useState('');
  const [frDriver, setFrDriver] = useState('Rakesh Das (Driver)');
  const [frPriority, setFrPriority] = useState('High');
  const [frDesc, setFrDesc] = useState('');

  // Support State
  const [supportMessage, setSupportMessage] = useState('');

  const handleAddVehicleSubmit = (e) => {
    e.preventDefault();
    if (!vId.trim()) return;
    addVehicle({
      id: vId.toUpperCase(),
      model: vModel,
      driver: vDriver || 'Assigned Driver',
      status: 'Moving',
      statusClass: 'moving',
      speed: '45 km/h',
      time: 'Just now',
      route: vRoute,
      lat: 26.1445,
      lng: 91.7362,
      fuel: '95%',
    });
    setVId('');
    setVDriver('');
    closeModal();
  };

  const handleCreateAlertSubmit = (e) => {
    e.preventDefault();
    if (!aTitle.trim()) return;
    addAlert({
      id: `alt-${Date.now()}`,
      title: aTitle,
      time: 'Just now',
      severity: aSeverity,
      severityClass: aSeverity.toLowerCase(),
      location: aLocation,
    });
    setATitle('');
    closeModal();
  };

  const handleCreateReportSubmit = (e) => {
    e.preventDefault();
    const newId = `FR-2025-0${Math.floor(100 + Math.random() * 900)}`;
    addFieldReport({
      id: newId,
      type: frType,
      location: frLocation || 'Assam Highway Corridor',
      reportedBy: frDriver,
      priority: frPriority,
      status: 'Pending',
      reportedOn: '21 May 2025 Just now',
      image: '/assets/field-reports/landslide.jpg',
      description: frDesc || 'Field inspection report submitted from GPS mobile unit.',
    });
    setFrLocation('');
    setFrDesc('');
    closeModal();
  };

  const handleExportPlan = (format) => {
    try {
      const headers = ['Waypoint Order', 'Hub Location', 'Estimated Arrival', 'Distance (KM)', 'Corridor Status'];
      const rows = [
        ['1', '"Start: Guwahati Hub (ISBT)"', '"08:00 AM"', '"0 km"', '"Clear / High Capacity"'],
        ['2', '"Jorhat Transit Point"', '"11:15 AM"', '"145 km"', '"Caution: Weather Advisory"'],
        ['3', '"Nagaon Regional Depo"', '"01:30 PM"', '"210 km"', '"Optimal Flow"'],
        ['4', '"Hojai Industrial Area"', '"03:45 PM"', '"290 km"', '"Clear"'],
        ['5', '"Shillong Hill Bypass"', '"06:00 PM"', '"380 km"', '"Heavy Vehicle Restriction"'],
        ['6', '"Destination: Tezpur Hub"', '"08:30 PM"', '"468 km"', '"Completed"'],
      ];
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `raahi_route_manifest_${Date.now()}.${format === 'excel' ? 'csv' : 'txt'}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('Route Plan Exported', `Generated and downloaded ${format.toUpperCase()} route manifest.`, 'success');
    } catch (e) {
      addToast('Route Plan Exported', 'Downloaded route manifest.', 'success');
    }
    closeModal();
  };

  const handleGenerateReportDownload = () => {
    try {
      const headers = ['Route Name', 'State', 'Risk Score', 'Avg Speed', 'Active Vehicles', 'SLA Adherence'];
      const rows = [
        ['"NH-27 Guwahati - Tezpur"', '"Assam"', '"14/100 (Low)"', '"52 km/h"', '"42"', '"96.8%"'],
        ['"NH-15 North Bank Corridor"', '"Assam"', '"38/100 (Medium)"', '"44 km/h"', '"28"', '"91.4%"'],
        ['"NH-6 Shillong - Silchar"', '"Meghalaya"', '"68/100 (High)"', '"32 km/h"', '"19"', '"82.1%"'],
        ['"NH-2 Dimapur - Kohima"', '"Nagaland"', '"54/100 (Moderate)"', '"36 km/h"', '"15"', '"88.5%"'],
        ['"NH-44 Agartala Arterial"', '"Tripura"', '"22/100 (Low)"', '"48 km/h"', '"18"', '"94.2%"'],
      ];
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `raahi_logistics_compliance_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('Report Downloaded', 'Monthly logistics compliance report downloaded as CSV.', 'success');
    } catch (e) {
      addToast('Report Generated', 'Logistics report generated.', 'success');
    }
    closeModal();
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    addToast('Support Ticket Raised', 'Our 24/7 Operations Desk has received your request and will connect shortly.', 'success');
    setSupportMessage('');
    closeModal();
  };

  return (
    <>
      {/* 1. Add Vehicle Modal */}
      <Modal isOpen={activeModal === 'addVehicle'} onClose={closeModal} title="Add Vehicle to Active Fleet">
        <form onSubmit={handleAddVehicleSubmit}>
          <div className="modal-body">
            <div>
              <label className="query-field-label">Vehicle Registration Number</label>
              <input
                type="text"
                placeholder="e.g. AS-01-XX-9999"
                value={vId}
                onChange={(e) => setVId(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="query-field-label">Vehicle Model</label>
                <select
                  value={vModel}
                  onChange={(e) => setVModel(e.target.value)}
                  style={{ width: '100%', marginTop: 4 }}
                >
                  <option value="Tata 407">Tata 407 Light Cargo</option>
                  <option value="BharatBenz 1214">BharatBenz 1214 (10T)</option>
                  <option value="Eicher Pro 2049">Eicher Pro 2049</option>
                  <option value="Ashok Leyland 1618">Ashok Leyland 1618 (Heavy)</option>
                </select>
              </div>

              <div>
                <label className="query-field-label">Assigned Driver</label>
                <input
                  type="text"
                  placeholder="Driver Full Name"
                  value={vDriver}
                  onChange={(e) => setVDriver(e.target.value)}
                  style={{ width: '100%', marginTop: 4 }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="query-field-label">Initial Assigned Route</label>
              <input
                type="text"
                value={vRoute}
                onChange={(e) => setVRoute(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Fleet Vehicle</button>
          </div>
        </form>
      </Modal>

      {/* 2. Create Alert Modal */}
      <Modal isOpen={activeModal === 'createAlert'} onClose={closeModal} title="Broadcast Emergency Highway Alert">
        <form onSubmit={handleCreateAlertSubmit}>
          <div className="modal-body">
            <div>
              <label className="query-field-label">Alert Headline</label>
              <input
                type="text"
                placeholder="e.g. Flash flood warning on NH-37 near Kaziranga"
                value={aTitle}
                onChange={(e) => setATitle(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="query-field-label">Severity Level</label>
                <select
                  value={aSeverity}
                  onChange={(e) => setASeverity(e.target.value)}
                  style={{ width: '100%', marginTop: 4 }}
                >
                  <option value="High">High Severity (Red Alert)</option>
                  <option value="Medium">Medium Severity (Amber Warning)</option>
                  <option value="Low">Low Severity (Informational)</option>
                </select>
              </div>

              <div>
                <label className="query-field-label">Specific Location / Highway</label>
                <input
                  type="text"
                  value={aLocation}
                  onChange={(e) => setALocation(e.target.value)}
                  style={{ width: '100%', marginTop: 4 }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn btn-danger">Broadcast Immediate Alert</button>
          </div>
        </form>
      </Modal>

      {/* 3. Create Field Report Modal */}
      <Modal isOpen={activeModal === 'createReport'} onClose={closeModal} title="Submit New Field Inspection Report">
        <form onSubmit={handleCreateReportSubmit}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="query-field-label">Incident Type</label>
                <select
                  value={frType}
                  onChange={(e) => setFrType(e.target.value)}
                  style={{ width: '100%', marginTop: 4 }}
                >
                  <option value="Road Damage">Road Damage</option>
                  <option value="Traffic Jam">Traffic Jam</option>
                  <option value="Accident">Accident</option>
                  <option value="Road Block">Road Block</option>
                  <option value="Weather Issue">Weather Issue</option>
                  <option value="Fuel Shortage">Fuel Shortage</option>
                  <option value="Vehicle Breakdown">Vehicle Breakdown</option>
                </select>
              </div>

              <div>
                <label className="query-field-label">Priority</label>
                <select
                  value={frPriority}
                  onChange={(e) => setFrPriority(e.target.value)}
                  style={{ width: '100%', marginTop: 4 }}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="query-field-label">Location (Highway & Landmark)</label>
              <input
                type="text"
                placeholder="e.g. NH-27, Tezpur Assam near KM-14"
                value={frLocation}
                onChange={(e) => setFrLocation(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
                required
              />
            </div>

            <div>
              <label className="query-field-label">Detailed Notes & Observations</label>
              <textarea
                rows={3}
                placeholder="Describe road blockage, debris clearance status, or towing requirements..."
                value={frDesc}
                onChange={(e) => setFrDesc(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              />
            </div>

            {/* Photo preview upload simulator */}
            <div style={{ padding: '12px', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-sm)', textAlign: 'center', backgroundColor: 'var(--bg-card-alt)' }}>
              <Camera size={24} color="var(--primary-600)" style={{ margin: '0 auto 6px auto' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
                Incident geotagged photo attached automatically from GPS mobile unit
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Report</button>
          </div>
        </form>
      </Modal>

      {/* 4. Report Details Modal (with HD photo preview & full action buttons) */}
      {activeModal === 'reportDetail' && selectedItem && (
        <Modal isOpen={true} onClose={closeModal} title={`Report ${selectedItem.id} Details`}>
          <div className="modal-body">
            {/* HD Image Asset display */}
            {selectedItem.image && (
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: '240px', border: '1px solid var(--border-light)' }}>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title || selectedItem.type}
                  style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedItem.title || `${selectedItem.type} Incident`}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  📍 {selectedItem.location} • 🕒 {selectedItem.reportedOn || selectedItem.time}
                </span>
              </div>

              {selectedItem.priority && (
                <span className={`badge badge-${selectedItem.priority.toLowerCase()}`}>
                  {selectedItem.priority} Priority
                </span>
              )}
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {selectedItem.description || 'Debris and road obstruction reported along mountain corridor with clearance team dispatched.'}
            </p>

            <div style={{ padding: '12px', backgroundColor: 'var(--bg-card-alt)', borderRadius: 'var(--radius-sm)', fontSize: '12px' }}>
              <strong>Reported By:</strong> {selectedItem.reportedBy || 'Field Driver'}
              <br />
              <strong>GPS Telemetry:</strong> Lat 26.2006° N, Long 92.9376° E
            </div>
          </div>

          <div className="modal-footer" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-between' }}>
            <button
              className="btn btn-outline"
              onClick={() => {
                addToast('Report Escalated', `Report ${selectedItem.id} escalated to SDRF / NDRF Command.`, 'danger');
                closeModal();
              }}
            >
              Escalate to NDRF
            </button>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn btn-outline"
                onClick={() => {
                  addToast('Report Archived', `Report ${selectedItem.id} dismissed / archived.`, 'info');
                  closeModal();
                }}
              >
                Dismiss
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  addToast('Status Updated', `Report ${selectedItem.id} verified and marked as Resolved.`, 'success');
                  closeModal();
                }}
              >
                Verify & Mark Resolved
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* 5. Export Plan Modal */}
      <Modal isOpen={activeModal === 'exportPlan'} onClose={closeModal} title="Export Logistics & Route Manifest">
        <div className="modal-body">
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Choose export format for optimized route itinerary, stop timestamps, and toll schedule:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '10px' }}>
            <button
              className="card"
              style={{ textAlign: 'center', padding: '20px', cursor: 'pointer', border: '1px solid var(--border-light)' }}
              onClick={() => handleExportPlan('pdf')}
            >
              <Download size={24} color="#EF4444" style={{ margin: '0 auto 8px auto' }} />
              <strong style={{ fontSize: '14px', display: 'block' }}>PDF Format</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Official Driver Route Sheet</span>
            </button>

            <button
              className="card"
              style={{ textAlign: 'center', padding: '20px', cursor: 'pointer', border: '1px solid var(--border-light)' }}
              onClick={() => handleExportPlan('excel')}
            >
              <Download size={24} color="#059669" style={{ margin: '0 auto 8px auto' }} />
              <strong style={{ fontSize: '14px', display: 'block' }}>Excel / CSV</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fleet Telemetry & Waypoints</span>
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
        </div>
      </Modal>

      {/* 6. Support Modal */}
      <Modal isOpen={activeModal === 'support'} onClose={closeModal} title="24/7 Operations Desk Support">
        <form onSubmit={handleSupportSubmit}>
          <div className="modal-body">
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Direct hotline to the Northeast Regional Logistics & Emergency Dispatch Helpdesk.
            </p>

            <div>
              <label className="query-field-label">Subject / Query Topic</label>
              <input
                type="text"
                defaultValue={selectedItem?.topic || 'General Operational Support'}
                style={{ width: '100%', marginTop: 4 }}
              />
            </div>

            <div>
              <label className="query-field-label">Message Details</label>
              <textarea
                rows={3}
                placeholder="Explain the technical issue or emergency assistance needed..."
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn btn-primary">Send Dispatch Message</button>
          </div>
        </form>
      </Modal>

      {/* 7. Generate Report Modal */}
      {activeModal === 'generateReport' && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="Generate Logistics Compliance Report"
        >
          <div className="modal-body">
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Generate and download the comprehensive monthly compliance report for North Eastern Regional Logistics corridors.
            </p>

            <div style={{ padding: '24px', border: '2px dashed var(--border-strong)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: 'var(--bg-card-alt)' }}>
              <Download size={32} color="#059669" style={{ margin: '0 auto 8px auto' }} />
              <strong style={{ fontSize: '13px', display: 'block' }}>Export Full Regional Corridor Telemetry</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Includes SLA compliance, risk indices, and fuel metrics.</span>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
            <button
              className="btn btn-primary"
              onClick={handleGenerateReportDownload}
            >
              Download CSV Report
            </button>
          </div>
        </Modal>
      )}

      {/* 8. Import Data Modal */}
      {activeModal === 'importData' && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title="Import Telematics Dataset"
        >
          <div className="modal-body">
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Upload CSV, GeoJSON, or GPX log files from field GPS receivers to synchronize telemetry with the central server.
            </p>

            <label style={{ display: 'block', padding: '24px', border: '2px dashed var(--border-strong)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: 'var(--bg-card-alt)', cursor: 'pointer' }}>
              <UploadCloud size={32} color="var(--primary-600)" style={{ margin: '0 auto 8px auto' }} />
              <strong style={{ fontSize: '13px', display: 'block' }}>Choose File to Import</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Supports .csv, .xlsx, .geojson, .gpx (Up to 50MB)</span>
              <input
                type="file"
                accept=".csv,.xlsx,.geojson,.gpx,.json"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    addToast('File Processed', `Successfully imported ${e.target.files[0].name}. 18 GPS telemetry records synced.`, 'success');
                    closeModal();
                  }
                }}
              />
            </label>
          </div>

          <div className="modal-footer">
            <button className="btn btn-outline" onClick={closeModal}>Close</button>
            <button
              className="btn btn-primary"
              onClick={() => {
                addToast('Completed', 'Simulated GPS telematics batch synced into live grid.', 'success');
                closeModal();
              }}
            >
              Sync Telematics
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
