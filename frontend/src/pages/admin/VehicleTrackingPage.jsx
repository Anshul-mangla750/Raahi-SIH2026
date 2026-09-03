import React from 'react';
import {
  Truck,
  MapPin,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  CloudSun,
} from 'lucide-react';
import { StatCard } from '@/components/admin/common/StatCard';
import { FleetTrackingMap } from '@/components/admin/vehicleTracking/FleetTrackingMap';
import { LiveVehiclesTable } from '@/components/admin/vehicleTracking/LiveVehiclesTable';
import { FleetOverviewChart } from '@/components/admin/vehicleTracking/FleetOverviewChart';
import { VehiclesStatusBarChart } from '@/components/admin/vehicleTracking/VehiclesStatusBarChart';
import { AlertsSummaryCard } from '@/components/admin/vehicleTracking/AlertsSummaryCard';
import { RecentTripsTable } from '@/components/admin/vehicleTracking/RecentTripsTable';
import { VehiclePerformanceCard } from '@/components/admin/vehicleTracking/VehiclePerformanceCard';
import { VEHICLE_TRACKING_STATS, WEATHER_DATA } from '@/data/admin/mockData';

export const VehicleTrackingPage = () => {
  return (
    <div className="vehicle-tracking-page">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1>
            <Truck size={24} color="#059669" />
            Vehicle Tracking
          </h1>
          <p>Real-time tracking and status of all vehicles in your fleet.</p>
        </div>

        <div className="header-widgets-group">
          <div className="info-pill-card">
            <Calendar size={18} color="var(--text-muted)" />
            <div className="info-pill-text">
              <span className="info-pill-primary">21 May 2025</span>
              <span className="info-pill-secondary">Wednesday, 10:30 AM</span>
            </div>
          </div>

          <div className="info-pill-card">
            <CloudSun size={20} color="#F59E0B" />
            <div className="info-pill-text">
              <span className="info-pill-primary">{WEATHER_DATA.temp}</span>
              <span className="info-pill-secondary">{WEATHER_DATA.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Stat Cards from Image 3 */}
      <div className="stat-card-grid">
        <StatCard
          title="Total Vehicles"
          value={VEHICLE_TRACKING_STATS.totalVehicles.value}
          period={VEHICLE_TRACKING_STATS.totalVehicles.label}
          icon={Truck}
          iconBg="#ECFDF5"
          iconColor="#059669"
        />

        <StatCard
          title="Vehicles On Route"
          value={VEHICLE_TRACKING_STATS.vehiclesOnRoute.value}
          period={VEHICLE_TRACKING_STATS.vehiclesOnRoute.label}
          icon={MapPin}
          iconBg="#EFF6FF"
          iconColor="#3B82F6"
        />

        <StatCard
          title="Completed Deliveries"
          value={VEHICLE_TRACKING_STATS.completedDeliveries.value}
          period={VEHICLE_TRACKING_STATS.completedDeliveries.label}
          icon={ClipboardCheck}
          iconBg="#F5F3FF"
          iconColor="#8B5CF6"
        />

        <StatCard
          title="Active Alerts"
          value={VEHICLE_TRACKING_STATS.activeAlerts.value}
          period={VEHICLE_TRACKING_STATS.activeAlerts.label}
          isRisk={true}
          icon={AlertTriangle}
          iconBg="#FEF2F2"
          iconColor="#EF4444"
        />

        <StatCard
          title="Avg. On-Time Delivery"
          value={VEHICLE_TRACKING_STATS.avgOnTimeDelivery.value}
          period={VEHICLE_TRACKING_STATS.avgOnTimeDelivery.label}
          icon={CheckCircle2}
          iconBg="#ECFDF5"
          iconColor="#059669"
        />
      </div>

      {/* Map & Live Vehicles Feed Row */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.8fr 1.2fr', marginBottom: '24px' }}>
        <FleetTrackingMap />
        <LiveVehiclesTable />
      </div>

      {/* Fleet Overview, Vehicles by Status, Alerts Summary Row */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <FleetOverviewChart />
        <VehiclesStatusBarChart />
        <AlertsSummaryCard />
      </div>

      {/* Bottom Row: Recent Trips & Vehicle Performance */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.9fr 0.7fr', marginBottom: '24px' }}>
        <RecentTripsTable />
        <VehiclePerformanceCard />
      </div>
    </div>
  );
};
