import User from "../../models/User.js";
import Role from "../../models/Role.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const registerService = async ({
  prenom,
  nom,
  pseudo,
  email,
  password,
  Id_villes,
}) => {
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { pseudo }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        const error = new Error("Cet email est déjà utilisé");
        error.statusCode = 409;
        throw error;
      }

      if (existingUser.pseudo === pseudo) {
        const error = new Error("Ce pseudo est déjà utilisé");
        error.statusCode = 409;
        throw error;
      }
    }

    const defaultRole = await Role.findOne({
      where: {
        nom: "user",
      },
    });

    if (!defaultRole) {
      const error = new Error("Rôle utilisateur introuvable");
      error.statusCode = 500;
      throw error;
    }

    const hashedPassword = await hash(password, 12);
    const now = new Date();

    const user = await User.create({
      prenom,
      nom,
      pseudo,
      email,
      motsDePasse: hashedPassword,
      Id_villes,
      Id_roles: defaultRole.Id_roles,
      created_at: now,
      updated_at: now,
    });

    const userData = user.toJSON();

    delete userData.motsDePasse;

    return userData;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};

export const loginService = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["Id_roles", "nom"],
        },
      ],
    });

    if (!user) {
      const error = new Error("Identifiants incorrects");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await compare(password, user.motsDePasse);

    if (!isMatch) {
      const error = new Error("Identifiants incorrects");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        id: user.Id_users,
        email: user.email,
        role: user.role?.nom,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
      },
    );

    const userData = user.toJSON();

    delete userData.motsDePasse;

    return {
      token,
      user: userData,
    };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

export const modifierMotDePasseService = async ({
  oldPassword,
  newPassword,
  id,
}) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      const error = new Error("Utilisateur introuvable");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await compare(oldPassword, user.motsDePasse);

    if (!isMatch) {
      const error = new Error("Ancien mot de passe incorrect");
      error.statusCode = 401;
      throw error;
    }

    const newPasswordHash = await hash(newPassword, 12);

    user.motsDePasse = newPasswordHash;

    await user.save();

    return {
      message: "Mot de passe modifié avec succès",
    };
  } catch (error) {
    console.error(
      "Erreur lors de la modification du mot de passe :",
      error,
    );

    throw error;
  }
};

export const getMeService = async (id) => {
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
      ],
    });

    if (!user) {
      const error = new Error("Utilisateur introuvable");
      error.statusCode = 404;
      throw error;
    }

    return user;
  } catch (error) {
    console.error(
      "Erreur récupération utilisateur :",
      error,
    );

    throw error;
  }
};