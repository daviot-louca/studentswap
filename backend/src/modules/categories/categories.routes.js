import { Router } from "express";

import {
  categoriesController,
  ajoutcategoriesController,
  OnecategoriesController,
  modifierUneCategorie,
  supprimerCategorie,
} from "./categories.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import adminMiddleware from "../../middlewares/admin.middlewares.js";
import {
    createCategorieSchema,
    updateCategorieSchema,
  } from "./categories.schema.js";
  
  import { validate } from "../../middlewares/validation.middlewares.js";
const router = Router();

// Récupérer toutes les catégories
router.get("/", authMiddleware, categoriesController);

// Ajouter une catégorie - admin uniquement
router.post("/", authMiddleware, adminMiddleware,validate(createCategorieSchema), ajoutcategoriesController);

// Récupérer une catégorie
router.get("/:id", authMiddleware, OnecategoriesController);

// Modifier une catégorie - admin uniquement
router.patch("/:id", authMiddleware, adminMiddleware,validate(updateCategorieSchema), modifierUneCategorie);

// Supprimer une catégorie - admin uniquement
router.delete("/:id", authMiddleware, adminMiddleware, supprimerCategorie);

export default router;
