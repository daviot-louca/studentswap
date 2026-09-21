import { useEffect, useState } from "react";
import client from "../../../shared/lib/api";
import ArticleFilters from "./ArticleFilters";

const EMPTY_FILTERS = {
  search: "",
  category: "",
  Id_subCategories: "",
  Id_etatArticle: "",
  region: "",
  Id_villes: "",
};

function extractArray(data, possibleKeys = []) {
  if (Array.isArray(data)) {
    return data;
  }

  for (const key of possibleKeys) {
    if (Array.isArray(data?.[key])) {
      return data[key];
    }
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

function HomeFilter({ onApply, initialFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  const [filters, setFilters] = useState({
    ...EMPTY_FILTERS,
    ...(initialFilters || {}),
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [etatsArticles, setEtatsArticles] = useState([]);
  const [regions, setRegions] = useState([]);
  const [villes, setVilles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFilters({
      ...EMPTY_FILTERS,
      ...(initialFilters || {}),
    });
  }, [initialFilters]);

  useEffect(() => {
    const loadFilterData = async () => {
      try {
        setLoading(true);
        setError(null);

        const responses = await Promise.all([
          client.get("/categories"),
          client.get("/subCategories"),
          client.get("/etatArticle"),
          client.get("/regions"),
          client.get("/villes"),
        ]);

        const [
          categoriesResponse,
          subCategoriesResponse,
          etatsResponse,
          regionsResponse,
          villesResponse,
        ] = responses;

        const categoriesData = extractArray(
          categoriesResponse.data,
          ["categories", "category", "Categories"],
        );

        const subCategoriesData = extractArray(
          subCategoriesResponse.data,
          [
            "subCategories",
            "subcategories",
            "subCategory",
            "SubCategories",
          ],
        );

        const etatsData = extractArray(
          etatsResponse.data,
          [
            "etatsArticles",
            "etats",
            "etatArticles",
            "etatArticle",
            "EtatsArticles",
          ],
        );

        const regionsData = extractArray(
          regionsResponse.data,
          ["regions", "region", "Regions"],
        );

        const villesData = extractArray(
          villesResponse.data,
          ["villes", "cities", "ville", "Villes"],
        );

        console.log(
          "Données filtres - catégories :",
          categoriesData,
        );

        console.log(
          "Données filtres - sous-catégories :",
          subCategoriesData,
        );

        console.log(
          "Données filtres - états :",
          etatsData,
        );

        console.log(
          "Données filtres - régions :",
          regionsData,
        );

        console.log(
          "Données filtres - villes :",
          villesData,
        );

        setCategories(categoriesData);
        setSubCategories(subCategoriesData);
        setEtatsArticles(etatsData);
        setRegions(regionsData);
        setVilles(villesData);
      } catch (requestError) {
        console.error(
          "Erreur récupération des données des filtres :",
          requestError,
        );

        setError(
          requestError.response?.data?.error ||
            requestError.response?.data?.message ||
            "Impossible de charger les données des filtres.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadFilterData();
  }, []);

  const handleApply = (newFilters) => {
    setFilters(newFilters);
    onApply?.(newFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    onApply?.(EMPTY_FILTERS);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100">
        <div>
          <p className="text-sm font-semibold text-text">
            Autour de toi
          </p>

          <p className="text-xs text-muted">
            Articles disponibles dans ta région
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/15"
        >
          Filtrer
        </button>
      </div>

      {error && isOpen && (
        <div className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading && isOpen && (
        <div className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm text-muted shadow-sm ring-1 ring-gray-100">
          Chargement des filtres...
        </div>
      )}

      <ArticleFilters
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onApply={handleApply}
        onReset={handleReset}
        initialFilters={filters}
        categories={categories}
        subCategories={subCategories}
        etatsArticles={etatsArticles}
        regions={regions}
        villes={villes}
      />
    </>
  );
}

export default HomeFilter;