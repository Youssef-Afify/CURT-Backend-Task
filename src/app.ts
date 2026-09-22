import express, { Express } from "express";
import { buildContainer } from "./api/composition/containers/container";
import { authRoutes } from "./api/routes/auth.route";
import { creatorRoutes } from "./api/routes/creator.route";
import { projectRoutes } from "./api/routes/project.route";
import { taskRoutes } from "./api/routes/task.route";
import { teamRoutes } from "./api/routes/team.route";
import { userRoutes } from "./api/routes/user.route";
import { errorMiddleware } from "./api/middlewares/errorMiddleware";

export function createApp(): Express {
    const app = express();
    const {
        authMiddleware,
        authController,
        creatorController,
        projectController,
        taskController,
        teamController,
        userController,
    } = buildContainer();

    app.use(express.json());
    app.get("/health", (_req, res) => res.status(200).json({ status: "OK" }));
    app.use("/", authRoutes(authController));
    app.use("/creators", creatorRoutes(creatorController, authMiddleware));
    app.use("/projects", projectRoutes(projectController, authMiddleware));
    app.use("/tasks", taskRoutes(taskController, authMiddleware));
    app.use("/teams", teamRoutes(teamController, authMiddleware));
    app.use("/users", userRoutes(userController, authMiddleware));

    app.use(errorMiddleware);
    return app;
}
