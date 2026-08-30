import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Truck,
  User,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Download,
  Plus,
  Minus,
  Target,
  ArrowRight,
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

// Leaflet custom pin icons
const createPinIcon = (colorBg, labelText) => {
  return L.divIcon({
    className: 'custom-delivery-map-pin',
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

export default function DeliveryDetailsModal({ delivery, onClose, onDownloadReceipt }) {
  const [zoomInCount, setZoomInCount] = useState(0);
  const [zoomOutCount, setZoomOutCount] = useState(0);
  const [centerCount, setCenterCount] = useState(0);

  if (!delivery) return null;

  const centerCoords =
    delivery.routeCoordinates?.completed?.[
      Math.floor(delivery.routeCoordinates.completed.length / 2)
    ] || [26.40, 92.50];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Delayed':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-4xl border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* 1. Modal Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="text-sm sm:text-base font-black text-[#0B1E36]">
                {delivery.id} — Delivery History Details
              </span>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md ${getStatusBadge(
                  delivery.status
                )}`}
              >
                {delivery.status}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar space-y-6 flex-1">
            {/* Top Grid: Route Summary & Receiver Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Route & Cargo Card */}
              <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Consignment & Cargo
                </span>

                <div className="text-sm font-black text-slate-900">
                  {delivery.cargo}
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <span>{delivery.origin}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span>{delivery.destination}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold pt-1">
                  <Truck className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {delivery.vehicleNo} • {delivery.vehicleModel}
                  </span>
                  <span>•</span>
                  <span>Driver: {delivery.driver}</span>
                </div>
              </div>

              {/* Delivery Performance Metrics Card */}
              <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Delivery Performance
                </span>

                <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">Distance</span>
                    <span className="font-extrabold text-slate-800">{delivery.distance}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">Planned Time</span>
                    <span className="font-extrabold text-slate-800">{delivery.plannedTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">Actual Time</span>
                    <span className="font-extrabold text-slate-800">{delivery.actualTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">Delay</span>
                    <span
                      className={`font-extrabold ${
                        delivery.delay !== '0 min' ? 'text-amber-600' : 'text-emerald-600'
                      }`}
                    >
                      {delivery.delay}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Timeline Stages */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Delivery Timeline Progress
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {delivery.timeline.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border ${
                      step.isDelayed
                        ? 'bg-amber-50/40 border-amber-200/80'
                        : 'bg-white border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-black text-slate-900">{step.title}</span>
                      {step.isDelayed ? (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium block truncate">
                      {step.location}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 mt-1 block">
                      {step.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Route History Map Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Route History & Incident Mapping
                </span>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-1 border-b-2 border-emerald-600 border-dashed" />
                    <span>Completed Route</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 rounded-full bg-red-500" />
                    <span>Delayed / Incident Area</span>
                  </div>
                </div>
              </div>

              {/* Real Leaflet Map */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200/80 select-none bg-slate-100">
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

                  {/* Completed Route (Green Dashed) */}
                  {delivery.routeCoordinates?.completed && (
                    <Polyline
                      positions={delivery.routeCoordinates.completed}
                      pathOptions={{
                        color: '#0D7A48',
                        weight: 4,
                        opacity: 0.9,
                        dashArray: '6, 6',
                      }}
                    />
                  )}

                  {/* Delayed / Incident Route (Red Solid) */}
                  {delivery.routeCoordinates?.delayed?.length > 0 && (
                    <Polyline
                      positions={delivery.routeCoordinates.delayed}
                      pathOptions={{
                        color: '#EF4444',
                        weight: 4.5,
                        opacity: 0.95,
                      }}
                    />
                  )}

                  {/* Origin Marker */}
                  <Marker
                    position={delivery.routeCoordinates?.completed?.[0] || [26.1445, 91.7362]}
                    icon={createPinIcon('#0D7A48', delivery.origin.split(',')[0])}
                  />

                  {/* Destination Marker */}
                  <Marker
                    position={
                      delivery.routeCoordinates?.completed?.[
                        delivery.routeCoordinates.completed.length - 1
                      ] || [26.6338, 92.7926]
                    }
                    icon={createPinIcon('#0D7A48', delivery.destination.split(',')[0])}
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
          </div>

          {/* 3. Modal Footer */}
          <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
            <div className="text-xs font-bold text-slate-500">
              Payment Settled: <span className="font-black text-slate-900">{delivery.payment}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onDownloadReceipt}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Receipt</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#0D7A48] hover:bg-[#0A633A] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
