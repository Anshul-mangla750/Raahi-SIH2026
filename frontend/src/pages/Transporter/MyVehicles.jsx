import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Plus, ChevronDown, ChevronsUpDown } from 'lucide-react';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import VehiclesKPIs from '../../components/vehicles/VehiclesKPIs';
import VehiclesSearchBar from '../../components/vehicles/VehiclesSearchBar';
import VehicleRow from '../../components/vehicles/VehicleRow';
import VehiclesPagination from '../../components/vehicles/VehiclesPagination';
import { vehiclesListData } from '../../data/vehiclesData';

export default function MyVehicles() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter vehicles according to search query
  const filteredVehicles = vehiclesListData.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchVehicleNo = item.vehicleNo.toLowerCase().includes(q);
      const matchModel = item.model.toLowerCase().includes(q);
      const matchDriver = item.driver?.name.toLowerCase().includes(q);
      const matchLocation = item.location?.name.toLowerCase().includes(q);
      return matchVehicleNo || matchModel || matchDriver || matchLocation;
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
                My Vehicles
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-0.5">
                Monitor and manage all your vehicles in real-time.
              </p>
            </div>

            {/* Right Action Controls: Filter Button, Add Vehicle */}
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
              {/* Filter Button */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>Filters</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Add Vehicle Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Vehicle</span>
              </motion.button>
            </div>
          </div>

          {/* 5 Summary KPI Cards */}
          <section>
            <VehiclesKPIs />
          </section>

          {/* Search Bar - Positioned above table on the right */}
          <section className="pt-1">
            <VehiclesSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </section>

          {/* Main Vehicles List */}
          <section className="space-y-3.5">
            {/* Column Headers: Exactly matching reference */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-5 text-[11px] font-bold text-slate-400 select-none pb-1">
              <div className="col-span-3">Vehicle Details</div>
              <div className="col-span-2 flex items-center gap-1">
                <span>Driver Details</span>
                <ChevronsUpDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="col-span-3">Status</div>
              <div className="col-span-2">Current Location</div>
              <div className="col-span-1">Last Updated</div>
              <div className="col-span-1 text-right pr-2">Actions</div>
            </div>

            {/* Rows */}
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((item) => (
                <VehicleRow key={item.id} item={item} />
              ))
            ) : (
              <div className="bg-white rounded-2xl p-10 border border-slate-200/80 text-center text-slate-500 font-bold text-sm">
                No vehicles found matching your search.
              </div>
            )}
          </section>

          {/* Pagination */}
          <section>
            <VehiclesPagination totalItems={24} />
          </section>
        </main>
      </div>
    </div>
  );
}
