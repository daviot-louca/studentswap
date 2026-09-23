import "dotenv/config";
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import socketAuth from "./chats/socket.auth.js";
import conversationSocket from "./chats/conversation.socket.js";

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

io.use(socketAuth);

io.on("connection", (socket) => {
  console.log(`🔌 Socket connecté : ${socket.id}`);
  console.log(`👤 Utilisateur Socket.IO : ${socket.user?.id}`);

  socket.onAny((event, ...args) => {
    console.log(`📡 Événement Socket.IO reçu : ${event}`, args);
  });

  conversationSocket(io, socket);

  socket.on("disconnect", (reason) => {
    console.log(`🔌 Socket déconnecté : ${socket.id} — ${reason}`);
  });
});

const startServer = async () => {
  await connectDatabase();

  httpServer.listen(PORT,"0.0.0.0", () => {
    console.log(`🚀 StudentSwap API : http://localhost:${PORT}`);
    console.log(`🔌 Socket.IO actif`);
  });
};

startServer();
