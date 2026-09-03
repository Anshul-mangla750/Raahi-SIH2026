import React from 'react';
import { MapPin, Briefcase, Truck, Sparkles, RefreshCw, X, ChevronDown } from 'lucide-react';

export const RouteConfigBar = ({
  fromLocation,
  setFromLocation,
  destinationCount,
  setDestinationCount,
  vehicleType,
  setVehicleType,
  handleOptimize,
  handleClear,
  isOptimizing,
}) => {
  return (
    <div className="route-query-bar">
      {/* 1. From Origin Field */}
      <div className="query-field-group">
        <label className="query-field-label">From</label>
        <div className="query-input-wrap">
          <MapPin size={15} color="#059669" className="query-icon" />
          <input
            type="text"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            placeholder="Origin address..."
          />
          {fromLocation && (
            <button
              onClick={() => setFromLocation('')}
              className="query-clear-btn"
              title="Clear Origin"
            >
              <X size={12} />
            </button>
          )}
          <ChevronDown size={14} className="query-chevron" />
        </div>
      </div>

      {/* 2. To / Destinations Field */}
      <div className="query-field-group">
        <label className="query-field-label">To / Destination(s)</label>
        <div className="query-input-wrap">
          <Briefcase size={15} color="#059669" className="query-icon" />
          <select
            value={destinationCount}
            onChange={(e) => setDestinationCount(Number(e.target.value))}
          >
            <option value={6}>6 Destinations Selected</option>
            <option value={4}>4 Destinations Selected</option>
            <option value={8}>8 Destinations Selected</option>
          </select>
          <ChevronDown size={14} className="query-chevron" />
        </div>
      </div>

      {/* 3. Vehicle Type Field */}
      <div className="query-field-group">
        <label className="query-field-label">Vehicle Type</label>
        <div className="query-input-wrap">
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="Medium Truck">Medium Truck</option>
            <option value="Heavy Trailer">Heavy Trailer</option>
            <option value="Light Cargo">Light Cargo Van</option>
          </select>
          <ChevronDown size={14} className="query-chevron" />
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="query-actions-group">
        <button
          className="btn-optimize-primary"
          onClick={handleOptimize}
          disabled={isOptimizing}
        >
          {isOptimizing ? <RefreshCw size={14} className="spin" /> : null}
          <span>Optimize Route</span>
        </button>
        <button className="btn-clear-secondary" onClick={handleClear}>
          Clear All
        </button>
      </div>
    </div>
  );
};
