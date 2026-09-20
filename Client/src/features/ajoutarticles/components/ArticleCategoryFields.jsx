function ArticleCategoryFields({
    categories,
    subCategories,
    etats,
    categoryId,
    subCategoryId,
    etatId,
    onCategoryChange,
    onSubCategoryChange,
    onEtatChange,
  }) {
    const filteredSubCategories = categoryId
      ? subCategories.filter((subCategory) => {
          const parentId =
            subCategory?.Id_categories ??
            subCategory?.category?.Id_categories ??
            subCategory?.categoryId;
  
          return String(parentId) === String(categoryId);
        })
      : subCategories;
  
    return (
      <div className="space-y-5">
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-semibold text-text"
          >
            Catégorie
            <span className="ml-1 text-primary">*</span>
          </label>
  
          <select
            id="category"
            value={categoryId}
            onChange={onCategoryChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="">
              Choisir une catégorie
            </option>
  
            {categories.map((category) => {
              const id =
                category?.Id_categories ??
                category?.id;
  
              return (
                <option key={id} value={id}>
                  {category?.nom ||
                    category?.name ||
                    "Sans nom"}
                </option>
              );
            })}
          </select>
        </div>
  
        <div>
          <label
            htmlFor="subCategory"
            className="mb-2 block text-sm font-semibold text-text"
          >
            Sous-catégorie
            <span className="ml-1 text-primary">*</span>
          </label>
  
          <select
            id="subCategory"
            value={subCategoryId}
            onChange={onSubCategoryChange}
            disabled={filteredSubCategories.length === 0}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-gray-50"
          >
            <option value="">
              {filteredSubCategories.length === 0
                ? "Aucune sous-catégorie disponible"
                : "Choisir une sous-catégorie"}
            </option>
  
            {filteredSubCategories.map((subCategory) => {
              const id =
                subCategory?.Id_subCategories ??
                subCategory?.id;
  
              return (
                <option key={id} value={id}>
                  {subCategory?.nom ||
                    subCategory?.name ||
                    "Sans nom"}
                </option>
              );
            })}
          </select>
        </div>
  
        <div>
          <label
            htmlFor="etat"
            className="mb-2 block text-sm font-semibold text-text"
          >
            État de l'article
            <span className="ml-1 text-primary">*</span>
          </label>
  
          <select
            id="etat"
            value={etatId}
            onChange={onEtatChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="">
              Choisir un état
            </option>
  
            {etats.map((etat) => {
              const id =
                etat?.Id_etatArticle ??
                etat?.id;
  
              return (
                <option key={id} value={id}>
                  {etat?.nom ||
                    etat?.name ||
                    "Sans nom"}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
  
  export default ArticleCategoryFields;