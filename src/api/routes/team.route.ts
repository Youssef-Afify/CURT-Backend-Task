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

    router.post("/", auth, asyncHandler(teamController.create.bind(teamController)));
    router.get("/:id", auth, asyncHandler(teamController.getById.bind(teamController)));
    router.put("/:id", auth, asyncHandler(teamController.update.bind(teamController)));
    router.delete("/:id", auth, asyncHandler(teamController.delete.bind(teamController)));
    router.get("/:id/users", auth, asyncHandler(teamController.getUsersForTeam.bind(teamController)));

    return router;
}
