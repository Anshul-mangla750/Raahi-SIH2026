import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';

import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboardApp from './pages/admin/AdminDashboardApp';
import TransporterApp from './pages/Transporter/TransporterApp';
import ProtectedRoute from './components/auth/ProtectedRoute';

import { DashboardPage } from './pages/admin/DashboardPage';
import { LiveMapPage } from './pages/admin/LiveMapPage';
import { AIPredictionsPage } from './pages/admin/AIPredictionsPage';
import { RouteOptimizationPage } from './pages/admin/RouteOptimizationPage';
import { VehicleTrackingPage } from './pages/admin/VehicleTrackingPage';
import { AlertsPage } from './pages/admin/AlertsPage';
import { FieldReportsPage } from './pages/admin/FieldReportsPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { EmergencyModePage } from './pages/admin/EmergencyModePage';
import { SettingsPage } from './pages/admin/SettingsPage';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public RAAHI Home / Landing Page */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              {/* Public Login Page */}
              <Route path="/login" element={<Login />} />

              {/* JWT Protected Admin Dashboard Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['official', 'admin', 'district_officer']}>
                    <AdminDashboardApp />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="dashboard" element={<Navigate to="/admin" replace />} />
                <Route path="live-map" element={<LiveMapPage />} />
                <Route path="ai-predictions" element={<AIPredictionsPage />} />
                <Route path="route-optimization" element={<RouteOptimizationPage />} />
                <Route path="vehicle-tracking" element={<VehicleTrackingPage />} />
                <Route path="alerts" element={<AlertsPage />} />
                <Route path="field-reports" element={<FieldReportsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="emergency" element={<EmergencyModePage />} />
                <Route path="users" element={<SettingsPage initialTab="user-management" />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* JWT Protected Transporter Dashboard Hub Routes */}
              <Route
                path="/transporter/*"
                element={
                  <ProtectedRoute allowedRoles={['operator', 'transporter', 'driver', 'admin', 'official']}>
                    <TransporterApp />
                  </ProtectedRoute>
                }
              />

              {/* Quick Navigation Redirects with Route Protection */}
              <Route path="/dashboard" element={<Navigate to="/transporter/dashboard" replace />} />
              <Route path="/consignments" element={<Navigate to="/transporter/consignments" replace />} />
              <Route path="/vehicles" element={<Navigate to="/transporter/vehicles" replace />} />
              <Route path="/live-tracking" element={<Navigate to="/transporter/live-tracking" replace />} />
              <Route path="/tracking" element={<Navigate to="/transporter/tracking" replace />} />
              <Route path="/routes" element={<Navigate to="/transporter/routes" replace />} />
              <Route path="/route-planning" element={<Navigate to="/transporter/route-planning" replace />} />
              <Route path="/alerts" element={<Navigate to="/transporter/alerts" replace />} />
              <Route path="/delivery-history" element={<Navigate to="/transporter/delivery-history" replace />} />
              <Route path="/history" element={<Navigate to="/transporter/history" replace />} />
              <Route path="/reports" element={<Navigate to="/transporter/reports" replace />} />
              <Route path="/settings" element={<Navigate to="/transporter/settings" replace />} />
              <Route path="/help" element={<Navigate to="/transporter/help" replace />} />
              <Route path="/support" element={<Navigate to="/transporter/support" replace />} />

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
