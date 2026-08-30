import React from 'react';

export function RaahiLogoMark() {
  return (
    <div className="flex items-center gap-2.5 shrink-0 select-none">
      <img
        src="/raahi-logo.jpg"
        alt="RAAHI - Track Navigate Deliver"
        className="rounded-lg shadow-sm border border-slate-200/80 shrink-0"
        style={{
          width: '36px',
          height: '36px',
          minWidth: '36px',
          minHeight: '36px',
          maxWidth: '36px',
          maxHeight: '36px',
          objectFit: 'cover'
        }}
      />
      <div className="flex flex-col justify-center">
        <span className="font-black text-[1.2rem] tracking-[0.12em] text-[#0b3323] leading-none font-sans">RAAHI</span>
      </div>
    </div>
  );
}

