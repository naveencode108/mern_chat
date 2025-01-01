import 'dotenv/config'

import express from 'express'
import authRoutes from './routes/auth.route.js'
import messagesRoutes from './routes/message.route.js'
import { connectDb } from './config/db.js';
import cloudinary from './config/cloudinary.js';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

import path from 'path';

connectDb();

const __dirname=path.resolve();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
})


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(cookieParser());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoutes);


if(process.env.NODE_ENV=='production'){
  app.use(express.static(path.join(__dirname,'../frontend/dist')));

 app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend','dist','index.html'));
 })
}

const userSocketMap={};

io.on('connection', (socket) => {
  console.log("A New user has Connected", socket.id);
    
  const userId=socket.handshake.query.userId
  if(userId) userSocketMap[userId]=socket.id;

  io.emit('onlineUsers',Object.keys(userSocketMap));
  
  socket.on('disconnect', () => {
    console.log('A User has disconnected',socket.id);
    delete userSocketMap[userId];
    io.emit('onlineUsers',Object.keys(userSocketMap));
  })
})

export function getReceiverSocketId(userId){
  return userSocketMap[userId];
}



server.listen(process.env.PORT, () => {
  console.log("server is running");
})