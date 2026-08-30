import React from 'react';
import { motion } from 'framer-motion';
import AuthBranding from '../../components/auth/AuthBranding';
import LoginForm from '../../components/auth/LoginForm';
import LanguageSelector from '../../components/common/LanguageSelector';
import AuthFooter from '../../components/auth/AuthFooter';
import loginFooterImg from '../../assets/login-footer.jpeg';

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-[#F8FAFC] selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* 2-Column Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full flex-1">
        {/* Left Visual Marketing Panel (50% Desktop) */}
        <div className="lg:col-span-6 w-full relative">
          <AuthBranding />
        </div>

        {/* Right Authentication Panel (50% Desktop) */}
        <div className="lg:col-span-6 w-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative bg-[#F8FAFC]">
          {/* Top Floating Language Selector */}
          <div className="flex justify-end w-full relative z-30 mb-2">
            <LanguageSelector />
          </div>

          {/* Centered Login Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full flex items-center justify-center my-auto relative z-20 py-4"
          >
            <LoginForm />
          </motion.div>

          {/* Decorative Cityscape Footer Image (login-footer.jpeg) - ONLY inside Right Panel */}
          <div className="absolute bottom-0 left-0 right-0 w-full h-24 sm:h-28 pointer-events-none z-0 overflow-hidden">
            <img
              src={loginFooterImg}
              alt="NER LogiSmart Landmark Silhouette"
              className="w-full h-full object-cover object-bottom opacity-50 mix-blend-multiply"
            />
          </div>
        </div>
      </div>

      {/* Full-Width Overall Copyright Footer below BOTH panels */}
      <div className="w-full bg-[#F8FAFC] border-t border-slate-200/80 py-4 relative z-10">
        <AuthFooter />
      </div>
    </div>
  );
}
