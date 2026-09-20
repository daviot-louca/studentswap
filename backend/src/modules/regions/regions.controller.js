import {
    getRegionsService,
    getRegionByIdService,
    createRegionService,
    updateRegionService,
    deleteRegionService,
  } from "./regions.service.js";
  
  // Récupérer toutes les régions
  export const allRegions = async (req, res) => {
    try {
      const regions = await getRegionsService();
  
      return res.status(200).json({
        success: true,
        regions,
      });
    } catch (error) {
      console.error("Erreur récupération régions :", error);
  
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
  
  // Récupérer une région
  export const region = async (req, res) => {
    try {
      const region = await getRegionByIdService(req.params.id);
  
      return res.status(200).json({
        success: true,
        region,
      });
    } catch (error) {
      console.error("Erreur récupération région :", error);
  
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
  
  // Créer une région
  export const createRegion = async (req, res) => {
    try {
      const newRegion = await createRegionService(req.body);
  
      return res.status(201).json({
        success: true,
        message: "Région créée avec succès",
        region: newRegion,
      });
    } catch (error) {
      console.error("Erreur création région :", error);
  
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
  
  // Modifier une région
  export const updateRegion = async (req, res) => {
    try {
      const updatedRegion = await updateRegionService(
        req.params.id,
        req.body,
      );
  
      return res.status(200).json({
        success: true,
        message: "Région modifiée avec succès",
        region: updatedRegion,
      });
    } catch (error) {
      console.error("Erreur modification région :", error);
  
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
  
  // Supprimer une région
  export const deleteRegion = async (req, res) => {
    try {
      await deleteRegionService(req.params.id);
  
      return res.status(200).json({
        success: true,
        message: "Région supprimée avec succès",
      });
    } catch (error) {
      console.error("Erreur suppression région :", error);
  
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