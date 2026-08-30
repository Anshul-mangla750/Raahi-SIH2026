import React from 'react';
import { ArrowRight, Crosshair, Gauge, ShieldAlert, Truck, Users } from 'lucide-react';

const solutions = [
  {
    no: "01",
    role: "GOVERNMENT",
    copy: "Monitor accessibility and critical supply movement.",
    icon: ShieldAlert,
    image: "/feature-live-map.jpg",
  },
  {
    no: "02",
    role: "TRANSPORTERS",
    copy: "Optimize routes and fleet movement.",
    icon: Truck,
    image: "/hero-truck.jpg",
  },
  {
    no: "03",
    role: "FIELD OFFICERS",
    copy: "Report disruptions from the ground.",
    icon: Crosshair,
    image: "/card-terrain.jpg",
  },
  {
    no: "04",
    role: "BUSINESSES",
    copy: "Improve delivery predictability and operational visibility.",
    icon: Gauge,
    image: "/feature-route-engine.jpg",
  },
  {
    no: "05",
    role: "CITIZENS",
    copy: "Benefit from more reliable movement of essential goods.",
    icon: Users,
    image: "/card-signal.jpg",
  },
];

export function SolutionsSection({ onOpenLogin }) {
  return (
    <section id="solutions" className="section solutions texture">
      <div className="container">
        <div className="solutions-top reveal">
          <div>
            <div className="eyebrow">Who RAAHI is for</div>
            <h2 className="solutions-heading">For every team<br />that moves <span style={{ color: "#087f4d" }}>what matters.</span></h2>
          </div>
          <p>Different roles. One shared view of the road and the responsibility it carries.</p>
        </div>
        <div className="solution-track">
          {solutions.map((sol) => {
            const Icon = sol.icon;
            return (
              <article className="solution-card reveal" key={sol.role}>
                <div className="solution-card-backdrop">
                  <img src={sol.image} alt={sol.role} className="solution-backdrop-photo" />
                  <div className="solution-backdrop-mist" />
                  <div className="solution-backdrop-topography" />
                  <div className="solution-partition-orb" aria-hidden="true" />
                </div>

                <div className="solution-card-content">
                  <div className="solution-signal">
                    <span>ROLE / {sol.no}</span>
                    <i />
                    <span>ECOSYSTEM</span>
                  </div>

                  <div className="solution-icon-wrap">
                    <Icon className="solution-icon" size={20} strokeWidth={1.8} />
                  </div>

                  <div className="solution-text">
                    <span className="solution-no">ROLE / {sol.no}</span>
                    <h3>{sol.role}</h3>
                    <p>{sol.copy}</p>
                  </div>
                </div>

                <div className="solution-card-bottom">
                  <button
                    className="solution-action-btn cursor-pointer"
                    type="button"
                    onClick={onOpenLogin}
                    aria-label={`Explore role for ${sol.role}`}
                  >
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
