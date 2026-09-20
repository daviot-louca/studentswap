import Region from "../../models/Region.js";
import Ville from "../../models/Ville.js";
import { Op } from "sequelize";

// Récupérer toutes les régions
export const getRegionsService = async () => {
  try {
    return await Region.findAll({
      include: [
        {
          model: Ville,
          as: "villes",
          attributes: ["Id_villes", "nom"],
        },
      ],
      order: [["nom", "ASC"]],
    });
  } catch (error) {
    console.error("Erreur récupération régions :", error);
    throw error;
  }
};

// Récupérer une région
export const getRegionByIdService = async (id) => {
  try {
    const region = await Region.findByPk(id, {
      include: [
        {
          model: Ville,
          as: "villes",
          attributes: ["Id_villes", "nom"],
        },
      ],
    });

    if (!region) {
      const error = new Error("Région introuvable");
      error.statusCode = 404;
      throw error;
    }

    return region;
  } catch (error) {
    console.error("Erreur récupération région :", error);
    throw error;
  }
};

// Créer une région
export const createRegionService = async ({ nom }) => {
  try {
    const existingRegion = await Region.findOne({
      where: {
        nom,
      },
    });

    if (existingRegion) {
      const error = new Error(
        "Cette région existe déjà",
      );
      error.statusCode = 409;
      throw error;
    }

    return await Region.create({
      nom,
    });
  } catch (error) {
    console.error("Erreur création région :", error);
    throw error;
  }
};

// Modifier une région
export const updateRegionService = async (id, data) => {
  try {
    const region = await Region.findByPk(id);

    if (!region) {
      const error = new Error("Région introuvable");
      error.statusCode = 404;
      throw error;
    }

    if (data.nom) {
      const existingRegion = await Region.findOne({
        where: {
          nom: data.nom,
          Id_regions: {
            [Op.ne]: id,
          },
        },
      });

      if (existingRegion) {
        const error = new Error(
          "Cette région existe déjà",
        );
        error.statusCode = 409;
        throw error;
      }
    }

    await region.update({
      nom: data.nom ?? region.nom,
    });

    return region;
  } catch (error) {
    console.error("Erreur modification région :", error);
    throw error;
  }
};

// Supprimer une région
export const deleteRegionService = async (id) => {
  try {
    const region = await Region.findByPk(id);

    if (!region) {
      const error = new Error("Région introuvable");
      error.statusCode = 404;
      throw error;
    }

    const villes = await Ville.count({
      where: {
        Id_regions: id,
      },
    });

    if (villes > 0) {
      const error = new Error(
        "Impossible de supprimer cette région car elle contient des villes",
      );
      error.statusCode = 409;
      throw error;
    }

    await region.destroy();

    return true;
  } catch (error) {
    console.error("Erreur suppression région :", error);
    throw error;
  }
};