import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { buildAuthContainer } from "./auth.container";
import { buildCreatorContainer } from "./creator.container";
import { buildProjectContainer } from "./project.container";
import { buildTaskContainer } from "./task.container";
import { buildTeamContainer } from "./team.container";
import { buildUserContainer } from "./user.container";

export function buildContainer() {
    const authMiddleware = new AuthMiddleware();

    return {
        authMiddleware,
        authController: buildAuthContainer(),
        creatorController: buildCreatorContainer(),
        projectController: buildProjectContainer(),
        taskController: buildTaskContainer(),
        teamController: buildTeamContainer(),
        userController: buildUserContainer(),
    };
}
