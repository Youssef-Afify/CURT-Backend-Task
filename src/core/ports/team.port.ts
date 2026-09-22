export type TeamSummary = {
    team_id: string;
    name: string;
    description: string | null;
    timestamp: Date;
    creator_id: string;
}[];

export interface TeamByUserPort {
    getTeamsForUser(userId: string): Promise<TeamSummary>;
}

export interface TeamByCreatorPort {
    getTeamsForCreator(creatorId: string): Promise<TeamSummary>;
}
