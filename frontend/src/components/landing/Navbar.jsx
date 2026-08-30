import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navLinks } from '../../data/landingData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  const languages = ['English', 'Assamese (অসমীয়া)', 'Bengali (বাংলা)', 'Hindi (हिन्दी)', 'Bodo (बड़ो)'];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            {/* Custom Mountain & Road Brand Icon */}
            <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 shadow-sm group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background mountain peak */}
                <path d="M20 7L33 29H7L20 7Z" fill="#059669" />
                {/* Secondary green gradient peak */}
                <path d="M20 7L28 29H12L20 7Z" fill="#10B981" fillOpacity="0.85" />
                {/* Snow cap highlight */}
                <path d="M20 7L23 13H17L20 7Z" fill="#D1FAE5" />
                {/* River / Highway winding road in deep navy */}
                <path 
                  d="M10 29C15 24 17 27 24 22C28 19 31 29 31 29" 
                  stroke="#1E3A8A" 
                  strokeWidth="3.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline tracking-tight">
                <span className="text-2xl font-extrabold text-[#0B1E36] tracking-tight">NER Logi</span>
                <span className="text-2xl font-extrabold text-emerald-600 tracking-tight">Smart</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium tracking-tight -mt-0.5">
                Smart Logistics. Stronger Northeast.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-sm font-semibold transition-colors duration-200 py-1 ${
                  link.active
                    ? 'text-emerald-600'
                    : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                {link.name}
                {link.active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-emerald-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all shadow-2xs focus:outline-none cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{selectedLang}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setSelectedLang(lang.split(' ')[0]);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer ${
                          selectedLang === lang.split(' ')[0] ? 'text-emerald-600 bg-emerald-50/60 font-semibold' : 'text-slate-600'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login / Sign Up Button -> Navigates to /login */}
            <Link to="/login">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2 rounded-lg bg-[#1E3A8A] hover:bg-[#172e6d] text-white text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center"
              >
                Login/Sign Up
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white px-5 py-5 space-y-4 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold py-1.5 transition-colors ${
                    link.active ? 'text-emerald-600 font-bold' : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
              {/* Language selection in mobile */}
              <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                <span className="flex items-center gap-1.5 font-medium">
                  <Globe className="w-3.5 h-3.5 text-slate-500" /> Language:
                </span>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="bg-transparent text-emerald-600 font-semibold focus:outline-none"
                >
                  {languages.map((l) => (
                    <option key={l} value={l.split(' ')[0]}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Login Button */}
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-[#1E3A8A] text-white text-xs font-bold text-center shadow-sm block"
              >
                Login/Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
