import { Team, TeamRow } from "./team";

export class UserTeams {
    constructor(
        public readonly userId: string,
        public teams: Team[],
    ) {}

    static toEntity(userId: string, rows: TeamRow[]): UserTeams {
        return new UserTeams(userId, Team.toEntities(rows));
    }
}
