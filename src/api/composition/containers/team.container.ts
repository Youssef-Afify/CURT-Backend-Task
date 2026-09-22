import { BaseLogger } from "../../../business/loggers/baseLogger";
import { pool } from "../../../infrastructure/database/pool";
import { TeamRepository } from "../../../infrastructure/repositories/team.repository";
import { TeamService } from "../../../business/services/team.service";
import { TeamController } from "../../controllers/team.controller";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { UserService } from "../../../business/services/user.service";
import { UserForTeamAdapter } from "../adapters/user.adapter";

export function buildTeamContainer() {
    const logger = new BaseLogger();
    const teamRepository = new TeamRepository(pool);
    const teamService = new TeamService(teamRepository, logger);

    const userRepository = new UserRepository(pool);
    const userService = new UserService(userRepository, logger);
    const userByTeamPort = new UserForTeamAdapter(userService);

    const teamController = new TeamController(teamService, userByTeamPort);

    return teamController;
}
