import { BaseLogger } from "../../../business/loggers/baseLogger";
import { AuthService } from "../../../business/services/auth.service";
import { NeonAuthClient } from "../../../infrastructure/auth/neonAuthClient";
import { pool } from "../../../infrastructure/database/pool";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { AuthController } from "../../controllers/auth.controller";

export function buildAuthContainer() {
    const logger = new BaseLogger();
    const userRepository = new UserRepository(pool);
    const neonAuthClient = new NeonAuthClient();
    const authService = new AuthService(neonAuthClient, userRepository, logger);
    const authController = new AuthController(authService);

    return authController;
}
