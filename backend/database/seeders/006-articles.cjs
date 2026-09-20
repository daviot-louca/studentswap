"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("articles", [
      {
        Id_articles: "90000000-0000-4000-8000-000000000001",
        titre: "Chaise de bureau",
        description: "Chaise de bureau confortable en très bon état.",
        Id_users: "80000000-0000-4000-8000-000000000001",
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000002",
        titre: "Micro-ondes",
        description: "Micro-ondes fonctionnel, idéal pour un appartement étudiant.",
        Id_users: "80000000-0000-4000-8000-000000000002",
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000003",
        titre: "Bureau étudiant",
        description: "Bureau compact adapté à une petite chambre.",
        Id_users: "80000000-0000-4000-8000-000000000003",
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000004",
        titre: "Veste noire",
        description: "Veste noire en bon état.",
        Id_users: "80000000-0000-4000-8000-000000000002",
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.bulkInsert("photosArticle", [
      {
        Id_photosArticle: "91000000-0000-4000-8000-000000000001",
        url: "https://placehold.co/800x600?text=Chaise",
        ordre: 1,
        Id_articles: "90000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_photosArticle: "91000000-0000-4000-8000-000000000002",
        url: "https://placehold.co/800x600?text=Micro-ondes",
        ordre: 1,
        Id_articles: "90000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_photosArticle: "91000000-0000-4000-8000-000000000003",
        url: "https://placehold.co/800x600?text=Bureau",
        ordre: 1,
        Id_articles: "90000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_photosArticle: "91000000-0000-4000-8000-000000000004",
        url: "https://placehold.co/800x600?text=Veste",
        ordre: 1,
        Id_articles: "90000000-0000-4000-8000-000000000004",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("photosArticle", null, {});
    await queryInterface.bulkDelete("articles", null, {});
  },
};