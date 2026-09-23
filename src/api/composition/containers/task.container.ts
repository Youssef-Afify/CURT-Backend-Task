import { BaseLogger } from "../../../business/loggers/baseLogger";
import { pool } from "../../../infrastructure/database/pool";
import { TaskRepository } from "../../../infrastructure/repositories/task.repository";
import { TaskService } from "../../../business/services/task.service";
import { TaskController } from "../../controllers/task.controller";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { UserService } from "../../../business/services/user.service";
import { UserForTaskAdapter } from "../adapters/user.adapter";
import { UserProjectService } from "../../../business/services/userProject.service";
import { UserTaskService } from "../../../business/services/userTask.service";
import { UserTeamService } from "../../../business/services/userTeam.service";
import { UserProjectRepository } from "../../../infrastructure/repositories/userProject.repository";
import { UserTaskRepository } from "../../../infrastructure/repositories/userTask.repository";
import { UserTeamRepository } from "../../../infrastructure/repositories/userTeam.repository";
import { IsUserProjectAdapter } from "../adapters/userProject.adapter";
import { IsUserTaskAdapter } from "../adapters/userTask.adapter";
import { IsUserTeamAdapter } from "../adapters/userTeam.adapter";
import { ProjectService } from "../../../business/services/project.service";
import { ProjectRepository } from "../../../infrastructure/repositories/project.repository";
import { IsProjectCreatorAdapter } from "../adapters/task.adapter";

export function buildTaskContainer() {
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
    const isProjectCreatorPort = new IsProjectCreatorAdapter(projectService);

    const taskRepository = new TaskRepository(pool);
    const taskService = new TaskService(
        taskRepository,
        isProjectCreatorPort,
        isUserProjectPort,
        isUserTaskPort,
        logger,
    );

    const userRepository = new UserRepository(pool);
    const userService = new UserService(
        userRepository,
        isUserProjectPort,
        isUserTaskPort,
        isUserTeamPort,
        logger,
    );
    const userByTaskPort = new UserForTaskAdapter(userService);

    const taskController = new TaskController(taskService, userByTaskPort);
    return taskController;
}
