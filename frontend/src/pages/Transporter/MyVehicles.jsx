import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Plus, ChevronDown, Check, X, RotateCcw } from 'lucide-react';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import VehiclesKPIs from '../../components/vehicles/VehiclesKPIs';
import VehiclesSearchBar from '../../components/vehicles/VehiclesSearchBar';
import VehicleRow from '../../components/vehicles/VehicleRow';
import VehiclesPagination from '../../components/vehicles/VehiclesPagination';
import AddVehicleModal from '../../components/vehicles/AddVehicleModal';
import VehicleDetailsModal from '../../components/vehicles/VehicleDetailsModal';
import { vehiclesListData } from '../../data/vehiclesData';
import ApiClient from '../../lib/api';

export default function MyVehicles() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicles, setVehicles] = useState(vehiclesListData);

  // Filter states
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Dynamic Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const res = await ApiClient.getTransporterVehicles();
        if (res?.success && res.data && res.data.length > 0) {
          const mapped = res.data.map((v, idx) => ({
            id: v.id,
            vehicleNo: v.id,
            model: v.model || 'TATA 407 Heavy',
            type: v.type || 'truck',
            capacity: v.capacity_kg ? `${v.capacity_kg.toLocaleString()} kg` : '1,200 kg',
            modelYear: 'Model: 2023',
            driver: {
              name: v.driver?.name || 'Rakesh Das',
              phone: v.driver?.phone || '+91 9876543210',
              rating: '4.8',
              avatar: idx % 2 === 0 ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces' : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces',
            },
            location: {
              name: v.current_route || 'NH-27 Corridor, Assam',
              lat: v.current_lat,
              lng: v.current_lng,
            },
            speed: `${v.speed || 45} km/h`,
            fuel: `${v.fuel_percent || 78}%`,
            status: v.status === 'moving' ? 'In Transit' : v.status === 'delayed' ? 'Delayed' : 'Idle',
            statusType: v.status === 'moving' ? 'in-transit' : v.status || 'in-transit',
          }));
          setVehicles(mapped);
        }
      } catch (e) {
        console.warn('Using fallback vehicles list:', e);
      }
    };
    loadVehicles();
  }, []);

  // Handle adding new vehicle
  const handleVehicleAdded = (newVehicle) => {
    setVehicles((prev) => [newVehicle, ...prev]);
  };

  // Filter vehicles according to search query and status filter
  const filteredVehicles = vehicles.filter((item) => {
    // Status Filter
    if (statusFilter !== 'all') {
      const itemStatus = (item.statusType || item.status || '').toLowerCase().replace(/\s+/g, '-');
      if (statusFilter === 'in-transit' && itemStatus !== 'in-transit' && itemStatus !== 'moving' && itemStatus !== 'picked-up') return false;
      if (statusFilter === 'idle' && itemStatus !== 'idle') return false;
      if (statusFilter === 'delayed' && itemStatus !== 'delayed') return false;
      if (statusFilter === 'maintenance' && itemStatus !== 'maintenance' && itemStatus !== 'under-maintenance') return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchVehicleNo = item.vehicleNo?.toLowerCase().includes(q) || item.id?.toLowerCase().includes(q);
      const matchModel = item.model?.toLowerCase().includes(q);
      const matchDriver = item.driver?.name?.toLowerCase().includes(q);
      const matchLocation = item.location?.name?.toLowerCase().includes(q);
      return matchVehicleNo || matchModel || matchDriver || matchLocation;
    }

    return true;
  });

  // Calculate paginated slice
  const totalItems = filteredVehicles.length;
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const statusOptions = [
    { id: 'all', label: 'All Statuses' },
    { id: 'in-transit', label: 'In Transit / Moving' },
    { id: 'idle', label: 'Idle / Available' },
    { id: 'delayed', label: 'Delayed' },
    { id: 'maintenance', label: 'Under Maintenance' },
  ];

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
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto flex-shrink-0 relative">
              {/* Filter Popover Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg shadow-sm border transition-colors cursor-pointer ${
                    statusFilter !== 'all'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Filter size={15} className={statusFilter !== 'all' ? 'text-emerald-600' : 'text-slate-500'} />
                  <span>Filter {statusFilter !== 'all' ? `(${statusOptions.find(o => o.id === statusFilter)?.label})` : ''}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {/* Filter Dropdown */}
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-40">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Filter</span>
                      {statusFilter !== 'all' && (
                        <button
                          type="button"
                          onClick={() => {
                            setStatusFilter('all');
                            setFilterOpen(false);
                            setCurrentPage(1);
                          }}
                          className="text-[11px] font-bold text-rose-500 hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <RotateCcw size={10} /> Reset
                        </button>
                      )}
                    </div>
                    {statusOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setStatusFilter(opt.id);
                          setFilterOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          statusFilter === opt.id
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {statusFilter === opt.id && <Check size={14} className="text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Vehicle Button */}
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm shadow-emerald-600/20 transition-colors cursor-pointer"
              >
                <Plus size={16} />
                <span>Add Vehicle</span>
              </button>
            </div>
          </div>

          {/* Top 5 KPI Cards */}
          <VehiclesKPIs />

          {/* Search, Filter Toolbar & Vehicle Cards Container */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
              <VehiclesSearchBar
                searchQuery={searchQuery}
                setSearchQuery={(q) => {
                  setSearchQuery(q);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Cards List Area */}
            <div className="space-y-3.5">
              {paginatedVehicles.length > 0 ? (
                paginatedVehicles.map((item) => (
                  <VehicleRow
                    key={item.id}
                    item={item}
                    vehicle={item}
                    onViewDetails={(v) => setSelectedVehicle(v)}
                  />
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 font-medium text-sm shadow-2xs">
                  No vehicles found matching your criteria.
                </div>
              )}
            </div>

            {/* Dynamic Pagination Footer */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-2xs">
              <VehiclesPagination
                totalItems={totalItems}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={(p) => setCurrentPage(p)}
                onPageSizeChange={(s) => {
                  setPageSize(s);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Add Vehicle Modal */}
      <AddVehicleModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onVehicleAdded={handleVehicleAdded}
      />

      {/* Vehicle Details Modal */}
      <VehicleDetailsModal
        isOpen={Boolean(selectedVehicle)}
        onClose={() => setSelectedVehicle(null)}
        vehicle={selectedVehicle}
      />
    </div>
  );
}
