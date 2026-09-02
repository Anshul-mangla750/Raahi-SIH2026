import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/admin/common/Sidebar';
import { TopHeader } from '@/components/admin/common/TopHeader';
import { ToastContainer } from '@/components/admin/common/Toast';
import { ModalManager } from '@/components/admin/modals/ModalManager';
import { AppProvider } from '@/contexts/AppContext';

function AdminContent() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <TopHeader />
        <div className="content-scroll-container">
          <main className="main-content">
            <Outlet />
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
