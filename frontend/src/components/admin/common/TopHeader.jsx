import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  AlertTriangle,
  Radio,
  X,
  Truck,
  Route,
  FileText,
  Shield,
  ExternalLink,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTheme } from '@/contexts/ThemeContext';

export const TopHeader = () => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    searchQuery,
    setSearchQuery,
    alerts,
    vehicles,
    reports,
    openModal,
    setCurrentPage,
  } = useApp();
  const { theme, toggleTheme } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Global Ctrl+K or Cmd+K shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search Results filtering
  const query = searchQuery.trim().toLowerCase();
  const matchedVehicles = query
    ? (vehicles || []).filter(
        (v) =>
          v.id?.toLowerCase().includes(query) ||
          v.route?.toLowerCase().includes(query) ||
          v.driver?.toLowerCase().includes(query)
      ).slice(0, 3)
    : [];

  const matchedAlerts = query
    ? (alerts || []).filter(
        (a) =>
          a.title?.toLowerCase().includes(query) ||
          a.location?.toLowerCase().includes(query)
      ).slice(0, 3)
    : [];

  const matchedReports = query
    ? (reports || []).filter(
        (r) =>
          r.title?.toLowerCase().includes(query) ||
          r.district?.toLowerCase().includes(query) ||
          r.highway?.toLowerCase().includes(query)
      ).slice(0, 3)
    : [];

  const totalResults = matchedVehicles.length + matchedAlerts.length + matchedReports.length;

  return (
    <header className="top-header">
      {/* Left Section: Sidebar Toggle & Smart Search */}
      <div className="header-left">
        <button
          className="toggle-sidebar-btn"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? 'Expand Navigation (Ctrl+\\)' : 'Collapse Navigation (Ctrl+\\)'}
          aria-label="Toggle Sidebar"
        >
          <Menu size={19} />
        </button>

        {/* Global Search Bar */}
        <div className="search-bar-container" ref={searchContainerRef}>
          <Search size={16} className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Search routes, vehicles, districts, alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />

          {searchQuery ? (
            <button
              className="search-clear-btn"
              onClick={() => {
                setSearchQuery('');
                searchInputRef.current?.focus();
              }}
              title="Clear search"
            >
              <X size={14} />
            </button>
          ) : (
            <span className="search-shortcut-badge">⌘K</span>
          )}

          {/* Instant Search Results Dropdown */}
          {isSearchFocused && query && (
            <div className="search-dropdown-menu">
              <div className="search-dropdown-header">
                <span>Quick Results ({totalResults})</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Press Esc to close</span>
              </div>

              <div className="search-dropdown-body">
                {totalResults === 0 ? (
                  <div className="search-no-results">
                    <span>No matches found for "{searchQuery}"</span>
                  </div>
                ) : (
                  <>
                    {/* Vehicles */}
                    {matchedVehicles.length > 0 && (
                      <div className="search-result-group">
                        <div className="search-group-title">
                          <Truck size={12} />
                          <span>Vehicles ({matchedVehicles.length})</span>
                        </div>
                        {matchedVehicles.map((v) => (
                          <div
                            key={v.id}
                            className="search-result-item"
                            onClick={() => {
                              setCurrentPage('vehicle-tracking');
                              setIsSearchFocused(false);
                            }}
                          >
                            <span className="search-item-primary">{v.id}</span>
                            <span className="search-item-secondary">{v.route} • {v.driver}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Alerts */}
                    {matchedAlerts.length > 0 && (
                      <div className="search-result-group">
                        <div className="search-group-title">
                          <AlertTriangle size={12} />
                          <span>Alerts ({matchedAlerts.length})</span>
                        </div>
                        {matchedAlerts.map((a) => (
                          <div
                            key={a.id}
                            className="search-result-item"
                            onClick={() => {
                              setCurrentPage('alerts');
                              setIsSearchFocused(false);
                            }}
                          >
                            <span className="search-item-primary">{a.title}</span>
                            <span className="search-item-secondary">{a.location} • {a.time}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Field Reports */}
                    {matchedReports.length > 0 && (
                      <div className="search-result-group">
                        <div className="search-group-title">
                          <FileText size={12} />
                          <span>Field Reports ({matchedReports.length})</span>
                        </div>
                        {matchedReports.map((r) => (
                          <div
                            key={r.id}
                            className="search-result-item"
                            onClick={() => {
                              setCurrentPage('field-reports');
                              setIsSearchFocused(false);
                            }}
                          >
                            <span className="search-item-primary">{r.title || r.issueType}</span>
                            <span className="search-item-secondary">{r.district} • {r.highway}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Section: Telemetry Status & Emergency Trigger */}
      <div className="header-center">
        <div className="corridor-status-pill">
          <span className="pulse-dot-green" />
          <span className="corridor-status-text">
            <strong>NER Logistics Grid</strong>
            <span className="corridor-subtext">• 312 Vehicles Active</span>
          </span>
        </div>

        <button
          className="header-emergency-btn"
          onClick={() => setCurrentPage('emergency')}
          title="Switch to Disaster / Emergency Response Mode"
        >
          <AlertTriangle size={14} />
          <span>Emergency SOS</span>
        </button>
      </div>

      {/* Right Section: Theme Toggle, Notifications, Admin Profile */}
      <div className="header-right">
        {/* Theme Toggle */}
        <button
          className="header-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          aria-label="Toggle color theme"
        >
          {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Bell */}
        <div className="header-popover-anchor" ref={notificationRef}>
          <button
            className={`header-btn ${showNotifications ? 'active' : ''}`}
            onClick={() => setShowNotifications(!showNotifications)}
            title="Alerts and Notifications"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {alerts && alerts.length > 0 && (
              <span className="header-badge">{alerts.length}</span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <div className="header-dropdown-menu notifications-menu">
              <div className="dropdown-menu-header">
                <div>
                  <strong className="dropdown-title">Alerts & Telemetry</strong>
                  <span className="dropdown-count-tag">{alerts.length} New</span>
                </div>
                <button
                  className="dropdown-action-link"
                  onClick={() => {
                    setShowNotifications(false);
                    setCurrentPage('alerts');
                  }}
                >
                  View All
                </button>
              </div>

              <div className="notifications-list">
                {alerts.map((alt) => (
                  <div
                    key={alt.id}
                    className="notification-item"
                    onClick={() => {
                      setShowNotifications(false);
                      setCurrentPage('alerts');
                    }}
                  >
                    <div className="notification-item-top">
                      <span className={`badge badge-${alt.severityClass || 'medium'}`}>
                        {alt.severity}
                      </span>
                      <span className="notification-time">{alt.time}</span>
                    </div>
                    <p className="notification-title">{alt.title}</p>
                    {alt.location && (
                      <span className="notification-location">{alt.location}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="dropdown-menu-footer">
                <button
                  className="dropdown-footer-btn"
                  onClick={() => {
                    setShowNotifications(false);
                    setCurrentPage('alerts');
                  }}
                >
                  Go to Incident Command Center
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Government Admin Profile Badge */}
        <div className="header-popover-anchor" ref={profileRef}>
          <div
            className={`gov-profile-badge ${showProfileMenu ? 'active' : ''}`}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            role="button"
            tabIndex={0}
          >
            <div className="gov-crest-wrapper">
              <img
                src="/assets/branding/gov_emblem.jpg"
                alt="State Govt Emblem"
                className="gov-crest-img"
              />
              <span className="gov-online-dot" />
            </div>
            <div className="gov-profile-info">
              <span className="gov-profile-title">Government Admin</span>
              <span className="gov-profile-subtitle">Ministry of DoNER</span>
            </div>
            <ChevronDown
              size={14}
              className={`profile-chevron ${showProfileMenu ? 'rotated' : ''}`}
            />
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="header-dropdown-menu profile-menu">
              <div className="profile-dropdown-header">
                <div className="profile-badge-emblem">
                  <img
                    src="/assets/branding/gov_emblem.jpg"
                    alt="Govt Crest"
                    className="profile-crest-lg"
                  />
                </div>
                <div className="profile-details-lg">
                  <strong>Logistics Operations Officer</strong>
                  <span className="profile-email">admin.raahi@gov.in</span>
                  <span className="profile-dept-tag">North Eastern Council (NEC)</span>
                </div>
              </div>

              <div className="dropdown-divider" />

              <div className="dropdown-menu-links">
                <button
                  className="dropdown-link-item"
                  onClick={() => {
                    setShowProfileMenu(false);
                    setCurrentPage('settings');
                  }}
                >
                  <Settings size={15} />
                  <span>Account & System Settings</span>
                </button>
                <button
                  className="dropdown-link-item"
                  onClick={() => {
                    setShowProfileMenu(false);
                    openModal('support');
                  }}
                >
                  <HelpCircle size={15} />
                  <span>Support & SOP Protocols</span>
                </button>
              </div>

              <div className="dropdown-divider" />

              <div className="dropdown-menu-footer">
                <button
                  className="dropdown-link-item danger"
                  onClick={() => {
                    setShowProfileMenu(false);
                    openModal('support', { topic: 'Sign Out' });
                  }}
                >
                  <LogOut size={15} />
                  <span>Sign Out Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

