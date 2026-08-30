import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import LoginTypeTabs from './LoginTypeTabs';
import SocialLoginButtons from './SocialLoginButtons';
import SecurityNotice from './SecurityNotice';

export default function LoginForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailOrPhone.trim() && password.trim()) {
      navigate('/transporter/dashboard');
    }
  };

  return (
    <div className="w-full max-w-[490px] mx-auto bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-100/90 relative z-20">
      {/* Top Scenic Logistics/Bridge Illustration */}
      <div className="w-full flex items-center justify-center mb-4">
        <svg viewBox="0 0 280 90" className="w-56 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mountains background */}
          <path d="M40 70L80 20L120 70Z" fill="#E6F4EA" stroke="#A7D7B5" strokeWidth="1.2" />
          <path d="M90 70L145 12L200 70Z" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
          <path d="M170 70L210 25L250 70Z" fill="#E6F4EA" stroke="#A7D7B5" strokeWidth="1.2" />
          
          {/* Small trees/foliage */}
          <circle cx="50" cy="65" r="8" fill="#34D399" opacity="0.7" />
          <circle cx="62" cy="68" r="6" fill="#10B981" opacity="0.8" />
          <circle cx="230" cy="65" r="8" fill="#34D399" opacity="0.7" />
          <circle cx="242" cy="68" r="6" fill="#10B981" opacity="0.8" />

          {/* Bridge structure */}
          <path d="M20 70H260" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M30 70C60 45, 110 45, 140 70" stroke="#059669" strokeWidth="1.5" fill="none" />
          <path d="M140 70C170 45, 220 45, 250 70" stroke="#059669" strokeWidth="1.5" fill="none" />
          
          {/* Bridge pillars */}
          <line x1="85" y1="70" x2="85" y2="85" stroke="#94A3B8" strokeWidth="2" />
          <line x1="140" y1="70" x2="140" y2="85" stroke="#94A3B8" strokeWidth="2.5" />
          <line x1="195" y1="70" x2="195" y2="85" stroke="#94A3B8" strokeWidth="2" />

          {/* Green Freight Truck on Bridge */}
          <g transform="translate(130, 48)">
            <rect x="0" y="4" width="36" height="18" rx="2" fill="#10B981" />
            <rect x="36" y="9" width="12" height="13" rx="2" fill="#047857" />
            <circle cx="9" cy="22" r="3.5" fill="#1E293B" />
            <circle cx="27" cy="22" r="3.5" fill="#1E293B" />
            <circle cx="42" cy="22" r="3.5" fill="#1E293B" />
            <rect x="38" y="11" width="7" height="5" rx="1" fill="#E2E8F0" />
          </g>
        </svg>
      </div>

      {/* Header Heading */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E36] tracking-tight">
          Welcome Back!
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Sign in to continue to{' '}
          <span className="font-extrabold text-emerald-600">NER LogiSmart</span>
        </p>
      </div>

      {/* Login Role Tabs (User, Official, Operator) */}
      <LoginTypeTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Form Elements */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email or Phone Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Email or Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4 text-[#0B1E36]" />
            </div>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter email or phone number"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-2xs"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4 text-[#0B1E36]" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-2xs"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer"
            />
            <span className="text-xs text-slate-600 font-medium">Remember me</span>
          </label>
          <a
            href="#forgot-password"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Forgot Password?
          </a>
        </div>

        {/* Sign In CTA Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.950 }}
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer transition-all focus:outline-none"
        >
          <span>Sign In</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </form>

      {/* Social Provider Logins */}
      <SocialLoginButtons />

      {/* Security Notice Card */}
      <SecurityNotice />
    </div>
  );
}
