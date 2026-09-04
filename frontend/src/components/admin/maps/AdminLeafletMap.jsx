import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Polygon, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Plus, Minus, Layers, Maximize2, Minimize2 } from 'lucide-react';

// Fix Leaflet default icon path issues in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper component to trigger map invalidateSize and programmatic zoom
function MapController({ center, zoom, triggerZoomIn, triggerZoomOut, isFullscreen }) {
  const map = useMap();

  useEffect(() => {
    // Invalidate size on mount and whenever fullscreen changes
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [map, isFullscreen]);

  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);

  useEffect(() => {
    if (triggerZoomIn > 0) map.zoomIn();
  }, [triggerZoomIn, map]);

  useEffect(() => {
    if (triggerZoomOut > 0) map.zoomOut();
  }, [triggerZoomOut, map]);

  return null;
}

// Icon Creator utility
export const createCustomMarkerIcon = ({
  type = 'pin',
  color = '#059669',
  label = '',
  size = 28,
  subtext = '',
}) => {
  if (type === 'truck') {
    return L.divIcon({
      className: 'custom-leaflet-truck',
      html: `
        <div style="
          width: ${size}px; 
          height: ${size}px; 
          border-radius: 50%; 
          background-color: ${color}; 
          border: 2px solid #ffffff; 
          box-shadow: 0 3px 8px rgba(0,0,0,0.35); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: #ffffff;
        ">
          <svg width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
            <path d="M15 18H9"/>
            <path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-4v10Z"/>
            <circle cx="7" cy="18" r="2"/>
            <circle cx="17" cy="18" r="2"/>
          </svg>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }

  if (type === 'hazard' || type === 'alert') {
    return L.divIcon({
      className: 'custom-leaflet-hazard',
      html: `
        <div style="
          width: ${size}px; 
          height: ${size}px; 
          border-radius: 50%; 
          background-color: ${color}; 
          border: 2.5px solid #ffffff; 
          box-shadow: 0 3px 8px rgba(220,38,38,0.4); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: #ffffff;
        ">
          <svg width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }

  if (type === 'flood') {
    return L.divIcon({
      className: 'custom-leaflet-flood',
      html: `
        <div style="
          width: ${size}px; 
          height: ${size}px; 
          border-radius: 50%; 
          background-color: ${color}; 
          border: 2px solid #ffffff; 
          box-shadow: 0 3px 8px rgba(220,38,38,0.4); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: #ffffff;
        ">
          <svg width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 3.5L4.5 13H7.5V19H24.5V13H27.5L16 3.5Z"/>
            <path d="M3.5 22.5C6 21 9 21 11.5 22.5C14 24 17 24 19.5 22.5C22 21 25 21 27.5 22.5"/>
          </svg>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }

  if (type === 'cluster') {
    return L.divIcon({
      className: 'custom-leaflet-cluster',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="
            width: ${size}px; 
            height: ${size}px; 
            border-radius: 50%; 
            background-color: ${color}; 
            color: #ffffff; 
            border: 2px solid #ffffff; 
            box-shadow: 0 2px 6px rgba(0,0,0,0.3); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 11px; 
            font-weight: 800;
          ">
            ${label}
          </div>
          ${subtext ? `<span style="
            font-size: 9.5px; 
            font-weight: 700; 
            color: #1E293B; 
            background-color: rgba(255, 255, 255, 0.9); 
            padding: 1px 4px; 
            border-radius: 3px; 
            margin-top: 2px; 
            box-shadow: 0 1px 2px rgba(0,0,0,0.1); 
            white-space: nowrap;
          ">${subtext}</span>` : ''}
        </div>
      `,
      iconSize: [size, size + 16],
      iconAnchor: [size / 2, size / 2],
    });
  }

  if (type === 'stop') {
    return L.divIcon({
      className: 'custom-leaflet-stop',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="
            width: 24px; 
            height: 24px; 
            border-radius: 50%; 
            background-color: ${color}; 
            color: #ffffff; 
            border: 2px solid #ffffff; 
            box-shadow: 0 2px 5px rgba(0,0,0,0.3); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 11px; 
            font-weight: 800;
          ">
            ${label}
          </div>
          ${subtext ? `<span style="
            font-size: 10px; 
            font-weight: 700; 
            color: #0F172A; 
            background-color: rgba(255, 255, 255, 0.95); 
            padding: 1px 6px; 
            border-radius: 4px; 
            border: 1px solid #E2E8F0; 
            margin-top: 2px; 
            white-space: nowrap; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          ">${subtext}</span>` : ''}
        </div>
      `,
      iconSize: [24, 40],
      iconAnchor: [12, 12],
    });
  }

  // Default Pin
  return L.divIcon({
    className: 'custom-leaflet-pin',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        ${label ? `<div style="
          background-color: #ffffff; 
          color: #0F172A; 
          font-size: 11px; 
          font-weight: 700; 
          padding: 2px 8px; 
          border-radius: 4px; 
          border: 1px solid #E2E8F0; 
          box-shadow: 0 1px 4px rgba(0,0,0,0.15); 
          white-space: nowrap; 
          margin-bottom: 3px;
        ">${label}</div>` : ''}
        <div style="
          width: 14px; 
          height: 14px; 
          border-radius: 50%; 
          background-color: ${color}; 
          border: 2.5px solid #ffffff; 
          box-shadow: 0 2px 5px rgba(0,0,0,0.35);
        "></div>
      </div>
    `,
    iconSize: [70, 36],
    iconAnchor: [35, 30],
  });
};

export const AdminLeafletMap = ({
  center = [26.2006, 92.9376], // Central Assam / Northeast
  zoom = 7.5,
  minZoom = 5,
  maxZoom = 18,
  height = '100%',
  markers = [],
  routes = [],
  polygons = [],
  tileProvider = 'carto', // 'carto' | 'osm' | 'satellite'
  showControls = true,
  showTileSwitch = true,
  legend = null,
  children,
  className = '',
  style = {},
}) => {
  const [currentTile, setCurrentTile] = useState(tileProvider);
  const [triggerZoomIn, setTriggerZoomIn] = useState(0);
  const [triggerZoomOut, setTriggerZoomOut] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const tileUrls = {
    carto: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    },
  };

  const activeTile = tileUrls[currentTile] || tileUrls.carto;

  return (
    <div
      ref={containerRef}
      className={`admin-leaflet-container ${isFullscreen ? 'fullscreen-map' : ''} ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: isFullscreen ? '100vh' : height,
        borderRadius: isFullscreen ? '0' : '8px',
        overflow: 'hidden',
        zIndex: isFullscreen ? 9999 : 1,
        ...style,
      }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        zoomControl={false}
        attributionControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <MapController
          center={center}
          zoom={zoom}
          triggerZoomIn={triggerZoomIn}
          triggerZoomOut={triggerZoomOut}
          isFullscreen={isFullscreen}
        />

        <TileLayer url={activeTile.url} attribution={activeTile.attribution} />

        {/* Polygons (e.g. District boundaries) */}
        {polygons.map((poly, idx) => (
          <Polygon
            key={poly.id || idx}
            positions={poly.positions}
            pathOptions={{
              color: poly.color || '#10B981',
              fillColor: poly.fillColor || '#10B981',
              fillOpacity: poly.fillOpacity ?? 0.08,
              weight: poly.weight || 2,
              dashArray: poly.dashArray || null,
            }}
          >
            {poly.popup && <Popup>{poly.popup}</Popup>}
          </Polygon>
        ))}

        {/* Route Polylines */}
        {routes.map((route, idx) => (
          <Polyline
            key={route.id || idx}
            positions={route.coordinates}
            pathOptions={{
              color: route.color || '#10B981',
              weight: route.weight || 4,
              opacity: route.opacity || 0.85,
              dashArray: route.dashArray || null,
            }}
          >
            {route.name && <Tooltip sticky>{route.name}</Tooltip>}
            {route.popup && <Popup>{route.popup}</Popup>}
          </Polyline>
        ))}

        {/* Markers */}
        {markers.map((marker, idx) => {
          const icon =
            marker.icon ||
            createCustomMarkerIcon({
              type: marker.iconType || 'pin',
              color: marker.color || '#059669',
              label: marker.label || '',
              subtext: marker.subtext || '',
              size: marker.size || 28,
            });

          return (
            <Marker
              key={marker.id || idx}
              position={marker.position}
              icon={icon}
              eventHandlers={{
                click: () => {
                  if (marker.onClick) marker.onClick();
                },
              }}
            >
              {marker.popupContent && (
                <Popup className="admin-leaflet-popup">
                  {typeof marker.popupContent === 'string' ? (
                    <div style={{ fontSize: '12px', padding: '2px 4px' }}>
                      <strong style={{ display: 'block', color: '#0F172A', marginBottom: '2px' }}>
                        {marker.title || marker.label}
                      </strong>
                      <span style={{ color: '#475569' }}>{marker.popupContent}</span>
                    </div>
                  ) : (
                    marker.popupContent
                  )}
                </Popup>
              )}
            </Marker>
          );
        })}

        {/* Custom Additional Children Components */}
        {children}
      </MapContainer>

      {/* Map Header Control: Layer/Tile Switcher */}
      {showTileSwitch && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            padding: '2px',
            zIndex: 1000,
          }}
        >
          {['carto', 'satellite', 'osm'].map((t) => (
            <button
              key={t}
              onClick={() => setCurrentTile(t)}
              style={{
                background: currentTile === t ? '#059669' : 'transparent',
                color: currentTile === t ? '#ffffff' : '#475569',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: currentTile === t ? 700 : 500,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.15s ease',
              }}
            >
              {t === 'carto' ? 'Light' : t === 'satellite' ? 'Satellite' : 'Roads'}
            </button>
          ))}
        </div>
      )}

      {/* Floating Legend Overlay (if provided) */}
      {legend && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            zIndex: 1000,
          }}
        >
          {legend}
        </div>
      )}

      {/* Compact Zoom Controls & Fullscreen */}
      {showControls && (
        <div
          style={{
            position: 'absolute',
            right: '12px',
            bottom: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setTriggerZoomIn((z) => z + 1)}
            title="Zoom In"
            style={{
              width: '28px',
              height: '28px',
              backgroundColor: '#ffffff',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#334155',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Plus size={15} />
          </button>
          <button
            onClick={() => setTriggerZoomOut((z) => z + 1)}
            title="Zoom Out"
            style={{
              width: '28px',
              height: '28px',
              backgroundColor: '#ffffff',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#334155',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Minus size={15} />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            style={{
              width: '28px',
              height: '28px',
              backgroundColor: '#ffffff',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#334155',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              marginTop: '2px',
            }}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLeafletMap;
