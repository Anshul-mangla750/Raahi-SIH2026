import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Plus, Minus, Target, Layers } from 'lucide-react';

// Start marker: Green location pin
const startMarkerIcon = L.divIcon({
  className: 'custom-start-marker',
  html: `
    <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
      <div style="background-color: #059669; width: 26px; height: 26px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <div style="width: 8px; height: 8px; background-color: white; border-radius: 50%; transform: rotate(45deg);"></div>
      </div>
    </div>
  `,
  iconSize: [26, 32],
  iconAnchor: [13, 28],
});

// Destination marker: Red location pin
const destMarkerIcon = L.divIcon({
  className: 'custom-dest-marker',
  html: `
    <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
      <div style="background-color: #EF4444; width: 28px; height: 28px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2.5px solid white; box-shadow: 0 4px 10px rgba(239,68,68,0.5); display: flex; align-items: center; justify-content: center;">
        <div style="width: 8px; height: 8px; background-color: white; border-radius: 50%; transform: rotate(45deg);"></div>
      </div>
    </div>
  `,
  iconSize: [28, 34],
  iconAnchor: [14, 30],
});

// Current vehicle marker: Blue circular truck icon
const movingTruckIcon = L.divIcon({
  className: 'custom-truck-marker',
  html: `
    <div style="background-color: #2563EB; width: 34px; height: 34px; border-radius: 50%; border: 2.5px solid white; box-shadow: 0 4px 12px rgba(37,99,235,0.4); display: flex; align-items: center; justify-content: center; color: white;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
        <path d="M15 18H9"/>
        <path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-4v10Z"/>
        <circle cx="7" cy="18" r="2"/>
        <circle cx="17" cy="18" r="2"/>
      </svg>
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

// Map Controller for programmatically zooming / centering
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

export default function TrackingMap() {
  const [zoomInCount, setZoomInCount] = useState(0);
  const [zoomOutCount, setZoomOutCount] = useState(0);
  const [centerCount, setCenterCount] = useState(0);

  // High-fidelity route coordinates: Guwahati -> Morigaon -> Nagaon -> Tezpur/Numaligarh -> Jorhat -> Dibrugarh
  const routeCoordinates = [
    [26.1445, 91.7362], // Guwahati
    [26.2550, 92.3400], // Morigaon
    [26.3463, 92.6841], // Nagaon
    [26.6338, 92.8926], // Kaliabor / Brahmaputra South
    [26.5800, 93.4500], // Kaziranga Corridor
    [26.6000, 93.7500], // Numaligarh
    [26.7509, 94.2037], // Jorhat
    [27.0500, 94.5500], // Sivasagar
    [27.4728, 94.9120], // Dibrugarh
  ];

  const currentVehiclePos = [26.6000, 93.7500]; // Near Numaligarh

  return (
    <div className="relative w-full h-[380px] sm:h-[430px] lg:h-[470px] rounded-2xl overflow-hidden border border-slate-200/80 select-none bg-slate-100 shadow-2xs">
      {/* Real Leaflet Map */}
      <MapContainer
        center={[26.70, 93.40]}
        zoom={8}
        zoomControl={false}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Route Polyline (Green) */}
        <Polyline
          positions={routeCoordinates}
          pathOptions={{
            color: '#059669',
            weight: 4.5,
            opacity: 0.9,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />

        {/* Start Marker (Guwahati) */}
        <Marker position={[26.1445, 91.7362]} icon={startMarkerIcon}>
          <Popup className="custom-popup">
            <div className="p-1 text-xs">
              <span className="font-bold text-slate-800">Guwahati, Assam</span>
              <p className="text-[10px] text-slate-500">Journey Started: 08:00 AM</p>
            </div>
          </Popup>
        </Marker>

        {/* Current Vehicle Marker (Blue Truck) */}
        <Marker position={currentVehiclePos} icon={movingTruckIcon}>
          <Popup className="custom-popup">
            <div className="p-1 text-xs">
              <div className="font-black text-slate-900">AS01GC9876</div>
              <p className="text-[10px] text-emerald-600 font-bold">In Transit (65% Completed)</p>
              <p className="text-[10px] text-slate-500">Speed: 52 km/h • Fuel: 68%</p>
            </div>
          </Popup>
        </Marker>

        {/* Destination Marker (Dibrugarh) */}
        <Marker position={[27.4728, 94.9120]} icon={destMarkerIcon}>
          <Popup className="custom-popup">
            <div className="p-1 text-xs">
              <span className="font-bold text-slate-800">Dibrugarh, Assam</span>
              <p className="text-[10px] text-slate-500">ETA: 11:30 AM</p>
            </div>
          </Popup>
        </Marker>

        <MapControlsHandler
          triggerZoomIn={zoomInCount}
          triggerZoomOut={zoomOutCount}
          triggerCenter={centerCount}
        />
      </MapContainer>

      {/* Custom Floating Leaflet Controls (Top-Left) */}
      <div className="absolute top-3 left-3 z-[400] flex flex-col gap-1 bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-slate-200/90 p-1">
        <button
          type="button"
          onClick={() => setZoomInCount((c) => c + 1)}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoomOutCount((c) => c + 1)}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="h-px bg-slate-200 my-0.5" />
        <button
          type="button"
          onClick={() => setCenterCount((c) => c + 1)}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Center on Route"
        >
          <Target className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Map Layers"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Map Legend (Bottom-Right) */}
      <div className="absolute bottom-3 right-3 z-[400] bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-slate-200/90 p-2.5 sm:p-3 text-[11px] font-bold text-slate-600">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span>Moving</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
            <span>Stopped</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0" />
            <span>Idle</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0" />
            <span>Delayed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 flex-shrink-0" />
            <span>Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
