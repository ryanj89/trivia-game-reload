const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(4000);

const messages = [];
// SOCKETS
io.on('connection', (socket) => {
  // New user joined
  socket.on('new user', (data) => {
    console.log(data);
    
    io.emit('user joined', data)
  })

  socket.on('disconnect', (user) => {
    console.log('User disconnected', user);
    io.emit('user disconnected', user)
  })
});

// Logger
if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line
  // app.use(require('morgan')('dev'));
}

// Middleware
app.use(bodyParser.json());

// Serve static files/node modules
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/../', 'node_modules')));

// Routes
app.use('/api/users', require('./routes/users'));

// Wildcard route
app.use('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// 404 Error Handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler: prints stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send({ message: err.message, error: err });
  });
}

// Production error handler: no stacktraces
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send({ message: err.message, error: {} });
});


module.exports = app;
