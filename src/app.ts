import express, { Express } from "express";
import { buildContainer } from "./api/containers/container";
import { projectRoutes } from "./api/routes/project.route";
import { taskRoutes } from "./api/routes/task.route";
import { teamRoutes } from "./api/routes/team.route";
import { userRoutes } from "./api/routes/user.route";
import { errorMiddleware } from "./api/middlewares/errorMiddleware";
import { authRoutes } from "./api/routes/auth.route";

export function createApp(): Express {
    const app = express();
    const {
        authMiddleware,
        authController,
        projectController,
        taskController,
        teamController,
        userController,
    } = buildContainer();

    app.use(express.json());
    app.get("/health", (_req, res) => res.status(200).json({ status: "OK" }));
    app.use("/", authRoutes(authController));
    app.use("/", projectRoutes(projectController, authMiddleware));
    app.use("/", taskRoutes(taskController, authMiddleware));
    app.use("/", teamRoutes(teamController, authMiddleware));
    app.use("/", userRoutes(userController, authMiddleware));

    app.use(errorMiddleware);
    return app;
}