"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tags", {
      Id_tags: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      nom: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable("tags");
  },
};