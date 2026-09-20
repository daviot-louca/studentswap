import Tag from "../../models/Tag.js";
import SubCategory from "../../models/SubCategory.js";
import { Op } from "sequelize";

// Récupérer tous les tags
export const getTagsService = async () => {
  try {
    return await Tag.findAll({
      order: [["nom", "ASC"]],
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          attributes: ["Id_subCategories", "nom"],
        },
      ],
    });
  } catch (error) {
    console.error("Erreur récupération tags :", error);
    throw error;
  }
};

// Récupérer un tag par son ID
export const getTagByIdService = async (id) => {
  try {
    const tag = await Tag.findByPk(id, {
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          attributes: ["Id_subCategories", "nom"],
        },
      ],
    });

    if (!tag) {
      const error = new Error("Tag introuvable");
      error.statusCode = 404;
      throw error;
    }

    return tag;
  } catch (error) {
    console.error("Erreur récupération tag :", error);
    throw error;
  }
};

// Récupérer les tags d'une sous-catégorie
export const getTagsBySubCategoryService = async (subCategoryId) => {
  try {
    const subCategory = await SubCategory.findByPk(subCategoryId);

    if (!subCategory) {
      const error = new Error("Sous-catégorie introuvable");
      error.statusCode = 404;
      throw error;
    }

    return await Tag.findAll({
      where: {
        Id_subCategories: subCategoryId,
      },
      order: [["nom", "ASC"]],
    });
  } catch (error) {
    console.error(
      "Erreur récupération tags de la sous-catégorie :",
      error,
    );
    throw error;
  }
};

// Créer un tag
export const createTagService = async ({
  nom,
  Id_subCategories,
}) => {
  try {
    const subCategory = await SubCategory.findByPk(Id_subCategories);

    if (!subCategory) {
      const error = new Error("Sous-catégorie introuvable");
      error.statusCode = 404;
      throw error;
    }

    const existingTag = await Tag.findOne({
      where: {
        nom,
        Id_subCategories,
      },
    });

    if (existingTag) {
      const error = new Error(
        "Ce tag existe déjà dans cette sous-catégorie",
      );
      error.statusCode = 409;
      throw error;
    }

    return await Tag.create({
      nom,
      Id_subCategories,
    });
  } catch (error) {
    console.error("Erreur création tag :", error);
    throw error;
  }
};

// Modifier un tag
export const updateTagService = async (id, data) => {
  try {
    const tag = await Tag.findByPk(id);

    if (!tag) {
      const error = new Error("Tag introuvable");
      error.statusCode = 404;
      throw error;
    }

    if (data.Id_subCategories) {
      const subCategory = await SubCategory.findByPk(
        data.Id_subCategories,
      );

      if (!subCategory) {
        const error = new Error("Sous-catégorie introuvable");
        error.statusCode = 404;
        throw error;
      }
    }

    const newNom = data.nom ?? tag.nom;
    const newSubCategory =
      data.Id_subCategories ?? tag.Id_subCategories;

    const existingTag = await Tag.findOne({
      where: {
        nom: newNom,
        Id_subCategories: newSubCategory,
        Id_tags: {
          [Op.ne]: id,
        },
      },
    });

    if (existingTag) {
      const error = new Error(
        "Ce tag existe déjà dans cette sous-catégorie",
      );
      error.statusCode = 409;
      throw error;
    }

    await tag.update({
      nom: newNom,
      Id_subCategories: newSubCategory,
    });

    return tag;
  } catch (error) {
    console.error("Erreur modification tag :", error);
    throw error;
  }
};

// Supprimer un tag
export const deleteTagService = async (id) => {
  try {
    const tag = await Tag.findByPk(id);

    if (!tag) {
      const error = new Error("Tag introuvable");
      error.statusCode = 404;
      throw error;
    }

    await tag.destroy();

    return true;
  } catch (error) {
    console.error("Erreur suppression tag :", error);
    throw error;
  }
};