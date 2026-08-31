import React, { useState, useEffect } from 'react';
import { AlertTriangle, CloudRain, ChevronRight } from 'lucide-react';
import { alertsData } from '../../data/transporterData';
import ApiClient from '@/lib/api';
import { subscribeToAlerts } from '@/lib/socket';

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState(alertsData);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await ApiClient.getTransporterAlerts();
        if (res?.success && res.data && res.data.length > 0) {
          const mapped = res.data.slice(0, 3).map((a, idx) => ({
            id: a.id || idx,
            title: a.title,
            route: a.location || 'NER Corridor',
            time: a.time || '10 mins ago',
            type: a.severity === 'High' ? 'danger' : 'warning',
            category: a.type === 'landslide' ? 'Terrain Hazard' : 'Weather Alert',
          }));
          setAlerts(mapped);
        }
      } catch (e) {
        console.warn('Using fallback alerts in panel:', e);
      }
    };
    fetchAlerts();

    // Listen for real-time live alert broadcasts
    const unsubscribe = subscribeToAlerts((newAlert) => {
      setAlerts(prev => [
        {
          id: newAlert.id || Date.now(),
          title: newAlert.title,
          route: newAlert.location || 'Regional Grid',
          time: 'Just now',
          type: newAlert.severity === 'High' ? 'danger' : 'warning',
          category: 'Real-time Alert',
        },
        ...prev.slice(0, 2),
      ]);
    });

    return () => unsubscribe();
  }, []);

  const getAlertIcon = (id, type) => {
    if (type === 'danger') {
      return (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-50 border border-rose-100/90 flex items-center justify-center flex-shrink-0 shadow-2xs">
          <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-rose-600 stroke-[2.2]" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-50 border border-orange-100/90 flex items-center justify-center flex-shrink-0 shadow-2xs">
        <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 stroke-[2.2]" />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-sm sm:text-base font-extrabold text-[#0B1E36] tracking-tight">
          Alerts & Notifications (Live WebSocket)
        </h3>
        <button
          type="button"
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Stacked Alert Cards */}
      <div className="flex-1 flex flex-col justify-between space-y-3.5 my-1">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex-1 min-h-[96px] p-4 rounded-2xl border border-slate-100/90 bg-slate-50/60 hover:bg-slate-50/90 transition-all flex items-center justify-between gap-3.5 cursor-pointer group shadow-2xs"
          >
            {/* Left: Icon & Alert Info */}
            <div className="flex items-start gap-3.5 min-w-0 flex-1">
              {getAlertIcon(alert.id, alert.type)}
              <div className="flex flex-col min-w-0 my-auto">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                    {alert.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-semibold leading-tight">
                    {alert.route}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      alert.type === 'danger'
                        ? 'bg-rose-100/80 text-rose-700'
                        : 'bg-orange-100/80 text-orange-700'
                    }`}
                  >
                    {alert.category || 'Corridor Hazard'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{alert.time}</span>
                </div>
              </div>
            </div>

            {/* Right: Action Arrow */}
            <div className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all">
              <ChevronRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
