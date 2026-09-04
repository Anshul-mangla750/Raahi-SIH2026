import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  UserCheck,
  Truck,
  Phone,
  Mail,
  Key,
  Shield,
  CreditCard,
  Copy,
  Check,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import ApiClient from '../../lib/api';
import { toast } from 'sonner';

export default function AddDriverModal({ isOpen, onClose, onDriverAdded }) {
  const [name, setName] = useState('');
  const [customId, setCustomId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleType, setVehicleType] = useState('Truck');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success handover card state
  const [credentialData, setCredentialData] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  // Auto-generate Driver ID
  const handleAutoGenerateId = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setCustomId(`DRV-${randomSuffix}`);
  };

  // Helper for password generator
  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let gen = '';
    for (let i = 0; i < 8; i++) {
      gen += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(gen);
    setShowPassword(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Driver name is required');
      return;
    }

    setIsSubmitting(true);
    const finalId = customId.trim() || `DRV-${Date.now().toString().slice(-4)}`;
    const finalPassword = password.trim() || 'driver123';
    const finalEmail = email.trim() || `${finalId.toLowerCase()}@raahi.driver`;

    const payload = {
      name: name.trim(),
      customId: finalId,
      phone: phone.trim() || '+91 98765 43210',
      email: finalEmail,
      licenseNo: licenseNo.trim() || 'AR01-COMMERCIAL-DL',
      vehicleNo: vehicleNo.trim() || 'AS-01-COMM-001',
      vehicleType,
      password: finalPassword,
    };

    try {
      const res = await ApiClient.createTransporterDriver(payload);
      if (res && res.success) {
        toast.success(`Driver ${payload.name} added successfully!`);
        setCredentialData({
          name: payload.name,
          customId: finalId,
          email: finalEmail,
          password: finalPassword,
          licenseNo: payload.licenseNo,
          vehicleNo: payload.vehicleNo,
        });
        if (onDriverAdded) onDriverAdded(res.data);
      } else {
        toast.error(res?.message || 'Failed to onboard driver');
      }
    } catch (err) {
      toast.error('Network error onboarding driver');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`Copied ${fieldName} to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyFullHandoverPackage = () => {
    if (!credentialData) return;
    const text = `RAAHI / NER LogiSmart - Driver Mobile App Credentials
Driver Name: ${credentialData.name}
Driver ID: ${credentialData.customId}
Login Email/ID: ${credentialData.email}
Initial Password: ${credentialData.password}
Vehicle Assigned: ${credentialData.vehicleNo}
Mobile App: Raahi Mobile App (Opens Driver Dashboard)`;
    copyToClipboard(text, 'Driver Credentials Package');
  };

  const handleClose = () => {
    setCredentialData(null);
    setName('');
    setCustomId('');
    setPhone('');
    setEmail('');
    setLicenseNo('');
    setVehicleNo('');
    setPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <UserCheck size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Onboard New Fleet Driver</h2>
              <p className="text-xs text-slate-500">
                Credentials enable login into <strong>Raahi Mobile App</strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {credentialData ? (
            /* SUCCESS CREDENTIALS HANDOVER CARD */
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-900">Driver Account Ready!</h3>
                  <p className="text-xs text-emerald-700">
                    Hand over these credentials to <strong>{credentialData.name}</strong> to log into the mobile app.
                  </p>
                </div>
              </div>

              {/* Handover Details Box */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-500">Driver ID / Username:</span>
                  <div className="flex items-center gap-2 font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    <span>{credentialData.customId}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(credentialData.customId, 'Driver ID')}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {copiedField === 'Driver ID' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-500">Login Email:</span>
                  <div className="flex items-center gap-2 font-medium text-slate-900">
                    <span>{credentialData.email}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(credentialData.email, 'Email')}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {copiedField === 'Email' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-500">Initial Password:</span>
                  <div className="flex items-center gap-2 font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <span>{credentialData.password}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(credentialData.password, 'Password')}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {copiedField === 'Password' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="font-semibold text-slate-500">Assigned Vehicle:</span>
                  <span className="font-bold text-slate-800">{credentialData.vehicleNo}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={copyFullHandoverPackage}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  {copiedField === 'Driver Credentials Package' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>Copy Credentials</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* DRIVER ONBOARDING FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Driver Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rakesh Das"
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Custom ID with Auto-Gen */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Driver Official ID *</label>
                  <button
                    type="button"
                    onClick={handleAutoGenerateId}
                    className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles size={11} /> Auto-Generate
                  </button>
                </div>
                <input
                  type="text"
                  value={customId}
                  onChange={(e) => setCustomId(e.target.value)}
                  placeholder="DRV-9821"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm font-semibold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Phone & License */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Driving License No.</label>
                  <input
                    type="text"
                    value={licenseNo}
                    onChange={(e) => setLicenseNo(e.target.value)}
                    placeholder="AR01 2018 1234567"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Assigned Vehicle & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Vehicle No.</label>
                  <input
                    type="text"
                    value={vehicleNo}
                    onChange={(e) => setVehicleNo(e.target.value)}
                    placeholder="AS 01 G 1234"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Type</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Truck">Heavy Cargo Truck</option>
                    <option value="Van">Medium Freight Van</option>
                    <option value="4x4 High-Torque">4x4 High-Torque (Hills)</option>
                    <option value="Tanker">Liquid Tanker</option>
                    <option value="Heavy Trailer">Multi-Axle Trailer</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Initial Mobile App Password</label>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Key size={11} /> Generate
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Default: driver123"
                    className="w-full px-3.5 py-2 pr-10 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  The driver will log into the <strong>Raahi Mobile App</strong> using their ID and this password.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/3 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm shadow-emerald-600/20"
                >
                  {isSubmitting ? (
                    <span>Onboarding...</span>
                  ) : (
                    <>
                      <UserCheck size={16} />
                      <span>Onboard Driver & Generate Credentials</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
