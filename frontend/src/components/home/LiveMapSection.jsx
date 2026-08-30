import React from 'react';
import { NortheastMap } from '../NortheastMap';

export function LiveMapSection() {
  return (
    <section id="intelligence" className="section route-section texture-dark">
      <div className="container">
        <div className="route-header reveal">
          <div>
            <div className="eyebrow">Route intelligence / live map</div>
            <h2 className="route-heading">See the route.<br /><em>Read the risk.</em></h2>
          </div>
          <p className="route-copy">
            A real interactive map of Northeast India corridors with live green, yellow, and red status lines, moving freight vehicles, and instant disruption intelligence. Click routes or legend to inspect.
          </p>
        </div>
        <div className="route-stage reveal">
          <NortheastMap />
        </div>
      </div>
    </section>
  );
}
