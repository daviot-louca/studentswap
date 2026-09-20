"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("photosArticle", {
      Id_photosArticle: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },

      ordre: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
    await queryInterface.dropTable("photosArticle");
  },
};