import { BaseLogger } from "../../../business/loggers/baseLogger";
import { pool } from "../../../infrastructure/database/pool";
import { ProjectRepository } from "../../../infrastructure/repositories/project.repository";
import { ProjectService } from "../../../business/services/project.service";
import { ProjectController } from "../../controllers/project.controller";
import { UserForProjectAdapter } from "../adapters/user.adapter";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { UserService } from "../../../business/services/user.service";
import {
    IsProjectCreatorAdapter,
    TaskForProjectAdapter,
} from "../adapters/task.adapter";
import { TaskRepository } from "../../../infrastructure/repositories/task.repository";
import { TaskService } from "../../../business/services/task.service";
import { UserProjectRepository } from "../../../infrastructure/repositories/userProject.repository";
import { UserProjectService } from "../../../business/services/userProject.service";
import { IsUserProjectAdapter } from "../adapters/userProject.adapter";
import { UserTaskRepository } from "../../../infrastructure/repositories/userTask.repository";
import { UserTaskService } from "../../../business/services/userTask.service";
import { IsUserTaskAdapter } from "../adapters/userTask.adapter";
import { UserTeamRepository } from "../../../infrastructure/repositories/userTeam.repository";
import { UserTeamService } from "../../../business/services/userTeam.service";
import { IsUserTeamAdapter } from "../adapters/userTeam.adapter";

export function buildProjectContainer() {
    const logger = new BaseLogger();

    const userProjectRepository = new UserProjectRepository(pool);
    const userProjectService = new UserProjectService(
        userProjectRepository,
        logger,
    );
    const isUserProjectPort = new IsUserProjectAdapter(userProjectService);

    const userTaskRepository = new UserTaskRepository(pool);
    const userTaskService = new UserTaskService(userTaskRepository, logger);
    const isUserTaskPort = new IsUserTaskAdapter(userTaskService);

    const userTeamRepository = new UserTeamRepository(pool);
    const userTeamService = new UserTeamService(userTeamRepository, logger);
    const isUserTeamPort = new IsUserTeamAdapter(userTeamService);

    const projectRepository = new ProjectRepository(pool);
    const projectService = new ProjectService(projectRepository, logger);

    const userRepository = new UserRepository(pool);
    const userService = new UserService(
        userRepository,
        isUserProjectPort,
        isUserTaskPort,
        isUserTeamPort,
        logger,
    );
    const userByProjectPort = new UserForProjectAdapter(userService);

    const isProjectCreatorPort = new IsProjectCreatorAdapter(projectService);

    const taskRepository = new TaskRepository(pool);
    const taskService = new TaskService(
        taskRepository,
        isProjectCreatorPort,
        isUserProjectPort,
        isUserTaskPort,
        logger,
    );
    const taskByProjectPort = new TaskForProjectAdapter(taskService);

    const projectController = new ProjectController(
        projectService,
        userByProjectPort,
        taskByProjectPort,
    );
    return projectController;
}
