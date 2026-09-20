"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // FAVORIS
    await queryInterface.bulkInsert("favorites", [
      {
        Id_favorites: "a0000000-0000-4000-8000-000000000001",
        Id_users: "80000000-0000-4000-8000-000000000002",
        Id_articles: "90000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_favorites: "a0000000-0000-4000-8000-000000000002",
        Id_users: "80000000-0000-4000-8000-000000000003",
        Id_articles: "90000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
    ]);

    // CONVERSATIONS
    await queryInterface.bulkInsert("conversations", [
      {
        Id_conversations: "b0000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
    ]);

    // PARTICIPANTS DES CONVERSATIONS
    await queryInterface.bulkInsert("conversationParticipants", [
      {
        Id_conversationsParticipants:
          "c0000000-0000-4000-8000-000000000002",
        Id_conversations: "b0000000-0000-4000-8000-000000000001",
        Id_users: "80000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_conversationsParticipants:
          "c0000000-0000-4000-8000-000000000001",
        Id_conversations: "b0000000-0000-4000-8000-000000000001",
        Id_users: "80000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
    ]);

    // PROPOSITIONS DE TROC
    await queryInterface.bulkInsert("propositions_troc", [
      {
        Id_propositions_troc:
          "d0000000-0000-4000-8000-000000000001",
        statut: "en_attente",
        message: "Bonjour, je suis intéressé par cet article.",
        Id_users: "80000000-0000-4000-8000-000000000002",
        Id_articles: "90000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
    ]);

    // NOTIFICATIONS
    await queryInterface.bulkInsert("notifications", [
      {
        Id_notifications: "e0000000-0000-4000-8000-000000000001",
        type: "PROPOSITION_TROC",
        contenu: "Vous avez reçu une proposition de troc.",
        lu: false,
        Id_users: "80000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
    ]);

    // NOTATIONS
    await queryInterface.bulkInsert("notation", [
      {
        Id_notation: "f0000000-0000-4000-8000-000000000001",
        note: 5,
        commentaire: "Échange sérieux et rapide.",
        Id_users: "80000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("notation", null, {});
    await queryInterface.bulkDelete("notifications", null, {});
    await queryInterface.bulkDelete("propositions_troc", null, {});
    await queryInterface.bulkDelete(
      "conversationParticipants",
      null,
      {}
    );
    await queryInterface.bulkDelete("conversations", null, {});
    await queryInterface.bulkDelete("favorites", null, {});
  },
};