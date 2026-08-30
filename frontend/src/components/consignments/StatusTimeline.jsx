import React from 'react';
import { Check, Truck, Clock } from 'lucide-react';

export default function StatusTimeline({ timeline }) {
  const renderIcon = (item) => {
    if (item.status === 'completed') {
      return (
        <div className="w-5.5 h-5.5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      );
    }

    if (item.status === 'current') {
      let bg = 'bg-emerald-600';
      if (item.currentColor === 'blue') bg = 'bg-blue-600';
      if (item.currentColor === 'orange') bg = 'bg-orange-500';

      return (
        <div className={`w-5.5 h-5.5 rounded-full ${bg} text-white flex items-center justify-center shadow-xs ring-4 ring-slate-100`}>
          {item.currentIcon === 'clock' ? (
            <Clock className="w-3 h-3 stroke-[2.5]" />
          ) : (
            <Truck className="w-3 h-3 stroke-[2.5]" />
          )}
        </div>
      );
    }

    // Upcoming / future
    return (
      <div className="w-5.5 h-5.5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center" />
    );
  };

  return (
    <div className="w-full max-w-[280px] select-none">
      {/* Node Icons + Connecting Lines */}
      <div className="flex items-center w-full">
        {timeline.map((item, idx) => {
          const isLast = idx === timeline.length - 1;
          const nextItem = timeline[idx + 1];
          const lineCompleted = item.status === 'completed' && nextItem && (nextItem.status === 'completed' || nextItem.status === 'current');

          return (
            <React.Fragment key={item.step}>
              {/* Step Node */}
              <div className="flex items-center justify-center flex-shrink-0 relative z-10">
                {renderIcon(item)}
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div
                  className={`h-0.5 flex-1 mx-1 ${
                    lineCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Labels below nodes */}
      <div className="flex justify-between w-full mt-1.5 text-center">
        {timeline.map((item) => (
          <div key={item.step} className="flex flex-col items-center w-14 flex-shrink-0">
            <span
              className={`text-[9px] sm:text-[10px] font-bold leading-tight ${
                item.status === 'upcoming' ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              {item.step}
            </span>
            <span className="text-[9px] font-semibold text-slate-400 leading-tight mt-0.5">
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
