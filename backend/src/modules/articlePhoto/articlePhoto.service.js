import ArticlePhoto from "../../models/ArticlePhoto.js";
import Article from "../../models/Article.js";
import fs from "fs/promises";
import path from "path";

// Récupérer toutes les photos d'un article
export const getArticlePhotosService = async (
  articleId,
) => {
  try {
    const article = await Article.findByPk(articleId);

    if (!article) {
      const error = new Error(
        "Article introuvable",
      );

      error.statusCode = 404;

      throw error;
    }

    return await ArticlePhoto.findAll({
      where: {
        Id_articles: articleId,
      },

      order: [["ordre", "ASC"]],
    });
  } catch (error) {
    console.error(
      "Erreur récupération photos de l'article :",
      error,
    );

    throw error;
  }
};

// Récupérer une photo
export const getArticlePhotoByIdService = async (
  id,
) => {
  try {
    const photo = await ArticlePhoto.findByPk(id);

    if (!photo) {
      const error = new Error(
        "Photo introuvable",
      );

      error.statusCode = 404;

      throw error;
    }

    return photo;
  } catch (error) {
    console.error(
      "Erreur récupération photo :",
      error,
    );

    throw error;
  }
};

// Ajouter une ou plusieurs photos à un article
export const createArticlePhotoService = async (
  articleId,
  userId,
  files,
  req,
) => {
  try {
    const article = await Article.findByPk(articleId);

    if (!article) {
      const error = new Error(
        "Article introuvable",
      );

      error.statusCode = 404;

      throw error;
    }

    // Vérifier que l'utilisateur possède bien l'article
    if (String(article.Id_users) !== String(userId)) {
      const error = new Error(
        "Vous n'êtes pas propriétaire de cet article",
      );

      error.statusCode = 403;

      throw error;
    }

    if (!files || files.length === 0) {
      const error = new Error(
        "Aucune image reçue.",
      );

      error.statusCode = 400;

      throw error;
    }

    // Vérifier le nombre total de photos
    const existingPhotos =
      await ArticlePhoto.count({
        where: {
          Id_articles: articleId,
        },
      });

    if (
      existingPhotos + files.length >
      5
    ) {
      const error = new Error(
        "Un article ne peut pas avoir plus de 5 photos.",
      );

      error.statusCode = 400;

      // Supprimer les fichiers qui viennent d'être uploadés
      await deleteUploadedFiles(files);

      throw error;
    }

    const protocol =
      req.headers["x-forwarded-proto"] ||
      req.protocol;

    const host =
      req.get("host");

    const createdPhotos = [];

    for (
      let index = 0;
      index < files.length;
      index += 1
    ) {
      const file = files[index];

      const url =
        `${protocol}://${host}/uploads/articles/${file.filename}`;

      const photo =
        await ArticlePhoto.create({
          Id_articles: articleId,
          url,
          ordre: existingPhotos + index,
        });

      createdPhotos.push(photo);
    }

    return createdPhotos;
  } catch (error) {
    console.error(
      "Erreur création photos :",
      error,
    );

    throw error;
  }
};

// Supprimer une photo
export const deleteArticlePhotoService = async (
  id,
  userId,
) => {
  try {
    const photo = await ArticlePhoto.findByPk(id);

    if (!photo) {
      const error = new Error(
        "Photo introuvable",
      );

      error.statusCode = 404;

      throw error;
    }

    const article = await Article.findByPk(
      photo.Id_articles,
    );

    if (!article) {
      const error = new Error(
        "Article introuvable",
      );

      error.statusCode = 404;

      throw error;
    }

    // Vérifier que l'utilisateur possède bien l'article
    if (
      String(article.Id_users) !==
      String(userId)
    ) {
      const error = new Error(
        "Vous n'êtes pas propriétaire de cet article",
      );

      error.statusCode = 403;

      throw error;
    }

    // Supprimer le fichier physique
    await deleteFileFromUrl(photo.url);

    await photo.destroy();

    return true;
  } catch (error) {
    console.error(
      "Erreur suppression photo :",
      error,
    );

    throw error;
  }
};

// Supprimer les fichiers physiques uploadés
async function deleteUploadedFiles(files) {
  for (const file of files || []) {
    try {
      await fs.unlink(file.path);
    } catch (error) {
      console.error(
        "Erreur suppression fichier uploadé :",
        error,
      );
    }
  }
}

// Supprimer un fichier à partir de son URL
async function deleteFileFromUrl(url) {
  try {
    if (!url) {
      return;
    }

    const pathname = new URL(url).pathname;

    const uploadsPrefix =
      "/uploads/articles/";

    if (!pathname.startsWith(uploadsPrefix)) {
      return;
    }

    const filename = path.basename(pathname);

    const filePath = path.resolve(
      process.cwd(),
      "uploads",
      "articles",
      filename,
    );

    const uploadDirectory = path.resolve(
      process.cwd(),
      "uploads",
      "articles",
    );

    if (
      !filePath.startsWith(
        `${uploadDirectory}${path.sep}`,
      )
    ) {
      return;
    }

    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(
        "Erreur suppression fichier image :",
        error,
      );
    }
  }
}