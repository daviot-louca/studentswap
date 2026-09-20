import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getConversation,
  getConversationMessages,
  sendMessage,
} from "../api/conversations.api";

import { updateProposal } from "../../proposals/api/proposals.api";

import ConversationHeader from "../components/ConversationHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import ProposalsMessage from "../../proposals/pages/ProposalsMessage";

function Conversation() {
  const { id } = useParams();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [updatingProposalId, setUpdatingProposalId] =
    useState(null);
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

        const [conversationData, messagesData] =
          await Promise.all([
            getConversation(id),
            getConversationMessages(id),
          ]);

        if (cancelled) return;

        setConversation(conversationData);

        setMessages(
          Array.isArray(messagesData)
            ? messagesData
            : [],
        );
      } catch (requestError) {
        if (cancelled) return;

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

  const currentUser =
    conversation?.currentUser ??
    conversation?.me ??
    null;

  const currentUserId =
    currentUser?.Id_users ??
    currentUser?.id ??
    currentUser?.Id_user ??
    null;

  const handleSendMessage = async (content) => {
    if (!id || !content.trim() || isSending) {
      return;
    }

    try {
      setIsSending(true);
      setError("");

      const newMessage = await sendMessage(
        id,
        content,
      );

      if (newMessage) {
        setMessages((currentMessages) => [
          ...currentMessages,
          newMessage,
        ]);
      }
    } catch (requestError) {
      console.error(
        "Erreur envoi message :",
        requestError,
      );

      setError(
        requestError.response?.data?.message ||
          requestError.response?.data?.error ||
          "Impossible d'envoyer le message.",
      );
    } finally {
      setIsSending(false);
    }
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

      const updatedProposal = await updateProposal(
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
          <div className="text-4xl">⚠️</div>

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

  const regularMessages = messages.filter(
    (message) => !message?.proposition,
  );

  const proposalMessages = messages.filter(
    (message) => Boolean(message?.proposition),
  );

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
        ) : (
          <>
            <MessageList
              messages={regularMessages}
              currentUser={currentUser}
              isLoading={false}
            />

            {proposalMessages.length > 0 && (
              <div className="mt-4 space-y-4">
                {proposalMessages.map((message) => {
                  const proposalId =
                    message?.proposition
                      ?.Id_propositions_troc;

                  return (
                    <div
                      key={message.Id_messages}
                      className="flex w-full justify-start"
                    >
                      <ProposalsMessage
                        message={message}
                        currentUserId={currentUserId}
                        isUpdating={
                          String(
                            updatingProposalId,
                          ) === String(proposalId)
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
                })}
              </div>
            )}
          </>
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