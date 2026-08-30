import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../common/Logo';
import AuthNetworkStatus from './AuthNetworkStatus';
import AuthFeatureHighlights from './AuthFeatureHighlights';
import AuthStatsCard from './AuthStatsCard';
import heroBg from '../../assets/hero-bg.jpeg';

export default function AuthBranding() {
  return (
    <div className="relative h-full min-h-screen lg:min-h-0 flex flex-col justify-between p-6 sm:p-8 lg:p-8 overflow-hidden bg-slate-950 select-none">
      {/* Scenic Mountain & Highway Logistics Background Image */}
      <img
        src={heroBg}
        alt="Northeast Logistics Map & Highway"
        className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 pointer-events-none z-0"
      />

      {/* Subtle Dark Readability Overlay - Preserves the rich mountain road image while ensuring sharp text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-950/50 pointer-events-none z-[1]" />

      {/* SVG Glowing Route Lines Layer */}
      {/* <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 600" fill="none" preserveAspectRatio="none"> */}
        {/* Green Safe Route (originates near truck road and leads up to green destination marker) */}
        {/* <path
          d="M 210 510 C 240 430, 270 350, 310 280 C 340 220, 390 180, 440 135"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeDasharray="6 4"
          className="route-dash-animated"
        /> */}
        {/* Yellow/Orange Risky Route (branches off to orange marker) */}
        {/* <path
          d="M 310 280 C 290 250, 260 240, 225 235"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeDasharray="5 4"
        /> */}
        {/* Red Blocked Route (branches to red marker) */}
        {/* <path
          d="M 310 280 C 340 300, 380 310, 420 295"
          stroke="#EF4444"
          strokeWidth="3.5"
          strokeDasharray="5 4"
        />
      </svg>

      {/* Route Location Pin Markers */}
      {/* Green Destination Pin */}
      {/* <div className="absolute top-[22%] left-[73%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="relative flex items-center justify-center">
          <span className="absolute -inset-1 bg-emerald-500 rounded-full animate-ping opacity-70" />
          <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold">
            📍
          </div>
        </div>
      </div> */}

      {/* Orange Risky Pin */}
      {/* <div className="absolute top-[39%] left-[37%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="w-5 h-5 rounded-full bg-amber-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-[9px]">
          📍
        </div>
      </div> */}

      {/* Red Blocked Pin */}
      {/* <div className="absolute top-[49%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="w-5 h-5 rounded-full bg-rose-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[9px]">
          📍
        </div>
      </div> */}

      {/* Top Left: Logo */}
      <div className="relative z-20">
        <Logo darkBg={true} />
      </div>

      {/* Middle Content Section */}
      <div className="relative z-20 my-4 space-y-4 max-w-xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-0.5"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-black text-white tracking-tight leading-[1.1]">
            Smarter Routes.
          </h1>
          <h1 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-black text-white tracking-tight leading-[1.1]">
            Safer Deliveries.
          </h1>
          <h1 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-black text-emerald-400 tracking-tight leading-[1.1]">
            Stronger Northeast.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs sm:text-xs text-slate-200 leading-relaxed font-medium max-w-lg"
        >
          AI-powered logistics intelligence platform that monitors accessibility, predicts disruptions and optimizes movement of essential goods across the North Eastern Region.
        </motion.p>

        {/* Live Network Status & 4 Feature Highlights */}
        <div className="space-y-3.5 pt-1">
          <AuthNetworkStatus />
          <AuthFeatureHighlights />
        </div>
      </div>

      {/* Bottom Floating Stats Card */}
      <div className="relative z-20 pt-2">
        <AuthStatsCard />
      </div>
    </div>
  );
}
