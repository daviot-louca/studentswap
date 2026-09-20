import { Router } from "express";

import {
  allRoles,
  role,
  createRole,
  updateRole,
  deleteRole,
} from "./roles.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import adminMiddleware from "../../middlewares/admin.middlewares.js";

import {
  createRoleSchema,
  updateRoleSchema,
} from "./roles.schema.js";

import { validate } from "../../middlewares/validation.middlewares.js";

const router = Router();

// Récupérer tous les rôles
router.get(
  "/",
  authMiddleware,
  allRoles,
);

// Récupérer un rôle
router.get(
  "/:id",
  authMiddleware,
  role,
);

// Créer un rôle
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createRoleSchema),
  createRole,
);

// Modifier un rôle
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateRoleSchema),
  updateRole,
);

// Supprimer un rôle
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteRole,
);

export default router;