import ArticlesVus from "../../models/ArticlesVus.js";
import Article from "../../models/Article.js";

export const getArticlesVusService = async (userId) => {
  return await ArticlesVus.findAll({
    where: {
      Id_users: userId,
    },
    include: [
      {
        model: Article,
        as: "article",
      },
    ],
    order: [["created_at", "DESC"]],
  });
};

export const getArticleVuService = async (articleId, userId) => {
  return await ArticlesVus.findOne({
    where: {
      Id_users: userId,
      Id_articles: articleId,
    },
    include: [
      {
        model: Article,
        as: "article",
      },
    ],
  });
};

export const addArticleVuService = async (articleId, userId) => {
  const article = await Article.findByPk(articleId);

  if (!article) {
    const error = new Error("Article introuvable");
    error.statusCode = 404;
    throw error;
  }

  const existingArticleVu = await ArticlesVus.findOne({
    where: {
      Id_users: userId,
      Id_articles: articleId,
    },
  });

  if (existingArticleVu) {
    return existingArticleVu;
  }

  return await ArticlesVus.create({
    Id_users: userId,
    Id_articles: articleId,
  });
};

export const removeArticleVuService = async (articleId, userId) => {
  const articleVu = await ArticlesVus.findOne({
    where: {
      Id_users: userId,
      Id_articles: articleId,
    },
  });

  if (!articleVu) {
    const error = new Error("Article non présent dans l'historique");
    error.statusCode = 404;
    throw error;
  }

  await articleVu.destroy();

  return true;
};

