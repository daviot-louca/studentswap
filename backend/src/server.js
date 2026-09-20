import "dotenv/config";
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`🔌 Socket connecté : ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`🔌 Socket déconnecté : ${socket.id}`);
  });
});

const startServer = async () => {
  await connectDatabase();

  httpServer.listen(PORT, () => {
    console.log(`🚀 StudentSwap API : http://localhost:${PORT}`);
    console.log(`🔌 Socket.IO actif`);
  });
};

startServer();