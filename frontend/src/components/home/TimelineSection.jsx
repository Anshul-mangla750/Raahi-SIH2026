import React from 'react';

const steps = [
  ['01', 'COLLECT', 'Road, weather, traffic, GPS and field data.'],
  ['02', 'ANALYZE', 'AI identifies route risks and accessibility changes.'],
  ['03', 'OPTIMIZE', 'RAAHI calculates smarter and safer routes.'],
  ['04', 'DELIVER', 'Drivers and logistics teams act with real-time intelligence.'],
];

export function TimelineSection() {
  return (
    <section id="how-it-works" className="section timeline texture">
      <div className="container">
        <div className="timeline-top reveal">
          <div>
            <div className="eyebrow">How it works</div>
            <h2 className="timeline-heading">
              From signal<br />to <span style={{ color: "#087f4d" }}>delivery.</span>
            </h2>
          </div>
          <p>RAAHI moves with the rhythm of your network—from the first field report to the final handoff.</p>
        </div>
        <div className="steps">
          <div className="steps-spine" />
          {steps.map(([no, title, copy]) => (
            <div className="step reveal" key={title}>
              <div className="step-marker">{no}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
