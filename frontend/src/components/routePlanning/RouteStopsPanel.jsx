import React, { useState } from 'react';
import { Plus, Trash2, X, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RouteStopsPanel({ stops, onAddStop, onRemoveStop, onClearAll, onReorderStops }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const getMarkerStyle = (status) => {
    switch (status) {
      case 'start':
      case 'stop-green':
        return 'bg-[#0D7A48] text-white';
      case 'stop-blue':
        return 'bg-[#2563EB] text-white';
      case 'destination':
        return 'bg-[#EF4444] text-white';
      default:
        return 'bg-[#0D7A48] text-white';
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newStops = [...stops];
    const draggedItem = newStops[draggedIndex];
    newStops.splice(draggedIndex, 1);
    newStops.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    onReorderStops(newStops);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-sm sm:text-base font-black text-[#0B1E36] tracking-tight">
            Route Stops
          </h3>
          <span className="text-xs font-bold text-emerald-600">
            {stops.length} Stops
          </span>
        </div>

        {/* Stops Vertical Timeline */}
        <div className="relative space-y-4">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[13px] top-3 bottom-4 w-0.5 bg-slate-200 z-0" />

          <AnimatePresence>
            {stops.map((stop, index) => (
              <motion.div
                key={stop.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative flex items-center justify-between gap-3 p-1.5 rounded-xl transition-all cursor-grab active:cursor-grabbing hover:bg-slate-50/80 group ${
                  draggedIndex === index ? 'opacity-50 bg-slate-100' : ''
                }`}
              >
                {/* Left: Marker + Stop Information */}
                <div className="flex items-center gap-3 min-w-0 z-10">
                  {/* Circular Numbered Node */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-xs flex-shrink-0 ${getMarkerStyle(
                      stop.status
                    )}`}
                  >
                    {index + 1}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {stop.name}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {stop.type}
                    </span>
                  </div>
                </div>

                {/* Right: Timestamp + Remove Button */}
                <div className="flex items-center gap-2 flex-shrink-0 z-10">
                  <span className="text-[11px] font-bold text-slate-400">
                    {stop.time}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveStop(stop.id)}
                    className="w-5 h-5 rounded-md hover:bg-rose-50 text-slate-300 hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer"
                    title="Remove Stop"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons: Add Stop & Clear All */}
        <div className="grid grid-cols-2 gap-2.5 mt-5 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onAddStop}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>Add Stop</span>
          </button>

          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shadow-2xs cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Informational Box */}
      <div className="mt-4 p-3 rounded-xl bg-[#F0F5FF] border border-blue-100/80 flex items-center gap-2.5 text-xs text-slate-600 font-medium">
        <div className="p-1 rounded bg-white text-blue-600 border border-blue-200/60 flex-shrink-0">
          <GripVertical className="w-3.5 h-3.5" />
        </div>
        <span>You can reorder stops by dragging them up or down.</span>
      </div>
    </div>
  );
}
