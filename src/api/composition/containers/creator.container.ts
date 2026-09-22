import { BaseLogger } from "../../../business/loggers/baseLogger";
import { ProjectService } from "../../../business/services/project.service";
import { TeamService } from "../../../business/services/team.service";
import { pool } from "../../../infrastructure/database/pool";
import { ProjectRepository } from "../../../infrastructure/repositories/project.repository";
import { TeamRepository } from "../../../infrastructure/repositories/team.repository";
import { CreatorController } from "../../controllers/creator.controller";
import { ProjectForCreatorAdapter } from "../adapters/project.adapter";
import { TeamForCreatorAdapter } from "../adapters/team.adapter";

export function buildCreatorContainer() {
    const logger = new BaseLogger();

    const projectRepository = new ProjectRepository(pool);
    const projectService = new ProjectService(projectRepository, logger);
    const projectByCreatorPort = new ProjectForCreatorAdapter(projectService);

    const teamRepository = new TeamRepository(pool);
    const teamService = new TeamService(teamRepository, logger);
    const teamByCreatorPort = new TeamForCreatorAdapter(teamService);

    const creatorController = new CreatorController(projectByCreatorPort, teamByCreatorPort);
    return creatorController;
}