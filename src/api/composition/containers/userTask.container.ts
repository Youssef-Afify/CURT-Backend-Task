import { BaseLogger } from "../../../business/loggers/baseLogger";
import { UserTaskService } from "../../../business/services/userTask.service";
import { pool } from "../../../infrastructure/database/pool";
import { UserTaskRepository } from "../../../infrastructure/repositories/userTask.repository";
import { UserTaskController } from "../../controllers/userTask.controller";

export function buildUserTaskContainer() {
    const logger = new BaseLogger();

    const userTaskRepository = new UserTaskRepository(pool);
    const userTaskService = new UserTaskService(userTaskRepository, logger);
    const userTaskController = new UserTaskController(userTaskService);

    return userTaskController;
}
