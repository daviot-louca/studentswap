"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const [users] = await queryInterface.sequelize.query(`
      SELECT "Id_users"
      FROM "users"
      ORDER BY "created_at" ASC
      LIMIT 3
    `);

    if (users.length === 0) {
      throw new Error(
        "Aucun utilisateur trouvé. Lance d'abord le seeder des utilisateurs.",
      );
    }

    const userIds = users.map((user) => user.Id_users);

    await queryInterface.bulkInsert("articles", [
      {
        Id_articles: "90000000-0000-4000-8000-000000000001",
        titre: "Chaise de bureau ergonomique",
        description:
          "Chaise confortable avec dossier ergonomique, idéale pour travailler plusieurs heures.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000002",
        titre: "Micro-ondes compact",
        description:
          "Micro-ondes fonctionnel et compact, parfait pour une cuisine étudiante.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000003",
        titre: "Bureau étudiant blanc",
        description:
          "Bureau compact avec espace de rangement, adapté à une petite chambre.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000004",
        titre: "Veste noire classique",
        description:
          "Veste noire polyvalente, portée quelques fois et conservée avec soin.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000005",
        titre: "Chaise de bureau noire",
        description:
          "Chaise de bureau noire avec assise confortable pour les études.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        Id_etatArticle: "70000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000006",
        titre: "Micro-ondes blanc",
        description:
          "Petit micro-ondes blanc, simple à utiliser et en bon état.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000007",
        titre: "Bureau en bois",
        description:
          "Bureau en bois clair avec une surface agréable pour travailler.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000008",
        titre: "Veste en jean",
        description: "Veste en jean facile à porter au quotidien, en bon état.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000009",
        titre: "Chaise de bureau grise",
        description:
          "Chaise grise avec accoudoirs, pratique pour un espace de travail étudiant.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000010",
        titre: "Micro-ondes avec plateau",
        description:
          "Micro-ondes fonctionnel avec plateau tournant, idéal pour un studio.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        Id_etatArticle: "70000000-0000-4000-8000-000000000004",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000011",
        titre: "Bureau avec tiroir",
        description:
          "Bureau étudiant avec tiroir de rangement, pratique et peu encombrant.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000012",
        titre: "Veste beige légère",
        description: "Veste légère beige adaptée au printemps et à l'automne.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000013",
        titre: "Chaise de bureau avec accoudoirs",
        description:
          "Chaise avec accoudoirs réglables, adaptée aux longues sessions de travail.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000014",
        titre: "Micro-ondes noir",
        description:
          "Micro-ondes noir en très bon état, parfait pour un logement étudiant.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000015",
        titre: "Petit bureau étudiant",
        description:
          "Petit bureau facile à installer dans une chambre étudiante.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        Id_etatArticle: "70000000-0000-4000-8000-000000000004",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000016",
        titre: "Veste noire légère",
        description: "Veste noire légère, idéale pour les trajets quotidiens.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        Id_etatArticle: "70000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000017",
        titre: "Chaise confortable de travail",
        description:
          "Chaise confortable pour bureau, adaptée aux études et au télétravail.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000018",
        titre: "Micro-ondes familial",
        description:
          "Micro-ondes avec grande capacité, encore parfaitement fonctionnel.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000019",
        titre: "Bureau moderne",
        description:
          "Bureau moderne avec plateau spacieux pour ordinateur et cahiers.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        Id_etatArticle: "70000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000020",
        titre: "Veste kaki",
        description:
          "Veste kaki en bon état, pratique pour les sorties quotidiennes.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000021",
        titre: "Chaise noire minimaliste",
        description: "Chaise de bureau noire au design simple et moderne.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000022",
        titre: "Micro-ondes étudiant",
        description:
          "Micro-ondes simple et fiable, idéal pour un premier appartement.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000023",
        titre: "Bureau noir compact",
        description:
          "Bureau noir compact avec suffisamment de place pour un ordinateur portable.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000024",
        titre: "Veste grise",
        description: "Veste grise en très bon état, coupe classique.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000025",
        titre: "Chaise de bureau tissu",
        description:
          "Chaise en tissu avec dossier confortable pour travailler à la maison.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000026",
        titre: "Micro-ondes gris",
        description:
          "Micro-ondes gris fonctionnel, avec quelques traces d'utilisation.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        Id_etatArticle: "70000000-0000-4000-8000-000000000004",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000027",
        titre: "Bureau en bois clair",
        description:
          "Bureau en bois clair, parfait pour aménager un coin étudiant.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000028",
        titre: "Veste marron",
        description: "Veste marron chaude, adaptée à la saison froide.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000029",
        titre: "Chaise de bureau bleue",
        description:
          "Chaise bleue confortable, idéale pour un bureau étudiant.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        Id_etatArticle: "70000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000030",
        titre: "Micro-ondes digital",
        description:
          "Micro-ondes avec affichage digital, propre et fonctionnel.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        Id_etatArticle: "70000000-0000-4000-8000-000000000001",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000031",
        titre: "Bureau blanc étudiant",
        description:
          "Bureau blanc simple et fonctionnel pour une chambre étudiante.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000032",
        titre: "Veste bleu marine",
        description: "Veste bleu marine polyvalente et facile à associer.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000033",
        titre: "Chaise ergonomique avec roulettes",
        description:
          "Chaise ergonomique avec roulettes, confortable pour les longues sessions d'étude.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000034",
        titre: "Micro-ondes simple",
        description:
          "Petit micro-ondes facile à utiliser, parfait pour une kitchenette.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000035",
        titre: "Bureau avec étagère",
        description:
          "Bureau avec étagère intégrée, pratique pour ranger les cours.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000036",
        titre: "Veste noire imperméable",
        description:
          "Veste noire imperméable, pratique pour les déplacements quotidiens.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000037",
        titre: "Chaise de bureau rouge",
        description:
          "Chaise rouge avec assise confortable, idéale pour un espace de travail.",
        Id_users: userIds[1 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000001",
        Id_etatArticle: "70000000-0000-4000-8000-000000000004",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000038",
        titre: "Micro-ondes avec grill",
        description:
          "Micro-ondes avec fonction grill, fonctionnel et pratique au quotidien.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000004",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000039",
        titre: "Bureau étudiant pliable",
        description:
          "Bureau pliable facile à ranger, idéal pour les petits logements.",
        Id_users: userIds[2 % userIds.length],
        Id_subCategories: "60000000-0000-4000-8000-000000000003",
        Id_etatArticle: "70000000-0000-4000-8000-000000000003",
        created_at: now,
        updated_at: now,
      },
      {
        Id_articles: "90000000-0000-4000-8000-000000000040",
        titre: "Veste chaude d'hiver",
        description:
          "Veste chaude en bon état, parfaite pour les journées froides.",
        Id_users: userIds[0],
        Id_subCategories: "60000000-0000-4000-8000-000000000006",
        Id_etatArticle: "70000000-0000-4000-8000-000000000002",
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.bulkInsert("photosArticle", [
      ...Array.from({ length: 40 }, (_, index) => {
        const number = String(index + 1).padStart(12, "0");

        return {
          Id_photosArticle: `91000000-0000-4000-8000-${number}`,
          url: `https://placehold.co/800x600?text=Article-${index + 1}`,
          ordre: 1,
          Id_articles: `90000000-0000-4000-8000-${number}`,
          created_at: now,
          updated_at: now,
        };
      }),
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("photosArticle", null, {});

    await queryInterface.bulkDelete("articles", null, {});
  },
};
