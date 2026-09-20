export function getPhotoUrl(photo) {
    if (typeof photo === "string") {
      return photo;
    }
  
    return (
      photo?.url ||
      photo?.URL ||
      photo?.path ||
      photo?.chemin ||
      photo?.src ||
      photo?.photo ||
      null
    );
  }
  
  export function getArticlePhotos(article) {
    const photos = Array.isArray(article?.articlePhotos)
      ? article.articlePhotos
      : Array.isArray(article?.article_photos)
        ? article.article_photos
        : Array.isArray(article?.photos)
          ? article.photos
          : [];
  
    return photos
      .map(getPhotoUrl)
      .filter(Boolean);
  }
  
  export function getArticleTitle(article) {
    return (
      article?.titre ||
      article?.title ||
      "Article sans titre"
    );
  }
  
  export function getArticleDescription(article) {
    return (
      article?.description ||
      "Aucune description disponible."
    );
  }
  
  export function getArticleCategory(article) {
    return (
      article?.subCategory?.category?.nom ||
      article?.subCategory?.category?.name ||
      article?.category?.nom ||
      article?.category?.name ||
      article?.categorie?.nom ||
      "Non renseignée"
    );
  }
  
  export function getArticleSubCategory(article) {
    return (
      article?.subCategory?.nom ||
      article?.subCategory?.name ||
      article?.subcategory?.nom ||
      article?.sousCategorie?.nom ||
      null
    );
  }
  
  export function getArticleState(article) {
    return (
      article?.etat?.nom ||
      article?.etat?.name ||
      article?.etatArticle?.nom ||
      article?.etatArticle?.name ||
      article?.etat_article?.nom ||
      "Non renseigné"
    );
  }
  
  export function getArticleCity(article) {
    return (
      article?.user?.ville?.nom ||
      article?.user?.ville?.name ||
      article?.ville?.nom ||
      article?.ville?.name ||
      article?.city?.nom ||
      article?.city?.name ||
      "Ville non renseignée"
    );
  }
  
  export function getArticleOwner(article) {
    return (
      article?.user?.pseudo ||
      `${article?.user?.prenom || ""} ${
        article?.user?.nom || ""
      }`.trim() ||
      "Utilisateur"
    );
  }