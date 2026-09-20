import Ville from "../../models/Ville.js";
import Region from "../../models/Region.js";
import User from "../../models/User.js";
import { Op } from "sequelize";

// Récupérer toutes les villes
export const getVillesService = async () => {
  try {
    return await Ville.findAll({
      include: [
        {
          model: Region,
          as: "region",
          attributes: ["Id_regions", "nom"],
        },
      ],
      order: [["nom", "ASC"]],
    });
  } catch (error) {
    console.error("Erreur récupération villes :", error);
    throw error;
  }
};

// Récupérer une ville
export const getVilleByIdService = async (id) => {
  try {
    const ville = await Ville.findByPk(id, {
      include: [
        {
          model: Region,
          as: "region",
          attributes: ["Id_regions", "nom"],
        },
      ],
    });

    if (!ville) {
      const error = new Error("Ville introuvable");
      error.statusCode = 404;
      throw error;
    }

    return ville;
  } catch (error) {
    console.error("Erreur récupération ville :", error);
    throw error;
  }
};

// Récupérer les villes d'une région
export const getVillesByRegionService = async (regionId) => {
  try {
    const region = await Region.findByPk(regionId);

    if (!region) {
      const error = new Error("Région introuvable");
      error.statusCode = 404;
      throw error;
    }

    return await Ville.findAll({
      where: {
        Id_regions: regionId,
      },
      order: [["nom", "ASC"]],
    });
  } catch (error) {
    console.error(
      "Erreur récupération villes de la région :",
      error,
    );
    throw error;
  }
};

// Créer une ville
export const createVilleService = async ({
  nom,
  Id_regions,
}) => {
  try {
    const region = await Region.findByPk(Id_regions);

    if (!region) {
      const error = new Error("Région introuvable");
      error.statusCode = 404;
      throw error;
    }

    const existingVille = await Ville.findOne({
      where: {
        nom,
        Id_regions,
      },
    });

    if (existingVille) {
      const error = new Error(
        "Cette ville existe déjà dans cette région",
      );
      error.statusCode = 409;
      throw error;
    }

    return await Ville.create({
      nom,
      Id_regions,
    });
  } catch (error) {
    console.error("Erreur création ville :", error);
    throw error;
  }
};

// Modifier une ville
export const updateVilleService = async (id, data) => {
  try {
    const ville = await Ville.findByPk(id);

    if (!ville) {
      const error = new Error("Ville introuvable");
      error.statusCode = 404;
      throw error;
    }

    const newNom = data.nom ?? ville.nom;
    const newRegion =
      data.Id_regions ?? ville.Id_regions;

    if (data.Id_regions) {
      const region = await Region.findByPk(
        data.Id_regions,
      );

      if (!region) {
        const error = new Error("Région introuvable");
        error.statusCode = 404;
        throw error;
      }
    }

    const existingVille = await Ville.findOne({
      where: {
        nom: newNom,
        Id_regions: newRegion,
        Id_villes: {
          [Op.ne]: id,
        },
      },
    });

    if (existingVille) {
      const error = new Error(
        "Cette ville existe déjà dans cette région",
      );
      error.statusCode = 409;
      throw error;
    }

    await ville.update({
      nom: newNom,
      Id_regions: newRegion,
    });

    return ville;
  } catch (error) {
    console.error("Erreur modification ville :", error);
    throw error;
  }
};

// Supprimer une ville
export const deleteVilleService = async (id) => {
  try {
    const ville = await Ville.findByPk(id);

    if (!ville) {
      const error = new Error("Ville introuvable");
      error.statusCode = 404;
      throw error;
    }

    const users = await User.count({
      where: {
        Id_villes: id,
      },
    });

    if (users > 0) {
      const error = new Error(
        "Impossible de supprimer cette ville car des utilisateurs y sont rattachés",
      );
      error.statusCode = 409;
      throw error;
    }

    await ville.destroy();

    return true;
  } catch (error) {
    console.error("Erreur suppression ville :", error);
    throw error;
  }
};