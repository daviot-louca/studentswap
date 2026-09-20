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

export async function getSwipeArticles() {
  const response = await client.get("/articles/swipe");
  const data = response.data;

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