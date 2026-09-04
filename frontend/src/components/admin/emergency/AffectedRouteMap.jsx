import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FloodHouseIcon } from './FloodHouseIcon';

export const AffectedRouteMap = () => {
  const [zoom, setZoom] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {/* Title */}
      <h2
        style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: 700,
          color: '#0F172A',
        }}
      >
        Affected Route
      </h2>

      {/* Map Card Container */}
      <div
        className="card"
        style={{
          height: '350px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {/* Background Map Visual */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/northeast-atlas-map.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Subtle Light Softening Overlay for Enterprise Clean Look */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />

          {/* SVG Vector Roads, River and Highlights */}
          <svg
            viewBox="0 0 800 450"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            {/* Brahmaputra River Soft Blue Meander */}
            <path
              d="M 40 280 C 180 260, 320 230, 470 230 C 620 230, 720 210, 800 200"
              stroke="#93C5FD"
              strokeWidth="24"
              fill="none"
              opacity="0.55"
              strokeLinecap="round"
            />

            {/* Normal Route Segments (Guwahati to start of flood zone) */}
            <path
              d="M 120 320 C 160 300, 200 280, 260 270"
              stroke="#10B981"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Affected Red Route Segment (Flood Zone crossing near Kolia Bhomora / Tezpur approach) */}
            <path
              d="M 260 270 C 340 260, 420 245, 510 240 C 580 238, 630 235, 680 215"
              stroke="#EF4444"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="none"
            />

            {/* Route continuation to Tezpur */}
            <path
              d="M 680 215 L 710 208"
              stroke="#10B981"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Intermediate waypoints dots */}
            <circle cx="260" cy="270" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="510" cy="240" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
          </svg>

          {/* NH-27 Highway Badge */}
          <div
            style={{
              position: 'absolute',
              top: '53%',
              left: '60%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#F59E0B',
              color: '#FFFFFF',
              fontSize: '9px',
              fontWeight: 800,
              padding: '1px 5px',
              borderRadius: '3px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
              letterSpacing: '0.02em',
            }}
          >
            NH-27
          </div>

          {/* Guwahati Start Marker & Label */}
          <div
            style={{
              position: 'absolute',
              top: '68%',
              left: '14%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            {/* White Label Pill */}
            <div
              style={{
                backgroundColor: '#ffffff',
                color: '#0F172A',
                fontSize: '11px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
                marginBottom: '5px',
                whiteSpace: 'nowrap',
              }}
            >
              Guwahati
            </div>
            {/* Green Pin */}
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                border: '2.5px solid #ffffff',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)',
              }}
            />
          </div>

          {/* Tezpur End Marker & Label */}
          <div
            style={{
              position: 'absolute',
              top: '46%',
              left: '88%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            {/* White Label Pill */}
            <div
              style={{
                backgroundColor: '#ffffff',
                color: '#0F172A',
                fontSize: '11px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
                marginBottom: '5px',
                whiteSpace: 'nowrap',
              }}
            >
              Tezpur
            </div>
            {/* Green Pin */}
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                border: '2.5px solid #ffffff',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)',
              }}
            />
          </div>

          {/* Central Flood Emergency Marker & Attached Popup Card */}
          <div
            style={{
              position: 'absolute',
              top: '54%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            {/* Information Popup Card directly attached above marker */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                padding: '10px 14px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                marginBottom: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                minWidth: '170px',
                maxWidth: '220px',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#DC2626',
                  lineHeight: 1.2,
                }}
              >
                Flood
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: '#64748B',
                  fontWeight: 500,
                }}
              >
                Near Kolia Bhomora Bridge
              </span>
              <span
                style={{
                  fontSize: '10.5px',
                  color: '#64748B',
                  lineHeight: 1.35,
                  marginTop: '1px',
                }}
              >
                Heavy rainfall has caused flooding on the route.
              </span>
            </div>

            {/* Prominent Red Circular Flood Icon Marker */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#DC2626',
                border: '2.5px solid #ffffff',
                boxShadow: '0 3px 10px rgba(220, 38, 38, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <FloodHouseIcon size={20} color="#FFFFFF" />
            </div>
          </div>
        </div>

        {/* Map Zoom Controls */}
        <div
          style={{
            position: 'absolute',
            right: '12px',
            bottom: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            zIndex: 15,
          }}
        >
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.15, 1.8))}
            title="Zoom In"
            style={{
              width: '26px',
              height: '26px',
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
            <Plus size={14} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.15, 0.85))}
            title="Zoom Out"
            style={{
              width: '26px',
              height: '26px',
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
            <Minus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
