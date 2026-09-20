import {
    getFavoritesService,
    getFavoriteService,
    addFavoriteService,
    removeFavoriteService,
  } from "./fav.service.js";
  
  // Récupérer tous les favoris de l'utilisateur connecté
  export const allFavorites = async (req, res) => {
    try {
      const favorites = await getFavoritesService(req.user.id);
  
      return res.status(200).json({
        success: true,
        favorites,
      });
    } catch (error) {
      console.error("Erreur récupération favoris :", error);
  
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
  
  // Récupérer un favori
  export const favorite = async (req, res) => {
    try {
      const favorite = await getFavoriteService(
        req.params.articleId,
        req.user.id,
      );
  
      return res.status(200).json({
        success: true,
        favorite,
      });
    } catch (error) {
      console.error("Erreur récupération favori :", error);
  
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
  
  // Ajouter un article aux favoris
  export const addFavorite = async (req, res) => {
    try {
      const favorite = await addFavoriteService(
        req.params.articleId,
        req.user.id,
      );
  
      return res.status(201).json({
        success: true,
        message: "Article ajouté aux favoris avec succès",
        favorite,
      });
    } catch (error) {
      console.error("Erreur ajout favori :", error);
  
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
  
  // Retirer un article des favoris
  export const removeFavorite = async (req, res) => {
    try {
      await removeFavoriteService(
        req.params.articleId,
        req.user.id,
      );
  
      return res.status(200).json({
        success: true,
        message: "Article retiré des favoris avec succès",
      });
    } catch (error) {
      console.error("Erreur suppression favori :", error);
  
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