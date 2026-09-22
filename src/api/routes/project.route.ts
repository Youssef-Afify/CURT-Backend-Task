import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export function projectRoutes(
    projectController: ProjectController,
    authMiddleware: AuthMiddleware,
): Router {
    const router = Router();
    const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.post("/", auth, asyncHandler(projectController.create.bind(projectController)));
    router.get("/:id", auth, asyncHandler(projectController.getById.bind(projectController)));
    router.put("/:id", auth, asyncHandler(projectController.update.bind(projectController)));
    router.delete("/:id", auth, asyncHandler(projectController.delete.bind(projectController)));
    router.get("/:id/users", auth, asyncHandler(projectController.getUsersForProject.bind(projectController)));
    router.get("/:id/tasks", auth, asyncHandler(projectController.getTasksForProject.bind(projectController)));

    return router;
}
