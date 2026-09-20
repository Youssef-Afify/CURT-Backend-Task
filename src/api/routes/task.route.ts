import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";

export function taskRoutes(
    taskController: TaskController,
    // authMiddleware: AuthMiddleware,
): Router {
    const router = Router();
    // const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.post("/tasks", asyncHandler(taskController.create.bind(taskController)));
    router.get("/tasks/:id", asyncHandler(taskController.getById.bind(taskController)));
    router.put("tasks/:id", asyncHandler(taskController.update.bind(taskController)));
    router.delete("/tasks/:id", asyncHandler(taskController.delete.bind(taskController)));
    router.get("/users/:user_id/tasks", asyncHandler(taskController.getAllByUserId.bind(taskController)));
    router.get("/projects/:project_id/tasks", asyncHandler(taskController.getAllByProjectId.bind(taskController)));

    return router;
}