import { useEffect, useState } from "react";

import {
  getConversations,
} from "../api/conversations.api";

import ConversationList from "../components/ConversationList";

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