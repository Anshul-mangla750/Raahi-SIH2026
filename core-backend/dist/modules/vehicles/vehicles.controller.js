"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesController = void 0;
const Vehicle_1 = require("../../models/postgres/Vehicle");
const redis_1 = require("../../config/redis");
const response_1 = require("../../utils/response");
const socket_gateway_1 = require("../../sockets/socket.gateway");
class VehiclesController {
    // GPS Simulator / Hardware Ping Handler
    static async pingPosition(req, res) {
        try {
            const { id } = req.params;
            const { lat, lng, speed, fuel_percent, status } = req.body;
            const vehicle = await Vehicle_1.Vehicle.findByPk(String(id));
            if (!vehicle)
                return (0, response_1.sendError)(res, 'Vehicle not found', 404);
            const updateData = {
                last_ping_at: new Date(),
            };
            if (lat !== undefined)
                updateData.current_lat = lat;
            if (lng !== undefined)
                updateData.current_lng = lng;
            if (speed !== undefined)
                updateData.speed = speed;
            if (fuel_percent !== undefined)
                updateData.fuel_percent = fuel_percent;
            if (status !== undefined)
                updateData.status = status;
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
            await redis_1.redisClient.set(`vehicle:live:${vehicle.id}`, livePayload, { ex: 60 });
            // Emit live position to Socket.io rooms
            const io = (0, socket_gateway_1.getSocketServer)();
            if (io) {
                // Broadcast to Admin room
                io.to('admin:all').emit('vehicle:position', livePayload);
                // Broadcast to Transporter room
                io.to(`transporter:${vehicle.transporter_id}`).emit('vehicle:position', livePayload);
            }
            return (0, response_1.sendSuccess)(res, livePayload, 'GPS Telemetry ping processed');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // Get all active live positions from Redis or DB
    static async getLivePositions(req, res) {
        try {
            const vehicles = await Vehicle_1.Vehicle.findAll();
            return (0, response_1.sendSuccess)(res, vehicles, 'Live vehicle coordinates retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
}
exports.VehiclesController = VehiclesController;
//# sourceMappingURL=vehicles.controller.js.map