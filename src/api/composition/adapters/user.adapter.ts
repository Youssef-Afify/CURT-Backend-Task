import { UserService } from "../../../business/services/user.service";
import {
    UserByProjectPort,
    UserByTaskPort,
    UserByTeamPort,
    UserSummary,
} from "../../../core/ports/user.port";

export class UserForProjectAdapter implements UserByProjectPort {
    constructor(private readonly userService: UserService) {}

    async getUsersForProject(projectId: string): Promise<UserSummary> {
        const users = await this.userService.getAllByProjectId(projectId);
        return users.map((user) => ({
            user_id: user.userId,
            name: user.name,
            email: user.email,
            timestamp: user.timestamp,
        }));
    }
}

export class UserForTaskAdapter implements UserByTaskPort {
    constructor(private readonly userService: UserService) {}

    async getUsersForTask(taskId: string): Promise<UserSummary> {
        const users = await this.userService.getAllByTaskId(taskId);
        return users.map((user) => ({
            user_id: user.userId,
            name: user.name,
            email: user.email,
            timestamp: user.timestamp,
        }));
    }
}

export class UserForTeamAdapter implements UserByTeamPort {
    constructor(private readonly userService: UserService) {}

    async getUsersForTeam(teamId: string): Promise<UserSummary> {
        const users = await this.userService.getAllByTeamId(teamId);
        return users.map((user) => ({
            user_id: user.userId,
            name: user.name,
            email: user.email,
            timestamp: user.timestamp,
        }));
    }
}
