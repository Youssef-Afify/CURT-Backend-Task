import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";

export function projectRoutes(
    projectController: ProjectController,
    // authMiddleware: AuthMiddleware,
): Router {
    const router = Router();
    // const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.post("/projects", asyncHandler(projectController.create.bind(projectController)));
    router.get("/projects/:id", asyncHandler(projectController.getById.bind(projectController)));
    router.put("projects/:id", asyncHandler(projectController.update.bind(projectController)));
    router.delete("/projects/:id", asyncHandler(projectController.delete.bind(projectController)));
    router.get("/users/:user_id/projects", asyncHandler(projectController.getAllByUserId.bind(projectController)));
    router.get("/creators/:creator_id/projects", asyncHandler(projectController.getAllByCreatorId.bind(projectController)));

    return router;
}