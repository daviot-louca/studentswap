"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("region", [
      {
        Id_regions: "10000000-0000-4000-8000-000000000001",
        nom: "Grand Est",
        created_at: now,
        updated_at: now,
      },
      {
        Id_regions: "10000000-0000-4000-8000-000000000002",
        nom: "Île-de-France",
        created_at: now,
        updated_at: now,
      },
      {
        Id_regions: "10000000-0000-4000-8000-000000000003",
        nom: "Hauts-de-France",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("region", null, {});
  },
};