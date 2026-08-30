import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  AlertTriangle,
  CloudRain,
  Navigation,
  Pause,
  Play,
  Truck,
} from "lucide-react";

export const NORTHEAST_HUBS = [
  { name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, type: "hub", status: "clear", elevation: "55m" },
  { name: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8933, type: "hub", status: "risk", elevation: "1,525m" },
  { name: "Tezpur", state: "Assam", lat: 26.6528, lng: 92.7926, type: "hub", status: "clear", elevation: "48m" },
  { name: "Nagaon", state: "Assam", lat: 26.3452, lng: 92.6841, type: "checkpoint", status: "clear", elevation: "60m" },
  { name: "Jorhat", state: "Assam", lat: 26.7509, lng: 94.2037, type: "terminal", status: "clear", elevation: "116m" },
  { name: "Dibrugarh", state: "Assam", lat: 27.4728, lng: 94.912, type: "hub", status: "clear", elevation: "108m" },
  { name: "Dimapur", state: "Nagaland", lat: 25.909, lng: 93.7266, type: "hub", status: "clear", elevation: "145m" },
  { name: "Kohima", state: "Nagaland", lat: 25.6751, lng: 94.1086, type: "checkpoint", status: "blocked", elevation: "1,444m" },
  { name: "Imphal", state: "Manipur", lat: 24.817, lng: 93.9368, type: "terminal", status: "blocked", elevation: "786m" },
  { name: "Silchar", state: "Assam", lat: 24.8333, lng: 92.7789, type: "hub", status: "risk", elevation: "22m" },
  { name: "Agartala", state: "Tripura", lat: 23.8315, lng: 91.2868, type: "terminal", status: "clear", elevation: "15m" },
  { name: "Itanagar", state: "Arunachal Pradesh", lat: 27.0844, lng: 93.6053, type: "terminal", status: "clear", elevation: "320m" },
];

