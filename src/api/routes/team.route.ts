import { Router } from "express";
import { TeamController } from "../controllers/team.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";

export function teamRoutes(
    teamController: TeamController,
    // authMiddleware: AuthMiddleware,
): Router {
    const router = Router();
    // const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.post("/teams", asyncHandler(teamController.create.bind(teamController)));
    router.get("/teams/:id", asyncHandler(teamController.getById.bind(teamController)));
    router.put("teams/:id", asyncHandler(teamController.update.bind(teamController)));
    router.delete("/teams/:id", asyncHandler(teamController.delete.bind(teamController)));
    router.get("/users/:user_id/teams", asyncHandler(teamController.getAllByUserId.bind(teamController)));
    router.get("/creators/:creator_id/teams", asyncHandler(teamController.getAllByCreatorId.bind(teamController)));

    return router;
}