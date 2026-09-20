import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middlewares.js";

import {
  allNotations,
  notation,
  createNewNotation,
  removeNotation,
} from "./notations.controller.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  allNotations
);

router.post(
  "/",
  authMiddleware,
  createNewNotation
);

router.get(
  "/:id",
  authMiddleware,
  notation
);

router.delete(
  "/:id",
  authMiddleware,
  removeNotation
);

export default router;