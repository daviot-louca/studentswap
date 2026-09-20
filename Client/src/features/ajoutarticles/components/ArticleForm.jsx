import ArticleFormField from "./ArticleFormField";
import ArticleCategoryFields from "./ArticleCategoryFields";
import ArticleImageUpload from "./ArticleImageUpload";

function ArticleForm({
  form,
  categories,
  subCategories,
  etats,
  images,
  error,
  success,
  isSubmitting,
  onChange,
  onCategoryChange,
  onImageChange,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6"
    >
      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <ArticleImageUpload
        images={images}
        onChange={onImageChange}
      />

      <ArticleFormField
        label="Titre"
        id="titre"
        value={form.titre}
        onChange={(event) =>
          onChange("titre", event.target.value)
        }
        placeholder="Ex. Calculatrice Casio"
        maxLength={150}
        required
      />

      <ArticleFormField
        label="Description"
        id="description"
        type="textarea"
        value={form.description}
        onChange={(event) =>
          onChange(
            "description",
            event.target.value,
          )
        }
        placeholder="Décris ton article, son état et ce que tu recherches..."
        maxLength={1000}
        rows={5}
        required
      />

      <ArticleFormField
        label="Prix indicatif"
        id="prix"
        type="number"
        value={form.prix}
        onChange={(event) =>
          onChange("prix", event.target.value)
        }
        placeholder="0"
        min="0"
        step="0.01"
      />

      <ArticleCategoryFields
        categories={categories}
        subCategories={subCategories}
        etats={etats}
        categoryId={form.categoryId}
        subCategoryId={form.subCategoryId}
        etatId={form.etatId}
        onCategoryChange={onCategoryChange}
        onSubCategoryChange={(event) =>
          onChange(
            "subCategoryId",
            event.target.value,
          )
        }
        onEtatChange={(event) =>
          onChange(
            "etatId",
            event.target.value,
          )
        }
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? "Publication..."
          : "Publier l'annonce"}
      </button>
    </form>
  );
}

export default ArticleForm;