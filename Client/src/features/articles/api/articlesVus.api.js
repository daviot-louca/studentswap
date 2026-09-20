import client from "../../../shared/lib/api";

export async function getArticlesVus() {
  const { data } = await client.get("/articlesVus");
  return data?.articlesVus ?? [];
}

export async function getArticleVu(articleId) {
  const { data } = await client.get(`/articlesVus/${articleId}`);
  return data?.articleVu ?? null;
}

export async function addArticleVu(articleId) {
  const { data } = await client.post(`/articlesVus/${articleId}`);
  return data?.articleVu ?? null;
}

export async function removeArticleVu(articleId) {
  const { data } = await client.delete(`/articlesVus/${articleId}`);
  return data;
}