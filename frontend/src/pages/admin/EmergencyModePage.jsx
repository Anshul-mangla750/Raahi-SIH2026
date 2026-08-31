import React, { useState } from 'react';
import {
  AlertTriangle,
  Radio,
  Truck,
  ShieldAlert,
  Flame,
  PhoneCall,
  Navigation,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const EmergencyModePage = () => {
  const { addToast } = useApp();
  const [emergencyActive, setEmergencyActive] = useState(true);

  const emergencySectors = [
    {
      sector: 'Dima Hasao - Hill Section',
      hazard: 'Severe Landslide & Track Subsidence',
      ndrfUnit: '1st Battalion NDRF Guwahati',
      supplyVehicles: 8,
      status: 'High Alert',
    },
    {
      sector: 'East Khasi Hills - Cherrapunji Bypass',
      hazard: 'Flash Flooding & Mudslide',
      ndrfUnit: 'SDRF Meghalaya Contingent',
      supplyVehicles: 5,
      status: 'Relief Dispatched',
    },
    {
      sector: 'Lohit Valley Approach',
      hazard: 'River Waterlogging (Subansiri/Lohit)',
      ndrfUnit: '12th Battalion NDRF Itanagar',
      supplyVehicles: 4,
      status: 'Monitoring',
    },
  ];

  const handleBroadcastSOS = () => {
    addToast('Emergency SOS Broadcasted', 'Priority corridor alert transmitted to all regional drivers and NDRF command.', 'danger');
  };

  return (
    <div className="emergency-page" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Emergency Alert Banner */}
      <div
        style={{
          backgroundColor: '#FEF2F2',
          border: '2px solid #EF4444',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 1.5s infinite',
            }}
          >
            <AlertTriangle size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#991B1B', margin: 0 }}>
              DISASTER RESPONSE & EMERGENCY LOGISTICS CORRIDOR
            </h2>
            <p style={{ fontSize: '13px', color: '#B91C1C', margin: '4px 0 0 0' }}>
              Monsoon High-Alert Protocol Active across Brahmaputra Valley & Meghalaya Ridge.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-danger" onClick={handleBroadcastSOS}>
            <Radio size={16} />
            <span>Broadcast Regional SOS</span>
          </button>
        </div>
      </div>

      {/* Emergency Operations Center Details */}
      <div className="grid-3">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <PhoneCall size={20} color="#EF4444" />
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>NDRF Control Room</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Toll-Free Emergency Dispatch: <strong>1070 / 1077</strong>
          </p>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
            Direct radio link channel: <strong>VHF-NER-94.2 MHz</strong>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Truck size={20} color="#059669" />
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Priority Relief Convoys</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#047857' }}>17 Trucks Active</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Carrying medical supplies, rations, and potable water.
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Navigation size={20} color="#2563EB" />
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Green Corridor Status</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#2563EB' }}>3 Active Zones</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Toll plazas set to instant automated barrier pass.
          </div>
        </div>
      </div>

      {/* Emergency Sectors Table */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Active Disaster Hotspots & Coordinated Response</h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Sector</th>
                <th>Hazard Type</th>
                <th>Assigned Rescue / SDRF Unit</th>
                <th>Supply Convoys</th>
                <th>Operational Status</th>
              </tr>
            </thead>
            <tbody>
              {emergencySectors.map((sec, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{sec.sector}</td>
                  <td style={{ color: '#EF4444', fontWeight: 600 }}>{sec.hazard}</td>
                  <td>{sec.ndrfUnit}</td>
                  <td>{sec.supplyVehicles} Vehicles</td>
                  <td>
                    <span className="badge badge-high">{sec.status}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '4px 10px', fontSize: '11px', marginRight: '6px' }}
                      onClick={() => addToast('Convoy Dispatched', `Emergency relief convoy dispatched to ${sec.sector}.`, 'success')}
                    >
                      Deploy Convoy
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                      onClick={() => addToast('Corridor Cleared', `Green corridor transit protocol enforced for ${sec.sector}.`, 'info')}
                    >
                      Clear Corridor
                    </button>
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
