"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("messages", {
      Id_messages: {
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

      Id_propositions_troc: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "propositions_troc",
          key: "Id_propositions_troc",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      contenu: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      lu: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    await queryInterface.addIndex("messages", ["Id_conversations"]);

    await queryInterface.addIndex("messages", ["Id_users"]);

    await queryInterface.addIndex("messages", ["Id_propositions_troc"]);

    await queryInterface.addIndex("messages", ["created_at"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("messages");
  },
};
