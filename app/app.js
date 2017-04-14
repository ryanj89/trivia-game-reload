require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

// Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);
// http.listen(4000);

const messages = [];
// SOCKETS
io.on('connection', (socket) => {
  // New user joined
  socket.on('new user', (data) => {
    io.emit('user joined', data)
  });
  
  socket.on('disconnect', (user) => {
    io.emit('user disconnected', user)
  });
});

// Logger
if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line
  app.use(require('morgan')('dev'));
}

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET_KEY,
  // secret: 'ru81c0n',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Serve static files/node modules
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/../', 'node_modules')));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/user'));

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
