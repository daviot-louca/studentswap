import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import client from "../../../shared/lib/api";
import { createProposal } from "../api/proposals.api";

function Proposals() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [requestedArticle, setRequestedArticle] =
    useState(location.state?.article ?? null);

  const requestedArticleTitle =
    requestedArticle?.titre || "cet article";

  const [proposalType, setProposalType] =
    useState("exchange");

  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] =
    useState(null);

  const [message, setMessage] = useState(
    `Bonjour, je suis intéressé par ${requestedArticleTitle}. Serais-tu intéressé par un échange ?`,
  );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSending, setIsSending] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setError("");

        const [articleResponse, articlesResponse] =
          await Promise.all([
            client.get(`/articles/${id}`),
            client.get("/articles"),
          ]);

        const loadedArticle =
          articleResponse.data?.article ??
          articleResponse.data?.data ??
          articleResponse.data;

        if (
          loadedArticle &&
          typeof loadedArticle === "object"
        ) {
          setRequestedArticle(loadedArticle);
        }

        const data = articlesResponse.data;

        const list = Array.isArray(data)
          ? data
          : data?.articles ??
            data?.data ??
            [];

        const availableArticles = list.filter(
          (article) =>
            String(article?.Id_articles) !==
            String(id),
        );

        setArticles(availableArticles);
      } catch (requestError) {
        console.error(
          "Erreur récupération des données de demande :",
          requestError,
        );

        setError(
          requestError.response?.data?.message ||
            requestError.response?.data?.error ||
            "Impossible de récupérer les informations de l'article.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadData();
    }
  }, [id]);

  useEffect(() => {
    if (!requestedArticle?.titre) {
      return;
    }

    if (proposalType === "don") {
      setMessage(
        `Bonjour, je suis intéressé par ${requestedArticle.titre}. Serais-tu d'accord pour me le donner ?`,
      );
    } else {
      setMessage(
        `Bonjour, je suis intéressé par ${requestedArticle.titre}. Serais-tu intéressé par un échange ?`,
      );
    }
  }, [requestedArticle, proposalType]);

  const handleProposalTypeChange = (type) => {
    setProposalType(type);
    setSelectedArticle(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!id || isSending) {
      return;
    }

    if (
      proposalType === "exchange" &&
      !selectedArticle
    ) {
      setError(
        "Sélectionnez l'un de vos articles à proposer en échange.",
      );
      return;
    }

    try {
      setIsSending(true);
      setError("");

      await createProposal(
        id,
        message,
        proposalType,
        proposalType === "exchange"
          ? selectedArticle?.Id_articles
          : null,
      );

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
    <main className="min-h-screen overflow-x-hidden bg-background px-4 pb-32 pt-4 text-text sm:px-6 sm:pt-6">
      <div className="mx-auto w-full max-w-2xl">

        <header className="mb-5 flex items-center gap-3 sm:mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm transition active:scale-95 sm:hover:scale-105"
            aria-label="Retour"
          >
            ←
          </button>

          <div className="min-w-0">
            <h1 className="text-xl font-bold leading-tight sm:text-2xl">
              Faire une demande
            </h1>

            <p className="mt-1 text-sm leading-5 text-muted">
              Choisissez entre un échange ou un don.
            </p>
          </div>
        </header>

        <section className="mb-5 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
          {requestedArticle?.image ? (
            <img
              src={requestedArticle.image}
              alt={requestedArticleTitle}
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-background text-2xl">
              📦
            </div>
          )}

          <div className="min-w-0">
            <p className="text-xs font-medium text-muted">
              Article demandé
            </p>

            <p className="mt-0.5 truncate text-sm font-bold text-text">
              {requestedArticleTitle}
            </p>
          </div>
        </section>

        {error && (
          <div className="mb-5 rounded-2xl bg-red-50 p-4 text-sm leading-5 text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-5"
        >

          <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-base font-bold">
              Type de demande
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() =>
                  handleProposalTypeChange("exchange")
                }
                className={`min-h-32 rounded-2xl border p-4 text-left transition active:scale-[0.99] ${
                  proposalType === "exchange"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-gray-200 bg-background sm:hover:border-primary/30"
                }`}
              >
                <span className="text-2xl">
                  🔄
                </span>

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
                className={`min-h-32 rounded-2xl border p-4 text-left transition active:scale-[0.99] ${
                  proposalType === "don"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-gray-200 bg-background sm:hover:border-primary/30"
                }`}
              >
                <span className="text-2xl">
                  🎁
                </span>

                <span className="mt-2 block text-sm font-bold text-text">
                  Don
                </span>

                <span className="mt-1 block text-xs leading-4 text-muted">
                  Je souhaite recevoir l'article sans échange.
                </span>
              </button>

            </div>
          </section>

          {proposalType === "exchange" && (
            <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-5">

              <h2 className="text-base font-bold">
                Mon article à proposer
              </h2>

              <p className="mt-1 text-sm leading-5 text-muted">
                Sélectionnez l'un de vos articles à proposer en échange.
              </p>

              {isLoading ? (
                <div className="mt-4 animate-pulse space-y-3">
                  <div className="h-24 rounded-2xl bg-gray-200" />
                  <div className="h-24 rounded-2xl bg-gray-200" />
                </div>
              ) : articles.length === 0 ? (
                <div className="mt-4 rounded-2xl bg-background p-5 text-center">

                  <p className="text-sm font-semibold text-text">
                    Aucun article disponible
                  </p>

                  <p className="mt-1 text-xs leading-4 text-muted">
                    Vous pouvez choisir le don si vous ne souhaitez pas proposer d'article.
                  </p>

                </div>
              ) : (
                <div className="mt-4 space-y-3">

                  {articles.map((article) => {
                    const isSelected =
                      String(
                        selectedArticle?.Id_articles,
                      ) ===
                      String(
                        article?.Id_articles,
                      );

                    return (
                      <button
                        key={article.Id_articles}
                        type="button"
                        onClick={() =>
                          setSelectedArticle(article)
                        }
                        className={`flex min-h-24 w-full items-center gap-3 rounded-2xl border p-3 text-left transition active:scale-[0.99] sm:gap-4 ${
                          isSelected
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-gray-100 bg-background sm:hover:border-primary/30"
                        }`}
                      >

                        {article?.image ? (
                          <img
                            src={article.image}
                            alt={
                              article?.titre ||
                              "Article"
                            }
                            className="h-20 w-20 shrink-0 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white text-2xl">
                            📦
                          </div>
                        )}

                        <div className="min-w-0 flex-1">

                          <p className="truncate text-sm font-semibold text-text">
                            {article?.titre ||
                              "Sans titre"}
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs leading-4 text-muted sm:text-sm">
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

          <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-5">

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
              maxLength={1000}
              className="mt-4 min-h-32 w-full resize-none rounded-2xl border border-gray-200 bg-background p-4 text-sm leading-5 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Écrivez un message..."
            />

            <p className="mt-2 text-right text-xs text-muted">
              {message.length}/1000
            </p>

          </section>

          <button
            type="submit"
            disabled={
              isSending ||
              (proposalType === "exchange" &&
                (!selectedArticle || isLoading))
            }
            className="min-h-12 w-full rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-sm transition active:scale-[0.99] sm:hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
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