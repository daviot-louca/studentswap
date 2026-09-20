import {
    getArticlesService,
    getArticleByIdService,
    getMyArticlesService,
    createArticleService,
    updateArticleService,
    deleteArticleService,
    getSwipeArticlesService
  } from "./article.service.js";
  
  // Récupérer tous les articles
  export const allArticle = async (req, res) => {
    try {
      const articles = await getArticlesService(req.query);
  
      return res.status(200).json({
        success: true,
        articles,
      });
    } catch (error) {
      console.error("Erreur récupération articles :", error);
  
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
  
  // Créer un article
  export const createArticle = async (req, res) => {
    try {
      const article = await createArticleService({
        ...req.body,
        Id_users: req.user.id,
      });
  
      return res.status(201).json({
        success: true,
        message: "Article créé avec succès.",
        article,
      });
    } catch (error) {
      console.error("Erreur création article :", error);
  
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
  
  // Récupérer les articles de l'utilisateur connecté
  export const myArticles = async (req, res) => {
    try {
      const articles = await getMyArticlesService(req.user.id);
  
      return res.status(200).json({
        success: true,
        articles,
      });
    } catch (error) {
      console.error(
        "Erreur récupération de mes articles :",
        error,
      );
  
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
  
  // Récupérer un article par son ID
  export const article = async (req, res) => {
    try {
      const result = await getArticleByIdService(req.params.id);
  
      return res.status(200).json({
        success: true,
        article: result,
      });
    } catch (error) {
      console.error("Erreur récupération article :", error);
  
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
  
  // Modifier un article
  export const updateArticle = async (req, res) => {
    try {
      const result = await updateArticleService(
        req.params.id,
        req.user.id,
        req.body,
      );
  
      return res.status(200).json({
        success: true,
        message: "Article modifié avec succès.",
        article: result,
      });
    } catch (error) {
      console.error("Erreur modification article :", error);
  
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
  
  // Supprimer un article
  export const deleteArticle = async (req, res) => {
    try {
      const result = await deleteArticleService(
        req.params.id,
        req.user.id,
      );
  
      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("Erreur suppression article :", error);
  
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

  export const getSwipeArticles = async (req, res) => {
    try {
      const articles = await getSwipeArticlesService(req.user.id);
  
      return res.status(200).json({
        success: true,
        articles,
      });
    } catch (error) {
      console.error(
        "Erreur récupération articles pour le swipe :",
        error,
      );
  
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