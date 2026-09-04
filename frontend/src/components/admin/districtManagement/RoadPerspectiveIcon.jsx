import React from 'react';

export const RoadPerspectiveIcon = ({ size = 24, color = '#16A34A' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Left Road Border */}
      <path
        d="M6 20L9 4"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Right Road Border */}
      <path
        d="M18 20L15 4"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Dashed Center Lane */}
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="11"
        x2="12"
        y2="14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="17"
        x2="12"
        y2="20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const RoadBarrierIcon = ({ size = 24, color = '#D97706' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Left Road Border */}
      <path
        d="M6 20L9 4"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Right Road Border */}
      <path
        d="M18 20L15 4"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Horizontal Warning Gate / Barrier */}
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Center Lane marks */}
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="8"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="16"
        x2="12"
        y2="19"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};
