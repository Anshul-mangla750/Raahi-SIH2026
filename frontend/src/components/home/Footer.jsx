import React from 'react';

export function Footer({ onOpenLogin }) {
  return (
    <footer className="footer">
      {/* Footer Top Stats Banner */}
      <div className="footer-stats-bar">
        <div className="container footer-stats-inner">
          <div className="footer-stat-item">
            <span className="footer-stat-num">8,450+</span>
            <span className="footer-stat-label">Vehicles Tracked</span>
          </div>
          <div className="footer-stat-divider" />
          <div className="footer-stat-item">
            <span className="footer-stat-num">12,500 KM</span>
            <span className="footer-stat-label">Roads Monitored</span>
          </div>
          <div className="footer-stat-divider" />
          <div className="footer-stat-item">
            <span className="footer-stat-num">122+</span>
            <span className="footer-stat-label">Districts Covered</span>
          </div>
          <div className="footer-stat-divider" />
          <div className="footer-stat-item">
            <span className="footer-stat-num">8 States</span>
            <span className="footer-stat-label">Northeast India</span>
          </div>
        </div>
      </div>

      <div className="container footer-top">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <a className="footer-brand" href="#home">
            <img
              src="/raahi-logo.jpg"
              alt="RAAHI – Track Navigate Deliver"
              className="footer-logo-img"
            />
            <div className="footer-brand-text">
              <span className="footer-brand-name">RAAHI</span>
              <span className="footer-brand-tag">TRACK · NAVIGATE · DELIVER</span>
            </div>
          </a>
          <p className="footer-statement">
            AI-powered Smart Logistics Accessibility Intelligence Platform for Northeast India — monitoring road corridors, predicting disruptions, and keeping essential goods moving.
          </p>
          <div className="footer-gov-badge">
            <div className="footer-gov-dot" />
            <span>NER LOGISMART · NHIDCL Initiative · Built for India</span>
          </div>
        </div>

        {/* Explore Column */}
        <div>
          <div className="footer-heading">Platform</div>
          <div className="footer-links">
            <a href="#platform">Live Map & Accessibility</a>
            <a href="#intelligence">Route Intelligence</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#solutions">Who It's For</a>
            <a href="#northeast">About RAAHI</a>
          </div>
        </div>

        {/* Solutions Column */}
        <div>
          <div className="footer-heading">Solutions</div>
          <div className="footer-links">
            <a href="#solutions">Government Agencies</a>
            <a href="#solutions">Fleet Operators</a>
            <a href="#solutions">Field Officers</a>
            <a href="#solutions">Businesses</a>
            <a href="#solutions">Citizens</a>
          </div>
        </div>

        {/* Portal Access Column */}
        <div>
          <div className="footer-heading">Portal Access</div>
          <div className="footer-links">
            <button
              type="button"
              onClick={onOpenLogin}
              className="text-left hover:text-emerald-400 text-slate-300 transition-colors cursor-pointer footer-link-btn"
            >
              Citizen Login
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="text-left hover:text-emerald-400 text-slate-300 transition-colors cursor-pointer footer-link-btn"
            >
              Official Login (NHIDCL)
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="text-left hover:text-emerald-400 text-slate-300 transition-colors cursor-pointer footer-link-btn"
            >
              Fleet Operator Portal
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="text-left hover:text-emerald-400 text-slate-300 transition-colors cursor-pointer footer-link-btn"
            >
              Field Officer App
            </button>
          </div>

          <div className="footer-feature-chips">
            <span className="footer-chip">GIS Mapping</span>
            <span className="footer-chip">AI / ML</span>
            <span className="footer-chip">GPS Tracking</span>
            <span className="footer-chip">Offline Mode</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container footer-bottom">
        <div className="footer-bottom-left">
          <span>© 2026 RAAHI · NER LOGISMART INITIATIVE</span>
          <span className="footer-bottom-sep">·</span>
          <span>Built for Northeast India Hackathon</span>
        </div>
        <div className="footer-bottom-right">
          <span>AI-Powered Logistics Intelligence</span>
          <span className="footer-bottom-sep">·</span>
          <span>Powered by GIS + ML + Real-Time GPS</span>
        </div>
      </div>
    </footer>
  );
}
