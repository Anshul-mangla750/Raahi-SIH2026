// API Client for RAAHI / NER LogiSmart Core Backend

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  static getAccessToken() {
    return localStorage.getItem('ner_access_token') || sessionStorage.getItem('ner_access_token');
  }

  static getRefreshToken() {
    return localStorage.getItem('ner_refresh_token') || sessionStorage.getItem('ner_refresh_token');
  }

  static setTokens(accessToken, refreshToken, rememberMe = true) {
    if (rememberMe) {
      localStorage.setItem('ner_access_token', accessToken);
      localStorage.setItem('ner_refresh_token', refreshToken);
    } else {
      sessionStorage.setItem('ner_access_token', accessToken);
      sessionStorage.setItem('ner_refresh_token', refreshToken);
    }
  }

  static clearTokens() {
    localStorage.removeItem('ner_access_token');
    localStorage.removeItem('ner_refresh_token');
    sessionStorage.removeItem('ner_access_token');
    sessionStorage.removeItem('ner_refresh_token');
  }

  static async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const token = this.getAccessToken();

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle 401 & attempt token refresh once
      if (response.status === 401 && !options._retry) {
        const refreshToken = this.getRefreshToken();
        if (refreshToken) {
          try {
            const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken }),
            });
            if (refreshRes.ok) {
              const refreshData = await refreshRes.json();
              if (refreshData.success && refreshData.data?.accessToken) {
                this.setTokens(refreshData.data.accessToken, refreshData.data.refreshToken || refreshToken);
                return this.request(endpoint, { ...options, _retry: true });
              }
            }
          } catch (e) {
            this.clearTokens();
          }
        }
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.warn(`API request to ${endpoint} failed:`, err);
      return { success: false, message: err.message };
    }
  }

  // Auth endpoints
  static login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  static logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  static getMe() {
    return this.request('/auth/me');
  }

  // Admin endpoints
  static getAdminKpis() {
    return this.request('/admin/overview/kpis');
  }

  static getAdminDistricts() {
    return this.request('/admin/districts');
  }

  static getAdminRoutes() {
    return this.request('/admin/routes');
  }

  static getAdminVehicles() {
    return this.request('/admin/vehicles');
  }

  static getAdminAlerts() {
    return this.request('/admin/alerts');
  }

  static createAlert(payload) {
    return this.request('/admin/alerts', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  static getAdminFieldReports() {
    return this.request('/admin/field-reports');
  }

  static verifyFieldReport(id) {
    return this.request(`/admin/field-reports/${id}/verify`, { method: 'PATCH' });
  }

  static rejectFieldReport(id, reason) {
    return this.request(`/admin/field-reports/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    });
  }

  static getSupplyChainGaps() {
    return this.request('/admin/supply-chain/gaps');
  }

  static getDisruptionAnalytics() {
    return this.request('/admin/analytics/disruption-trends');
  }

  static getAdminUsers() {
    return this.request('/admin/users');
  }

  static createAdminUser(payload) {
    return this.request('/admin/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  static updateAdminUser(id, payload) {
    return this.request(`/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  }

  static deleteAdminUser(id) {
    return this.request(`/admin/users/${id}`, { method: 'DELETE' });
  }

  // Transporter endpoints
  static getTransporterKpis() {
    return this.request('/transporter/overview/kpis');
  }

  static getTransporterVehicles() {
    return this.request('/transporter/vehicles');
  }

  static getTransporterDrivers() {
    return this.request('/transporter/drivers');
  }

  static createTransporterDriver(payload) {
    return this.request('/transporter/drivers', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  static deleteTransporterDriver(id) {
    return this.request(`/transporter/drivers/${id}`, { method: 'DELETE' });
  }

  static getTransporterDeliveries() {
    return this.request('/transporter/deliveries');
  }

  static planTrip(payload) {
    return this.request('/transporter/trips/plan', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  static createTrip(payload) {
    return this.request('/transporter/trips', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  static getTransporterAlerts() {
    return this.request('/transporter/alerts');
  }

  static reportIncident(payload) {
    return this.request('/transporter/field-reports', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

export default ApiClient;
