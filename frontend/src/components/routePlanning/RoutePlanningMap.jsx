import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Plus, Minus, Target } from 'lucide-react';
import { routePlanningPolyline } from '../../data/routePlanningData';

// Generate clean numbered markers matching reference design
const createNumberedMarker = (number, colorBg) => {
  return L.divIcon({
    className: 'custom-numbered-marker',
    html: `
      <div style="
        background-color: ${colorBg};
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2.5px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 900;
        font-size: 11px;
        font-family: system-ui, -apple-system, sans-serif;
      ">
        ${number}
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
};

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

export default function RoutePlanningMap({ stops }) {
  const [mapType, setMapType] = useState('map'); // 'map' or 'satellite'
  const [zoomInCount, setZoomInCount] = useState(0);
  const [zoomOutCount, setZoomOutCount] = useState(0);
  const [centerCount, setCenterCount] = useState(0);

  const getMarkerColor = (status) => {
    switch (status) {
      case 'start':
      case 'stop-green':
        return '#0D7A48';
      case 'stop-blue':
        return '#2563EB';
      case 'destination':
        return '#EF4444';
      default:
        return '#0D7A48';
    }
  };

  const tileUrl =
    mapType === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <div className="relative w-full h-[480px] sm:h-[530px] lg:h-[560px] rounded-2xl overflow-hidden border border-slate-200/80 select-none bg-slate-100 shadow-2xs">
      {/* Real Interactive Leaflet Map */}
      <MapContainer
        center={[26.70, 93.30]}
        zoom={8}
        zoomControl={false}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={tileUrl}
          maxZoom={19}
        />

        {/* Planned Green Route Polyline */}
        <Polyline
          positions={routePlanningPolyline}
          pathOptions={{
            color: '#0D7A48',
            weight: 4.5,
            opacity: 0.95,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />

        {/* Dynamic Numbered Route Stop Markers */}
        {stops.map((stop, index) => {
          const color = getMarkerColor(stop.status);
          const icon = createNumberedMarker(index + 1, color);

          return (
            <Marker key={stop.id} position={stop.coords} icon={icon}>
              <Popup className="custom-popup">
                <div className="p-1 text-xs">
                  <div className="font-extrabold text-slate-900">{stop.name}</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    {stop.type} • {stop.time}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <MapControlsHandler
          triggerZoomIn={zoomInCount}
          triggerZoomOut={zoomOutCount}
          triggerCenter={centerCount}
        />
      </MapContainer>

      {/* Top-Left Map / Satellite Toggle Button */}
      <div className="absolute top-3 left-3 z-[400] bg-white rounded-xl shadow-md border border-slate-200/90 p-1 flex items-center gap-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => setMapType('map')}
          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
            mapType === 'map'
              ? 'bg-slate-100 text-slate-900 font-extrabold shadow-2xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Map
        </button>
        <button
          type="button"
          onClick={() => setMapType('satellite')}
          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
            mapType === 'satellite'
              ? 'bg-slate-100 text-slate-900 font-extrabold shadow-2xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Satellite
        </button>
      </div>

      {/* Right-Side Map Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 right-3 z-[400] flex flex-col gap-1 bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-slate-200/90 p-1">
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
          title="Locate Route"
        >
          <Target className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom-Right Floating Legend */}
      <div className="absolute bottom-3 right-3 z-[400] bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-slate-200/90 p-2.5 sm:p-3 text-[11px] font-bold text-slate-700">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1.5 rounded-full bg-[#0D7A48] flex-shrink-0" />
            <span>Planned Route</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] flex-shrink-0" />
            <span>Stop</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] flex-shrink-0" />
            <span>Destination</span>
          </div>
        </div>
      </div>
    </div>
  );
}
