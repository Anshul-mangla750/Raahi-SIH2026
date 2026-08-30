import React, { createContext, useContext, useEffect, useState } from "react";

const DEMO_USERS = {
  user: {
    id: "usr_ner_001",
    name: "Arun Sharma",
    emailOrPhone: "arun.sharma@northeastlogistics.in",
    role: "user",
    roleTitle: "Consignee / Citizen User",
    agency: "Assam Essential Supplies",
  },
  official: {
    id: "gov_ner_709",
    name: "Debashis Hazarika",
    emailOrPhone: "d.hazarika@nhidcl.gov.in",
    role: "official",
    roleTitle: "NHIDCL Field Officer",
    agency: "Ministry of Road Transport & Highways (NER)",
  },
  operator: {
    id: "ops_ner_404",
    name: "Pranab Gogoi",
    emailOrPhone: "pranab@brahmaputrafleet.com",
    role: "operator",
    roleTitle: "Fleet Operations Manager",
    agency: "Brahmaputra Heavy Freight Corridor",
  },
};

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRoleTab, setActiveRoleTab] = useState("user");

  useEffect(() => {
    const savedUser = localStorage.getItem("ner_logismart_user") || sessionStorage.getItem("ner_logismart_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        if (parsed.role) setActiveRoleTab(parsed.role);
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
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
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    if (!identifier.trim()) {
      return { success: false, message: "Please enter your email or phone number." };
    }

    if (!password || password.length < 4) {
      return { success: false, message: "Password must be at least 4 characters." };
    }

    const templateUser = DEMO_USERS[role] || DEMO_USERS.user;
    const loggedInUser = {
      ...templateUser,
      emailOrPhone: identifier,
      name: identifier.includes("@") ? identifier.split("@")[0].replace(".", " ") : templateUser.name,
      role,
    };

    saveUserSession(loggedInUser, rememberMe);
    return { success: true, message: `Welcome back, ${loggedInUser.name}!` };
  };

  const sendOTP = async (phone) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const mockCode = "749281";
    return { success: true, mockCode };
  };

  const loginWithOTP = async (phone, otp) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsLoading(false);

    if (otp.length !== 6) {
      return { success: false, message: "Please enter a valid 6-digit OTP." };
    }

    const templateUser = DEMO_USERS[activeRoleTab] || DEMO_USERS.user;
    const loggedInUser = {
      ...templateUser,
      emailOrPhone: phone,
      name: `User (+91 ${phone.slice(-4)})`,
      role: activeRoleTab,
    };

    saveUserSession(loggedInUser, true);
    return { success: true, message: "OTP verified successfully!" };
  };

  const loginWithSocial = async (provider) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsLoading(false);

    const providerName = provider === "google" ? "Google" : "Microsoft Azure AD";
    const loggedInUser = {
      id: `${provider}_ner_${Date.now()}`,
      name: provider === "google" ? "Northeast Explorer" : "Govt Enterprise User",
      emailOrPhone: `auth_${provider}@ner-logismart.gov.in`,
      role: activeRoleTab,
      roleTitle: `${providerName} Authenticated Session`,
      agency: activeRoleTab === "official" ? "Ministry of Development of North Eastern Region" : "Regional Logistics Cell",
    };

    saveUserSession(loggedInUser, true);
    return { success: true, message: `Authenticated with ${providerName}` };
  };

  const resetPassword = async (identifier) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return {
      success: true,
      message: `Password reset link sent to ${identifier}. Please check your inbox or SMS.`,
    };
  };

  const logout = () => {
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
        loginWithOTP,
        loginWithSocial,
        sendOTP,
        resetPassword,
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
