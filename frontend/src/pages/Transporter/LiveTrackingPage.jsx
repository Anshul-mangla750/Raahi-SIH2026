import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Filter,
  RefreshCw,
  ChevronDown,
  Info,
  X,
  ShieldCheck,
  User,
  Phone,
  Gauge,
  Fuel,
  Battery,
  Wifi,
  MapPin,
} from 'lucide-react';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import TrackingKPIs from '../../components/tracking/TrackingKPIs';
import VehicleTrackingControls from '../../components/tracking/VehicleTrackingControls';
import TrackingMap from '../../components/tracking/TrackingMap';
import VehicleDetailsPanel from '../../components/tracking/VehicleDetailsPanel';
import RecentTrackingUpdates from '../../components/tracking/RecentTrackingUpdates';
import TripOverview from '../../components/tracking/TripOverview';
import { activeTrackingVehicle } from '../../data/liveTrackingData';

export default function LiveTrackingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setToastMessage('Live tracking data synchronized!');
    setTimeout(() => {
      setIsRefreshing(false);
      setTimeout(() => setToastMessage(''), 3000);
    }, 600);
  };

  const handleTrackRoute = () => {
    setToastMessage('Tracking route started for vehicle AS 01 GC 9876!');
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleViewDetails = () => {
    setShowDetailsModal(true);
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
          {/* Page Header: Title & Right Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1E36] tracking-tight leading-tight">
                Live Tracking & GPS
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-0.5">
                Real-time tracking of your vehicles and consignments.
              </p>
            </div>

            {/* Right Controls: Date Range, Filters, Refresh */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto flex-shrink-0">
              {/* Date Range Selector */}
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>14 May 2025 - 21 May 2025</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Filters Button */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>Filters</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Refresh Button */}
              <button
                type="button"
                onClick={handleRefresh}
                title="Refresh Live Data"
                className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-slate-600 ${
                    isRefreshing ? 'animate-spin' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 4 Summary Statistic Cards */}
          <section>
            <TrackingKPIs />
          </section>

          {/* Vehicle Tracking Selection Bar */}
          <section>
            <VehicleTrackingControls onTrackRoute={handleTrackRoute} />
          </section>

          {/* Main Map & Vehicle Details Panel (Side-by-Side on Desktop) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: Leaflet Map */}
            <div className="lg:col-span-8">
              <TrackingMap />
            </div>

            {/* Right: Vehicle Details Panel */}
            <div className="lg:col-span-4">
              <VehicleDetailsPanel onViewDetails={handleViewDetails} />
            </div>
          </section>

          {/* Bottom Sections: Recent Updates & Trip Overview */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: Recent Tracking Updates */}
            <div className="lg:col-span-7">
              <RecentTrackingUpdates />
            </div>

            {/* Right: Trip Overview */}
            <div className="lg:col-span-5">
              <TripOverview />
            </div>
          </section>

          {/* Bottom GPS Status Bar */}
          <footer className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Live location updates every 30 seconds</span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto text-[11px]">
              <span>Source: GPS</span>
              <span>•</span>
              <span>Last synced 2 min ago</span>
              <div className="flex items-center gap-1.5 ml-1 font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Online</span>
              </div>
            </div>
          </footer>

          {/* Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 bg-[#0B1E36] text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700/80 flex items-center gap-2.5 text-xs font-bold"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detailed Vehicle Status Modal */}
          <AnimatePresence>
            {showDetailsModal && (
              <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="bg-white rounded-3xl w-full max-w-2xl border border-slate-200/80 shadow-2xl overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-black text-[#0B1E36]">
                        AS01GC9876 — Telemetry Status
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        In Transit
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDetailsModal(false)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 space-y-6">
                    {/* Top: Fleet Info & Driver Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Driver Card */}
                      <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/40 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                          <img
                            src={activeTrackingVehicle.driver.avatar}
                            alt="Bikash Das"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-400">Assigned Driver</h4>
                          <div className="text-sm font-black text-slate-900 mt-0.5">
                            {activeTrackingVehicle.driver}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-semibold">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {activeTrackingVehicle.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Vehicle Health Checks */}
                      <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/40 flex flex-col justify-between">
                        <h4 className="text-xs font-bold text-slate-400">System Diagnostics</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Engine OK</span>
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Tyre Pressure OK</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Sensor Data Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {/* Speedometer */}
                      <div className="p-3.5 rounded-xl border border-slate-100 text-center">
                        <Gauge className="w-5 h-5 text-blue-500 mx-auto mb-1.5" />
                        <span className="text-[10px] font-bold text-slate-400 block">Speed</span>
                        <span className="text-sm font-black text-slate-800 mt-0.5 block">52 km/h</span>
                      </div>

                      {/* Fuel level */}
                      <div className="p-3.5 rounded-xl border border-slate-100 text-center">
                        <Fuel className="w-5 h-5 text-emerald-500 mx-auto mb-1.5" />
                        <span className="text-[10px] font-bold text-slate-400 block">Fuel Level</span>
                        <span className="text-sm font-black text-slate-800 mt-0.5 block">68%</span>
                      </div>

                      {/* Battery */}
                      <div className="p-3.5 rounded-xl border border-slate-100 text-center">
                        <Battery className="w-5 h-5 text-purple-500 mx-auto mb-1.5" />
                        <span className="text-[10px] font-bold text-slate-400 block">Battery</span>
                        <span className="text-sm font-black text-slate-800 mt-0.5 block">24V (Healthy)</span>
                      </div>

                      {/* Signal */}
                      <div className="p-3.5 rounded-xl border border-slate-100 text-center">
                        <Wifi className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                        <span className="text-[10px] font-bold text-slate-400 block">GPS Connection</span>
                        <span className="text-sm font-black text-slate-800 mt-0.5 block">Excellent</span>
                      </div>
                    </div>

                    {/* Active Route Waypoints */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Active Route Milestones
                      </h4>
                      <div className="border border-slate-100 rounded-2xl p-4 space-y-3.5 bg-slate-50/20">
                        {/* Milestone 1 */}
                        <div className="flex items-start gap-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0 border-2 border-white shadow-xs" />
                          <div className="flex-1 text-xs">
                            <div className="font-bold text-slate-800 flex items-center justify-between">
                              <span>Guwahati Depot (Origin)</span>
                              <span className="text-slate-400 font-semibold">08:00 AM</span>
                            </div>
                            <p className="text-slate-500 mt-0.5">Departed warehouse. Cargo loaded.</p>
                          </div>
                        </div>

                        {/* Milestone 2 */}
                        <div className="flex items-start gap-3 border-t border-slate-100/80 pt-3.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 flex-shrink-0 border-2 border-white shadow-xs" />
                          <div className="flex-1 text-xs">
                            <div className="font-bold text-slate-800 flex items-center justify-between">
                              <span>Nagaon Bypass (Waypoint)</span>
                              <span className="text-slate-400 font-semibold">09:50 AM</span>
                            </div>
                            <p className="text-slate-500 mt-0.5">Checked point pass. Zero delays logged.</p>
                          </div>
                        </div>

                        {/* Milestone 3 */}
                        <div className="flex items-start gap-3 border-t border-slate-100/80 pt-3.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 flex-shrink-0 border-2 border-white shadow-xs" />
                          <div className="flex-1 text-xs">
                            <div className="font-bold text-slate-800 flex items-center justify-between">
                              <span>Dibrugarh Logistics Center (Destination)</span>
                              <span className="text-rose-500 font-bold">11:30 AM (ETA)</span>
                            </div>
                            <p className="text-slate-500 mt-0.5">Pending check-in and offloading.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="px-5 py-4.5 border-t border-slate-100 flex items-center justify-end bg-slate-50/50">
                    <button
                      type="button"
                      onClick={() => setShowDetailsModal(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      Close Details
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
