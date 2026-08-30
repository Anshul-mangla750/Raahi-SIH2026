import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Plus, Minus, Target, ArrowRight } from 'lucide-react';
import { liveTrackingData } from '../../data/transporterData';

// Custom Leaflet DivIcons matching Tailwind aesthetic
const startIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="background-color:#10B981; width:16px; height:16px; border-radius:50%; border:3px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const destIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="background-color:#10B981; width:20px; height:20px; border-radius:50%; border:3px solid white; box-shadow:0 0 12px rgba(16,185,129,0.7); display:flex; align-items:center; justify-content:center;"><div style="width:7px; height:7px; background-color:white; border-radius:50%;"></div></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const truckIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="background-color:#059669; width:34px; height:34px; border-radius:50%; border:2.5px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.25); display:flex; align-items:center; justify-content:center; color:white;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-4v10Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const alertIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="background-color:#EF4444; width:26px; height:26px; border-radius:50%; border:2px solid white; box-shadow:0 3px 8px rgba(239,68,68,0.4); display:flex; align-items:center; justify-content:center; color:white; font-weight:900; font-size:12px;">!</div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

// Helper component to control zoom / re-centering programmatically
function MapControlsHandler({ triggerZoomIn, triggerZoomOut, triggerCenter }) {
  const map = useMap();

  React.useEffect(() => {
    if (triggerZoomIn > 0) map.zoomIn();
  }, [triggerZoomIn, map]);

  React.useEffect(() => {
    if (triggerZoomOut > 0) map.zoomOut();
  }, [triggerZoomOut, map]);

  React.useEffect(() => {
    if (triggerCenter > 0) map.setView([26.70, 93.30], 8);
  }, [triggerCenter, map]);

  return null;
}

export default function LiveTrackingMap() {
  const { activeVehicle } = liveTrackingData;
  const [zoomInCount, setZoomInCount] = useState(0);
  const [zoomOutCount, setZoomOutCount] = useState(0);
  const [centerCount, setCenterCount] = useState(0);

  // Route Coordinates: Guwahati -> Nagaon -> Tezpur -> Golaghat -> Dibrugarh
  const routeCoordinates = [
    [26.1445, 91.7362], // Guwahati
    [26.3463, 92.6841], // Nagaon
    [26.6338, 92.7926], // Tezpur
    [26.5186, 93.9664], // Golaghat
    [27.4728, 94.9120], // Dibrugarh
  ];

  const truckPos = [26.42, 92.72];
  const alertPos = [26.62, 92.82];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-sm sm:text-base font-extrabold text-[#0B1E36] tracking-tight">
          Live Tracking & GPS
        </h3>
        <button
          type="button"
          className="px-3 py-1 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
        >
          View All Vehicles
        </button>
      </div>

      {/* Real Interactive Leaflet Map Container */}
      <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[390px] rounded-2xl overflow-hidden border border-slate-200/80 select-none bg-slate-100 z-0">
        <MapContainer
          center={[26.70, 93.30]}
          zoom={8}
          zoomControl={false}
          scrollWheelZoom={true}
          className="w-full h-full z-0"
        >
          {/* OpenStreetMap Tile Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Programmatic Control Listener */}
          <MapControlsHandler
            triggerZoomIn={zoomInCount}
            triggerZoomOut={zoomOutCount}
            triggerCenter={centerCount}
          />

          {/* Green Route Polyline */}
          <Polyline
            positions={routeCoordinates}
            pathOptions={{ color: '#10B981', weight: 5, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }}
          />

          {/* Waypoint Markers */}
          <Marker position={routeCoordinates[0]} icon={startIcon}>
            <Popup className="custom-popup">
              <div className="text-xs font-bold text-slate-900">Origin: Guwahati</div>
            </Popup>
          </Marker>

          <Marker position={routeCoordinates[routeCoordinates.length - 1]} icon={destIcon}>
            <Popup className="custom-popup">
              <div className="text-xs font-bold text-slate-900">Destination: Dibrugarh</div>
            </Popup>
          </Marker>

          {/* Moving Truck Marker */}
          <Marker position={truckPos} icon={truckIcon}>
            <Popup className="custom-popup">
              <div className="text-xs font-bold text-slate-900">{activeVehicle.id} - In Transit</div>
            </Popup>
          </Marker>

          {/* Alert Pin Marker */}
          <Marker position={alertPos} icon={alertIcon}>
            <Popup className="custom-popup">
              <div className="text-xs font-bold text-rose-600">Incident: High Landslide Risk</div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Floating Active Vehicle Card (Top Left of Map) */}
        <div className="absolute top-3 left-3 z-[400] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200/90 max-w-[210px] text-left">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-black text-slate-900 leading-tight">
              {activeVehicle.id}
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              {activeVehicle.status}
            </span>
          </div>

          <p className="text-[11px] font-bold text-slate-600 leading-tight mt-1">
            {activeVehicle.route}
          </p>

          <p className="text-[10px] text-slate-400 font-medium leading-tight mt-1">
            ETA: {activeVehicle.eta} • {activeVehicle.distanceRemaining}
          </p>

          <button
            type="button"
            className="mt-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Floating Map Control Buttons (Bottom Right of Map) */}
        <div className="absolute right-3 bottom-3 z-[400] flex flex-col space-y-1.5">
          <button
            type="button"
            onClick={() => setZoomInCount((c) => c + 1)}
            className="w-7 h-7 rounded-xl bg-white/95 backdrop-blur-md shadow-xs border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomOutCount((c) => c + 1)}
            className="w-7 h-7 rounded-xl bg-white/95 backdrop-blur-md shadow-xs border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setCenterCount((c) => c + 1)}
            className="w-7 h-7 rounded-xl bg-white/95 backdrop-blur-md shadow-xs border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <Target className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
