import React from 'react';
import { ArrowRight, Bell, Compass, Route as RouteIcon, Satellite, ShieldAlert, Truck } from 'lucide-react';

const features = [
  {
    no: "01",
    tag: "ACTIVE LAYER",
    title: "LIVE MAP & ACCESSIBILITY",
    copy: "Monitor roads, bridges, corridors and access conditions in real time.",
    icon: Compass,
    image: "/feature-live-map.jpg",
  },
  {
    no: "02",
    tag: "ACTIVE LAYER",
    title: "AI DISRUPTION PREDICTION",
    copy: "Predict landslides, floods, congestion and road damage before they become major disruptions.",
    icon: ShieldAlert,
    image: "/feature-ai-prediction.jpg",
  },
  {
    no: "03",
    tag: "ACTIVE LAYER",
    title: "SMART ROUTE ENGINE",
    copy: "Generate optimized alternate routes based on risk, travel time and accessibility.",
    icon: RouteIcon,
    image: "/feature-route-engine.jpg",
  },
  {
    no: "04",
    tag: "ACTIVE LAYER",
    title: "LIVE VEHICLE TRACKING",
    copy: "Track vehicles and essential deliveries with GPS-based visibility.",
    icon: Truck,
    image: "/feature-vehicle-tracking.jpg",
  },
  {
    no: "05",
    tag: "ACTIVE LAYER",
    title: "INSTANT ALERTS",
    copy: "Receive alerts for blockages, delays, high-risk corridors and disruptions.",
    icon: Bell,
    image: "/feature-instant-alerts.jpg",
  },
  {
    no: "06",
    tag: "ACTIVE LAYER",
    title: "FIELD REPORTING",
    copy: "Upload geo-tagged photos and incident reports from the field, including offline reporting.",
    icon: Satellite,
    image: "/feature-field-reporting.jpg",
  },
];

export function PlatformFeaturesSection() {
  return (
    <section id="platform" className="section platform texture">
      <div className="container">
        <div className="platform-top reveal">
          <div>
            <div className="eyebrow">The RAAHI platform</div>
            <h2 className="platform-heading">One platform.<br /><em>Complete logistics intelligence.</em></h2>
          </div>
          <p>Every layer of movement, connected to one view of the road ahead.</p>
        </div>
        <div className="feature-grid">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <article key={feat.title} className="feature-card reveal">
                <div className="feature-card-backdrop">
                  <img src={feat.image} alt={feat.title} className="feature-backdrop-photo" />
                  <div className="feature-backdrop-mist" />
                  <div className="feature-backdrop-topography" />
                  <div className="feature-partition-orb" aria-hidden="true" />
                </div>

                <div className="feature-card-content">
                  <div className="feature-signal">
                    <span>{feat.no} / PLATFORM</span>
                    <i />
                    <span>{feat.tag}</span>
                  </div>

                  <div className="feature-icon">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div className="feature-body-text">
                    <span className="feature-no">{feat.no}</span>
                    <h3>{feat.title}</h3>
                    <p>{feat.copy}</p>
                  </div>
                </div>

                <div className="feature-card-bottom">
                  <button className="feature-action-btn" type="button" aria-label={`Explore ${feat.title}`}>
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
