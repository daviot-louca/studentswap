import { useEffect, useRef, useState } from "react";
import SwipeStack from "../components/SwipeStack";
import SwipeActions from "../components/SwipeActions";
import HomeFilters from "../components/HomeFilter";
import { getSwipeArticles } from "../api/articles.api";
import ProposalModal from "../../proposals/components/ProposalModal";
import {
  getFavorite,
  addFavorite,
  removeFavorite,
} from "../../favorites/api/favorites.api";

const EMPTY_FILTERS = {
  search: "",
  category: "",
  Id_subCategories: "",
  Id_etatArticle: "",
  region: "",
  Id_villes: "",
};

function Home() {
  const swipeStackRef = useRef(null);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const [currentArticle, setCurrentArticle] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const loadArticles = async (activeFilters = EMPTY_FILTERS) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getSwipeArticles(activeFilters);

      console.log("Articles pour le swipe :", data);

      setArticles(data);
      setCurrentArticle(null);
      setIsFavorite(false);
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

  useEffect(() => {
    loadArticles();
  }, []);

  const handleFiltersApply = (newFilters) => {
    const nextFilters = {
      ...EMPTY_FILTERS,
      ...(newFilters || {}),
    };

    setFilters(nextFilters);
    loadArticles(nextFilters);
  };

  const handleArticleChange = async (article) => {
    setCurrentArticle(article);
    setIsFavorite(false);

    if (!article?.Id_articles) {
      return;
    }

    try {
      const favorite = await getFavorite(article.Id_articles);

      setIsFavorite(Boolean(favorite));
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error(
          "Erreur vérification favori :",
          err,
        );
      }
    }
  };

  const handleSwipe = (direction, article) => {
    console.log("Swipe :", direction, article);

    if (direction === "right") {
      setCurrentArticle(article);
      setIsProposalModalOpen(true);
    }
  };

  const handlePass = () => {
    swipeStackRef.current?.pass();
  };

  const handleFavorite = async () => {
    if (!currentArticle?.Id_articles || favoriteLoading) {
      return;
    }

    try {
      setFavoriteLoading(true);

      console.log(
        "Article favori :",
        currentArticle.Id_articles,
      );

      if (isFavorite) {
        await removeFavorite(currentArticle.Id_articles);
        setIsFavorite(false);
      } else {
        await addFavorite(currentArticle.Id_articles);
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
    <section className="space-y-6">
      <HomeFilters
        onApply={handleFiltersApply}
        initialFilters={filters}
      />

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
              onArticleChange={handleArticleChange}
            />
          </div>

          {articles.length > 0 && (
            <SwipeActions
              onPass={handlePass}
              onFavorite={handleFavorite}
              onSwap={handleSwap}
              isFavorite={isFavorite}
              favoriteLoading={favoriteLoading}
            />
          )}
        </>
      )}

      <ProposalModal
        article={currentArticle}
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        onSuccess={(proposal) => {
          console.log("Proposition créée :", proposal);
          swipeStackRef.current?.next();
        }}
      />
    </section>
  );
}

export default Home;