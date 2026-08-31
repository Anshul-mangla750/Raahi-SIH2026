import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Download,
  ChevronDown,
} from 'lucide-react';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import ReportsKPIs from '../../components/reports/ReportsKPIs';
import ReportsChartsRow from '../../components/reports/ReportsChartsRow';
import ReportsTablesRow from '../../components/reports/ReportsTablesRow';
import RecentReportsTable from '../../components/reports/RecentReportsTable';

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const navTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'deliveries', label: 'Deliveries' },
    { id: 'performance', label: 'Performance' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'routes', label: 'Routes' },
    { id: 'payments', label: 'Payments' },
  ];

  const handleExportReport = () => {
    try {
      const headers = ['Metric / Route', 'Efficiency', 'SLA Performance', 'Fuel Average', 'Status'];
      const rows = [
        ['"NH-27 Guwahati - Tezpur"', '"94.5%"', '"On-Time (96%)"', '"7.8 km/L"', '"Optimal"'],
        ['"NH-15 North Bank Corridor"', '"88.2%"', '"Weather Delay (4%)"', '"7.2 km/L"', '"Normal"'],
        ['"NH-37 Upper Assam Arterial"', '"91.0%"', '"On-Time (92%)"', '"7.5 km/L"', '"Optimal"'],
        ['"NH-6 Meghalaya Hill Transit"', '"79.4%"', '"Caution - Landslide Area"', '"6.4 km/L"', '"Restricted"'],
      ];
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `raahi_transporter_reports_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      triggerToast('Analytics report downloaded as CSV!');
    } catch (e) {
      triggerToast('Consolidated analytics report exported.');
    }
  };

  const handleDownloadReport = (report) => {
    triggerToast(`Downloading ${report.name || 'Report'}...`);
  };

  const handleViewReport = (report) => {
    triggerToast(`Viewing analytics breakdown for ${report.name || 'Report'}.`);
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
          {/* Page Header: Title & Right Controls matching reference image */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1E36] tracking-tight leading-tight">
                Reports
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-0.5">
                Insights and analytics to track your logistics performance.
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

          {/* Navigation Pill Tabs matching reference image */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar py-1">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs'
                      : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 5 Summary KPI Cards with Sparklines */}
          <section>
            <ReportsKPIs />
          </section>

          {/* 3 Analytical Charts Row */}
          <section>
            <ReportsChartsRow />
          </section>

          {/* Performance Breakdown & Route Tables Row */}
          <section>
            <ReportsTablesRow />
          </section>

          {/* Recent Reports Table Section */}
          <section>
            <RecentReportsTable
              onDownloadReport={handleDownloadReport}
              onViewReport={handleViewReport}
            />
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
