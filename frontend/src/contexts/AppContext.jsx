import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FIELD_REPORTS_TABLE, RECENT_ALERTS, LIVE_VEHICLES_LIST } from '@/data/admin/mockData';
import ApiClient from '@/lib/api';
import { subscribeToVehiclePositions, subscribeToAlerts } from '@/lib/socket';

const pageToPath = {
  'dashboard': '/admin',
  'live-map': '/admin/live-map',
  'ai-predictions': '/admin/ai-predictions',
  'route-optimization': '/admin/route-optimization',
  'vehicle-tracking': '/admin/vehicle-tracking',
  'alerts': '/admin/alerts',
  'emergency': '/admin/emergency',
  'field-reports': '/admin/field-reports',
  'analytics': '/admin/analytics',
  'fuel-management': '/admin/analytics',
  'driver-management': '/admin/users',
  'maintenance': '/admin/vehicle-tracking',
  'users': '/admin/users',
  'settings': '/admin/settings',
};

const pathToPage = {
  '/admin': 'dashboard',
  '/admin/': 'dashboard',
  '/admin/dashboard': 'dashboard',
  '/admin/live-map': 'live-map',
  '/admin/ai-predictions': 'ai-predictions',
  '/admin/route-optimization': 'route-optimization',
  '/admin/vehicle-tracking': 'vehicle-tracking',
  '/admin/alerts': 'alerts',
  '/admin/field-reports': 'field-reports',
  '/admin/analytics': 'analytics',
  '/admin/emergency': 'emergency',
  '/admin/users': 'users',
  '/admin/settings': 'settings',
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = pathToPage[location.pathname] || (
    location.pathname.startsWith('/admin/')
      ? location.pathname.replace('/admin/', '').split('/')[0]
      : 'dashboard'
  );

  const setCurrentPage = (page) => {
    const targetPath = pageToPath[page] || `/admin/${page}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Drawers state
  const [activeModal, setActiveModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Dynamic Data Lists
  const [reports, setReports] = useState(FIELD_REPORTS_TABLE || []);
  const [alerts, setAlerts] = useState(RECENT_ALERTS || []);
  const [vehicles, setVehicles] = useState(LIVE_VEHICLES_LIST || []);
  const [kpis, setKpis] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 1. Initial Data Fetching from Live Backend
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [kpiRes, alertsRes, reportsRes, vehiclesRes] = await Promise.all([
          ApiClient.getAdminKpis(),
          ApiClient.getAdminAlerts(),
          ApiClient.getAdminFieldReports(),
          ApiClient.getAdminVehicles(),
        ]);

        if (kpiRes?.success && kpiRes.data) {
          setKpis(kpiRes.data);
        }
        if (alertsRes?.success && alertsRes.data && alertsRes.data.length > 0) {
          setAlerts(alertsRes.data);
        }
        if (reportsRes?.success && reportsRes.data && reportsRes.data.length > 0) {
          setReports(reportsRes.data);
        }
        if (vehiclesRes?.success && vehiclesRes.data && vehiclesRes.data.length > 0) {
          // Normalize vehicle models
          const normalized = vehiclesRes.data.map(v => ({
            id: v.id,
            model: v.model,
            driver: v.driver?.name || 'Assigned Driver',
            status: v.status ? v.status.charAt(0).toUpperCase() + v.status.slice(1) : 'Moving',
            statusClass: v.status || 'moving',
            speed: `${v.speed || 45} km/h`,
            time: new Date(v.last_ping_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            route: v.current_route || 'Assam Highway Corridor',
            lat: v.current_lat,
            lng: v.current_lng,
            fuel: `${v.fuel_percent || 75}%`,
          }));
          setVehicles(normalized);
        }
      } catch (err) {
        console.warn('Initial data load notice (using fallback seed):', err);
      }
    };

    fetchInitialData();
  }, []);

  // 2. Real-Time Socket.io Subscriptions (Live GPS Telemetry & Alerts)
  useEffect(() => {
    // Listen for live vehicle GPS position updates
    const unsubscribeVehicles = subscribeToVehiclePositions((payload) => {
      setVehicles(prev => {
        const index = prev.findIndex(v => v.id === payload.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            lat: payload.lat,
            lng: payload.lng,
            speed: `${payload.speed} km/h`,
            fuel: `${payload.fuel}%`,
            status: payload.status ? payload.status.charAt(0).toUpperCase() + payload.status.slice(1) : updated[index].status,
            statusClass: payload.status || updated[index].statusClass,
            time: new Date(payload.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return updated;
        } else {
          return [payload, ...prev];
        }
      });
    });

    // Listen for real-time alert broadcasts
    const unsubscribeAlerts = subscribeToAlerts((newAlert) => {
      setAlerts(prev => [newAlert, ...prev]);
      addToast('Hazard Broadcast Alert', newAlert.title || 'New corridor alert received', 'warning');
    });

    return () => {
      unsubscribeVehicles();
      unsubscribeAlerts();
    };
  }, []);

  const openModal = (modalName, item = null) => {
    setActiveModal(modalName);
    setSelectedItem(item);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedItem(null);
  };

  const addFieldReport = async (newReport) => {
    setReports(prev => [newReport, ...prev]);
    addToast('Report Created', `Field Report ${newReport.id} successfully submitted.`, 'success');
    try {
      await ApiClient.reportIncident(newReport);
    } catch (e) {}
  };

  const verifyReport = async (reportId) => {
    setReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, status: 'Resolved' } : r))
    );
    addToast('Report Verified', `Field Report ${reportId} marked as verified.`, 'success');
    try {
      await ApiClient.verifyFieldReport(reportId);
    } catch (e) {}
  };

  const addVehicle = (newVehicle) => {
    setVehicles(prev => [newVehicle, ...prev]);
    addToast('Vehicle Added', `Vehicle ${newVehicle.id} added to active fleet.`, 'success');
  };

  const addAlert = async (newAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
    addToast('Alert Broadcasted', newAlert.title, 'warning');
    try {
      await ApiClient.createAlert(newAlert);
    } catch (e) {}
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        sidebarCollapsed,
        setSidebarCollapsed,
        searchQuery,
        setSearchQuery,
        activeModal,
        openModal,
        closeModal,
        selectedItem,
        setSelectedItem,
        reports,
        setReports,
        alerts,
        setAlerts,
        vehicles,
        setVehicles,
        kpis,
        addFieldReport,
        verifyReport,
        addVehicle,
        addAlert,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
