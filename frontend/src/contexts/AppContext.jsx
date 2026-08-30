import React, { createContext, useContext, useState } from 'react';
import { FIELD_REPORTS_TABLE, RECENT_ALERTS, LIVE_VEHICLES_LIST } from '@/data/admin/mockData';


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Drawers state
  const [activeModal, setActiveModal] = useState(null); // 'addVehicle' | 'createAlert' | 'generateReport' | 'importData' | 'createReport' | 'exportPlan' | 'support' | 'reportDetail'
  const [selectedItem, setSelectedItem] = useState(null);

  // Dynamic Data Lists (allow user to add new reports, vehicles, alerts)
  const [reports, setReports] = useState(FIELD_REPORTS_TABLE || []);
  const [alerts, setAlerts] = useState(RECENT_ALERTS || []);
  const [vehicles, setVehicles] = useState(LIVE_VEHICLES_LIST || []);

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

  const openModal = (modalName, item = null) => {
    setActiveModal(modalName);
    setSelectedItem(item);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedItem(null);
  };

  const addFieldReport = (newReport) => {
    setReports(prev => [newReport, ...prev]);
    addToast('Report Created', `Field Report ${newReport.id} successfully submitted.`, 'success');
  };

  const addVehicle = (newVehicle) => {
    setVehicles(prev => [newVehicle, ...prev]);
    addToast('Vehicle Added', `Vehicle ${newVehicle.id} added to active fleet.`, 'success');
  };

  const addAlert = (newAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
    addToast('Alert Broadcasted', newAlert.title, 'warning');
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
        addFieldReport,
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
