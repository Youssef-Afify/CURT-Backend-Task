export interface IsUserTeamPort {
    isUserTeam(userId: string, teamId: string): Promise<boolean>;
}
