import { Router } from "express";

import {
  allConversations,
  conversation,
  conversationMessages,
  createNewConversation,
} from "./conversations.controller.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import { validate } from "../../middlewares/validation.middlewares.js";

import {
  createConversationSchema,
  conversationMessagesSchema,
} from "./conversations.schema.js";

const router = Router();

/*
 * Récupérer toutes les conversations de l'utilisateur connecté
 */
router.get(
  "/",
  authMiddleware,
  allConversations,
);

/*
 * Créer une nouvelle conversation
 */
router.post(
  "/",
  authMiddleware,
  validate(createConversationSchema),
  createNewConversation,
);

/*
 * Récupérer les messages d'une conversation
 */
router.get(
  "/:id/messages",
  authMiddleware,
  validate(conversationMessagesSchema, "query"),
  conversationMessages,
);

/*
 * Récupérer une conversation
 */
router.get(
  "/:id",
  authMiddleware,
  conversation,
);

export default router;