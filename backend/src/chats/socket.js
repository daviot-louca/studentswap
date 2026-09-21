import { Server } from "socket.io";

import socketAuth from "./socket.auth.js";
import conversationSocket from "./conversation.socket.js";

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  /*
   * Authentification JWT
   */
  io.use(socketAuth);

  /*
   * Connexion d'un utilisateur
   */
  io.on("connection", (socket) => {
    console.log(`🧩 Handler Socket.IO initialisé pour ${socket.id}`);

    socket.onAny((event, ...args) => {
      console.log(`📡 Événement Socket.IO reçu : ${event}`, args);
    });

    console.log(`🔌 Utilisateur connecté : ${socket.user.id} (${socket.id})`);

    /*
     * Gestion des conversations
     */
    console.log(`🛠️ Enregistrement conversationSocket pour ${socket.id}`);

    conversationSocket(io, socket);

    /*
     * Déconnexion
     */
    socket.on("disconnect", (reason) => {
      console.log(`🔌 Utilisateur déconnecté : ${socket.user.id} (${reason})`);
    });
  });

  return io;
};

export default initializeSocket;
