import { NavLink, Outlet } from "react-router-dom";
import ArticleFilters from "../../features/articles/components/ArticleFilters";
import { useEffect, useState } from "react";
import client from "../../shared/lib/api";

const navItems = [
  {
    label: "Accueil",
    to: "/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"
        />
      </svg>
    ),
  },
  {
    label: "Recherche",
    to: "/search",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path
          strokeLinecap="round"
          d="m16 16 4.5 4.5"
        />
      </svg>
    ),
  },
  {
    label: "Publier",
    to: "/create",
    isCreate: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          d="M12 5v14M5 12h14"
        />
      </svg>
    ),
  },
  {
    label: "Messages",
    to: "/messages",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2 1.2-4A7.5 7.5 0 1 1 20 11.5Z"
        />
      </svg>
    ),
  },
  {
    label: "Profil",
    to: "/profile",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle
          cx="12"
          cy="8"
          r="3.2"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.5 20a6.5 6.5 0 0 1 13 0"
        />
      </svg>
    ),
  },
];

const EMPTY_FILTERS = {
  search: "",
  category: "",
  Id_subCategories: "",
  Id_etatArticle: "",
  region: "",
  Id_villes: "",
};

function extractArray(
  data,
  possibleKeys = [],
) {
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

function UserLayout() {
  const [filters, setFilters] =
    useState(EMPTY_FILTERS);

  const [isOpen, setIsOpen] =
    useState(false);

  const [categories, setCategories] =
    useState([]);

  const [subCategories, setSubCategories] =
    useState([]);

  const [etatsArticles, setEtatsArticles] =
    useState([]);

  const [regions, setRegions] =
    useState([]);

  const [villes, setVilles] =
    useState([]);

  useEffect(() => {
    const loadFilterData = async () => {
      try {
        const responses =
          await Promise.all([
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

        const categoriesData =
          extractArray(
            categoriesResponse.data,
            [
              "categories",
              "category",
              "Categories",
            ],
          );

        const subCategoriesData =
          extractArray(
            subCategoriesResponse.data,
            [
              "subCategories",
              "subcategories",
              "subCategory",
              "SubCategories",
            ],
          );

        const etatsData =
          extractArray(
            etatsResponse.data,
            [
              "etatsArticles",
              "etats",
              "etatArticles",
              "etatArticle",
              "EtatsArticles",
            ],
          );

        const regionsData =
          extractArray(
            regionsResponse.data,
            [
              "regions",
              "region",
              "Regions",
            ],
          );

        const villesData =
          extractArray(
            villesResponse.data,
            [
              "villes",
              "cities",
              "ville",
              "Villes",
            ],
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

        setCategories(
          categoriesData,
        );

        setSubCategories(
          subCategoriesData,
        );

        setEtatsArticles(
          etatsData,
        );

        setRegions(
          regionsData,
        );

        setVilles(
          villesData,
        );
      } catch (requestError) {
        console.error(
          "Erreur récupération des données des filtres :",
          requestError,
        );
      }
    };

    loadFilterData();
  }, []);

  const handleApply = (
    newFilters,
  ) => {
    const nextFilters = {
      ...EMPTY_FILTERS,
      ...(newFilters || {}),
    };

    setFilters(nextFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="mx-auto min-h-screen w-full max-w-2xl bg-background pb-24">
        <header className="sticky top-0 z-40 bg-background/95 px-4 pt-3 backdrop-blur sm:px-5">
          <div className="flex h-16 items-center justify-between gap-3">
            <NavLink
              to="/"
              aria-label="Accueil StudentSwap"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/95 p-1.5 shadow-sm ring-1 ring-black/5 transition hover:scale-[1.02] active:scale-95"
            >
              <img
                src="/images/Mascotte.webp"
                alt="mascotte de l'application"
                className="h-full w-full object-contain"
              />
            </NavLink>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Ouvrir les filtres"
                className="flex h-10 items-center gap-2 rounded-full bg-white px-3 text-sm font-semibold text-text shadow-sm ring-1 ring-gray-100 transition hover:bg-primary/5 hover:text-primary active:scale-95"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M7 12h10M10 18h4"
                  />
                </svg>

                <span>Filtres</span>
              </button>

              <button
                type="button"
                aria-label="Notifications"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-muted shadow-sm ring-1 ring-gray-100 transition hover:text-primary active:scale-95"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>
        {isOpen && (
          <ArticleFilters
            isOpen={isOpen}
            onClose={() =>
              setIsOpen(false)
            }
            onApply={handleApply}
            onReset={handleReset}
            initialFilters={filters}
            categories={categories}
            subCategories={
              subCategories
            }
            etatsArticles={
              etatsArticles
            }
            regions={regions}
            villes={villes}
          />
        )}

        <main className="px-4 py-5 sm:px-6">
          <Outlet context={{ filters }} />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-100 bg-white px-2  shadow-[0_-8px_30px_rgba(23,25,35,0.06)] backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-end justify-around">
          {navItems.map(
            (item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({
                  isActive,
                }) =>
                  `flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 text-[11px] font-medium transition ${item.isCreate
                    ? "-mt-5"
                    : isActive
                      ? "text-rose"
                      : "text-muted hover:text-text"
                  }`
                }
              >
                {({
                  isActive,
                }) => (
                  <>
                    {item.isCreate ? (
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25 ring-4 ring-background transition hover:bg-primary-dark">
                        <span className="h-6 w-6">
                          {item.icon}
                        </span>
                      </span>
                    ) : (
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${isActive
                          ? "bg-primary/10"
                          : ""
                          }`}
                      >
                        <span className="h-5 w-5">
                          {item.icon}
                        </span>
                      </span>
                    )}

                    <span>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ),
          )}
        </div>
      </nav>
    </div>
  );
}

export default UserLayout;