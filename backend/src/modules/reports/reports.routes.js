import { Router } from "express";

import {
  allReports,
  report,
  createNewReport,
  removeReport,
} from "./reports.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import adminMiddleware from "../../middlewares/admin.middlewares.js";
import { validate } from "../../middlewares/validation.middlewares.js";

import {
  createReportSchema,
  reportIdSchema,
} from "./reports.schema.js";

const router = Router();

/*
 * Créer un signalement
 * Accessible aux utilisateurs connectés
 */
router.post(
  "/",
  authMiddleware,
  validate(createReportSchema),
  createNewReport,
);

/*
 * Récupérer tous les signalements
 * Réservé aux administrateurs
 */
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  allReports,
);

/*
 * Récupérer un signalement
 * Réservé aux administrateurs
 */
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(reportIdSchema, "params"),
  report,
);

/*
 * Supprimer un signalement
 * Réservé aux administrateurs
 */
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(reportIdSchema, "params"),
  removeReport,
);

export default router;