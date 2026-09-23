import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import SwipeStack from "../components/SwipeStack";
import SwipeActions from "../components/SwipeActions";
import { getSwipeArticles } from "../api/articles.api";
import ProposalModal from "../../proposals/components/ProposalModal";

import {
  getFavorite,
  addFavorite,
  removeFavorite,
} from "../../favorites/api/favorites.api";

function Home() {
  const outletContext = useOutletContext();
  const filters = outletContext?.filters || {};

  const swipeStackRef = useRef(null);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState(null);

  const [currentArticle, setCurrentArticle] =
    useState(null);

  const [isFavorite, setIsFavorite] =
    useState(false);

  const [favoriteLoading, setFavoriteLoading] =
    useState(false);

  const [
    isProposalModalOpen,
    setIsProposalModalOpen,
  ] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getSwipeArticles(filters);

        console.log(
          "Articles pour le swipe avec filtres :",
          {
            filters,
            articles: data,
          },
        );

        setArticles(data);
      } catch (err) {
        console.error(
          "Erreur lors du chargement des articles :",
          err,
        );

        setError(
          err.response?.data?.message ||
            err.message ||
            "Impossible de charger les articles.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [filters]);

  /*
   * Bloque le scroll de la page
   * lorsque le modal est ouvert.
   */
  useEffect(() => {
    if (!isProposalModalOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isProposalModalOpen]);

  const handleArticleChange =
    async (article) => {
      setCurrentArticle(article);
      setIsFavorite(false);

      if (!article?.Id_articles) {
        return;
      }

      try {
        const favorite =
          await getFavorite(
            article.Id_articles,
          );

        setIsFavorite(
          Boolean(favorite),
        );
      } catch (err) {
        if (
          err.response?.status !== 404
        ) {
          console.error(
            "Erreur vérification favori :",
            err,
          );
        }
      }
    };

  const handleSwipe = (
    direction,
    article,
  ) => {
    console.log(
      "Swipe :",
      direction,
      article,
    );

    if (direction === "right") {
      setCurrentArticle(article);
      setIsProposalModalOpen(true);
    }
  };

  const handlePass = () => {
    swipeStackRef.current?.pass();
  };

  const handleFavorite =
    async () => {
      if (
        !currentArticle?.Id_articles ||
        favoriteLoading
      ) {
        return;
      }

      try {
        setFavoriteLoading(true);

        console.log(
          "Article favori :",
          currentArticle.Id_articles,
        );

        if (isFavorite) {
          await removeFavorite(
            currentArticle.Id_articles,
          );

          setIsFavorite(false);
        } else {
          await addFavorite(
            currentArticle.Id_articles,
          );

          setIsFavorite(true);
        }
      } catch (err) {
        console.error(
          "Erreur gestion favori :",
          err.response?.data || err,
        );
      } finally {
        setFavoriteLoading(false);
      }
    };

  const handleSwap = () => {
    if (!currentArticle) {
      return;
    }

    setIsProposalModalOpen(true);
  };

  return (
    <section className="relative h-full min-h-0 space-y-6 overflow-hidden">
      {loading && (
        <div className="flex min-h-107.5 items-center justify-center rounded-3xl bg-white text-sm text-muted shadow-sm ring-1 ring-gray-100">
          Chargement des articles...
        </div>
      )}

      {!loading && error && (
        <div className="flex min-h-107.5 items-center justify-center rounded-3xl bg-white px-6 text-center text-sm text-red-500 shadow-sm ring-1 ring-gray-100">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="flex min-h-107.5 items-center justify-center">
            <SwipeStack
              ref={swipeStackRef}
              articles={articles}
              onSwipe={handleSwipe}
              onArticleChange={
                handleArticleChange
              }
            />
          </div>

          {articles.length > 0 && (
            <SwipeActions
              onPass={handlePass}
              onFavorite={
                handleFavorite
              }
              onSwap={handleSwap}
              isFavorite={isFavorite}
              favoriteLoading={
                favoriteLoading
              }
            />
          )}
        </>
      )}

      <ProposalModal
        article={currentArticle}
        isOpen={isProposalModalOpen}
        onClose={() =>
          setIsProposalModalOpen(false)
        }
        onSuccess={(proposal) => {
          console.log(
            "Proposition créée :",
            proposal,
          );

          swipeStackRef.current?.next();
        }}
      />
    </section>
  );
}

export default Home;