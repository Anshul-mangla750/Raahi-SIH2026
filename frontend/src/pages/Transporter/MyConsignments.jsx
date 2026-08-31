import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Filter, Plus, ChevronDown, Check, RotateCcw } from 'lucide-react';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import ConsignmentsKPIs from '../../components/consignments/ConsignmentsKPIs';
import ConsignmentsFilterBar from '../../components/consignments/ConsignmentsFilterBar';
import ConsignmentRow from '../../components/consignments/ConsignmentRow';
import ConsignmentsPagination from '../../components/consignments/ConsignmentsPagination';
import NewConsignmentModal from '../../components/consignments/NewConsignmentModal';
import ConsignmentDetailsModal from '../../components/consignments/ConsignmentDetailsModal';
import { consignmentsListData } from '../../data/consignmentsData';
import ApiClient from '../../lib/api';

export default function MyConsignments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [consignments, setConsignments] = useState(consignmentsListData);

  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Modals state
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedConsignment, setSelectedConsignment] = useState(null);

  // Dynamic Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const loadDeliveries = async () => {
      try {
        const res = await ApiClient.getTransporterDeliveries();
        if (res?.success && res.data && res.data.length > 0) {
          const mapped = res.data.map(d => ({
            id: d.id,
            origin: d.origin_district_id ? d.origin_district_id.replace('_', ' ').toUpperCase() : 'GUWAHATI',
            originState: 'Assam',
            destination: d.dest_district_id ? d.dest_district_id.replace('_', ' ').toUpperCase() : 'TEZPUR',
            destinationState: 'Assam',
            cargoName: d.commodity_type ? d.commodity_type.toUpperCase() + ' SUPPLIES' : 'ESSENTIAL SUPPLIES',
            cargoType: 'package',
            weight: `${d.weight_kg ? d.weight_kg.toLocaleString() : '1,200'} kg`,
            vehicleModel: 'TATA 407 Heavy',
            vehicleNumber: 'AS 01 GC 9876',
            driverName: 'Rakesh Das',
            etaHeading: 'ESTIMATED ARRIVAL',
            etaDate: 'Tomorrow',
            etaTime: '05:30 PM',
            etaStatus: 'On Schedule',
            etaStatusType: 'on-schedule',
            bookedOn: 'Today',
            status: d.status === 'in_transit' ? 'In Transit' : d.status === 'delayed' ? 'Delayed' : 'Delivered',
            statusType: d.status === 'in_transit' ? 'in-transit' : d.status,
            priority: d.priority ? d.priority.charAt(0).toUpperCase() + d.priority.slice(1) : 'High',
            priorityType: (d.priority || 'high').toLowerCase(),
            image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80',
            timeline: [
              { step: 'Order Placed', status: 'completed', date: 'Today, 09:00 AM' },
              { step: 'In Transit', status: 'current', currentColor: 'blue', date: 'Active Journey' },
              { step: 'Delivered', status: 'upcoming', date: 'Tomorrow' },
            ],
          }));
          setConsignments(mapped);
        }
      } catch (e) {
        console.warn('Using fallback consignments list:', e);
      }
    };
    loadDeliveries();
  }, []);

  const handleConsignmentAdded = (newConsignment) => {
    setConsignments((prev) => [newConsignment, ...prev]);
  };

  // Filter items according to tab, priority filter, and search query
  const filteredConsignments = consignments.filter((item) => {
    // Tab filter
    if (activeTab === 'in-transit' && item.statusType !== 'in-transit' && item.statusType !== 'picked-up') return false;
    if (activeTab === 'delivered' && item.statusType !== 'delivered') return false;
    if (activeTab === 'delayed' && item.statusType !== 'delayed') return false;
    if (activeTab === 'cancelled' && item.statusType !== 'cancelled') return false;

    // Priority filter
    if (priorityFilter !== 'all') {
      const p = (item.priorityType || item.priority || '').toLowerCase();
      if (p !== priorityFilter) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = item.id.toLowerCase().includes(q);
      const matchOrigin = item.origin.toLowerCase().includes(q);
      const matchDest = item.destination.toLowerCase().includes(q);
      const matchVehicle = item.vehicleNumber?.toLowerCase().includes(q);
      const matchCargo = item.cargoName?.toLowerCase().includes(q);
      return matchId || matchOrigin || matchDest || matchVehicle || matchCargo;
    }

    return true;
  });

  // Calculate paginated slice
  const totalItems = filteredConsignments.length;
  const paginatedConsignments = filteredConsignments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const priorityOptions = [
    { id: 'all', label: 'All Priorities' },
    { id: 'high', label: 'High (Critical / Relief)' },
    { id: 'medium', label: 'Medium (Standard)' },
    { id: 'low', label: 'Low (Bulk Goods)' },
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
                My Consignments
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-0.5">
                Manage and track all shipments and cargo in real-time.
              </p>
            </div>

            {/* Right Action Controls */}
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto flex-shrink-0 relative">
              {/* Filter Popover Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg shadow-sm border transition-colors cursor-pointer ${
                    priorityFilter !== 'all'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Filter size={15} className={priorityFilter !== 'all' ? 'text-emerald-600' : 'text-slate-500'} />
                  <span>Filter {priorityFilter !== 'all' ? `(${priorityOptions.find(o => o.id === priorityFilter)?.label})` : ''}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {/* Filter Dropdown */}
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-40">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority Filter</span>
                      {priorityFilter !== 'all' && (
                        <button
                          type="button"
                          onClick={() => {
                            setPriorityFilter('all');
                            setFilterOpen(false);
                            setCurrentPage(1);
                          }}
                          className="text-[11px] font-bold text-rose-500 hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <RotateCcw size={10} /> Reset
                        </button>
                      )}
                    </div>
                    {priorityOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setPriorityFilter(opt.id);
                          setFilterOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          priorityFilter === opt.id
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {priorityFilter === opt.id && <Check size={14} className="text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* New Consignment Button */}
              <button
                type="button"
                onClick={() => setShowNewModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm shadow-emerald-600/20 transition-colors cursor-pointer"
              >
                <Plus size={16} />
                <span>New Consignment</span>
              </button>
            </div>
          </div>

          {/* Top 5 KPI Cards */}
          <ConsignmentsKPIs />

          {/* Filter Bar, Search Toolbar, and Consignments List Container */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
              <ConsignmentsFilterBar
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                searchQuery={searchQuery}
                onSearchChange={(q) => {
                  setSearchQuery(q);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Cards List Area */}
            <div className="space-y-3.5">
              {paginatedConsignments.length > 0 ? (
                paginatedConsignments.map((item) => (
                  <ConsignmentRow
                    key={item.id}
                    item={item}
                    consignment={item}
                    onViewDetails={(c) => setSelectedConsignment(c)}
                  />
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 font-medium text-sm shadow-2xs">
                  No consignments found matching your criteria.
                </div>
              )}
            </div>

            {/* Dynamic Pagination Footer */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-2xs">
              <ConsignmentsPagination
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

      {/* New Consignment Modal */}
      <NewConsignmentModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        onConsignmentAdded={handleConsignmentAdded}
      />

      {/* Consignment Details Modal */}
      <ConsignmentDetailsModal
        isOpen={Boolean(selectedConsignment)}
        onClose={() => setSelectedConsignment(null)}
        consignment={selectedConsignment}
      />
    </div>
  );
}
