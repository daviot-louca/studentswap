import EtatArticle from "../../models/EtatArticle.js";

// Récupérer tous les états d'article
export const getEtatsArticlesService = async () => {
  try {
    const etatsArticles = await EtatArticle.findAll({
      order: [["nom", "ASC"]],
    });

    return etatsArticles;
  } catch (error) {
    console.error("Erreur récupération états d'article :", error);
    throw error;
  }
};

// Récupérer un état d'article par son ID
export const getEtatArticleByIdService = async (id) => {
  try {
    const etatArticle = await EtatArticle.findByPk(id);

    if (!etatArticle) {
      const error = new Error("État d'article introuvable");
      error.statusCode = 404;
      throw error;
    }

    return etatArticle;
  } catch (error) {
    console.error("Erreur récupération état d'article :", error);
    throw error;
  }
};

// Créer un état d'article
export const createEtatArticleService = async ({ nom }) => {
  try {
    const existingEtat = await EtatArticle.findOne({
      where: { nom },
    });

    if (existingEtat) {
      const error = new Error("Cet état d'article existe déjà");
      error.statusCode = 409;
      throw error;
    }

    const etatArticle = await EtatArticle.create({
      nom,
    });

    return etatArticle;
  } catch (error) {
    console.error("Erreur création état d'article :", error);
    throw error;
  }
};

// Modifier un état d'article
export const updateEtatArticleService = async (id, { nom }) => {
  try {
    const etatArticle = await EtatArticle.findByPk(id);

    if (!etatArticle) {
      const error = new Error("État d'article introuvable");
      error.statusCode = 404;
      throw error;
    }

    if (nom !== undefined && nom !== etatArticle.nom) {
      const existingEtat = await EtatArticle.findOne({
        where: { nom },
      });

      if (existingEtat) {
        const error = new Error("Cet état d'article existe déjà");
        error.statusCode = 409;
        throw error;
      }

      etatArticle.nom = nom;
    }

    await etatArticle.save();

    return etatArticle;
  } catch (error) {
    console.error("Erreur modification état d'article :", error);
    throw error;
  }
};

// Supprimer un état d'article
export const deleteEtatArticleService = async (id) => {
  try {
    const etatArticle = await EtatArticle.findByPk(id);

    if (!etatArticle) {
      const error = new Error("État d'article introuvable");
      error.statusCode = 404;
      throw error;
    }

    await etatArticle.destroy();

    return {
      message: "État d'article supprimé avec succès.",
    };
  } catch (error) {
    console.error("Erreur suppression état d'article :", error);
    throw error;
  }
};