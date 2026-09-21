import { useEffect, useState } from "react";

import {
  getConversations,
} from "../api/conversations.api";

import ConversationList from "../components/ConversationList";
import { getSocket } from "../../../shared/lib/socket";

function Conversations() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadConversations() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getConversations();

        setConversations(
          Array.isArray(data) ? data : [],
        );
      } catch (requestError) {
        console.error(
          "Erreur récupération conversations :",
          requestError,
        );

        setError(
          requestError.response?.data?.message ||
            requestError.response?.data?.error ||
            "Impossible de récupérer vos conversations.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadConversations();
  }, []);

  useEffect(() => {
    const socket = getSocket();

    if (!socket) {
      return undefined;
    }

    const handleNewMessage = (payload) => {
      const newMessage = payload?.message ?? payload;
      const senderId =
        payload?.senderId ?? newMessage?.Id_users;

      const conversationId =
        payload?.conversationId ??
        newMessage?.Id_conversations ??
        newMessage?.conversationId ??
        newMessage?.conversation?.Id_conversations;

      if (!conversationId) {
        return;
      }

      const currentUserId =
        newMessage?.user?.Id_users ??
        newMessage?.user?.id ??
        null;

      setConversations((currentConversations) => {
        const conversationIndex =
          currentConversations.findIndex(
            (conversation) => {
              const currentConversationId =
                conversation?.Id_conversations ??
                conversation?.id;

              return (
                String(currentConversationId) ===
                String(conversationId)
              );
            },
          );

        if (conversationIndex === -1) {
          return currentConversations;
        }

        const conversation =
          currentConversations[conversationIndex];

        const conversationUserId =
          conversation?.currentUser?.Id_users ??
          conversation?.currentUser?.id ??
          null;

        const isOwnMessage =
          (senderId != null &&
            conversationUserId != null &&
            String(senderId) ===
              String(conversationUserId)) ||
          (senderId == null &&
            currentUserId != null &&
            conversationUserId != null &&
            String(currentUserId) ===
              String(conversationUserId));

        const updatedConversation = {
          ...conversation,
          unreadCount: isOwnMessage
            ? Number(conversation?.unreadCount) || 0
            : (Number(conversation?.unreadCount) || 0) + 1,
          lastMessage: newMessage,
        };

        return [
          updatedConversation,
          ...currentConversations.filter(
            (_, index) =>
              index !== conversationIndex,
          ),
        ];
      });
    };

    socket.on(
      "new_message",
      handleNewMessage,
    );

    return () => {
      socket.off(
        "new_message",
        handleNewMessage,
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-background pb-28 text-text">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">
            Messages
          </h1>

          <p className="mt-1 text-sm text-muted">
            Retrouvez vos échanges avec les autres étudiants.
          </p>
        </header>

        {error && (
          <div className="mb-5 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <ConversationList
          conversations={conversations}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}

export default Conversations;