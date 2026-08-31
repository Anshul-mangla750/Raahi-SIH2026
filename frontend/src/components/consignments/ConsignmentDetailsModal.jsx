import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Package,
  MapPin,
  Clock,
  Truck,
  ArrowRight,
  Download,
  Calendar,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import StatusTimeline from './StatusTimeline';
import { toast } from 'sonner';

export default function ConsignmentDetailsModal({ isOpen, onClose, consignment }) {
  if (!isOpen || !consignment) return null;

  const handleDownloadWaybill = () => {
    toast.success(`e-Waybill for ${consignment.id} downloaded!`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">{consignment.id}</h3>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {consignment.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  {consignment.cargoName} • {consignment.weight}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
            {/* Route Map summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Origin</span>
                <span className="text-sm font-black text-slate-900">{consignment.origin}</span>
                <span className="text-xs text-slate-500 font-medium">{consignment.originState || 'Assam'}</span>
              </div>
              <div className="flex flex-col items-center px-4">
                <span className="text-[10px] font-bold text-emerald-600">Transit Corridor</span>
                <ArrowRight className="w-5 h-5 text-slate-400 my-0.5" />
                <span className="text-[10px] text-slate-400 font-medium">NH-27 Highway</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</span>
                <span className="text-sm font-black text-slate-900">{consignment.destination}</span>
                <span className="text-xs text-slate-500 font-medium">{consignment.destinationState || 'Assam'}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
              <span className="text-xs font-black text-slate-800 block mb-3">Shipment Progress Milestones</span>
              <div className="py-2 flex justify-center">
                <StatusTimeline timeline={consignment.timeline || []} />
              </div>
            </div>

            {/* Assigned Asset & Driver */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 mb-1">
                  <Truck className="w-3.5 h-3.5 text-blue-500" /> Vehicle Assigned
                </span>
                <span className="text-sm font-black text-slate-800">{consignment.vehicleNumber || 'AS 01 GC 9876'}</span>
                <span className="text-xs text-slate-400 block">{consignment.vehicleModel || 'TATA 407 Heavy'}</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" /> Estimated Arrival (ETA)
                </span>
                <span className="text-sm font-black text-slate-800">{consignment.etaDate || 'Today'}, {consignment.etaTime || '04:30 PM'}</span>
                <span className="text-xs text-emerald-600 font-bold block">{consignment.etaStatus || 'On Schedule'}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
            <button
              type="button"
              onClick={handleDownloadWaybill}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" /> Download e-Waybill
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
