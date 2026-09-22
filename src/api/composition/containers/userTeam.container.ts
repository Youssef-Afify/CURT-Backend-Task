import { BaseLogger } from "../../../business/loggers/baseLogger";
import { UserTeamService } from "../../../business/services/userTeam.service";
import { pool } from "../../../infrastructure/database/pool";
import { UserTeamRepository } from "../../../infrastructure/repositories/userTeam.repository";
import { UserTeamController } from "../../controllers/userTeam.controller";

export function buildUserTeamContainer() {
    const logger = new BaseLogger();

    const userTeamRepository = new UserTeamRepository(pool);
    const userTeamService = new UserTeamService(userTeamRepository, logger);
    const userTeamController = new UserTeamController(userTeamService);

    return userTeamController;
}
