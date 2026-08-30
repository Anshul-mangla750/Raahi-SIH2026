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

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* RAAHI Home / Landing Page */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              {/* RAAHI Login Page */}
              <Route path="/login" element={<Login />} />

              {/* Admin Dashboard Portal Routes */}
              <Route path="/admin/*" element={<AdminDashboardApp />} />

              {/* Transporter Dashboard Hub Routes */}
              <Route path="/transporter/*" element={<TransporterApp />} />
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
