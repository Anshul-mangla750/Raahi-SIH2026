import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Users,
  Bell,
  Sliders,
  Puzzle,
  ShieldCheck,
  ChevronRight,
  Calendar,
  CloudSun,
  Save,
  CheckCircle,
  Key,
  Smartphone,
  Globe,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { WEATHER_DATA } from '@/data/admin/mockData';
import { UserManagementPage } from './UserManagementPage';

export const SettingsPage = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('general');

  // Form State
  const [orgName, setOrgName] = useState('North Eastern Regional Logistics Department');
  const [orgCode, setOrgCode] = useState('NER-LOGI-GOV-2025');
  const [orgEmail, setOrgEmail] = useState('admin.raahi@gov.in');
  const [orgPhone, setOrgPhone] = useState('+91 361 223 4400');
  const [orgAddress, setOrgAddress] = useState('Secretariat Complex, Dispur, Guwahati, Assam 781006');

  // Notification toggles
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [highPrioritySound, setHighPrioritySound] = useState(true);

  // System Preferences
  const [unitSystem, setUnitSystem] = useState('Metric (km, L, km/h)');
  const [timeZone, setTimeZone] = useState('Asia/Kolkata (IST +5:30)');
  const [autoRefreshInterval, setAutoRefreshInterval] = useState('30 seconds');

  const handleSave = (sectionName) => {
    addToast('Settings Saved', `${sectionName} configuration updated successfully.`, 'success');
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'user-management', label: 'User Management' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'system-preferences', label: 'System Preferences' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <div className="settings-page">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1>
            <Settings size={24} color="#059669" />
            Settings
          </h1>
          <p>Manage your account and system preferences.</p>
        </div>

        <div className="header-widgets-group">
          <div className="info-pill-card">
            <Calendar size={18} color="var(--text-muted)" />
            <div className="info-pill-text">
              <span className="info-pill-primary">21 May 2025</span>
              <span className="info-pill-secondary">Wednesday, 10:30 AM</span>
            </div>
          </div>

          <div className="info-pill-card">
            <CloudSun size={20} color="#F59E0B" />
            <div className="info-pill-text">
              <span className="info-pill-primary">{WEATHER_DATA.temp}</span>
              <span className="info-pill-secondary">{WEATHER_DATA.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="settings-tabs-nav">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`settings-tab-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content Display */}
      {activeTab === 'general' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Organization Profile Item */}
          <div className="settings-card-row" onClick={() => {}}>
            <div className="settings-card-left">
              <div className="settings-icon-box">
                <Building2 size={22} />
              </div>
              <div className="settings-card-info">
                <h3>Organization Profile</h3>
                <p>Update organization details, contact information and logo.</p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </div>

          {/* Inline Profile Editor Form */}
          <div className="card" style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
              Edit Organization Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label className="query-field-label">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  style={{ width: '100%', marginTop: 4 }}
                />
              </div>

              <div>
                <label className="query-field-label">Department Code</label>
                <input
                  type="text"
                  value={orgCode}
                  onChange={(e) => setOrgCode(e.target.value)}
                  style={{ width: '100%', marginTop: 4 }}
                />
              </div>

              <div>
                <label className="query-field-label">Official Email</label>
                <input
                  type="email"
                  value={orgEmail}
                  onChange={(e) => setOrgEmail(e.target.value)}
                  style={{ width: '100%', marginTop: 4 }}
                />
              </div>

              <div>
                <label className="query-field-label">Contact Phone</label>
                <input
                  type="text"
                  value={orgPhone}
                  onChange={(e) => setOrgPhone(e.target.value)}
                  style={{ width: '100%', marginTop: 4 }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label className="query-field-label">Headquarters Address</label>
                <input
                  type="text"
                  value={orgAddress}
                  onChange={(e) => setOrgAddress(e.target.value)}
                  style={{ width: '100%', marginTop: 4 }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => handleSave('Organization Profile')}>
                <Save size={14} />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>

          {/* Quick links to other sections */}
          <div className="settings-card-row" onClick={() => setActiveTab('user-management')}>
            <div className="settings-card-left">
              <div className="settings-icon-box" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                <Users size={22} />
              </div>
              <div className="settings-card-info">
                <h3>User Management</h3>
                <p>Manage users, roles and permissions.</p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </div>

          <div className="settings-card-row" onClick={() => setActiveTab('notifications')}>
            <div className="settings-card-left">
              <div className="settings-icon-box" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>
                <Bell size={22} />
              </div>
              <div className="settings-card-info">
                <h3>Notifications</h3>
                <p>Configure alert preferences and notification channels.</p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </div>

          <div className="settings-card-row" onClick={() => setActiveTab('system-preferences')}>
            <div className="settings-card-left">
              <div className="settings-icon-box" style={{ backgroundColor: '#FFFBEB', color: '#D97706' }}>
                <Sliders size={22} />
              </div>
              <div className="settings-card-info">
                <h3>System Preferences</h3>
                <p>Customize system behavior, units, time zone and regional settings.</p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </div>

          <div className="settings-card-row" onClick={() => setActiveTab('integrations')}>
            <div className="settings-card-left">
              <div className="settings-icon-box" style={{ backgroundColor: '#F5F3FF', color: '#7C3AED' }}>
                <Puzzle size={22} />
              </div>
              <div className="settings-card-info">
                <h3>Integrations</h3>
                <p>Manage third-party integrations and API settings.</p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </div>

          <div className="settings-card-row" onClick={() => setActiveTab('security')}>
            <div className="settings-card-left">
              <div className="settings-icon-box" style={{ backgroundColor: '#FEF2F2', color: '#EF4444' }}>
                <ShieldCheck size={22} />
              </div>
              <div className="settings-card-info">
                <h3>Security</h3>
                <p>Manage password policy, two-factor authentication and session settings.</p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </div>
        </div>
      )}

      {/* User Management Tab */}
      {activeTab === 'user-management' && (
        <UserManagementPage />
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
            Alert Dispatch Channels
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--bg-card-alt)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>SMS Emergency Alerts</strong>
                <p style={{ fontSize: '11px', margin: 0 }}>Send instant SMS broadcasts to drivers during landslide and route blocks.</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#059669', cursor: 'pointer' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--bg-card-alt)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>WhatsApp Logistics Updates</strong>
                <p style={{ fontSize: '11px', margin: 0 }}>Automated dispatch alerts and route turn-by-turn links sent via WhatsApp API.</p>
              </div>
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#059669', cursor: 'pointer' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--bg-card-alt)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Email Daily Digest</strong>
                <p style={{ fontSize: '11px', margin: 0 }}>Receive executive logistics summary at 08:00 AM every day.</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#059669', cursor: 'pointer' }}
              />
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button className="btn btn-primary" onClick={() => handleSave('Notification Channels')}>
                <Save size={14} />
                <span>Save Alert Preferences</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Preferences Tab */}
      {activeTab === 'system-preferences' && (
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
            System & Regional Preferences
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label className="query-field-label">Unit System</label>
              <select
                value={unitSystem}
                onChange={(e) => setUnitSystem(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              >
                <option value="Metric (km, L, km/h)">Metric (km, L, km/h)</option>
                <option value="Imperial (mi, gal, mph)">Imperial (mi, gal, mph)</option>
              </select>
            </div>

            <div>
              <label className="query-field-label">Time Zone</label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              >
                <option value="Asia/Kolkata (IST +5:30)">Asia/Kolkata (IST +5:30)</option>
                <option value="UTC">UTC Standard</option>
              </select>
            </div>

            <div>
              <label className="query-field-label">Live Map Telemetry Refresh</label>
              <select
                value={autoRefreshInterval}
                onChange={(e) => setAutoRefreshInterval(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              >
                <option value="15 seconds">15 seconds (Real-time)</option>
                <option value="30 seconds">30 seconds (Recommended)</option>
                <option value="60 seconds">60 seconds (Data Saver)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" onClick={() => handleSave('System Preferences')}>
              <Save size={14} />
              <span>Save System Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
            Third-Party APIs & Hardware GPS Telematics
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Indian Meteorological Dept (IMD) Weather API</strong>
                <p style={{ fontSize: '11px', margin: '2px 0 0 0', color: 'var(--text-muted)' }}>Connected • Real-time rainfall & cloud radar streaming</p>
              </div>
              <span className="badge badge-resolved">Connected</span>
            </div>

            <div style={{ padding: '14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>National Highways Authority of India (NHAI) Toll & FASTag</strong>
                <p style={{ fontSize: '11px', margin: '2px 0 0 0', color: 'var(--text-muted)' }}>Connected • Automated toll cost calculation & plaza throughput</p>
              </div>
              <span className="badge badge-resolved">Connected</span>
            </div>

            <div style={{ padding: '14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Vahan GPS Gateway</strong>
                <p style={{ fontSize: '11px', margin: '2px 0 0 0', color: 'var(--text-muted)' }}>Connected • Live OBD-II fleet tracking & speed telemetry</p>
              </div>
              <span className="badge badge-resolved">Connected</span>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
            Security & Authentication
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '14px', backgroundColor: 'var(--bg-card-alt)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Two-Factor Authentication (2FA)</strong>
                <p style={{ fontSize: '11px', margin: 0 }}>Require Aadhaar OTP or Google Authenticator code upon administrative login.</p>
              </div>
              <span className="badge badge-resolved">Enforced</span>
            </div>

            <div style={{ padding: '14px', backgroundColor: 'var(--bg-card-alt)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Session Timeout</strong>
                <p style={{ fontSize: '11px', margin: 0 }}>Automatically log out inactive operators after 30 minutes.</p>
              </div>
              <span className="badge badge-resolved">30 Minutes</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button className="btn btn-primary" onClick={() => handleSave('Security Policies')}>
                <Save size={14} />
                <span>Save Security Rules</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
