"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("villes", [
      {
        Id_villes: "11111111-1111-4111-8111-111111111111",
        nom: "Strasbourg",
        Id_regions: "10000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_villes: "22222222-2222-4222-8222-222222222222",
        nom: "Metz",
        Id_regions: "10000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_villes: "33333333-3333-4333-8333-333333333333",
        nom: "Paris",
        Id_regions: "10000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_villes: "44444444-4444-4444-8444-444444444444",
        nom: "Lille",
        Id_regions: "10000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("villes", null, {});
  },
};