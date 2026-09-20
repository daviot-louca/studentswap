"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("articles", {
      Id_articles: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      titre: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
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

      Id_subCategories: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "subCategories",
          key: "Id_subCategories",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      Id_etatArticle: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "etatArticle",
          key: "Id_etatArticle",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
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
    await queryInterface.dropTable("articles");
  },
};