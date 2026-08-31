import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, MapPin, Truck, Check, Calendar, ArrowRight } from 'lucide-react';
import ApiClient from '../../lib/api';
import { toast } from 'sonner';

export default function NewConsignmentModal({ isOpen, onClose, onConsignmentAdded }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: 'Guwahati',
    originState: 'Assam',
    destination: 'Tezpur',
    destinationState: 'Assam',
    cargoName: 'Pharmaceutical Supplies',
    cargoType: 'package',
    weight: '1,500 kg',
    vehicleNo: 'AS 01 GC 9876',
    driverName: 'Bikash Das',
    priority: 'High',
    etaDate: 'Tomorrow',
    etaTime: '04:30 PM',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const generatedId = `CONS-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;

    const newConsignment = {
      id: generatedId,
      status: 'In Transit',
      statusType: 'in-transit',
      origin: formData.origin,
      originState: formData.originState,
      destination: formData.destination,
      destinationState: formData.destinationState,
      cargoName: formData.cargoName,
      cargoType: formData.cargoType,
      weight: formData.weight,
      bookedOn: 'Today',
      vehicleModel: 'TATA 407',
      vehicleNumber: formData.vehicleNo,
      driverName: formData.driverName,
      priority: formData.priority,
      priorityType: formData.priority.toLowerCase(),
      etaHeading: 'ESTIMATED ARRIVAL',
      etaDate: formData.etaDate,
      etaTime: formData.etaTime,
      etaStatus: 'On Schedule',
      etaStatusType: 'on-schedule',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80',
      timeline: [
        { step: 'Order Placed', status: 'completed', date: 'Today, 09:00 AM' },
        { step: 'In Transit', status: 'current', currentColor: 'blue', date: 'Active Journey' },
        { step: 'Delivered', status: 'upcoming', date: `${formData.etaDate}` },
      ],
    };

    try {
      await ApiClient.createTrip({
        vehicleId: formData.vehicleNo,
        driverId: 'drv_001',
        originDistrictId: formData.origin.toLowerCase().replace(/\s+/g, '_'),
        destDistrictId: formData.destination.toLowerCase().replace(/\s+/g, '_'),
        commodityType: formData.cargoType,
        weightKg: parseInt(formData.weight.replace(/\D/g, '')) || 1500,
        priority: formData.priority.toLowerCase(),
      });
    } catch (e) {
      console.warn('Trip API notification:', e);
    }

    onConsignmentAdded(newConsignment);
    toast.success(`Consignment ${generatedId} booked successfully!`);
    setLoading(false);
    onClose();
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
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Create New Consignment</h3>
                <p className="text-xs text-slate-400 font-medium">Book cargo shipment across NER corridor</p>
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
            {/* Origin -> Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Origin City</label>
                <input
                  type="text"
                  required
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Destination City</label>
                <input
                  type="text"
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Cargo & Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cargo Description</label>
                <input
                  type="text"
                  required
                  value={formData.cargoName}
                  onChange={(e) => setFormData({ ...formData, cargoName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Weight / Volume</label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Vehicle & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Vehicle</label>
                <input
                  type="text"
                  value={formData.vehicleNo}
                  onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="High">High (Medical/Relief)</option>
                  <option value="Medium">Medium (Standard)</option>
                  <option value="Low">Low (Bulk Goods)</option>
                </select>
              </div>
            </div>

            {/* ETA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Arrival Day</label>
                <input
                  type="text"
                  value={formData.etaDate}
                  onChange={(e) => setFormData({ ...formData, etaDate: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Time</label>
                <input
                  type="text"
                  value={formData.etaTime}
                  onChange={(e) => setFormData({ ...formData, etaTime: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
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
                <Check className="w-4 h-4" />
                <span>Create Consignment</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
