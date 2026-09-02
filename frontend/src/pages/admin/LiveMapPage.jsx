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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState('recommended');

  // Popups visibility
  const [visiblePopups, setVisiblePopups] = useState({
    landslide: true,
    flood: true,
    blocked: true,
    heavyRain: true,
  });

  // Active vehicles tab
  const [activeVehicleTab, setActiveVehicleTab] = useState('live'); // 'live' | 'all'

  const toggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closePopup = (key) => {
    setVisiblePopups((prev) => ({ ...prev, [key]: false }));
  };

  const activeVehiclesData = [
    { id: 'AS01AB1234', route: 'Guwahati - Itanagar', speed: '65 km/h', status: 'On Route', statusClass: 'badge-success' },
    { id: 'AS02CD5678', route: 'Silchar - Aizawl', speed: '22 km/h', status: 'Delayed', statusClass: 'badge-warning' },
    { id: 'ML05EF9012', route: 'Shillong - Tura', speed: '48 km/h', status: 'On Route', statusClass: 'badge-success' },
    { id: 'NL01GH3456', route: 'Dimapur - Kohima', speed: '0 km/h', status: 'Stopped', statusClass: 'badge-danger' },
    { id: 'MN01IJ7890', route: 'Imphal - Ukhrul', speed: '52 km/h', status: 'On Route', statusClass: 'badge-success' },
  ];

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
          MAIN INTERACTIVE GIS MAP VIEWPORT
          ========================================================================= */}
      <div className={`gis-map-viewport ${isFullscreen ? 'fullscreen' : ''}`}>
        {/* Map Satellite Image Layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/assets/maps/northeast_satellite.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.2s ease-out',
          }}
        />

        {/* Atmospheric Contrast Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.40)',
            pointerEvents: 'none',
          }}
        />

        {/* High-Resolution SVG Route Network */}
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {layers.traffic && (
            <>
              {/* Route Artery 1: Guwahati to Nagaon (Smooth - Green) */}
              <path d="M 520 345 Q 560 350 620 355" stroke="#10B981" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              
              {/* Route Artery 2: Nagaon to Tezpur (Smooth - Green) */}
              <path d="M 620 355 Q 640 310 660 270" stroke="#10B981" strokeWidth="3.5" fill="none" strokeLinecap="round" />

              {/* Route Artery 3: Tezpur to Itanagar (Smooth - Green) */}
              <path d="M 660 270 Q 720 230 780 200" stroke="#10B981" strokeWidth="3.5" fill="none" strokeLinecap="round" />

              {/* Route Artery 4: Nagaon to Dimapur (Moderate - Yellow) */}
              <path d="M 620 355 Q 700 370 760 385" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />

              {/* Route Artery 5: Dimapur to Kohima (Moderate - Yellow) */}
              <path d="M 760 385 Q 770 420 780 460" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />

              {/* Route Artery 6: Kohima to Imphal (Smooth - Green) */}
              <path d="M 780 460 Q 770 510 760 550" stroke="#10B981" strokeWidth="3.5" fill="none" strokeLinecap="round" />

              {/* Route Artery 7: Guwahati to Shillong (Smooth - Green) */}
              <path d="M 520 345 Q 490 410 440 470" stroke="#10B981" strokeWidth="3.5" fill="none" strokeLinecap="round" />

              {/* Route Artery 8: Shillong to Silchar (Heavy - Orange) */}
              <path d="M 440 470 Q 510 500 560 515" stroke="#F97316" strokeWidth="3.5" fill="none" strokeLinecap="round" />

              {/* Route Artery 9: Silchar to Aizawl (Heavy - Orange) */}
              <path d="M 560 515 Q 565 560 570 600" stroke="#F97316" strokeWidth="3.5" fill="none" strokeLinecap="round" />

              {/* Blocked Segment 1: NH-13A Jorabat Section near Sonapur (Blocked - Red) */}
              <path d="M 430 240 Q 450 250 480 270" stroke="#EF4444" strokeWidth="4.5" fill="none" strokeDasharray="6 4" strokeLinecap="round" />

              {/* Blocked Segment 2: NH-37 Jiribam Bridge Damaged (Blocked - Red) */}
              <path d="M 670 340 Q 690 380 630 460" stroke="#EF4444" strokeWidth="4.5" fill="none" strokeLinecap="round" />

              {/* Alternate Route: Via SH-6 -> Goalpara -> Tura (Blue Dashed) */}
              <path d="M 520 345 Q 500 380 460 530" stroke="#3B82F6" strokeWidth="3" strokeDasharray="6 6" fill="none" strokeLinecap="round" />
            </>
          )}
        </svg>

        {/* Region Labels */}
        <div style={{ position: 'absolute', top: '16%', left: '33%', color: 'rgba(255,255,255,0.75)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', pointerEvents: 'none' }}>BHUTAN</div>
        <div style={{ position: 'absolute', top: '14%', left: '55%', color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', pointerEvents: 'none' }}>ARUNACHAL PRADESH</div>
        <div style={{ position: 'absolute', top: '32%', left: '38%', color: 'rgba(255,255,255,0.95)', fontSize: '13px', fontWeight: 800, letterSpacing: '0.06em', pointerEvents: 'none' }}>ASSAM</div>
        <div style={{ position: 'absolute', top: '41%', left: '34%', color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', pointerEvents: 'none' }}>MEGHALAYA</div>
        <div style={{ position: 'absolute', top: '38%', left: '80%', color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', pointerEvents: 'none' }}>NAGALAND</div>
        <div style={{ position: 'absolute', top: '61%', left: '68%', color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', pointerEvents: 'none' }}>MIZORAM</div>
        <div style={{ position: 'absolute', top: '61%', left: '41%', color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', pointerEvents: 'none' }}>TRIPURA</div>

        {/* Cities & Hub Nodes */}
        {/* Guwahati Hub */}
        <div style={{ position: 'absolute', top: '34%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFFFFF', padding: '3px 8px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563EB', boxShadow: '0 0 0 3px rgba(37,99,235,0.3)' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A' }}>Guwahati</span>
          </div>
        </div>

        {/* Other City Nodes */}
        <div style={{ position: 'absolute', top: '47%', left: '42%', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, textShadow: '0 1px 3px #000' }}>Shillong</div>
        <div style={{ position: 'absolute', top: '35%', left: '59%', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, textShadow: '0 1px 3px #000' }}>Nagaon</div>
        <div style={{ position: 'absolute', top: '38%', left: '76%', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, textShadow: '0 1px 3px #000' }}>Dimapur</div>
        <div style={{ position: 'absolute', top: '20%', left: '74%', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, textShadow: '0 1px 3px #000' }}>Itanagar</div>
        <div style={{ position: 'absolute', top: '60%', left: '55%', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, textShadow: '0 1px 3px #000' }}>Aizawl</div>
        <div style={{ position: 'absolute', top: '51%', left: '54%', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, textShadow: '0 1px 3px #000' }}>Silchar</div>

        {/* Blocked Road Badges on Map */}
        <div style={{ position: 'absolute', top: '34%', left: '67%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#EF4444', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.4)', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>
            ⊖
          </div>
        </div>
        <div style={{ position: 'absolute', top: '47%', left: '60%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#EF4444', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.4)', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>
            ⊖
          </div>
        </div>

        {/* Live Active Vehicle Markers on Map */}
        {layers.vehicles && (
          <>
            <div style={{ position: 'absolute', top: '26%', left: '66%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#10B981', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', color: '#fff' }}>
                <Truck size={11} />
              </div>
            </div>
            <div style={{ position: 'absolute', top: '22%', left: '71%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#10B981', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', color: '#fff' }}>
                <Truck size={11} />
              </div>
            </div>
            <div style={{ position: 'absolute', top: '32%', left: '52%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#3B82F6', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', color: '#fff' }}>
                <Truck size={11} />
              </div>
            </div>
            <div style={{ position: 'absolute', top: '51%', left: '64%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#3B82F6', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', color: '#fff' }}>
                <Truck size={11} />
              </div>
            </div>
            <div style={{ position: 'absolute', top: '61%', left: '58%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#10B981', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', color: '#fff' }}>
                <Truck size={11} />
              </div>
            </div>
          </>
        )}

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
                    <Waves size={12} color="#3B82F6" />
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

        {/* =====================================================================
            FLOATING INCIDENT ALERT POPUPS ON MAP (4 Reference Cards)
            ===================================================================== */}
        {layers.incidents && (
          <>
            {/* Popup 1: Landslide Reported */}
            {visiblePopups.landslide && (
              <div className="map-incident-popup" style={{ top: '18%', left: '39%' }}>
                <div className="map-incident-header">
                  <div className="map-incident-badge" style={{ color: '#EF4444' }}>
                    <AlertTriangle size={12} color="#EF4444" />
                    <span>Landslide Reported</span>
                  </div>
                  <button onClick={() => closePopup('landslide')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                    <X size={13} />
                  </button>
                </div>
                <div className="map-incident-title">NH-13A (Jorabat Section)</div>
                <div className="map-incident-desc">Near Sonapur, Assam</div>
                <div className="map-incident-time">10:15 AM</div>
                <img src="/assets/field-reports/landslide.jpg" alt="Landslide" className="map-incident-thumb" />
              </div>
            )}

            {/* Popup 2: Flood Alert */}
            {visiblePopups.flood && (
              <div className="map-incident-popup" style={{ top: '20%', left: '80%' }}>
                <div className="map-incident-header">
                  <div className="map-incident-badge" style={{ color: '#2563EB' }}>
                    <Waves size={12} color="#2563EB" />
                    <span>Flood Alert</span>
                  </div>
                  <button onClick={() => closePopup('flood')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                    <X size={13} />
                  </button>
                </div>
                <div className="map-incident-title">NH-27 (Near Badarpur)</div>
                <div className="map-incident-desc">Assam</div>
                <div className="map-incident-time">09:45AM</div>
                <img src="/assets/field-reports/waterlogged.jpg" alt="Flood" className="map-incident-thumb" />
              </div>
            )}

            {/* Popup 3: Route Blocked */}
            {visiblePopups.blocked && (
              <div className="map-incident-popup" style={{ top: '46%', left: '45%' }}>
                <div className="map-incident-header">
                  <div className="map-incident-badge" style={{ color: '#DC2626' }}>
                    <Ban size={12} color="#DC2626" />
                    <span>Route Blocked</span>
                  </div>
                  <button onClick={() => closePopup('blocked')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                    <X size={13} />
                  </button>
                </div>
                <div className="map-incident-title">NH-37 (Jiribam)</div>
                <div className="map-incident-desc">Bridge damaged • Route closed</div>
                <div className="map-incident-time">08:50 AM</div>
                <img src="/assets/field-reports/bridge_damage.jpg" alt="Bridge Damage" className="map-incident-thumb" />
              </div>
            )}

            {/* Popup 4: Heavy Rainfall */}
            {visiblePopups.heavyRain && (
              <div className="map-incident-popup" style={{ top: '46%', left: '70%' }}>
                <div className="map-incident-header">
                  <div className="map-incident-badge" style={{ color: '#D97706' }}>
                    <CloudRain size={12} color="#D97706" />
                    <span>Heavy Rainfall</span>
                  </div>
                  <button onClick={() => closePopup('heavyRain')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                    <X size={13} />
                  </button>
                </div>
                <div className="map-incident-title">East Khasi Hills</div>
                <div className="map-incident-desc">Meghalaya</div>
                <div className="map-incident-time">09:30AM</div>
                <img src="/assets/field-reports/traffic.jpg" alt="Rainfall" className="map-incident-thumb" />
              </div>
            )}
          </>
        )}

        {/* =====================================================================
            FLOATING CONTROLS ON RIGHT (Compass, Zoom, Location, Layers, Fullscreen)
            ===================================================================== */}
        <div className="map-floating-controls-right">
          {/* Compass with Red Pointer */}
          <button className="map-ctrl-btn" title="Compass (North)" onClick={() => setZoomLevel(1)}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Compass size={18} color="#059669" />
              <span style={{ position: 'absolute', top: '-6px', fontSize: '9px', fontWeight: 800, color: '#EF4444' }}>N</span>
            </div>
          </button>
        </div>

        <div className="map-floating-controls-bottom-right">
          {/* Zoom In */}
          <button className="map-ctrl-btn" title="Zoom In" onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}>
            <Plus size={16} />
          </button>

          {/* Zoom Out */}
          <button className="map-ctrl-btn" title="Zoom Out" onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}>
            <Minus size={16} />
          </button>

          {/* Current Location */}
          <button className="map-ctrl-btn" title="Center on Guwahati Hub" onClick={() => { setZoomLevel(1); toast.info('Centered on Regional Logistics Hub (Guwahati)'); }}>
            <Navigation size={15} color="#2563EB" />
          </button>

          {/* Map Layer Switcher */}
          <button className="map-ctrl-btn" title="Toggle Layers" onClick={() => setLayersOpen(!layersOpen)}>
            <Layers size={15} color="#059669" />
          </button>

          {/* Fullscreen Toggle */}
          <button className="map-ctrl-btn" title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'} onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
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
