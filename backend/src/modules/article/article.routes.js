import { Router } from "express";
const router = Router();
import {
  allArticle,
  article,
  myArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "./article.controller.js";
import AuthMiddleware from "../../middlewares/auth.middlewares.js";
import { createArticleSchema, updateArticleSchema } from "./article.schema.js";

import { validate } from "../../middlewares/validation.middlewares.js";
router.get("/", AuthMiddleware, allArticle);
router.post("/", AuthMiddleware, validate(createArticleSchema), createArticle);
router.get("/mine", AuthMiddleware, myArticles);
router.get("/:id", AuthMiddleware, article);
router.patch(
  "/:id",
  AuthMiddleware,
  validate(updateArticleSchema),
  updateArticle,
);
router.delete("/:id", AuthMiddleware, deleteArticle);

export default router;
