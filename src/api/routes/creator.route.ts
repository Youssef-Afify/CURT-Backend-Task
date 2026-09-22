import { Router } from "express";
import { CreatorController } from "../controllers/creator.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export function creatorRoutes(
    creatorController: CreatorController,
    authMiddleware: AuthMiddleware,
): Router {
    const router = Router();
    const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.get("/:id/projects", auth, asyncHandler(creatorController.getProjectsForCreator.bind(creatorController)));
    router.get("/:id/teams", auth, asyncHandler(creatorController.getTeamsForCreator.bind(creatorController)));

    return router;
}
