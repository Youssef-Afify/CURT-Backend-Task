import { BaseLogger } from "../../../business/loggers/baseLogger";
import { UserProjectService } from "../../../business/services/userProject.service";
import { pool } from "../../../infrastructure/database/pool";
import { UserProjectRepository } from "../../../infrastructure/repositories/userProject.repository";
import { UserProjectController } from "../../controllers/userProject.controller";

export function buildUserProjectContainer() {
    const logger = new BaseLogger();

    const userProjectRepository = new UserProjectRepository(pool);
    const userProjectService = new UserProjectService(userProjectRepository, logger);
    const userProjectController = new UserProjectController(userProjectService);

    return userProjectController;
}
