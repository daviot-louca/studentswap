import client from "../../../shared/lib/api";

export async function getFavorites() {
  const { data } = await client.get("/favories");
  return data?.favorites ?? [];
}

export async function getFavorite(articleId) {
  const { data } = await client.get(`/favories/${articleId}`);
  return data?.favorite ?? null;
}

export async function addFavorite(articleId) {
  const { data } = await client.post(`/favories/${articleId}`);
  return data?.favorite ?? null;
}

export async function removeFavorite(articleId) {
  const { data } = await client.delete(`/favories/${articleId}`);
  return data;
}