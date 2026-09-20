import PropositionTroc from "../../models/PropositionTroc.js";
import Article from "../../models/Article.js";
import User from "../../models/User.js";
import Conversation from "../../models/Conversation.js";
import ConversationParticipant from "../../models/ConversationParticipant.js";
import Messages from "../../models/messages.js";
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
          attributes: [
            "Id_users",
            "pseudo",
            "prenom",
            "nom",
          ],
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
      "Erreur récupération propositions :",
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
          attributes: [
            "Id_users",
            "pseudo",
            "prenom",
            "nom",
          ],
        },
        {
          model: Article,
          as: "article",
        },
      ],
    });

    if (!proposition) {
      const error = new Error(
        "Proposition introuvable",
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
      "Erreur récupération proposition :",
      error,
    );
    throw error;
  }
};

// Créer une demande de don ou une proposition d'échange
export const createPropositionTrocService = async (
  userId,
  data,
) => {
  try {
    const type =
      data.type === "don"
        ? "don"
        : "exchange";

    // ---------------------------------------------------------
    // Récupérer l'article demandé
    // ---------------------------------------------------------

    const article = await Article.findByPk(
      data.Id_articles,
    );

    if (!article) {
      const error = new Error(
        "Article introuvable",
      );
      error.statusCode = 404;
      throw error;
    }

    // Impossible de demander son propre article
    if (article.Id_users === userId) {
      const error = new Error(
        "Vous ne pouvez pas faire une demande sur votre propre article",
      );
      error.statusCode = 400;
      throw error;
    }

    // ---------------------------------------------------------
    // Vérification de l'article proposé
    // uniquement pour un échange
    // ---------------------------------------------------------

    let articlePropose = null;

    if (type === "exchange") {
      if (!data.Id_article_propose) {
        const error = new Error(
          "Vous devez sélectionner un article pour proposer un échange",
        );
        error.statusCode = 400;
        throw error;
      }

      if (
        data.Id_article_propose ===
        data.Id_articles
      ) {
        const error = new Error(
          "L'article proposé doit être différent de l'article demandé",
        );
        error.statusCode = 400;
        throw error;
      }

      articlePropose =
        await Article.findByPk(
          data.Id_article_propose,
        );

      if (!articlePropose) {
        const error = new Error(
          "Article proposé introuvable",
        );
        error.statusCode = 404;
        throw error;
      }

      // L'article proposé doit appartenir
      // à l'utilisateur connecté
      if (
        articlePropose.Id_users !== userId
      ) {
        const error = new Error(
          "Vous ne pouvez proposer qu'un de vos propres articles",
        );
        error.statusCode = 403;
        throw error;
      }
    }

    // ---------------------------------------------------------
    // Vérifier une demande déjà existante
    // ---------------------------------------------------------

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
        "Vous avez déjà une demande en attente pour cet article",
      );
      error.statusCode = 409;
      throw error;
    }

    // ---------------------------------------------------------
    // Créer la proposition
    // ---------------------------------------------------------

    const proposition =
      await PropositionTroc.create({
        Id_users: userId,
        Id_articles: data.Id_articles,
        message: data.message?.trim() || null,
        statut: "en_attente",
        type,
        Id_article_propose:
          type === "exchange"
            ? data.Id_article_propose
            : null,
      });

    // ---------------------------------------------------------
    // Trouver le propriétaire de l'article
    // ---------------------------------------------------------

    const ownerId = article.Id_users;

    // ---------------------------------------------------------
    // Chercher une conversation existante
    // entre les deux utilisateurs
    // ---------------------------------------------------------

    const userParticipations =
      await ConversationParticipant.findAll({
        where: {
          Id_users: userId,
        },
        attributes: ["Id_conversations"],
      });

    const ownerParticipations =
      await ConversationParticipant.findAll({
        where: {
          Id_users: ownerId,
        },
        attributes: ["Id_conversations"],
      });

    const userConversationIds =
      new Set(
        userParticipations.map(
          (participant) =>
            participant.Id_conversations,
        ),
      );

    let conversation = null;

    for (const participant of ownerParticipations) {
      if (
        userConversationIds.has(
          participant.Id_conversations,
        )
      ) {
        conversation =
          await Conversation.findByPk(
            participant.Id_conversations,
          );

        if (conversation) {
          break;
        }
      }
    }

    // ---------------------------------------------------------
    // Créer une conversation si elle n'existe pas
    // ---------------------------------------------------------

    if (!conversation) {
      conversation =
        await Conversation.create({});

      await ConversationParticipant.bulkCreate([
        {
          Id_conversations:
            conversation.Id_conversations,
          Id_users: userId,
        },
        {
          Id_conversations:
            conversation.Id_conversations,
          Id_users: ownerId,
        },
      ]);
    }

    // ---------------------------------------------------------
    // Ajouter la demande dans la conversation
    // ---------------------------------------------------------

    let conversationMessage;

    if (type === "don") {
      conversationMessage =
        `🎁 Demande de don\n\n${
          data.message?.trim() ||
          "Bonjour, je suis intéressé par ton article. Serais-tu d'accord pour me le donner ?"
        }`;
    } else {
      conversationMessage =
        `🔄 Proposition d'échange\n\n${
          data.message?.trim() ||
          "Bonjour, je suis intéressé par ton article. Serais-tu intéressé par un échange ?"
        }`;
    }

    await Messages.create({
      Id_conversations:
        conversation.Id_conversations,
      Id_users: userId,
      Id_propositions_troc:
        proposition.Id_propositions_troc,
      contenu: conversationMessage,
    });

    return proposition;
  } catch (error) {
    console.error(
      "Erreur création proposition :",
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
    const proposition =
      await PropositionTroc.findByPk(id, {
        include: [
          {
            model: Article,
            as: "article",
          },
        ],
      });

    if (!proposition) {
      const error = new Error(
        "Proposition introuvable",
      );
      error.statusCode = 404;
      throw error;
    }

    const isProposer =
      proposition.Id_users === userId;

    const isArticleOwner =
      proposition.article?.Id_users === userId;

    if (
      !isProposer &&
      !isArticleOwner
    ) {
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

    if (
      !allowedStatuses.includes(
        data.statut,
      )
    ) {
      const error = new Error(
        "Statut de proposition invalide",
      );
      error.statusCode = 400;
      throw error;
    }

    // Le demandeur peut uniquement annuler
    if (
      isProposer &&
      !isArticleOwner &&
      data.statut !== "annulee"
    ) {
      const error = new Error(
        "Vous pouvez uniquement annuler votre demande",
      );
      error.statusCode = 403;
      throw error;
    }

    // Le propriétaire peut accepter ou refuser
    if (
      isArticleOwner &&
      !["acceptee", "refusee"].includes(
        data.statut,
      )
    ) {
      const error = new Error(
        "Le propriétaire peut uniquement accepter ou refuser la demande",
      );
      error.statusCode = 403;
      throw error;
    }

    proposition.statut = data.statut;

    if (data.message !== undefined) {
      proposition.message = data.message;
    }

    await proposition.save();

    return proposition;
  } catch (error) {
    console.error(
      "Erreur modification proposition :",
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
    const proposition =
      await PropositionTroc.findByPk(id);

    if (!proposition) {
      const error = new Error(
        "Proposition introuvable",
      );
      error.statusCode = 404;
      throw error;
    }

    if (
      proposition.Id_users !== userId
    ) {
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
      "Erreur suppression proposition :",
      error,
    );

    throw error;
  }
};