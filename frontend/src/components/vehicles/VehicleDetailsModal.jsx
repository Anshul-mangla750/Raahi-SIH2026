import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Truck,
  MapPin,
  Clock,
  User,
  Phone,
  Star,
  Gauge,
  Fuel,
  Shield,
  Activity,
  Calendar,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VehicleDetailsModal({ isOpen, onClose, vehicle }) {
  const navigate = useNavigate();

  if (!isOpen || !vehicle) return null;

  const handleTrackLive = () => {
    onClose();
    navigate('/transporter/live-tracking');
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
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">{vehicle.vehicleNo || vehicle.id}</h3>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {vehicle.status?.label || vehicle.status || 'Active'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  {vehicle.model} • {vehicle.capacity || '1,200 kg'}
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

          {/* Body Content */}
          <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
            {/* Telemetry Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-blue-500" /> Current Speed
                </span>
                <span className="text-base font-black text-slate-800 mt-1 block">
                  {vehicle.speed || '48 km/h'}
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Fuel className="w-3 h-3 text-emerald-500" /> Fuel Level
                </span>
                <span className="text-base font-black text-slate-800 mt-1 block">
                  {vehicle.fuel || '76%'}
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-purple-500" /> AIS-140 GPS
                </span>
                <span className="text-base font-black text-emerald-600 mt-1 block">
                  Connected
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-orange-500" /> Engine Health
                </span>
                <span className="text-base font-black text-slate-800 mt-1 block">
                  Optimal
                </span>
              </div>
            </div>

            {/* Current Route & Transit Status */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
              <span className="text-xs font-black text-slate-800 block mb-2">Assigned Corridor Route</span>
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{vehicle.location?.name || vehicle.current_route || 'NH-27 Transit Corridor, Assam'}</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                  <span>Transit Progress</span>
                  <span className="text-emerald-600">65% Completed</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Assigned Driver Profile */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
              <span className="text-xs font-black text-slate-800 block mb-3">Primary Driver Profile</span>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                    <img
                      src={vehicle.driver?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                      alt={vehicle.driver?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{vehicle.driver?.name || 'Bikash Das'}</h4>
                    <span className="text-xs font-medium text-slate-400 block">{vehicle.driver?.phone || '+91 98765 43210'}</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{vehicle.driver?.rating || '4.8'} Safety Rating</span>
                    </div>
                  </div>
                </div>
                <a
                  href={`tel:${vehicle.driver?.phone || '+919876543210'}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Driver
                </a>
              </div>
            </div>

            {/* Compliance & Maintenance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-slate-400 font-medium block">Fitness Certificate</span>
                <span className="font-extrabold text-slate-800">Valid until 15 Nov 2026</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-slate-400 font-medium block">Next Scheduled Service</span>
                <span className="font-extrabold text-slate-800">In 2,400 km (Oil & Brake Check)</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Last telemetry ping: Just now
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleTrackLive}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm shadow-emerald-600/20 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" /> View on Live Map
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
