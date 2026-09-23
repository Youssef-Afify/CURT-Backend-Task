export interface UserTeamRow {
    user_id: string;
    team_id: string;
}

export class UserTeam {
    constructor(
        public readonly userId: string,
        public readonly teamId: string,
    ) {}

    static toEntity(row: UserTeamRow): UserTeam {
        return new UserTeam(
            row.user_id,
            row.team_id,
        );
    }

    static toEntities(rows: UserTeamRow[]): UserTeam[] {
        return rows.map(UserTeam.toEntity);
    }
}