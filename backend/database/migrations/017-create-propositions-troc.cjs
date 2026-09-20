"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("propositions_troc", {
      Id_propositions_troc: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      statut: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "en_attente",
      },

      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      type: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "exchange",
      },

      Id_article_propose: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "articles",
          key: "Id_articles",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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

      Id_articles: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "articles",
          key: "Id_articles",
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable("propositions_troc");
  },
};