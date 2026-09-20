import {
    getUserPhotosService,
    getUserPhotoByIdService,
    createUserPhotoService,
    deleteUserPhotoService,
  } from "./userPhotos.service.js";
  
  // Récupérer toutes les photos de l'utilisateur connecté
  export const allUserPhotos = async (req, res) => {
    try {
      const photos = await getUserPhotosService(req.user.id);
  
      return res.status(200).json({
        success: true,
        photos,
      });
    } catch (error) {
      console.error(
        "Erreur récupération photos utilisateur :",
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
  
  // Récupérer une photo
  export const userPhoto = async (req, res) => {
    try {
      const photo = await getUserPhotoByIdService(
        req.params.id,
        req.user.id,
      );
  
      return res.status(200).json({
        success: true,
        photo,
      });
    } catch (error) {
      console.error("Erreur récupération photo utilisateur :", error);
  
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
  
  // Ajouter une photo de profil
  export const createUserPhoto = async (req, res) => {
    try {
      const photo = await createUserPhotoService(
        req.user.id,
        req.body,
      );
  
      return res.status(201).json({
        success: true,
        message: "Photo de profil ajoutée avec succès",
        photo,
      });
    } catch (error) {
      console.error("Erreur création photo utilisateur :", error);
  
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
  
  // Supprimer une photo de profil
  export const deleteUserPhoto = async (req, res) => {
    try {
      await deleteUserPhotoService(
        req.params.id,
        req.user.id,
      );
  
      return res.status(200).json({
        success: true,
        message: "Photo de profil supprimée avec succès",
      });
    } catch (error) {
      console.error("Erreur suppression photo utilisateur :", error);
  
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