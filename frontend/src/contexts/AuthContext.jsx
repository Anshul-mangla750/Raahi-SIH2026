import React, { createContext, useContext, useEffect, useState } from "react";
import ApiClient from "../lib/api";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRoleTab, setActiveRoleTab] = useState("official");

  useEffect(() => {
    const savedUser = localStorage.getItem("ner_logismart_user") || sessionStorage.getItem("ner_logismart_user");
    const token = localStorage.getItem("ner_access_token") || sessionStorage.getItem("ner_access_token");

    if (savedUser && token) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        if (parsed.role) setActiveRoleTab(parsed.role);
      } catch (e) {
        console.error("Failed to parse saved user", e);
        logout();
      }
    } else {
      logout();
    }
  }, []);

  const saveUserSession = (userProfile, rememberMe = true) => {
    setUser(userProfile);
    const json = JSON.stringify(userProfile);
    if (rememberMe) {
      localStorage.setItem("ner_logismart_user", json);
    } else {
      sessionStorage.setItem("ner_logismart_user", json);
    }
  };

  const login = async (role, identifier, password, rememberMe = true) => {
    setIsLoading(true);

    try {
      // Real JWT Authentication with PostgreSQL / Backend
      const res = await ApiClient.login(identifier, password);

      if (res && res.success && res.data) {
        const { user: apiUser, accessToken, refreshToken } = res.data;
        ApiClient.setTokens(accessToken, refreshToken, rememberMe);

        const mappedRole =
          apiUser.role === "admin" || apiUser.role === "district_officer"
            ? "official"
            : apiUser.role === "transporter" || apiUser.role === "driver"
            ? "operator"
            : "user";

        const loggedInUser = {
          id: apiUser.id,
          name: apiUser.name,
          emailOrPhone: apiUser.email || identifier,
          role: mappedRole,
          backendRole: apiUser.role,
          roleTitle:
            mappedRole === "official"
              ? "Regional Command Officer"
              : mappedRole === "operator"
              ? "Fleet Operations Manager"
              : "Consignee / Citizen User",
          agency: apiUser.agency || (mappedRole === "official" ? "MDoNER Logistics Division" : "Brahmaputra Freight"),
        };

        saveUserSession(loggedInUser, rememberMe);
        setIsLoading(false);
        return { success: true, message: `Welcome back, ${loggedInUser.name}!` };
      } else {
        // Explicitly reject invalid credentials
        setIsLoading(false);
        return {
          success: false,
          message: res?.message || "Invalid email or password. Please check your credentials.",
        };
      }
    } catch (err) {
      setIsLoading(false);
      return {
        success: false,
        message: "Unable to connect to authentication server. Please check your backend connection.",
      };
    }
  };

  const logout = async () => {
    try {
      await ApiClient.logout();
    } catch (e) {}
    ApiClient.clearTokens();
    setUser(null);
    localStorage.removeItem("ner_logismart_user");
    sessionStorage.removeItem("ner_logismart_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        activeRoleTab,
        setActiveRoleTab,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
