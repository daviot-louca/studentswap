import {
    getEtatsArticlesService,
    getEtatArticleByIdService,
    createEtatArticleService,
    updateEtatArticleService,
    deleteEtatArticleService,
  } from "./etatArticle.service.js";
  
  // Récupérer tous les états
  export const allEtat = async (req, res) => {
    try {
      const etatsArticles = await getEtatsArticlesService();
  
      return res.status(200).json({
        success: true,
        etatsArticles,
      });
    } catch (error) {
      console.error("Erreur récupération états :", error);
  
      const statusCode = error.statusCode || 500;
  
      return res.status(statusCode).json({
        success: false,
        error:
          statusCode === 500
            ? "Erreur interne du serveur"
            : error.message,
      });
    }
  };
  
  // Créer un état
  export const createEtat = async (req, res) => {
    try {
      const etatArticle = await createEtatArticleService(req.body);
  
      return res.status(201).json({
        success: true,
        message: "État d'article créé avec succès.",
        etatArticle,
      });
    } catch (error) {
      console.error("Erreur création état :", error);
  
      const statusCode = error.statusCode || 500;
  
      return res.status(statusCode).json({
        success: false,
        error:
          statusCode === 500
            ? "Erreur interne du serveur"
            : error.message,
      });
    }
  };
  
  // Récupérer un état par son ID
  export const etat = async (req, res) => {
    try {
      const etatArticle = await getEtatArticleByIdService(
        req.params.id,
      );
  
      return res.status(200).json({
        success: true,
        etatArticle,
      });
    } catch (error) {
      console.error("Erreur récupération état :", error);
  
      const statusCode = error.statusCode || 500;
  
      return res.status(statusCode).json({
        success: false,
        error:
          statusCode === 500
            ? "Erreur interne du serveur"
            : error.message,
      });
    }
  };
  
  // Modifier un état
  export const updateEtat = async (req, res) => {
    try {
      const etatArticle = await updateEtatArticleService(
        req.params.id,
        req.body,
      );
  
      return res.status(200).json({
        success: true,
        message: "État d'article modifié avec succès.",
        etatArticle,
      });
    } catch (error) {
      console.error("Erreur modification état :", error);
  
      const statusCode = error.statusCode || 500;
  
      return res.status(statusCode).json({
        success: false,
        error:
          statusCode === 500
            ? "Erreur interne du serveur"
            : error.message,
      });
    }
  };
  
  // Supprimer un état
  export const deleteEtat = async (req, res) => {
    try {
      const result = await deleteEtatArticleService(req.params.id);
  
      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("Erreur suppression état :", error);
  
      const statusCode = error.statusCode || 500;
  
      return res.status(statusCode).json({
        success: false,
        error:
          statusCode === 500
            ? "Erreur interne du serveur"
            : error.message,
      });
    }
  };