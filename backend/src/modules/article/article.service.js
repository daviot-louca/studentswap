import { Op } from "sequelize";

import Article from "../../models/Article.js";
import ArticlePhoto from "../../models/ArticlePhoto.js";
import User from "../../models/User.js";
import Ville from "../../models/Ville.js";
import Region from "../../models/Region.js";
import SubCategory from "../../models/SubCategory.js";
import Category from "../../models/Category.js";
import EtatArticle from "../../models/EtatArticle.js";
import Tag from "../../models/Tag.js";
import ArticlesVus from "../../models/ArticlesVus.js";

import {
  getPagination,
  getPaginationResult,
} from "../../utils/pagination.utils.js";

/*
 * Include commun pour récupérer les photos d'un article.
 */
const articlePhotosInclude = {
  model: ArticlePhoto,
  as: "photos",
  required: false,
  attributes: ["Id_photosArticle", "url", "ordre"],
};

/*
 * Déterminer automatiquement la sous-catégorie
 * grâce aux tags présents dans le titre et la description.
 */
const detectSubCategoryByTags = async (titre = "", description = "") => {
  const tags = await Tag.findAll({
    attributes: ["Id_tags", "nom", "Id_subCategories"],
  });

  if (!tags.length) {
    return null;
  }

  const titreLower = titre.toLowerCase();
  const descriptionLower = description.toLowerCase();

  const scores = {};

  for (const tag of tags) {
    const tagName = tag.nom.toLowerCase().trim();

    if (!tagName || !tag.Id_subCategories) {
      continue;
    }

    let score = 0;

    if (titreLower.includes(tagName)) {
      score += 5;
    }

    if (descriptionLower.includes(tagName)) {
      score += 2;
    }

    if (score === 0) {
      continue;
    }

    const subCategoryId = tag.Id_subCategories;

    if (!scores[subCategoryId]) {
      scores[subCategoryId] = 0;
    }

    scores[subCategoryId] += score;
  }

  const rankedSubCategories = Object.entries(scores).sort(
    ([, scoreA], [, scoreB]) => scoreB - scoreA,
  );

  if (!rankedSubCategories.length) {
    return null;
  }

  const [bestSubCategoryId, bestScore] = rankedSubCategories[0];

  if (bestScore <= 0) {
    return null;
  }

  return bestSubCategoryId;
};

/*
 * Récupérer les articles publics.
 */
export const getArticlesService = async (query = {}, userId = null) => {
  try {
    const {
      search,
      Id_subCategories,
      Id_etatArticle,
      Id_villes,
      region,
      page,
      limit,
    } = query;

    const where = {};

    if (userId) {
      where.Id_users = {
        [Op.ne]: userId,
      };
    }

    if (search) {
      where[Op.or] = [
        {
          titre: {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          description: {
            [Op.iLike]: `%${search}%`,
          },
        },
      ];
    }

    if (Id_subCategories) {
      where.Id_subCategories = Id_subCategories;
    }

    if (Id_etatArticle) {
      where.Id_etatArticle = Id_etatArticle;
    }

    const {
      page: pageNumber,
      limit: limitNumber,
      offset,
    } = getPagination(page, limit);

    const userWhere = {};

    if (Id_villes) {
      userWhere.Id_villes = Id_villes;
    }

    const regionInclude = {
      model: Region,
      as: "region",
      attributes: ["Id_regions", "nom"],
      required: Boolean(region),
    };

    if (region) {
      regionInclude.where = {
        nom: {
          [Op.iLike]: `%${region}%`,
        },
      };
    }

    const result = await Article.findAndCountAll({
      where,
      limit: limitNumber,
      offset,
      distinct: true,
      order: [["created_at", "DESC"]],

      include: [
        {
          model: User,
          as: "user",

          attributes: ["Id_users", "pseudo", "prenom", "nom"],

          where: Object.keys(userWhere).length > 0 ? userWhere : undefined,

          include: [
            {
              model: Ville,
              as: "ville",

              attributes: ["Id_villes", "nom"],

              required: Boolean(region),

              include: [regionInclude],
            },
          ],
        },

        {
          model: SubCategory,
          as: "subCategory",

          attributes: ["Id_subCategories", "nom"],

          include: [
            {
              model: Category,
              as: "category",

              attributes: ["Id_categories", "nom"],
            },
          ],
        },

        {
          model: EtatArticle,
          as: "etat",

          attributes: ["Id_etatArticle", "nom"],
        },

        articlePhotosInclude,
      ],
    });

    return getPaginationResult({
      rows: result.rows,
      count: result.count,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    console.error("Erreur récupération articles :", error);

    throw error;
  }
};

/*
 * Récupérer un article par son ID.
 */
export const getArticleByIdService = async (id) => {
  try {
    const article = await Article.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",

          attributes: ["Id_users", "pseudo", "prenom", "nom"],

          include: [
            {
              model: Ville,
              as: "ville",

              attributes: ["Id_villes", "nom"],

              include: [
                {
                  model: Region,
                  as: "region",

                  attributes: ["Id_regions", "nom"],
                },
              ],
            },
          ],
        },

        {
          model: SubCategory,
          as: "subCategory",

          attributes: ["Id_subCategories", "nom"],

          include: [
            {
              model: Category,
              as: "category",

              attributes: ["Id_categories", "nom"],
            },
          ],
        },

        {
          model: EtatArticle,
          as: "etat",

          attributes: ["Id_etatArticle", "nom"],
        },

        articlePhotosInclude,
      ],
    });

    if (!article) {
      const error = new Error("Article introuvable");

      error.statusCode = 404;

      throw error;
    }

    return article;
  } catch (error) {
    console.error("Erreur récupération article :", error);

    throw error;
  }
};

