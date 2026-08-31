import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-600">Verifying secure credentials...</p>
        </div>
      </div>
    );
  }

  // If not logged in, redirect to /login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required, verify user's role
  if (allowedRoles.length > 0) {
    const userRole = user.role;
    const backendRole = user.backendRole;

    const hasAccess =
      allowedRoles.includes(userRole) ||
      (backendRole && allowedRoles.includes(backendRole));

    if (!hasAccess) {
      // Smart redirect based on actual user role
      if (userRole === 'official' || backendRole === 'admin' || backendRole === 'district_officer') {
        return <Navigate to="/admin" replace />;
      }
      if (userRole === 'operator' || backendRole === 'transporter' || backendRole === 'driver') {
        return <Navigate to="/transporter/dashboard" replace />;
      }
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
