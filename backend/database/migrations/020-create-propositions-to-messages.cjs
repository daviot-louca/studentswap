"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription =
      await queryInterface.describeTable("messages");

    if (!tableDescription.Id_propositions_troc) {
      await queryInterface.addColumn(
        "messages",
        "Id_propositions_troc",
        {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: "propositions_troc",
            key: "Id_propositions_troc",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      );
    }

    const indexes =
      await queryInterface.showIndex("messages");

    const indexExists = indexes.some(
      (index) =>
        index.name ===
        "messages_id_propositions_troc_idx",
    );

    if (!indexExists) {
      await queryInterface.addIndex(
        "messages",
        ["Id_propositions_troc"],
        {
          name: "messages_id_propositions_troc_idx",
        },
      );
    }
  },

  async down(queryInterface) {
    const indexes =
      await queryInterface.showIndex("messages");

    const indexExists = indexes.some(
      (index) =>
        index.name ===
        "messages_id_propositions_troc_idx",
    );

    if (indexExists) {
      await queryInterface.removeIndex(
        "messages",
        "messages_id_propositions_troc_idx",
      );
    }

    const tableDescription =
      await queryInterface.describeTable("messages");

    if (tableDescription.Id_propositions_troc) {
      await queryInterface.removeColumn(
        "messages",
        "Id_propositions_troc",
      );
    }
  },
};