"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subCategories", {
      Id_subCategories: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      nom: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      Id_categories: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: "categories",
          key: "Id_categories",
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
    await queryInterface.dropTable("subCategories");
  },
};