import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import client from "../../../shared/lib/api";
import { createProposal } from "../api/proposals.api";

function Proposals() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proposalType, setProposalType] = useState("exchange");
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [message, setMessage] = useState(
    "Bonjour, je suis intéressé par ton article. Serais-tu intéressé par un échange ?",
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        setError("");

        const { data } = await client.get("/articles");

        const list = Array.isArray(data)
          ? data
          : data?.articles ?? data?.data ?? [];

        const availableArticles = list.filter(
          (article) =>
            String(article?.Id_articles) !== String(id),
        );

        setArticles(availableArticles);
      } catch (requestError) {
        console.error(
          "Erreur récupération des articles :",
          requestError,
        );

        setError(
          requestError.response?.data?.message ||
            requestError.response?.data?.error ||
            "Impossible de récupérer vos articles.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadArticles();
  }, [id]);

  const handleProposalTypeChange = (type) => {
    setProposalType(type);
    setSelectedArticle(null);
    setError("");

    if (type === "don") {
      setMessage(
        "Bonjour, je suis intéressé par ton article. Serais-tu d'accord pour me le donner ?",
      );
    } else {
      setMessage(
        "Bonjour, je suis intéressé par ton article. Serais-tu intéressé par un échange ?",
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!id || isSending) {
      return;
    }

    if (proposalType === "exchange" && !selectedArticle) {
      setError(
        "Sélectionnez l'article que vous souhaitez proposer en échange.",
      );
      return;
    }

    try {
      setIsSending(true);
      setError("");

      await createProposal(id, message);

      navigate("/messages");
    } catch (requestError) {
      console.error(
        "Erreur création proposition :",
        requestError,
      );

      setError(
        requestError.response?.data?.message ||
          requestError.response?.data?.error ||
          "Impossible d'envoyer la demande.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-6 pb-28 text-text">
      <div className="mx-auto max-w-2xl">
        <header className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-sm transition hover:scale-105"
            aria-label="Retour"
          >
            ←
          </button>

          <div>
            <h1 className="text-xl font-bold">
              Faire une demande
            </h1>

            <p className="mt-1 text-sm text-muted">
              Choisissez entre un échange ou un don.
            </p>
          </div>
        </header>

        {error && (
          <div className="mb-5 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TYPE DE DEMANDE */}
          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold">
              Type de demande
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  handleProposalTypeChange("exchange")
                }
                className={`rounded-2xl border p-4 text-left transition ${
                  proposalType === "exchange"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-gray-200 bg-background hover:border-primary/30"
                }`}
              >
                <span className="text-2xl">🔄</span>

                <span className="mt-2 block text-sm font-bold text-text">
                  Échange
                </span>

                <span className="mt-1 block text-xs leading-4 text-muted">
                  Je propose un de mes articles en retour.
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleProposalTypeChange("don")
                }
                className={`rounded-2xl border p-4 text-left transition ${
                  proposalType === "don"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-gray-200 bg-background hover:border-primary/30"
                }`}
              >
                <span className="text-2xl">🎁</span>

                <span className="mt-2 block text-sm font-bold text-text">
                  Don
                </span>

                <span className="mt-1 block text-xs leading-4 text-muted">
                  Je souhaite recevoir l'article sans échange.
                </span>
              </button>
            </div>
          </section>

          {/* ARTICLE À PROPOSER */}
          {proposalType === "exchange" && (
            <section className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold">
                Mon article à proposer
              </h2>

              <p className="mt-1 text-sm text-muted">
                Sélectionnez l'article que vous souhaitez proposer
                en échange.
              </p>

              {isLoading ? (
                <div className="mt-4 animate-pulse space-y-3">
                  <div className="h-20 rounded-2xl bg-gray-200" />
                  <div className="h-20 rounded-2xl bg-gray-200" />
                </div>
              ) : articles.length === 0 ? (
                <div className="mt-4 rounded-2xl bg-background p-5 text-center">
                  <p className="text-sm font-semibold text-text">
                    Aucun article disponible
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    Vous pouvez choisir le don si vous ne souhaitez
                    pas proposer d'article.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {articles.map((article) => {
                    const isSelected =
                      String(
                        selectedArticle?.Id_articles,
                      ) === String(article?.Id_articles);

                    return (
                      <button
                        key={article.Id_articles}
                        type="button"
                        onClick={() =>
                          setSelectedArticle(article)
                        }
                        className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition ${
                          isSelected
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-gray-100 bg-background hover:border-primary/30"
                        }`}
                      >
                        {article?.image ? (
                          <img
                            src={article.image}
                            alt={
                              article?.titre || "Article"
                            }
                            className="h-20 w-20 shrink-0 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white text-2xl">
                            📦
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-text">
                            {article?.titre || "Sans titre"}
                          </p>

                          <p className="mt-1 line-clamp-2 text-sm text-muted">
                            {article?.description ||
                              "Aucune description."}
                          </p>
                        </div>

                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                            isSelected
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isSelected && "✓"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* MESSAGE */}
          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <label
              htmlFor="proposal-message"
              className="text-base font-bold"
            >
              Message
            </label>

            <textarea
              id="proposal-message"
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              rows={5}
              className="mt-4 w-full resize-none rounded-2xl border border-gray-200 bg-background p-4 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Écrivez un message..."
            />
          </section>

          {/* ENVOI */}
          <button
            type="submit"
            disabled={
              isSending ||
              (proposalType === "exchange" &&
                (!selectedArticle || isLoading))
            }
            className="w-full rounded-2xl bg-primary px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending
              ? "Envoi en cours..."
              : proposalType === "don"
                ? "Envoyer la demande de don"
                : "Envoyer la proposition d'échange"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Proposals;