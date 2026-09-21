import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";

export function authRoutes(authController: AuthController): Router {
  const router = Router();

  router.post("/signup", asyncHandler(authController.signup.bind(authController)));
  router.post("/login", asyncHandler(authController.login.bind(authController)));
  router.post("/logout", asyncHandler(authController.logout.bind(authController)));

  return router;
}