import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Plus, ChevronDown } from 'lucide-react';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import ConsignmentsKPIs from '../../components/consignments/ConsignmentsKPIs';
import ConsignmentsFilterBar from '../../components/consignments/ConsignmentsFilterBar';
import ConsignmentRow from '../../components/consignments/ConsignmentRow';
import ConsignmentsPagination from '../../components/consignments/ConsignmentsPagination';
import { consignmentsListData } from '../../data/consignmentsData';

export default function MyConsignments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items according to tab and search query
  const filteredConsignments = consignmentsListData.filter((item) => {
    // Tab filter
    if (activeTab === 'in-transit' && item.statusType !== 'in-transit' && item.statusType !== 'picked-up') {
      return false;
    }
    if (activeTab === 'delivered' && item.statusType !== 'delivered') {
      return false;
    }
    if (activeTab === 'delayed' && item.statusType !== 'delayed') {
      return false;
    }
    if (activeTab === 'cancelled' && item.statusType !== 'cancelled') {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = item.id.toLowerCase().includes(q);
      const matchOrigin = item.origin.toLowerCase().includes(q);
      const matchDest = item.destination.toLowerCase().includes(q);
      const matchVehicle = item.vehicleNumber.toLowerCase().includes(q);
      const matchCargo = item.cargoName.toLowerCase().includes(q);
      return matchId || matchOrigin || matchDest || matchVehicle || matchCargo;
    }

    return true;
  });

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
        <main className="flex-1 p-4 sm:p-5 lg:p-6 space-y-5">
          {/* Page Header: Title & Action Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            {/* Title & Subtitle */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1E36] tracking-tight leading-tight">
                My Consignments
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-0.5">
                Track and manage all your consignments in one place.
              </p>
            </div>

            {/* Right Action Controls: Date Range, Filter Button, Add Consignment */}
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
              {/* Date Range Selector */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 cursor-pointer hover:border-slate-300 transition-colors">
                <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span>14 May 2025 - 21 May 2025</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </div>

              {/* Filter Button */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>Filters</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Add Consignment Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Consignment</span>
              </motion.button>
            </div>
          </div>

          {/* 5 Summary KPI Cards */}
          <section>
            <ConsignmentsKPIs />
          </section>

          {/* Filter Tabs & Search Bar */}
          <section className="pt-2">
            <ConsignmentsFilterBar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </section>

          {/* Main Consignments List */}
          <section className="space-y-3.5">
            {/* Column Headers */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-5 text-[11px] font-bold text-slate-400 select-none">
              <div className="col-span-4 pl-32">Consignment Details & Route</div>
              <div className="col-span-2">Cargo Details</div>
              <div className="col-span-3 text-center">Status Timeline</div>
              <div className="col-span-2 text-right">ETA</div>
              <div className="col-span-1 text-right pr-2">Actions</div>
            </div>

            {/* Rows */}
            {filteredConsignments.length > 0 ? (
              filteredConsignments.map((item) => (
                <ConsignmentRow key={item.id} item={item} />
              ))
            ) : (
              <div className="bg-white rounded-2xl p-10 border border-slate-200/80 text-center text-slate-500 font-bold text-sm">
                No consignments found for the selected filter.
              </div>
            )}
          </section>

          {/* Pagination */}
          <section>
            <ConsignmentsPagination totalItems={28} />
          </section>
        </main>
      </div>
    </div>
  );
}
