import {
    getArticlesVusService,
    getArticleVuService,
    addArticleVuService,
    removeArticleVuService,
  } from "./articlesVus.service.js";
  
  export const allArticlesVus = async (req, res) => {
    try {
      const articlesVus = await getArticlesVusService(req.user.id);
  
      return res.status(200).json({
        success: true,
        articlesVus,
      });
    } catch (error) {
      console.error(
        "Erreur récupération articles vus :",
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
  
  export const articleVu = async (req, res) => {
    try {
      const articleVu = await getArticleVuService(
        req.params.articleId,
        req.user.id,
      );
  
      return res.status(200).json({
        success: true,
        articleVu,
      });
    } catch (error) {
      console.error(
        "Erreur récupération article vu :",
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
  
  export const addArticleVu = async (req, res) => {
    try {
      const articleVu = await addArticleVuService(
        req.params.articleId,
        req.user.id,
      );
  
      return res.status(201).json({
        success: true,
        message: "Article marqué comme vu",
        articleVu,
      });
    } catch (error) {
      console.error(
        "Erreur ajout article vu :",
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
  
  export const removeArticleVu = async (req, res) => {
    try {
      await removeArticleVuService(
        req.params.articleId,
        req.user.id,
      );
  
      return res.status(200).json({
        success: true,
        message: "Article retiré de l'historique",
      });
    } catch (error) {
      console.error(
        "Erreur suppression article vu :",
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

  