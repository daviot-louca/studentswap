import { Router } from "express";

import {
  allFavorites,
  favorite,
  addFavorite,
  removeFavorite,
} from "./fav.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";

const router = Router();

// Récupérer tous les favoris de l'utilisateur connecté
router.get(
  "/",
  authMiddleware,
  allFavorites,
);

// Vérifier / récupérer un favori
router.get(
  "/:articleId",
  authMiddleware,
  favorite,
);

// Ajouter un article aux favoris
router.post(
  "/:articleId",
  authMiddleware,
  addFavorite,
);

// Retirer un article des favoris
router.delete(
  "/:articleId",
  authMiddleware,
  removeFavorite,
);

export default router;