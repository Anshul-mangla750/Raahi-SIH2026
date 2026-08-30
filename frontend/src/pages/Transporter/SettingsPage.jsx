import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TransporterSidebar from '../../components/transporter/TransporterSidebar';
import TransporterHeader from '../../components/transporter/TransporterHeader';
import SettingsHeaderBanner from '../../components/settings/SettingsHeaderBanner';
import SettingsCategoryTabs from '../../components/settings/SettingsCategoryTabs';
import CompanyInformationCard from '../../components/settings/CompanyInformationCard';
import AccountSecurityCard from '../../components/settings/AccountSecurityCard';
import BusinessPreferencesCard from '../../components/settings/BusinessPreferencesCard';
import IntegrationsCard from '../../components/settings/IntegrationsCard';
import NotificationSettingsCard from '../../components/settings/NotificationSettingsCard';
import ThemeAppearanceCard from '../../components/settings/ThemeAppearanceCard';
import SupportHelpCard from '../../components/settings/SupportHelpCard';
import EditCompanyModal from '../../components/settings/EditCompanyModal';
import EditPreferencesModal from '../../components/settings/EditPreferencesModal';
import SecurityDetailModal from '../../components/settings/SecurityDetailModal';
import { initialCompanyInfo } from '../../data/settingsData';

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [toastMessage, setToastMessage] = useState('');

  // Editable states
  const [companyData, setCompanyData] = useState(initialCompanyInfo);
  const [preferencesData, setPreferencesData] = useState({
    routePreference: 'Fastest Route',
    autoAssign: 'Enabled',
    deliveryConfirmation: 'Proof of Delivery',
    distanceUnit: 'Kilometers (km)',
    dateTimeFormat: 'DD MMM YYYY, 12:00 PM',
    language: 'English',
  });

  // Modal control states
  const [editCompanyOpen, setEditCompanyOpen] = useState(false);
  const [editPreferencesOpen, setEditPreferencesOpen] = useState(false);
  const [securityModalItem, setSecurityModalItem] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveCompany = (newData) => {
    setCompanyData(newData);
    setEditCompanyOpen(false);
    triggerToast('Company information updated successfully.');
  };

  const handleSavePreferences = (newData) => {
    setPreferencesData(newData);
    setEditPreferencesOpen(false);
    triggerToast('Business preferences updated successfully.');
  };

  const handleThemeChange = (theme) => {
    triggerToast(`Theme preference updated to ${theme}.`);
  };

  const handleColorChange = (color) => {
    triggerToast(`Accent color updated.`);
  };

  const handleVisitHelpCenter = () => {
    triggerToast('Opening 24/7 Transporter Help Center...');
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
          <SettingsHeaderBanner />

          {/* 2. Horizontal Settings Category Navigation */}
          <SettingsCategoryTabs
            activeTab={activeTab}
            onSelectTab={(tabId) => {
              setActiveTab(tabId);
              if (tabId !== 'general') {
                triggerToast(`Filtered view for ${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);
              }
            }}
          />

          {/* 3. Main Dashboard Settings Grid */}
          <div className="space-y-5">
            {/* ROW 1: Company Information (Left) + Account Security (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
              <CompanyInformationCard
                companyData={companyData}
                onEdit={() => setEditCompanyOpen(true)}
              />

              <AccountSecurityCard
                onSelectSecurityItem={(itemId) => setSecurityModalItem(itemId)}
              />
            </div>

            {/* ROW 2: Business Preferences + Integrations + (Notification + Theme) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {/* Col 1: Business Preferences */}
              <div className="h-full">
                <BusinessPreferencesCard
                  preferences={preferencesData}
                  onEdit={() => setEditPreferencesOpen(true)}
                />
              </div>

              {/* Col 2: Integrations */}
              <div className="h-full">
                <IntegrationsCard
                  onToggleIntegration={(id) => triggerToast(`Integration status updated.`)}
                  onViewAll={() => triggerToast('Loading all 18 integrations...')}
                />
              </div>

              {/* Col 3: Notification Settings + Theme & Appearance */}
              <div className="space-y-5 flex flex-col justify-between">
                <NotificationSettingsCard
                  onToggle={(key, val) => triggerToast(`Notification preference saved.`)}
                />

                <ThemeAppearanceCard
                  onThemeChange={handleThemeChange}
                  onColorChange={handleColorChange}
                />
              </div>
            </div>

            {/* ROW 3: Full-width Need Help Support Card */}
            <SupportHelpCard onVisitHelpCenter={handleVisitHelpCenter} />

            {/* 4. Page Footer */}
            <footer className="pt-2 pb-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium gap-2">
              <span>© 2025 Raahi Transporter. All rights reserved.</span>
              <span>Version 1.0.0</span>
            </footer>
          </div>

          {/* Modals for Edit Actions */}
          <EditCompanyModal
            isOpen={editCompanyOpen}
            initialData={companyData}
            onClose={() => setEditCompanyOpen(false)}
            onSave={handleSaveCompany}
          />

          <EditPreferencesModal
            isOpen={editPreferencesOpen}
            initialData={preferencesData}
            onClose={() => setEditPreferencesOpen(false)}
            onSave={handleSavePreferences}
          />

          <SecurityDetailModal
            itemType={securityModalItem}
            onClose={() => setSecurityModalItem(null)}
            onActionFeedback={(msg) => triggerToast(msg)}
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
