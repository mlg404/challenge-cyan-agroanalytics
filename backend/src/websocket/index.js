const socketio = require('socket.io');

let io;

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id} !`);
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach((connection) => {
    io.to(connection.id).emit(message, data);
  });
};

exports.broadcastMessage = (message, data) => {
  io.emit(message, data);
};
