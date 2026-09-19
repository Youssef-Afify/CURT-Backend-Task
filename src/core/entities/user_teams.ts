import { TeamRow } from "./team";

export interface UserTeamsRow {
    user_id: string;
    teams: TeamRow[];
}

export class UserTeams {
    constructor(
        public readonly user_id: string,
        public teams: TeamRow[],
    ) {}

    static toEntity(row: UserTeamsRow): UserTeams {
        return new UserTeams(
            row.user_id,
            row.teams,
        );
    }

    static toEntities(rows: UserTeamsRow[]): UserTeams[] {
        return rows.map(UserTeams.toEntity);
    }
}