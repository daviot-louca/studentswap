import {
    getCategoriesService,
    getCategorieByIdService,
    createCategorieService,
    updateCategorieService,
    deleteCategorieService,
  } from "./categories.service.js";
  
  // Récupérer toutes les catégories
  export const categoriesController = async (req, res) => {
    try {
      const categories = await getCategoriesService();
  
      return res.status(200).json({
        success: true,
        categories,
      });
    } catch (error) {
      console.error("Erreur récupération catégories :", error);
  
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
  
  // Récupérer une catégorie par son ID
  export const OnecategoriesController = async (req, res) => {
    try {
      const categorie = await getCategorieByIdService(req.params.id);
  
      return res.status(200).json({
        success: true,
        categorie,
      });
    } catch (error) {
      console.error("Erreur récupération catégorie :", error);
  
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
  
  // Ajouter une catégorie
  export const ajoutcategoriesController = async (req, res) => {
    try {
      const categorie = await createCategorieService(req.body);
  
      return res.status(201).json({
        success: true,
        message: "Catégorie créée avec succès.",
        categorie,
      });
    } catch (error) {
      console.error("Erreur création catégorie :", error);
  
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
  
  // Modifier une catégorie
  export const modifierUneCategorie = async (req, res) => {
    try {
      const categorie = await updateCategorieService(
        req.params.id,
        req.body,
      );
  
      return res.status(200).json({
        success: true,
        message: "Catégorie modifiée avec succès.",
        categorie,
      });
    } catch (error) {
      console.error("Erreur modification catégorie :", error);
  
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
  
  // Supprimer une catégorie
  export const supprimerCategorie = async (req, res) => {
    try {
      const result = await deleteCategorieService(req.params.id);
  
      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("Erreur suppression catégorie :", error);
  
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