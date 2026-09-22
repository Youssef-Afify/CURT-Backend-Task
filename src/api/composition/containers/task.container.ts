import { BaseLogger } from "../../../business/loggers/baseLogger";
import { pool } from "../../../infrastructure/database/pool";
import { TaskRepository } from "../../../infrastructure/repositories/task.repository";
import { TaskService } from "../../../business/services/task.service";
import { TaskController } from "../../controllers/task.controller";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { UserService } from "../../../business/services/user.service";
import { UserForTaskAdapter } from "../adapters/user.adapter";

export function buildTaskContainer() {
    const logger = new BaseLogger();

    const taskRepository = new TaskRepository(pool);
    const taskService = new TaskService(taskRepository, logger);

    const userRepository = new UserRepository(pool);
    const userService = new UserService(userRepository, logger);
    const userByTaskPort = new UserForTaskAdapter(userService);

    const taskController = new TaskController(taskService, userByTaskPort);
    return taskController;
}
