import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Plus, Minus, Target, Layers } from 'lucide-react';
import { subscribeToVehiclePositions } from '@/lib/socket';

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
function MapControlsHandler({ triggerZoomIn, triggerZoomOut, triggerCenter, centerPos }) {
  const map = useMap();

  useEffect(() => {
    if (triggerZoomIn > 0) map.zoomIn();
  }, [triggerZoomIn, map]);

  useEffect(() => {
    if (triggerZoomOut > 0) map.zoomOut();
  }, [triggerZoomOut, map]);

  useEffect(() => {
    if (triggerCenter > 0 && centerPos) map.setView(centerPos, 9);
  }, [triggerCenter, centerPos, map]);

  return null;
}

export default function TrackingMap() {
  const [zoomInCount, setZoomInCount] = useState(0);
  const [zoomOutCount, setZoomOutCount] = useState(0);
  const [centerCount, setCenterCount] = useState(0);

  // Live vehicle telemetry state
  const [vehicleTelemetry, setVehicleTelemetry] = useState({
    id: 'AS-01-AB-1234',
    lat: 26.3452,
    lng: 92.6840,
    speed: 52,
    fuel: 78,
    status: 'In Transit',
  });

  // Subscribe to live GPS telemetry over Socket.io
  useEffect(() => {
    const unsubscribe = subscribeToVehiclePositions((payload) => {
      if (payload && payload.lat && payload.lng) {
        setVehicleTelemetry({
          id: payload.id || 'AS-01-AB-1234',
          lat: payload.lat,
          lng: payload.lng,
          speed: payload.speed || 45,
          fuel: payload.fuel || 75,
          status: payload.status ? payload.status.charAt(0).toUpperCase() + payload.status.slice(1) : 'In Transit',
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const routeCoordinates = [
    [26.1445, 91.7362], // Guwahati
    [26.2550, 92.3400], // Morigaon
    [26.3463, 92.6841], // Nagaon
    [26.6338, 92.8926], // Kaliabor
    [26.5800, 93.4500], // Kaziranga Corridor
    [26.6000, 93.7500], // Numaligarh
    [26.7509, 94.2037], // Jorhat
    [27.0500, 94.5500], // Sivasagar
    [27.4728, 94.9120], // Dibrugarh
  ];

  const currentVehiclePos = [vehicleTelemetry.lat, vehicleTelemetry.lng];

  return (
    <div className="relative w-full h-[380px] sm:h-[430px] lg:h-[470px] rounded-2xl overflow-hidden border border-slate-200/80 select-none bg-slate-100 shadow-2xs">
      {/* Real Leaflet Map */}
      <MapContainer
        center={[26.45, 92.85]}
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

        {/* Live Current Vehicle Marker (Blue Truck) */}
        <Marker position={currentVehiclePos} icon={movingTruckIcon}>
          <Popup className="custom-popup">
            <div className="p-1 text-xs">
              <div className="font-black text-slate-900">{vehicleTelemetry.id}</div>
              <p className="text-[10px] text-emerald-600 font-bold">{vehicleTelemetry.status} (Live Telemetry)</p>
              <p className="text-[10px] text-slate-500">Speed: {vehicleTelemetry.speed} km/h • Fuel: {vehicleTelemetry.fuel}%</p>
              <p className="text-[9px] text-slate-400">Coords: {vehicleTelemetry.lat.toFixed(3)}, {vehicleTelemetry.lng.toFixed(3)}</p>
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
          centerPos={currentVehiclePos}
        />
      </MapContainer>

      {/* Floating Map Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setZoomInCount((c) => c + 1)}
          className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-700 hover:bg-white transition-all hover:scale-105"
          title="Zoom In"
        >
          <Plus size={16} />
        </button>

        <button
          type="button"
          onClick={() => setZoomOutCount((c) => c + 1)}
          className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-700 hover:bg-white transition-all hover:scale-105"
          title="Zoom Out"
        >
          <Minus size={16} />
        </button>

        <button
          type="button"
          onClick={() => setCenterCount((c) => c + 1)}
          className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-700 hover:bg-white transition-all hover:scale-105"
          title="Center on Live Vehicle"
        >
          <Target size={16} />
        </button>
      </div>

      {/* Real-Time Live Status Pill Badge */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl px-3 py-2 shadow-xs flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <div className="text-[11px] font-bold text-slate-800">
          Live GPS Signal Active • <span className="text-emerald-700 font-semibold">{vehicleTelemetry.speed} km/h</span>
        </div>
      </div>
    </div>
  );
}
