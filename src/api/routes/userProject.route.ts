import { Router } from "express";
import { UserProjectController } from "../controllers/userProject.controller";
import { asyncHandler } from "../../core/utils/asyncHandler";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export function userProjectRoutes(
    userProjectController: UserProjectController,
    authMiddleware: AuthMiddleware,
): Router {
    const router = Router();
    const auth = asyncHandler(authMiddleware.handle.bind(authMiddleware));

    router.post("/", auth, asyncHandler(userProjectController.create.bind(userProjectController)));
    router.delete("/", auth, asyncHandler(userProjectController.delete.bind(userProjectController)));

    return router;
}
