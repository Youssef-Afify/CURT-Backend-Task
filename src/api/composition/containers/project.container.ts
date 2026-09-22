import { BaseLogger } from "../../../business/loggers/baseLogger";
import { pool } from "../../../infrastructure/database/pool";
import { ProjectRepository } from "../../../infrastructure/repositories/project.repository";
import { ProjectService } from "../../../business/services/project.service";
import { ProjectController } from "../../controllers/project.controller";
import { UserForProjectAdapter } from "../adapters/user.adapter";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { UserService } from "../../../business/services/user.service";
import { TaskForProjectAdapter } from "../adapters/task.adapter";
import { TaskRepository } from "../../../infrastructure/repositories/task.repository";
import { TaskService } from "../../../business/services/task.service";

export function buildProjectContainer() {
    const logger = new BaseLogger();

    const projectRepository = new ProjectRepository(pool);
    const projectService = new ProjectService(projectRepository, logger);

    const userRepository = new UserRepository(pool);
    const userService = new UserService(userRepository, logger);
    const userByProjectPort = new UserForProjectAdapter(userService);

    const taskRepository = new TaskRepository(pool);
    const taskService = new TaskService(taskRepository, logger);
    const taskByProjectPort = new TaskForProjectAdapter(taskService);


    const projectController = new ProjectController(projectService, userByProjectPort, taskByProjectPort);
    return projectController;
}
