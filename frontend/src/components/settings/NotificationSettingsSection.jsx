import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Bell, Package, Truck, MapPin, CheckCircle2 } from 'lucide-react';
import { initialNotificationPreferences } from '../../data/settingsData';

export default function NotificationSettingsSection({ onSave, onCancel }) {
  const [preferences, setPreferences] = useState(initialNotificationPreferences);

  const toggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    setPreferences(initialNotificationPreferences);
    onCancel();
  };

  const notificationItems = [
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive important delivery summaries and receipts via email.',
      icon: Mail,
    },
    {
      key: 'pushNotifications',
      title: 'Push Notifications',
      description: 'Get real-time browser and dashboard notifications for events.',
      icon: Bell,
    },
    {
      key: 'deliveryUpdates',
      title: 'Delivery Updates',
      description: 'Receive instant notifications when consignment status changes.',
      icon: Package,
    },
    {
      key: 'vehicleAlerts',
      title: 'Vehicle Alerts',
      description: 'Get notified about breakdown warnings, tyre telemetry and maintenance.',
      icon: Truck,
    },
    {
      key: 'routeAlerts',
      title: 'Route Alerts',
      description: 'Receive automated alerts about highway landslides, floods and traffic diversions.',
      icon: MapPin,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight">
          Notification Preferences
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Choose how and when you want to receive operations and fleet alerts.
        </p>
      </div>

      {/* Toggle List */}
      <div className="divide-y divide-slate-100">
        {notificationItems.map((item) => {
          const Icon = item.icon;
          const isEnabled = preferences[item.key];

          return (
            <div
              key={item.key}
              className="py-4 flex items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 flex-shrink-0 mt-0.5 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-black text-slate-900 leading-tight">
                    {item.title}
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => toggle(item.key)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEnabled ? 'bg-[#0D7A48]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <motion.button
          type="button"
          onClick={() => onSave(preferences)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </motion.button>
      </div>
    </div>
  );
}
