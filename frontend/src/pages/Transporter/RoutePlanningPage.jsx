import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import RoutePlanningForm from '../../components/routePlanning/RoutePlanningForm';
import RouteStopsPanel from '../../components/routePlanning/RouteStopsPanel';
import RoutePlanningMap from '../../components/routePlanning/RoutePlanningMap';
import RouteOverviewCard from '../../components/routePlanning/RouteOverviewCard';
import RouteEstimatesCard from '../../components/routePlanning/RouteEstimatesCard';
import { initialRouteStops } from '../../data/routePlanningData';

export default function RoutePlanningPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stops, setStops] = useState(initialRouteStops);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handlePlanRoute = () => {
    triggerToast('Route calculation completed! Optimized for NH-27.');
  };

  const handleAddStop = () => {
    const newId = `stop-${Date.now()}`;
    const newIndex = stops.length;
    const newStop = {
      id: newId,
      stepNumber: newIndex,
      name: 'Bokakhat, Assam',
      type: `Stop ${newIndex - 1}`,
      time: '12:00PM',
      status: 'stop-blue',
      coords: [26.6300, 93.6000],
    };
    // Insert before destination
    const updated = [...stops];
    updated.splice(updated.length - 1, 0, newStop);
    setStops(updated);
    triggerToast('New stop added to route!');
  };

  const handleRemoveStop = (stopId) => {
    if (stops.length <= 2) {
      triggerToast('Route must have at least origin and destination!');
      return;
    }
    setStops(stops.filter((s) => s.id !== stopId));
    triggerToast('Stop removed from route.');
  };

  const handleClearAll = () => {
    // Keep only start and destination
    setStops([stops[0], stops[stops.length - 1]]);
    triggerToast('Intermediate stops cleared.');
  };

  const handleReorderStops = (reordered) => {
    setStops(reordered);
  };

  const handleSaveDraft = () => {
    triggerToast('Route plan saved as draft!');
  };

  const handleStartJourney = () => {
    triggerToast('Journey initiated for Vehicle AS 01 GC 9876!');
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
          {/* Page Header: Title & Subtitle */}
          <div className="pt-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1E36] tracking-tight leading-tight">
              Route Planning
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-0.5">
              Plan efficient routes, save time and fuel, and deliver on time.
            </p>
          </div>

          {/* Top Route Planning Form */}
          <section>
            <RoutePlanningForm onPlanRoute={handlePlanRoute} />
          </section>

          {/* Main Map & Route Stops Area (Two Columns) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Column: Route Stops Timeline Panel (Narrower ~4/12 or ~3.8/12) */}
            <div className="lg:col-span-4 xl:col-span-4">
              <RouteStopsPanel
                stops={stops}
                onAddStop={handleAddStop}
                onRemoveStop={handleRemoveStop}
                onClearAll={handleClearAll}
                onReorderStops={handleReorderStops}
              />
            </div>

            {/* Right Column: Interactive Leaflet Map (~8/12) */}
            <div className="lg:col-span-8 xl:col-span-8">
              <RoutePlanningMap stops={stops} />
            </div>
          </section>

          {/* Bottom Area: Route Overview & Estimates Breakdown */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Side: Route Overview & Preferred Route (~7/12) */}
            <div className="lg:col-span-7">
              <RouteOverviewCard />
            </div>

            {/* Right Side: Estimates & Action Buttons (~5/12) */}
            <div className="lg:col-span-5">
              <RouteEstimatesCard
                onSaveDraft={handleSaveDraft}
                onStartJourney={handleStartJourney}
              />
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
