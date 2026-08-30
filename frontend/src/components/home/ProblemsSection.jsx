import React from 'react';
import { ArrowRight, CloudRain, Mountain, Radio, TriangleAlert, Wifi } from 'lucide-react';

const challengeCards = [
  {
    no: "01",
    tag: "PREDICT",
    kind: "predict",
    title: "LANDSLIDES",
    desc: "Unexpected road blockages can stop critical deliveries.",
    icon: Radio,
    image: "/card-landslides.jpg",
  },
  {
    no: "02",
    tag: "MONITOR",
    kind: "monitor",
    title: "FLOODS",
    desc: "Extreme weather can disrupt routes and connectivity.",
    icon: CloudRain,
    image: "/card-floods.jpg",
  },
  {
    no: "03",
    tag: "MAP",
    kind: "map",
    title: "REMOTE TERRAIN",
    desc: "Difficult terrain makes route planning unpredictable.",
    icon: Mountain,
    image: "/card-terrain.jpg",
  },
  {
    no: "04",
    tag: "CONNECT",
    kind: "connect",
    title: "INFORMATION GAPS",
    desc: "Delayed road intelligence creates costly decisions.",
    icon: Wifi,
    image: "/card-signal.jpg",
  },
];

export function ProblemsSection() {
  return (
    <section className="section problems texture">
      <div className="container">
        <div className="problems-head reveal">
          <div className="problems-title-wrap">
            <h2 className="problems-heading">
              When roads<br />change,<br />
              <span className="heading-accent">logistics must<br />adapt.</span>
            </h2>
            <div className="heading-underline-bar" />
            <p className="problems-intro">
              RAAHI turns road conditions, weather, traffic, vehicle movement and disruption signals into actionable logistics intelligence.
            </p>
          </div>

          <div className="problems-road-decor" aria-hidden="true">
            <svg className="problems-road-svg" viewBox="0 0 450 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 240 C100 210, 180 230, 260 170 C340 110, 390 140, 440 60" stroke="rgba(8,127,77,0.18)" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M40 250 C120 200, 200 210, 280 150 C360 90, 400 110, 440 40" stroke="rgba(8,127,77,0.14)" strokeWidth="1" />
              <path d="M0 210 C90 170, 170 190, 250 130 C330 70, 380 90, 440 20" stroke="rgba(8,127,77,0.12)" strokeWidth="1" />
              <path d="M10 235 C95 195, 175 210, 260 150 C335 95, 385 110, 435 45" stroke="#082b20" strokeWidth="9" strokeLinecap="round" />
              <path d="M10 235 C95 195, 175 210, 260 150 C335 95, 385 110, 435 45" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 8" />
              <circle cx="10" cy="235" r="5" fill="#10b981" />
              <circle cx="10" cy="235" r="10" stroke="#10b981" strokeOpacity="0.4" />
              <circle cx="135" cy="205" r="4.5" fill="#10b981" />
              <circle cx="260" cy="150" r="5.5" fill="#10b981" />
              <circle cx="260" cy="150" r="12" stroke="#10b981" strokeOpacity="0.4" />
              <circle cx="345" cy="100" r="4.5" fill="#10b981" />
              <circle cx="435" cy="45" r="5.5" fill="#10b981" />
              <circle cx="435" cy="45" r="11" stroke="#10b981" strokeOpacity="0.4" />
            </svg>

            <div className="problems-hud-tag">
              <div className="hud-tag-accent" />
              <div className="hud-tag-icon">
                <TriangleAlert size={14} strokeWidth={2.4} />
              </div>
              <div className="hud-tag-text">
                <span className="hud-tag-title">ROAD CONDITION</span>
                <span className="hud-tag-sub">Rough Ahead</span>
              </div>
            </div>
          </div>
        </div>

        <div className="problem-cards-grid">
          {challengeCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className={`challenge-card challenge-card--${card.kind} reveal`}>
                <div className="challenge-card-backdrop">
                  <img src={card.image} alt={card.title} className="challenge-backdrop-photo" />
                  <div className="challenge-backdrop-mist" />
                  <div className="challenge-backdrop-topography" />
                  <div className="challenge-partition-orb" aria-hidden="true" />
                </div>

                <div className="challenge-card-content">
                  <div className="challenge-meta-row">
                    <span className="challenge-index">{card.no} / SIGNAL</span>
                    <span className={`challenge-tag tag--${card.kind}`}>{card.tag}</span>
                  </div>

                  <div className="challenge-icon-wrap">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>

                  <h3 className="challenge-title">{card.title}</h3>
                  <p className="challenge-desc">{card.desc}</p>
                </div>

                <div className="challenge-card-bottom">
                  <button className="challenge-action-btn" type="button" aria-label={`Inspect ${card.title}`}>
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
