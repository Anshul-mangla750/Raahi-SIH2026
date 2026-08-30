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
    addToast('Route Plan Exported', `Generated ${format.toUpperCase()} route briefing document for driver manifest.`, 'success');
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
                Incident geotagged photo attached automatically from driver mobile app
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Report</button>
          </div>
        </form>
      </Modal>

      {/* 4. Report Details Modal (with HD photo preview) */}
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

          <div className="modal-footer">
            <button className="btn btn-outline" onClick={closeModal}>Close</button>
            <button
              className="btn btn-primary"
              onClick={() => {
                addToast('Status Updated', `Report ${selectedItem.id} marked as In-Progress / Resolved.`, 'success');
                closeModal();
              }}
            >
              Mark Status Resolved
            </button>
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

      {/* 7. Generate Report / Import Data Modal */}
      {(activeModal === 'generateReport' || activeModal === 'importData') && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title={activeModal === 'generateReport' ? 'Generate Logistics Compliance Report' : 'Import Telematics Dataset'}
        >
          <div className="modal-body">
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {activeModal === 'generateReport'
                ? 'Generate comprehensive monthly compliance report for North Eastern Regional Logistics.'
                : 'Upload CSV, GeoJSON or GPX files from field GPS loggers.'}
            </p>

            <div style={{ padding: '24px', border: '2px dashed var(--border-strong)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: 'var(--bg-card-alt)' }}>
              <UploadCloud size={32} color="var(--primary-600)" style={{ margin: '0 auto 8px auto' }} />
              <strong style={{ fontSize: '13px', display: 'block' }}>Drag & Drop file or Click to Browse</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Supports .csv, .xlsx, .geojson, .gpx (Up to 50MB)</span>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-outline" onClick={closeModal}>Close</button>
            <button
              className="btn btn-primary"
              onClick={() => {
                addToast('Completed', 'Data processed successfully.', 'success');
                closeModal();
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
