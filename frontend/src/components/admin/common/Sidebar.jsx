import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  Sparkles,
  Route,
  Truck,
  Bell,
  FileText,
  BarChart3,
  Users,
  Settings,
  AlertTriangle,
  PlusCircle,
  AlertOctagon,
  FileSpreadsheet,
  UploadCloud,
  Headphones,
  Radio,
  Wifi,
  ChevronRight,
  Fuel,
  Wrench,
  Network,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const Sidebar = () => {
  const { currentPage, setCurrentPage, sidebarCollapsed, openModal, alerts } = useApp();

  const alertCount = alerts && alerts.length > 0 ? alerts.length : 8;

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-map', label: 'Live Map', icon: MapPin },
    { id: 'ai-predictions', label: 'AI Predictions', icon: Sparkles },
    { id: 'route-optimization', label: 'Route Optimization', icon: Route },
    { id: 'vehicle-tracking', label: 'Vehicle Tracking', icon: Truck },
    {
      id: 'alerts',
      label: 'Alerts & Notifications',
      icon: Bell,
      badge: 8,
      badgeClass: 'danger',
    },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { id: 'field-reports', label: 'Field Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'fuel-management', label: 'Fuel Management', icon: Fuel },
    { id: 'driver-management', label: 'Driver Management', icon: Users },
    { id: 'district-management', label: 'District Management', icon: Network },
    { id: 'user-management', label: 'User Management', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Brand Header */}
      <div className="sidebar-header">
        <a
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('dashboard');
          }}
          className="brand-logo-container"
        >
          {/* Stylized RAAHI / NER LogiSmart Logo SVG */}
          <div className="brand-logo-icon">
            <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <rect width="44" height="44" rx="10" fill="#059669" />
              {/* Mountain silhouettes */}
              <path d="M6 32L16 18L24 28L30 20L38 32H6Z" fill="#10B981" opacity="0.6" />
              {/* Delivery Truck Vector */}
              <path d="M12 28H14M28 28H30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M11 20H24V28H11V20Z" fill="#FFFFFF" />
              <path d="M24 22H29L33 25V28H24V22Z" fill="#FFFFFF" />
              <circle cx="16" cy="28" r="2.5" fill="#047857" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="28" cy="28" r="2.5" fill="#047857" stroke="#FFFFFF" strokeWidth="1.5" />
              <path d="M8 22H6M9 25H5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          {!sidebarCollapsed && (
            <div className="brand-info">
              <span className="brand-name">NER LogiSmart</span>
              <span className="brand-tagline">Smart Routes, Safe Deliveries</span>
            </div>
          )}
        </a>
      </div>

      {/* Sidebar Navigation */}
      <div className="sidebar-content">
        <nav className="nav-group">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`nav-item ${isActive ? 'active' : ''} ${item.isEmergency ? 'emergency' : ''}`}
                title={sidebarCollapsed ? `${item.label}${item.badge ? ` (${item.badge})` : ''}` : undefined}
              >
                <div className="nav-icon-wrapper">
                  <Icon className="nav-icon" />
                  {sidebarCollapsed && item.badge && (
                    <span className="nav-badge-dot" />
                  )}
                </div>
                {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
                {!sidebarCollapsed && item.badge && (
                  <span className={`nav-badge ${item.badgeClass || ''}`}>{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {!sidebarCollapsed && (
          <>
            {/* Quick Actions */}
            <div className="sidebar-section">
              <span className="sidebar-section-title">Quick Actions</span>
              <button className="quick-action-btn" onClick={() => openModal('addVehicle')}>
                <PlusCircle size={15} color="#059669" />
                <span>Add Vehicle</span>
              </button>
              <button className="quick-action-btn" onClick={() => openModal('createAlert')}>
                <AlertOctagon size={15} color="#EF4444" />
                <span>Create Alert</span>
              </button>
              <button className="quick-action-btn" onClick={() => openModal('generateReport')}>
                <FileSpreadsheet size={15} color="#059669" />
                <span>Generate Report</span>
              </button>
              <button className="quick-action-btn" onClick={() => openModal('importData')}>
                <UploadCloud size={15} color="#D97706" />
                <span>Import Data</span>
              </button>
            </div>

            {/* System Status */}
            <div className="sidebar-section">
              <span className="sidebar-section-title">System Status</span>
              <div className="system-status-list">
                <div className="system-status-item">
                  <span>GPS Tracking</span>
                  <span className="status-dot-indicator">Online</span>
                </div>
                <div className="system-status-item">
                  <span>Data Sync</span>
                  <span className="status-dot-indicator">Online</span>
                </div>
                <div className="system-status-item">
                  <span>AI Engine</span>
                  <span className="status-dot-indicator">Online</span>
                </div>
                <div className="system-status-item">
                  <span>Server Status</span>
                  <span className="status-dot-indicator">Online</span>
                </div>
              </div>
            </div>

            {/* Need Help Box */}
            <div className="need-help-card">
              <span className="need-help-title">Need Help?</span>
              <span className="need-help-desc">Our support team is available 24/7 to assist you.</span>
              <button className="support-btn" onClick={() => openModal('support')}>
                <Headphones size={14} />
                <span>Contact Support</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Sidebar Footer / User Profile */}
      <div className="sidebar-footer">
        {!sidebarCollapsed && (
          <div className="offline-mode-pill">
            <Radio size={14} color="#166534" />
            <div>
              <strong style={{ display: 'block', fontSize: '11px' }}>Offline Mode</strong>
              <span style={{ fontSize: '10px', color: '#15803d' }}>Data will sync when online</span>
            </div>
          </div>
        )}

        <div
          className="user-profile-widget"
          onClick={() => setCurrentPage('settings')}
          title="Government Admin Settings"
        >
          <img
            src="/assets/branding/gov_emblem.jpg"
            alt="Admin"
            className="user-avatar"
          />
          {!sidebarCollapsed && (
            <>
              <div className="user-details">
                <div className="user-name">Admin User</div>
                <div className="user-role">Government Admin</div>
              </div>
              <ChevronRight size={16} color="var(--text-muted)" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
