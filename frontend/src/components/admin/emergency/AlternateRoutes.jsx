import React from 'react';
import { MapPin, Clock, Activity, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

export const AlternateRoutes = () => {
  const routes = [
    {
      id: 1,
      name: 'Route 1',
      isRecommended: true,
      extraTime: '+25 min',
      extraTimeColor: '#059669',
      via: 'via NH-27A and NH-15',
      desc: 'Best alternate route with smooth traffic and good road conditions.',
      distance: '142 km',
      estTime: '2h 45 min',
      traffic: 'Low',
      trafficColor: '#059669',
    },
    {
      id: 2,
      name: 'Route 2',
      isRecommended: false,
      extraTime: '+40 min',
      extraTimeColor: '#D97706',
      via: 'via NH-217 and NH-15',
      desc: 'Moderate traffic expected on this route.',
      distance: '156 km',
      estTime: '3 h 00 min',
      traffic: 'Medium',
      trafficColor: '#D97706',
    },
    {
      id: 3,
      name: 'Route 3',
      isRecommended: false,
      extraTime: '+55 min',
      extraTimeColor: '#DC2626',
      via: 'via SH-2 and NH-15',
      desc: 'Longer route with some town areas.',
      distance: '168 km',
      estTime: '3 h 20 min',
      traffic: 'High',
      trafficColor: '#DC2626',
    },
  ];

  const handleViewRoute = (routeName, via) => {
    toast.success(`Switching display to ${routeName} (${via})`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
      {/* Section Title */}
      <h2
        style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: 700,
          color: '#0F172A',
        }}
      >
        Alternate Routes
      </h2>

      {/* 3-Column Equal Height Route Cards Grid */}
      <div
        className="alternate-routes-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          width: '100%',
        }}
      >
        {routes.map((route) => (
          <div
            key={route.id}
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: route.isRecommended ? '1px solid #86EFAC' : '1px solid #E2E8F0',
              padding: '16px 18px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '210px',
            }}
          >
            {/* Top Row: Route Name, Badge, Extra Time */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                  {route.name}
                </span>
                {route.isRecommended && (
                  <span
                    style={{
                      backgroundColor: '#DCFCE7',
                      color: '#15803D',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      padding: '2px 7px',
                      borderRadius: '4px',
                    }}
                  >
                    (Recommended)
                  </span>
                )}
              </div>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: route.extraTimeColor }}>
                {route.extraTime}
              </span>
            </div>

            {/* Via subtitle */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>
                {route.via}
              </div>
              <p
                style={{
                  margin: '4px 0 0 0',
                  fontSize: '11.5px',
                  color: '#64748B',
                  lineHeight: 1.35,
                  minHeight: '32px',
                }}
              >
                {route.desc}
              </p>
            </div>

            {/* 3 Metrics: Distance, Est.Time, Traffic */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                padding: '10px 0',
                borderTop: '1px solid #F1F5F9',
                borderBottom: '1px solid #F1F5F9',
                margin: '10px 0',
              }}
            >
              {/* Distance */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '10.5px' }}>
                  <MapPin size={12} color="#64748B" />
                  <span>Distance</span>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', marginTop: '3px' }}>
                  {route.distance}
                </div>
              </div>

              {/* Est. Time */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '10.5px' }}>
                  <Clock size={12} color="#64748B" />
                  <span>Est.Time</span>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', marginTop: '3px' }}>
                  {route.estTime}
                </div>
              </div>

              {/* Traffic */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '10.5px' }}>
                  <Activity size={12} color="#64748B" />
                  <span>Traffic</span>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: route.trafficColor, marginTop: '3px' }}>
                  {route.traffic}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleViewRoute(route.name, route.via)}
              style={{
                width: '100%',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                backgroundColor: '#ffffff',
                border: route.isRecommended ? '1px solid #10B981' : '1px solid #CBD5E1',
                borderRadius: '6px',
                color: route.isRecommended ? '#059669' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = route.isRecommended ? '#F0FDF4' : '#F8FAFC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              <span>View Route</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
