import React from 'react';

export function SectionIntro({ eyebrow, children, className = "" }) {
  return (
    <div className={`section-intro reveal ${className}`}>
      <div className="eyebrow">{eyebrow}</div>
      {children}
    </div>
  );
}

export function IntroSection() {
  return (
    <section className="section intro texture">
      <div className="container intro-grid">
        <SectionIntro eyebrow="The road is a living system">
          <h2 className="display-heading">
            Predict every disruption.<br />
            <span className="accent">Navigate every corridor</span><br />
            with confidence.
          </h2>
        </SectionIntro>
        <div className="intro-note reveal">
          <strong>CORRIDOR INTELLIGENCE / 01</strong>
          RAAHI is an AI-enabled logistics intelligence system tailored for the unique geographical and operational challenges of Northeast India — delivering real-time visibility, route accessibility, and predictive disruption alerts.
          <div className="signal-rail">Connected to the corridor</div>
        </div>
      </div>
    </section>
  );
}
