import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getConversation,
  getConversationMessages,
} from "../api/conversations.api";

import { updateProposal } from "../../proposals/api/proposals.api";

import ConversationHeader from "../components/ConversationHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import ProposalsMessage from "../../proposals/pages/ProposalsMessage";

import { getSocket } from "../../../shared/lib/socket";

function Conversation() {
  const { id } = useParams();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [updatingProposalId, setUpdatingProposalId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadConversation() {
      if (!id) {
        setError("Conversation introuvable.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const [conversationData, messagesData] = await Promise.all([
          getConversation(id),
          getConversationMessages(id),
        ]);

        if (cancelled) {
          return;
        }

        setConversation(conversationData);

        let loadedMessages = [];

        if (Array.isArray(messagesData)) {
          loadedMessages = messagesData;
        } else if (Array.isArray(messagesData?.data)) {
          loadedMessages = messagesData.data;
        } else if (Array.isArray(messagesData?.messages)) {
          loadedMessages = messagesData.messages;
        } else if (Array.isArray(messagesData?.data?.messages)) {
          loadedMessages = messagesData.data.messages;
        }

        setMessages(loadedMessages);
      } catch (requestError) {
        if (cancelled) {
          return;
        }

        console.error(
          "Erreur récupération conversation :",
          requestError,
        );

        setError(
          requestError.response?.data?.message ||
          requestError.response?.data?.error ||
          "Impossible de récupérer cette conversation.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadConversation();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    const socket = getSocket();

    console.log("🧩 Conversation socket effect", {
      conversationId: id,
      socketId: socket?.id,
      connected: socket?.connected,
    });

    if (!socket || !id) {
      return undefined;
    }

    const handleNewMessage = (payload) => {
      console.log(
        "📨 new_message reçu dans Conversation.jsx :",
        payload,
      );

      const message = payload?.message ?? payload;

      if (!message) {
        return;
      }

      const messageConversationId =
        payload?.conversationId ??
        message?.Id_conversations ??
        message?.conversationId ??
        message?.conversation?.Id_conversations;

      if (
        !messageConversationId ||
        String(messageConversationId) !== String(id)
      ) {
        return;
      }

      setMessages((currentMessages) => {
        const messageId = message?.Id_messages;

        if (
          messageId &&
          currentMessages.some(
            (currentMessage) =>
              String(currentMessage?.Id_messages) ===
              String(messageId),
          )
        ) {
          return currentMessages;
        }

        return [...currentMessages, message];
      });
    };

    const handleChatError = (payload) => {
      console.error(
        "❌ chat_error dans Conversation.jsx :",
        payload,
      );

      const message = payload?.message;

      if (message) {
        setError(message);
      }
    };

    const joinConversation = () => {
      console.log(
        "📥 Envoi join_conversation :",
        id,
      );

      socket.emit("join_conversation", id);
    };

    socket.on(
      "new_message",
      handleNewMessage,
    );

    socket.on(
      "chat_error",
      handleChatError,
    );

    if (socket.connected) {
      console.log(
        "🚀 Socket déjà connecté, join immédiat",
      );

      joinConversation();
    } else {
      console.log(
        "⏳ Socket pas encore connecté, attente du connect",
      );

      socket.once(
        "connect",
        joinConversation,
      );
    }

    return () => {
      socket.off(
        "new_message",
        handleNewMessage,
      );

      socket.off(
        "chat_error",
        handleChatError,
      );

      socket.off(
        "connect",
        joinConversation,
      );

      if (socket.connected) {
        console.log(
          "📤 Envoi leave_conversation :",
          id,
        );

        socket.emit(
          "leave_conversation",
          id,
        );
      }
    };
  }, [id]);

  const currentUser =
    conversation?.currentUser ??
    conversation?.me ??
    null;

  const currentUserId =
    currentUser?.Id_users ??
    currentUser?.id ??
    currentUser?.Id_user ??
    null;

  const handleSendMessage = (content) => {
    console.log(
      "✉️ handleSendMessage appelé :",
      content,
    );

    const trimmedContent = content?.trim();

    if (!id || !trimmedContent || isSending) {
      console.log(
        "⚠️ Envoi bloqué :",
        {
          id,
          trimmedContent,
          isSending,
        },
      );

      return;
    }

    const socket = getSocket();

    console.log(
      "📡 Socket utilisé pour envoyer :",
      {
        socketId: socket?.id,
        connected: socket?.connected,
        conversationId: id,
      },
    );

    if (!socket) {
      setError(
        "Connexion temps réel indisponible.",
      );

      return;
    }

    setIsSending(true);
    setError("");

    const sendMessage = () => {
      console.log(
        "📤 Envoi send_message :",
        {
          conversationId: id,
          contenu: trimmedContent,
          socketId: socket.id,
          connected: socket.connected,
        },
      );

      socket.emit("send_message", {
        conversationId: id,
        contenu: trimmedContent,
      });

      console.log(
        "✅ socket.emit(send_message) exécuté",
      );

      setIsSending(false);
    };

    if (socket.connected) {
      console.log(
        "🚀 Socket connecté, envoi immédiat",
      );

      sendMessage();

      return;
    }

    console.log(
      "⏳ Socket non connecté, attente du connect",
    );

    let timeoutId;

    const handleConnect = () => {
      console.log(
        "✅ Socket reconnecté, envoi du message",
      );

      window.clearTimeout(timeoutId);

      socket.off(
        "connect",
        handleConnect,
      );

      sendMessage();
    };

    socket.once(
      "connect",
      handleConnect,
    );

    timeoutId = window.setTimeout(() => {
      console.error(
        "❌ Timeout connexion Socket.IO",
      );

      socket.off(
        "connect",
        handleConnect,
      );

      setIsSending(false);

      setError(
        "Impossible de se connecter au serveur de messagerie.",
      );
    }, 5000);
  };

  const handleProposalUpdate = async (
    proposalId,
    statut,
  ) => {
    if (!proposalId || updatingProposalId) {
      return;
    }

    try {
      setUpdatingProposalId(proposalId);
      setError("");

      const updatedProposal =
        await updateProposal(
          proposalId,
          statut,
        );

      setMessages((currentMessages) =>
        currentMessages.map((message) => {
          const messageProposalId =
            message?.proposition
              ?.Id_propositions_troc;

          if (
            String(messageProposalId) !==
            String(proposalId)
          ) {
            return message;
          }

          return {
            ...message,
            proposition: {
              ...message.proposition,
              ...(updatedProposal || {}),
              statut,
            },
          };
        }),
      );
    } catch (requestError) {
      console.error(
        "Erreur modification proposition :",
        requestError,
      );

      setError(
        requestError.response?.data?.message ||
        requestError.response?.data?.error ||
        requestError.message ||
        "Impossible de modifier la proposition.",
      );
    } finally {
      setUpdatingProposalId(null);
    }
  };

  if (error && !conversation) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 text-text">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-sm">
          <div className="text-4xl">
            ⚠️
          </div>

          <h1 className="mt-4 text-lg font-bold">
            Une erreur est survenue
          </h1>

          <p className="mt-2 text-sm text-muted">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-background text-text">
      {conversation && (
        <ConversationHeader
          conversation={conversation}
        />
      )}

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-3">
        {isLoading ? (
          <MessageList
            messages={[]}
            currentUser={currentUser}
            isLoading
          />
        ) : messages.length === 0 ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                💬
              </div>

              <h2 className="mt-4 text-base font-bold text-text">
                Aucun message
              </h2>

              <p className="mt-1 text-sm text-muted">
                Commencez la conversation.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const proposal =
                message?.proposition;

              if (proposal) {
                const proposalId =
                  proposal?.Id_propositions_troc;

                return (
                  <div
                    key={
                      message?.Id_messages ||
                      proposalId
                    }
                    className="flex w-full justify-start"
                  >
                    <ProposalsMessage
                      message={message}
                      currentUserId={
                        currentUserId
                      }
                      isUpdating={
                        String(
                          updatingProposalId,
                        ) ===
                        String(proposalId)
                      }
                      onAccept={() =>
                        handleProposalUpdate(
                          proposalId,
                          "acceptee",
                        )
                      }
                      onRefuse={() =>
                        handleProposalUpdate(
                          proposalId,
                          "refusee",
                        )
                      }
                    />
                  </div>
                );
              }

              return (
                <MessageList
                  key={message?.Id_messages}
                  messages={[message]}
                  currentUser={currentUser}
                  isLoading={false}
                />
              );
            })}
          </div>
        )}
      </div>

      {error && (
        <div className="shrink-0 border-t border-red-100 bg-red-50 px-4 py-2 text-center text-xs text-red-600">
          {error}
        </div>
      )}

      <MessageInput
        onSend={handleSendMessage}
        isSending={isSending}
      />
    </main>
  );
}

export default Conversation;