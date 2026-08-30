import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LayoutDashboard, Play } from 'lucide-react';
import HeroMap from './HeroMap';
import FeatureHighlights from './FeatureHighlights';

export default function Hero() {
  return (
    <section id="home" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-white">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col space-y-6 sm:space-y-7"
          >
            {/* AI Platform Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] sm:text-xs font-extrabold tracking-wider uppercase">
                  AI-POWERED LOGISTICS INTELLIGENCE PLATFORM
                </span>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-1 sm:space-y-1.5">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-black text-[#0B1E36] tracking-tight leading-[1.08]">
                Smarter Routes.
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-black text-[#0B1E36] tracking-tight leading-[1.08]">
                Safer Deliveries.
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-black text-emerald-600 tracking-tight leading-[1.08]">
                Stronger Northeast.
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-[15px] lg:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
              NER LogiSmart uses AI, real-time data and GIS intelligence to monitor accessibility, predict disruptions, and optimize logistics across the North Eastern Region.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <motion.a
                href="#dashboard"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-lg shadow-emerald-700/20 transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Explore Dashboard</span>
              </motion.a>

              <motion.a
                href="#features"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold border border-slate-300 shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-slate-700 fill-slate-700" />
                <span>Learn More</span>
              </motion.a>
            </div>

            {/* 5 Feature Quick Highlights */}
            <div className="pt-2 border-t border-slate-100">
              <FeatureHighlights />
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Map Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-6 xl:col-span-6"
          >
            <HeroMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
