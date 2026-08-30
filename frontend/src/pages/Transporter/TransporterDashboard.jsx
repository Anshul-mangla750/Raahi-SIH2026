import React, { useState } from 'react';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import TransporterKPIs from '../../components/transporter/TransporterKPIs';
import LiveTrackingMap from '../../components/transporter/LiveTrackingMap';
import AlertsPanel from '../../components/transporter/AlertsPanel';
import ConsignmentStatusChart from '../../components/transporter/ConsignmentStatusChart';
import OnTimeDeliveryChart from '../../components/transporter/OnTimeDeliveryChart';
import TopRoutesList from '../../components/transporter/TopRoutesList';
import RecentConsignmentsTable from '../../components/transporter/RecentConsignmentsTable';
import TransporterFooter from '../../components/transporter/TransporterFooter';

export default function TransporterDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex selection:bg-emerald-500 selection:text-white font-sans antialiased text-slate-900">
      {/* Transporter Left Navigation Sidebar */}
      <TransporterSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Transporter Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Transporter Top Header */}
        <TransporterHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Transporter Dashboard Content */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 space-y-5">
          {/* Top 5 Horizontal KPI Cards */}
          <section>
            <TransporterKPIs />
          </section>

          {/* Main Dashboard Row: Live Tracking Map + Alerts */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Live Tracking Map (8 cols on lg ~ 68%) */}
            <div className="lg:col-span-8 h-full">
              <LiveTrackingMap />
            </div>

            {/* Alerts & Notifications (4 cols on lg ~ 32%) */}
            <div className="lg:col-span-4 h-full">
              <AlertsPanel />
            </div>
          </section>

          {/* Second Dashboard Row: Consignment Status | On-Time Delivery | Top Routes */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-4">
              <ConsignmentStatusChart />
            </div>
            <div className="lg:col-span-4">
              <OnTimeDeliveryChart />
            </div>
            <div className="md:col-span-2 lg:col-span-4">
              <TopRoutesList />
            </div>
          </section>

          {/* Recent Consignments Table */}
          <section>
            <RecentConsignmentsTable />
          </section>

          {/* Page Footer */}
          <TransporterFooter />
        </main>
      </div>
    </div>
  );
}
