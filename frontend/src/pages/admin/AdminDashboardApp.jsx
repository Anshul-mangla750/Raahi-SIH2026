import React from 'react';
import { Sidebar } from '@/components/admin/common/Sidebar';
import { TopHeader } from '@/components/admin/common/TopHeader';
import { ToastContainer } from '@/components/admin/common/Toast';
import { ModalManager } from '@/components/admin/modals/ModalManager';
import { AppProvider, useApp } from '@/contexts/AppContext';

// Pages
import { DashboardPage } from './DashboardPage';
import { VehicleTrackingPage } from './VehicleTrackingPage';
import { RouteOptimizationPage } from './RouteOptimizationPage';
import { FieldReportsPage } from './FieldReportsPage';
import { SettingsPage } from './SettingsPage';
import { LiveMapPage } from './LiveMapPage';
import { AIPredictionsPage } from './AIPredictionsPage';
import { AlertsPage } from './AlertsPage';
import { AnalyticsPage } from './AnalyticsPage';
import { EmergencyModePage } from './EmergencyModePage';

function AdminContent() {
  const { currentPage } = useApp();

  const renderActivePage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'live-map':
        return <LiveMapPage />;
      case 'ai-predictions':
        return <AIPredictionsPage />;
      case 'route-optimization':
        return <RouteOptimizationPage />;
      case 'vehicle-tracking':
        return <VehicleTrackingPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'field-reports':
        return <FieldReportsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'emergency':
        return <EmergencyModePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <TopHeader />
        <div className="content-scroll-container">
          <main className="main-content">
            {renderActivePage()}
          </main>
          <footer className="app-footer">
            <span>© 2026 RAAHI / NER LogiSmart Admin. All rights reserved.</span>
            <span>Version 2.4.1 • Government of India Initiative</span>
          </footer>
        </div>
      </div>
      <ModalManager />
      <ToastContainer />
    </div>
  );
}

export default function AdminDashboardApp() {
  return (
    <AppProvider>
      <AdminContent />
    </AppProvider>
  );
}
