import socketio from 'socket.io';

const setupWebsocket = (server) => {
  socketio = socketio(server);

  socketio.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id} !`);
  });
};

const sendMessage = (to, message, data) => {
  to.forEach((connection) => {
    socketio.to(connection.id).emit(message, data);
  });
};

const broadcastMessage = (message, data) => {
  socketio.emit(message, data);
};

export default { setupWebsocket, sendMessage, broadcastMessage };
