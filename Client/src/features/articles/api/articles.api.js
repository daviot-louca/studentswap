import client from "../../../shared/lib/api";

export async function getArticles() {
  const response = await client.get("/articles");
  const data = response.data;

  console.log("Réponse API articles :", data);

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.articles)) {
    return data.articles;
  }

  if (Array.isArray(data?.articles?.data)) {
    return data.articles.data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

export async function getSwipeArticles(filters = {}) {
  const params = {};

  if (filters.search?.trim()) {
    params.search = filters.search.trim();
  }

  if (filters.category) {
    params.Id_categories = filters.category;
  }

  if (filters.Id_subCategories) {
    params.Id_subCategories = filters.Id_subCategories;
  }

  if (filters.Id_etatArticle) {
    params.Id_etatArticle = filters.Id_etatArticle;
  }

  if (filters.region) {
    params.region = filters.region;
  }

  if (filters.Id_villes) {
    params.Id_villes = filters.Id_villes;
  }

  const response = await client.get("/articles/swipe", {
    params,
  });

  const data = response.data;

  console.log("Filtres envoyés à l'API swipe :", params);
  console.log("Réponse API articles swipe :", data);

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.articles)) {
    return data.articles;
  }

  if (Array.isArray(data?.articles?.data)) {
    return data.articles.data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

export async function getMyArticles() {
  const response = await client.get("/articles/mine");
  const data = response.data;

  console.log("Réponse API mes articles :", data);

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.articles)) {
    return data.articles;
  }

  if (Array.isArray(data?.articles?.data)) {
    return data.articles.data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}