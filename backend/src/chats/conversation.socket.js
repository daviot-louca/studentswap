import {
  Conversation,
  ConversationParticipant,
  Messages,
} from "../models/index.js";

const conversationSocket = (io, socket) => {
  /*
   * Rejoindre une conversation
   */
  socket.on("join_conversation", async (conversationId) => {
    console.log(
      `📥 join_conversation reçu : socket=${socket.id}, conversation=${conversationId}, user=${socket.user?.id}`,
    );

    try {
      const userId = socket.user.id;

      const participant = await ConversationParticipant.findOne({
        where: {
          Id_conversations: conversationId,
          Id_users: userId,
        },
      });

      if (!participant) {
        console.log(
          `❌ Utilisateur ${userId} non participant à la conversation ${conversationId}`,
        );

        return socket.emit("chat_error", {
          message: "Vous ne participez pas à cette conversation.",
        });
      }

      socket.join(`conversation:${conversationId}`);

      console.log(
        `👤 ${userId} a rejoint la room conversation:${conversationId}`,
      );

      socket.emit("joined_conversation", {
        conversationId,
      });
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
  socket.on("send_message", async ({ conversationId, contenu, photo_url }) => {
    console.log(
      `📥 send_message reçu : socket=${socket.id}, conversation=${conversationId}, contenu=${JSON.stringify(contenu)}, photo_url=${JSON.stringify(photo_url)}`,
    );

    try {
      const userId = socket.user.id;

      const trimmedContent = contenu?.trim() || "";

      const trimmedPhotoUrl = photo_url?.trim() || null;

      /*
       * Un message peut contenir :
       * - du texte
       * - une photo
       * - ou les deux
       */
      if (!conversationId || (!trimmedContent && !trimmedPhotoUrl)) {
        console.log("❌ Conversation, contenu ou photo manquant");

        return socket.emit("chat_error", {
          message:
            "La conversation et le contenu ou la photo sont obligatoires.",
        });
      }

      /*
       * Vérification que l'utilisateur
       * participe bien à la conversation
       */
      const participant = await ConversationParticipant.findOne({
        where: {
          Id_conversations: conversationId,
          Id_users: userId,
        },
      });

      if (!participant) {
        console.log(
          `❌ Utilisateur ${userId} non participant à la conversation ${conversationId}`,
        );

        return socket.emit("chat_error", {
          message: "Vous ne participez pas à cette conversation.",
        });
      }

      /*
       * Vérification avant insertion
       */
      console.log("💾 Création message avec :", {
        conversationId,
        userId,
        contenu: trimmedContent,
        photo_url: trimmedPhotoUrl,
      });

      /*
       * Création du message
       */
      const message = await Messages.create({
        Id_conversations: conversationId,

        Id_users: userId,

        contenu: trimmedContent || null,

        photo_url: trimmedPhotoUrl,

        lu: false,

        created_at: new Date(),

        updated_at: new Date(),
      });

      console.log(
        `💾 Message créé : id=${message.Id_messages}, conversation=${conversationId}, user=${userId}, photo_url=${JSON.stringify(message.photo_url)}`,
      );

      /*
       * On recharge le message depuis
       * la base avec les informations
       * de l'utilisateur.
       */
      const messageWithUser = await Messages.findByPk(message.Id_messages, {
        include: [
          {
            association: "user",
            attributes: ["Id_users", "pseudo", "prenom", "nom"],
          },
        ],
      });

      /*
       * Vérification du résultat récupéré
       */
      console.log("🔎 Message récupéré depuis la DB :", {
        id: messageWithUser?.Id_messages,

        contenu: messageWithUser?.contenu,

        photo_url: messageWithUser?.photo_url,
      });

      /*
       * Payload envoyé au frontend
       */
      const payload = {
        message: messageWithUser,

        senderId: userId,

        conversationId,
      };

      console.log("📤 new_message envoyé avec :", {
        conversationId,

        messageId: messageWithUser?.Id_messages,

        photo_url: messageWithUser?.photo_url,
      });

      /*
       * Envoi à tous les utilisateurs
       * présents dans la conversation.
       */
      io.to(`conversation:${conversationId}`).emit("new_message", payload);

      /*
       * Sécurité supplémentaire :
       * l'expéditeur reçoit également
       * directement le message.
       */
      socket.emit("new_message", payload);
    } catch (error) {
      console.error("❌ Erreur send_message :", error);

      socket.emit("chat_error", {
        message: "Impossible d'envoyer le message.",
      });
    }
  });

  /*
   * Quitter une conversation
   */
  socket.on("leave_conversation", (conversationId) => {
    console.log(
      `📤 leave_conversation : socket=${socket.id}, conversation=${conversationId}`,
    );

    socket.leave(`conversation:${conversationId}`);

    socket.emit("left_conversation", {
      conversationId,
    });

    console.log(
      `👤 ${socket.user.id} a quitté la conversation ${conversationId}`,
    );
  });
};

export default conversationSocket;
