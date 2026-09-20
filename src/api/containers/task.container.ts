import { BaseLogger } from "../../business/loggers/baseLogger";
import { pool } from "../../infrastructure/database/pool";
import { TaskRepository } from "../../infrastructure/repositories/task.repository";
import { TaskService } from "../../business/services/task.service";
import { TaskController } from "../controllers/task.controller";

export function buildTaskContainer() {
    const logger = new BaseLogger();
    const taskRepository = new TaskRepository(pool);
    const taskService = new TaskService(taskRepository, logger);
    const taskController = new TaskController(taskService);

    return taskController;
}