export const NORTHEAST_CORRIDORS = [
  {
    id: "nh-27-east",
    name: "Brahmaputra East-West Expressway",
    highway: "AH1 / NH-27 / NH-37",
    from: "Guwahati",
    to: "Dibrugarh",
    status: "clear",
    statusText: "CLEAR · OPTIMAL FLOW",
    distance: "445 KM",
    travelTime: "7h 30m",
    avgSpeed: "64 km/h",
    riskScore: 12,
    activeVehicles: 74,
    weather: "Sunny & Clear",
    visibility: "99%",
    coordinates: [
      [26.1445, 91.7362],
      [26.22, 92.15],
      [26.3452, 92.6841],
      [26.55, 93.12],
      [26.65, 93.65],
      [26.7509, 94.2037],
      [27.02, 94.55],
      [27.4728, 94.912],
    ],
  },
  {
    id: "nh-15-west",
    name: "Lower Assam Supply Link",
    highway: "NH-27 / NH-15",
    from: "Guwahati",
    to: "Bongaigaon",
    status: "clear",
    statusText: "CLEAR · NORMAL TRAFFIC",
    distance: "165 KM",
    travelTime: "3h 15m",
    avgSpeed: "58 km/h",
    riskScore: 15,
    activeVehicles: 36,
    weather: "Clear Sky",
    visibility: "98%",
    coordinates: [
      [26.1445, 91.7362],
      [26.35, 91.4],
      [26.4435, 91.4398],
      [26.3211, 91.0062],
      [26.48, 90.5584],
    ],
  },
  {
    id: "nh-40-shillong",
    name: "Meghalaya Plateau Ridge",
    highway: "NH-40 / NH-6",
    from: "Guwahati",
    to: "Shillong",
    status: "risk",
    statusText: "AT RISK · MONSOON RAIN & FOG",
    distance: "102 KM",
    travelTime: "2h 55m (+40m Delay)",
    avgSpeed: "36 km/h",
    riskScore: 58,
    activeVehicles: 42,
    weather: "Heavy Rain & Dense Mist",
    visibility: "54%",
    incident: "Caution: Heavy mountain fog & wet asphalt slippage on GS Road Nongpoh Ghat. Speed limited to 35 km/h.",
    coordinates: [
      [26.1445, 91.7362],
      [26.02, 91.82],
      [25.9037, 91.8797],
      [25.72, 91.91],
      [25.5788, 91.8933],
    ],
  },
  {
    id: "nh-29-naga-manipur",
    name: "Naga-Manipur Arterial Pass",
    highway: "NH-2 / NH-29",
    from: "Dimapur",
    to: "Imphal",
    status: "blocked",
    statusText: "DISRUPTED · ACTIVE LANDSLIDE",
    distance: "215 KM",
    travelTime: "BLOCKED (+4h 30m Delay)",
    avgSpeed: "0 km/h (Halted)",
    riskScore: 96,
    activeVehicles: 28,
    weather: "Torrential Downpour",
    visibility: "30%",
    incident: "CRITICAL: Major mudslide & rockfall across 120m roadway at Piphema Ghat (KM 42 between Dimapur & Kohima). Road completely blocked.",
    detourAdvice: "Freight diverted via Southern Foothills link / Silchar-Imphal arterial corridor.",
    coordinates: [
      [26.3452, 92.6841],
      [26.15, 93.35],
      [25.909, 93.7266],
      [25.7512, 93.8821],
      [25.6751, 94.1086],
      [25.25, 94.02],
      [24.817, 93.9368],
    ],
  },
  {
    id: "nh-6-silchar",
    name: "Barak Valley & Tripura Lifeline",
    highway: "NH-6 / NH-8",
    from: "Shillong",
    to: "Agartala",
    status: "risk",
    statusText: "CONGESTION · ALTERNATE FLOW",
    distance: "385 KM",
    travelTime: "9h 10m",
    avgSpeed: "42 km/h",
    riskScore: 52,
    activeVehicles: 58,
    weather: "Moderate Rain & Mist",
    visibility: "70%",
    incident: "Heavy freight volume absorbing diverted Manipur logistics. Expect slow hill transit near Jowai-Sonapur tunnel.",
    coordinates: [
      [25.5788, 91.8933],
      [25.4485, 92.2033],
      [25.12, 92.45],
      [24.8333, 92.7789],
      [24.45, 92.35],
      [24.15, 91.85],
      [23.8315, 91.2868],
    ],
  },
  {
    id: "nh-13-arunachal",
    name: "Arunachal Frontier Gateway",
    highway: "NH-13 / NH-415",
    from: "Tezpur",
    to: "Itanagar",
    status: "clear",
    statusText: "CLEAR · MONITORED RIDGE",
    distance: "155 KM",
    travelTime: "3h 40m",
    avgSpeed: "48 km/h",
    riskScore: 22,
    activeVehicles: 24,
    weather: "Partly Cloudy",
    visibility: "95%",
    coordinates: [
      [26.6528, 92.7926],
      [26.85, 93.25],
      [27.1089, 93.8182],
      [27.0844, 93.6053],
    ],
  },
];

