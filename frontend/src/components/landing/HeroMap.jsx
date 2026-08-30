import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, AlertTriangle, ArrowRight, Truck } from 'lucide-react';
import heroBg from '../../assets/hero-bg.jpeg';
import { nerStates } from '../../data/landingData';

export default function HeroMap() {
  return (
    <div className="relative w-full max-w-[620px] mx-auto lg:max-w-none aspect-[1/1] sm:aspect-[1.05/1] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group select-none">
      {/* Background Graphic: Mountains + 3D Northeast India Map + Highway Truck */}
      <img
        src={heroBg}
        alt="NER LogiSmart Logistics Map and Freight Corridor"
        className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
      />

      {/* Subtle Dark Vignette & Atmospheric Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-900/30 pointer-events-none" />

      {/* SVG Layer for Real-Time Corridor Lines, Glows, and Node Pins */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600" fill="none">
        <defs>
          <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Green Safe Route (Western Corridor: Guwahati -> Meghalaya -> Silchar) --- */}
        <path
          d="M 320 220 C 350 190, 420 160, 470 95"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#glow-green)"
        />
        <path
          d="M 320 220 C 340 270, 390 290, 430 330"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#glow-green)"
        />

        {/* --- Orange At-Risk Route (Central/Upper Assam -> Nagaland) --- */}
        <path
          d="M 470 95 C 450 140, 420 180, 390 220"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="5 4"
          filter="url(#glow-orange)"
        />

        {/* --- Red Disrupted/Blocked Route (Haflong / NH-13A Corridor) --- */}
        <path
          d="M 390 220 C 400 250, 410 270, 435 295"
          stroke="#EF4444"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow-red)"
        />

        {/* Interconnected secondary feeder routes */}
        <path
          d="M 320 220 C 300 240, 330 310, 350 360"
          stroke="#34D399"
          strokeWidth="2"
          strokeDasharray="3 3"
          opacity="0.8"
        />
        <path
          d="M 390 220 C 360 250, 370 320, 410 390"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="3 3"
          opacity="0.7"
        />
      </svg>

      {/* Dynamic Interactive Pin Markers on Map */}
      {/* 1. Green Vehicle/Route Pin */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[28%] left-[69%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group/pin z-20"
      >
        <div className="relative">
          <span className="absolute -inset-1 bg-emerald-500 rounded-full animate-ping opacity-60" />
          <div className="relative w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
            <Truck className="w-4 h-4" />
          </div>
        </div>
      </motion.div>

      {/* 2. Orange Warning Pin */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[37%] left-[64%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer z-20"
      >
        <div className="relative">
          <span className="absolute -inset-1 bg-amber-500 rounded-full animate-pulse opacity-50" />
          <div className="relative w-7 h-7 rounded-full bg-amber-500 border-2 border-white shadow-lg flex items-center justify-center text-white">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        </div>
      </motion.div>

      {/* 3. Red Blocked/Danger Pin */}
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[38%] left-[73%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer z-20"
      >
        <div className="relative">
          <span className="absolute -inset-1.5 bg-rose-600 rounded-full animate-ping opacity-70" />
          <div className="relative w-7 h-7 rounded-full bg-rose-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
            <div className="w-3 h-0.5 bg-white rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* State Location Tag Pills */}
      {nerStates.map((st) => (
        <div
          key={st.name}
          style={{ top: st.y, left: st.x }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:block"
        >
          <span className="px-2 py-0.5 rounded-md bg-white/80 backdrop-blur-md text-[10px] font-bold text-slate-800 tracking-tight shadow-md border border-white/60">
            {st.name}
          </span>
        </div>
      ))}

      {/* 1. TOP-LEFT: Network Status Card */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-3 left-3 sm:top-5 sm:left-5 z-30 bg-[#0c1c33]/92 backdrop-blur-md border border-slate-700/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl text-white w-44 sm:w-52"
      >
        <div className="text-[11px] sm:text-xs font-bold text-slate-300 tracking-tight mb-2.5">
          Network Status
        </div>
        <div className="flex items-center gap-3">
          {/* Donut Chart */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="14" fill="transparent" stroke="#1e293b" strokeWidth="4.5" />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="transparent"
                stroke="#10B981"
                strokeWidth="4.5"
                strokeDasharray="60 100"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="transparent"
                stroke="#F59E0B"
                strokeWidth="4.5"
                strokeDasharray="18 100"
                strokeDashoffset="-60"
                strokeLinecap="round"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="transparent"
                stroke="#EF4444"
                strokeWidth="4.5"
                strokeDasharray="10 100"
                strokeDashoffset="-78"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Legend Details */}
          <div className="flex flex-col space-y-1 text-[10px] sm:text-[11px] font-medium">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Open
              </span>
              <span className="font-bold text-slate-200">68%</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> At Risk
              </span>
              <span className="font-bold text-slate-200">21%</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Blocked
              </span>
              <span className="font-bold text-slate-200">11%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. TOP-RIGHT: Weather Card */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 bg-[#0c1c33]/92 backdrop-blur-md border border-slate-700/60 rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xl text-white flex items-center gap-3"
      >
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 flex-shrink-0">
          <CloudRain className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm sm:text-base font-extrabold text-white leading-none">23°C</span>
          <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium mt-0.5">Light Rain</span>
          <span className="text-[9px] sm:text-[10px] text-slate-400">Guwahati</span>
        </div>
      </motion.div>

      {/* 3. MIDDLE-RIGHT: Active Vehicles Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute top-[47%] right-3 sm:right-5 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md border border-white/80 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 shadow-xl flex items-center gap-3 sm:gap-4 max-w-[200px]"
      >
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-tight">Active Vehicles</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">317</span>
          <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 mt-0.5">On the move</span>
        </div>
        <div className="w-14 sm:w-16 flex-shrink-0 flex items-center justify-center">
          <div className="w-12 h-10 bg-slate-100 rounded-lg p-1 border border-slate-200/60 flex items-center justify-center shadow-2xs">
            <Truck className="w-8 h-8 text-[#1E3A8A]" />
          </div>
        </div>
      </motion.div>

      {/* 4. BOTTOM-RIGHT: High Risk Alert Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-4 right-3 sm:bottom-6 sm:right-6 z-30 bg-[#0f1f38]/95 backdrop-blur-md border border-rose-500/30 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-2xl text-white max-w-[230px] sm:max-w-[270px]"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 flex-shrink-0">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-rose-400">High Risk Alert</span>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-300 leading-snug font-normal">
          Landslide risk predicted on NH-13A (Haflong Section)
        </p>
        <a
          href="#alert-details"
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-sky-400 font-semibold hover:text-sky-300 mt-2.5 group/link transition-colors"
        >
          View Details
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </div>
  );
}