/*
 * Récupérer les articles de l'utilisateur connecté.
 */
export const getMyArticlesService = async (id) => {
  try {
    const articles = await Article.findAll({
      where: {
        Id_users: id,
      },

      include: [
        {
          model: SubCategory,
          as: "subCategory",

          attributes: ["Id_subCategories", "nom"],

          include: [
            {
              model: Category,
              as: "category",

              attributes: ["Id_categories", "nom"],
            },
          ],
        },

        {
          model: EtatArticle,
          as: "etat",

          attributes: ["Id_etatArticle", "nom"],
        },

        articlePhotosInclude,
      ],

      order: [["created_at", "DESC"]],
    });

    return articles;
  } catch (error) {
    console.error("Erreur récupération de mes articles :", error);

    throw error;
  }
};

/*
 * Créer un article.
 */
export const createArticleService = async ({
  titre,
  description,
  prix,
  Id_subCategories,
  Id_etatArticle,
  Id_users,
}) => {
  try {
    const user = await User.findByPk(Id_users);

    if (!user) {
      const error = new Error("Utilisateur introuvable");

      error.statusCode = 404;

      throw error;
    }

    let subCategoryId = Id_subCategories;

    if (!subCategoryId) {
      subCategoryId = await detectSubCategoryByTags(titre, description);

      if (!subCategoryId) {
        const error = new Error(
          "Aucune sous-catégorie n'a pu être déterminée automatiquement. Veuillez sélectionner une sous-catégorie manuellement.",
        );

        error.statusCode = 400;

        throw error;
      }
    }

    const subCategory = await SubCategory.findByPk(subCategoryId);

    if (!subCategory) {
      const error = new Error("Sous-catégorie introuvable");

      error.statusCode = 404;

      throw error;
    }

    const etatArticle = await EtatArticle.findByPk(Id_etatArticle);

    if (!etatArticle) {
      const error = new Error("État d'article introuvable");

      error.statusCode = 404;

      throw error;
    }

    const article = await Article.create({
      titre,
      description,
      prix,
      Id_subCategories: subCategoryId,
      Id_etatArticle,
      Id_users,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return getArticleByIdService(article.Id_articles);
  } catch (error) {
    console.error("Erreur création article :", error);

    throw error;
  }
};

/*
 * Modifier un article.
 */
export const updateArticleService = async (id, userId, data) => {
  try {
    const article = await Article.findByPk(id);

    if (!article) {
      const error = new Error("Article introuvable");

      error.statusCode = 404;

      throw error;
    }

    if (article.Id_users !== userId) {
      const error = new Error("Vous n'êtes pas propriétaire de cet article");

      error.statusCode = 403;

      throw error;
    }

    let subCategoryId = data.Id_subCategories;

    if (subCategoryId !== undefined) {
      const subCategory = await SubCategory.findByPk(subCategoryId);

      if (!subCategory) {
        const error = new Error("Sous-catégorie introuvable");

        error.statusCode = 404;

        throw error;
      }

      article.Id_subCategories = subCategoryId;
    }

    if (
      (data.titre !== undefined || data.description !== undefined) &&
      subCategoryId === undefined
    ) {
      const newTitre = data.titre !== undefined ? data.titre : article.titre;

      const newDescription =
        data.description !== undefined ? data.description : article.description;

      const detectedSubCategory = await detectSubCategoryByTags(
        newTitre,
        newDescription,
      );

      if (detectedSubCategory) {
        article.Id_subCategories = detectedSubCategory;
      }
    }

    if (data.Id_etatArticle !== undefined) {
      const etatArticle = await EtatArticle.findByPk(data.Id_etatArticle);

      if (!etatArticle) {
        const error = new Error("État d'article introuvable");

        error.statusCode = 404;

        throw error;
      }

      article.Id_etatArticle = data.Id_etatArticle;
    }

    if (data.titre !== undefined) {
      article.titre = data.titre;
    }

    if (data.description !== undefined) {
      article.description = data.description;
    }

    if (data.prix !== undefined) {
      article.prix = data.prix;
    }

    await article.save();

    return getArticleByIdService(id);
  } catch (error) {
    console.error("Erreur modification article :", error);

    throw error;
  }
};

/*
 * Supprimer un article.
 */
export const deleteArticleService = async (id, userId) => {
  try {
    const article = await Article.findByPk(id);

    if (!article) {
      const error = new Error("Article introuvable");

      error.statusCode = 404;

      throw error;
    }

    if (article.Id_users !== userId) {
      const error = new Error("Vous n'êtes pas propriétaire de cet article");

      error.statusCode = 403;

      throw error;
    }

    await article.destroy();

    return {
      message: "Article supprimé avec succès.",
    };
  } catch (error) {
    console.error("Erreur suppression article :", error);

    throw error;
  }
};

/*
 * Articles du swipe.
 *
 * Les annonces de l'utilisateur
 * connecté sont exclues.
 */
export const getSwipeArticlesService = async (userId, query = {}) => {
  try {
    const articlesVus = await ArticlesVus.findAll({
      where: {
        Id_users: userId,
      },

      attributes: ["Id_articles"],
    });

    const articlesVusIds = articlesVus.map(
      (articleVu) => articleVu.Id_articles,
    );

    const {
      search,
      Id_categories,
      Id_subCategories,
      Id_etatArticle,
      Id_villes,
      region,
    } = query;

    const where = {
      Id_users: {
        [Op.ne]: userId,
      },
    };

    if (search) {
      where[Op.or] = [
        {
          titre: {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          description: {
            [Op.iLike]: `%${search}%`,
          },
        },
      ];
    }

    if (Id_subCategories) {
      where.Id_subCategories = Id_subCategories;
    }

    if (Id_etatArticle) {
      where.Id_etatArticle = Id_etatArticle;
    }

    if (articlesVusIds.length > 0) {
      where.Id_articles = {
        [Op.notIn]: articlesVusIds,
      };
    }

    const articles = await Article.findAll({
      where,

      order: [["created_at", "DESC"]],

      include: [
        {
          model: User,
          as: "user",

          attributes: ["Id_users", "pseudo", "prenom", "nom"],

          where: Id_villes
            ? {
                Id_villes,
              }
            : undefined,

          include: [
            {
              model: Ville,
              as: "ville",

              attributes: ["Id_villes", "nom"],

              include: [
                {
                  model: Region,
                  as: "region",

                  attributes: ["Id_regions", "nom"],

                  required: Boolean(region),

                  ...(region
                    ? {
                        where: {
                          nom: {
                            [Op.iLike]: `%${region}%`,
                          },
                        },
                      }
                    : {}),
                },
              ],
            },
          ],
        },

        {
          model: SubCategory,
          as: "subCategory",

          /*
           * Important :
           *
           * Si une catégorie est sélectionnée,
           * le JOIN SubCategory devient obligatoire.
           *
           * Cela garantit qu'un article dont la
           * sous-catégorie n'appartient pas à la
           * catégorie sélectionnée est exclu.
           */
          required: Boolean(Id_categories || Id_subCategories),

          attributes: ["Id_subCategories", "nom"],

          ...(Id_subCategories
            ? {
                where: {
                  Id_subCategories,
                },
              }
            : {}),

          include: [
            {
              model: Category,
              as: "category",

              /*
               * Si une catégorie est sélectionnée,
               * le JOIN Category devient obligatoire.
               */
              required: Boolean(Id_categories),

              attributes: ["Id_categories", "nom"],

              ...(Id_categories
                ? {
                    where: {
                      Id_categories,
                    },
                  }
                : {}),
            },
          ],
        },

        {
          model: EtatArticle,
          as: "etat",

          attributes: ["Id_etatArticle", "nom"],
        },

        articlePhotosInclude,
      ],
    });

    return articles;
  } catch (error) {
    console.error("Erreur récupération articles pour le swipe :", error);

    throw error;
  }
};
