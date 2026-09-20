import SubCategory from "../../models/SubCategory.js";
import Category from "../../models/Category.js";

// Récupérer toutes les sous-catégories
export const getSubCategoriesService = async () => {
  try {
    const subCategories = await SubCategory.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["Id_categories", "nom"],
        },
      ],
      order: [["nom", "ASC"]],
    });

    return subCategories;
  } catch (error) {
    console.error("Erreur récupération sous-catégories :", error);
    throw error;
  }
};

// Récupérer une sous-catégorie par son ID
export const getSubCategorieByIdService = async (id) => {
  try {
    const subCategorie = await SubCategory.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["Id_categories", "nom"],
        },
      ],
    });

    if (!subCategorie) {
      const error = new Error("Sous-catégorie introuvable");
      error.statusCode = 404;
      throw error;
    }

    return subCategorie;
  } catch (error) {
    console.error("Erreur récupération sous-catégorie :", error);
    throw error;
  }
};

// Créer une sous-catégorie
export const createSubCategorieService = async ({
  nom,
  Id_categories,
}) => {
  try {
    const category = await Category.findByPk(Id_categories);

    if (!category) {
      const error = new Error("Catégorie introuvable");
      error.statusCode = 404;
      throw error;
    }

    const existingSubCategorie = await SubCategory.findOne({
      where: {
        nom,
        Id_categories,
      },
    });

    if (existingSubCategorie) {
      const error = new Error(
        "Cette sous-catégorie existe déjà dans cette catégorie",
      );
      error.statusCode = 409;
      throw error;
    }

    const subCategorie = await SubCategory.create({
      nom,
      Id_categories,
    });

    return getSubCategorieByIdService(
      subCategorie.Id_subCategories,
    );
  } catch (error) {
    console.error("Erreur création sous-catégorie :", error);
    throw error;
  }
};

// Modifier une sous-catégorie
export const updateSubCategorieService = async (
  id,
  { nom, Id_categories },
) => {
  try {
    const subCategorie = await SubCategory.findByPk(id);

    if (!subCategorie) {
      const error = new Error("Sous-catégorie introuvable");
      error.statusCode = 404;
      throw error;
    }

    if (Id_categories !== undefined) {
      const category = await Category.findByPk(Id_categories);

      if (!category) {
        const error = new Error("Catégorie introuvable");
        error.statusCode = 404;
        throw error;
      }
    }

    const newNom =
      nom !== undefined ? nom : subCategorie.nom;

    const newCategoryId =
      Id_categories !== undefined
        ? Id_categories
        : subCategorie.Id_categories;

    const existingSubCategorie = await SubCategory.findOne({
      where: {
        nom: newNom,
        Id_categories: newCategoryId,
      },
    });

    if (
      existingSubCategorie &&
      existingSubCategorie.Id_subCategories !== id
    ) {
      const error = new Error(
        "Cette sous-catégorie existe déjà dans cette catégorie",
      );
      error.statusCode = 409;
      throw error;
    }

    if (nom !== undefined) {
      subCategorie.nom = nom;
    }

    if (Id_categories !== undefined) {
      subCategorie.Id_categories = Id_categories;
    }

    await subCategorie.save();

    return getSubCategorieByIdService(id);
  } catch (error) {
    console.error("Erreur modification sous-catégorie :", error);
    throw error;
  }
};

// Supprimer une sous-catégorie
export const deleteSubCategorieService = async (id) => {
  try {
    const subCategorie = await SubCategory.findByPk(id);

    if (!subCategorie) {
      const error = new Error("Sous-catégorie introuvable");
      error.statusCode = 404;
      throw error;
    }

    await subCategorie.destroy();

    return {
      message: "Sous-catégorie supprimée avec succès.",
    };
  } catch (error) {
    console.error("Erreur suppression sous-catégorie :", error);
    throw error;
  }
};