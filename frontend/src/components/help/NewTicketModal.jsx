import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function NewTicketModal({ isOpen, onClose, onSubmitTicket }) {
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Consignments',
    priority: 'Normal',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitTicket(formData);
    setFormData({
      subject: '',
      category: 'Consignments',
      priority: 'Normal',
      description: '',
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-lg border border-slate-200 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-[#0D7A48]" />
              <span className="text-sm font-black text-[#0B1E36]">
                Raise a Support Ticket
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Consignments">Consignments & Tracking</option>
                  <option value="Vehicle Management">Vehicle Management</option>
                  <option value="Route Planning">Route Planning</option>
                  <option value="Billing & Payments">Billing & Payments</option>
                  <option value="Technical">Technical & System</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High (Urgent)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                placeholder="e.g. Unable to upload RC certificate"
                required
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                Description / Details
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                placeholder="Provide specific consignment ID, vehicle number, or error message..."
                required
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
