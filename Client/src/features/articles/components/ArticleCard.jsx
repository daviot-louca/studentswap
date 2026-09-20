import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addFavorite,
  removeFavorite,
} from "../../favorites/api/favorites.api";

function ArticleCard({ article }) {
  const data = article;
  const navigate = useNavigate();

  const isSeen =
    Boolean(data?.articleVu) ||
    Boolean(data?.articlesVus) ||
    Boolean(data?.isSeen);

  const [isFavorite, setIsFavorite] = useState(
    Boolean(data?.favorite) || Boolean(data?.isFavorite),
  );

  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const handleFavorite = async (event) => {
    event?.stopPropagation();

    if (!data?.Id_articles || isFavoriteLoading) return;

    setIsFavoriteLoading(true);

    try {
      if (isFavorite) {
        await removeFavorite(data.Id_articles);
        setIsFavorite(false);
      } else {
        await addFavorite(data.Id_articles);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Erreur gestion favori :", error);
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  const handleViewArticle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const articleId = data?.Id_articles;

    if (!articleId) {
      console.error(
        "Impossible d'ouvrir l'article : Id_articles manquant",
        data,
      );
      return;
    }

    console.log("Ouverture de l'article :", articleId);

    navigate(`/articles/${articleId}`);
  };

  return (
    <article className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-100">
      <div className="relative aspect-4/5 overflow-hidden bg-gray-100">
        {data?.image ? (
          <img
            src={data.image}
            alt={data?.titre || "Article"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                📦
              </div>

              <p className="text-sm font-medium text-muted">
                Photo de l'article
              </p>
            </div>
          </div>
        )}

        <div className="absolute left-4 top-4 flex items-center gap-2">
          {data?.etat?.nom && (
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-text shadow-sm backdrop-blur">
              {data.etat.nom}
            </span>
          )}

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur ${
              isSeen ? "bg-gray-500/90" : "bg-accent/90"
            }`}
          >
            {isSeen ? "Déjà vu" : "Jamais vu"}
          </span>
        </div>

        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onPointerMove={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
          onClick={handleFavorite}
          disabled={isFavoriteLoading}
          aria-label={
            isFavorite
              ? "Retirer des favoris"
              : "Ajouter aux favoris"
          }
          className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-2xl shadow-sm backdrop-blur transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 ${
            isFavorite
              ? "text-primary"
              : "text-muted hover:text-primary"
          }`}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <div className="mb-2 flex items-start justify-between gap-3">
            <h2 className="text-xl font-bold tracking-tight text-text">
              {data?.titre || "Sans titre"}
            </h2>

            {data?.subCategory?.nom && (
              <span className="shrink-0 rounded-lg bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                {data.subCategory.nom}
              </span>
            )}
          </div>

          <p className="text-sm leading-5 text-muted">
            {data?.description ||
              "Aucune description disponible."}
          </p>
        </div>

        {data?.user?.ville?.nom && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>⌖</span>
            <span>{data.user.ville.nom}</span>
          </div>
        )}

        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onPointerMove={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
          onClick={handleViewArticle}
          className="relative z-30 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
        >
          Voir l'article
        </button>
      </div>
    </article>
  );
}

export default ArticleCard;