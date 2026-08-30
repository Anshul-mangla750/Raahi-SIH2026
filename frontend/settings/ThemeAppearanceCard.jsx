import React, { useState } from 'react';
import { Palette, Sun, Moon, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeAppearanceCard({ onThemeChange, onColorChange }) {
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedColor, setSelectedColor] = useState('#0D7A48');

  const colors = [
    { id: 'green', hex: '#0D7A48', name: 'Green' },
    { id: 'blue', hex: '#2563EB', name: 'Blue' },
    { id: 'purple', hex: '#7C3AED', name: 'Purple' },
    { id: 'orange', hex: '#EA580C', name: 'Orange' },
    { id: 'red', hex: '#DC2626', name: 'Red' },
  ];

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
    if (onThemeChange) onThemeChange(theme);
  };

  const handleSelectColor = (hex) => {
    setSelectedColor(hex);
    if (onColorChange) onColorChange(hex);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D7A48] border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B1E36] tracking-tight leading-snug">
              Theme & Appearance
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-tight">
              Customize the look and feel of your dashboard.
            </p>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="space-y-2 mt-2">
          <span className="text-[11px] font-bold text-slate-500 block">Theme</span>
          <div className="grid grid-cols-2 gap-3">
            {/* Light */}
            <button
              type="button"
              onClick={() => handleSelectTheme('light')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                selectedTheme === 'light'
                  ? 'border-[#0D7A48] bg-emerald-50/50 text-[#0D7A48] shadow-2xs'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Light</span>
            </button>

            {/* Dark */}
            <button
              type="button"
              onClick={() => handleSelectTheme('dark')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                selectedTheme === 'dark'
                  ? 'border-[#0D7A48] bg-slate-900 text-white shadow-2xs'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        {/* Primary Color Selector */}
        <div className="space-y-2 mt-4">
          <span className="text-[11px] font-bold text-slate-500 block">
            Primary Color
          </span>
          <div className="flex items-center gap-3">
            {colors.map((c) => {
              const isSelected = selectedColor === c.hex;
              return (
                <motion.button
                  key={c.id}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectColor(c.hex)}
                  style={{ backgroundColor: c.hex }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white cursor-pointer shadow-xs transition-transform"
                  title={c.name}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
