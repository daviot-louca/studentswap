"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notation", {
      Id_notation: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      note: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },

      commentaire: {
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
    await queryInterface.dropTable("notation");
  },
};