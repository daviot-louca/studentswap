"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("categories", [
      {
        Id_categories: "50000000-0000-4000-8000-000000000001",
        nom: "Mobilier",
        created_at: now,
        updated_at: now,
      },
      {
        Id_categories: "50000000-0000-4000-8000-000000000002",
        nom: "Électronique",
        created_at: now,
        updated_at: now,
      },
      {
        Id_categories: "50000000-0000-4000-8000-000000000003",
        nom: "Vêtements",
        created_at: now,
        updated_at: now,
      },
      {
        Id_categories: "50000000-0000-4000-8000-000000000004",
        nom: "Livres",
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.bulkInsert("subCategories", [
      {
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        nom: "Chaises",
        Id_categories: "50000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_subCategories: "60000000-0000-4000-8000-000000000002",
        nom: "Tables",
        Id_categories: "50000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        nom: "Bureaux",
        Id_categories: "50000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        nom: "Téléphones",
        Id_categories: "50000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_subCategories: "60000000-0000-4000-8000-000000000005",
        nom: "Ordinateurs",
        Id_categories: "50000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        nom: "Vestes",
        Id_categories: "50000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_subCategories: "60000000-0000-4000-8000-000000000007",
        nom: "Romans",
        Id_categories: "50000000-0000-4000-8000-000000000004",
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.bulkInsert("etatArticle", [
      {
        Id_etatArticle: "70000000-0000-4000-8000-000000000001",
        nom: "Neuf",
        created_at: now,
        updated_at: now,
      },
      {
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        nom: "Très bon état",
        created_at: now,
        updated_at: now,
      },
      {
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        nom: "Bon état",
        created_at: now,
        updated_at: now,
      },
      {
        Id_etatArticle: "70000000-0000-4000-8000-000000000004",
        nom: "État correct",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("subCategories", null, {});
    await queryInterface.bulkDelete("etatArticle", null, {});
    await queryInterface.bulkDelete("categories", null, {});
  },
};