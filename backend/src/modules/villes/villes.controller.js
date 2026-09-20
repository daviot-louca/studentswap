import {
    getVillesService,
    getVilleByIdService,
    getVillesByRegionService,
    createVilleService,
    updateVilleService,
    deleteVilleService,
  } from "./villes.service.js";
  
  // Récupérer toutes les villes
  export const allVilles = async (req, res) => {
    try {
      const villes = await getVillesService();
  
      return res.status(200).json({
        success: true,
        villes,
      });
    } catch (error) {
      console.error("Erreur récupération villes :", error);
  
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
  
  // Récupérer une ville
  export const ville = async (req, res) => {
    try {
      const ville = await getVilleByIdService(req.params.id);
  
      return res.status(200).json({
        success: true,
        ville,
      });
    } catch (error) {
      console.error("Erreur récupération ville :", error);
  
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
  
  // Récupérer les villes d'une région
  export const villesByRegion = async (req, res) => {
    try {
      const villes = await getVillesByRegionService(
        req.params.regionId,
      );
  
      return res.status(200).json({
        success: true,
        villes,
      });
    } catch (error) {
      console.error(
        "Erreur récupération villes de la région :",
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
  
  // Créer une ville
  export const createVille = async (req, res) => {
    try {
      const newVille = await createVilleService(req.body);
  
      return res.status(201).json({
        success: true,
        message: "Ville créée avec succès",
        ville: newVille,
      });
    } catch (error) {
      console.error("Erreur création ville :", error);
  
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
  
  // Modifier une ville
  export const updateVille = async (req, res) => {
    try {
      const updatedVille = await updateVilleService(
        req.params.id,
        req.body,
      );
  
      return res.status(200).json({
        success: true,
        message: "Ville modifiée avec succès",
        ville: updatedVille,
      });
    } catch (error) {
      console.error("Erreur modification ville :", error);
  
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
  
  // Supprimer une ville
  export const deleteVille = async (req, res) => {
    try {
      await deleteVilleService(req.params.id);
  
      return res.status(200).json({
        success: true,
        message: "Ville supprimée avec succès",
      });
    } catch (error) {
      console.error("Erreur suppression ville :", error);
  
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