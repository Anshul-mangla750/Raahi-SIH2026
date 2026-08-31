import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
export declare const initSocketGateway: (httpServer: HttpServer) => SocketIOServer;
export declare const getSocketServer: () => SocketIOServer | null;
//# sourceMappingURL=socket.gateway.d.ts.map