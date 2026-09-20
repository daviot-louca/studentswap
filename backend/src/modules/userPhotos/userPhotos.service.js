import UserPhoto from "../../models/UserPhoto.js";
import User from "../../models/User.js";

// Récupérer toutes les photos de l'utilisateur connecté
export const getUserPhotosService = async (userId) => {
  try {
    return await UserPhoto.findAll({
      where: {
        Id_users: userId,
      },
      order: [["created_at", "DESC"]],
    });
  } catch (error) {
    console.error("Erreur récupération photos utilisateur :", error);
    throw error;
  }
};

// Récupérer une photo
export const getUserPhotoByIdService = async (id, userId) => {
  try {
    const photo = await UserPhoto.findOne({
      where: {
        Id_users: userId,
        Id_usersPhotos: id,
      },
    });

    if (!photo) {
      const error = new Error("Photo introuvable");
      error.statusCode = 404;
      throw error;
    }

    return photo;
  } catch (error) {
    console.error("Erreur récupération photo utilisateur :", error);
    throw error;
  }
};

// Ajouter une photo de profil
export const createUserPhotoService = async (userId, data) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      const error = new Error("Utilisateur introuvable");
      error.statusCode = 404;
      throw error;
    }

    const photo = await UserPhoto.create({
      Id_users: userId,
      url: data.url,
    });

    return photo;
  } catch (error) {
    console.error("Erreur création photo utilisateur :", error);
    throw error;
  }
};

// Supprimer une photo de profil
export const deleteUserPhotoService = async (id, userId) => {
  try {
    const photo = await UserPhoto.findOne({
      where: {
        Id_users: userId,
        Id_usersPhotos: id,
      },
    });

    if (!photo) {
      const error = new Error("Photo introuvable");
      error.statusCode = 404;
      throw error;
    }

    await photo.destroy();

    return true;
  } catch (error) {
    console.error("Erreur suppression photo utilisateur :", error);
    throw error;
  }
};