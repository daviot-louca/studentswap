import { Report, User, Article } from "../../models/index.js";

export const getAllReports = async () => {
  return await Report.findAll({
    include: [
      {
        association: "user",
        attributes: [
          "Id_users",
          "pseudo",
          "prenom",
          "nom",
        ],
      },
      {
        association: "article",
        attributes: [
          "Id_articles",
          "titre",
        ],
      },
    ],
    order: [["created_at", "DESC"]],
  });
};

export const getReportById = async (reportId) => {
  const report = await Report.findByPk(reportId, {
    include: [
      {
        association: "user",
        attributes: [
          "Id_users",
          "pseudo",
          "prenom",
          "nom",
        ],
      },
      {
        association: "article",
        attributes: [
          "Id_articles",
          "titre",
        ],
      },
    ],
  });

  if (!report) {
    const error = new Error("Signalement introuvable.");
    error.statusCode = 404;
    throw error;
  }

  return report;
};

export const createReport = async (
  userId,
  articleId,
  motif,
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    const error = new Error("Utilisateur introuvable.");
    error.statusCode = 404;
    throw error;
  }

  const article = await Article.findByPk(articleId);

  if (!article) {
    const error = new Error("Article introuvable.");
    error.statusCode = 404;
    throw error;
  }

  const existingReport = await Report.findOne({
    where: {
      Id_users: userId,
      Id_articles: articleId,
    },
  });

  if (existingReport) {
    const error = new Error(
      "Vous avez déjà signalé cet article.",
    );

    error.statusCode = 409;
    throw error;
  }

  return await Report.create({
    Id_users: userId,
    Id_articles: articleId,
    motif,
    created_at: new Date(),
    updated_at: new Date(),
  });
};

export const deleteReport = async (reportId) => {
  const report = await Report.findByPk(reportId);

  if (!report) {
    const error = new Error("Signalement introuvable.");
    error.statusCode = 404;
    throw error;
  }

  await report.destroy();

  return report;
};