import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addFavorite,
  removeFavorite,
} from "../../favorites/api/favorites.api";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

function getPhotoUrl(photo) {
  if (!photo) {
    return null;
  }

  const rawUrl =
    typeof photo === "string"
      ? photo
      : photo?.url ||
        photo?.URL ||
        photo?.photo ||
        photo?.path ||
        photo?.src ||
        null;

  if (!rawUrl) {
    return null;
  }

  if (
    rawUrl.startsWith("http://") ||
    rawUrl.startsWith("https://") ||
    rawUrl.startsWith("blob:")
  ) {
    return rawUrl;
  }

  return `${API_URL}${
    rawUrl.startsWith("/") ? "" : "/"
  }${rawUrl}`;
}

function getArticlePhotos(article) {
  const photos =
    article?.photos ||
    article?.Photos ||
    article?.articlePhotos ||
    article?.ArticlePhotos ||
    article?.articlePhoto ||
    article?.ArticlePhoto ||
    [];

  if (!Array.isArray(photos)) {
    return [];
  }

  return photos
    .map((photo) => getPhotoUrl(photo))
    .filter(Boolean);
}

function ArticleCard({ article }) {
  const data = article;
  const navigate = useNavigate();

  const isSeen =
    Boolean(data?.articleVu) ||
    Boolean(data?.articlesVus) ||
    Boolean(data?.isSeen);

  const [isFavorite, setIsFavorite] = useState(
    Boolean(data?.favorite) ||
      Boolean(data?.isFavorite),
  );

  const [isFavoriteLoading, setIsFavoriteLoading] =
    useState(false);

  const photos = getArticlePhotos(data);

  const imageUrl =
    photos[0] ||
    getPhotoUrl(data?.image) ||
    getPhotoUrl(data?.photo);

  const handleFavorite = async (event) => {
    event?.stopPropagation();

    if (
      !data?.Id_articles ||
      isFavoriteLoading
    ) {
      return;
    }

    setIsFavoriteLoading(true);

    try {
      if (isFavorite) {
        await removeFavorite(
          data.Id_articles,
        );

        setIsFavorite(false);
      } else {
        await addFavorite(
          data.Id_articles,
        );

        setIsFavorite(true);
      }
    } catch (error) {
      console.error(
        "Erreur gestion favori :",
        error,
      );
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  const handleViewArticle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const articleId =
      data?.Id_articles;

    if (!articleId) {
      console.error(
        "Impossible d'ouvrir l'article : Id_articles manquant",
        data,
      );

      return;
    }

    navigate(
      `/articles/${articleId}`,
    );
  };

  return (
    <article className="relative mx-auto w-full max-w-77.5 select-none overflow-hidden rounded-2xl bg-rose  shadow-text shadow-[5px_6px_0_5px_rgba(23,25,35,0.80)]">
      <div className="relative aspect-4/3.5 select-none overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={
              data?.titre ||
              "Article"
            }
            className="h-full w-full select-none object-cover"
            loading="lazy"
            draggable={false}
            onDragStart={(event) =>
              event.preventDefault()
            }
            onError={(event) => {
              event.currentTarget.style.display =
                "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                📦
              </div>

              <p className="text-xs font-medium text-muted">
                Photo de l'article
              </p>
            </div>
          </div>
        )}

        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          {data?.etat?.nom && (
            <span className="rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-text shadow-sm backdrop-blur">
              {data.etat.nom}
            </span>
          )}

          <span
            className={`rounded-full px-2 py-1 text-[10px] font-semibold text-text shadow-sm backdrop-blur ${
              isSeen
                ? "bg-gray-500"
                : "bg-accent/90"
            }`}
          >
            {isSeen
              ? "Déjà vu"
              : "Jamais vu"}
          </span>
        </div>

        <button
          type="button"
          onPointerDown={(event) =>
            event.stopPropagation()
          }
          onPointerMove={(event) =>
            event.stopPropagation()
          }
          onPointerUp={(event) =>
            event.stopPropagation()
          }
          onClick={handleFavorite}
          disabled={isFavoriteLoading}
          aria-label={
            isFavorite
              ? "Retirer des favoris"
              : "Ajouter aux favoris"
          }
          className={`absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-lg shadow-sm backdrop-blur transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 ${
            isFavorite
              ? "text-primary"
              : "text-muted hover:text-primary"
          }`}
        >
          {isFavorite
            ? "♥"
            : "♡"}
        </button>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <div className="mb-1.5 flex items-start justify-between gap-2">
            <h2 className="min-w-0 text-[17px] font-bold leading-5 tracking-tight text-text">
              {data?.titre ||
                "Sans titre"}
            </h2>

            {data?.subCategory
              ?.nom && (
              <span className="rounded-full px-2 py-1 text-[10px] font-semibold text-text shadow-sm backdrop-blur bg-primary/90 ">
                {
                  data.subCategory
                    .nom
                }
              </span>
            )}
          </div>

          <p className="line-clamp-2 text-xs leading-4 text-muted">
            {data?.description ||
              "Aucune description disponible."}
          </p>
        </div>

        {data?.user?.ville
          ?.nom && (
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <span>⌖</span>

            <span>
              {data.user.ville.nom}
            </span>
          </div>
        )}

        <button
          type="button"
          onPointerDown={(event) =>
            event.stopPropagation()
          }
          onPointerMove={(event) =>
            event.stopPropagation()
          }
          onPointerUp={(event) =>
            event.stopPropagation()
          }
          onClick={handleViewArticle}
          className="relative z-30 w-full rounded-lg bg-primary py-3 text-xs font-semibold text-text shadow-sm transition hover:bg-primary-dark"
        >
          Voir l'article
        </button>
      </div>
    </article>
  );
}

export default ArticleCard;