"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("roles", [
      {
        Id_roles: "20000000-0000-4000-8000-000000000001",
        nom: "user",
        created_at: now,
        updated_at: now,
      },
      {
        Id_roles: "20000000-0000-4000-8000-000000000002",
        nom: "admin",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};