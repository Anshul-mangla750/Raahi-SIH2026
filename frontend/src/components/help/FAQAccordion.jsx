import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqList } from '../../data/helpSupportData';

export default function FAQAccordion({ searchQuery }) {
  const [openId, setOpenId] = useState('faq-1');

  const filteredFaqs = faqList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
    );
  });

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D7A48] border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight leading-snug">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-tight">
              Quick answers to the most common questions about the RAAHI platform.
            </p>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-slate-100 mt-2">
          {filteredFaqs.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching questions found. Try searching with different keywords.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div key={faq.id} className="py-3">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex items-center justify-between gap-3 text-left transition-colors cursor-pointer group"
                  >
                    <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-1 rounded-lg text-slate-400 group-hover:text-slate-600 flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-slate-500 font-medium leading-relaxed pt-2 pb-1 pr-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
