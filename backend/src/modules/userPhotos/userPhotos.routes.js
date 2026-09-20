import { Router } from "express";

import {
  allUserPhotos,
  userPhoto,
  createUserPhoto,
  deleteUserPhoto,
} from "./userPhotos.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import { createUserPhotoSchema } from "./userPhotos.schema.js";
import { validate } from "../../middlewares/validation.middlewares.js";
const router = Router();

// Récupérer toutes les photos de l'utilisateur connecté
router.get(
  "/",
  authMiddleware,
  allUserPhotos,
);

// Récupérer une photo
router.get(
  "/:id",
  authMiddleware,
  userPhoto,
);

// Ajouter une photo de profil
router.post(
  "/",
  authMiddleware,
  validate(createUserPhotoSchema),
  createUserPhoto,
);

// Supprimer une photo de profil
router.delete(
  "/:id",
  authMiddleware,
  deleteUserPhoto,
);

export default router;