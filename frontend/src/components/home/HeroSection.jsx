import React, { useState } from 'react';
import { ArrowRight, Bell, CloudRain, MapPin, Play, Route as RouteIcon, ShieldCheck, Truck } from 'lucide-react';
import { SignalBars } from './SignalBars';
import { Counter } from './Counter';

const ASSETS = {
  hero: "/hero-highway-scenic.jpg",
  video: "/raahi-hero-mountain-truck.mp4",
};

export function HeroSection() {
  const [activeHud, setActiveHud] = useState(null);

  return (
    <section id="home" className="hero-corridor">
      {/* Real Moving Truck & Highway Video with Multi-stop Whitish Blend Layers */}
      <div className="hero-bg-container">
        <div className="hero-video-wrapper">
          <video
            className="hero-corridor-media"
            src={ASSETS.video}
            poster={ASSETS.hero}
            autoPlay
            loop
            muted
            playsInline
            aria-label="Real footage of logistics freight truck driving through mountain corridors"
          />
        </div>
        <div className="hero-corridor-vignette" />
        <div className="hero-corridor-grid" />
        <div className="hero-topo-overlay" />
      </div>

      {/* Real Highway Telemetry Layer */}
      <div className="hero-truck-stage" aria-hidden="true">
        <div className="truck-telemetry-beam" />
      </div>

      {/* Interactive Floating Telemetry Glass HUD Cards & Waypoint Pins */}
      <div className="hero-telemetry-hud-layer" aria-hidden="true">
        {/* HUD Card 1: Road Condition */}
        <div className="hero-hud-anchor hud-anchor--condition">
          <div
            className={`telemetry-card ${activeHud === "condition" ? "scale-105" : ""}`}
            onMouseEnter={() => setActiveHud("condition")}
            onMouseLeave={() => setActiveHud(null)}
          >
            <div className="telemetry-icon-box green">
              <ShieldCheck size={18} strokeWidth={2.4} />
            </div>
            <div className="telemetry-info">
              <span className="telemetry-label">Road Condition</span>
              <span className="telemetry-status green">Good</span>
            </div>
            <SignalBars color="green" />
          </div>
        </div>

        {/* HUD Card 2: Weather */}
        <div className="hero-hud-anchor hud-anchor--weather">
          <div
            className={`telemetry-card ${activeHud === "weather" ? "scale-105" : ""}`}
            onMouseEnter={() => setActiveHud("weather")}
            onMouseLeave={() => setActiveHud(null)}
          >
            <div className="telemetry-icon-box blue">
              <CloudRain size={18} strokeWidth={2.4} />
            </div>
            <div className="telemetry-info">
              <span className="telemetry-label">Weather</span>
              <span className="telemetry-status blue">Moderate Rain</span>
            </div>
            <SignalBars color="blue" />
          </div>
        </div>

        {/* HUD Card 3: Route Optimized */}
        <div className="hero-hud-anchor hud-anchor--route">
          <div
            className={`telemetry-card ${activeHud === "route" ? "scale-105" : ""}`}
            onMouseEnter={() => setActiveHud("route")}
            onMouseLeave={() => setActiveHud(null)}
          >
            <div className="telemetry-icon-box green">
              <RouteIcon size={18} strokeWidth={2.4} />
            </div>
            <div className="telemetry-info">
              <span className="telemetry-label">Route Optimized</span>
              <span className="telemetry-status green">ETA: 32 min faster</span>
            </div>
            <SignalBars color="green" />
          </div>
        </div>

        {/* Highway Waypoint Pins */}
        <div className="highway-waypoint-pin pin-anchor--1" title="Waypoint Alpha • 98.4% Surface Integrity">
          <div className="waypoint-badge">
            <MapPin size={12} strokeWidth={2.5} />
            <span className="waypoint-pulse-ring" />
          </div>
        </div>

        <div className="highway-waypoint-pin pin-anchor--2" title="Waypoint Bravo • Weather Sensor Active">
          <div className="waypoint-badge">
            <MapPin size={12} strokeWidth={2.5} />
            <span className="waypoint-pulse-ring" />
          </div>
        </div>
      </div>

      {/* Foreground Hero Container */}
      <div className="container hero-corridor-container">
        <div className="hero-main-row">
          <div className="hero-corridor-copy">
            <div className="hero-live-badge hero-reveal">
              <span className="badge-radar-dot" />
              <span className="badge-live-text">LIVE ROAD INTELLIGENCE NETWORK</span>
              <span className="badge-sep">|</span>
              <span className="badge-sub-text">Always On. Always Ahead.</span>
            </div>

            <h1 className="hero-corridor-headline hero-reveal">
              From signal<br />
              <span className="headline-green">to delivery.</span>
            </h1>

            <p className="hero-corridor-desc hero-reveal">
              RAAHI connects real-time road intelligence, smart routing, vehicle tracking, and disruption prediction to keep essential goods moving—safely and on time.
            </p>

            <div className="hero-corridor-actions hero-reveal">
              <a className="btn-hero-explore" href="#platform">
                <span>Explore RAAHI</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
              <a className="btn-hero-how" href="#how-it-works">
                <span className="btn-play-circle">
                  <Play size={12} className="fill-slate-600 translate-x-[1px]" />
                </span>
                <span>See How It Works</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Floating Metrics Capsule Bar */}
        <div className="hero-bottom-metrics-wrap hero-reveal">
          <div className="hero-bottom-metrics-card">
            <div className="metric-item-col">
              <div className="metric-icon-badge">
                <Truck size={22} strokeWidth={2.2} />
              </div>
              <div className="metric-text-group">
                <div className="metric-number">
                  <Counter value={8450} suffix="+" />
                </div>
                <div className="metric-label">VEHICLES TRACKED</div>
              </div>
            </div>

            <div className="metric-item-col">
              <div className="metric-icon-badge">
                <MapPin size={22} strokeWidth={2.2} />
              </div>
              <div className="metric-text-group">
                <div className="metric-number">
                  <Counter value={12500} suffix="+" />
                </div>
                <div className="metric-label">KM MONITORED</div>
              </div>
            </div>

            <div className="metric-item-col">
              <div className="metric-icon-badge">
                <Bell size={22} strokeWidth={2.2} />
              </div>
              <div className="metric-text-group">
                <div className="metric-number">
                  <Counter value={122} suffix="+" />
                </div>
                <div className="metric-label">DISTRICTS COVERED</div>
              </div>
            </div>

            <div className="metric-item-col">
              <div className="metric-icon-badge">
                <ShieldCheck size={22} strokeWidth={2.2} />
              </div>
              <div className="metric-text-group">
                <div className="metric-number">
                  <Counter value={2300} suffix="+" />
                </div>
                <div className="metric-label">ALERTS GENERATED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
