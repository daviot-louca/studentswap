"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("villes", {
      Id_villes: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      nom: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      Id_regions: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: "region",
          key: "Id_regions",
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
    await queryInterface.dropTable("villes");
  },
};