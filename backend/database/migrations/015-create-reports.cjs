"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reports", {
      Id_reports: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      motif: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
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
        allowNull: true,
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
    await queryInterface.dropTable("reports");
  },
};