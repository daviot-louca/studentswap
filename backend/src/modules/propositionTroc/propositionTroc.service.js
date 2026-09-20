import PropositionTroc from "../../models/PropositionTroc.js";
import Article from "../../models/Article.js";
import User from "../../models/User.js";
import { Op } from "sequelize";

// Récupérer les propositions de l'utilisateur
export const getPropositionsTrocService = async (userId) => {
  try {
    return await PropositionTroc.findAll({
      where: {
        [Op.or]: [
          { Id_users: userId },
        ],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["Id_users", "pseudo", "prenom", "nom"],
        },
        {
          model: Article,
          as: "article",
        },
      ],
      order: [["created_at", "DESC"]],
    });
  } catch (error) {
    console.error(
      "Erreur récupération propositions de troc :",
      error,
    );
    throw error;
  }
};

// Récupérer une proposition
export const getPropositionTrocByIdService = async (
  id,
  userId,
) => {
  try {
    const proposition = await PropositionTroc.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["Id_users", "pseudo", "prenom", "nom"],
        },
        {
          model: Article,
          as: "article",
        },
      ],
    });

    if (!proposition) {
      const error = new Error(
        "Proposition de troc introuvable",
      );
      error.statusCode = 404;
      throw error;
    }

    if (proposition.Id_users !== userId) {
      const error = new Error(
        "Vous n'avez pas accès à cette proposition",
      );
      error.statusCode = 403;
      throw error;
    }

    return proposition;
  } catch (error) {
    console.error(
      "Erreur récupération proposition de troc :",
      error,
    );
    throw error;
  }
};

// Créer une proposition de troc
export const createPropositionTrocService = async (
  userId,
  data,
) => {
  try {
    const article = await Article.findByPk(data.Id_articles);

    if (!article) {
      const error = new Error("Article introuvable");
      error.statusCode = 404;
      throw error;
    }

    // Empêcher de proposer un troc sur son propre article
    if (article.Id_users === userId) {
      const error = new Error(
        "Vous ne pouvez pas proposer un troc sur votre propre article",
      );
      error.statusCode = 400;
      throw error;
    }

    const existingProposition =
      await PropositionTroc.findOne({
        where: {
          Id_users: userId,
          Id_articles: data.Id_articles,
          statut: "en_attente",
        },
      });

    if (existingProposition) {
      const error = new Error(
        "Vous avez déjà une proposition en attente pour cet article",
      );
      error.statusCode = 409;
      throw error;
    }

    return await PropositionTroc.create({
      Id_users: userId,
      Id_articles: data.Id_articles,
      message: data.message ?? null,
      statut: "en_attente",
    });
  } catch (error) {
    console.error(
      "Erreur création proposition de troc :",
      error,
    );
    throw error;
  }
};

// Modifier le statut d'une proposition
export const updatePropositionTrocService = async (
  id,
  userId,
  data,
) => {
  try {
    const proposition = await PropositionTroc.findByPk(id, {
      include: [
        {
          model: Article,
          as: "article",
        },
      ],
    });

    if (!proposition) {
      const error = new Error(
        "Proposition de troc introuvable",
      );
      error.statusCode = 404;
      throw error;
    }

    // Le propriétaire de l'article peut accepter/refuser.
    // L'auteur de la proposition peut l'annuler.
    const isProposer = proposition.Id_users === userId;
    const isArticleOwner =
      proposition.article?.Id_users === userId;

    if (!isProposer && !isArticleOwner) {
      const error = new Error(
        "Vous n'avez pas le droit de modifier cette proposition",
      );
      error.statusCode = 403;
      throw error;
    }

    const allowedStatuses = [
      "en_attente",
      "acceptee",
      "refusee",
      "annulee",
    ];

    if (!allowedStatuses.includes(data.statut)) {
      const error = new Error(
        "Statut de proposition invalide",
      );
      error.statusCode = 400;
      throw error;
    }

    // L'auteur peut uniquement annuler sa proposition.
    if (isProposer && !isArticleOwner) {
      if (data.statut !== "annulee") {
        const error = new Error(
          "Vous pouvez uniquement annuler votre proposition",
        );
        error.statusCode = 403;
        throw error;
      }
    }

    // Le propriétaire de l'article peut accepter/refuser.
    if (isArticleOwner) {
      if (
        !["acceptee", "refusee"].includes(data.statut)
      ) {
        const error = new Error(
          "Le propriétaire peut uniquement accepter ou refuser la proposition",
        );
        error.statusCode = 403;
        throw error;
      }
    }

    proposition.statut = data.statut;

    if (data.message !== undefined) {
      proposition.message = data.message;
    }

    await proposition.save();

    return proposition;
  } catch (error) {
    console.error(
      "Erreur modification proposition de troc :",
      error,
    );
    throw error;
  }
};

// Supprimer une proposition
export const deletePropositionTrocService = async (
  id,
  userId,
) => {
  try {
    const proposition = await PropositionTroc.findByPk(id);

    if (!proposition) {
      const error = new Error(
        "Proposition de troc introuvable",
      );
      error.statusCode = 404;
      throw error;
    }

    if (proposition.Id_users !== userId) {
      const error = new Error(
        "Vous ne pouvez pas supprimer cette proposition",
      );
      error.statusCode = 403;
      throw error;
    }

    await proposition.destroy();

    return true;
  } catch (error) {
    console.error(
      "Erreur suppression proposition de troc :",
      error,
    );
    throw error;
  }
};