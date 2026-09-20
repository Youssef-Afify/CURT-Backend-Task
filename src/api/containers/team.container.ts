import { BaseLogger } from "../../business/loggers/baseLogger";
import { pool } from "../../infrastructure/database/pool";
import { TeamRepository } from "../../infrastructure/repositories/team.repository";
import { TeamService } from "../../business/services/team.service";
import { TeamController } from "../controllers/team.controller";

export function buildTeamContainer() {
    const logger = new BaseLogger();
    const teamRepository = new TeamRepository(pool);
    const teamService = new TeamService(teamRepository, logger);
    const teamController = new TeamController(teamService);

    return teamController;
}