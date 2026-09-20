"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("favorites", {
      Id_favorites: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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

    await queryInterface.addConstraint("favorites", {
      fields: ["Id_users", "Id_articles"],
      type: "unique",
      name: "unique_user_article_favorite",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("favorites");
  },
};