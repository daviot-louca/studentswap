import User from "../../models/User.js";
import Role from "../../models/Role.js";
import Ville from "../../models/Ville.js";

export const getUserByIdService = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["motsDePasse"],
      },
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["Id_roles", "nom"],
        },
        {
          model: Ville,
          as: "ville",
          attributes: ["Id_villes", "nom"],
        },
      ],
    });

    if (!user) {
      const error = new Error("Utilisateur introuvable");
      error.statusCode = 404;
      throw error;
    }

    return user;
  } catch (error) {
    console.error("Erreur récupération utilisateur :", error);
    throw error;
  }
};

export const modifierProfilService = async ({
  id,
  prenom,
  nom,
  pseudo,
  email,
  Id_villes,
}) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      const error = new Error("Utilisateur introuvable");
      error.statusCode = 404;
      throw error;
    }

    if (email !== undefined && email !== user.email) {
      const existingEmail = await User.findOne({
        where: { email },
      });

      if (existingEmail) {
        const error = new Error("Cet email est déjà utilisé");
        error.statusCode = 409;
        throw error;
      }
    }

    if (pseudo !== undefined && pseudo !== user.pseudo) {
      const existingPseudo = await User.findOne({
        where: { pseudo },
      });

      if (existingPseudo) {
        const error = new Error("Ce pseudo est déjà utilisé");
        error.statusCode = 409;
        throw error;
      }
    }

    if (prenom !== undefined) {
      user.prenom = prenom;
    }

    if (nom !== undefined) {
      user.nom = nom;
    }

    if (pseudo !== undefined) {
      user.pseudo = pseudo;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (Id_villes !== undefined) {
      user.Id_villes = Id_villes;
    }

    await user.save();

    return getUserByIdService(id);
  } catch (error) {
    console.error("Erreur modification profil :", error);
    throw error;
  }
};

export const supprimerCompteService = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      const error = new Error("Utilisateur introuvable");
      error.statusCode = 404;
      throw error;
    }

    await user.destroy();

    return {
      message: "Compte supprimé avec succès",
    };
  } catch (error) {
    console.error("Erreur suppression compte :", error);
    throw error;
  }
};

export const getUsersService = async () => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["motsDePasse"],
      },
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["Id_roles", "nom"],
        },
        {
          model: Ville,
          as: "ville",
          attributes: ["Id_villes", "nom"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return users;
  } catch (error) {
    console.error("Erreur récupération utilisateurs :", error);
    throw error;
  }
};