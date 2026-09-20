import { BaseLogger } from "../../business/loggers/baseLogger";
import { pool } from "../../infrastructure/database/pool";
import { ProjectRepository } from "../../infrastructure/repositories/project.repository";
import { ProjectService } from "../../business/services/project.service";
import { ProjectController } from "../controllers/project.controller";

export function buildProjectContainer() {
    const logger = new BaseLogger();
    const projectRepository = new ProjectRepository(pool);
    const projectService = new ProjectService(projectRepository, logger);
    const projectController = new ProjectController(projectService);

    return projectController;
}