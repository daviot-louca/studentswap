import {
    getUserByIdService,
    modifierProfilService,
    supprimerCompteService,
    getUsersService,
  } from "./user.service.js";
  
  // Récupérer un utilisateur par son ID
  export const getUserByIdController = async (req, res) => {
    try {
      const user = await getUserByIdService(req.params.id);
  
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("Erreur récupération utilisateur :", error);
  
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
  
  // Modifier son propre profil
  export const modifierProfilController = async (req, res) => {
    try {
      const user = await modifierProfilService({
        id: req.user.id,
        ...req.body,
      });
  
      return res.status(200).json({
        success: true,
        message: "Profil modifié avec succès.",
        user,
      });
    } catch (error) {
      console.error("Erreur modification profil :", error);
  
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
  
  // Supprimer son propre compte
  export const supprimerCompteController = async (req, res) => {
    try {
      const result = await supprimerCompteService(req.user.id);
  
      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("Erreur suppression compte :", error);
  
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
  
  // Récupérer tous les utilisateurs
  // Cette route sera protégée par adminMiddleware dans user.routes.js
  export const getUsersController = async (req, res) => {
    try {
      const users = await getUsersService();
  
      return res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      console.error("Erreur récupération utilisateurs :", error);
  
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