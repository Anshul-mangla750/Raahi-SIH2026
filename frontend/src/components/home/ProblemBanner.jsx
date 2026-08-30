import React from 'react';

export function ProblemBanner() {
  return (
    <section className="ner-problem-banner">
      <div className="container ner-banner-inner">
        <div className="ner-banner-eyebrow">
          <span className="ner-badge">NER CHALLENGE</span>
          <span className="ner-eyebrow-text">Northeast India Logistics Intelligence Initiative</span>
        </div>
        <p className="ner-banner-text">
          The North Eastern Region faces major logistics challenges due to difficult terrain, extreme weather, limited connectivity, and frequent road disruptions from landslides &amp; floods — leading to supply shortages, increased costs, and disruption in public service delivery.
        </p>
        <div className="ner-challenge-chips">
          <span className="ner-chip ner-chip--warn">Landslides &amp; Floods</span>
          <span className="ner-chip ner-chip--geo">Remote Terrain</span>
          <span className="ner-chip ner-chip--info">Information Gaps</span>
          <span className="ner-chip ner-chip--supply">Supply Disruptions</span>
          <span className="ner-chip ner-chip--infra">Infrastructure Gaps</span>
        </div>
      </div>
    </section>
  );
}

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
