import { Router } from "express";

import {
  allPropositionsTroc,
  propositionTroc,
  createPropositionTroc,
  updatePropositionTroc,
  deletePropositionTroc,
} from "./propositionTroc.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import {
  createPropositionTrocSchema,
  updatePropositionTrocSchema,
} from "./propositionTroc.schema.js";

import { validate } from "../../middlewares/validation.middlewares.js";
const router = Router();

// Récupérer toutes les propositions de l'utilisateur connecté
router.get("/", authMiddleware, allPropositionsTroc);

// Récupérer une proposition
router.get("/:id", authMiddleware, propositionTroc);

// Créer une proposition de troc
router.post(
  "/",
  authMiddleware,
  validate(createPropositionTrocSchema),
  createPropositionTroc,
);

// Modifier le statut d'une proposition
router.patch(
  "/:id",
  authMiddleware,
  validate(updatePropositionTrocSchema),
  updatePropositionTroc,
);

// Supprimer / annuler une proposition
router.delete("/:id", authMiddleware, deletePropositionTroc);

export default router;
