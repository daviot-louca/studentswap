"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("reports", [
      {
        Id_reports: "a1000000-0000-4000-8000-000000000001",
        motif: "Article non conforme",
        description: "L'article présenté ne correspondait pas à l'annonce.",
        Id_users: "80000000-0000-4000-8000-000000000002",
        Id_articles: "90000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("reports", null, {});
  },
};