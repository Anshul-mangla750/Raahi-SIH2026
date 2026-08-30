import React, { useState } from 'react';
import {
  Layers,
  MessageSquare,
  Smartphone,
  Map,
  CreditCard,
  Building,
  ArrowRight,
  Check,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function IntegrationsCard({ onToggleIntegration, onViewAll }) {
  const [integrations, setIntegrations] = useState([
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Get updates on WhatsApp',
      icon: MessageSquare,
      iconColor: 'text-emerald-600 bg-emerald-50',
      connected: true,
    },
    {
      id: 'sms',
      name: 'SMS Gateway',
      description: 'Send & receive SMS alerts',
      icon: Smartphone,
      iconColor: 'text-blue-600 bg-blue-50',
      connected: true,
    },
    {
      id: 'maps',
      name: 'Google Maps',
      description: 'Enable location services',
      icon: Map,
      iconColor: 'text-amber-600 bg-amber-50',
      connected: true,
    },
    {
      id: 'fuel',
      name: 'Fuel Card Partner',
      description: 'Track fuel & expenses',
      icon: CreditCard,
      iconColor: 'text-purple-600 bg-purple-50',
      connected: false,
    },
    {
      id: 'toll',
      name: 'Toll Management',
      description: 'Automate toll payments',
      icon: Building,
      iconColor: 'text-rose-600 bg-rose-50',
      connected: false,
    },
  ]);

  const toggleConnect = (id) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
    if (onToggleIntegration) onToggleIntegration(id);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2 flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D7A48] border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight leading-snug">
            Integrations
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-tight">
            Connect with tools and services.
          </p>
        </div>
      </div>

      {/* Integration Items - Evenly distributed vertically */}
      <div className="flex-1 flex flex-col justify-between divide-y divide-slate-100 my-3 min-h-[280px]">
        {integrations.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="py-2.5 sm:py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-200/60 ${item.iconColor}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-black text-slate-900 truncate">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                    {item.description}
                  </span>
                </div>
              </div>

              {/* Status or Action Button */}
              {item.connected ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex-shrink-0">
                  <Check className="w-3 h-3" />
                  <span>Connected</span>
                </span>
              ) : (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleConnect(item.id)}
                  className="text-[11px] font-bold text-slate-700 hover:text-emerald-700 bg-white hover:bg-emerald-50 border border-slate-200/90 hover:border-emerald-300 px-3 py-1 rounded-lg transition-colors cursor-pointer shadow-2xs flex-shrink-0"
                >
                  Connect
                </motion.button>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Link - Anchored to bottom with margin-top: auto */}
      <div className="mt-auto pt-3.5 border-t border-slate-100 flex items-center justify-center flex-shrink-0">
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <span>View All Integrations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
