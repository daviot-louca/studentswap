import { useState } from "react";
import { createProposal } from "../api/proposals.api";

const DEFAULT_MESSAGE =
  "Bonjour, je suis intéressé par ton article. Serais-tu intéressé par un échange ?";

function ProposalModal({
  article,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !article) {
    return null;
  }

  const handleClose = () => {
    if (loading) {
      return;
    }

    setMessage(DEFAULT_MESSAGE);
    setError(null);
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!article.Id_articles || loading) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const proposal = await createProposal(
        article.Id_articles,
        message,
      );

      if (onSuccess) {
        onSuccess(proposal);
      }

      setMessage(DEFAULT_MESSAGE);
      setError(null);
      onClose();
    } catch (err) {
      console.error(
        "Erreur création proposition :",
        err,
      );

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Impossible d'envoyer la proposition.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
      <div className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-text">
              Proposer un troc
            </h2>

            <p className="mt-1 text-sm text-muted">
              Envoie une proposition au propriétaire.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <div className="mb-5 rounded-2xl bg-background p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Article
          </p>

          <p className="mt-1 font-semibold text-text">
            {article.titre || "Article sans titre"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="proposal-message"
              className="mb-2 block text-sm font-semibold text-text"
            >
              Message
            </label>

            <textarea
              id="proposal-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              maxLength={500}
              disabled={loading}
              className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:bg-gray-100"
            />

            <div className="mt-1 text-right text-xs text-muted">
              {message.length}/500
            </div>
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-text transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="flex-1 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Envoi..." : "Proposer ↔"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProposalModal;