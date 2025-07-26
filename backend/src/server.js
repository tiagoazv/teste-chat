import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import passport from 'passport';
import setupPassport from './services/passport.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

setupPassport(passport);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

io.on('connection', (socket) => {
  console.log('Novo socket conectado:', socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
