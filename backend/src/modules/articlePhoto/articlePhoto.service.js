import ArticlePhoto from "../../models/ArticlePhoto.js";
import Article from "../../models/Article.js";
import { Op } from "sequelize";

// Récupérer toutes les photos d'un article
export const getArticlePhotosService = async (articleId) => {
  try {
    const article = await Article.findByPk(articleId);

    if (!article) {
      const error = new Error("Article introuvable");
      error.statusCode = 404;
      throw error;
    }

    return await ArticlePhoto.findAll({
      where: {
        Id_articles: articleId,
      },
      order: [["ordre", "ASC"]],
    });
  } catch (error) {
    console.error(
      "Erreur récupération photos de l'article :",
      error,
    );
    throw error;
  }
};

// Récupérer une photo
export const getArticlePhotoByIdService = async (id) => {
  try {
    const photo = await ArticlePhoto.findByPk(id);

    if (!photo) {
      const error = new Error("Photo introuvable");
      error.statusCode = 404;
      throw error;
    }

    return photo;
  } catch (error) {
    console.error("Erreur récupération photo :", error);
    throw error;
  }
};

// Ajouter une photo à un article
export const createArticlePhotoService = async (
  articleId,
  userId,
  data,
) => {
  try {
    const article = await Article.findByPk(articleId);

    if (!article) {
      const error = new Error("Article introuvable");
      error.statusCode = 404;
      throw error;
    }

    // Vérifier que l'utilisateur est bien propriétaire de l'article
    if (article.Id_users !== userId) {
      const error = new Error(
        "Vous n'êtes pas propriétaire de cet article",
      );
      error.statusCode = 403;
      throw error;
    }

    const photo = await ArticlePhoto.create({
      Id_articles: articleId,
      url: data.url,
      ordre: data.ordre ?? 0,
    });

    return photo;
  } catch (error) {
    console.error("Erreur création photo :", error);
    throw error;
  }
};

// Supprimer une photo
export const deleteArticlePhotoService = async (
  id,
  userId,
) => {
  try {
    const photo = await ArticlePhoto.findByPk(id);

    if (!photo) {
      const error = new Error("Photo introuvable");
      error.statusCode = 404;
      throw error;
    }

    const article = await Article.findByPk(photo.Id_articles);

    if (!article) {
      const error = new Error("Article introuvable");
      error.statusCode = 404;
      throw error;
    }

    // Vérifier que l'utilisateur est bien propriétaire de l'article
    if (article.Id_users !== userId) {
      const error = new Error(
        "Vous n'êtes pas propriétaire de cet article",
      );
      error.statusCode = 403;
      throw error;
    }

    await photo.destroy();

    return true;
  } catch (error) {
    console.error("Erreur suppression photo :", error);
    throw error;
  }
};