import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Bell,
  Globe,
  ChevronDown,
  Calendar,
  Plus,
  User,
  LogOut,
  Settings,
  HelpCircle,
  AlertTriangle,
  Check,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export default function TransporterHeader({ onToggleSidebar, isDashboard = true, onAddConsignment }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    { id: 1, title: 'Landslide Warning on NH-27', time: '10m ago', type: 'hazard' },
    { id: 2, title: 'Consignment CONS-001 in Transit', time: '25m ago', type: 'info' },
    { id: 3, title: 'Heavy Fog Advisory near Tezpur', time: '1h ago', type: 'weather' },
  ];

  const languages = ['English', 'Assamese (অসমীয়া)', 'Bengali (বাংলা)', 'Hindi (हिन्दी)', 'Bodo (बड़ो)'];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (e) {
      navigate('/login');
    }
  };

  const todayStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'long',
  });

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-20 shadow-2xs">
      <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col space-y-3">
        {/* Top Header Row: Hamburger | Greeting & Controls */}
        <div className="flex items-center justify-between gap-3">
          {/* Left: Mobile Hamburger & Welcome Message */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
                Good Morning, {user?.name || 'Pranab Gogoi'}! 👋
              </span>
            </div>
          </div>

          {/* Right: Notifications, Language Dropdown, User Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-9 h-9 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs transition-colors cursor-pointer relative"
              >
                <Bell className="w-4 h-4 text-slate-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 text-xs"
                  >
                    <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-100 mb-1">
                      <span className="font-extrabold text-slate-900">Notifications</span>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setUnreadCount(0);
                            toast.success('All notifications marked as read');
                          }}
                          className="text-[10px] font-bold text-emerald-600 hover:underline cursor-pointer"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="space-y-1 px-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setNotificationsOpen(false);
                            navigate('/transporter/alerts');
                          }}
                          className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-2.5"
                        >
                          <div className="w-6 h-6 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-800 text-[11px] truncate">{n.title}</p>
                            <span className="text-[9px] text-slate-400 font-medium">{n.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">{selectedLang}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 text-xs"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setSelectedLang(lang.split(' ')[0]);
                          setLangOpen(false);
                          toast.success(`Language switched to ${lang.split(' ')[0]}`);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-emerald-50 hover:text-emerald-700 font-medium cursor-pointer"
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt={user?.name || 'Transporter'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://ui-avatars.com/api/?name=Pranab+Gogoi&background=0D9488&color=fff';
                    }}
                  />
                </div>
                <div className="hidden md:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-slate-900">{user?.name || 'Pranab Gogoi'}</span>
                  <span className="text-[10px] text-slate-400 font-medium">Transporter Operator</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:inline" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 text-xs font-semibold"
                  >
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="font-extrabold text-slate-900">{user?.name || 'Pranab Gogoi'}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{user?.email || 'pranab@brahmaputrafleet.com'}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate('/transporter/settings');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 cursor-pointer flex items-center gap-2"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Settings & Profile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate('/transporter/help');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 cursor-pointer flex items-center gap-2"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Support & Help</span>
                    </button>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-600 cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Lower Header Row: Main Heading + Date & Add Consignment Button */}
        {isDashboard && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            {/* Main Heading & Subtitle */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1E36] tracking-tight leading-tight">
                Let's move every delivery forward.
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-0.5">
                Here's what's happening with your operations today.
              </p>
            </div>

            {/* Action Bar: Date Selector & Green Add Consignment Button */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
              {/* Date Selector */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700">
                <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{todayStr}</span>
              </div>

              {/* Add Consignment Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (onAddConsignment) {
                    onAddConsignment();
                  } else {
                    navigate('/transporter/consignments');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Consignment</span>
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
