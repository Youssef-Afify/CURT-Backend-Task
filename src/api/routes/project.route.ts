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

    router.post("/projects", auth, asyncHandler(projectController.create.bind(projectController)));
    router.get("/projects/:id", auth, asyncHandler(projectController.getById.bind(projectController)));
    router.put("/projects/:id", auth, asyncHandler(projectController.update.bind(projectController)));
    router.delete("/projects/:id", auth, asyncHandler(projectController.delete.bind(projectController)));
    router.get("/users/:user_id/projects", auth, asyncHandler(projectController.getAllByUserId.bind(projectController)));
    router.get("/creators/:creator_id/projects", auth, asyncHandler(projectController.getAllByCreatorId.bind(projectController)));

    return router;
}