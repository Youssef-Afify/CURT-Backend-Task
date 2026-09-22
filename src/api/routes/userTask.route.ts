import { Router } from "express";
import { UserTaskController } from "../controllers/userTask.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export function userTaskRoutes(
    userTaskController: UserTaskController,
    authMiddleware: AuthMiddleware,
): Router {
    const router = Router();
    const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.post("/", auth, asyncHandler(userTaskController.create.bind(userTaskController)));
    router.delete("/", auth, asyncHandler(userTaskController.delete.bind(userTaskController)));

    return router;
}
