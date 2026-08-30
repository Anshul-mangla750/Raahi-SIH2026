import React, { useState } from 'react';
import {
  MapPin,
  Layers,
  ShieldAlert,
  Truck,
  CloudRain,
  Radio,
  Filter,
  Navigation,
  Compass,
} from 'lucide-react';
import { LiveAccessibilityMap } from '@/components/admin/dashboard/LiveAccessibilityMap';

export const LiveMapPage = () => {
  const [showVehicles, setShowVehicles] = useState(true);
  const [showHazards, setShowHazards] = useState(true);
  const [showWeather, setShowWeather] = useState(true);
  const [activeState, setActiveState] = useState('All');

  return (
    <div className="live-map-page" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Filter & Layer Bar */}
      <div
        className="card"
        style={{
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="#059669" />
            <strong style={{ fontSize: '15px' }}>Northeast GIS Accessibility Cockpit</strong>
          </div>

          <select
            value={activeState}
            onChange={(e) => setActiveState(e.target.value)}
            style={{ fontSize: '12px', padding: '6px 12px' }}
          >
            <option value="All">All States (Assam, Meghalaya, Arunachal, Nagaland, Manipur, Mizoram, Tripura)</option>
            <option value="Assam">Assam Valley</option>
            <option value="Meghalaya">Meghalaya Plateau</option>
            <option value="Nagaland">Nagaland Corridor</option>
            <option value="Arunachal">Arunachal Foothills</option>
          </select>
        </div>

        {/* Quick Layer Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showVehicles}
              onChange={(e) => setShowVehicles(e.target.checked)}
              style={{ accentColor: '#3B82F6' }}
            />
            <Truck size={14} color="#3B82F6" />
            <span>Active Fleet</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showHazards}
              onChange={(e) => setShowHazards(e.target.checked)}
              style={{ accentColor: '#EF4444' }}
            />
            <ShieldAlert size={14} color="#EF4444" />
            <span>Hazards & Blocks</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showWeather}
              onChange={(e) => setShowWeather(e.target.checked)}
              style={{ accentColor: '#10B981' }}
            />
            <CloudRain size={14} color="#10B981" />
            <span>Rainfall Radar</span>
          </label>
        </div>
      </div>

      {/* Fullscreen Interactive Map */}
      <LiveAccessibilityMap isFullScreen={true} />
    </div>
  );
};
