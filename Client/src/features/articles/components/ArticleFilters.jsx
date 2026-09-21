import { useEffect, useState } from "react";

const EMPTY_FILTERS = {
  search: "",
  category: "",
  Id_subCategories: "",
  Id_etatArticle: "",
  region: "",
  Id_villes: "",
};

function getItemId(item, type = "") {
  if (!item || typeof item !== "object") {
    return "";
  }

  if (type === "category") {
    return String(
      item.Id_categories ??
        item.Id_category ??
        item.id ??
        "",
    );
  }

  if (type === "subcategory") {
    return String(
      item.Id_subCategories ??
        item.Id_subCategory ??
        item.id ??
        "",
    );
  }

  if (type === "state") {
    return String(
      item.Id_etatArticle ??
        item.id ??
        "",
    );
  }

  if (type === "region") {
    return String(
      item.Id_regions ??
        item.Id_region ??
        item.id ??
        "",
    );
  }

  if (type === "city") {
    return String(
      item.Id_villes ??
        item.Id_ville ??
        item.id ??
        "",
    );
  }

  return String(item.id ?? "");
}

function getItemName(item) {
  if (!item || typeof item !== "object") {
    return "";
  }

  return (
    item.nom ??
    item.name ??
    item.libelle ??
    item.label ??
    item.titre ??
    item.title ??
    ""
  );
}

function ArticleFilters({
  isOpen = false,
  onClose,
  onApply,
  initialFilters = EMPTY_FILTERS,
  categories = [],
  subCategories = [],
  etatsArticles = [],
  regions = [],
  villes = [],
}) {
  const [filters, setFilters] = useState({
    ...EMPTY_FILTERS,
    ...initialFilters,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFilters({
      ...EMPTY_FILTERS,
      ...initialFilters,
    });
  }, [initialFilters, isOpen]);

  if (!isOpen) {
    return null;
  }

  const updateFilter = (field, value) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleReset = () => {
    const resetFilters = {
      ...EMPTY_FILTERS,
    };

    setFilters(resetFilters);
    onApply?.(resetFilters);
    onClose?.();
  };

  const handleApply = (event) => {
    event.preventDefault();

    const appliedFilters = {
      ...EMPTY_FILTERS,
      ...filters,
    };

    onApply?.(appliedFilters);
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-text">
              Filtrer les articles
            </h2>

            <p className="mt-1 text-sm text-muted">
              Affine les articles que tu souhaites découvrir.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition hover:bg-gray-200"
            aria-label="Fermer les filtres"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleApply}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="article-filter-search"
              className="mb-2 block text-sm font-semibold text-text"
            >
              Recherche
            </label>

            <input
              id="article-filter-search"
              type="search"
              value={filters.search}
              onChange={(event) =>
                updateFilter(
                  "search",
                  event.target.value,
                )
              }
              placeholder="Rechercher un article..."
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-text outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="article-filter-category"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Catégorie
              </label>

              <select
                id="article-filter-category"
                value={filters.category}
                onChange={(event) =>
                  updateFilter(
                    "category",
                    event.target.value,
                  )
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">
                  Toutes
                </option>

                {categories.map(
                  (category, index) => {
                    const id =
                      getItemId(
                        category,
                        "category",
                      ) ||
                      `category-${index}`;

                    const name =
                      getItemName(category);

                    return (
                      <option
                        key={`${id}-category-${index}`}
                        value={id}
                      >
                        {name ||
                          "Catégorie sans nom"}
                      </option>
                    );
                  },
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="article-filter-subcategory"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Sous-catégorie
              </label>

              <select
                id="article-filter-subcategory"
                value={filters.Id_subCategories}
                onChange={(event) =>
                  updateFilter(
                    "Id_subCategories",
                    event.target.value,
                  )
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">
                  Toutes
                </option>

                {subCategories.map(
                  (
                    subCategory,
                    index,
                  ) => {
                    const id =
                      getItemId(
                        subCategory,
                        "subcategory",
                      ) ||
                      `subcategory-${index}`;

                    const name =
                      getItemName(
                        subCategory,
                      );

                    return (
                      <option
                        key={`${id}-subcategory-${index}`}
                        value={id}
                      >
                        {name ||
                          "Sous-catégorie sans nom"}
                      </option>
                    );
                  },
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="article-filter-state"
                className="mb-2 block text-sm font-semibold text-text"
              >
                État
              </label>

              <select
                id="article-filter-state"
                value={filters.Id_etatArticle}
                onChange={(event) =>
                  updateFilter(
                    "Id_etatArticle",
                    event.target.value,
                  )
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">
                  Tous
                </option>

                {etatsArticles.map(
                  (etat, index) => {
                    const id =
                      getItemId(
                        etat,
                        "state",
                      ) ||
                      `state-${index}`;

                    const name =
                      getItemName(etat);

                    return (
                      <option
                        key={`${id}-state-${index}`}
                        value={id}
                      >
                        {name ||
                          "État sans nom"}
                      </option>
                    );
                  },
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="article-filter-region"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Région
              </label>

              <select
                id="article-filter-region"
                value={filters.region}
                onChange={(event) =>
                  updateFilter(
                    "region",
                    event.target.value,
                  )
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">
                  Toutes
                </option>

                {regions.map(
                  (region, index) => {
                    const id =
                      getItemId(
                        region,
                        "region",
                      ) ||
                      `region-${index}`;

                    const name =
                      getItemName(region);

                    const value =
                      region?.nom ??
                      region?.name ??
                      id;

                    return (
                      <option
                        key={`${id}-region-${index}`}
                        value={value}
                      >
                        {name ||
                          "Région sans nom"}
                      </option>
                    );
                  },
                )}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="article-filter-city"
              className="mb-2 block text-sm font-semibold text-text"
            >
              Ville
            </label>

            <select
              id="article-filter-city"
              value={filters.Id_villes}
              onChange={(event) =>
                updateFilter(
                  "Id_villes",
                  event.target.value,
                )
              }
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            >
              <option value="">
                Toutes les villes
              </option>

              {villes.map(
                (ville, index) => {
                  const id =
                    getItemId(
                      ville,
                      "city",
                    ) ||
                    `city-${index}`;

                  const name =
                    getItemName(ville);

                  return (
                    <option
                      key={`${id}-city-${index}`}
                      value={id}
                    >
                      {name ||
                        "Ville sans nom"}
                    </option>
                  );
                },
              )}
            </select>
          </div>

          <div className="flex gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-text transition hover:bg-gray-50"
            >
              Réinitialiser
            </button>

            <button
              type="submit"
              className="flex-1 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Appliquer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArticleFilters;