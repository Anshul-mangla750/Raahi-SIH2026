import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CloudLightning, Cpu, Users } from 'lucide-react';
import { infoStripItems } from '../../data/landingData';

export default function InfoStrip() {
  const getIcon = (icon) => {
    switch (icon) {
      case 'shield-check':
        return <ShieldCheck className="w-8 h-8 text-white stroke-[1.5]" />;
      case 'cloud-data':
        return <CloudLightning className="w-8 h-8 text-white stroke-[1.5]" />;
      case 'cpu-ai':
        return <Cpu className="w-8 h-8 text-white stroke-[1.5]" />;
      case 'users-group':
        return <Users className="w-8 h-8 text-white stroke-[1.5]" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-white stroke-[1.5]" />;
    }
  };

  return (
    <section className="bg-[#0A1D37] text-white py-6 border-y border-[#162C4E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/50">
          {infoStripItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4 py-3 sm:py-2 px-3 sm:px-6 first:pl-0 last:pr-0 group"
            >
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:scale-105 transition-all">
                {getIcon(item.icon)}
              </div>

              <div className="flex flex-col">
                <h2 className="text-sm sm:text-[15px] font-bold text-white tracking-tight">
                  {item.title}
                </h2>
                <p className="text-xs text-slate-300 font-normal leading-snug mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
