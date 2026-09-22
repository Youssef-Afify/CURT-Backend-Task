import { Router } from "express";
import { UserTeamController } from "../controllers/userTeam.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export function userTeamRoutes(
    userTeamController: UserTeamController,
    authMiddleware: AuthMiddleware,
): Router {
    const router = Router();
    const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.post("/", auth, asyncHandler(userTeamController.create.bind(userTeamController)));
    router.delete("/", auth, asyncHandler(userTeamController.delete.bind(userTeamController)));

    return router;
}
