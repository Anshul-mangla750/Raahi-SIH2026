import React from 'react';
import { CloudRain, Droplets, Wind, CloudSun, ChevronRight } from 'lucide-react';
import { WEATHER_DATA } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const WeatherCard = () => {
  const { openModal } = useApp();

  return (
    <div className="card" style={{ marginTop: '16px' }}>
      <div className="card-header" style={{ marginBottom: '12px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Weather Overview</h2>
        <button
          className="card-link"
          onClick={() => openModal('support', { topic: 'Weather Forecast & Meteorological Telemetry' })}
        >
          <span>View Details</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="weather-card-inner">
        {/* Main Temperature and Icon */}
        <div className="weather-primary">
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#EFF6FF',
              color: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CloudRain size={32} />
          </div>
          <div>
            <div className="weather-temp">{WEATHER_DATA.temp}</div>
            <div className="weather-condition">{WEATHER_DATA.condition}</div>
            <div className="weather-city">{WEATHER_DATA.city}</div>
          </div>
        </div>

        {/* Humidity, Wind, Rainfall Stats */}
        <div className="weather-details-grid">
          <div className="weather-stat-row">
            <span className="weather-stat-label">
              <Droplets size={14} color="#3B82F6" />
              Humidity
            </span>
            <span className="weather-stat-val">{WEATHER_DATA.humidity}</span>
          </div>

          <div className="weather-stat-row">
            <span className="weather-stat-label">
              <Wind size={14} color="#64748B" />
              Wind
            </span>
            <span className="weather-stat-val">{WEATHER_DATA.wind}</span>
          </div>

          <div className="weather-stat-row">
            <span className="weather-stat-label">
              <CloudSun size={14} color="#F59E0B" />
              Rainfall
            </span>
            <span className="weather-stat-val">{WEATHER_DATA.rainfall}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
