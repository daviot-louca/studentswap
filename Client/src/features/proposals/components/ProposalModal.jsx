import { useEffect, useState } from "react";
import { createProposal } from "../api/proposals.api";
import { getMyArticles } from "../../articles/api/articles.api";

const DEFAULT_MESSAGE =
  "Bonjour, je suis intéressé par ton article. Serais-tu intéressé par un échange ?";

function ProposalModal({
  article,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [myArticles, setMyArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !article) {
      return;
    }

    const loadMyArticles = async () => {
      try {
        setLoadingArticles(true);
        setError(null);

        const articles = await getMyArticles();

        const availableArticles = Array.isArray(articles)
          ? articles.filter(
              (item) =>
                item?.Id_articles !== article?.Id_articles,
            )
          : [];

        setMyArticles(availableArticles);

        if (availableArticles.length > 0) {
          setSelectedArticleId(
            availableArticles[0].Id_articles,
          );
        } else {
          setSelectedArticleId("");
        }
      } catch (err) {
        console.error(
          "Erreur récupération de mes articles :",
          err,
        );

        setMyArticles([]);
        setSelectedArticleId("");

        setError(
          err.response?.data?.error ||
            err.response?.data?.message ||
            "Impossible de récupérer vos articles.",
        );
      } finally {
        setLoadingArticles(false);
      }
    };

    loadMyArticles();
  }, [isOpen, article]);

  if (!isOpen || !article) {
    return null;
  }

  const handleClose = () => {
    if (loading) {
      return;
    }

    setMessage(DEFAULT_MESSAGE);
    setSelectedArticleId("");
    setMyArticles([]);
    setError(null);

    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !article.Id_articles ||
      !selectedArticleId ||
      loading ||
      loadingArticles
    ) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const proposal = await createProposal(
        article.Id_articles,
        message,
        "exchange",
        selectedArticleId,
      );

      if (onSuccess) {
        onSuccess(proposal);
      }

      setMessage(DEFAULT_MESSAGE);
      setSelectedArticleId("");
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
              Choisis l'un de tes articles à proposer en échange.
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
            Article recherché
          </p>

          <p className="mt-1 font-semibold text-text">
            {article.titre || "Article sans titre"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="proposal-article"
              className="mb-2 block text-sm font-semibold text-text"
            >
              Ton article à proposer
            </label>

            {loadingArticles ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-muted">
                Chargement de tes articles...
              </div>
            ) : myArticles.length > 0 ? (
              <select
                id="proposal-article"
                value={selectedArticleId}
                onChange={(event) =>
                  setSelectedArticleId(event.target.value)
                }
                disabled={loading}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:bg-gray-100"
              >
                <option value="" disabled>
                  Sélectionne un article
                </option>

                {myArticles.map((myArticle) => (
                  <option
                    key={myArticle.Id_articles}
                    value={myArticle.Id_articles}
                  >
                    {myArticle.titre || "Article sans titre"}
                  </option>
                ))}
              </select>
            ) : (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                Tu dois avoir au moins un autre article pour
                proposer un troc.
              </div>
            )}
          </div>

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
              onChange={(event) =>
                setMessage(event.target.value)
              }
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
              disabled={
                loading ||
                loadingArticles ||
                !selectedArticleId ||
                !message.trim() ||
                myArticles.length === 0
              }
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