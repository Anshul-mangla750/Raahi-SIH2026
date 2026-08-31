"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketServer = exports.initSocketGateway = void 0;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
let io = null;
const initSocketGateway = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    io.use((socket, next) => {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
        if (token) {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtAccessSecret);
                socket.user = decoded;
            }
            catch (err) {
                // Allow unauthenticated connection with limited room access for demo
            }
        }
        next();
    });
    io.on('connection', (socket) => {
        const user = socket.user;
        console.log(`🔌 Client connected to Socket.io: ${socket.id} (${user ? user.role : 'Guest'})`);
        // Automatic room assignment based on authenticated role
        if (user) {
            if (user.role === 'admin' || user.role === 'district_officer') {
                socket.join('admin:all');
            }
            if (user.transporterId) {
                socket.join(`transporter:${user.transporterId}`);
            }
            if (user.districtId) {
                socket.join(`district:${user.districtId}`);
            }
        }
        else {
            // Default guest joins admin room for local interactive demos
            socket.join('admin:all');
            socket.join('transporter:transporter_01');
        }
        socket.on('join:room', (room) => {
            socket.join(room);
            console.log(`Socket ${socket.id} joined room: ${room}`);
        });
        socket.on('leave:room', (room) => {
            socket.leave(room);
        });
        socket.on('disconnect', () => {
            console.log(`🔌 Client disconnected: ${socket.id}`);
        });
    });
    return io;
};
exports.initSocketGateway = initSocketGateway;
const getSocketServer = () => {
    return io;
};
exports.getSocketServer = getSocketServer;
//# sourceMappingURL=socket.gateway.js.map