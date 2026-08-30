import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const ASSETS = {
  mountains: "/northeast-mountains.jpg",
};

export function NortheastSection() {
  return (
    <section id="northeast" className="section northeast">
      <img className="northeast-media" src={ASSETS.mountains} alt="Winding mountain corridor in a forest landscape" />
      <svg className="northeast-route" viewBox="0 0 500 300" aria-hidden="true">
        <path d="M20 260 C90 180 115 228 168 146 S278 40 327 105 S392 198 480 32" />
        <circle cx="20" cy="260" r="3" />
        <circle cx="168" cy="146" r="3" />
        <circle cx="327" cy="105" r="3" />
        <circle cx="480" cy="32" r="3" />
      </svg>
      <div className="container northeast-content">
        <div className="eyebrow reveal">A platform with a point of view</div>
        <h2 className="northeast-heading reveal">Built for the roads<br /><em>others find difficult.</em></h2>
        <p className="northeast-copy reveal">From steep mountain corridors to landslide-prone roads, RAAHI is engineered around the ground realities of Northeast India — 8 states, 122+ districts, and thousands of kilometres of challenging terrain.</p>
        <div className="northeast-pills reveal">
          <span className="ne-pill-item">8 NE States</span>
          <span className="ne-pill-item">Arunachal Pradesh</span>
          <span className="ne-pill-item">Assam</span>
          <span className="ne-pill-item">Manipur</span>
          <span className="ne-pill-item">Meghalaya</span>
          <span className="ne-pill-item">Mizoram</span>
          <span className="ne-pill-item">Nagaland</span>
          <span className="ne-pill-item">Sikkim</span>
          <span className="ne-pill-item">Tripura</span>
        </div>
      </div>
    </section>
  );
}

export function CtaSection({ onOpenLogin }) {
  return (
    <section id="cta" className="section cta texture-dark">
      <div className="container cta-inner">
        <div className="cta-left">
          <div className="eyebrow reveal" style={{ color: "#b2e8c2" }}>The next route is yours</div>
          <h2 className="cta-heading reveal">Make every route<br />smarter.</h2>
          <p className="cta-copy reveal">Turn uncertainty into visibility, disruption into decisions, and distance into dependable delivery. RAAHI is the AI-powered logistics backbone that NER deserves.</p>
          <div className="cta-actions reveal">
            <button
              type="button"
              className="btn btn-light cursor-pointer flex items-center gap-2"
              onClick={onOpenLogin}
            >
              <span>Access the Platform</span>
              <ArrowRight size={15} />
            </button>
            <a className="btn btn-ghost" href="#platform">Explore Features <ChevronDown size={15} /></a>
          </div>
        </div>
        <div className="cta-right reveal">
          <div className="cta-stat-box">
            <div className="cta-stat-item">
              <span className="cta-stat-big">94%</span>
              <span className="cta-stat-desc">Disruption prediction accuracy</span>
            </div>
            <div className="cta-stat-sep" />
            <div className="cta-stat-item">
              <span className="cta-stat-big">3.2×</span>
              <span className="cta-stat-desc">Faster rerouting vs manual</span>
            </div>
            <div className="cta-stat-sep" />
            <div className="cta-stat-item">
              <span className="cta-stat-big">18 min</span>
              <span className="cta-stat-desc">Avg. alert-to-action time</span>
            </div>
          </div>
        </div>
      </div>
      <div className="truck-line" aria-hidden="true" />
    </section>
  );
}
