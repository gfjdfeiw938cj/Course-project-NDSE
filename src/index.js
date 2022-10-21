import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import { PORT, MONGO_URL } from './config.js';
import { logger } from './middleware/logger.js';
import { error } from './middleware/error.js';
import { router as advertisementRouter } from './routes/advertisementRouter.js';
import { router as authRouter } from './routes/authRouter.js';
import { initChat } from './chat/chat-socket.js';
import { initAuth } from './auth/init.js';

const app = express();
const server = http.Server(app);
const io = new Server(server, (err) => {
  if (err) {
    console.log(err);
  }
});

console.log(MONGO_URL);

async function start(PORT, MONGO_URL) {
  try {
    await mongoose.connect(MONGO_URL);
    server.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.use(session({ secret: 'SECRET', resave: false, saveUninitialized: false }));

app.use(logger);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

initAuth(passport);

app.use('/api/advertisements/', advertisementRouter);
app.use('/api/', authRouter);

app.use(error);

initChat(io);

start(PORT, MONGO_URL);
