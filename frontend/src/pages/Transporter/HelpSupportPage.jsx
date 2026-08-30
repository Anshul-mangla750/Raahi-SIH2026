import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import HelpHeaderBanner from '../../components/help/HelpHeaderBanner';
import HelpSearchBarAndCategories from '../../components/help/HelpSearchBarAndCategories';
import HelpContactChannelsCard from '../../components/help/HelpContactChannelsCard';
import PopularHelpTopicsCard from '../../components/help/PopularHelpTopicsCard';
import SupportTicketsCard from '../../components/help/SupportTicketsCard';
import HelpResourcesBanner from '../../components/help/HelpResourcesBanner';
import NewTicketModal from '../../components/help/NewTicketModal';

export default function HelpSupportPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSelectCategory = (catId) => {
    triggerToast(`Viewing help guides for ${catId}.`);
  };

  const handleSelectTopic = () => {
    triggerToast('Opening knowledge base article catalog...');
  };

  const handleSelectResource = (resourceId) => {
    if (resourceId === 'status') {
      triggerToast('All RAAHI Northeast logistics systems are currently operational.');
    } else {
      triggerToast(`Opening ${resourceId === 'guide' ? 'User Documentation' : 'Video Tutorials'}...`);
    }
  };

  const handleSubmitTicket = (ticketData) => {
    setNewTicketOpen(false);
    triggerToast(`Support ticket created: "${ticketData.subject}". Our team will respond shortly.`);
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
        <main className="flex-1 p-4 sm:p-5 lg:p-6 space-y-5 relative max-w-[1600px] w-full mx-auto">
          {/* 1. Page Header with Title & Logistics Illustration Banner */}
          <HelpHeaderBanner />

          {/* 2. Main Support Grid */}
          <div className="space-y-5">
            {/* ROW 1: Search + 5 Categories (Left ~60%) | Contact Channels (Right ~40%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              <div className="lg:col-span-7 xl:col-span-7 h-full">
                <HelpSearchBarAndCategories
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSelectCategory={handleSelectCategory}
                />
              </div>

              <div className="lg:col-span-5 xl:col-span-5 h-full">
                <HelpContactChannelsCard />
              </div>
            </div>

            {/* ROW 2: Popular Help Topics (Left 50%) | Your Support Tickets (Right 50%) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
              <div className="h-full">
                <PopularHelpTopicsCard onSelectTopic={handleSelectTopic} />
              </div>

              <div className="h-full">
                <SupportTicketsCard
                  onRaiseTicket={() => setNewTicketOpen(true)}
                  onViewTicket={(ticket) => triggerToast(`Viewing details for ${ticket.id}`)}
                  onViewAll={() => triggerToast('Loading all support tickets...')}
                />
              </div>
            </div>

            {/* ROW 3: Full-width Need More Help Resource Banner */}
            <HelpResourcesBanner onSelectResource={handleSelectResource} />

            {/* 3. Page Footer */}
            <footer className="pt-2 pb-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium gap-2">
              <span>© 2025 Raahi Transporter. All rights reserved.</span>
              <span>Version 1.0.0</span>
            </footer>
          </div>

          {/* Modal for Raising Support Ticket */}
          <NewTicketModal
            isOpen={newTicketOpen}
            onClose={() => setNewTicketOpen(false)}
            onSubmitTicket={handleSubmitTicket}
          />

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
