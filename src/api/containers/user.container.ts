import { BaseLogger } from "../../business/loggers/baseLogger";
import { pool } from "../../infrastructure/database/pool";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { UserService } from "../../business/services/user.service";
import { UserController } from "../controllers/user.controller";

export function buildUserContainer() {
    const logger = new BaseLogger();
    const userRepository = new UserRepository(pool);
    const userService = new UserService(userRepository, logger);
    const userController = new UserController(userService);

    return userController;
}