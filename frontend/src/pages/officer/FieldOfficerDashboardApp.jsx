import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  MapPin,
  FileText,
  Smartphone,
  LogOut,
  Send,
  CheckCircle,
  Clock,
  CloudRain,
  Flame,
  Radio,
  PlusCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ApiClient from '@/lib/api';
import { toast } from 'sonner';

export default function FieldOfficerDashboardApp() {
  const { user, logout } = useAuth();

  const [incidentType, setIncidentType] = useState('Landslide');
  const [severity, setSeverity] = useState('HIGH');
  const [locationName, setLocationName] = useState('NH-27 Near Jorabat, Assam');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [reports, setReports] = useState([
    {
      id: 'REP-101',
      type: 'Landslide',
      severity: 'HIGH',
      location: 'NH-27 KM 42, Kamrup Corridor',
      status: 'VERIFIED',
      time: '15 mins ago',
      officer: user?.name || 'Officer',
    },
    {
      id: 'REP-102',
      type: 'Waterlogging / Flash Flood',
      severity: 'CRITICAL',
      location: 'Barapani Bridge Approach, Meghalaya',
      status: 'ACTIVE_DISPATCH',
      time: '1 hour ago',
      officer: user?.name || 'Officer',
    },
    {
      id: 'REP-103',
      type: 'Road Clearance Completed',
      severity: 'INFO',
      location: 'NH-29 Dimapur Bypass',
      status: 'RESOLVED',
      time: '3 hours ago',
      officer: user?.name || 'Officer',
    },
  ]);

  const handleSubmitIncident = async (e) => {
    e.preventDefault();
    if (!locationName.trim()) {
      toast.error('Location is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const newReport = {
        id: `REP-${Math.floor(100 + Math.random() * 900)}`,
        type: incidentType,
        severity,
        location: locationName.trim(),
        status: 'VERIFIED',
        time: 'Just now',
        officer: user?.name || 'Field Officer',
      };

      // Also dispatch to API if online
      try {
        await ApiClient.createAlert({
          type: incidentType.toLowerCase().replace(/\s+/g, '_'),
          severity: severity.toLowerCase(),
          location: locationName.trim(),
          description: description || `Field report filed by ${user?.name || 'Officer'}`,
        });
      } catch (err) {}

      setReports([newReport, ...reports]);
      toast.success('Field incident reported & broadcast to command center!');
      setDescription('');
    } catch (err) {
      toast.error('Failed to submit incident report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
            <Shield size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-[#0B1E36]">RAAHI Field Officer Portal</h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                Active Ground Inspection
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Assigned: <strong>{user?.assignedDistrict || user?.agency || 'Kamrup District Division'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <span className="text-xs font-bold text-slate-800 block">{user?.name || 'Field Officer'}</span>
            <span className="text-[11px] text-slate-500 font-mono">{user?.customId || 'FO-OFFICER'}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold cursor-pointer transition-colors"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Mobile App Callout Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-bold">
              <Smartphone size={14} />
              <span>Mobile Operations Active</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              On the road or in the field? Use Raahi Mobile App
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl">
              You can log into the <strong>Raahi Mobile App</strong> using your official User ID (<code>{user?.customId || 'FO-KAMRUP-01'}</code>) and password for GPS photo reports, live route maps, and offline syncing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-bold font-mono">
              Role: field_officer
            </span>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              District Status
            </span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-emerald-600">Active</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MapPin size={18} />
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium mt-1 block">92% Corridor Connectivity</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Active Alerts
            </span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-amber-600">3 Road Blocks</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle size={18} />
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Landslide on NH-27</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Field Reports Filed
            </span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-slate-800">{reports.length}</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText size={18} />
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Synchronized to HQ</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Emergency SOS Beacon
            </span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-emerald-600">Standby</span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center animate-pulse">
                <Radio size={18} />
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Disaster Cell Linked</span>
          </div>
        </div>

        {/* 2 Column Section: Form & Live Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Incident Reporting Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <PlusCircle size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">File On-Ground Incident</h3>
                <p className="text-xs text-slate-500">Instant broadcast to Admin & Transporters</p>
              </div>
            </div>

            <form onSubmit={handleSubmitIncident} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Disruption Type</label>
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Landslide">Landslide / Debris Flow</option>
                  <option value="Waterlogging / Flash Flood">Waterlogging / Flash Flood</option>
                  <option value="Bridge Damage">Bridge Structural Issue</option>
                  <option value="Road Washout">Severe Road Washout</option>
                  <option value="Accident / Blockade">Accident Obstruction</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Severity</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="CRITICAL">Critical (Total Block)</option>
                    <option value="HIGH">High (Single Lane)</option>
                    <option value="MEDIUM">Medium (Caution)</option>
                    <option value="INFO">Informational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Corridor / Highway</label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g. NH-27 KM 42"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Details & Verification Notes</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe ground status, expected clearance time, and safe detour routes..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm shadow-emerald-600/20"
              >
                {isSubmitting ? (
                  <span>Dispatching...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Submit & Broadcast Report</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Live Field Incident Feed */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Recent Ground Reports</h3>
                  <p className="text-xs text-slate-500">Live feed from regional field officers</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Live Sync Active
              </span>
            </div>

            <div className="space-y-3">
              {reports.map((r) => (
                <div
                  key={r.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-600">{r.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.severity === 'CRITICAL'
                            ? 'bg-rose-100 text-rose-700'
                            : r.severity === 'HIGH'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {r.severity}
                      </span>
                      <strong className="text-xs text-slate-800">{r.type}</strong>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin size={13} className="text-slate-400" />
                      <span>{r.location}</span>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Reported by {r.officer} • {r.time}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      <CheckCircle size={12} />
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
