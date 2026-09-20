import {
    getSubCategoriesService,
    getSubCategorieByIdService,
    createSubCategorieService,
    updateSubCategorieService,
    deleteSubCategorieService,
  } from "./subCategories.service.js";
  
  // Récupérer toutes les sous-catégories
  export const allsubCategories = async (req, res) => {
    try {
      const subCategories = await getSubCategoriesService();
  
      return res.status(200).json({
        success: true,
        subCategories,
      });
    } catch (error) {
      console.error("Erreur récupération sous-catégories :", error);
  
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
  
  // Récupérer une sous-catégorie par son ID
  export const addonesubCategories = async (req, res) => {
    try {
      const subCategorie = await getSubCategorieByIdService(req.params.id);
  
      return res.status(200).json({
        success: true,
        subCategorie,
      });
    } catch (error) {
      console.error("Erreur récupération sous-catégorie :", error);
  
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
  
  // Ajouter une sous-catégorie
  export const ajoutsubCategories = async (req, res) => {
    try {
      const subCategorie = await createSubCategorieService(req.body);
  
      return res.status(201).json({
        success: true,
        message: "Sous-catégorie créée avec succès.",
        subCategorie,
      });
    } catch (error) {
      console.error("Erreur création sous-catégorie :", error);
  
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
  
  // Modifier une sous-catégorie
  export const updatesubCategories = async (req, res) => {
    try {
      const subCategorie = await updateSubCategorieService(
        req.params.id,
        req.body,
      );
  
      return res.status(200).json({
        success: true,
        message: "Sous-catégorie modifiée avec succès.",
        subCategorie,
      });
    } catch (error) {
      console.error("Erreur modification sous-catégorie :", error);
  
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
  
  // Supprimer une sous-catégorie
  export const deletesubCategories = async (req, res) => {
    try {
      const result = await deleteSubCategorieService(req.params.id);
  
      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("Erreur suppression sous-catégorie :", error);
  
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