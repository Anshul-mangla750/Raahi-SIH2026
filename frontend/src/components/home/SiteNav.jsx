import React, { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { RaahiLogoMark } from './RaahiLogoMark';
import { Link, useNavigate } from 'react-router-dom';

const navItems = [
  ["Platform", "#platform"],
  ["How It Works", "#how-it-works"],
  ["Intelligence", "#intelligence"],
  ["Solutions", "#solutions"],
  ["About", "#northeast"],
];

export function SiteNav({ onOpenLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a className="nav-brand" href="#home" onClick={close} aria-label="RAAHI home">
          <RaahiLogoMark />
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map(([label, href], index) => (
            <a
              key={label}
              href={href}
              className={`nav-link-item ${index === 0 ? "active" : ""}`}
            >
              {label}
            </a>
          ))}
          <Link to="/admin" className="nav-link-item font-semibold text-emerald-600">
            Admin Portal
          </Link>
          <Link to="/transporter" className="nav-link-item font-semibold text-[#087f4d]">
            Transporter Hub
          </Link>
        </nav>

        <div className="nav-actions">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2.5 bg-emerald-900/80 backdrop-blur-md border border-emerald-500/40 px-3 py-1.5 rounded-full text-xs text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-emerald-200">{user.name}</span>
                <span className="text-[10px] text-emerald-400/90 font-medium capitalize">{user.role} • {user.roleTitle}</span>
              </div>
              {user.role === 'official' ? (
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 rounded text-[10px] font-semibold text-white transition-colors cursor-pointer"
                >
                  Admin Dash
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/transporter')}
                  className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 rounded text-[10px] font-semibold text-white transition-colors cursor-pointer"
                >
                  Transporter Dash
                </button>
              )}
              <button
                type="button"
                onClick={onOpenLogin}
                className="px-2 py-0.5 bg-emerald-700/90 hover:bg-emerald-600 rounded text-[10px] font-semibold text-white transition-colors cursor-pointer"
                title="Switch role / credentials"
              >
                Switch
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded text-[10px] font-semibold text-white transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="nav-login cursor-pointer"
                onClick={onOpenLogin}
              >
                Login
              </button>
              <button
                type="button"
                className="nav-get-started cursor-pointer flex items-center gap-1.5"
                onClick={onOpenLogin}
              >
                <span>Get Started</span>
                <ArrowRight size={14} />
              </button>
            </>
          )}
          <button className="nav-mobile-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-menu">
          <div className="eyebrow" style={{ color: "#087f4d", marginBottom: "1rem" }}>Navigate Raahi</div>
          {navItems.map(([label, href]) => <a key={label} href={href} onClick={close}>{label}</a>)}
          <div className="flex flex-col gap-2 my-2 pt-2 border-t border-slate-200">
            <Link to="/admin" onClick={close} className="px-4 py-2 bg-emerald-900 text-emerald-200 rounded-lg text-sm font-semibold text-center">
              Admin Dashboard Portal
            </Link>
            <Link to="/transporter" onClick={close} className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-sm font-semibold text-center">
              Transporter Dashboard Hub
            </Link>
          </div>
          {isAuthenticated && user ? (
            <div className="flex flex-col gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  close();
                  onOpenLogin();
                }}
                className="px-4 py-2.5 bg-emerald-800 text-white rounded-xl font-bold text-sm w-full cursor-pointer text-center"
              >
                Switch Account / Portal
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2.5 bg-slate-800 text-white rounded-xl font-bold text-sm w-full cursor-pointer text-center"
              >
                Sign Out ({user.name})
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                close();
                onOpenLogin();
              }}
              className="mt-4 px-4 py-2.5 bg-emerald-700 text-white rounded-xl font-bold text-sm w-full cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Login to Platform</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
