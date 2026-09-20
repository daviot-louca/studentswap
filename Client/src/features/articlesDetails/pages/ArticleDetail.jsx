import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import client from "../../../shared/lib/api";

import {
  getFavorite,
  addFavorite,
  removeFavorite,
} from "../../favorites/api/favorites.api";

import ArticleDetailHeader from "../components/ArticleDetailHeader";
import ArticleDetailGallery from "../components/ArticleDetailGallery";
import ArticleDetailInfo from "../components/ArticleDetailInfo";
import ArticleDetailActions from "../components/ArticleDetailActions";
import ArticleDetailLoading from "../components/ArticleDetailLoading";
import ArticleDetailError from "../components/ArticleDetailError";

import {
  getArticlePhotos,
  getArticleTitle,
  getArticleDescription,
  getArticleCategory,
  getArticleSubCategory,
  getArticleState,
  getArticleCity,
  getArticleOwner,
} from "../utils/articleDetail.utils";

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadArticle() {
      if (!id) {
        setError("Identifiant de l'article manquant.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");
      setCurrentPhoto(0);

      try {
        const { data } = await client.get(`/articles/${id}`);

        const loadedArticle =
          data?.article ??
          data?.data ??
          data;

        if (
          !loadedArticle ||
          typeof loadedArticle !== "object"
        ) {
          throw new Error("Article introuvable");
        }

        if (cancelled) return;

        setArticle(loadedArticle);

        try {
          const favorite = await getFavorite(id);

          if (!cancelled) {
            setIsFavorite(Boolean(favorite));
          }
        } catch (favoriteError) {
          if (favoriteError.response?.status !== 404) {
            console.error(
              "Erreur récupération favori :",
              favoriteError,
            );
          }

          if (!cancelled) {
            setIsFavorite(false);
          }
        }
      } catch (requestError) {
        if (cancelled) return;

        console.error(
          "Erreur récupération article :",
          requestError,
        );

        setError(
          requestError.response?.data?.message ||
          requestError.response?.data?.error ||
          requestError.message ||
          "Impossible de récupérer cet article.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadArticle();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleFavorite = async () => {
    if (!id || isFavoriteLoading) return;

    setIsFavoriteLoading(true);

    try {
      if (isFavorite) {
        await removeFavorite(id);
        setIsFavorite(false);
      } else {
        await addFavorite(id);
        setIsFavorite(true);
      }
    } catch (requestError) {
      console.error(
        "Erreur gestion favori :",
        requestError,
      );
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  const handlePreviousPhoto = () => {
    const photos = getArticlePhotos(article);

    if (photos.length <= 1) return;

    setCurrentPhoto(
      (currentPhoto - 1 + photos.length) % photos.length,
    );
  };

  const handleNextPhoto = () => {
    const photos = getArticlePhotos(article);

    if (photos.length <= 1) return;

    setCurrentPhoto(
      (currentPhoto + 1) % photos.length,
    );
  };

  if (isLoading) {
    return <ArticleDetailLoading />;
  }

  if (error || !article) {
    return (
      <ArticleDetailError
        message={error}
        onBack={() => navigate(-1)}
      />
    );
  }

  const photoUrls = getArticlePhotos(article);

  const title = getArticleTitle(article);
  const description = getArticleDescription(article);
  const category = getArticleCategory(article);
  const subCategory = getArticleSubCategory(article);
  const state = getArticleState(article);
  const city = getArticleCity(article);
  const owner = getArticleOwner(article);

  return (
    <main className="min-h-screen bg-background pb-28 text-text">
      <div className="mx-auto max-w-2xl px-4 py-5">
        <ArticleDetailHeader
          isFavorite={isFavorite}
          isFavoriteLoading={isFavoriteLoading}
          onBack={() => navigate(-1)}
          onFavorite={handleFavorite}
        />

        <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <ArticleDetailGallery
            photoUrls={photoUrls}
            currentPhoto={currentPhoto}
            onPrevious={handlePreviousPhoto}
            onNext={handleNextPhoto}
            onSelectPhoto={setCurrentPhoto}
            title={title}
          />

          <ArticleDetailInfo
            title={title}
            description={description}
            category={category}
            subCategory={subCategory}
            state={state}
            owner={owner}
            city={city}
          />
        </section>
        <ArticleDetailActions
          onProposal={() =>
            navigate(`/articles/${id}/proposer`, {
              state: {
                article,
              },
            })}
        />
      </div>
    </main>
  );
}

export default ArticleDetail;