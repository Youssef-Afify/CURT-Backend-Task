import express, { Express } from "express";
import { buildContainer } from "./api/containers/container";
import { projectRoutes } from "./api/routes/project.route";
import { taskRoutes } from "./api/routes/task.route";
import { teamRoutes } from "./api/routes/team.route";
import { userRoutes } from "./api/routes/user.route";
import { errorMiddleware } from "./api/middlewares/errorMiddleware";

export function createApp(): Express {
    const app = express();
    const {
        projectController,
        taskController,
        teamController,
        userController,
    } = buildContainer();

    app.use(express.json());
    app.get("/health", (_req, res) => res.status(200).json({ status: "OK" }));
    app.use("/", projectRoutes(projectController));
    app.use("/", taskRoutes(taskController));
    app.use("/", teamRoutes(teamController));
    app.use("/", userRoutes(userController));

    app.use(errorMiddleware);
    return app;
}