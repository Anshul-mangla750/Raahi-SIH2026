import React from 'react';
import { Radio } from 'lucide-react';
import { Counter } from './Counter';

export function CommandCenterSection() {
  return (
    <section className="section command texture-dark">
      <div className="container">
        <div className="command-top reveal">
          <div>
            <div className="eyebrow">Live logistics command center</div>
            <h2 className="command-heading">See your network<br /><em>before it becomes a problem.</em></h2>
          </div>
          <p>One calm view of every corridor, vehicle, alert, and decision in motion.</p>
        </div>
        <div className="command-shell reveal">
          <div className="command-map">
            <img src="/northeast-atlas-map.jpg" alt="Northeast Logistics Atlas" className="command-map-bg" />
            <div className="map-grid" />
            <svg className="map-route" viewBox="0 0 500 350" preserveAspectRatio="none" aria-hidden="true">
              <path className="route-path-clear" d="M190 160 L255 158 L335 116 L395 98" />
              <path className="route-path-risk" d="M190 160 L188 206 L270 270" />
              <path className="route-path-blocked" d="M330 186 L360 200 L345 278" />
            </svg>
            <span className="map-node node-guwahati" title="Guwahati Gateway" />
            <span className="map-node node-shillong" title="Shillong Ridge" />
            <span className="map-node node-nagaon" title="Nagaon Junction" />
            <span className="map-node node-jorhat" title="Jorhat Terminal" />
            <span className="map-node node-dimapur" title="Dimapur Railhead" />
            <span className="map-node node-imphal" title="Imphal Valley" />
            <span className="map-vehicle v1" />
            <span className="map-vehicle v2" />
            <span className="map-vehicle v3" />
            <span className="map-label a">GUWAHATI / 12:18</span>
            <span className="map-label b">SHILLONG / 14:40</span>
            <span className="map-label c">NH-29 / ALERT</span>
            <span className="map-label d">JORHAT / 17:05</span>
          </div>
          <div className="command-panel">
            <div className="panel-card">
              <span className="panel-label">Network status</span>
              <div className="status-row"><span>Open (Clear)</span><b className="good">68%</b></div>
              <div className="status-row"><span>At risk (Rain)</span><b className="warn">21%</b></div>
              <div className="status-row"><span>Blocked (Landslide)</span><b className="bad">11%</b></div>
            </div>
            <div className="panel-card">
              <span className="panel-label">Active vehicles</span>
              <div className="panel-big">317</div>
              <div className="status-row"><span>Moving now</span><b className="good">284</b></div>
            </div>
            <div className="panel-card alert-card">
              <span className="panel-label">High risk alert</span>
              <strong>Landslide detected on NH-29 Kohima Pass</strong>
              <small><Radio size={11} style={{ verticalAlign: "-2px" }} /> Active Rerouting to NH-102</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ImpactStatsSection() {
  const stats = [
    [12500, '+', 'KM OF ROADS MONITORED'],
    [122, '+', 'DISTRICTS COVERED'],
    [8450, '+', 'ACTIVE VEHICLES'],
    [2300, '+', 'ALERTS GENERATED'],
    [1.2, 'M+', 'DELIVERIES TRACKED'],
  ];

  return (
    <section className="section impact texture">
      <div className="container">
        <div className="impact-head reveal">
          <div>
            <div className="eyebrow">The network in numbers</div>
            <h2 className="impact-heading">Movement,<br /><span style={{ color: "#087f4d" }}>made visible.</span></h2>
          </div>
          <p>Built to make the distance between a warning and a decision shorter.</p>
        </div>
        <div className="impact-grid">
          {stats.map(([value, suffix, label]) => (
            <div className="impact-stat reveal" key={label}>
              <strong><Counter value={value} suffix={suffix} /></strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
