import { BaseLogger } from "../../../business/loggers/baseLogger";
import { pool } from "../../../infrastructure/database/pool";
import { TeamRepository } from "../../../infrastructure/repositories/team.repository";
import { TeamService } from "../../../business/services/team.service";
import { TeamController } from "../../controllers/team.controller";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { UserService } from "../../../business/services/user.service";
import { UserForTeamAdapter } from "../adapters/user.adapter";
import { UserProjectService } from "../../../business/services/userProject.service";
import { UserTaskService } from "../../../business/services/userTask.service";
import { UserTeamService } from "../../../business/services/userTeam.service";
import { UserProjectRepository } from "../../../infrastructure/repositories/userProject.repository";
import { UserTaskRepository } from "../../../infrastructure/repositories/userTask.repository";
import { UserTeamRepository } from "../../../infrastructure/repositories/userTeam.repository";
import { IsUserProjectAdapter } from "../adapters/userProject.adapter";
import { IsUserTaskAdapter } from "../adapters/userTask.adapter";
import { IsUserTeamAdapter } from "../adapters/userTeam.adapter";

export function buildTeamContainer() {
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

    const teamRepository = new TeamRepository(pool);
    const teamService = new TeamService(teamRepository, logger);

    const userRepository = new UserRepository(pool);
    const userService = new UserService(
        userRepository,
        isUserProjectPort,
        isUserTaskPort,
        isUserTeamPort,
        logger,
    );
    const userByTeamPort = new UserForTeamAdapter(userService);

    const teamController = new TeamController(teamService, userByTeamPort);

    return teamController;
}
