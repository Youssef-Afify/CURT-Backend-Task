import { buildProjectContainer } from "./project.container";
import { buildTaskContainer } from "./task.container";
import { buildTeamContainer } from "./team.container";
import { buildUserContainer } from "./user.container";

export function buildContainer () {
    return {
        projectController: buildProjectContainer(),
        taskController: buildTaskContainer(),
        teamController: buildTeamContainer(),
        userController: buildUserContainer(),
    };
}