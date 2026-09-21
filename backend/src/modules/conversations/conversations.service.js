import {
  Conversation,
  ConversationParticipant,
  Messages,
  User,
} from "../../models/index.js";
import { Op } from "sequelize";

export const getUserConversations = async (userId) => {
  const participations = await ConversationParticipant.findAll({
    where: {
      Id_users: userId,
    },

    include: [
      {
        association: "conversation",

        include: [
          {
            association: "participants",

            include: [
              {
                association: "user",

                attributes: ["Id_users", "pseudo", "prenom", "nom"],
              },
            ],
          },

          {
            association: "messages",

            separate: true,

            limit: 1,

            order: [["created_at", "DESC"]],

            include: [
              {
                association: "user",

                attributes: ["Id_users", "pseudo", "prenom", "nom"],
              },

              {
                association: "proposition",

                required: false,

                include: [
                  {
                    association: "article",

                    required: false,
                  },

                  {
                    association: "articlePropose",

                    required: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],

    order: [["created_at", "DESC"]],
  });

  const conversations = participations
    .map((participation) => participation.conversation)
    .filter(Boolean);

  for (const conversation of conversations) {
    const unreadCount = await Messages.count({
      where: {
        Id_conversations: conversation.Id_conversations,

        Id_users: {
          [Op.ne]: userId,
        },

        lu: false,
      },
    });

    conversation.setDataValue("unreadCount", unreadCount);
  }

  return conversations;
};

export const getConversationById = async (conversationId, userId) => {
  const participation = await ConversationParticipant.findOne({
    where: {
      Id_conversations: conversationId,
      Id_users: userId,
    },
  });

  if (!participation) {
    const error = new Error("Vous ne participez pas à cette conversation.");

    error.statusCode = 403;

    throw error;
  }

  const conversation = await Conversation.findByPk(conversationId, {
    include: [
      {
        association: "participants",

        include: [
          {
            association: "user",

            attributes: ["Id_users", "pseudo", "prenom", "nom"],
          },
        ],
      },
    ],
  });

  if (!conversation) {
    const error = new Error("Conversation introuvable.");

    error.statusCode = 404;

    throw error;
  }

  conversation.setDataValue("currentUser", {
    Id_users: userId,
  });

  return conversation;
};

export const getConversationMessages = async (
  conversationId,
  userId,
  page = 1,
  limit = 50,
) => {
  const participation = await ConversationParticipant.findOne({
    where: {
      Id_conversations: conversationId,
      Id_users: userId,
    },
  });

  if (!participation) {
    const error = new Error("Vous ne participez pas à cette conversation.");

    error.statusCode = 403;

    throw error;
  }

  await Messages.update(
    {
      lu: true,
    },
    {
      where: {
        Id_conversations: conversationId,

        Id_users: {
          [Op.ne]: userId,
        },

        lu: false,
      },
    },
  );

  const pageNumber = Math.max(Number(page) || 1, 1);

  const limitNumber = Math.min(Math.max(Number(limit) || 50, 1), 100);

  const offset = (pageNumber - 1) * limitNumber;

  const result = await Messages.findAndCountAll({
    where: {
      Id_conversations: conversationId,
    },

    include: [
      {
        association: "user",

        attributes: ["Id_users", "pseudo", "prenom", "nom"],
      },

      {
        association: "proposition",

        required: false,

        include: [
          {
            association: "article",

            required: false,

            include: [
              {
                association: "photos",

                required: false,
              },
            ],
          },

          {
            association: "articlePropose",

            required: false,

            include: [
              {
                association: "photos",

                required: false,
              },
            ],
          },

          {
            association: "user",

            required: false,

            attributes: ["Id_users", "pseudo", "prenom", "nom"],
          },
        ],
      },
    ],

    order: [["created_at", "ASC"]],

    limit: limitNumber,

    offset,
  });

  return {
    data: result.rows,

    pagination: {
      page: pageNumber,

      limit: limitNumber,

      total: result.count,

      totalPages: Math.ceil(result.count / limitNumber),
    },
  };
};

export const createConversation = async (userId, participantId) => {
  if (userId === participantId) {
    const error = new Error(
      "Vous ne pouvez pas créer une conversation avec vous-même.",
    );

    error.statusCode = 400;

    throw error;
  }

  const participant = await User.findByPk(participantId);

  if (!participant) {
    const error = new Error("Utilisateur introuvable.");

    error.statusCode = 404;

    throw error;
  }

  const existingParticipation = await ConversationParticipant.findAll({
    where: {
      Id_users: {
        [Op.in]: [userId, participantId],
      },
    },
  });

  const conversations = {};

  for (const participation of existingParticipation) {
    const conversationId = participation.Id_conversations;

    if (!conversations[conversationId]) {
      conversations[conversationId] = [];
    }

    conversations[conversationId].push(participation.Id_users);
  }

  for (const conversationId of Object.keys(conversations)) {
    const users = conversations[conversationId];

    if (
      users.length === 2 &&
      users.includes(userId) &&
      users.includes(participantId)
    ) {
      return getConversationById(conversationId, userId);
    }
  }

  const conversation = await Conversation.create({});

  await ConversationParticipant.bulkCreate([
    {
      Id_conversations: conversation.Id_conversations,

      Id_users: userId,
    },

    {
      Id_conversations: conversation.Id_conversations,

      Id_users: participantId,
    },
  ]);

  return getConversationById(conversation.Id_conversations, userId);
};
