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
import {
    IsProjectCreatorAdapter,
    TaskForUserAdapter,
} from "../adapters/task.adapter";
import { TeamRepository } from "../../../infrastructure/repositories/team.repository";
import { TeamService } from "../../../business/services/team.service";
import { TeamForUserAdapter } from "../adapters/team.adapter";
import { UserProjectService } from "../../../business/services/userProject.service";
import { UserTaskService } from "../../../business/services/userTask.service";
import { UserTeamService } from "../../../business/services/userTeam.service";
import { UserProjectRepository } from "../../../infrastructure/repositories/userProject.repository";
import { UserTaskRepository } from "../../../infrastructure/repositories/userTask.repository";
import { UserTeamRepository } from "../../../infrastructure/repositories/userTeam.repository";
import { IsUserProjectAdapter } from "../adapters/userProject.adapter";
import { IsUserTaskAdapter } from "../adapters/userTask.adapter";
import { IsUserTeamAdapter } from "../adapters/userTeam.adapter";

export function buildUserContainer() {
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

    const userRepository = new UserRepository(pool);
    const userService = new UserService(
        userRepository,
        isUserProjectPort,
        isUserTaskPort,
        isUserTeamPort,
        logger,
    );

    const projectRepository = new ProjectRepository(pool);
    const projectService = new ProjectService(projectRepository, logger);
    const projectByUserPort = new ProjectForUserAdapter(projectService);
    const isProjectCreatorPort = new IsProjectCreatorAdapter(projectService);

    const taskRepository = new TaskRepository(pool);
    const taskService = new TaskService(
        taskRepository,
        isProjectCreatorPort,
        isUserProjectPort,
        isUserTaskPort,
        logger,
    );
    const taskByUserPort = new TaskForUserAdapter(taskService);

    const teamRepository = new TeamRepository(pool);
    const teamService = new TeamService(teamRepository, logger);
    const teamByUserPort = new TeamForUserAdapter(teamService);

    const userController = new UserController(
        userService,
        projectByUserPort,
        taskByUserPort,
        teamByUserPort,
    );
    return userController;
}
