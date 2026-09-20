import { Router } from "express";

import {
  getUserByIdController,
  modifierProfilController,
  supprimerCompteController,
  getUsersController,
} from "./user.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import adminMiddleware from "../../middlewares/admin.middlewares.js";
import { validate } from "../../middlewares/validation.middlewares.js";
import { modifierProfilSchema } from "./user.schema.js";
const router = Router();

// Modifier son propre profil
router.patch("/me", authMiddleware,validate(modifierProfilSchema), modifierProfilController);

// Supprimer son propre compte
router.delete("/me", authMiddleware, supprimerCompteController);

// Récupérer un utilisateur par son ID
router.get("/:id", authMiddleware, getUserByIdController);

// Récupérer tous les utilisateurs - administrateur uniquement
router.get("/", authMiddleware, adminMiddleware, getUsersController);

export default router;
