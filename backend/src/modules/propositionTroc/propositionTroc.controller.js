import {
    getPropositionsTrocService,
    getPropositionTrocByIdService,
    createPropositionTrocService,
    updatePropositionTrocService,
    deletePropositionTrocService,
  } from "./propositionTroc.service.js";
  
  // Récupérer toutes les propositions de l'utilisateur connecté
  export const allPropositionsTroc = async (req, res) => {
    try {
      const propositions = await getPropositionsTrocService(
        req.user.id,
      );
  
      return res.status(200).json({
        success: true,
        propositions,
      });
    } catch (error) {
      console.error(
        "Erreur récupération propositions de troc :",
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
  
  // Récupérer une proposition
  export const propositionTroc = async (req, res) => {
    try {
      const proposition = await getPropositionTrocByIdService(
        req.params.id,
        req.user.id,
      );
  
      return res.status(200).json({
        success: true,
        proposition,
      });
    } catch (error) {
      console.error(
        "Erreur récupération proposition de troc :",
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
  
  // Créer une proposition de troc
  export const createPropositionTroc = async (req, res) => {
    try {
      const proposition = await createPropositionTrocService(
        req.user.id,
        req.body,
      );
  
      return res.status(201).json({
        success: true,
        message: "Proposition de troc créée avec succès",
        proposition,
      });
    } catch (error) {
      console.error(
        "Erreur création proposition de troc :",
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
  
  // Modifier une proposition
  export const updatePropositionTroc = async (req, res) => {
    try {
      const proposition = await updatePropositionTrocService(
        req.params.id,
        req.user.id,
        req.body,
      );
  
      return res.status(200).json({
        success: true,
        message: "Proposition de troc modifiée avec succès",
        proposition,
      });
    } catch (error) {
      console.error(
        "Erreur modification proposition de troc :",
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
  
  // Supprimer / annuler une proposition
  export const deletePropositionTroc = async (req, res) => {
    try {
      await deletePropositionTrocService(
        req.params.id,
        req.user.id,
      );
  
      return res.status(200).json({
        success: true,
        message: "Proposition de troc supprimée avec succès",
      });
    } catch (error) {
      console.error(
        "Erreur suppression proposition de troc :",
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