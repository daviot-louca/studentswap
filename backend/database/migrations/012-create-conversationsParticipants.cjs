"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("conversationParticipants", {
      Id_conversationsParticipants: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      Id_conversations: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "conversations",
          key: "Id_conversations",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      Id_users: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "Id_users",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    await queryInterface.addConstraint("conversationParticipants", {
      fields: ["Id_conversations", "Id_users"],
      type: "unique",
      name: "unique_conversation_user",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("conversationParticipants");
  },
};