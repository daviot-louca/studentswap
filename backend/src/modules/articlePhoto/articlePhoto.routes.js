import { Router } from "express";

import {
  allArticlePhotos,
  articlePhoto,
  createArticlePhoto,
  deleteArticlePhoto,
} from "./articlePhoto.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import { uploadArticlePhotos } from "../../middlewares/upload.middleware.js";

const router = Router();

// Récupérer toutes les photos d'un article
router.get(
  "/article/:articleId",
  authMiddleware,
  allArticlePhotos,
);

// Récupérer une photo
router.get(
  "/:id",
  authMiddleware,
  articlePhoto,
);

// Ajouter une ou plusieurs photos à un article
router.post(
  "/article/:articleId",
  authMiddleware,
  uploadArticlePhotos,
  createArticlePhoto,
);

// Supprimer une photo
router.delete(
  "/:id",
  authMiddleware,
  deleteArticlePhoto,
);

export default router;