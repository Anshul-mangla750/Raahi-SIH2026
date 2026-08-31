import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

let io: SocketIOServer | null = null;

export const initSocketGateway = (httpServer: HttpServer): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, env.jwtAccessSecret) as any;
        (socket as any).user = decoded;
      } catch (err) {
        // Allow unauthenticated connection with limited room access for demo
      }
    }
    next();
  });

  io.on('connection', (socket: Socket) => {
    const user = (socket as any).user;
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
    } else {
      // Default guest joins admin room for local interactive demos
      socket.join('admin:all');
      socket.join('transporter:transporter_01');
    }

    socket.on('join:room', (room: string) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
    });

    socket.on('leave:room', (room: string) => {
      socket.leave(room);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getSocketServer = (): SocketIOServer | null => {
  return io;
};
