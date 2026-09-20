import Category from "../../models/Category.js";

// Récupérer toutes les catégories
export const getCategoriesService = async () => {
  try {
    const categories = await Category.findAll({
      order: [["nom", "ASC"]],
    });

    return categories;
  } catch (error) {
    console.error("Erreur récupération catégories :", error);
    throw error;
  }
};

// Récupérer une catégorie par son ID
export const getCategorieByIdService = async (id) => {
  try {
    const categorie = await Category.findByPk(id);

    if (!categorie) {
      const error = new Error("Catégorie introuvable");
      error.statusCode = 404;
      throw error;
    }

    return categorie;
  } catch (error) {
    console.error("Erreur récupération catégorie :", error);
    throw error;
  }
};

// Créer une catégorie
export const createCategorieService = async ({ nom }) => {
  try {
    const existingCategorie = await Category.findOne({
      where: { nom },
    });

    if (existingCategorie) {
      const error = new Error("Cette catégorie existe déjà");
      error.statusCode = 409;
      throw error;
    }

    const categorie = await Category.create({
      nom,
    });

    return categorie;
  } catch (error) {
    console.error("Erreur création catégorie :", error);
    throw error;
  }
};

// Modifier une catégorie
export const updateCategorieService = async (id, { nom }) => {
  try {
    const categorie = await Category.findByPk(id);

    if (!categorie) {
      const error = new Error("Catégorie introuvable");
      error.statusCode = 404;
      throw error;
    }

    if (nom !== undefined && nom !== categorie.nom) {
      const existingCategorie = await Category.findOne({
        where: { nom },
      });

      if (existingCategorie) {
        const error = new Error("Cette catégorie existe déjà");
        error.statusCode = 409;
        throw error;
      }

      categorie.nom = nom;
    }

    await categorie.save();

    return categorie;
  } catch (error) {
    console.error("Erreur modification catégorie :", error);
    throw error;
  }
};

// Supprimer une catégorie
export const deleteCategorieService = async (id) => {
  try {
    const categorie = await Category.findByPk(id);

    if (!categorie) {
      const error = new Error("Catégorie introuvable");
      error.statusCode = 404;
      throw error;
    }

    await categorie.destroy();

    return {
      message: "Catégorie supprimée avec succès.",
    };
  } catch (error) {
    console.error("Erreur suppression catégorie :", error);
    throw error;
  }
};