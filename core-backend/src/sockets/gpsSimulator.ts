import { Vehicle } from '../models/postgres/Vehicle';
import { getSocketServer } from './socket.gateway';
import { redisClient } from '../config/redis';

// Waypoint steps along NER corridors
const WAYPOINTS: Record<string, { lat: number; lng: number }[]> = {
  'AS-01-AB-1234': [
    { lat: 26.1445, lng: 91.7362 }, // Guwahati
    { lat: 26.2006, lng: 92.2000 }, // Jagiroad
    { lat: 26.3452, lng: 92.6840 }, // Nagaon
    { lat: 26.6528, lng: 92.7926 }, // Tezpur
  ],
  'AS-01-CD-5678': [
    { lat: 26.1445, lng: 91.7362 }, // Guwahati
    { lat: 26.4350, lng: 92.0300 }, // Mangaldai
    { lat: 26.6528, lng: 92.7926 }, // Tezpur
  ],
  'AS-01-EF-9012': [
    { lat: 26.3452, lng: 92.6840 }, // Nagaon
    { lat: 26.0022, lng: 92.8580 }, // Hojai
    { lat: 25.9060, lng: 93.7270 }, // Dimapur
  ],
  'AS-01-GH-3456': [
    { lat: 26.0022, lng: 92.8580 }, // Hojai
    { lat: 26.1500, lng: 92.7500 },
    { lat: 26.3452, lng: 92.6840 }, // Nagaon
  ],
};

const vehicleIndices: Record<string, number> = {
  'AS-01-AB-1234': 0,
  'AS-01-CD-5678': 0,
  'AS-01-EF-9012': 0,
  'AS-01-GH-3456': 0,
};

export const startGpsSimulator = () => {
  console.log('🛰️ Live GPS Telemetry Simulator started (broadcasting every 4s)...');

  setInterval(async () => {
    try {
      const io = getSocketServer();
      const vehicleIds = Object.keys(WAYPOINTS);

      for (const id of vehicleIds) {
        const routePoints = WAYPOINTS[id];
        let currentIndex = vehicleIndices[id] || 0;
        currentIndex = (currentIndex + 1) % routePoints.length;
        vehicleIndices[id] = currentIndex;

        const point = routePoints[currentIndex];
        // Add realistic micro-jitter
        const jitterLat = point.lat + (Math.random() - 0.5) * 0.005;
        const jitterLng = point.lng + (Math.random() - 0.5) * 0.005;
        const speed = Math.floor(40 + Math.random() * 25);

        const vehicle = await Vehicle.findByPk(id);
        if (vehicle && vehicle.status === 'moving') {
          vehicle.current_lat = Number(jitterLat.toFixed(4));
          vehicle.current_lng = Number(jitterLng.toFixed(4));
          vehicle.speed = speed;
          vehicle.last_ping_at = new Date();
          await vehicle.save();

          const payload = {
            id: vehicle.id,
            model: vehicle.model,
            transporter_id: vehicle.transporter_id,
            lat: vehicle.current_lat,
            lng: vehicle.current_lng,
            speed: vehicle.speed,
            fuel: vehicle.fuel_percent,
            status: vehicle.status,
            route: vehicle.current_route,
            timestamp: new Date().toISOString(),
          };

          await redisClient.set(`vehicle:live:${vehicle.id}`, payload, { ex: 60 });

          if (io) {
            io.to('admin:all').emit('vehicle:position', payload);
            io.to(`transporter:${vehicle.transporter_id}`).emit('vehicle:position', payload);
          }
        }
      }
    } catch (err: any) {
      console.warn('GPS Simulator tick notice:', err.message);
    }
  }, 4000);
};
