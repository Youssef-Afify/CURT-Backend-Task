import { Router } from "express";
import { TeamController } from "../controllers/team.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export function teamRoutes(
    teamController: TeamController,
    authMiddleware: AuthMiddleware,
): Router {
    const router = Router();
    const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.post("/teams", auth, asyncHandler(teamController.create.bind(teamController)));
    router.get("/teams/:id", auth, asyncHandler(teamController.getById.bind(teamController)));
    router.put("/teams/:id", auth, asyncHandler(teamController.update.bind(teamController)));
    router.delete("/teams/:id", auth, asyncHandler(teamController.delete.bind(teamController)));
    router.get("/users/:user_id/teams", auth, asyncHandler(teamController.getAllByUserId.bind(teamController)));
    router.get("/creators/:creator_id/teams", auth, asyncHandler(teamController.getAllByCreatorId.bind(teamController)));

    return router;
}