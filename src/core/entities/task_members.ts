import { UserRow } from "./user";

export interface TeamMembersRow {
    team_id: string;
    members: UserRow[];
}

export class TeamMembers {
    constructor(
        public readonly teamId: string,
        public members: UserRow[],
    ) {}

    static toEntity(row: TeamMembersRow): TeamMembers {
        return new TeamMembers(
            row.team_id,
            row.members,
        );
    }

    static toEntities(rows: TeamMembersRow[]): TeamMembers[] {
        return rows.map(TeamMembers.toEntity);
    }
}