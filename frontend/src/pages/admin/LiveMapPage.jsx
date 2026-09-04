import React, { useState } from 'react';
import {
  Route as RouteIcon,
  AlertTriangle,
  Ban,
  Truck,
  Package,
  Sun,
  Calendar,
  ChevronDown,
  Layers,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  Navigation,
  Compass,
  X,
  Play,
  Pause,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertOctagon,
  Waves,
  CloudRain,
  ShieldAlert,
  HardHat,
  ArrowRight,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';

import { AdminLeafletMap } from '@/components/admin/maps/AdminLeafletMap';

export const LiveMapPage = () => {
  // Map Layer Toggles
  const [layers, setLayers] = useState({
    traffic: true,
    vehicles: true,
    incidents: true,
    roadConditions: true,
    weatherRadar: true,
    districtBoundary: false,
  });

  const [layersOpen, setLayersOpen] = useState(true);
  const [legendOpen, setLegendOpen] = useState(true);
  const [weatherRadarOpen, setWeatherRadarOpen] = useState(true);
  const [radarPlaying, setRadarPlaying] = useState(true);
  const [radarTime, setRadarTime] = useState('10:00');
  const [mapCenter, setMapCenter] = useState([26.15, 92.50]);
  const [mapZoom, setMapZoom] = useState(7.6);
  const [selectedRoute, setSelectedRoute] = useState('recommended');

  // Active vehicles tab
  const [activeVehicleTab, setActiveVehicleTab] = useState('live'); // 'live' | 'all'

  const toggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeVehiclesData = [
    { id: 'AS01AB1234', route: 'Guwahati - Itanagar', speed: '65 km/h', status: 'On Route', statusClass: 'badge-success' },
    { id: 'AS02CD5678', route: 'Silchar - Aizawl', speed: '22 km/h', status: 'Delayed', statusClass: 'badge-warning' },
    { id: 'ML05EF9012', route: 'Shillong - Tura', speed: '48 km/h', status: 'On Route', statusClass: 'badge-success' },
    { id: 'NL01GH3456', route: 'Dimapur - Kohima', speed: '0 km/h', status: 'Stopped', statusClass: 'badge-danger' },
    { id: 'MN01IJ7890', route: 'Imphal - Ukhrul', speed: '52 km/h', status: 'On Route', statusClass: 'badge-success' },
  ];

  // Dynamic Leaflet Markers
  const cityHubMarkers = [
    {
      id: 'city-guwahati',
      position: [26.1445, 91.7362],
      iconType: 'cluster',
      color: '#2563EB',
      label: 'GHY',
      subtext: 'Guwahati (Hub)',
      popupContent: (
        <div>
          <strong>Guwahati Central Logistics Hub</strong>
          <p style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 0' }}>Primary Regional Gateway • 32 Active Outbound Convoys</p>
        </div>
      ),
    },
    {
      id: 'city-shillong',
      position: [25.5788, 91.8933],
      iconType: 'stop',
      color: '#0F172A',
      label: 'SHL',
      subtext: 'Shillong',
      popupContent: <div><strong>Shillong Transit Hub</strong><p style={{ fontSize: '11px', color: '#64748B' }}>Meghalaya Sector</p></div>,
    },
    {
      id: 'city-nagaon',
      position: [26.3452, 92.6840],
      iconType: 'stop',
      color: '#0F172A',
      label: 'NAG',
      subtext: 'Nagaon',
      popupContent: <div><strong>Nagaon Junction</strong><p style={{ fontSize: '11px', color: '#64748B' }}>Central Assam Corridor</p></div>,
    },
    {
      id: 'city-tezpur',
      position: [26.6528, 92.7926],
      iconType: 'stop',
      color: '#0F172A',
      label: 'TEZ',
      subtext: 'Tezpur',
      popupContent: <div><strong>Tezpur Logistics Hub</strong><p style={{ fontSize: '11px', color: '#64748B' }}>North Bank Gateway</p></div>,
    },
    {
      id: 'city-dimapur',
      position: [25.9094, 93.7266],
      iconType: 'stop',
      color: '#0F172A',
      label: 'DIM',
      subtext: 'Dimapur',
      popupContent: <div><strong>Dimapur Supply Depo</strong><p style={{ fontSize: '11px', color: '#64748B' }}>Nagaland Border Gateway</p></div>,
    },
    {
      id: 'city-kohima',
      position: [25.6751, 94.1086],
      iconType: 'stop',
      color: '#0F172A',
      label: 'KOH',
      subtext: 'Kohima',
      popupContent: <div><strong>Kohima Station</strong><p style={{ fontSize: '11px', color: '#64748B' }}>Mountain Route Terminal</p></div>,
    },
    {
      id: 'city-imphal',
      position: [24.8170, 93.9368],
      iconType: 'stop',
      color: '#0F172A',
      label: 'IMP',
      subtext: 'Imphal',
      popupContent: <div><strong>Imphal Depot</strong><p style={{ fontSize: '11px', color: '#64748B' }}>Manipur Sector Distribution</p></div>,
    },
    {
      id: 'city-silchar',
      position: [24.8333, 92.7789],
      iconType: 'stop',
      color: '#0F172A',
      label: 'SIL',
      subtext: 'Silchar',
      popupContent: <div><strong>Silchar Junction</strong><p style={{ fontSize: '11px', color: '#64748B' }}>Barak Valley Hub</p></div>,
    },
    {
      id: 'city-aizawl',
      position: [23.7271, 92.7176],
      iconType: 'stop',
      color: '#0F172A',
      label: 'AIZ',
      subtext: 'Aizawl',
      popupContent: <div><strong>Aizawl Central Hub</strong><p style={{ fontSize: '11px', color: '#64748B' }}>Mizoram Sector Terminal</p></div>,
    },
    {
      id: 'city-itanagar',
      position: [27.0844, 93.6053],
      iconType: 'stop',
      color: '#0F172A',
      label: 'ITA',
      subtext: 'Itanagar',
      popupContent: <div><strong>Itanagar Forward Depot</strong><p style={{ fontSize: '11px', color: '#64748B' }}>Arunachal Sector</p></div>,
    },
  ];

  const vehicleMarkers = layers.vehicles
    ? [
        {
          id: 'v-AS01AB1234',
          position: [26.70, 93.10],
          iconType: 'truck',
          color: '#10B981',
          size: 30,
          popupContent: (
            <div style={{ minWidth: '150px' }}>
              <strong style={{ fontSize: '13px', color: '#0F172A' }}>AS01AB1234</strong>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Guwahati → Itanagar</div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 700, marginTop: '2px' }}>Speed: 65 km/h • On Route</div>
            </div>
          ),
        },
        {
          id: 'v-AS02CD5678',
          position: [24.25, 92.75],
          iconType: 'truck',
          color: '#D97706',
          size: 30,
          popupContent: (
            <div style={{ minWidth: '150px' }}>
              <strong style={{ fontSize: '13px', color: '#0F172A' }}>AS02CD5678</strong>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Silchar → Aizawl</div>
              <div style={{ fontSize: '11px', color: '#D97706', fontWeight: 700, marginTop: '2px' }}>Speed: 22 km/h • Delayed</div>
            </div>
          ),
        },
        {
          id: 'v-ML05EF9012',
          position: [25.55, 90.95],
          iconType: 'truck',
          color: '#10B981',
          size: 30,
          popupContent: (
            <div style={{ minWidth: '150px' }}>
              <strong style={{ fontSize: '13px', color: '#0F172A' }}>ML05EF9012</strong>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Shillong → Tura</div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 700, marginTop: '2px' }}>Speed: 48 km/h • On Route</div>
            </div>
          ),
        },
        {
          id: 'v-NL01GH3456',
          position: [25.78, 93.92],
          iconType: 'truck',
          color: '#EF4444',
          size: 30,
          popupContent: (
            <div style={{ minWidth: '150px' }}>
              <strong style={{ fontSize: '13px', color: '#0F172A' }}>NL01GH3456</strong>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Dimapur → Kohima</div>
              <div style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700, marginTop: '2px' }}>Speed: 0 km/h • Stopped</div>
            </div>
          ),
        },
        {
          id: 'v-MN01IJ7890',
          position: [25.02, 94.20],
          iconType: 'truck',
          color: '#10B981',
          size: 30,
          popupContent: (
            <div style={{ minWidth: '150px' }}>
              <strong style={{ fontSize: '13px', color: '#0F172A' }}>MN01IJ7890</strong>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Imphal → Ukhrul</div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 700, marginTop: '2px' }}>Speed: 52 km/h • On Route</div>
            </div>
          ),
        },
      ]
    : [];

  const incidentMarkers = layers.incidents
    ? [
        {
          id: 'inc-landslide',
          position: [26.08, 91.85],
          iconType: 'hazard',
          color: '#EF4444',
          size: 32,
          popupContent: (
            <div style={{ minWidth: '170px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#EF4444', fontWeight: 800, fontSize: '11px' }}>
                <AlertTriangle size={13} /> Landslide Reported
              </div>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '12px', marginTop: '3px' }}>NH-13A (Jorabat Section)</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Near Sonapur, Assam • 10:15 AM</div>
              <div style={{ color: '#EF4444', fontSize: '11px', fontWeight: 600, marginTop: '4px' }}>Traffic halted. Clearance in progress.</div>
            </div>
          ),
        },
        {
          id: 'inc-flood',
          position: [24.90, 92.55],
          iconType: 'flood',
          color: '#2563EB',
          size: 32,
          popupContent: (
            <div style={{ minWidth: '170px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#2563EB', fontWeight: 800, fontSize: '11px' }}>
                <Waves size={13} /> Flood Alert
              </div>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '12px', marginTop: '3px' }}>NH-27 (Near Badarpur)</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Assam Sector • 09:45 AM</div>
              <div style={{ color: '#2563EB', fontSize: '11px', fontWeight: 600, marginTop: '4px' }}>Water logging 1.5ft. Heavy trucks only.</div>
            </div>
          ),
        },
        {
          id: 'inc-blocked',
          position: [24.70, 93.15],
          iconType: 'alert',
          color: '#DC2626',
          size: 32,
          popupContent: (
            <div style={{ minWidth: '170px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#DC2626', fontWeight: 800, fontSize: '11px' }}>
                <Ban size={13} /> Route Blocked
              </div>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '12px', marginTop: '3px' }}>NH-37 (Jiribam)</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Manipur Border • 08:50 AM</div>
              <div style={{ color: '#DC2626', fontSize: '11px', fontWeight: 600, marginTop: '4px' }}>Bridge structural damage. Route closed.</div>
            </div>
          ),
        },
        {
          id: 'inc-heavyrain',
          position: [25.45, 91.65],
          iconType: 'hazard',
          color: '#D97706',
          size: 32,
          popupContent: (
            <div style={{ minWidth: '170px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#D97706', fontWeight: 800, fontSize: '11px' }}>
                <CloudRain size={13} /> Heavy Rainfall
              </div>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '12px', marginTop: '3px' }}>East Khasi Hills</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Meghalaya • 09:30 AM</div>
              <div style={{ color: '#D97706', fontSize: '11px', fontWeight: 600, marginTop: '4px' }}>Poor visibility. Speed advisory 30 km/h.</div>
            </div>
          ),
        },
      ]
    : [];

  const allMapMarkers = [...cityHubMarkers, ...vehicleMarkers, ...incidentMarkers];

  // Dynamic Leaflet Routes
  const trafficRoutes = layers.traffic
    ? [
        // Smooth Traffic (Green)
        {
          id: 'route-ghy-nag',
          name: 'NH-27: Guwahati to Nagaon (Smooth Flow)',
          coordinates: [[26.1445, 91.7362], [26.25, 92.20], [26.3452, 92.6840]],
          color: '#10B981',
          weight: 4,
          opacity: 0.85,
        },
        {
          id: 'route-nag-tez',
          name: 'NH-715: Nagaon to Tezpur (Smooth Flow)',
          coordinates: [[26.3452, 92.6840], [26.50, 92.75], [26.6528, 92.7926]],
          color: '#10B981',
          weight: 4,
          opacity: 0.85,
        },
        {
          id: 'route-tez-ita',
          name: 'NH-15: Tezpur to Itanagar (Smooth Flow)',
          coordinates: [[26.6528, 92.7926], [26.85, 93.20], [27.0844, 93.6053]],
          color: '#10B981',
          weight: 4,
          opacity: 0.85,
        },
        {
          id: 'route-ghy-shl',
          name: 'NH-6: Guwahati to Shillong (Smooth Flow)',
          coordinates: [[26.1445, 91.7362], [25.85, 91.82], [25.5788, 91.8933]],
          color: '#10B981',
          weight: 4,
          opacity: 0.85,
        },
        {
          id: 'route-koh-imp',
          name: 'NH-29: Kohima to Imphal (Smooth Flow)',
          coordinates: [[25.6751, 94.1086], [25.25, 94.02], [24.8170, 93.9368]],
          color: '#10B981',
          weight: 4,
          opacity: 0.85,
        },
        // Moderate Traffic (Yellow/Amber)
        {
          id: 'route-nag-dim',
          name: 'NH-29: Nagaon to Dimapur (Moderate Congestion)',
          coordinates: [[26.3452, 92.6840], [26.15, 93.20], [25.9094, 93.7266]],
          color: '#F59E0B',
          weight: 4,
          opacity: 0.85,
        },
        {
          id: 'route-dim-koh',
          name: 'NH-29: Dimapur to Kohima (Hill Climb - Moderate)',
          coordinates: [[25.9094, 93.7266], [25.79, 93.95], [25.6751, 94.1086]],
          color: '#F59E0B',
          weight: 4,
          opacity: 0.85,
        },
        // Heavy Traffic (Orange)
        {
          id: 'route-shl-sil',
          name: 'NH-6: Shillong to Silchar (Heavy Freight & Rain)',
          coordinates: [[25.5788, 91.8933], [25.20, 92.35], [24.8333, 92.7789]],
          color: '#F97316',
          weight: 4,
          opacity: 0.9,
        },
        {
          id: 'route-sil-aiz',
          name: 'NH-306: Silchar to Aizawl (Steep Gradients - Heavy)',
          coordinates: [[24.8333, 92.7789], [24.28, 92.75], [23.7271, 92.7176]],
          color: '#F97316',
          weight: 4,
          opacity: 0.9,
        },
        // Blocked Segments (Red Dashed)
        {
          id: 'route-block-jorabat',
          name: 'BLOCKED: NH-13A Jorabat Section (Landslide)',
          coordinates: [[26.12, 91.80], [26.06, 91.88]],
          color: '#EF4444',
          weight: 5,
          opacity: 1,
          dashArray: '6, 6',
        },
        {
          id: 'route-block-jiribam',
          name: 'BLOCKED: NH-37 Jiribam Bridge (Structural Failure)',
          coordinates: [[24.75, 93.10], [24.68, 93.20]],
          color: '#EF4444',
          weight: 5,
          opacity: 1,
          dashArray: '6, 6',
        },
        // Alternate Route (Blue Dashed)
        {
          id: 'route-alt-tura',
          name: 'AI Recommended Alternate: SH-6 via Goalpara to Tura',
          coordinates: [
            [26.1445, 91.7362],
            [26.1667, 90.6167],
            [25.80, 90.40],
            [25.5144, 90.2201],
          ],
          color: '#3B82F6',
          weight: 4,
          opacity: 0.9,
          dashArray: '8, 6',
        },
      ]
    : [];

  const districtPolygons = layers.districtBoundary
    ? [
        {
          id: 'district-kamrup',
          positions: [
            [26.35, 91.45],
            [26.38, 91.95],
            [26.10, 92.05],
            [25.95, 91.65],
            [26.05, 91.35],
          ],
          color: '#059669',
          fillColor: '#059669',
          fillOpacity: 0.12,
          weight: 2,
          popup: <div><strong>Kamrup Metropolitan District</strong><p style={{ fontSize: '11px', margin: 0 }}>Hub District • 98.4% Connectivity</p></div>,
        },
      ]
    : [];

  return (
    <div className="live-map-cockpit">
      {/* =========================================================================
          TOP KPI METRIC CARDS (6-Card Responsive Grid)
          ========================================================================= */}
      <div className="live-map-kpi-grid">
        {/* 1. Total Routes */}
        <div className="live-map-kpi-card">
          <div className="live-map-kpi-icon" style={{ backgroundColor: '#DCFCE7', color: '#059669' }}>
            <RouteIcon size={20} />
          </div>
          <div className="live-map-kpi-content">
            <div className="live-map-kpi-title">Total Routes</div>
            <div className="live-map-kpi-val-row">
              <span className="live-map-kpi-value">1,248</span>
              <span className="live-map-kpi-trend">↑ 12.5%</span>
            </div>
            <div className="live-map-kpi-sub">vs yesterday</div>
          </div>
        </div>

        {/* 2. Routes at Risk */}
        <div className="live-map-kpi-card">
          <div className="live-map-kpi-icon" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
            <AlertTriangle size={20} />
          </div>
          <div className="live-map-kpi-content">
            <div className="live-map-kpi-title">Routes at Risk</div>
            <div className="live-map-kpi-val-row">
              <span className="live-map-kpi-value">87</span>
              <span className="live-map-kpi-trend" style={{ color: '#D97706' }}>↑ 8.3%</span>
            </div>
            <div className="live-map-kpi-sub">vs yesterday</div>
          </div>
        </div>

        {/* 3. Blocked Routes */}
        <div className="live-map-kpi-card">
          <div className="live-map-kpi-icon" style={{ backgroundColor: '#FEE2E2', color: '#EF4444' }}>
            <Ban size={20} />
          </div>
          <div className="live-map-kpi-content">
            <div className="live-map-kpi-title">Blocked Routes</div>
            <div className="live-map-kpi-val-row">
              <span className="live-map-kpi-value">23</span>
              <span className="live-map-kpi-trend" style={{ color: '#EF4444' }}>↑ 15.2%</span>
            </div>
            <div className="live-map-kpi-sub">vs yesterday</div>
          </div>
        </div>

        {/* 4. Active Vehicles */}
        <div className="live-map-kpi-card">
          <div className="live-map-kpi-icon" style={{ backgroundColor: '#DBEAFE', color: '#2563EB' }}>
            <Truck size={20} />
          </div>
          <div className="live-map-kpi-content">
            <div className="live-map-kpi-title">Active Vehicles</div>
            <div className="live-map-kpi-val-row">
              <span className="live-map-kpi-value">312</span>
              <span className="live-map-kpi-trend">↑ 6.1%</span>
            </div>
            <div className="live-map-kpi-sub">vs yesterday</div>
          </div>
        </div>

        {/* 5. Deliveries in Transit */}
        <div className="live-map-kpi-card">
          <div className="live-map-kpi-icon" style={{ backgroundColor: '#F3E8FF', color: '#7C3AED' }}>
            <Package size={20} />
          </div>
          <div className="live-map-kpi-content">
            <div className="live-map-kpi-title">Deliveries in Transit</div>
            <div className="live-map-kpi-val-row">
              <span className="live-map-kpi-value">156</span>
              <span className="live-map-kpi-trend">↑ 9.4%</span>
            </div>
            <div className="live-map-kpi-sub">vs yesterday</div>
          </div>
        </div>

        {/* 6. Weather & Date Panel (Far Right) */}
        <div className="live-map-weather-card">
          <div className="weather-row">
            <Sun size={18} color="#F59E0B" />
            <span className="weather-temp">24°C</span>
            <span className="weather-location">Guwahati</span>
          </div>
          <div className="date-row">
            <Calendar size={14} color="var(--text-muted)" />
            <span>21 May 2025</span>
            <span style={{ color: 'var(--text-muted)' }}>• 10:30AM</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN INTERACTIVE GIS LEAFLET MAP VIEWPORT
          ========================================================================= */}
      <div className="gis-map-viewport">
        {/* Real Interactive Leaflet Map Component */}
        <AdminLeafletMap
          center={mapCenter}
          zoom={mapZoom}
          minZoom={6}
          maxZoom={16}
          height="100%"
          tileProvider="carto"
          markers={allMapMarkers}
          routes={trafficRoutes}
          polygons={districtPolygons}
          showTileSwitch={true}
          showControls={true}
        />

        {/* =====================================================================
            FLOATING LEFT PANELS (Map Layers, Legend, Weather Radar)
            ===================================================================== */}
        <div className="map-floating-overlay">
          {/* 1. Map Layers Panel */}
          <div className="map-floating-card">
            <div className="map-floating-card-header" onClick={() => setLayersOpen(!layersOpen)}>
              <span>Map Layers</span>
              <ChevronDown size={14} style={{ transform: layersOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
            </div>
            {layersOpen && (
              <div style={{ marginTop: '4px' }}>
                <label className="map-layer-item">
                  <input type="checkbox" checked={layers.traffic} onChange={() => toggleLayer('traffic')} />
                  <span>Live Traffic</span>
                </label>
                <label className="map-layer-item">
                  <input type="checkbox" checked={layers.vehicles} onChange={() => toggleLayer('vehicles')} />
                  <span>Active Vehicles</span>
                </label>
                <label className="map-layer-item">
                  <input type="checkbox" checked={layers.incidents} onChange={() => toggleLayer('incidents')} />
                  <span>Incidents</span>
                </label>
                <label className="map-layer-item">
                  <input type="checkbox" checked={layers.roadConditions} onChange={() => toggleLayer('roadConditions')} />
                  <span>Road Conditions</span>
                </label>
                <label className="map-layer-item">
                  <input type="checkbox" checked={layers.weatherRadar} onChange={() => toggleLayer('weatherRadar')} />
                  <span>Weather Radar</span>
                </label>
                <label className="map-layer-item">
                  <input type="checkbox" checked={layers.districtBoundary} onChange={() => toggleLayer('districtBoundary')} />
                  <span>District Boundary</span>
                </label>
              </div>
            )}
          </div>

          {/* 2. Map Legend Panel */}
          <div className="map-floating-card">
            <div className="map-floating-card-header" onClick={() => setLegendOpen(!legendOpen)}>
              <span>Legend</span>
              <ChevronDown size={14} style={{ transform: legendOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
            </div>
            {legendOpen && (
              <div style={{ marginTop: '6px' }}>
                <div className="map-legend-row">
                  <span className="map-legend-bar" style={{ backgroundColor: '#10B981' }} />
                  <span>Smooth Traffic</span>
                </div>
                <div className="map-legend-row">
                  <span className="map-legend-bar" style={{ backgroundColor: '#F59E0B' }} />
                  <span>Moderate Traffic</span>
                </div>
                <div className="map-legend-row">
                  <span className="map-legend-bar" style={{ backgroundColor: '#F97316' }} />
                  <span>Heavy Traffic</span>
                </div>
                <div className="map-legend-row">
                  <span className="map-legend-bar" style={{ backgroundColor: '#EF4444' }} />
                  <span>Blocked Route</span>
                </div>
                <div className="map-legend-row">
                  <span className="map-legend-bar" style={{ backgroundColor: '#3B82F6', borderTop: '2px dashed #3B82F6', height: '0px' }} />
                  <span>Alternate Route</span>
                </div>

                <div style={{ borderTop: '1px solid #E2E8F0', marginTop: '6px', paddingTop: '6px' }}>
                  <div className="map-legend-row">
                    <AlertTriangle size={12} color="#EF4444" />
                    <span>Landslide</span>
                  </div>
                  <div className="map-legend-row">
                    <Waves size={12} color="#2563EB" />
                    <span>Flood</span>
                  </div>
                  <div className="map-legend-row">
                    <CloudRain size={12} color="#F59E0B" />
                    <span>Heavy Rainfall</span>
                  </div>
                  <div className="map-legend-row">
                    <AlertOctagon size={12} color="#8B5CF6" />
                    <span>Accident</span>
                  </div>
                  <div className="map-legend-row">
                    <HardHat size={12} color="#F97316" />
                    <span>Construction</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Weather Radar Panel */}
          {layers.weatherRadar && (
            <div className="map-floating-card">
              <div className="map-floating-card-header" onClick={() => setWeatherRadarOpen(!weatherRadarOpen)}>
                <span>Weather Radar</span>
                <ChevronDown size={14} style={{ transform: weatherRadarOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
              </div>
              {weatherRadarOpen && (
                <div style={{ marginTop: '8px' }}>
                  {/* Color Gradient Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '9px', color: '#64748B', marginBottom: '3px' }}>
                    <span>Light</span>
                    <span>Heavy</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'linear-gradient(to right, #3B82F6, #10B981, #F59E0B, #EF4444)', marginBottom: '8px' }} />
                  
                  {/* Play & Timeline Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                    <button
                      onClick={() => setRadarPlaying(!radarPlaying)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        background: radarPlaying ? '#059669' : '#E2E8F0',
                        color: radarPlaying ? '#FFFFFF' : '#334155',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '10px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {radarPlaying ? <Pause size={10} /> : <Play size={10} />}
                      <span>Live</span>
                    </button>
                    {['09:00', '10:00', '11:00', '12:00'].map((time) => (
                      <span
                        key={time}
                        onClick={() => setRadarTime(time)}
                        style={{
                          fontSize: '9px',
                          cursor: 'pointer',
                          color: radarTime === time ? '#059669' : '#64748B',
                          fontWeight: radarTime === time ? 700 : 500,
                        }}
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Location Reset Button */}
        <div style={{ position: 'absolute', top: '16px', right: '60px', zIndex: 1000 }}>
          <button
            className="map-ctrl-btn"
            title="Center on Guwahati Logistics Hub"
            onClick={() => {
              setMapCenter([26.1445, 91.7362]);
              setMapZoom(9);
              toast.info('Centered on Regional Logistics Hub (Guwahati)');
            }}
          >
            <Navigation size={15} color="#2563EB" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM ANALYTICS SECTION (3-Column Layout: Vehicles, Route Comparison, Traffic Overview)
          ========================================================================= */}
      <div className="live-map-analytics-grid">
        {/* -----------------------------------------------------------------------
            1. ACTIVE VEHICLES (312)
            ----------------------------------------------------------------------- */}
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header" style={{ marginBottom: '10px', flexShrink: 0 }}>
            <div>
              <h3 className="card-title" style={{ margin: 0, fontSize: '15px' }}>Active Vehicles (312)</h3>
            </div>
            <a href="/admin/vehicle-tracking" className="card-link" style={{ fontSize: '11px' }}>View All</a>
          </div>

          {/* Tabs: Live Tracking / All Vehicles */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <button
              onClick={() => setActiveVehicleTab('live')}
              style={{
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 600,
                border: 'none',
                background: activeVehicleTab === 'live' ? '#DCFCE7' : '#F1F5F9',
                color: activeVehicleTab === 'live' ? '#059669' : '#64748B',
                cursor: 'pointer',
              }}
            >
              Live Tracking
            </button>
            <button
              onClick={() => setActiveVehicleTab('all')}
              style={{
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 600,
                border: 'none',
                background: activeVehicleTab === 'all' ? '#DCFCE7' : '#F1F5F9',
                color: activeVehicleTab === 'all' ? '#059669' : '#64748B',
                cursor: 'pointer',
              }}
            >
              All Vehicles
            </button>
          </div>

          {/* Vehicle List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            {activeVehiclesData.map((v) => (
              <div
                key={v.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#DBEAFE', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Truck size={14} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12px' }}>{v.id}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{v.route}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>{v.speed}</span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: v.status === 'On Route' ? '#DCFCE7' : v.status === 'Delayed' ? '#FEF3C7' : '#FEE2E2',
                      color: v.status === 'On Route' ? '#059669' : v.status === 'Delayed' ? '#D97706' : '#EF4444',
                    }}
                  >
                    {v.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            2. ROUTE COMPARISON (Smart Suggestions AI)
            ----------------------------------------------------------------------- */}
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header" style={{ marginBottom: '6px', flexShrink: 0 }}>
            <h3 className="card-title" style={{ margin: 0, fontSize: '15px' }}>Route Comparison</h3>
            <span style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Smart Suggestions (AI)</span>
          </div>

          <div className="route-option-cards-row" style={{ flex: 1 }}>
            {/* Card 1: Current Route (Affected) */}
            <div
              className={`route-option-box affected ${selectedRoute === 'affected' ? 'active' : ''}`}
              onClick={() => setSelectedRoute('affected')}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 700, color: '#EF4444' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <span>Current Route (Affected)</span>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Guwahati → Tura
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', fontSize: '10px', color: 'var(--text-muted)' }}>
                  <div>Distance<br /><strong style={{ color: 'var(--text-primary)', fontSize: '12px' }}>285 km</strong></div>
                  <div>Est. Time<br /><strong style={{ color: 'var(--text-primary)', fontSize: '12px' }}>7h 20m</strong></div>
                  <div>Status<br /><span style={{ color: '#EF4444', fontWeight: 700, fontSize: '11px' }}>● Blocked</span></div>
                </div>

                <div style={{ fontSize: '10px', color: '#64748B', lineHeight: '1.4', borderTop: '1px solid #FECACA', paddingTop: '6px' }}>
                  <div>• Landslide at Jorabat</div>
                  <div>• Bridge damaged at NH-37</div>
                  <div>• Not safe for travel</div>
                </div>
              </div>

              {/* Red Micro Elevation Wave */}
              <div style={{ marginTop: '8px' }}>
                <svg viewBox="0 0 100 20" style={{ width: '100%', height: '20px' }}>
                  <path d="M 0 15 Q 25 5 50 18 T 100 12" stroke="#EF4444" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>

            {/* Card 2: AI Recommended (Best Option) */}
            <div
              className={`route-option-box recommended ${selectedRoute === 'recommended' ? 'active' : ''}`}
              onClick={() => setSelectedRoute('recommended')}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 700, color: '#059669' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#059669' }} />
                    <span>AI Recommended</span>
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: 700, background: '#DCFCE7', color: '#059669', padding: '1px 5px', borderRadius: '4px' }}>
                    Best Option
                  </span>
                </div>

                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Via SH-6 → Goalpara
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', fontSize: '10px', color: 'var(--text-muted)' }}>
                  <div>Distance<br /><strong style={{ color: 'var(--text-primary)', fontSize: '12px' }}>312 km</strong></div>
                  <div>Est. Time<br /><strong style={{ color: 'var(--text-primary)', fontSize: '12px' }}>6h 45m</strong></div>
                  <div>Status<br /><span style={{ color: '#059669', fontWeight: 700, fontSize: '11px' }}>● Clear</span></div>
                </div>

                <div style={{ fontSize: '10px', color: '#047857', lineHeight: '1.4', borderTop: '1px solid #86EFAC', paddingTop: '6px' }}>
                  <div>• No major incidents</div>
                  <div>• Smooth traffic flow</div>
                  <div>• 12% faster ETA</div>
                  <div>• Road conditions good</div>
                </div>
              </div>

              {/* Green Micro Elevation Wave & Button */}
              <div style={{ marginTop: '8px' }}>
                <svg viewBox="0 0 100 20" style={{ width: '100%', height: '20px' }}>
                  <path d="M 0 12 Q 25 18 50 8 T 100 14" stroke="#10B981" strokeWidth="2" fill="none" />
                </svg>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success('Route Selected: Via SH-6 (Goalpara) assigned to active dispatch.');
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 0',
                    borderRadius: '6px',
                    backgroundColor: '#059669',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '6px',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  Use This Route
                </button>
              </div>
            </div>

            {/* Card 3: Alternate Route */}
            <div
              className={`route-option-box alternate ${selectedRoute === 'alternate' ? 'active' : ''}`}
              onClick={() => setSelectedRoute('alternate')}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 700, color: '#2563EB' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                  <span>Alternate Route</span>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Via NH-2 → Nongpoh
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', fontSize: '10px', color: 'var(--text-muted)' }}>
                  <div>Distance<br /><strong style={{ color: 'var(--text-primary)', fontSize: '12px' }}>325 km</strong></div>
                  <div>Est. Time<br /><strong style={{ color: 'var(--text-primary)', fontSize: '12px' }}>7h 10m</strong></div>
                  <div>Status<br /><span style={{ color: '#D97706', fontWeight: 700, fontSize: '11px' }}>● Moderate</span></div>
                </div>

                <div style={{ fontSize: '10px', color: '#1E40AF', lineHeight: '1.4', borderTop: '1px solid #BFDBFE', paddingTop: '6px' }}>
                  <div>• Minor congestion</div>
                  <div>• Slightly longer distance</div>
                  <div>• Light rain in mid section</div>
                </div>
              </div>

              {/* Blue Micro Elevation Wave & Button */}
              <div style={{ marginTop: '8px' }}>
                <svg viewBox="0 0 100 20" style={{ width: '100%', height: '20px' }}>
                  <path d="M 0 16 Q 35 6 70 14 T 100 10" stroke="#3B82F6" strokeWidth="2" fill="none" />
                </svg>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.info('Viewing Alternate Route (NH-2) on Live Map.');
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 0',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    color: '#2563EB',
                    border: '1px solid #BFDBFE',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '6px',
                  }}
                >
                  View on Map
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            3. TRAFFIC OVERVIEW (Donut Chart & Recent Incidents)
            ----------------------------------------------------------------------- */}
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header" style={{ marginBottom: '8px', flexShrink: 0 }}>
            <h3 className="card-title" style={{ margin: 0, fontSize: '15px' }}>Traffic Overview</h3>
            <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
              <a href="/admin/analytics" className="card-link">View Full Report</a>
              <a href="/admin/alerts" className="card-link">View All</a>
            </div>
          </div>

          {/* Donut Chart & Legend Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', gap: '16px' }}>
            {/* SVG Donut Chart */}
            <div style={{ position: 'relative', width: '105px', height: '105px', flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                {/* Background Ring */}
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#F1F5F9" strokeWidth="4.5" />
                {/* Smooth 53% */}
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#10B981" strokeWidth="4.5" strokeDasharray="46.6 88" strokeDashoffset="0" />
                {/* Moderate 28% */}
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#F59E0B" strokeWidth="4.5" strokeDasharray="24.6 88" strokeDashoffset="-46.6" />
                {/* Heavy 13% */}
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#EF4444" strokeWidth="4.5" strokeDasharray="11.4 88" strokeDashoffset="-71.2" />
                {/* Blocked 6% */}
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#7F1D1D" strokeWidth="4.5" strokeDasharray="5.4 88" strokeDashoffset="-82.6" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>243</span>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Total Routes</span>
              </div>
            </div>

            {/* Donut Breakdown Legend */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Smooth</span>
                </div>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>128 (53%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Moderate</span>
                </div>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>68 (28%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Heavy</span>
                </div>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>32 (13%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#7F1D1D' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Blocked</span>
                </div>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>15 (6%)</span>
              </div>
            </div>
          </div>

          {/* Recent Incidents Sub-list */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '8px', paddingTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>Recent Incidents</span>
              <a href="/admin/alerts" style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>View All</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={12} color="#EF4444" />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Landslide - NH-13A</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>(Jorabat, Assam)</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>10:15 AM</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Ban size={12} color="#DC2626" />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Road Block - NH-37</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>(Jiribam, Manipur)</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>08:50 AM</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Waves size={12} color="#2563EB" />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Flood - NH-27</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>(Badarpur, Assam)</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>09:45 AM</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CloudRain size={12} color="#D97706" />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Heavy Rain</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>(East Khasi Hills)</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>09:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM STATUS BAR
          ========================================================================= */}
      <div className="live-map-status-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.3)' }} />
            <span>Real-time data from 1,248 sensors</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3B82F6' }} />
            <span>Last updated: 30 sec ago</span>
          </div>
        </div>

        <div>
          <span>© 2025 NER LogiSmart. All rights reserved.</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
          <span>Powered by AI & GIS</span>
        </div>
      </div>
    </div>
  );
};
