import React from 'react';

export function SignalBars({ color = "green" }) {
  return (
    <div className={`signal-meter ${color}`} aria-hidden="true">
      <span className="signal-bar animate-pulse" style={{ animationDelay: "0ms" }} />
      <span className="signal-bar animate-pulse" style={{ animationDelay: "150ms" }} />
      <span className="signal-bar animate-pulse" style={{ animationDelay: "300ms" }} />
      <span className="signal-bar animate-pulse" style={{ animationDelay: "450ms" }} />
    </div>
  );
}
