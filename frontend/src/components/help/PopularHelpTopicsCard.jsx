import React, { useState } from 'react';
import {
  Package,
  FileText,
  Truck,
  Receipt,
  CreditCard,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { popularHelpTopics } from '../../data/helpSupportData';

export default function PopularHelpTopicsCard({ onSelectTopic }) {
  const [expandedId, setExpandedId] = useState(null);

  const getTopicIcon = (iconName) => {
    switch (iconName) {
      case 'package-search':
        return <Package className="w-4 h-4" />;
      case 'file-text':
        return <FileText className="w-4 h-4" />;
      case 'truck':
        return <Truck className="w-4 h-4" />;
      case 'receipt':
        return <Receipt className="w-4 h-4" />;
      case 'credit-card':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight leading-snug mb-4">
          Popular Help Topics
        </h2>

        {/* 5 Topic Rows */}
        <div className="divide-y divide-slate-100">
          {popularHelpTopics.map((topic) => {
            const isExpanded = expandedId === topic.id;

            return (
              <div key={topic.id} className="py-3 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => toggleExpand(topic.id)}
                  className="w-full flex items-center justify-between gap-3 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-200/60 ${topic.iconColor}`}
                    >
                      {getTopicIcon(topic.icon)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {topic.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                        {topic.subtitle}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-300 group-hover:text-slate-600 flex-shrink-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Expandable answer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 pr-4 pt-2 text-xs text-slate-600 font-medium leading-relaxed bg-slate-50/70 p-3 rounded-xl mt-2 border border-slate-100">
                        {topic.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Link */}
      <div className="pt-4 border-t border-slate-100 flex items-center mt-4">
        <button
          type="button"
          onClick={() => onSelectTopic && onSelectTopic('all')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <span>View All Help Articles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
