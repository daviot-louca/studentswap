import {
  getArticlePhotosService,
  getArticlePhotoByIdService,
  createArticlePhotoService,
  deleteArticlePhotoService,
} from "./articlePhoto.service.js";

// Récupérer toutes les photos d'un article
export const allArticlePhotos = async (req, res) => {
  try {
    const photos = await getArticlePhotosService(
      req.params.articleId,
    );

    return res.status(200).json({
      success: true,
      photos,
    });
  } catch (error) {
    console.error(
      "Erreur récupération photos de l'article :",
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
export const articlePhoto = async (req, res) => {
  try {
    const photo = await getArticlePhotoByIdService(
      req.params.id,
    );

    return res.status(200).json({
      success: true,
      photo,
    });
  } catch (error) {
    console.error("Erreur récupération photo :", error);

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

// Ajouter une ou plusieurs photos à un article
export const createArticlePhoto = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Aucune image reçue.",
      });
    }

    const photos =
      await createArticlePhotoService(
        req.params.articleId,
        req.user.id,
        req.files,
        req,
      );

    return res.status(201).json({
      success: true,
      message: "Photos ajoutées avec succès",
      photos,
    });
  } catch (error) {
    console.error(
      "Erreur ajout photos :",
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

// Supprimer une photo
export const deleteArticlePhoto = async (req, res) => {
  try {
    await deleteArticlePhotoService(
      req.params.id,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Photo supprimée avec succès",
    });
  } catch (error) {
    console.error(
      "Erreur suppression photo :",
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