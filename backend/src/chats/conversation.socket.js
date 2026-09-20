import {
    Conversation,
    ConversationParticipant,
    Message,
  } from "../models/index.js";
  
  const conversationSocket = (io, socket) => {
    /*
     * Rejoindre une conversation
     */
    socket.on("join_conversation", async (conversationId) => {
      try {
        const userId = socket.user.id;
  
        const participant = await ConversationParticipant.findOne({
          where: {
            Id_conversations: conversationId,
            Id_users: userId,
          },
        });
  
        if (!participant) {
          return socket.emit("chat_error", {
            message: "Vous ne participez pas à cette conversation.",
          });
        }
  
        socket.join(`conversation:${conversationId}`);
  
        socket.emit("joined_conversation", {
          conversationId,
        });
  
        console.log(
          `👤 ${userId} a rejoint la conversation ${conversationId}`
        );
      } catch (error) {
        console.error("Erreur join_conversation :", error);
  
        socket.emit("chat_error", {
          message: "Impossible de rejoindre la conversation.",
        });
      }
    });
  
    /*
     * Envoyer un message
     */
    socket.on("send_message", async ({ conversationId, contenu }) => {
      try {
        const userId = socket.user.id;
  
        if (!conversationId || !contenu?.trim()) {
          return socket.emit("chat_error", {
            message: "La conversation et le contenu sont obligatoires.",
          });
        }
  
        const participant = await ConversationParticipant.findOne({
          where: {
            Id_conversations: conversationId,
            Id_users: userId,
          },
        });
  
        if (!participant) {
          return socket.emit("chat_error", {
            message: "Vous ne participez pas à cette conversation.",
          });
        }
  
        const message = await Message.create({
          Id_conversations: conversationId,
          Id_users: userId,
          contenu: contenu.trim(),
          created_at: new Date(),
          updated_at: new Date(),
        });
  
        const messageWithUser = await Message.findByPk(message.Id_messages, {
          include: [
            {
              association: "user",
              attributes: [
                "Id_users",
                "pseudo",
                "prenom",
                "nom",
              ],
            },
          ],
        });
  
        io.to(`conversation:${conversationId}`).emit("new_message", {
          message: messageWithUser,
        });
      } catch (error) {
        console.error("Erreur send_message :", error);
  
        socket.emit("chat_error", {
          message: "Impossible d'envoyer le message.",
        });
      }
    });
  
    /*
     * Quitter une conversation
     */
    socket.on("leave_conversation", (conversationId) => {
      socket.leave(`conversation:${conversationId}`);
  
      socket.emit("left_conversation", {
        conversationId,
      });
  
      console.log(
        `👤 ${socket.user.id} a quitté la conversation ${conversationId}`
      );
    });
  };
  
  export default conversationSocket;