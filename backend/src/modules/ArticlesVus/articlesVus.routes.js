import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import { validate } from "../../middlewares/validation.middlewares.js";

import {
  allArticlesVus,
  articleVu,
  addArticleVu,
  removeArticleVu,
} from "./articlesVus.controller.js";

import { articleVuSchema } from "./articlesVus.schema.js";

const router = Router();

router.use(authMiddleware);

router.get("/", allArticlesVus);

router.get(
  "/:articleId",
  validate(articleVuSchema),
  articleVu,
);

router.post(
  "/:articleId",
  validate(articleVuSchema),
  addArticleVu,
);

router.delete(
  "/:articleId",
  validate(articleVuSchema),
  removeArticleVu,
);



export default router;