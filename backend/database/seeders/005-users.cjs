"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const password = await bcrypt.hash("StudentSwap123!", 12);

    await queryInterface.bulkInsert("users", [
      {
        Id_users: "20000000-0000-4000-8000-000000000002",
        pseudo: "testeur",
        prenom: "Louca",
        nom: "DUPONT",
        email: "louca@studentswap.test",
        motsDePasse: password,
        Id_villes: "11111111-1111-4111-8111-111111111111",
        Id_roles: "20000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_users: "80000000-0000-4000-8000-000000000002",
        pseudo: "nancomcy",
        prenom: "Typhanie",
        nom: "MARTIN",
        email: "typhanie@studentswap.test",
        motsDePasse: password,
        Id_villes: "22222222-2222-4222-8222-222222222222",
        Id_roles: "20000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_users: "80000000-0000-4000-8000-000000000003",
        pseudo: "zarbi",
        prenom: "Julien",
        nom: "BERNARD",
        email: "julien@studentswap.test",
        motsDePasse: password,
        Id_villes: "33333333-3333-4333-8333-333333333333",
        Id_roles: "20000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};