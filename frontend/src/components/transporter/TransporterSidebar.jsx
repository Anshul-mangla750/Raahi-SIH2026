import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Truck,
  MapPin,
  GitFork,
  Bell,
  History,
  BarChart2,
  User,
  Settings,
  Headphones,
  X,  
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarNavItems, sidebarSecondaryItems } from '../../data/transporterData';

export default function TransporterSidebar({ isOpen, onClose }) {
  const location = useLocation();

  const getIcon = (iconName, isActive) => {
    const iconClass = `w-4.5 h-4.5 flex-shrink-0 transition-colors ${
      isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-800'
    }`;

    switch (iconName) {
      case 'dashboard':
        return <LayoutDashboard className={iconClass} />;
      case 'package':
        return <Package className={iconClass} />;
      case 'truck':
        return <Truck className={iconClass} />;
      case 'map-pin':
        return <MapPin className={iconClass} />;
      case 'route':
        return <GitFork className={`${iconClass} rotate-90`} />;
      case 'bell':
        return <Bell className={iconClass} />;
      case 'history':
        return <History className={iconClass} />;
      case 'bar-chart':
        return <BarChart2 className={iconClass} />;
      case 'user':
        return <User className={iconClass} />;
      case 'settings':
        return <Settings className={iconClass} />;
      case 'headset':
        return <Headphones className={iconClass} />;
      default:
        return <LayoutDashboard className={iconClass} />;
    }
  };

  const isItemActive = (id) => {
    if (id === 'dashboard') {
      return (
        location.pathname === '/transporter/dashboard' ||
        location.pathname === '/dashboard' ||
        location.pathname === '/admin/dashboard'
      );
    }
    if (id === 'consignments') {
      return (
        location.pathname === '/transporter/consignments' ||
        location.pathname === '/consignments'
      );
    }
    if (id === 'vehicles') {
      return (
        location.pathname === '/transporter/vehicles' ||
        location.pathname === '/vehicles'
      );
    }
    if (id === 'tracking') {
      return (
        location.pathname === '/transporter/live-tracking' ||
        location.pathname === '/transporter/tracking' ||
        location.pathname === '/live-tracking' ||
        location.pathname === '/tracking'
      );
    }
    if (id === 'routes') {
      return (
        location.pathname === '/transporter/routes' ||
        location.pathname === '/transporter/route-planning' ||
        location.pathname === '/routes' ||
        location.pathname === '/route-planning'
      );
    }
    if (id === 'alerts') {
      return (
        location.pathname === '/transporter/alerts' ||
        location.pathname === '/alerts'
      );
    }
    if (id === 'history') {
      return (
        location.pathname === '/transporter/delivery-history' ||
        location.pathname === '/transporter/history' ||
        location.pathname === '/delivery-history' ||
        location.pathname === '/history'
      );
    }
    if (id === 'reports') {
      return (
        location.pathname === '/transporter/reports' ||
        location.pathname === '/reports'
      );
    }
    if (id === 'settings') {
      return (
        location.pathname === '/transporter/settings' ||
        location.pathname === '/settings'
      );
    }
    if (id === 'help') {
      return (
        location.pathname === '/transporter/help' ||
        location.pathname === '/transporter/support' ||
        location.pathname === '/help' ||
        location.pathname === '/support'
      );
    }
    return location.pathname.includes(id);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 select-none overflow-y-auto custom-scrollbar">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-20">
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 shadow-xs group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7L33 29H7L20 7Z" fill="#059669" />
              <path d="M20 7L28 29H12L20 7Z" fill="#10B981" fillOpacity="0.85" />
              <path d="M20 7L23 13H17L20 7Z" fill="#D1FAE5" />
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
            <div className="flex items-baseline gap-1.5 tracking-tight">
              <span className="text-xl font-black text-[#0B1E36]">RAAHI</span>
              <span className="text-xs font-bold text-emerald-600 px-1.5 py-0.5 bg-emerald-50 rounded border border-emerald-100">
                Transporter
              </span>
            </div>
            <span className="text-[9px] text-slate-400 font-medium tracking-tight -mt-0.5 leading-tight">
              Smart Logistics. Stronger Northeast.
            </span>
          </div>
        </Link>

        {/* Mobile Close Button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation Links */}
      <div className="px-3 py-3 space-y-1">
        {sidebarNavItems.map((item) => {
          const active = isItemActive(item.id);

          return (
            <Link
              key={item.id}
              to={
                item.id === 'dashboard'
                  ? '/transporter/dashboard'
                  : item.id === 'consignments'
                  ? '/transporter/consignments'
                  : item.id === 'vehicles'
                  ? '/transporter/vehicles'
                  : item.id === 'tracking'
                  ? '/transporter/live-tracking'
                  : item.id === 'routes'
                  ? '/transporter/routes'
                  : item.id === 'alerts'
                  ? '/transporter/alerts'
                  : item.id === 'history'
                  ? '/transporter/delivery-history'
                  : item.id === 'reports'
                  ? '/transporter/reports'
                  : '#'
              }
              onClick={() => {
                if (onClose) onClose();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group text-left focus:outline-none ${
                active
                  ? 'bg-[#0D7A48] text-white shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {getIcon(item.icon, active)}
                <span className="tracking-tight">{item.label}</span>
              </div>

              {/* Badges */}
              {item.badge && (
                <span
                  className={`w-5 h-5 rounded-full ${
                    active ? 'bg-white/20 text-white' : 'bg-emerald-500 text-white'
                  } text-[10px] font-bold flex items-center justify-center shadow-xs`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="my-2 px-3">
        <div className="h-px bg-slate-100" />
      </div>

      {/* Secondary Navigation Links */}
      <div className="px-3 space-y-1">
        {sidebarSecondaryItems.map((item) => {
          const active = isItemActive(item.id);

          return (
            <Link
              key={item.id}
              to={
                item.id === 'settings'
                  ? '/transporter/settings'
                  : item.id === 'help'
                  ? '/transporter/help'
                  : '#'
              }
              onClick={() => {
                if (onClose) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group text-left focus:outline-none ${
                active
                  ? 'bg-[#0D7A48] text-white shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {getIcon(item.icon, active)}
              <span className="tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Promotional / Scenic Mountain Freight Truck Card */}
      <div className="mt-auto p-3">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-100/60 p-3.5 border border-emerald-200/60 relative overflow-hidden flex flex-col justify-between select-none">
          <div className="relative z-10 space-y-1">
            <h4 className="text-xs font-black text-[#0B1E36] leading-snug">
              Delivering Northeast,<br />Connecting Lives.
            </h4>
            <p className="text-[10px] text-slate-500 font-medium leading-tight">
              Your journey drives a stronger tomorrow.
            </p>
          </div>

          {/* SVG Truck on Mountain Highway Illustration */}
          <div className="w-full h-24 mt-3 relative rounded-xl overflow-hidden bg-emerald-100/40 border border-emerald-200/40 flex items-end justify-center">
            <svg viewBox="0 0 240 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Sun */}
              <circle cx="180" cy="30" r="10" fill="#FBBF24" opacity="0.85" />
              
              {/* Background Mountains */}
              <path d="M0 75L40 35L90 75Z" fill="#A7F3D0" opacity="0.7" />
              <path d="M60 75L120 25L180 75Z" fill="#6EE7B7" opacity="0.6" />
              <path d="M140 75L190 38L240 75Z" fill="#A7F3D0" opacity="0.7" />

              {/* Winding Highway Road */}
              <path
                d="M-10 85 C 40 85, 70 70, 120 70 C 170 70, 200 85, 250 85"
                stroke="#475569"
                strokeWidth="14"
                fill="none"
              />
              <path
                d="M-10 85 C 40 85, 70 70, 120 70 C 170 70, 200 85, 250 85"
                stroke="#F8FAFC"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />

              {/* Green Freight Truck Driving on Road */}
              <g transform="translate(65, 52)">
                <rect x="0" y="4" width="30" height="15" rx="2" fill="#059669" />
                <rect x="30" y="8" width="10" height="11" rx="2" fill="#047857" />
                <circle cx="8" cy="19" r="3" fill="#0F172A" />
                <circle cx="22" cy="19" r="3" fill="#0F172A" />
                <circle cx="34" cy="19" r="3" fill="#0F172A" />
                <rect x="32" y="10" width="6" height="4" rx="1" fill="#E2E8F0" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:block w-64 flex-shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          {/* Drawer content */}
          <div className="relative w-64 max-w-xs bg-white h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
