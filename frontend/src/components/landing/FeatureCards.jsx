import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Brain, GitFork, Truck, BellRing, Smartphone } from 'lucide-react';
import { featureCards } from '../../data/landingData';

export default function FeatureCards() {
  const getIcon = (icon) => {
    switch (icon) {
      case 'map-pin':
        return (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-emerald-600">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current stroke-current" fill="none" strokeWidth="1.5">
              <circle cx="12" cy="7" r="3" />
              <path d="M12 21s-6-5.333-6-10a6 6 0 0 1 12 0c0 4.667-6 10-6 10z" />
            </svg>
          </div>
        );
      case 'brain':
        return (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-600">
            <Brain className="w-8 h-8 stroke-[1.8]" />
          </div>
        );
      case 'route-curved':
        return (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-purple-600">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="19" r="2" />
              <path d="M8 19h4a4 4 0 0 0 4-4v-6a4 4 0 0 1 4-4h2" />
              <polyline points="19 2 22 5 19 8" />
            </svg>
          </div>
        );
      case 'truck-solid':
        return (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-amber-500">
            <Truck className="w-8 h-8 stroke-[1.8]" />
          </div>
        );
      case 'bell-alert':
        return (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-rose-500">
            <BellRing className="w-8 h-8 stroke-[1.8]" />
          </div>
        );
      case 'mobile-app':
        return (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-teal-600">
            <Smartphone className="w-8 h-8 stroke-[1.8]" />
          </div>
        );
      default:
        return <MapPin className="w-8 h-8 text-emerald-600" />;
    }
  };

  return (
    <section id="features" className="py-16 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36] tracking-tight">
            Everything You Need, In One Platform
          </h2>
          <div className="w-14 h-1 bg-emerald-500 rounded-full mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {featureCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`rounded-2xl p-5 sm:p-6 ${card.theme.bg} border ${card.theme.border} ${card.theme.hoverBorder} shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group`}
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                {getIcon(card.icon)}
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-extrabold text-[#0B1E36] leading-snug mb-2 group-hover:text-emerald-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-[12px] text-slate-500 font-normal leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