export function NortheastMap({
  className = "",
  selectedFilter = "all",
  onFilterChange,
  onSelectCorridor,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const polylinesRef = useRef({});
  const truckMarkersRef = useRef({});

  const [activeCorridor, setActiveCorridor] = useState(NORTHEAST_CORRIDORS[0]);
  const [currentFilter, setCurrentFilter] = useState(selectedFilter);
  const [tileLayerType, setTileLayerType] = useState("voyager");
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    if (selectedFilter !== currentFilter) {
      setCurrentFilter(selectedFilter);
    }
  }, [selectedFilter]);

  useEffect(() => {
    if (onSelectCorridor) {
      onSelectCorridor(activeCorridor);
    }
  }, [activeCorridor, onSelectCorridor]);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [26.15, 93.1],
      zoom: 7.4,
      minZoom: 6.5,
      maxZoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const tileUrls = {
      voyager: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      positron: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    };

    const tileLayer = L.tileLayer(tileUrls.voyager, {
      maxZoom: 18,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: "abc",
    }).addTo(map);

    map._currentTileLayer = tileLayer;

    NORTHEAST_HUBS.forEach((hub) => {
      const isBlocked = hub.status === "blocked";
      const isRisk = hub.status === "risk";
      const color = isBlocked ? "#ef4444" : isRisk ? "#f59e0b" : "#087f4d";
      const bg = isBlocked ? "#fef2f2" : isRisk ? "#fffbeb" : "#ecfdf5";

      const iconHtml = `
        <div class="hub-leaflet-marker" style="--hub-color: ${color}; --hub-bg: ${bg}">
          <span class="hub-pulse"></span>
          <span class="hub-dot"></span>
          <span class="hub-label">${hub.name}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: "custom-hub-icon",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div class="p-2 min-w-[160px]">
          <div class="font-bold text-sm text-slate-900">${hub.name} (${hub.state})</div>
          <div class="text-xs text-slate-500 mt-0.5">Elevation: ${hub.elevation} · ${hub.type.toUpperCase()}</div>
          <div class="mt-2 text-xs font-semibold px-2 py-0.5 rounded-full inline-block ${
            isBlocked ? "bg-red-100 text-red-700" : isRisk ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
          }">
            Status: ${hub.status.toUpperCase()}
          </div>
        </div>
      `);
    });

    const hazardIconHtml = `
      <div class="hazard-leaflet-marker">
        <span class="hazard-pulse-ring"></span>
        <div class="hazard-core-badge">⚠️</div>
        <span class="hazard-label">Piphema Mudslide (KM 42)</span>
      </div>
    `;

    const hazardIcon = L.divIcon({
      html: hazardIconHtml,
      className: "custom-hazard-icon",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    const hazardMarker = L.marker([25.7512, 93.8821], { icon: hazardIcon }).addTo(map);
    hazardMarker.bindPopup(`
      <div class="p-2 min-w-[200px]">
        <div class="font-black text-sm text-red-600 flex items-center gap-1.5">
          <span>⚠️</span> LANDSLIDE BLOCKAGE
        </div>
        <div class="text-xs text-slate-700 font-medium mt-1">
          NH-29 Piphema Ghat · 120m Roadway Mudslide
        </div>
        <div class="text-[11px] text-slate-500 mt-1 bg-red-50 border border-red-200 p-1.5 rounded">
          Road closed for heavy commercial vehicles. Diverting via Barak Valley / Silchar arterial.
        </div>
      </div>
    `);

    NORTHEAST_CORRIDORS.forEach((corridor) => {
      const isBlocked = corridor.status === "blocked";
      const isRisk = corridor.status === "risk";
      const color = isBlocked ? "#ef4444" : isRisk ? "#f59e0b" : "#10b981";

      const glowLine = L.polyline(corridor.coordinates, {
        color: color,
        weight: 9,
        opacity: 0.35,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      const mainLine = L.polyline(corridor.coordinates, {
        color: color,
        weight: 4,
        opacity: 0.95,
        dashArray: isBlocked ? "6, 8" : undefined,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      polylinesRef.current[corridor.id] = [glowLine, mainLine];

      [glowLine, mainLine].forEach((line) => {
        line.on("click", () => {
          setActiveCorridor(corridor);
          map.fitBounds(mainLine.getBounds(), { padding: [40, 40], maxZoom: 9 });
        });
        line.on("mouseover", () => {
          mainLine.setStyle({ weight: 6 });
        });
        line.on("mouseout", () => {
          mainLine.setStyle({ weight: 4 });
        });
      });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const tileUrls = {
      voyager: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      positron: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    };

    if (map._currentTileLayer) {
      map.removeLayer(map._currentTileLayer);
    }

    const newLayer = L.tileLayer(tileUrls[tileLayerType], {
      maxZoom: 18,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: "abc",
    }).addTo(map);

    map._currentTileLayer = newLayer;
  }, [tileLayerType]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    NORTHEAST_CORRIDORS.forEach((corridor) => {
      const lines = polylinesRef.current[corridor.id];
      if (!lines) return;

      const isVisible = currentFilter === "all" || corridor.status === currentFilter;
      lines.forEach((line) => {
        if (isVisible) {
          if (!map.hasLayer(line)) map.addLayer(line);
        } else {
          if (map.hasLayer(line)) map.removeLayer(line);
        }
      });
    });
  }, [currentFilter]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isSimulating) return;

    const trucks = [
      { id: "TRK-084", corridorId: "nh-27-east", speed: 0.0003, progress: 0.15, label: "TRK-084 (Essential Meds)" },
      { id: "TRK-241", corridorId: "nh-27-east", speed: 0.00025, progress: 0.6, label: "TRK-241 (Food Grains)" },
      { id: "TRK-119", corridorId: "nh-15-west", speed: 0.0004, progress: 0.35, label: "TRK-119 (Industrial Cargo)" },
      { id: "TRK-302", corridorId: "nh-40-shillong", speed: 0.0002, progress: 0.45, label: "TRK-302 (FMCG Logistics)" },
      { id: "TRK-552", corridorId: "nh-6-silchar", speed: 0.00022, progress: 0.3, label: "TRK-552 (Petroleum Supply)" },
    ];

    trucks.forEach((t) => {
      if (!truckMarkersRef.current[t.id]) {
        const truckIconHtml = `
          <div class="truck-leaflet-marker">
            <span class="truck-radar"></span>
            <div class="truck-icon-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="text-white">
                <path d="M10 17h4V5H2v12h3m9 0h2l3-3v-4h-5v7m-7 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0m10 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/>
              </svg>
              <span>${t.id}</span>
            </div>
          </div>
        `;

        const truckIcon = L.divIcon({
          html: truckIconHtml,
          className: "custom-truck-icon",
          iconSize: [40, 24],
          iconAnchor: [20, 12],
        });

        const m = L.marker([26.1445, 91.7362], { icon: truckIcon }).addTo(map);
        m.bindPopup(`<div class="font-bold text-xs p-1">${t.label} · Telemetry Active</div>`);
        truckMarkersRef.current[t.id] = m;
      }
    });

    let lastTime = performance.now();
    let animId = 0;

    const animate = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      trucks.forEach((t) => {
        const corridor = NORTHEAST_CORRIDORS.find((c) => c.id === t.corridorId);
        const marker = truckMarkersRef.current[t.id];
        if (!corridor || !marker) return;

        t.progress = (t.progress + t.speed * (delta / 16)) % 1;
        const coords = corridor.coordinates;
        const totalSegments = coords.length - 1;
        const segIdx = Math.min(totalSegments - 1, Math.floor(t.progress * totalSegments));
        const segProg = t.progress * totalSegments - segIdx;

        const p1 = coords[segIdx];
        const p2 = coords[segIdx + 1] || p1;

        const lat = p1[0] + (p2[0] - p1[0]) * segProg;
        const lng = p1[1] + (p2[1] - p1[1]) * segProg;

        marker.setLatLng([lat, lng]);
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isSimulating]);

  const handleFilterSelect = (filter) => {
    setCurrentFilter(filter);
    if (onFilterChange) onFilterChange(filter);

    if (filter === "clear") {
      const c = NORTHEAST_CORRIDORS.find((x) => x.id === "nh-27-east");
      if (c) setActiveCorridor(c);
    } else if (filter === "risk") {
      const c = NORTHEAST_CORRIDORS.find((x) => x.id === "nh-40-shillong");
      if (c) setActiveCorridor(c);
    } else if (filter === "blocked") {
      const c = NORTHEAST_CORRIDORS.find((x) => x.id === "nh-29-naga-manipur");
      if (c) setActiveCorridor(c);
    }
  };

  return (
    <div className={`leaflet-map-wrapper rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-900 ${className}`}>
      {/* Top Map Control Bar */}
      <div className="map-top-bar flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white z-10 relative">
        {/* Left: Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => handleFilterSelect("all")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentFilter === "all"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-800/90 text-slate-300 hover:bg-slate-700"
            }`}
          >
            All Corridors (6)
          </button>
          <button
            type="button"
            onClick={() => handleFilterSelect("clear")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentFilter === "clear"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "bg-slate-800/90 text-emerald-400 hover:bg-slate-700"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Clear (3)
          </button>
          <button
            type="button"
            onClick={() => handleFilterSelect("risk")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentFilter === "risk"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                : "bg-slate-800/90 text-amber-400 hover:bg-slate-700"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            At Risk (2)
          </button>
          <button
            type="button"
            onClick={() => handleFilterSelect("blocked")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentFilter === "blocked"
                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                : "bg-slate-800/90 text-red-400 hover:bg-slate-700"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            Blocked (1)
          </button>
        </div>

        {/* Right: Map Layers & Simulation Controls */}
        <div className="flex items-center gap-2">
          {/* Layer Selector */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setTileLayerType("voyager")}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                tileLayerType === "voyager" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Tactical
            </button>
            <button
              type="button"
              onClick={() => setTileLayerType("satellite")}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                tileLayerType === "satellite" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Satellite
            </button>
            <button
              type="button"
              onClick={() => setTileLayerType("positron")}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                tileLayerType === "positron" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Light
            </button>
          </div>

          {/* Simulation Toggle */}
          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isSimulating ? "Pause Simulation" : "Resume Simulation"}
          >
            {isSimulating ? <Pause size={15} /> : <Play size={15} />}
          </button>
        </div>
      </div>

      {/* Main Map & Inspector Deck */}
      <div className="relative w-full h-[580px]">
        {/* Leaflet Map Target */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Corridor Telemetry Inspector Card */}
        {activeCorridor && (
          <div className="absolute top-4 left-4 z-10 max-w-sm w-[calc(100%-2rem)] md:w-[360px] bg-slate-950/92 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-4 text-white shadow-2xl transition-all">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      activeCorridor.status === "blocked"
                        ? "bg-red-500 animate-ping"
                        : activeCorridor.status === "risk"
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                    }`}
                  />
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-slate-400">
                    {activeCorridor.highway}
                  </span>
                </div>
                <h3 className="font-bold text-base text-white mt-0.5 leading-snug">
                  {activeCorridor.name}
                </h3>
              </div>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  activeCorridor.status === "blocked"
                    ? "bg-red-950 text-red-300 border border-red-700"
                    : activeCorridor.status === "risk"
                    ? "bg-amber-950 text-amber-300 border border-amber-700"
                    : "bg-emerald-950 text-emerald-300 border border-emerald-700"
                }`}
              >
                {activeCorridor.status}
              </span>
            </div>

            {/* Incident Alert Banner */}
            {activeCorridor.incident && (
              <div className="mt-2 mb-3 p-2.5 bg-red-950/80 border border-red-500/40 rounded-xl text-xs text-red-200 flex items-start gap-2">
                <AlertTriangle size={15} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-red-300">Active Alert</div>
                  <div className="text-[11px] leading-relaxed text-red-200/90 mt-0.5">
                    {activeCorridor.incident}
                  </div>
                </div>
              </div>
            )}

            {/* Metrics 4-grid */}
            <div className="grid grid-cols-2 gap-2 my-3">
              <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Distance / ETA</span>
                <div className="font-bold text-sm text-slate-100 mt-0.5">
                  {activeCorridor.distance} · {activeCorridor.travelTime}
                </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Avg Flow Speed</span>
                <div className="font-bold text-sm text-slate-100 mt-0.5">
                  {activeCorridor.avgSpeed}
                </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Weather Condition</span>
                <div className="font-bold text-sm text-slate-100 mt-0.5 flex items-center gap-1.5">
                  <CloudRain size={13} className="text-blue-400" />
                  <span className="truncate">{activeCorridor.weather}</span>
                </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Live Freight Count</span>
                <div className="font-bold text-sm text-emerald-400 mt-0.5 flex items-center gap-1.5">
                  <Truck size={13} />
                  <span>{activeCorridor.activeVehicles} Vehicles Active</span>
                </div>
              </div>
            </div>

            {/* Detour Recommendation */}
            {activeCorridor.detourAdvice && (
              <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-xs text-emerald-200 flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <Navigation size={14} className="text-emerald-400 shrink-0" />
                  <span className="text-[11px]">{activeCorridor.detourAdvice}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Legend */}
        <div className="absolute bottom-4 left-4 z-10 hidden md:flex items-center gap-3 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Optimal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Terrain/Rain Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span>Landslide Blockage</span>
          </div>
          <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-slate-800">
            <span className="text-emerald-400">●</span>
            <span>Live GPS Telemetry</span>
          </div>
        </div>
      </div>
    </div>
  );
}
