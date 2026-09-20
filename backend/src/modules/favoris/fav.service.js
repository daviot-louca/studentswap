import Favorite from "../../models/Favorite.js";
import Article from "../../models/Article.js";

// Récupérer tous les favoris de l'utilisateur
export const getFavoritesService = async (userId) => {
  try {
    return await Favorite.findAll({
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
  } catch (error) {
    console.error("Erreur récupération favoris :", error);
    throw error;
  }
};

// Récupérer un favori pour un article
export const getFavoriteService = async (
  articleId,
  userId,
) => {
  try {
    const favorite = await Favorite.findOne({
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

    if (!favorite) {
      const error = new Error("Favori introuvable");
      error.statusCode = 404;
      throw error;
    }

    return favorite;
  } catch (error) {
    console.error("Erreur récupération favori :", error);
    throw error;
  }
};

// Ajouter un article aux favoris
export const addFavoriteService = async (
  articleId,
  userId,
) => {
  try {
    const article = await Article.findByPk(articleId);

    if (!article) {
      const error = new Error("Article introuvable");
      error.statusCode = 404;
      throw error;
    }

    const existingFavorite = await Favorite.findOne({
      where: {
        Id_users: userId,
        Id_articles: articleId,
      },
    });

    if (existingFavorite) {
      const error = new Error(
        "Cet article est déjà dans vos favoris",
      );
      error.statusCode = 409;
      throw error;
    }

    return await Favorite.create({
      Id_users: userId,
      Id_articles: articleId,
    });
  } catch (error) {
    console.error("Erreur ajout favori :", error);
    throw error;
  }
};

// Retirer un article des favoris
export const removeFavoriteService = async (
  articleId,
  userId,
) => {
  try {
    const favorite = await Favorite.findOne({
      where: {
        Id_users: userId,
        Id_articles: articleId,
      },
    });

    if (!favorite) {
      const error = new Error(
        "Cet article n'est pas dans vos favoris",
      );
      error.statusCode = 404;
      throw error;
    }

    await favorite.destroy();

    return true;
  } catch (error) {
    console.error("Erreur suppression favori :", error);
    throw error;
  }
};