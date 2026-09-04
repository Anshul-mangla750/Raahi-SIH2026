import React from 'react';

export const ConnectivityMap = () => {
  return (
    <div
      className="card"
      style={{
        height: '370px',
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
          backgroundPosition: 'center 45%',
        }}
      >
        {/* Softening Overlay for High-Contrast Clean Cartography */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.28)',
          }}
        />

        {/* SVG District Boundaries and Routes Network */}
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
          {/* Tezpur District Irregular Boundary Polygon */}
          <path
            d="M 210 200 
               C 230 140, 310 90, 420 85 
               C 510 80, 560 110, 630 180 
               C 660 210, 690 260, 640 310 
               C 590 350, 510 390, 440 380 
               C 380 370, 330 310, 270 300 
               C 230 290, 200 240, 210 200 Z"
            fill="rgba(16, 185, 129, 0.04)"
            stroke="#10B981"
            strokeWidth="2.2"
            strokeDasharray="5 3"
          />

          {/* Brahmaputra river bend through the district */}
          <path
            d="M 120 220 C 260 240, 400 220, 550 180 C 660 150, 740 160, 800 170"
            stroke="#93C5FD"
            strokeWidth="16"
            fill="none"
            opacity="0.4"
            strokeLinecap="round"
          />

          {/* --- ROUTE 1: NH-27 (Green, High Accessibility) --- */}
          <path
            d="M 280 235 L 340 215 L 405 200 L 415 250"
            stroke="#10B981"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* --- ROUTE 2: NH-15 (Green, High Accessibility) --- */}
          <path
            d="M 405 200 L 490 190 L 580 160 L 650 140"
            stroke="#10B981"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* --- ROUTE 3: NH-217 (Orange, Moderate Accessibility) --- */}
          <path
            d="M 500 245 L 560 210 L 620 185 L 680 180"
            stroke="#F59E0B"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* --- ROUTE 4: SH-2 (Green, Moderate-to-Good) --- */}
          <path
            d="M 405 200 L 400 270 L 415 320 L 430 380"
            stroke="#10B981"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* --- ROUTE 5: SH-16 (Red, Poor Accessibility) --- */}
          <path
            d="M 415 250 L 470 245 L 530 260 L 545 320 L 540 360"
            stroke="#EF4444"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Junction Dots */}
          <circle cx="405" cy="200" r="4.5" fill="#FFFFFF" stroke="#059669" strokeWidth="2.5" />
          <circle cx="415" cy="250" r="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
          <circle cx="500" cy="245" r="4" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
        </svg>

        {/* Route Badges directly on routes */}
        {/* NH-27 */}
        <div
          style={{
            position: 'absolute',
            top: '38%',
            left: '39%',
            backgroundColor: '#065F46',
            color: '#FFFFFF',
            fontSize: '9.5px',
            fontWeight: 700,
            padding: '2px 5px',
            borderRadius: '3px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            letterSpacing: '0.02em',
            pointerEvents: 'none',
          }}
        >
          NH-27
        </div>

        {/* NH-15 */}
        <div
          style={{
            position: 'absolute',
            top: '39%',
            left: '52%',
            backgroundColor: '#065F46',
            color: '#FFFFFF',
            fontSize: '9.5px',
            fontWeight: 700,
            padding: '2px 5px',
            borderRadius: '3px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            letterSpacing: '0.02em',
            pointerEvents: 'none',
          }}
        >
          NH-15
        </div>

        {/* NH-217 */}
        <div
          style={{
            position: 'absolute',
            top: '44%',
            left: '64%',
            backgroundColor: '#D97706',
            color: '#FFFFFF',
            fontSize: '9.5px',
            fontWeight: 700,
            padding: '2px 5px',
            borderRadius: '3px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            letterSpacing: '0.02em',
            pointerEvents: 'none',
          }}
        >
          NH-217
        </div>

        {/* SH-2 */}
        <div
          style={{
            position: 'absolute',
            top: '59%',
            left: '40%',
            backgroundColor: '#065F46',
            color: '#FFFFFF',
            fontSize: '9.5px',
            fontWeight: 700,
            padding: '2px 5px',
            borderRadius: '3px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            letterSpacing: '0.02em',
            pointerEvents: 'none',
          }}
        >
          SH-2
        </div>

        {/* SH-16 */}
        <div
          style={{
            position: 'absolute',
            top: '60%',
            left: '59%',
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            fontSize: '9.5px',
            fontWeight: 700,
            padding: '2px 5px',
            borderRadius: '3px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            letterSpacing: '0.02em',
            pointerEvents: 'none',
          }}
        >
          SH-16
        </div>

        {/* Floating Map Legend at Bottom-Left */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '8px 12px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            backdropFilter: 'blur(4px)',
            zIndex: 10,
          }}
        >
          {/* Item 1: Good */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '18px',
                height: '3px',
                borderRadius: '2px',
                backgroundColor: '#10B981',
              }}
            />
            <span style={{ fontSize: '10.5px', color: '#475569', fontWeight: 500 }}>
              Good (High Accessibility)
            </span>
          </div>

          {/* Item 2: Moderate */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '18px',
                height: '3px',
                borderRadius: '2px',
                backgroundColor: '#F59E0B',
              }}
            />
            <span style={{ fontSize: '10.5px', color: '#475569', fontWeight: 500 }}>
              Moderate (Partial Access)
            </span>
          </div>

          {/* Item 3: Poor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '18px',
                height: '3px',
                borderRadius: '2px',
                backgroundColor: '#EF4444',
              }}
            />
            <span style={{ fontSize: '10.5px', color: '#475569', fontWeight: 500 }}>
              Poor (Not Accessible)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
