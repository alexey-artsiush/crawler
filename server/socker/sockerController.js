const Server = require('socket.io');
const fixedOrigin = require('./corsFixer.js');

const socker = (app) => {
  const io = new Server(app, {
    cors: {
      transports: ['websocket'], // To avoid sticky sessions when using multiple servers
      path: '/classic-mode',
      cors: fixedOrigin(ALLOWLIST_HOSTS),
      rememberUpgrade: true,
    },
  });

  console.log('Socketio initialised!');

  io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('join_room', (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      console.log('User Disconnected', socket.id);
    });
  });
};
