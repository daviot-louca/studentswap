import { Router } from "express";

import {
  allTags,
  tag,
  tagsBySubCategory,
  createTag,
  updateTag,
  deleteTag,
} from "./tags.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import adminMiddleware from "../../middlewares/admin.middlewares.js";
import { validate } from "../../middlewares/validation.middlewares.js";

import {
  createTagSchema,
  updateTagSchema,
} from "./tags.schema.js";

const router = Router();

// Récupérer tous les tags
router.get("/", authMiddleware, allTags);

// Récupérer les tags d'une sous-catégorie
router.get(
  "/subcategory/:subCategoryId",
  authMiddleware,
  adminMiddleware,
  tagsBySubCategory,
);

// Récupérer un tag
router.get("/:id", authMiddleware, tag);

// Créer un tag
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createTagSchema),
  createTag,
);

// Modifier un tag
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateTagSchema),
  updateTag,
);

// Supprimer un tag
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteTag,
);

export default router;