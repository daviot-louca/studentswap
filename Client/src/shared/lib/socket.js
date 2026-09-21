import { io } from "socket.io-client";

let socket = null;

export function getSocket() {
  if (socket) {
    console.log(
      "♻️ Socket existant récupéré :",
      socket.id,
      "connected=",
      socket.connected,
    );

    return socket;
  }

  const token = localStorage.getItem("studentswap_token");

  console.log("🔑 Token Socket présent :", Boolean(token));

  if (!token) {
    console.error("❌ Aucun token JWT disponible pour Socket.IO");

    return null;
  }

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  console.log("🔌 Création du socket vers :", apiUrl);

  socket = io(apiUrl, {
    auth: {
      token,
    },
    transports: ["websocket"],
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("✅ Socket.IO connecté :", socket.id);

    console.log("🌐 Socket connected :", socket.connected);
  });

  socket.on("disconnect", (reason) => {
    console.log("🔌 Socket.IO déconnecté :", reason);
  });

  socket.on("connect_error", (error) => {
    console.error("❌ Erreur connexion Socket.IO :", error.message);

    console.error("❌ Détails erreur Socket.IO :", error);
  });

  socket.on("joined_conversation", (payload) => {
    console.log("✅ Conversation rejointe :", payload);
  });

  socket.on("new_message", (payload) => {
    console.log("📨 new_message reçu dans le frontend :", payload);
  });

  socket.on("chat_error", (payload) => {
    console.error("❌ chat_error reçu dans le frontend :", payload);
  });

  return socket;
}

export function disconnectSocket() {
  if (!socket) {
    return;
  }

  console.log("🔌 Déconnexion manuelle du Socket.IO :", socket.id);

  socket.disconnect();
  socket = null;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    disconnectSocket();
  });
}
