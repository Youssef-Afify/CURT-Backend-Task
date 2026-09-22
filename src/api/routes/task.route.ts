import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export function taskRoutes(
    taskController: TaskController,
    authMiddleware: AuthMiddleware,
): Router {
    const router = Router();
    const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.post("/", auth, asyncHandler(taskController.create.bind(taskController)));
    router.get("/:id", auth, asyncHandler(taskController.getById.bind(taskController)));
    router.put("/:id", auth, asyncHandler(taskController.update.bind(taskController)));
    router.delete("/:id", auth, asyncHandler(taskController.delete.bind(taskController)));
    router.get("/:id/users", auth, asyncHandler(taskController.getUsersForTask.bind(taskController)));

    return router;
}
