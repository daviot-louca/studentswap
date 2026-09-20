"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notifications", {
      Id_notifications: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      type: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      contenu: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      lu: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable("notifications");
  },
};