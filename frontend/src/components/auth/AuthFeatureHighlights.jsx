import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Brain, GitFork, Truck } from 'lucide-react';
import { authFeatures } from '../../data/authData';

export default function AuthFeatureHighlights() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'radio':
        return <Radio className="w-5 h-5 text-white stroke-[2]" />;
      case 'brain':
        return <Brain className="w-5 h-5 text-white stroke-[2]" />;
      case 'route':
        return <GitFork className="w-5 h-5 text-white rotate-90 stroke-[2]" />;
      case 'truck':
        return <Truck className="w-5 h-5 text-white stroke-[2]" />;
      default:
        return <Radio className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="flex flex-col space-y-3.5 max-w-md">
      {authFeatures.map((feature, idx) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
          className="flex items-center gap-3.5 group cursor-default"
        >
          {/* Rounded Square Colored Icon */}
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${feature.bg} group-hover:scale-105 transition-transform duration-200`}
          >
            {getIcon(feature.icon)}
          </div>

          {/* Title & Description */}
          <div className="flex flex-col">
            <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
              {feature.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-200/90 font-normal leading-tight mt-0.5">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
