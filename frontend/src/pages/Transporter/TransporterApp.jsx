import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TransporterDashboard from './TransporterDashboard';
import MyConsignments from './MyConsignments';
import MyVehicles from './MyVehicles';
import LiveTrackingPage from './LiveTrackingPage';
import RoutePlanningPage from './RoutePlanningPage';
import AlertsPage from './AlertsPage';
import DeliveryHistoryPage from './DeliveryHistoryPage';
import ReportsPage from './ReportsPage';
import SettingsPage from './SettingsPage';
import HelpSupportPage from './HelpSupportPage';

export default function TransporterApp() {
  return (
    <Routes>
      <Route path="/" element={<TransporterDashboard />} />
      <Route path="/dashboard" element={<TransporterDashboard />} />
      <Route path="/consignments" element={<MyConsignments />} />
      <Route path="/vehicles" element={<MyVehicles />} />
      <Route path="/live-tracking" element={<LiveTrackingPage />} />
      <Route path="/tracking" element={<LiveTrackingPage />} />
      <Route path="/routes" element={<RoutePlanningPage />} />
      <Route path="/route-planning" element={<RoutePlanningPage />} />
      <Route path="/alerts" element={<AlertsPage />} />
      <Route path="/delivery-history" element={<DeliveryHistoryPage />} />
      <Route path="/history" element={<DeliveryHistoryPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/help" element={<HelpSupportPage />} />
      <Route path="/support" element={<HelpSupportPage />} />
      <Route path="*" element={<Navigate to="/transporter/dashboard" replace />} />
    </Routes>
  );
}
