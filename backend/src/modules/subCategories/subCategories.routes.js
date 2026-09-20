import { Router } from "express";

import {
  allsubCategories,
  ajoutsubCategories,
  addonesubCategories,
  updatesubCategories,
  deletesubCategories,
} from "./subCategories.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import adminMiddleware from "../../middlewares/admin.middlewares.js";
import { validate } from "../../middlewares/validation.middlewares.js";
import { updateSubCategorieSchema,createSubCategorieSchema} from "./subCategories.schema.js";
const router = Router();

// Récupérer toutes les sous-catégories
router.get("/", authMiddleware, allsubCategories);

// Ajouter une sous-catégorie - admin uniquement
router.post("/", authMiddleware,adminMiddleware, validate(createSubCategorieSchema), ajoutsubCategories);

// Récupérer une sous-catégorie
router.get("/:id", authMiddleware, addonesubCategories);

// Modifier une sous-catégorie - admin uniquement
router.patch("/:id", authMiddleware, adminMiddleware,validate(updateSubCategorieSchema), updatesubCategories);

// Supprimer une sous-catégorie - admin uniquement
router.delete("/:id", authMiddleware, adminMiddleware, deletesubCategories);

export default router;
