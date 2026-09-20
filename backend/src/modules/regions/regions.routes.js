import { Router } from "express";

import {
  allRegions,
  region,
  createRegion,
  updateRegion,
  deleteRegion,
} from "./regions.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import adminMiddleware from "../../middlewares/admin.middlewares.js";
import {
    createRegionSchema,
    updateRegionSchema,
  } from "./regions.schema.js";
  
  import { validate } from "../../middlewares/validation.middlewares.js";
const router = Router();

// Récupérer toutes les régions
router.get(
  "/",
  authMiddleware,
  allRegions,
);

// Récupérer une région
router.get(
  "/:id",
  authMiddleware,
  region,
);

// Créer une région
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createRegionSchema),
  createRegion,
);

// Modifier une région
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateRegion,
);

// Supprimer une région
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateRegionSchema),
  deleteRegion,
);

export default router;