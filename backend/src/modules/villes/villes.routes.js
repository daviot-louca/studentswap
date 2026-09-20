import { Router } from "express";

import {
  allVilles,
  ville,
  villesByRegion,
  createVille,
  updateVille,
  deleteVille,
} from "./villes.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import adminMiddleware from "../../middlewares/admin.middlewares.js";

import {
  createVilleSchema,
  updateVilleSchema,
} from "./villes.schema.js";

import { validate } from "../../middlewares/validation.middlewares.js";

const router = Router();

// Récupérer toutes les villes
router.get(
  "/",
  allVilles,
);

// Récupérer les villes d'une région
router.get(
  "/region/:regionId",
  authMiddleware,
  villesByRegion,
);

// Récupérer une ville
router.get(
  "/:id",
  authMiddleware,
  ville,
);

// Créer une ville
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createVilleSchema),
  createVille,
);

// Modifier une ville
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateVilleSchema),
  updateVille,
);

// Supprimer une ville
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteVille,
);

export default router;