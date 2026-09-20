import { Router } from "express";
const router = Router();
import {
  allEtat,
  createEtat,
  etat,
  updateEtat,
  deleteEtat,
} from "./etatArticle.controller.js";
import authMiddleware from "../../middlewares/auth.middlewares.js";
import adminMiddleware from "../../middlewares/admin.middlewares.js";
import { validate } from "../../middlewares/validation.middlewares.js";
import {
  createEtatArticleSchema,
  updateEtatArticleSchema,
} from "./etatArticle.schema.js";
router.get("/", authMiddleware, allEtat);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createEtatArticleSchema),
  createEtat,
);
router.get("/:id", authMiddleware, etat);
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateEtatArticleSchema),
  updateEtat,
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteEtat);

export default router;
