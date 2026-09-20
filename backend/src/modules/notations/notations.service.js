import Notation from "../../models/Notation.js";
import User from "../../models/User.js";

export const getNotations = async () => {
  return await Notation.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["Id_users", "pseudo"],
      },
    ],
    order: [["created_at", "DESC"]],
  });
};

export const getNotationById = async (id) => {
  const notation = await Notation.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["Id_users", "pseudo"],
      },
    ],
  });

  if (!notation) {
    const error = new Error("Notation introuvable");
    error.statusCode = 404;
    throw error;
  }

  return notation;
};

export const createNotation = async ({
  Id_users,
  note,
  commentaire,
}) => {
  const user = await User.findByPk(Id_users);

  if (!user) {
    const error = new Error("Utilisateur introuvable");
    error.statusCode = 404;
    throw error;
  }

  const notationExistante = await Notation.findOne({
    where: {
      Id_users,
    },
  });

  if (notationExistante) {
    const error = new Error(
      "Cet utilisateur possède déjà une notation"
    );
    error.statusCode = 409;
    throw error;
  }

  const now = new Date();

  return await Notation.create({
    Id_users,
    note,
    commentaire: commentaire ?? null,
    created_at: now,
    updated_at: now,
  });
};

export const deleteNotation = async (id, userId) => {
  const notation = await Notation.findByPk(id);

  if (!notation) {
    const error = new Error("Notation introuvable");
    error.statusCode = 404;
    throw error;
  }

  if (notation.Id_users !== userId) {
    const error = new Error(
      "Vous ne pouvez pas supprimer cette notation"
    );
    error.statusCode = 403;
    throw error;
  }

  await notation.destroy();

  return {
    message: "Notation supprimée avec succès",
  };
};