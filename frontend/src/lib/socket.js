import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket = null;

export const getSocket = () => {
  if (!socket) {
    const token = localStorage.getItem('ner_access_token') || sessionStorage.getItem('ner_access_token');
    socket = io(SOCKET_URL, {
      auth: { token },
      autoConnect: true,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('⚡ Connected to RAAHI Real-Time Socket Gateway:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('⚡ Disconnected from Socket Gateway');
    });
  }

  return socket;
};

export const subscribeToVehiclePositions = (callback) => {
  const s = getSocket();
  s.on('vehicle:position', callback);
  return () => {
    s.off('vehicle:position', callback);
  };
};

export const subscribeToAlerts = (callback) => {
  const s = getSocket();
  s.on('alert:broadcast', callback);
  return () => {
    s.off('alert:broadcast', callback);
  };
};
