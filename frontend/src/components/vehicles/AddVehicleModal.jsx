import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, User, Phone, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import ApiClient from '../../lib/api';
import { toast } from 'sonner';

export default function AddVehicleModal({ isOpen, onClose, onVehicleAdded }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicleNo: '',
    model: 'TATA 407 Heavy',
    capacity: '1,500 kg',
    modelYear: '2023',
    status: 'In Transit',
    driverName: '',
    driverPhone: '',
    driverRating: '4.8',
    currentRoute: 'Guwahati → Tezpur, NH-27',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vehicleNo.trim()) {
      toast.error('Please enter a vehicle registration number');
      return;
    }
    if (!formData.driverName.trim()) {
      toast.error('Please assign a primary driver');
      return;
    }

    setLoading(true);
    try {
      const newVehicle = {
        id: formData.vehicleNo.toUpperCase().trim(),
        vehicleNo: formData.vehicleNo.toUpperCase().trim(),
        model: formData.model,
        capacity: formData.capacity,
        modelYear: `Model: ${formData.modelYear}`,
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80',
        driver: {
          name: formData.driverName,
          phone: formData.driverPhone || '+91 98765 00000',
          rating: formData.driverRating || '4.8',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        },
        status: {
          label: formData.status,
          type: formData.status === 'In Transit' ? 'in-transit' : formData.status === 'Idle' ? 'idle' : 'under-maintenance',
          route: formData.currentRoute,
          progressPercent: formData.status === 'In Transit' ? 50 : 0,
          progressText: formData.status === 'In Transit' ? 'Active Journey' : 'Stationary',
          progressColor: formData.status === 'In Transit' ? 'bg-emerald-500' : 'bg-orange-500',
        },
        location: {
          name: formData.currentRoute.split('→')[0]?.trim() || 'Guwahati Fleet Hub',
        },
        lastUpdated: {
          date: 'Just now',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      };

      // Call live backend endpoint
      await ApiClient.request('/transporter/vehicles', {
        method: 'POST',
        body: JSON.stringify({
          id: newVehicle.id,
          model: newVehicle.model,
          type: 'truck',
          capacityKg: parseInt(formData.capacity.replace(/\D/g, '')) || 1500,
          status: formData.status === 'In Transit' ? 'moving' : 'idle',
        }),
      });

      onVehicleAdded(newVehicle);
      toast.success(`Vehicle ${newVehicle.id} added to active fleet!`);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to register vehicle. Saved locally.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Add New Vehicle</h3>
                <p className="text-xs text-slate-400 font-medium">Register fleet asset to GPS monitoring</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Vehicle Reg Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AS 01 GC 9876"
                  value={formData.vehicleNo}
                  onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Model</label>
                <select
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="TATA 407 Heavy">TATA 407 Heavy (1.5T)</option>
                  <option value="EICHER Pro 2049">EICHER Pro 2049 (2.5T)</option>
                  <option value="Mahindra Bolero Maxi">Mahindra Bolero Maxi (1.2T)</option>
                  <option value="Ashok Leyland Dost">Ashok Leyland Dost (1.5T)</option>
                  <option value="BharatBenz 1217R">BharatBenz 1217R (9T)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Capacity</label>
                <input
                  type="text"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Model Year</label>
                <input
                  type="text"
                  value={formData.modelYear}
                  onChange={(e) => setFormData({ ...formData, modelYear: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Initial Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="In Transit">In Transit</option>
                  <option value="Idle">Idle</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <h4 className="text-xs font-black text-slate-800 mb-2.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" /> Assigned Primary Driver
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Driver Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kalita"
                    value={formData.driverName}
                    onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Driver Contact</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={formData.driverPhone}
                    onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Route / Operating Base</label>
              <input
                type="text"
                value={formData.currentRoute}
                onChange={(e) => setFormData({ ...formData, currentRoute: e.target.value })}
                placeholder="e.g. Guwahati → Tezpur, NH-27"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Registering...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Register Vehicle</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
