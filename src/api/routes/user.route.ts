import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export function userRoutes (
    userController: UserController,
    authMiddleware: AuthMiddleware
): Router {
    const router = Router();
    const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.post("/", auth, asyncHandler(userController.create.bind(userController)));
    router.get("/:id", auth, asyncHandler(userController.getById.bind(userController)));
    router.put("/:id", auth, asyncHandler(userController.update.bind(userController)));
    router.delete("/:id", auth, asyncHandler(userController.delete.bind(userController)));
    router.get("/:id/projects", auth, asyncHandler(userController.getProjectsForUser.bind(userController)));
    router.get("/:id/tasks", auth, asyncHandler(userController.getTasksForUser.bind(userController)));
    router.get("/:id/teams", auth, asyncHandler(userController.getTeamsForUser.bind(userController)));

    return router;
}
