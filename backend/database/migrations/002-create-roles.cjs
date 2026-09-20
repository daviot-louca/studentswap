"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles", {
      Id_roles: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      nom: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable("roles");
  },
};