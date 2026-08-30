import React from 'react';
import { Search, Package, FileText, User, Truck, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { helpCategoryPills } from '../../data/helpSupportData';

export default function HelpSearchBarAndCategories({ searchQuery, onSearchChange, onSelectCategory }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'package-search':
        return <Package className="w-5 h-5" />;
      case 'file-text':
        return <FileText className="w-5 h-5" />;
      case 'user':
        return <User className="w-5 h-5" />;
      case 'truck':
        return <Truck className="w-5 h-5" />;
      case 'settings':
        return <Settings className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 flex flex-col justify-between h-full">
      {/* Title */}
      <div>
        <h2 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight leading-snug mb-3">
          How can we help you today?
        </h2>

        {/* Large Search Input with Icon */}
        <div className="relative w-full mb-5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for help articles, topics or keywords..."
            className="w-full pl-4 pr-11 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-all"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* Horizontal Row of 5 Help Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {helpCategoryPills.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -2 }}
              onClick={() => onSelectCategory(cat.id)}
              className="p-3 sm:p-3.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-white hover:border-emerald-200 hover:shadow-2xs transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              {/* Circular Icon Container */}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center border mb-2.5 transition-transform group-hover:scale-105 ${cat.iconBg}`}
              >
                {getIcon(cat.icon)}
              </div>

              {/* Title */}
              <span className="text-xs font-black text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                {cat.title}
              </span>

              {/* Subtitle */}
              <span className="text-[10px] text-slate-400 font-medium leading-tight mt-1">
                {cat.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
