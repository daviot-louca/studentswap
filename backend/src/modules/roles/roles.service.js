import Role from "../../models/Role.js";
import User from "../../models/User.js";
import { Op } from "sequelize";

// Récupérer tous les rôles
export const getRolesService = async () => {
  try {
    return await Role.findAll({
      order: [["nom", "ASC"]],
    });
  } catch (error) {
    console.error("Erreur récupération rôles :", error);
    throw error;
  }
};

// Récupérer un rôle
export const getRoleByIdService = async (id) => {
  try {
    const role = await Role.findByPk(id);

    if (!role) {
      const error = new Error("Rôle introuvable");
      error.statusCode = 404;
      throw error;
    }

    return role;
  } catch (error) {
    console.error("Erreur récupération rôle :", error);
    throw error;
  }
};

// Créer un rôle
export const createRoleService = async ({ nom }) => {
  try {
    const existingRole = await Role.findOne({
      where: {
        nom,
      },
    });

    if (existingRole) {
      const error = new Error(
        "Ce rôle existe déjà",
      );
      error.statusCode = 409;
      throw error;
    }

    return await Role.create({
      nom,
    });
  } catch (error) {
    console.error("Erreur création rôle :", error);
    throw error;
  }
};

// Modifier un rôle
export const updateRoleService = async (id, data) => {
  try {
    const role = await Role.findByPk(id);

    if (!role) {
      const error = new Error("Rôle introuvable");
      error.statusCode = 404;
      throw error;
    }

    if (data.nom) {
      const existingRole = await Role.findOne({
        where: {
          nom: data.nom,
          Id_roles: {
            [Op.ne]: id,
          },
        },
      });

      if (existingRole) {
        const error = new Error(
          "Ce rôle existe déjà",
        );
        error.statusCode = 409;
        throw error;
      }
    }

    await role.update({
      nom: data.nom ?? role.nom,
    });

    return role;
  } catch (error) {
    console.error("Erreur modification rôle :", error);
    throw error;
  }
};

// Supprimer un rôle
export const deleteRoleService = async (id) => {
  try {
    const role = await Role.findByPk(id);

    if (!role) {
      const error = new Error("Rôle introuvable");
      error.statusCode = 404;
      throw error;
    }

    const users = await User.count({
      where: {
        Id_roles: id,
      },
    });

    if (users > 0) {
      const error = new Error(
        "Impossible de supprimer ce rôle car des utilisateurs y sont rattachés",
      );
      error.statusCode = 409;
      throw error;
    }

    await role.destroy();

    return true;
  } catch (error) {
    console.error("Erreur suppression rôle :", error);
    throw error;
  }
};