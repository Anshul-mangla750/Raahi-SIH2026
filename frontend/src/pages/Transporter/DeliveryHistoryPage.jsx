import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Download,
  ChevronDown,
} from 'lucide-react';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import DeliveryHistoryKPIs from '../../components/deliveryHistory/DeliveryHistoryKPIs';
import DeliveryHistoryFilters from '../../components/deliveryHistory/DeliveryHistoryFilters';
import DeliveryHistoryTable from '../../components/deliveryHistory/DeliveryHistoryTable';
import DeliveryDetailsModal from '../../components/deliveryHistory/DeliveryDetailsModal';
import { deliveryHistoryList } from '../../data/deliveryHistoryData';

export default function DeliveryHistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deliveries, setDeliveries] = useState(deliveryHistoryList);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [routeFilter, setRouteFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setVehicleFilter('all');
    setRouteFilter('all');
    setActiveTab('all');
    triggerToast('Filters reset to default.');
  };

  const handleExportReport = () => {
    triggerToast('Delivery history report exported as CSV.');
  };

  const handleDownloadReceipt = () => {
    triggerToast('Consignment delivery receipt PDF generated.');
  };

  // Filter deliveries
  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          item.id.toLowerCase().includes(q) ||
          item.receiver.toLowerCase().includes(q) ||
          item.origin.toLowerCase().includes(q) ||
          item.destination.toLowerCase().includes(q) ||
          item.vehicleNo.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Status Dropdown
      if (statusFilter !== 'all') {
        if (item.status !== statusFilter) return false;
      }

      // 3. Tab Filter
      if (activeTab !== 'all') {
        if (activeTab === 'completed' && item.status !== 'Delivered') return false;
        if (activeTab === 'delayed' && item.status !== 'Delayed') return false;
        if (activeTab === 'cancelled' && item.status !== 'Cancelled') return false;
      }

      // 4. Vehicle Dropdown
      if (vehicleFilter !== 'all') {
        if (item.vehicleNo !== vehicleFilter) return false;
      }

      // 5. Route Dropdown
      if (routeFilter !== 'all') {
        const routeString = `${item.origin.split(',')[0]} → ${item.destination.split(',')[0]}`;
        if (routeString !== routeFilter) return false;
      }

      return true;
    });
  }, [deliveries, searchQuery, statusFilter, vehicleFilter, routeFilter, activeTab]);

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
          {/* Page Header: Title & Right Controls matching reference image */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1E36] tracking-tight leading-tight">
                Delivery History
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-0.5">
                Track all your completed deliveries and their performance.
              </p>
            </div>

            {/* Right Controls: Export Report & Date Range Selector */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto flex-shrink-0">
              {/* Export Report Button */}
              <button
                type="button"
                onClick={handleExportReport}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Report</span>
              </button>

              {/* Date Range Selector */}
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>21 May – 28 May 2025</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* 5 Summary Statistic Cards */}
          <section>
            <DeliveryHistoryKPIs />
          </section>

          {/* Filter Controls Row */}
          <section>
            <DeliveryHistoryFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              vehicleFilter={vehicleFilter}
              onVehicleChange={setVehicleFilter}
              routeFilter={routeFilter}
              onRouteChange={setRouteFilter}
              onReset={handleResetFilters}
            />
          </section>

          {/* Delivery History Table Section */}
          <section className="space-y-4">
            <DeliveryHistoryTable
              deliveries={filteredDeliveries}
              onSelectDelivery={(item) => setSelectedDelivery(item)}
            />

            {/* Pagination Row matching reference */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-1">
              <span>Showing 1 to {filteredDeliveries.length} of 156 deliveries</span>

              <div className="flex items-center gap-1 font-bold">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-xl border border-slate-200/90 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === 1
                      ? 'bg-[#0D7A48] text-white shadow-2xs font-extrabold'
                      : 'border border-slate-200/90 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === 2
                      ? 'bg-[#0D7A48] text-white shadow-2xs font-extrabold'
                      : 'border border-slate-200/90 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(3)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === 3
                      ? 'bg-[#0D7A48] text-white shadow-2xs font-extrabold'
                      : 'border border-slate-200/90 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  3
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(4)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === 4
                      ? 'bg-[#0D7A48] text-white shadow-2xs font-extrabold'
                      : 'border border-slate-200/90 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  4
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(26)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === 26
                      ? 'bg-[#0D7A48] text-white shadow-2xs font-extrabold'
                      : 'border border-slate-200/90 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  26
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(26, p + 1))}
                  className="w-8 h-8 rounded-xl border border-slate-200/90 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                >
                  ›
                </button>
              </div>
            </div>
          </section>

          {/* Delivery Details Modal with Leaflet Route Map */}
          {selectedDelivery && (
            <DeliveryDetailsModal
              delivery={selectedDelivery}
              onClose={() => setSelectedDelivery(null)}
              onDownloadReceipt={handleDownloadReceipt}
            />
          )}

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
