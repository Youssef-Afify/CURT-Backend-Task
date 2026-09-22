export type UserSummary = {
    user_id: string;
    name: string;
    email: string;
    timestamp: Date;
}[];

export interface UserByProjectPort {
    getUsersForProject(projectId: string): Promise<UserSummary>;
}

export interface UserByTaskPort {
    getUsersForTask(taskId: string): Promise<UserSummary>;
}

export interface UserByTeamPort {
    getUsersForTeam(teamId: string): Promise<UserSummary>;
}
