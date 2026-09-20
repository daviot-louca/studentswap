import { Router } from "express";

import {
  allNotifications,
  notification,
  readNotification,
  readAllNotifications,
  removeNotification,
} from "./notifications.controller.js";
import { notificationIdSchema } from "./notifications.schema.js";
import authMiddleware from "../../middlewares/auth.middlewares.js";
import { validate } from "../../middlewares/validation.middlewares.js";

const router = Router();

/*
 * Récupérer toutes les notifications
 */
router.get(
  "/",
  authMiddleware,
  allNotifications,
);

/*
 * Marquer toutes les notifications comme lues
 */
router.patch(
  "/read-all",
  authMiddleware,
  readAllNotifications,
);

/*
 * Récupérer une notification
 */
router.get(
  "/:id",
  authMiddleware,
  validate(notificationIdSchema, "params"),
  notification,
);

/*
 * Marquer une notification comme lue
 */
router.patch(
  "/:id/read",
  authMiddleware,
  validate(notificationIdSchema, "params"),
  readNotification,
);

/*
 * Supprimer une notification
 */
router.delete(
  "/:id",
  authMiddleware,
  validate(notificationIdSchema, "params"),
  removeNotification,
);

export default router;