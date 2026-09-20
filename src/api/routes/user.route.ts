import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";

export function userRoutes (
    userController: UserController,
    // authMiddleware: AuthMiddleware
): Router {
    const router = Router();
    // const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.post("/users", asyncHandler(userController.create.bind(userController)));
    router.get("/users/:id", asyncHandler(userController.getById.bind(userController)));
    router.put("users/:id", asyncHandler(userController.update.bind(userController)));
    router.delete("/users/:id", asyncHandler(userController.delete.bind(userController)));
    router.get("/projects/:project_id/users", asyncHandler(userController.getAllByProjectId.bind(userController)));
    router.get("/tasks/:task_id/users", asyncHandler(userController.getAllByTaskId.bind(userController)));
    router.get("/teams/:team_id/users", asyncHandler(userController.getAllByTeamId.bind(userController)));

    return router;
}