import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Minus,
  Navigation,
} from 'lucide-react';
import { toast } from 'sonner';

export const RoutePlannerMap = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const waypoints = [
    { id: 'S', name: 'Start: Guwahati', label: 'Guwahati', x: 22, y: 32, type: 'start' },
    { id: '1', name: 'Jorhat', label: 'Jorhat', x: 65, y: 22, type: 'stop', color: '#2563EB' },
    { id: '2', name: 'Nagaon', label: 'Nagaon', x: 49, y: 38, type: 'stop', color: '#7C3AED' },
    { id: '3', name: 'Hojai', label: 'Hojai', x: 43, y: 48, type: 'stop', color: '#EA580C' },
    { id: '4', name: 'Shillong', label: 'Shillong', x: 31, y: 49, type: 'stop', color: '#DC2626' },
    { id: '5', name: 'Dimapur', label: 'Dimapur', x: 60, y: 38, type: 'stop', color: '#059669' },
    { id: '6', name: 'Tezpur', label: 'Tezpur', x: 44, y: 25, type: 'stop', color: '#059669' },
  ];

  return (
    <div className="card route-map-card" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
      <div
        className="map-container"
        style={{
          height: '460px',
          backgroundImage: `url('/assets/maps/northeast_satellite.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Dark Contrast Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.38)',
            pointerEvents: 'none',
          }}
        />

        {/* Dynamic Multi-Segment SVG Route Circuit */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {/* Guwahati to Mangaldoi / Stop 1 (Blue) */}
          <path
            d="M 22 32 Q 44 18 65 22"
            stroke="#2563EB"
            strokeWidth="2.2"
            fill="none"
            strokeDasharray="4 2"
          />
          {/* Stop 1 (Jorhat) to Stop 2 (Nagaon) (Purple) */}
          <path
            d="M 65 22 Q 56 30 49 38"
            stroke="#7C3AED"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Stop 2 (Nagaon) to Stop 3 (Hojai) (Orange) */}
          <path
            d="M 49 38 L 43 48"
            stroke="#EA580C"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Stop 3 (Hojai) to Stop 4 (Shillong) (Red) */}
          <path
            d="M 43 48 Q 36 50 31 49"
            stroke="#DC2626"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Stop 4 (Shillong) to Stop 5 (Dimapur) (Purple/Blue curve) */}
          <path
            d="M 31 49 Q 45 42 60 38"
            stroke="#8B5CF6"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Stop 5 (Dimapur) to Stop 6 (Tezpur) (Green) */}
          <path
            d="M 60 38 Q 52 30 44 25"
            stroke="#10B981"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Stop 6 (Tezpur) returning to Guwahati (Green dashed line) */}
          <path
            d="M 44 25 Q 33 26 22 32"
            stroke="#047857"
            strokeWidth="2"
            strokeDasharray="3 3"
            fill="none"
          />
        </svg>

        {/* State/Regional Labels */}
        <div style={{ position: 'absolute', top: '24%', left: '30%', color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: 800, letterSpacing: '0.06em', textShadow: '0 1px 3px rgba(0,0,0,0.8)', pointerEvents: 'none' }}>
          ASSAM
        </div>
        <div style={{ position: 'absolute', top: '42%', left: '20%', color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 800, letterSpacing: '0.06em', textShadow: '0 1px 3px rgba(0,0,0,0.8)', pointerEvents: 'none' }}>
          MEGHALAYA
        </div>

        {/* River Label */}
        <div style={{ position: 'absolute', top: '29%', left: '30%', color: 'rgba(147, 197, 253, 0.85)', fontSize: '10px', fontStyle: 'italic', fontWeight: 600, transform: 'rotate(-12deg)', textShadow: '0 1px 2px rgba(0,0,0,0.8)', pointerEvents: 'none' }}>
          ~ Brahmaputra River ~
        </div>

        {/* Geographic City/Town Labels */}
        <div style={{ position: 'absolute', top: '28%', left: '21%', color: '#ffffff', fontSize: '9px', fontWeight: 600, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>North Guwahati</div>
        <div style={{ position: 'absolute', top: '35%', left: '20%', color: '#ffffff', fontSize: '10.5px', fontWeight: 700, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>Guwahati</div>
        <div style={{ position: 'absolute', top: '23%', left: '56%', color: '#ffffff', fontSize: '9.5px', fontWeight: 600, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>Mangaldoi</div>
        <div style={{ position: 'absolute', top: '25%', left: '44%', color: '#ffffff', fontSize: '9.5px', fontWeight: 600, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>Tezpur</div>
        <div style={{ position: 'absolute', top: '35%', left: '48%', color: '#ffffff', fontSize: '10px', fontWeight: 700, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>Nagaon</div>
        <div style={{ position: 'absolute', top: '42%', left: '38%', color: '#ffffff', fontSize: '9px', fontWeight: 600, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>Hapjan</div>
        <div style={{ position: 'absolute', top: '48%', left: '45%', color: '#ffffff', fontSize: '9.5px', fontWeight: 600, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>Hojai</div>
        <div style={{ position: 'absolute', top: '48%', left: '24%', color: '#ffffff', fontSize: '10px', fontWeight: 700, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>Shillong</div>
        <div style={{ position: 'absolute', top: '41%', left: '59%', color: '#ffffff', fontSize: '10px', fontWeight: 700, textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>Dimapur</div>

        {/* Highway Badges */}
        <div style={{ position: 'absolute', top: '34%', left: '30%', background: 'rgba(30, 41, 59, 0.75)', color: '#93C5FD', padding: '1px 4px', borderRadius: '3px', fontSize: '8px', fontWeight: 700, border: '1px solid rgba(147, 197, 253, 0.3)' }}>NH-27</div>
        <div style={{ position: 'absolute', top: '32%', left: '44%', background: 'rgba(30, 41, 59, 0.75)', color: '#93C5FD', padding: '1px 4px', borderRadius: '3px', fontSize: '8px', fontWeight: 700, border: '1px solid rgba(147, 197, 253, 0.3)' }}>NH-37</div>
        <div style={{ position: 'absolute', top: '25%', left: '51%', background: 'rgba(30, 41, 59, 0.75)', color: '#93C5FD', padding: '1px 4px', borderRadius: '3px', fontSize: '8px', fontWeight: 700, border: '1px solid rgba(147, 197, 253, 0.3)' }}>NH-127B</div>
        <div style={{ position: 'absolute', top: '40%', left: '53%', background: 'rgba(30, 41, 59, 0.75)', color: '#93C5FD', padding: '1px 4px', borderRadius: '3px', fontSize: '8px', fontWeight: 700, border: '1px solid rgba(147, 197, 253, 0.3)' }}>NH-02</div>

        {/* Waypoint Markers */}
        {waypoints.map((wp) => {
          const isStart = wp.id === 'S';

          return (
            <div
              key={wp.id}
              style={{
                position: 'absolute',
                top: `${wp.y}%`,
                left: `${wp.x}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: 20,
              }}
              title={wp.name}
            >
              {isStart ? (
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#047857',
                    color: '#ffffff',
                    border: '2px solid #ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 8px rgba(4, 120, 87, 0.8)',
                  }}
                >
                  <MapPin size={13} />
                </div>
              ) : (
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: wp.color || '#059669',
                    color: '#ffffff',
                    border: '2px solid #ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 800,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                  }}
                >
                  {wp.id}
                </div>
              )}
            </div>
          );
        })}

        {/* Floating Map Controls on Right */}
        <div
          style={{
            position: 'absolute',
            right: '14px',
            top: '42%',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 25,
          }}
        >
          <button
            className="map-ctrl-btn"
            title="Zoom In"
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
          >
            <Plus size={16} />
          </button>
          <button
            className="map-ctrl-btn"
            title="Zoom Out"
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
          >
            <Minus size={16} />
          </button>
          <button
            className="map-ctrl-btn"
            title="Center Map"
            onClick={() => {
              setZoomLevel(1);
              toast.info('Map centered on optimized route circuit.');
            }}
          >
            <Navigation size={15} color="#059669" />
          </button>
        </div>

        {/* Floating Legend at Bottom-Left */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(6px)',
            borderRadius: '6px',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '11px',
            color: '#334155',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            zIndex: 25,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#047857' }} />
            <span>Start Point</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={12} color="#059669" />
            <span>Destination</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '16px', height: '3px', backgroundColor: '#2563EB', borderRadius: '2px' }} />
            <span>Route</span>
          </div>
        </div>
      </div>
    </div>
  );
};
