require('dotenv').config();
const http = require('http');
const sequelize = require('./settings/db');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const path = require('path');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = new http.Server(app);

const io = new Server(server, {
  cors: {
    transports: ['websocket'], // To avoid sticky sessions when using multiple servers
    path: '/classic-mode',
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

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    server.listen(process.env.SOCKET_PORT, () => {
      console.log(`Socker listening on port ${process.env.SOCKET_PORT}!`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
