import { BaseLogger } from "../../../business/loggers/baseLogger";
import { pool } from "../../../infrastructure/database/pool";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { UserService } from "../../../business/services/user.service";
import { UserController } from "../../controllers/user.controller";
import { ProjectRepository } from "../../../infrastructure/repositories/project.repository";
import { ProjectForUserAdapter } from "../adapters/project.adapter";
import { ProjectService } from "../../../business/services/project.service";
import { TaskRepository } from "../../../infrastructure/repositories/task.repository";
import { TaskService } from "../../../business/services/task.service";
import { TaskForUserAdapter } from "../adapters/task.adapter";
import { TeamRepository } from "../../../infrastructure/repositories/team.repository";
import { TeamService } from "../../../business/services/team.service";
import { TeamForUserAdapter } from "../adapters/team.adapter";

export function buildUserContainer() {
    const logger = new BaseLogger();
    const userRepository = new UserRepository(pool);
    const userService = new UserService(userRepository, logger);

    const projectRepository = new ProjectRepository(pool);
    const projectService = new ProjectService(projectRepository, logger);
    const projectByUserPort = new ProjectForUserAdapter(projectService);

    const taskRepository = new TaskRepository(pool);
    const taskService = new TaskService(taskRepository, logger);
    const taskByUserPort = new TaskForUserAdapter(taskService);

    const teamRepository = new TeamRepository(pool);
    const teamService = new TeamService(teamRepository, logger);
    const teamByUserPort = new TeamForUserAdapter(teamService);

    const userController = new UserController(userService, projectByUserPort, taskByUserPort, teamByUserPort);
    return userController;
}
