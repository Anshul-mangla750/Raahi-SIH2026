import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  AlertTriangle,
  Clock,
  Navigation,
  ShieldCheck,
  MapPin,
  Share2,
  Download,
  CheckCircle2,
  Plus,
  Minus,
  Target,
} from 'lucide-react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';

// Custom Pin Markers for Leaflet
const createPinIcon = (colorBg, labelText) => {
  return L.divIcon({
    className: 'custom-alert-map-pin',
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -100%);
      ">
        <div style="
          background-color: ${colorBg};
          color: white;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 9px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          border: 1px solid white;
          margin-bottom: 2px;
          font-family: system-ui, sans-serif;
        ">
          ${labelText}
        </div>
        <div style="
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: ${colorBg};
          border: 2.5px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        "></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const createHazardIcon = (text) => {
  return L.divIcon({
    className: 'custom-hazard-marker',
    html: `
      <div style="
        display: flex;
        align-items: center;
        gap: 4px;
        background-color: #EF4444;
        color: white;
        padding: 3px 8px;
        border-radius: 8px;
        font-size: 10px;
        font-weight: 800;
        box-shadow: 0 3px 8px rgba(239, 68, 68, 0.4);
        border: 2px solid white;
        font-family: system-ui, sans-serif;
      ">
        <span>⚠️</span>
        <span>${text}</span>
      </div>
    `,
    iconSize: [110, 24],
    iconAnchor: [55, 12],
  });
};

function MapControlsHandler({ triggerZoomIn, triggerZoomOut, triggerCenter, centerCoords }) {
  const map = useMap();

  React.useEffect(() => {
    if (triggerZoomIn > 0) map.zoomIn();
  }, [triggerZoomIn, map]);

  React.useEffect(() => {
    if (triggerZoomOut > 0) map.zoomOut();
  }, [triggerZoomOut, map]);

  React.useEffect(() => {
    if (triggerCenter > 0 && centerCoords) map.setView(centerCoords, 8);
  }, [triggerCenter, centerCoords, map]);

  return null;
}

export default function AlertDetailsPanel({
  alert,
  onClose,
  onViewAlternateRoute,
  onShareAlert,
  onDownloadReport,
  onMarkAsRead,
}) {
  const [zoomInCount, setZoomInCount] = useState(0);
  const [zoomOutCount, setZoomOutCount] = useState(0);
  const [centerCount, setCenterCount] = useState(0);

  if (!alert) return null;

  const centerCoords = alert.locationCoords || [26.50, 92.50];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between h-full space-y-4">
      <div>
        {/* 1. Header: Alert Details + Severity Badge + Close */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-[#0B1E36] tracking-tight">
            Alert Details
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-600 border border-rose-200">
              {alert.severity} Severity
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Alert Title & Origin/Destination */}
        <div className="mt-3.5">
          <h4 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
            {alert.title}
          </h4>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mt-1">
            <span>{alert.origin}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span>{alert.destination}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mt-1">
            <span>{alert.timestamp}</span>
            <span>•</span>
            <span>Reported by: {alert.reportedBy}</span>
          </div>
        </div>

        {/* 3. Photo Banner with Hazard Badge */}
        <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden mt-3.5 border border-slate-200/70 bg-slate-100">
          <img
            src={alert.image}
            alt={alert.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-3 right-3 bg-red-600/90 text-white backdrop-blur-xs p-2 rounded-xl border border-white/40 shadow-md">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* 4. Description */}
        <p className="text-xs text-slate-600 font-medium leading-relaxed mt-3.5">
          {alert.description}
        </p>

        {/* 5. Affected Route & Map Section */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Affected Route
            </h5>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {alert.affectedHighway}
            </span>
          </div>

          {/* Route Legend */}
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 rounded-full bg-red-500" />
              <span>Blocked Route</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 rounded-full border-b-2 border-emerald-500 border-dashed" />
              <span>Alternate Route</span>
            </div>
          </div>

          {/* Interactive Leaflet Map */}
          <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden border border-slate-200/80 select-none bg-slate-100">
            <MapContainer
              center={centerCoords}
              zoom={8}
              zoomControl={false}
              scrollWheelZoom={false}
              className="w-full h-full z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Red Blocked Route Polyline */}
              {alert.routeCoordinates?.blocked && (
                <Polyline
                  positions={alert.routeCoordinates.blocked}
                  pathOptions={{
                    color: '#EF4444',
                    weight: 4,
                    opacity: 0.9,
                  }}
                />
              )}

              {/* Green Dashed Alternate Route Polyline */}
              {alert.routeCoordinates?.alternate && (
                <Polyline
                  positions={alert.routeCoordinates.alternate}
                  pathOptions={{
                    color: '#0D7A48',
                    weight: 3.5,
                    opacity: 0.9,
                    dashArray: '6, 6',
                  }}
                />
              )}

              {/* Origin Marker */}
              <Marker
                position={alert.routeCoordinates?.blocked?.[0] || [26.1445, 91.7362]}
                icon={createPinIcon('#0D7A48', alert.origin.split(',')[0])}
              />

              {/* Destination Marker */}
              <Marker
                position={
                  alert.routeCoordinates?.alternate?.[
                    alert.routeCoordinates.alternate.length - 1
                  ] || [26.6338, 92.7926]
                }
                icon={createPinIcon('#0D7A48', alert.destination.split(',')[0])}
              />

              {/* Hazard Incident Marker */}
              <Marker
                position={alert.locationCoords}
                icon={createHazardIcon('Nameri Hill Area')}
              />

              <MapControlsHandler
                triggerZoomIn={zoomInCount}
                triggerZoomOut={zoomOutCount}
                triggerCenter={centerCount}
                centerCoords={centerCoords}
              />
            </MapContainer>

            {/* Map Controls */}
            <div className="absolute top-2 right-2 z-[400] flex flex-col gap-1 bg-white/95 backdrop-blur-xs rounded-lg shadow-sm border border-slate-200/90 p-1">
              <button
                type="button"
                onClick={() => setZoomInCount((c) => c + 1)}
                className="p-1 rounded text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomOutCount((c) => c + 1)}
                className="p-1 rounded text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setCenterCount((c) => c + 1)}
                className="p-1 rounded text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <Target className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 6. Suggested Alternate Route Card */}
        {alert.alternateRoute && (
          <div className="mt-4 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900">
                Suggested Alternate Route
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                Recommended
              </span>
            </div>

            <p className="text-[11px] font-bold text-slate-600 truncate">
              {alert.alternateRoute.path}
            </p>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block">
                  Extra Distance
                </span>
                <span className="text-xs font-black text-slate-800 mt-0.5 block">
                  {alert.alternateRoute.extraDistance}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block">
                  ETA Increase
                </span>
                <span className="text-xs font-black text-slate-800 mt-0.5 block">
                  {alert.alternateRoute.etaIncrease}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block">
                  Road Condition
                </span>
                <span className="text-xs font-black text-emerald-600 mt-0.5 block">
                  {alert.alternateRoute.roadCondition}
                </span>
              </div>
            </div>

            {/* View Full Alternate Route Button */}
            <motion.button
              type="button"
              onClick={onViewAlternateRoute}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-2.5 rounded-xl bg-[#0D7A48] hover:bg-[#0A633A] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>View Full Alternate Route</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* 7. Bottom Action Bar ("What you can do?") */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700">What you can do?</span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onShareAlert}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-slate-600 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share Alert</span>
          </button>

          <button
            type="button"
            onClick={onDownloadReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-slate-600 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download Report</span>
          </button>

          <button
            type="button"
            onClick={onMarkAsRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-slate-600 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Mark as Read</span>
          </button>
        </div>
      </div>
    </div>
  );
}
