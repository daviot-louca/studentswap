import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import client from "../../shared/lib/api";

import ArticleForm from "./components/ArticleForm";

function getArray(data, keys = []) {
  if (Array.isArray(data)) {
    return data;
  }

  for (const key of keys) {
    if (Array.isArray(data?.[key])) {
      return data[key];
    }
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.data?.data)) {
    return data.data.data;
  }

  return [];
}

function CreationArticle() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [etats, setEtats] = useState([]);

  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    titre: "",
    description: "",
    categoryId: "",
    subCategoryId: "",
    etatId: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadFormData() {
      try {
        setIsLoading(true);
        setError("");

        const [
          categoriesResponse,
          subCategoriesResponse,
          etatsResponse,
        ] = await Promise.all([
          client.get("/categories"),
          client.get("/subCategories"),
          client.get("/etatArticle"),
        ]);

        if (cancelled) {
          return;
        }

        setCategories(
          getArray(
            categoriesResponse.data,
            ["categories"],
          ),
        );

        setSubCategories(
          getArray(
            subCategoriesResponse.data,
            [
              "subCategories",
              "subcategories",
            ],
          ),
        );

        setEtats(
          getArray(
            etatsResponse.data,
            [
              "etatsArticles",
              "etats",
              "etatArticles",
              "etatArticle",
            ],
          ),
        );
      } catch (requestError) {
        if (cancelled) {
          return;
        }

        console.error(
          "Erreur chargement formulaire article :",
          requestError,
        );

        setError(
          requestError.response?.data?.message ||
          requestError.response?.data?.error ||
          "Impossible de charger les données du formulaire.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadFormData();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setForm((currentForm) => ({
      ...currentForm,
      categoryId: value,
      subCategoryId: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");
    setSuccess("");

    const cleanTitle = form.titre.trim();
    const cleanDescription = form.description.trim();

    if (!cleanTitle) {
      setError("Le titre est obligatoire.");
      return;
    }

    if (cleanTitle.length < 3) {
      setError(
        "Le titre doit contenir au moins 3 caractères.",
      );
      return;
    }

    if (!cleanDescription) {
      setError(
        "La description est obligatoire.",
      );
      return;
    }

    if (!form.subCategoryId) {
      setError(
        "Veuillez sélectionner une sous-catégorie.",
      );
      return;
    }

    if (!form.etatId) {
      setError(
        "Veuillez sélectionner l'état de l'article.",
      );
      return;
    }

    const payload = {
      titre: cleanTitle,
      description: cleanDescription,
      Id_subCategories: form.subCategoryId,
      Id_etatArticle: form.etatId,
    };

    try {
      setIsSubmitting(true);

      const response = await client.post(
        "/articles",
        payload,
      );

      const createdArticle =
        response.data?.article ??
        response.data?.data ??
        null;

      if (!createdArticle?.Id_articles) {
        throw new Error(
          "L'article a été créé mais son identifiant est introuvable.",
        );
      }

      if (images.length > 0) {
        const formData = new FormData();

        images.forEach((image) => {
          if (image?.file) {
            formData.append(
              "photos",
              image.file,
            );
          }
        });

        try {
          await client.post(
            `/articlePhoto/article/${createdArticle.Id_articles}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
        } catch (photoError) {
          console.error(
            "Article créé mais erreur upload photos :",
            photoError,
          );

          setError(
            "L'article a été créé, mais les photos n'ont pas pu être envoyées.",
          );

          setTimeout(() => {
            navigate(
              `/articles/${createdArticle.Id_articles}`,
            );
          }, 1000);

          return;
        }
      }

      setSuccess(
        "Votre annonce a été créée avec succès.",
      );

      setTimeout(() => {
        navigate(
          `/articles/${createdArticle.Id_articles}`,
        );
      }, 500);
    } catch (requestError) {
      console.error(
        "Erreur création article :",
        requestError,
      );

      const details =
        requestError.response?.data?.details;

      const detailMessage = Array.isArray(details)
        ? details
          .map(
            (detail) => detail?.message,
          )
          .filter(Boolean)
          .join(" ")
        : "";

      setError(
        detailMessage ||
        requestError.response?.data?.message ||
        requestError.response?.data?.error ||
        requestError.message ||
        "Impossible de créer l'annonce.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background px-4 py-6 text-text">
        <div className="mx-auto w-full max-w-xl">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-100" />

            <div className="mt-6 space-y-4">
              <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
              <div className="h-28 animate-pulse rounded-xl bg-gray-100" />
              <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
              <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 pb-28 text-text">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 text-sm font-semibold text-muted transition hover:text-text"
          >
            ← Retour
          </button>

          <h1 className="text-2xl font-bold tracking-tight">
            Publier un article
          </h1>

          <p className="mt-1 text-sm text-muted">
            Donne une seconde vie à un objet et
            trouve un étudiant intéressé.
          </p>
        </div>

        <ArticleForm
          form={form}
          categories={categories}
          subCategories={subCategories}
          etats={etats}
          images={images}
          error={error}
          success={success}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onCategoryChange={handleCategoryChange}
          onImageChange={setImages}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}

export default CreationArticle;