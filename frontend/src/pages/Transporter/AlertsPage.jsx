import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Filter,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import AlertsKPIs from '../../components/alerts/AlertsKPIs';
import AlertsListPanel from '../../components/alerts/AlertsListPanel';
import AlertDetailsPanel from '../../components/alerts/AlertDetailsPanel';
import { alertsListData } from '../../data/alertsData';

export default function AlertsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState(alertsListData);
  const [selectedAlertId, setSelectedAlertId] = useState('ALERT-001');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Filter alerts based on search and tab
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      // Search matching
      const matchesSearch =
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Tab matching
      if (activeTab === 'all') return true;
      if (activeTab === 'unread') return !alert.isRead;
      if (activeTab === 'high') return alert.severityType === 'high';
      if (activeTab === 'medium') return alert.severityType === 'medium';
      if (activeTab === 'resolved') return alert.status === 'Resolved';
      return true;
    });
  }, [alerts, searchQuery, activeTab]);

  const selectedAlert = useMemo(() => {
    return alerts.find((a) => a.id === selectedAlertId) || filteredAlerts[0] || null;
  }, [alerts, selectedAlertId, filteredAlerts]);

  const handleMarkAsRead = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, isRead: true, status: 'Read' } : a))
    );
    triggerToast('Alert marked as read.');
  };

  const handleMarkAllAsRead = () => {
    setAlerts((prev) =>
      prev.map((a) => ({ ...a, isRead: true, status: 'Read' }))
    );
    triggerToast('All alerts marked as read.');
  };

  const handleShareAlert = () => {
    triggerToast('Alert link copied to clipboard!');
  };

  const handleDownloadReport = () => {
    triggerToast('Incident report PDF downloaded.');
  };

  const handleViewAlternateRoute = () => {
    triggerToast('Alternate route preview highlighted on navigation corridor.');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex selection:bg-emerald-500 selection:text-white font-sans antialiased text-slate-900">
      {/* Fixed Transporter Sidebar */}
      <TransporterSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <TransporterHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isDashboard={false}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 space-y-5 relative">
          {/* Page Header: Title & Right Controls matching reference */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1E36] tracking-tight leading-tight">
                Alerts
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-0.5">
                Real-time alerts on route disruptions and smart alternate route suggestions.
              </p>
            </div>

            {/* Right Controls: Filter dropdown & Date Range dropdown */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto flex-shrink-0">
              {/* All Alerts Dropdown */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>All Alerts</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Date Range Selector */}
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Last 7 Days</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Mark All as Read Button */}
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                title="Mark all as read"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
            </div>
          </div>

          {/* 4 Summary Statistic Cards */}
          <section>
            <AlertsKPIs />
          </section>

          {/* Main Two-Column Section: Alert List & Alert Details Panel */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left: Alert List Panel (~5/12) */}
            <div className="lg:col-span-5 xl:col-span-5">
              <AlertsListPanel
                alerts={filteredAlerts}
                selectedAlert={selectedAlert}
                onSelectAlert={(a) => setSelectedAlertId(a.id)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>

            {/* Right: Alert Details Panel (~7/12) */}
            <div className="lg:col-span-7 xl:col-span-7">
              {selectedAlert ? (
                <AlertDetailsPanel
                  alert={selectedAlert}
                  onClose={() => {}}
                  onViewAlternateRoute={handleViewAlternateRoute}
                  onShareAlert={handleShareAlert}
                  onDownloadReport={handleDownloadReport}
                  onMarkAsRead={() => handleMarkAsRead(selectedAlert.id)}
                />
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-8 text-center text-slate-400 text-xs font-semibold">
                  Select an alert from the list to view full disruption details and alternate routes.
                </div>
              )}
            </div>
          </section>

          {/* Floating Action Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed bottom-6 right-6 z-[9999] bg-[#0B1E36] text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700/80 flex items-center gap-2.5 text-xs font-bold"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
