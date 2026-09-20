"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usersPhotos", {
      Id_usersPhotos: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      photo: {
        type: Sequelize.STRING(500),
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
    await queryInterface.dropTable("usersPhotos");
  },
};