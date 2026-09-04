import React from 'react';

export const FloodHouseIcon = ({ size = 32, color = '#DC2626', fillWaves = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* House Roof and Chimney */}
      <path
        d="M16 3.5L4.5 13H7.5V19H24.5V13H27.5L16 3.5Z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* House Door */}
      <path
        d="M13 19V14.5H19V19"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Upper Water Wave */}
      <path
        d="M3.5 22.5C6 21 9 21 11.5 22.5C14 24 17 24 19.5 22.5C22 21 25 21 27.5 22.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Lower Water Wave */}
      <path
        d="M3.5 26.5C6 25 9 25 11.5 26.5C14 28 17 28 19.5 26.5C22 25 25 25 27.5 26.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
