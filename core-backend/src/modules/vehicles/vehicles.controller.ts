import { Request, Response } from 'express';
import { Vehicle } from '../../models/postgres/Vehicle';
import { redisClient } from '../../config/redis';
import { sendSuccess, sendError } from '../../utils/response';
import { getSocketServer } from '../../sockets/socket.gateway';

export class VehiclesController {
  // GPS Simulator / Hardware Ping Handler
  static async pingPosition(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { lat, lng, speed, fuel_percent, status } = req.body;

      const vehicle = await Vehicle.findByPk(String(id));
      if (!vehicle) return sendError(res, 'Vehicle not found', 404);

      const updateData: any = {
        last_ping_at: new Date(),
      };
      if (lat !== undefined) updateData.current_lat = lat;
      if (lng !== undefined) updateData.current_lng = lng;
      if (speed !== undefined) updateData.speed = speed;
      if (fuel_percent !== undefined) updateData.fuel_percent = fuel_percent;
      if (status !== undefined) updateData.status = status;

      await vehicle.update(updateData);

      // Cache live position in Redis with 60s TTL
      const livePayload = {
        id: vehicle.id,
        model: vehicle.model,
        transporter_id: vehicle.transporter_id,
        lat: vehicle.current_lat,
        lng: vehicle.current_lng,
        speed: vehicle.speed,
        fuel: vehicle.fuel_percent,
        status: vehicle.status,
        timestamp: new Date().toISOString(),
      };
      await redisClient.set(`vehicle:live:${vehicle.id}`, livePayload, { ex: 60 });

      // Emit live position to Socket.io rooms
      const io = getSocketServer();
      if (io) {
        // Broadcast to Admin room
        io.to('admin:all').emit('vehicle:position', livePayload);
        // Broadcast to Transporter room
        io.to(`transporter:${vehicle.transporter_id}`).emit('vehicle:position', livePayload);
      }

      return sendSuccess(res, livePayload, 'GPS Telemetry ping processed');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  // Get all active live positions from Redis or DB
  static async getLivePositions(req: Request, res: Response) {
    try {
      const vehicles = await Vehicle.findAll();
      return sendSuccess(res, vehicles, 'Live vehicle coordinates retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }
}
