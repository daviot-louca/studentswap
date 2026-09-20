"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      Id_users: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      pseudo: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },

      prenom: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      nom: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      motsDePasse: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      Id_villes: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "villes",
          key: "Id_villes",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      Id_roles: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "roles",
          key: "Id_roles",
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
    await queryInterface.dropTable("users");
  },
};