import { Router } from "express";

import {
  registerController,
  loginController,
  getMeController,
  modifierMotDePasseController,
} from "./auth.controller.js";

import {
  registerSchema,
  loginSchema,
  modifierMotDePasseSchema,
} from "./auth.schemas.js";

import authMiddleware from "../../middlewares/auth.middlewares.js";
import { validate } from "../../middlewares/validation.middlewares.js";

const router = Router();

router.post("/register", validate(registerSchema), registerController);

router.post("/login", validate(loginSchema), loginController);

router.patch(
  "/password",
  authMiddleware,
  validate(modifierMotDePasseSchema),
  modifierMotDePasseController,
);

router.get("/me", authMiddleware, getMeController);

export default router;
